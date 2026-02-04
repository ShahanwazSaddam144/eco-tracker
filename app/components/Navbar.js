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
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://192.168.100.77:5000/api/auth/me", {
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
      await fetch("http://192.168.100.77:5000/api/auth/logout", {
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
    <nav className="fixed z-50 top-0 left-0 border-b border-gray-300 w-full bg-white">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-green-600">
          <Leaf className="w-8 h-8" />
          <span className="text-xl sm:text-[28px] font-semibold">
            EcoTracker
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
          {["Home", "About", "Tracker", "Insight"].map((item) => (
            <li
              key={item}
              className="hover:bg-green-600 hover:text-white px-4 py-1 rounded-[3px]"
            >
              <Link href="/">{item}</Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <button
              onClick={() => router.push("/auth")}
              className="px-8 py-2 border border-green-600 text-gray-700 rounded-[3px] hover:text-white hover:bg-green-600 transition"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div
                title={user.name}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-semibold"
              >
                {getInitials(user.name)}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-red-600 hover:underline"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <ul className="lg:hidden flex flex-col gap-4 px-6 pb-4 border-b border-gray-300">
          {["Home", "About", "Tracker", "Insight"].map((item) => (
            <li key={item}>
              <Link href="/" onClick={() => setIsOpen(false)}>
                {item}
              </Link>
            </li>
          ))}

          {!user ? (
            <button
              onClick={() => router.push("/auth")}
              className="border border-green-600 py-2 rounded-[3px]"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center">
                  {getInitials(user.name)}
                </div>
                <span className="text-sm">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
