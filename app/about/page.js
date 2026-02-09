"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, BarChart2, Award, Leaf, Users } from "lucide-react";
import Navbar from "../components/Navbar";

const About = () => {
  const team = [
    {
      name: "Shahnawaz Saddam Butt",
      role: "Lead Developer & Eco Advocate",
      emoji: "💻",
    },
    {
      name: "Ayesha",
      role: "Team Member",
      emoji: "🌱",
    },
    {
      name: "Bilal",
      role: "Team Member",
      emoji: "🌿",
    },
    {
      name: "Fatima",
      role: "Team Member",
      emoji: "🌎",
    },
  ];

  return (
    <>
      <Navbar />

      {/* HERO / Header */}
      <section className="bg-green-100 text-center py-24 px-8">
        <motion.h1 
          className="text-5xl font-bold text-green-900"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About EcoTracker
        </motion.h1>
        <motion.p 
          className="mt-6 text-lg text-green-700 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Learn who we are, why we exist, and how we help people make sustainable choices every day.
        </motion.p>
      </section>

      {/* OUR MISSION */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-semibold text-green-800"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Mission
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-700 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            At EcoTracker, our mission is to empower you to track your eco-friendly actions with data-driven insights — helping you reduce your carbon footprint and celebrate every step towards a greener future. We believe small daily actions add up to big global change.
          </motion.p>
        </div>
      </section>

      {/* WHY ECO TRACKER */}
      <section className="bg-green-50 py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-semibold text-green-800"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why EcoTracker?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            <motion.div 
              className="text-center bg-white p-8 rounded-xl shadow hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Globe className="mx-auto text-green-600" size={48} />
              <h3 className="mt-4 text-xl font-medium text-green-700">Track Impact</h3>
              <p className="text-gray-700 mt-2">
                See your eco actions turn into measurable impact you can be proud of.
              </p>
            </motion.div>

            <motion.div 
              className="text-center bg-white p-8 rounded-xl shadow hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <BarChart2 className="mx-auto text-green-600" size={48} />
              <h3 className="mt-4 text-xl font-medium text-green-700">Data Insights</h3>
              <p className="text-gray-700 mt-2">
                Visualize causes & effects of environmental tension clearly and intuitively.
              </p>
            </motion.div>

            <motion.div 
              className="text-center bg-white p-8 rounded-xl shadow hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="mx-auto text-green-600" size={48} />
              <h3 className="mt-4 text-xl font-medium text-green-700">Earn Badges</h3>
              <p className="text-gray-700 mt-2">
                Stay motivated by unlocking achievements for your actions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-semibold text-green-800"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Core Values
          </motion.h2>
          <motion.ul 
            className="mt-8 text-lg text-gray-700 list-disc list-inside space-y-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <li>Environmental Awareness & Education</li>
            <li>Data‑Driven Sustainable Actions</li>
            <li>Community & Collective Progress</li>
            <li>Accessibility for All</li>
          </motion.ul>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-green-50 py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-semibold text-green-800"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Meet the Team
          </motion.h2>
          <p className="text-gray-700 mt-2">
            Passionate developers & eco advocates behind this project.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10">
            {team.map((member, idx) => (
              <motion.div 
                key={idx}
                className="bg-white shadow p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 h-24 bg-green-200 rounded-full mx-auto text-3xl flex items-center justify-center">
                  {member.emoji}
                </div>
                <h3 className="mt-4 font-medium text-green-700">{member.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-green-800 py-16 text-center text-white px-8">
        <motion.h3 
          className="text-2xl font-semibold"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Want to collaborate or talk sustainability?
        </motion.h3>
        <motion.p 
          className="mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Reach out and let’s make an impact together.
        </motion.p>
        <motion.a 
          href="mailto:contact@eco.buttnetworks.com"
          className="inline-block mt-6 bg-white text-green-800 font-semibold px-6 py-3 rounded shadow hover:bg-green-100 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Contact Us
        </motion.a>
      </section>
    </>
  );
};

export default About;
