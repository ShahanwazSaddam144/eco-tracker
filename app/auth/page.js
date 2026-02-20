"use client";

import React, { useEffect, useState } from "react";
import { Leaf, CircleCheck, CircleX, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Spinner component
const Spinner = () => (
  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

// ✅ Custom Toast Component
const Toast = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed top-6 right-6 z-50 min-w-[250px] px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium transition-all ${
        type === "success"
          ? "bg-green-50 border border-green-400 text-green-700"
          : "bg-red-50 border border-red-400 text-red-700"
      }`}
    >
      {type === "success" ? <CircleCheck size={20} /> : <CircleX size={20} />}
      <span>{message}</span>
      <button
        className="ml-auto text-gray-400 hover:text-gray-700"
        onClick={onClose}
      >
        ✕
      </button>
    </motion.div>
  );
};

const AuthPage = () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/");
  }, [router]);

  // Add a toast message
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000); // auto dismiss
  };

  // Remove toast
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handle login/signup submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!isLogin && !name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast("Please fill all required fields correctly.", "error");
      return;
    }

    setIsLoading(true);

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/signin";

      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        addToast(data.message || "Invalid credentials or server error.", "error");
        setIsLoading(false);
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        addToast("Login successful!", "success");
        setTimeout(() => router.replace("/"), 600);
      } else {
        addToast("Account created! Please verify your email.", "success");
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch {
      addToast("Server error. Try again later.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        router.replace("/");
      } else {
        localStorage.removeItem("token"); 
      }
    } catch {
      localStorage.removeItem("token");
    }
  };

  checkAuth();
}, [router]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 px-4 py-12 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Custom Toast Container */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl flex flex-col-reverse md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm border border-white/40 relative z-10"
      >
        {/* LEFT SIDE - BRANDING & INFO */}
        <div className="hidden md:flex flex-col justify-center w-full md:w-1/2 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50/30 p-8 md:p-12 space-y-6 order-2 md:order-1">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-fit p-3 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 animate-glow"
          >
            <Leaf className="w-14 h-14 text-white animate-float" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/">
              <h2 className="text-4xl font-extrabold gradient-text cursor-pointer hover:scale-105 transition-transform">
                EcoTracker
              </h2>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-emerald-700 text-lg leading-relaxed font-medium"
          >
            Track your environmental impact and live sustainably. Monitor your
            energy use, transportation, and plastic footprint to make greener
            choices every day.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="list-disc list-inside text-emerald-700 space-y-3 text-lg font-medium"
          >
            <li>📊 Track daily eco habits</li>
            <li>📈 Visualize your impact with charts</li>
            <li>🎯 Set and achieve sustainability goals</li>
            <li>🏆 Earn badges for eco-friendly actions</li>
          </motion.ul>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
              {isLogin ? "Welcome Back" : "Join EcoTracker"}
            </h1>
            <p className="text-sm text-gray-500">
              {isLogin ? "Track your eco journey" : "Start your sustainability journey"}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-gray-50"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 mt-2 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.name}
                  </motion.p>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-gray-50"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-600 mt-2 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-gray-50"
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-600 mt-2 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.password}
                </motion.p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="btn-primary w-full flex justify-center gap-2 mt-2"
            >
              {isLoading && <Spinner />}
              <span>{isLogin ? "Login" : "Create Account"}</span>
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-8 text-sm md:text-base text-gray-600"
          >
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <motion.button
                  onClick={() => setIsLogin(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
                >
                  Sign up
                </motion.button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <motion.button
                  onClick={() => setIsLogin(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
                >
                  Login
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AuthPage;
