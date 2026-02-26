"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Leaf, Trash2, Award, Mail, User, Car, TrendingUp, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const API_BASE = "https://wahb-amir-eco-tracker.hf.space/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)",
    transition: { duration: 0.3 },
  },
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletePop, setDeletePop] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

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

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}

    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full"
        />
      </div>
    );

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24"
        >
          {/* PROFILE HEADER */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <div className="card-blur bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-white/40">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                {/* AVATAR */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-lg animate-glow">
                    {getInitials(user?.name)}
                  </div>
                </motion.div>

                {/* USER INFO */}
                <div className="flex-1">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
                      {user?.name}
                    </h1>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-2">
                    <p className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <Mail size={18} className="text-emerald-600" /> {user?.email}
                    </p>

                    <p className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <User size={18} className="text-emerald-600" /> 
                      {user?.isVerified ? (
                        <span className="text-green-600 font-semibold">✅ Verified</span>
                      ) : (
                        <span className="text-orange-600 font-semibold">⏳ Pending Verification</span>
                      )}
                    </p>
                  </motion.div>

                  {/* ACTION BUTTONS */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-3 mt-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <LogOut size={18} />
                      Logout
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDeletePop(true)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Trash2 size={18} />
                      Delete Account
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ECO ANALYTICS SECTION */}
          {analytics && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3 text-emerald-700"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp size={28} />
                </motion.div>
                Eco Analytics
              </motion.h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Total Eco Score */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="group bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 sm:p-8 rounded-2xl shadow-lg overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="text-sm uppercase opacity-80 font-semibold tracking-widest">Total Eco Score</h3>
                  <motion.p
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-4xl sm:text-5xl font-black mt-3"
                  >
                    {analytics.totalEcoScore}
                  </motion.p>
                  <p className="text-emerald-100 text-sm mt-2">Keep up the great work! 🌱</p>
                </motion.div>

                {/* Most Used Transport */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="card-blur bg-white/80 backdrop-blur-xl border border-white/40 p-6 sm:p-8 rounded-2xl shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Car className="text-emerald-600 mb-3" size={28} />
                  </motion.div>
                  <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-widest">Most Used Transport</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-700 mt-3">
                    {analytics.mostUsedTransport || "N/A"}
                  </p>
                </motion.div>

                {/* Usage Count */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="card-blur bg-white/80 backdrop-blur-xl border border-white/40 p-6 sm:p-8 rounded-2xl shadow-lg"
                >
                  <h3 className="text-gray-800 font-semibold text-sm uppercase tracking-widest">Transport Journeys</h3>
                  <motion.p
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-3xl sm:text-4xl font-black text-emerald-600 mt-3"
                  >
                    {analytics.transportUsageCount}
                  </motion.p>
                  <p className="text-gray-600 text-xs mt-2">total journeys tracked</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* BADGES SECTION */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3 text-emerald-700"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Award size={28} />
              </motion.div>
              My Eco Badges
            </motion.h2>

            {badges.length === 0 ? (
              <motion.div
                variants={cardVariants}
                className="card-blur bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-8 sm:p-12 text-center"
              >
                <motion.p
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-3"
                >
                  🌍
                </motion.p>
                <p className="text-gray-700 text-lg font-medium">No badges yet</p>
                <p className="text-gray-600 text-sm mt-2">Start eco-friendly activities to earn badges!</p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {badges.map((badge, idx) => (
                  <motion.div
                    key={badge._id}
                    variants={cardVariants}
                    whileHover="hover"
                    custom={idx}
                    className="group card-blur bg-white/80 backdrop-blur-xl border border-emerald-100/50 hover:border-emerald-300 p-6 rounded-2xl shadow-lg"
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block"
                    >
                      <Leaf className="text-emerald-600 mb-4" size={32} />
                    </motion.div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{badge.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{badge.description}</p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                      className="h-1 bg-gradient-to-r from-emerald-400 to-green-600 mt-4 rounded-full"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* DELETE POPUP - ANIMATED */}
      <AnimatePresence>
        {deletePop && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletePop(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-[90%] max-w-md p-8 border border-emerald-100"
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-gray-900 mb-4"
              >
                Delete Account
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 mb-8 leading-relaxed"
              >
                This action is permanent and will remove all your EcoTracker data. Are you sure?
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-end gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDeletePop(false)}
                  className="btn-secondary"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
                >
                  {deleting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
