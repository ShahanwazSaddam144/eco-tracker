"use client";

import React, { useEffect, useState } from "react";
import { Leaf, CircleCheck, CircleX, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Spinner = () => (
  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

const AuthPage = () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ message: "", type: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/");
  }, [router]);

  useEffect(() => {
    if (popup.message) {
      const timer = setTimeout(() => {
        setPopup({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setPopup({ message: "", type: "" });

    const newErrors = {};
    if (!isLogin && !name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setPopup({
        message: "Please fill all required fields correctly.",
        type: "error",
      });
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
        setPopup({
          message: data.message || "Invalid credentials or server error.",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        setPopup({ message: "Login successful!", type: "success" });
        setTimeout(() => router.replace("/"), 600);
      } else {
        setPopup({
          message: "Account created! Please verify your email.",
          type: "success",
        });
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch {
      setPopup({
        message: "Server error. Try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl flex flex-col-reverse md:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white"
      >
        <div className="hidden md:flex flex-col justify-center w-full md:w-1/2 bg-green-50 p-8 md:p-12 space-y-6 order-2 md:order-1">
          <Leaf className="w-14 h-14 text-green-600 animate-bounce" />
          <Link href="/">
            <h2 className="text-4xl font-extrabold text-green-600">
              EcoTracker
            </h2>
          </Link>
          <p className="text-green-700 text-lg leading-relaxed">
            Track your environmental impact and live sustainably. Monitor your
            energy use, transportation, and plastic footprint to make greener
            choices every day.
          </p>
          <ul className="list-disc list-inside text-green-700 space-y-2 text-lg">
            <li>Track daily eco habits</li>
            <li>Visualize your impact with charts</li>
            <li>Set and achieve sustainability goals</li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center order-1 md:order-2">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-1">
              {isLogin ? "Login to EcoTracker" : "Create your account"}
            </h1>
            <p className="text-sm text-gray-500">
              Track your impact. Live greener.
            </p>
          </div>

          <AnimatePresence>
            {popup.message && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`px-4 py-3 rounded-md flex gap-2 text-sm mb-4 ${
                  popup.type === "success"
                    ? "bg-green-50 border border-green-300 text-green-700"
                    : "bg-red-50 border border-red-300 text-red-700"
                }`}
              >
                {popup.type === "success" ? (
                  <CircleCheck size={18} />
                ) : (
                  <CircleX size={18} />
                )}
                {popup.message}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1 transition"
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1 transition"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-green-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex justify-center gap-2 transition text-lg font-medium"
            >
              {isLoading && <Spinner />}
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm md:text-base">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AuthPage;
