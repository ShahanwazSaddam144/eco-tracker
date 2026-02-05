"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const DAY_MS = 24 * 60 * 60 * 1000;
const API_BASE = "http://localhost:5000/api";

const TRANSPORT_CO2 = { walk: 0, bike: 0, public: 2, car: 8, rideshare: 6 };
const ELECTRICITY_CO2 = { low: 2, medium: 5, high: 10, renewable: 0 };
const PLASTIC_CO2 = { none: 0, low: 1, medium: 3, high: 6 };

const TRANSPORT_EMOJI = { walk: "🚶", bike: "🚴", public: "🚌", car: "🚗", rideshare: "🚙" };
const ELECTRICITY_EMOJI = { low: "💡", medium: "⚡", high: "🔥", renewable: "☀️" };
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

  const [formData, setFormData] = useState({ transport: "", electricity: "", plastic: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => d?.success && setUser(d.user))
      .catch(() => localStorage.removeItem("token"));
  }, []);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/tracker`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(res => {
        if (!res.success) return;
        const weekly = res.data.slice(0, 7).map(e => {
          const totalCO2 = e.totalCO2;
          const ecoScore = e.ecoScore;
          return {
            transport: e.transport,
            electricity: e.electricity,
            plastic: e.plastic,
            totalCO2,
            ecoScore,
            date: new Date(e.createdAt).toLocaleDateString()
          };
        });
        setEntries(weekly);

        if (res.data[0]) {
          const last = new Date(res.data[0].createdAt).getTime();
          setLastSubmit(last);
          const diff = Date.now() - last;
          if (diff < DAY_MS) { setCanSubmit(false); setTimeLeft(DAY_MS - diff); }
        }
      });
  }, [user]);

  useEffect(() => {
    const current = getWeekKey();
    if (current !== weekKey) { setEntries([]); setWeekKey(current); setLastSubmit(null); setCanSubmit(true); setTimeLeft(null); }
  }, [weekKey]);

  useEffect(() => {
    if (!canSubmit && timeLeft > 0) { const t = setInterval(() => setTimeLeft(x => x - 1000), 1000); return () => clearInterval(t); }
    if (timeLeft <= 0 && timeLeft !== null) { setCanSubmit(true); setTimeLeft(null); }
  }, [timeLeft, canSubmit]);

  const handleSubmit = async () => {
    if (!user) { setPopMessage("Authentication Required"); setPop(true); return; }
    if (!formData.transport || !formData.electricity || !formData.plastic) { setPopMessage("Please fill all fields"); setPop(true); return; }

    const totalCO2 = TRANSPORT_CO2[formData.transport] + ELECTRICITY_CO2[formData.electricity] + PLASTIC_CO2[formData.plastic];
    const ecoScore = Math.max(0, 100 - totalCO2 * 3);

    const token = localStorage.getItem("token");
    const payload = { ...formData, totalCO2, ecoScore };

    const res = await fetch(`${API_BASE}/tracker`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!data.success) return;

    const newEntry = { ...formData, totalCO2, ecoScore, date: new Date().toLocaleDateString() };
    setEntries(p => [newEntry, ...p].slice(0, 7));
    setLastSubmit(Date.now());
    setCanSubmit(false);
    setTimeLeft(DAY_MS);
    setFormData({ transport: "", electricity: "", plastic: "" });
  };

  const formatTime = ms => { const h = Math.floor(ms / 3600000); const m = Math.floor((ms % 3600000) / 60000); const s = Math.floor((ms % 60000) / 1000); return `${h}h ${m}m ${s}s`; };

  return (
    <section className="bg-gradient-to-b from-emerald-50 via-white to-white py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-green-600 tracking-tight">Weekly Eco Impact Console</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Monitor your environmental footprint. One verified entry per day. Weekly protocol resets automatically.</p>
        </motion.div>

        {/* Form & Info */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 bg-white rounded-3xl border border-emerald-100 shadow-xl p-8">
            <h3 className="text-xl font-bold text-green-600 mb-6">Daily Impact Input</h3>
            {!canSubmit ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <p className="font-semibold text-green-600">Entry Logged Successfully</p>
                <p className="mt-3 text-gray-600">Next submission unlocks in</p>
                <p className="mt-2 text-xl font-bold text-emerald-700">{formatTime(timeLeft)}</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-3 gap-4">
                  <select value={formData.transport} onChange={e => setFormData({ ...formData, transport: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500">
                    <option value="">Transport Mode</option>
                    {Object.keys(TRANSPORT_CO2).map(k => <option key={k} value={k}>{TRANSPORT_EMOJI[k]} {k.charAt(0).toUpperCase() + k.slice(1)}</option>)}
                  </select>
                  <select value={formData.electricity} onChange={e => setFormData({ ...formData, electricity: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500">
                    <option value="">Electricity Usage</option>
                    {Object.keys(ELECTRICITY_CO2).map(k => <option key={k} value={k}>{ELECTRICITY_EMOJI[k]} {k.charAt(0).toUpperCase() + k.slice(1)}</option>)}
                  </select>
                  <select value={formData.plastic} onChange={e => setFormData({ ...formData, plastic: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500">
                    <option value="">Plastic Consumption</option>
                    {Object.keys(PLASTIC_CO2).map(k => <option key={k} value={k}>{PLASTIC_EMOJI[k]} {k.charAt(0).toUpperCase() + k.slice(1)}</option>)}
                  </select>
                </div>
                <button onClick={handleSubmit} className="mt-8 w-full bg-green-600 text-white py-3 rounded-2xl font-semibold hover:bg-green-700 transition">Submit Eco Log</button>
              </>
            )}
          </motion.div>

          {/* Mission Protocols */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-3xl p-8 text-white shadow-xl">
            <h4 className="text-lg font-bold tracking-wide mb-4">Mission Protocols</h4>
            <ul className="space-y-3 text-sm opacity-90">
              <li>• One verified eco entry per 24h</li>
              <li>• Weekly system reset every Monday</li>
              <li>• Scores calculated in real-time</li>
              <li>• Renewable actions boost rankings</li>
            </ul>
            <button onClick={() => router.push("/leaderboard")} className="mt-8 w-full bg-white text-green-600 font-semibold py-2 rounded-xl hover:bg-emerald-50 transition">View Global Rankings</button>
          </motion.div>
        </div>

        {/* Weekly Telemetry */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Weekly Telemetry</h3>
          {entries.length === 0 ? <p className="text-gray-500">No activity recorded yet.</p> : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {entries.map((e, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-md hover:shadow-xl transition">
                  <p className="text-xs text-gray-500 mb-2">{e.date}</p>
                  <p className="text-sm">Transport: {TRANSPORT_EMOJI[e.transport]} {e.transport}</p>
                  <p className="text-sm">Electricity: {ELECTRICITY_EMOJI[e.electricity]} {e.electricity}</p>
                  <p className="text-sm">Plastic: {PLASTIC_EMOJI[e.plastic]} {e.plastic}</p>
                  <div className="mt-4 pt-3 border-t border-emerald-100">
                    <p className="text-sm font-semibold text-emerald-700">CO₂: {e.totalCO2} kg</p>
                    <p className="text-sm font-bold text-green-700">Eco Score: {e.ecoScore}/100</p>
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
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setPop(false)}></div>
          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-green-600 rounded-2xl shadow-xl w-[90%] max-w-sm p-6 text-center">
            <h1 className="text-lg font-semibold mb-4">{popMessage}</h1>
            {popMessage === "Authentication Required" && <button onClick={() => router.push("/auth")} className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">Proceed to Login</button>}
            {popMessage === "Please fill all fields" && <button onClick={() => setPop(false)} className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">OK</button>}
          </div>
        </>
      )}
    </section>
  );
}
