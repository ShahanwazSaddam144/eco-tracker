"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  BarChart2,
  Award,
  Leaf,
  Target,
  Users,
  Lightbulb,
  Heart,
  ArrowRight,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Link from "next/link";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  const features = [
    {
      icon: <Globe size={48} />,
      title: "Track Impact",
      desc: "Measure your eco actions and visualize real-world environmental impact with precision.",
    },
    {
      icon: <BarChart2 size={48} />,
      title: "Data Insights",
      desc: "Interactive dashboards that turn sustainability into clear, actionable insights.",
    },
    {
      icon: <Award size={48} />,
      title: "Earn Achievements",
      desc: "Stay motivated with rewards, milestones & exclusive eco badges.",
    },
  ];

  const values = [
    {
      icon: <Target size={24} />,
      title: "Environmental Awareness",
      desc: "Education through action",
    },
    {
      icon: <Zap size={24} />,
      title: "Data-Driven Actions",
      desc: "Measurable sustainability",
    },
    {
      icon: <Users size={24} />,
      title: "Community Power",
      desc: "Collective global impact",
    },
    {
      icon: <Heart size={24} />,
      title: "Accessibility",
      desc: "For everyone, everywhere",
    },
  ];

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

      {/* HERO SECTION */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center overflow-hidden px-4 py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 flex justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-4 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 animate-glow"
            >
              <Leaf className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6"
          >
            <span className="gradient-text block">About EcoTracker</span>
            <span className="text-gray-700">Transforming Tomorrow</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            We empower individuals to track, understand, and celebrate their
            environmental impact. Every action counts. Every person matters.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/auth">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2 group"
              >
                Start Tracking
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-20 sm:py-28 px-4 bg-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-100"
              >
                <Leaf size={16} className="text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  Our Mission
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6"
              >
                Empowering Sustainable Living
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-gray-700 text-lg leading-relaxed mb-6"
              >
                EcoTracker empowers individuals to monitor sustainable actions
                using real data insights — helping reduce carbon footprints and
                celebrate eco achievements. We believe daily habits create
                global transformation.
              </motion.p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  "Track daily eco-friendly actions",
                  "Measure environmental impact",
                  "Join a global community",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"
                    >
                      <motion.div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    </motion.div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-100 rounded-3xl" />
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute inset-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Leaf className="w-24 h-24 text-white opacity-80" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-emerald-50/50 to-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">
              Why Choose EcoTracker?
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Comprehensive tools to make environmental tracking simple and
              rewarding
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover="hover"
                className="group card-blur bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-600 mb-6 group-hover:scale-110 transition-transform"
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{feature.desc}</p>

                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="h-1 bg-gradient-to-r from-emerald-400 to-green-600 mt-6 rounded-full"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-20 sm:py-28 px-4 bg-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-100"
            >
              <Heart size={16} className="text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">
                Our Values
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4"
            >
              Built on Core Principles
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover="hover"
                className="group card-blur bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-600 mb-4 group-hover:scale-125 transition-transform"
                >
                  {value.icon}
                </motion.div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-emerald-50/50 to-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">
              Meet the Creator
            </h2>
            <p className="text-gray-700 text-lg">
              Passionate developer dedicated to sustainable innovation
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover="hover"
                className="card-blur bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 sm:p-10 text-center max-w-sm shadow-lg hover:shadow-2xl transition-all"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="relative w-32 h-32 mx-auto mb-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur" />
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="relative rounded-full mx-auto border-4 border-white object-cover"
                  />
                </motion.div>

                <motion.h3
                  variants={itemVariants}
                  className="text-2xl font-bold gradient-text mb-2"
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-gray-700 font-medium mb-6"
                >
                  {member.role}
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-600 text-sm leading-relaxed mb-8"
                >
                  Passionate developer with a mission to make environmental
                  tracking accessible to everyone.
                </motion.p>

                <a
                  href="https://shahnawaz.buttnetworks.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2 group mx-auto"
                  >
                    Visit Portfolio
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-white/5"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 text-white"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our Growing Impact
            </h2>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
              Together, we're making a real difference for our planet
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { value: "10M+", label: "Active Eco-Warriors" },
              { value: "50K+", label: "Carbon Saved (Tons)" },
              { value: "195+", label: "Countries Reached" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.2, type: "spring" }}
                  className="text-4xl sm:text-5xl md:text-6xl font-black mb-3"
                >
                  {stat.value}
                </motion.div>
                <p className="text-lg text-emerald-100">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-white to-emerald-50/30 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6"
            >
              Ready to Make a Difference?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Join thousands of eco-warriors tracking their impact and building
              a sustainable future. Start your journey today.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2 group"
                >
                  Get Started Now
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </Link>

              <a href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2"
                >
                  Contact Us
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default About;
