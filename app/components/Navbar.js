"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Menu, X, LogOut } from "lucide-react";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .join("")
    .slice(0, 3);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [pop, setPop] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Tracker", path: "#tracker" },
    { name: "Insight", path: "#causesAndEffects" },
    {name: "Contact", path: "#contact"}
  ];

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

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {}

    localStorage.removeItem("token");
    setUser(null);
    router.push("/auth");
  };

  return (
    <>
      <nav className="fixed z-50 top-0 left-0 w-full bg-gradient-to-r from-white via-emerald-50/50 to-white backdrop-blur-lg border-b border-emerald-100/30 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-emerald-600 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 group-hover:shadow-lg transition-all duration-300">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl sm:text-[28px] font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              EcoTracker
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-2 text-gray-700 font-medium">
            {navLinks.map((item) => (
              <li
                key={item.name}
                className="relative px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-600 hover:text-white transition-all duration-300 group"
              >
                <Link href={item.path}>{item.name}</Link>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            {!user ? (
              <button
                onClick={() => router.push("/auth")}
                className="btn-secondary hover:bg-emerald-500 hover:text-white transition-all duration-300"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link href={"/profile"}>
                <div
                  title={user.name}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {getInitials(user.name)}
                </div>
                </Link>
                <button
                  onClick={() => setPop(true)}
                  className="flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 p-2 hover:bg-emerald-100 rounded-lg transition-all duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <ul className="lg:hidden flex flex-col gap-2 px-6 pb-4 border-t border-emerald-100/50 bg-gradient-to-b from-emerald-50/50 to-transparent">
            {navLinks.map((item) => (
              <li key={item.name} className="py-2 hover:bg-emerald-100/50 rounded-lg px-2 transition-colors duration-300">
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {!user ? (
              <button
                onClick={() => router.push("/auth")}
                className="btn-secondary w-full mt-2"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center justify-between mt-2 p-3 bg-white/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Link href={"/profile"}>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-md">
                    {getInitials(user.name)}
                  </div>
                  <span className="text-sm font-semibold">{user.name}</span>
                  </Link>
                </div>
                <button
                  onClick={() => setPop(true)}
                  className="text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg transition-all duration-300"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </ul>
        )}
      </nav>

      {pop && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => setPop(false)}
          ></div>

          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm p-8 animate-slide-down border border-emerald-100">
            <h1 className="text-lg font-bold text-gray-900 mb-4">
              Confirm Logout
            </h1>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPop(false)}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
