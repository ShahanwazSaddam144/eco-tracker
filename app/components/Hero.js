"use client";

import React, { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://wahb-amir-eco-tracker.hf.space/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  return (
    <section className="pt-24 bg-gradient-to-b from-emerald-50 via-white to-transparent flex flex-col justify-center items-center min-h-screen text-center px-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-3xl relative z-10">
        <div className="mb-6 inline-block">
          <div className="p-4 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 animate-glow">
            <Leaf className="w-12 h-12 text-emerald-600 animate-float" />
          </div>
        </div>

        <h1 className="font-black text-[32px] sm:text-[48px] lg:text-[64px] text-gray-900 leading-tight mb-4 animate-slide-up">
          Track Your Impact,{" "}
          <span className="gradient-text block">
            Live a Greener Tomorrow.
          </span>
        </h1>

        <p className="mt-6 text-gray-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          EcoTracker helps you monitor, reduce, and celebrate your eco-friendly
          actions. Make sustainability a habit, one step at a time.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {!user ? (
            <Link href="/auth">
              <button className="btn-primary group">
                <span className="flex items-center gap-2">
                  Get Started
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            </Link>
          ) : (
            <Link href="/profile">
              <button className="btn-primary group">
                <span className="flex items-center gap-2">
                  Visit your Profile
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            </Link>
          )}

          <Link href="/about">
            <button className="btn-secondary group">
              Learn More
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="card-blur p-4 sm:p-6">
            <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              10M+
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Active Eco-Warriors</p>
          </div>
          <div className="card-blur p-4 sm:p-6">
            <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              50K+
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Carbon Saved (Tons)</p>
          </div>
          <div className="card-blur p-4 sm:p-6">
            <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              195+
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Countries Reached</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
