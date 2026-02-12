"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Leaf,
  Globe,
  ShieldCheck,
  Recycle,
  Mail,
  User,
  MessageSquare,
  Phone,
} from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="contact"
      className="w-full min-h-screen bg-gradient-to-b from-green-50 to-white py-20 px-6 md:px-16"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE - COMPANY INFO */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-green-700">
            Contact EcoTracker 🌱
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            At <span className="font-semibold text-green-700">EcoTracker</span>, 
            we are committed to building innovative solutions that promote 
            sustainability and protect our planet. Join us in creating a cleaner, 
            greener future.
          </p>

          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-4">
              <Leaf className="text-green-600 mt-1" />
              <p className="text-gray-700">
                Promote eco-friendly digital and real-world solutions.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <Recycle className="text-green-600 mt-1" />
              <p className="text-gray-700">
                Encourage recycling, waste reduction, and carbon tracking.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <Globe className="text-green-600 mt-1" />
              <p className="text-gray-700">
                Support global sustainability initiatives.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="text-green-600 mt-1" />
              <p className="text-gray-700">
                Partner with organizations committed to environmental impact.
              </p>
            </div>
          </div>

          <div className="mt-6 text-gray-600">
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-green-600" />
              support@ecotracker.com
            </p>
            <p className="flex items-center gap-2 mt-2">
              <Phone size={16} className="text-green-600" />
              +92 300 4907243
            </p>
          </div>
        </motion.div>

        {/* RIGHT SIDE - CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-2xl rounded-3xl p-8 border border-green-100"
        >
          <h3 className="text-2xl font-semibold text-green-700 mb-6">
            Send Us a Message
          </h3>

          <form className="space-y-6">
            
            <div className="relative">
              <User className="absolute left-3 top-3 text-green-500" size={18} />
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-green-500" size={18} />
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-green-500" size={18} />
              <select
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-600"
                required
              >
                <option value="">Select Inquiry Type</option>
                <option>Environmental Partnership</option>
                <option>EcoTracker Services</option>
                <option>Volunteer / Collaboration</option>
                <option>General Inquiry</option>
              </select>
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-green-500" size={18} />
              <textarea
                rows="4"
                placeholder="Write your message about sustainability or our services..."
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition duration-300"
            >
              Submit Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
