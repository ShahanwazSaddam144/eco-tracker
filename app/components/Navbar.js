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
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/auth/me", {
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
      <nav className="fixed z-50 top-0 left-0 border-b border-gray-300 w-full bg-white">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-green-600">
            <Leaf className="w-8 h-8" />
            <span className="text-xl sm:text-[28px] font-semibold">
              EcoTracker
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
            {navLinks.map((item) => (
              <li
                key={item.name}
                className="hover:bg-green-600 hover:text-white px-4 py-1 rounded-[3px]"
              >
                <Link href={item.path}>{item.name}</Link>
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
                  onClick={() => setPop(true)}
                  className="flex items-center gap-1 text-sm bg-red-600 hover:underline
                  text-white px-4 py-2 rounded-[5px] hover:bg-red-700 text-semibold cursor-pointer"
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
            {navLinks.map((item) => (
              <li key={item.name}>
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
                  onClick={() => setPop(true)}
                  className="text-red-600 flex gap-3 text-[12px] bg-red-600 hover:underline
                  text-white px-2 py-1 rounded-[5px] hover:bg-red-700 text-semibold 
                  items-center cursor-pointer"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            )}
          </ul>
        )}
      </nav>

      {pop && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 w-full min-h-screen"
            onClick={() => setPop(false)}
          ></div>

          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-green-600 rounded-lg shadow-lg w-[90%] max-w-sm p-6">
            <h1 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h1>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPop(false)}
                className="px-4 py-2 border border-green-600 rounded hover:bg-green-600 cursor-pointer hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
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
