"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Flame } from "lucide-react";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:5000/api";

const getRankMedal = (rank) => {
  if (rank === 1) return { icon: "🥇", color: "text-yellow-500", bgColor: "bg-yellow-100" };
  if (rank === 2) return { icon: "🥈", color: "text-gray-500", bgColor: "bg-gray-100" };
  if (rank === 3) return { icon: "🥉", color: "text-orange-600", bgColor: "bg-orange-100" };
  return { icon: "⭐", color: "text-emerald-500", bgColor: "bg-emerald-100" };
};

const LeaderBoard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard-tracker`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setData(d.leaderboard);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <Navbar />
      <section className="pt-24 bg-gradient-to-b from-white via-emerald-50/40 to-white min-h-screen py-20 px-4 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-200/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-green-200/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-10 h-10 text-yellow-500 animate-bounce" />
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 bg-clip-text text-transparent">
                Global Eco Leaderboard
              </h2>
              <Trophy className="w-10 h-10 text-yellow-500 animate-bounce" style={{ animationDelay: "0.1s" }} />
            </div>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              🌍 Celebrate the world's top eco-warriors. See who's making the biggest environmental impact!
            </p>
          </motion.div>

          {/* Stats Summary */}
          {data.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-4 mb-12"
            >
              <div className="card-blur p-6 text-center group hover:shadow-xl transition-all duration-300">
                <p className="text-4xl font-black gradient-text mb-2">{data.length}</p>
                <p className="text-gray-700 font-semibold">Active Warriors</p>
              </div>
              <div className="card-blur p-6 text-center group hover:shadow-xl transition-all duration-300">
                <p className="text-4xl font-black text-emerald-600 mb-2">{(data.reduce((acc, u) => acc + u.totalCO2, 0)).toFixed(0)}</p>
                <p className="text-gray-700 font-semibold">Total CO₂ Saved (kg)</p>
              </div>
              <div className="card-blur p-6 text-center group hover:shadow-xl transition-all duration-300">
                <p className="text-4xl font-black text-green-600 mb-2">{(data.reduce((acc, u) => acc + u.totalEcoScore, 0)).toFixed(0)}</p>
                <p className="text-gray-700 font-semibold">Combined Eco Score</p>
              </div>
            </motion.div>
          )}

          {/* Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="overflow-hidden rounded-3xl shadow-2xl border-2 border-emerald-100/50"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
                    <th className="p-5 font-bold text-lg">Rank</th>
                    <th className="p-5 font-bold text-lg">🌍 Eco-Warrior</th>
                    <th className="p-5 font-bold text-lg">💚 Eco Score</th>
                    <th className="p-5 font-bold text-lg">🔥 CO₂ Reduced</th>
                    <th className="p-5 font-bold text-lg">📝 Entries</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-bounce"></div>
                          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-12 text-center">
                        <p className="text-gray-500 text-lg font-semibold">No data available yet. Be the first eco-warrior! 🌱</p>
                      </td>
                    </tr>
                  ) : (
                    <motion.tbody
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {data.map((u, i) => {
                        const medal = getRankMedal(u.rank);
                        const isTopThree = u.rank <= 3;

                        return (
                          <motion.tr
                            key={u.email}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, backgroundColor: isTopThree ? "rgba(16, 185, 129, 0.08)" : "rgba(16, 185, 129, 0.05)" }}
                            className={`border-b-2 border-emerald-100/30 transition-all duration-300 ${
                              isTopThree
                                ? "bg-gradient-to-r from-emerald-50/50 to-green-50/30"
                                : "bg-white hover:bg-emerald-50/50"
                            }`}
                          >
                            <td className={`p-5 font-bold text-center ${isTopThree ? "text-2xl" : "text-lg"}`}>
                              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold ${medal.bgColor}`}>
                                <span className="text-xl">{medal.icon}</span>
                              </div>
                            </td>
                            <td className="p-5">
                              <div className="font-bold text-gray-900 text-lg">
                                {u.email.split("@")[0]}
                              </div>
                              <div className="text-sm text-gray-500">{u.email}</div>
                            </td>
                            <td className="p-5">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="font-bold text-emerald-600 text-lg">
                                  {u.totalEcoScore.toFixed(0)}
                                </span>
                                <span className="text-gray-500 text-sm">/100</span>
                              </div>
                            </td>
                            <td className="p-5">
                              <div className="flex items-center gap-2">
                                <Flame className="w-5 h-5 text-orange-500" />
                                <span className="font-bold text-gray-900">
                                  {u.totalCO2.toFixed(1)}
                                </span>
                                <span className="text-gray-500 text-sm">kg</span>
                              </div>
                            </td>
                            <td className="p-5">
                              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold">
                                <span className="text-lg">📊</span>
                                {u.entries}
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </motion.tbody>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 text-sm">
              🎯 Keep tracking your eco-friendly actions to climb the global rankings!
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LeaderBoard;
