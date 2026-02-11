"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Leaf, Trash2, Award, Mail, User, Car, TrendingUp } from "lucide-react";

const API_BASE = "http://localhost:5000/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletePop, setDeletePop] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const userRes = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUser(userData.user);

        const badgeRes = await fetch(`${API_BASE}/my-badges`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const badgeData = await badgeRes.json();
        setBadges(badgeData.data || []);

        const analyticsRes = await fetch(`${API_BASE}/profile-tracker`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (analyticsRes.ok) {
          const analyticsData = await analyticsRes.json();
          setAnalytics(analyticsData);
        }

      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    setDeleting(true);

    try {
      const res = await fetch(`${API_BASE}/auth/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setDeleting(false);
        alert(data.message || "Failed to delete account");
        return;
      }

      localStorage.clear();
      window.location.href = "/";
    } catch {
      setDeleting(false);
      alert("Something went wrong");
    }
  };

  if (loading)
    return <p className="text-center mt-24 text-gray-500">Loading profile…</p>;

  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-24">

        {/* PROFILE CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col md:flex-row gap-8 
        items-center border-2 border-gray-300 hover:border-green-300 active:border-green-300
        cursor-pointer">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
            {getInitials(user?.name)}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-emerald-700">
              {user?.name}
            </h1>

            <p className="flex items-center gap-2 text-gray-600 mt-2">
              <Mail size={18} /> {user?.email}
            </p>

            <p className="flex items-center gap-2 text-gray-600 mt-1">
              <User size={18} /> Verified: {user?.isVerified ? "Yes ✅" : "No ❌"}
            </p>

            <button
              onClick={() => setDeletePop(true)}
              className="mt-6 flex items-center gap-2 bg-red-600 hover:bg-red-700 font-semibold
              text-white px-6 py-2 rounded-[5px] active:bg-red-700 cursor-pointer">
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>

        {/* ✅ ECO ANALYTICS SECTION */}
        {analytics && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center gap-2">
              <TrendingUp /> Eco Analytics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Total Eco Score */}
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-sm uppercase opacity-80">Total Eco Score</h3>
                <p className="text-3xl font-bold mt-2">
                  {analytics.totalEcoScore}
                </p>
              </div>

              {/* Most Used Transport */}
              <div className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-lg">
                <Car className="text-emerald-600 mb-2" />
                <h3 className="font-semibold text-gray-700">
                  Most Used Transport
                </h3>
                <p className="text-xl font-bold text-emerald-700 mt-2">
                  {analytics.mostUsedTransport}
                </p>
              </div>

              {/* Usage Count */}
              <div className="bg-emerald-50 p-6 rounded-2xl shadow-md">
                <h3 className="text-gray-700 font-semibold">
                  Transport Usage Count
                </h3>
                <p className="text-2xl font-bold text-emerald-600 mt-2">
                  {analytics.transportUsageCount} times
                </p>
              </div>

            </div>
          </div>
        )}

        {/* BADGES SECTION */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-emerald-700">
            <Award /> My Eco Badges
          </h2>

          {badges.length === 0 ? (
            <p className="text-gray-500 mt-4">
              No badges yet. Start eco-friendly activities 🌍
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {badges.map((badge) => (
                <div
                  key={badge._id}
                  className="bg-emerald-50 border-2 border-gray-300 p-6 rounded-xl 
                  shadow hover:scale-105 transition hover:border-green-300 active:border-green-300
                  cursor-pointer"
                >
                  <Leaf className="text-emerald-600 mb-3" size={28} />
                  <h3 className="font-semibold text-lg">{badge.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>

      {/* DELETE POPUP (unchanged) */}
      {deletePop && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setDeletePop(false)}
          />

          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm p-8 border border-emerald-100">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Delete Account
            </h2>

            <p className="text-gray-600 mb-6">
              This action is permanent and will remove all your EcoTracker data.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletePop(false)}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
