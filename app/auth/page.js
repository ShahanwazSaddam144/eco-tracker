"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Leaf, CircleCheck, CircleX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
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

  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ message: "", type: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
  }, [router]);

  const isFormValid = useMemo(() => {
    if (!email || !password) return false;
    if (!isLogin && !name) return false;
    return true;
  }, [isLogin, name, email, password]);

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

      const data = await res.json();

      if (!res.ok) {
        setPopup({
          message: data.message || "Something went wrong",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        setPopup({ message: "Login successful!", type: "success" });
        setTimeout(() => {
          router.replace("/");
        }, 600);
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
      setPopup({ message: "Server error. Try again later.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="pt-[80px] mt-11">
        <div className="flex items-center justify-center bg-gray-50 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-white border border-green-600 rounded-lg p-6 shadow-sm"
          >
            <div className="flex flex-col items-center mb-4">
              <Leaf className="w-10 h-10 text-green-600 mb-2 animate-bounce" />
              <h1 className="text-2xl font-semibold text-gray-800">
                {isLogin ? "Login to EcoTracker" : "Create your account"}
              </h1>
              <p className="text-sm text-gray-500">
                Track your impact. Live greener.
              </p>
            </div>

            <div className="mb-4">
              <AnimatePresence>
                {popup.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`px-4 py-3 rounded-md flex gap-2 text-sm ${
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
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
                {errors.password && (
                  <p className="text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="bg-green-600 text-white py-2 rounded-md flex justify-center gap-2"
              >
                {isLoading && <Spinner />}
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="text-center mt-6 text-sm">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-green-600"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-green-600"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AuthPage;
