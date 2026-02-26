"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const DAY_MS = 24 * 60 * 60 * 1000;
const API_BASE = "https://wahb-amir-eco-tracker.hf.space/api";

const TRANSPORT_CO2 = { walk: 0, bike: 0, public: 2, car: 8, rideshare: 6 };
const ELECTRICITY_CO2 = { low: 2, medium: 5, high: 10, renewable: 0 };
const PLASTIC_CO2 = { none: 0, low: 1, medium: 3, high: 6 };

const TRANSPORT_EMOJI = {
  walk: "🚶",
  bike: "🚴",
  public: "🚌",
  car: "🚗",
  rideshare: "🚙",
};
const ELECTRICITY_EMOJI = {
  low: "💡",
  medium: "⚡",
  high: "🔥",
  renewable: "☀️",
};
const PLASTIC_EMOJI = { none: "🌱", low: "🛍️", medium: "🧴", high: "🗑️" };

const getWeekKey = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), 0, 1);
  const past = Math.floor((now - firstDay) / DAY_MS);
  return `${now.getFullYear()}-W${Math.ceil((past + firstDay.getDay() + 1) / 7)}`;
};

export default function Tracker() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [lastSubmit, setLastSubmit] = useState(null);
  const [canSubmit, setCanSubmit] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [weekKey, setWeekKey] = useState(getWeekKey());
  const [pop, setPop] = useState(false);
  const [popMessage, setPopMessage] = useState("");

  const [formData, setFormData] = useState({
    transport: "",
    electricity: "",
    plastic: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => d?.success && setUser(d.user))
      .catch(() => localStorage.removeItem("token"));
  }, []);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/tracker`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((res) => {
        if (!res.success) return;
        const weekly = res.data.slice(0, 7).map((e) => {
          const totalCO2 = e.totalCO2;
          const ecoScore = e.ecoScore;
          return {
            transport: e.transport,
            electricity: e.electricity,
            plastic: e.plastic,
            totalCO2,
            ecoScore,
            date: new Date(e.createdAt).toLocaleDateString(),
          };
        });
        setEntries(weekly);

        if (res.data[0]) {
          const last = new Date(res.data[0].createdAt).getTime();
          setLastSubmit(last);
          const diff = Date.now() - last;
          if (diff < DAY_MS) {
            setCanSubmit(false);
            setTimeLeft(DAY_MS - diff);
          }
        }
      });
  }, [user]);

  useEffect(() => {
    const current = getWeekKey();
    if (current !== weekKey) {
      setEntries([]);
      setWeekKey(current);
      setLastSubmit(null);
      setCanSubmit(true);
      setTimeLeft(null);
    }
  }, [weekKey]);

  useEffect(() => {
    if (!canSubmit && timeLeft > 0) {
      const t = setInterval(() => setTimeLeft((x) => x - 1000), 1000);
      return () => clearInterval(t);
    }
    if (timeLeft <= 0 && timeLeft !== null) {
      setCanSubmit(true);
      setTimeLeft(null);
    }
  }, [timeLeft, canSubmit]);

  const handleSubmit = async () => {
    if (!user) {
      setPopMessage("Authentication Required");
      setPop(true);
      return;
    }
    if (!formData.transport || !formData.electricity || !formData.plastic) {
      setPopMessage("Please fill all fields");
      setPop(true);
      return;
    }

    const totalCO2 =
      TRANSPORT_CO2[formData.transport] +
      ELECTRICITY_CO2[formData.electricity] +
      PLASTIC_CO2[formData.plastic];
    const ecoScore = Math.max(0, 100 - totalCO2 * 3);

    const token = localStorage.getItem("token");
    const payload = { ...formData, totalCO2, ecoScore };

    const res = await fetch(`${API_BASE}/tracker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!data.success) return;

    const newEntry = {
      ...formData,
      totalCO2,
      ecoScore,
      date: new Date().toLocaleDateString(),
    };
    setEntries((p) => [newEntry, ...p].slice(0, 7));
    setLastSubmit(Date.now());
    setCanSubmit(false);
    setTimeLeft(DAY_MS);
    setFormData({ transport: "", electricity: "", plastic: "" });
  };

  const formatTime = (ms) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <section className="bg-gradient-to-b from-white via-emerald-50/50 to-white py-24 px-4 relative overflow-hidden"
    id="tracker">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-green-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Weekly Eco Impact Console
          </h2>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-lg">
            Monitor your environmental footprint. One verified entry per day.
            Weekly protocol resets automatically.
          </p>
        </motion.div>

        {/* Form & Info */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 card-elevated bg-gradient-to-br from-white to-emerald-50/20 border-2 border-emerald-100 p-8"
          >
            <h3 className="text-2xl font-bold gradient-text mb-6">
              Daily Impact Input
            </h3>
            {!canSubmit ? (
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-bold text-emerald-700 text-lg">
                  Entry Logged Successfully
                </p>
                <p className="mt-3 text-gray-700">Next submission unlocks in</p>
                <p className="mt-3 text-3xl font-black text-transparent bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text">
                  {formatTime(timeLeft)}
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="relative">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Transport Mode
                    </label>
                    <select
                      value={formData.transport}
                      onChange={(e) =>
                        setFormData({ ...formData, transport: e.target.value })
                      }
                      className="w-full border-2 border-emerald-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white font-medium"
                    >
                      <option value="">Select Transport...</option>
                      {Object.keys(TRANSPORT_CO2).map((k) => (
                        <option key={k} value={k}>
                          {TRANSPORT_EMOJI[k]}{" "}
                          {k.charAt(0).toUpperCase() + k.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Electricity Usage
                    </label>
                    <select
                      value={formData.electricity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          electricity: e.target.value,
                        })
                      }
                      className="w-full border-2 border-emerald-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white font-medium"
                    >
                      <option value="">Select Usage...</option>
                      {Object.keys(ELECTRICITY_CO2).map((k) => (
                        <option key={k} value={k}>
                          {ELECTRICITY_EMOJI[k]}{" "}
                          {k.charAt(0).toUpperCase() + k.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Plastic Consumption
                    </label>
                    <select
                      value={formData.plastic}
                      onChange={(e) =>
                        setFormData({ ...formData, plastic: e.target.value })
                      }
                      className="w-full border-2 border-emerald-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white font-medium"
                    >
                      <option value="">Select Consumption...</option>
                      {Object.keys(PLASTIC_CO2).map((k) => (
                        <option key={k} value={k}>
                          {PLASTIC_EMOJI[k]}{" "}
                          {k.charAt(0).toUpperCase() + k.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="btn-primary w-full group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Submit Eco Log
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </button>
              </>
            )}
          </motion.div>

          {/* Mission Protocols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-elevated bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 p-8 text-white shadow-2xl"
          >
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Mission Protocols
            </h4>
            <ul className="space-y-4 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>One verified eco entry per 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>Weekly system reset every Monday</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>Scores calculated in real-time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>Renewable actions boost rankings</span>
              </li>
            </ul>
            <button
              onClick={() => router.push("/leaderboard")}
              className="mt-8 w-full bg-white text-emerald-600 font-bold py-3 rounded-xl hover:bg-emerald-50 transition-all duration-300 hover:shadow-lg"
            >
              View Global Rankings →
            </button>
          </motion.div>
        </div>

        {/* Weekly Telemetry */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 gradient-text">
            📊 Weekly Telemetry
          </h3>
          {entries.length === 0 ? (
            <div className="card-blur p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 text-lg font-semibold">
                No activity recorded yet. Start logging your eco actions!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {entries.map((e, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="card-elevated bg-gradient-to-br from-white to-emerald-50/30 border-2 border-gray-300 hover:border-green-300 cursor-pointer p-6 group"
                >
                  <p className="text-xs font-semibold text-emerald-600 mb-3 uppercase tracking-wider">
                    {e.date}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-lg">
                        {TRANSPORT_EMOJI[e.transport]}
                      </span>
                      <span className="font-semibold text-gray-700">
                        Transport:
                      </span>
                      <span className="text-gray-600 capitalize">
                        {e.transport}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-lg">
                        {ELECTRICITY_EMOJI[e.electricity]}
                      </span>
                      <span className="font-semibold text-gray-700">
                        Electricity:
                      </span>
                      <span className="text-gray-600 capitalize">
                        {e.electricity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-lg">
                        {PLASTIC_EMOJI[e.plastic]}
                      </span>
                      <span className="font-semibold text-gray-700">
                        Plastic:
                      </span>
                      <span className="text-gray-600 capitalize">
                        {e.plastic}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-emerald-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-700">
                        CO₂ Emissions
                      </span>
                      <span className="text-lg font-bold text-transparent bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text">
                        {e.totalCO2} kg
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-700">
                        Eco Score
                      </span>
                      <span className="text-lg font-bold text-transparent bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text">
                        {e.ecoScore}/100
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pop-up */}
      {pop && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => setPop(false)}
          ></div>
          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card-elevated bg-gradient-to-br from-white to-emerald-50 border-2 border-emerald-200 w-[90%] max-w-sm p-8 text-center shadow-2xl animate-slide-down">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">
              {popMessage}
            </h1>
            {popMessage === "Authentication Required" && (
              <button
                onClick={() => router.push("/auth")}
                className="btn-primary w-full"
              >
                Proceed to Login →
              </button>
            )}
            {popMessage === "Please fill all fields" && (
              <button
                onClick={() => setPop(false)}
                className="btn-primary w-full"
              >
                OK, Got It
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
