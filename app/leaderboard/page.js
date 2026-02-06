"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:5000/api";

const LeaderBoard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard-tracker`)
      .then(r => r.json())
      .then(d => d.success && setData(d.leaderboard)); // <- updated key
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-green-600 text-center mb-12"
          >
            Global Eco Leaderboard
          </motion.h2>

          <div className="overflow-x-auto border rounded-3xl shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-4">Rank</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Total Eco Score</th>
                  <th className="p-4">Total CO₂</th>
                  <th className="p-4">Entries</th>
                </tr>
              </thead>
              <tbody>
                {data.map((u, i) => (
                  <motion.tr
                    key={u.email}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b hover:bg-emerald-50"
                  >
                    <td className="p-4 font-bold text-green-700">#{u.rank}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4 font-semibold text-green-700">{u.totalEcoScore}</td>
                    <td className="p-4">{u.totalCO2.toFixed(1)} kg</td>
                    <td className="p-4">{u.entries}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeaderBoard;
