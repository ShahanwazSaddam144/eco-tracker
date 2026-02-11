"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, BarChart2, Award, Leaf } from "lucide-react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Link from "next/link";

const About = () => {
  const team = [
    {
      name: "Shahnawaz Saddam Butt",
      role: "Lead Developer & Eco Advocate",
      image: "/developer.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-green-100 via-green-50 to-white text-center py-28 px-8 overflow-hidden">
        
        {/* Decorative blur circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-green-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-emerald-200/40 rounded-full blur-3xl"></div>

        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold text-green-900 relative z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About EcoTracker 🌍
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-green-800 max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          We help people transform everyday eco-actions into measurable impact.
          Small changes. Big difference.
        </motion.p>
      </section>

      {/* MISSION */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-green-800"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            🌱 Our Mission
          </motion.h2>

          <motion.p
            className="mt-6 text-gray-700 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            EcoTracker empowers individuals to monitor sustainable actions using
            real data insights — helping reduce carbon footprints and celebrate
            eco achievements. We believe daily habits create global transformation.
          </motion.p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gradient-to-b from-green-50 to-white py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-green-800"
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Why EcoTracker?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">

            {[{
              icon: <Globe size={42} />,
              title: "Track Impact",
              desc: "Measure your eco actions and visualize real-world environmental impact."
            },
            {
              icon: <BarChart2 size={42} />,
              title: "Data Insights",
              desc: "Interactive dashboards that turn sustainability into clear insights."
            },
            {
              icon: <Award size={42} />,
              title: "Earn Achievements",
              desc: "Stay motivated with rewards, milestones & eco badges."
            }].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-lg bg-white/70 border-2 border-gray-300 shadow-xl 
                p-10 rounded-2xl transition duration-300 hover:border-green-300
                active:border-green-300 cursor-pointer">
                <div className="text-green-600 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-green-800">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-green-800"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            🌎 Our Core Values
          </motion.h2>

          <ul className="mt-10 space-y-4 text-lg text-green-900">
            {[
              "Environmental Awareness & Education",
              "Data-Driven Sustainable Actions",
              "Community & Collective Progress",
              "Accessibility for Everyone"
            ].map((value, index) => (
              <li
                key={index}
                className="bg-green-50 py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-green-50 py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-green-800"
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            👨‍💻 Meet the Creator
          </motion.h2>

          <div className="flex justify-center mt-14">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-2xl p-8 rounded-2xl text-center border border-green-100 max-w-sm"
              >
                <Image
                  src={member.image}
                  alt="Developer"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto border-4 border-green-200"
                />
                <h3 className="mt-6 text-xl font-bold text-green-800">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>

                <a
                  href="https://shahnawaz.buttnetworks.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-6 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                    Visit Portfolio
                  </button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-500 py-20 text-center px-8 text-white">
        <motion.h3
          className="text-3xl sm:text-4xl font-bold"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Ready to Build a Greener Future? 🌿
        </motion.h3>

        <p className="mt-4 text-lg text-green-100">
          Let’s collaborate and make sustainability smarter.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-white text-green-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-green-100 transition"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
};

export default About;
