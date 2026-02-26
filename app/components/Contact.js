"use client";

import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSuccess, setPopupSuccess] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      inquiryType: e.target.inquiryType.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("https://wahb-amir-eco-tracker.hf.space/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setPopupMessage("Message Sent Successfully ✅");
        setPopupSuccess(true);
        setPopup(true);
        e.target.reset();
      } else {
        setPopupMessage(data.message);
        setPopupSuccess(false);
        setPopup(true);
      }
    } catch (error) {
      setPopupMessage("Server Error ❌");
      setPopupSuccess(false);
      setPopup(true);
    }

    setLoading(false);
  };

  return (
    <>
      <section
        id="contact"
        className="w-full bg-gradient-to-b from-green-50 to-white py-16 px-4 sm:px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-700">
              Contact EcoTracker 🌱
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              At <span className="font-semibold text-green-700">EcoTracker</span>,
              we are committed to building innovative solutions that promote
              sustainability and protect our planet.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Leaf className="text-green-600 mt-1" />
                <p className="text-gray-700 text-sm sm:text-base">
                  Promote eco-friendly digital and real-world solutions.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Recycle className="text-green-600 mt-1" />
                <p className="text-gray-700 text-sm sm:text-base">
                  Encourage recycling, waste reduction, and carbon tracking.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="text-green-600 mt-1" />
                <p className="text-gray-700 text-sm sm:text-base">
                  Support global sustainability initiatives.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="text-green-600 mt-1" />
                <p className="text-gray-700 text-sm sm:text-base">
                  Partner with environmental organizations.
                </p>
              </div>
            </div>

            <div className="mt-6 text-gray-600 text-sm sm:text-base">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-green-600" />
                support@ecotracker.com
              </p>
              <p className="flex items-center gap-2 mt-2">
                <Phone size={16} className="text-green-600" />
                +92 300 4907243
              </p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-green-100">
            <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              
              <div className="relative">
                <User className="absolute left-3 top-3 text-green-500" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-green-500" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-green-500" size={18} />
                <select
                  name="inquiryType"
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
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
                  name="message"
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                {loading ? "Sending..." : "Submit Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* POPUP */}
      {popup && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setPopup(false)}
          ></div>

          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-6">
            <h1 className="text-lg font-bold text-green-800 mb-4">
              {popupSuccess ? "Success" : "Error"}
            </h1>

            <p className="text-gray-600 mb-6">{popupMessage}</p>

            <div className="flex justify-end">
              <button
                onClick={() => setPopup(false)}
                className={`px-6 py-2 rounded-lg font-semibold text-white ${
                  popupSuccess
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Contact;