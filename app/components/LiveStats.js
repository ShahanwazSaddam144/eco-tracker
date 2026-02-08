"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wind, Cloud, Trash2 } from "lucide-react";

export default function LiveStatsSection() {
  const [timestamp, setTimestamp] = useState("--:--:--");

  useEffect(() => {
    const update = () => setTimestamp(new Date().toLocaleTimeString());
    update();
    const timer = setInterval(update, 2500);
    return () => clearInterval(timer);
  }, []);

  const [stats, setStats] = useState([
    {
      id: "SNS-AQI-042",
      icon: Wind,
      title: "Global Avg. Air Quality",
      baseValue: 42.4,
      unit: "AQI",
      source: "Copernicus Sentinel-5P",
      color: "text-emerald-500 bg-emerald-500/10",
      borderColor: "hover:border-emerald-500/50",
      coordinates: "40.7128° N, 74.0060° W",
    },
    {
      id: "SNS-CO2-991",
      icon: Cloud,
      title: "Atmospheric CO₂ Concentration",
      baseValue: 421.15,
      unit: "ppm",
      source: "NOAA Mauna Loa Obs.",
      color: "text-sky-500 bg-sky-500/10",
      borderColor: "hover:border-sky-500/50",
      coordinates: "19.5362° N, 155.5763° W",
    },
    {
      id: "SNS-PLST-882",
      icon: Trash2,
      title: "Annual Ocean Plastic Inflow",
      baseValue: 11245902,
      unit: "tons",
      source: "UNEP Marine Litter Tracker",
      color: "text-rose-500 bg-rose-500/10",
      borderColor: "hover:border-rose-500/50",
      coordinates: "Global Aggregate",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
      setStats((prev) =>
        prev.map((s) => ({
          ...s,
          baseValue:
            s.baseValue + (Math.random() - 0.5) * (s.baseValue * 0.0001),
        }))
      );
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 py-20 px-4 md:py-28 overflow-x-hidden border-t-2 border-b-2 border-emerald-200/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">
                🛰️ Live Satellite Uplink
              </span>
            </div>
            <h2 className="text-gray-900 text-3xl md:text-5xl font-black tracking-tight">
              Environmental <span className="gradient-text">Telemetry</span>
            </h2>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Real-time monitoring from global satellite networks</p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 text-emerald-700 px-4 py-3 rounded-lg font-mono text-xs flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold">REF_CLOCK: <span className="text-emerald-600">{timestamp}</span></span>
            </div>
            <span className="hidden md:inline text-emerald-300 text-lg">│</span>
            <span className="font-bold tracking-wider text-emerald-600">
              STATUS: <span className="text-green-600">NOMINAL</span>
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`cursor-pointer relative p-6 bg-gradient-to-br from-white via-white to-emerald-50/20 border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group ${stat.borderColor}`}
              >
                {/* Grid Background Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#000 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`${stat.color} p-4 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-mono text-slate-500 uppercase mb-1 font-bold">
                        {stat.id}
                      </p>
                      <p className="text-[8px] font-mono text-slate-400">
                        📍 {stat.coordinates}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-600 uppercase mb-3 tracking-wide">
                    {stat.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black font-mono tracking-tighter text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-green-600 group-hover:bg-clip-text transition-all duration-300">
                      {stat.baseValue.toLocaleString(undefined, {
                        minimumFractionDigits: stat.unit === "tons" ? 0 : 2,
                        maximumFractionDigits: stat.unit === "tons" ? 0 : 2,
                      })}
                    </span>
                    <span className="text-sm font-bold text-slate-500 uppercase">
                      {stat.unit}
                    </span>
                  </div>

                  <div className="pt-4 border-t-2 border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">
                        📊 Source
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 font-semibold">
                        {stat.source}
                      </span>
                    </div>

                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full transition-all ${stat.color
                          .split(" ")[0]
                          .replace("text", "bg")}`}
                        animate={{ width: ["40%", "60%", "45%"] }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
