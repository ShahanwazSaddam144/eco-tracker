"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Mail,
  MapPin,
  Heart,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CircleCheck,
  CircleX,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Newsletter submit handler
  const handleNewsletter = async (e) => {
    e.preventDefault();

    if (!newsletterEmail) {
      addToast("Please enter your email", "error");
      return;
    }

    try {
      setIsSubscribing(true);

      const res = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        addToast(data.message || "Subscription failed", "error");
      } else {
        addToast(data.message || "Subscribed successfully", "success");
        setNewsletterEmail("");
      }
    } catch (err) {
      addToast("Server error. Try again later.", "error");
    } finally {
      setIsSubscribing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const linkVariants = {
    rest: { color: "rgb(107, 114, 128)" },
    hover: { color: "rgb(16, 185, 129)", transition: { duration: 0.2 } },
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const footerLinks = {
    Product: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
      { name: "Security", href: "/#security" },
      { name: "Roadmap", href: "/#roadmap" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/#blog" },
      { name: "Careers", href: "/#careers" },
      { name: "Press", href: "/#press" },
    ],
    Resources: [
      { name: "Documentation", href: "/#docs" },
      { name: "Help Center", href: "/#help" },
      { name: "Community", href: "/#community" },
      { name: "Contact", href: "#contact" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/#privacy" },
      { name: "Terms of Service", href: "/#terms" },
      { name: "Cookie Policy", href: "/#cookies" },
      { name: "Disclaimer", href: "/#disclaimer" },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-emerald-50 border-t border-emerald-100/30 relative">
      {/* Toast Notifications */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed top-6 right-6 z-50 min-w-[250px] px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium transition-all ${
              toast.type === "success"
                ? "bg-green-50 border border-green-400 text-green-700"
                : "bg-red-50 border border-red-400 text-red-700"
            }`}
          >
            {toast.type === "success" ? <CircleCheck size={20} /> : <CircleX size={20} />}
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-auto text-gray-400 hover:text-gray-700">
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Footer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20"
      >
        {/* Top Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand & Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 group-hover:shadow-lg transition-all duration-300">
                <Leaf className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl sm:text-2xl font-bold gradient-text">EcoTracker</span>
            </Link>
            <p className="text-gray-700 leading-relaxed max-w-md text-sm sm:text-base">
              Track your environmental impact and make a difference. Join thousands of eco-warriors in creating a sustainable future for our planet.
            </p>

            <motion.div variants={itemVariants} className="flex flex-col gap-3 mt-6">
              <a href="mailto:contact@ecotracker.com" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors text-sm sm:text-base">
                <Mail size={18} /> contact@ecotracker.com
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors text-sm sm:text-base">
                <MapPin size={18} /> Global Community
              </a>
            </motion.div>
          </div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-700 text-sm sm:text-base mb-4">
              Get tips, updates, and eco-friendly news delivered to your inbox.
            </p>
            <motion.form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/80 text-sm sm:text-base"
              />
              <motion.button
                type="submit"
                disabled={isSubscribing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary whitespace-nowrap px-6 py-3"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Links Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 py-8 border-y border-emerald-100/50">
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <motion.a href={link.href} variants={linkVariants} initial="rest" whileHover="hover" className="text-gray-700 text-xs sm:text-sm transition-colors duration-200">
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Social & Copyright */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div variants={containerVariants} className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }} className="p-3 rounded-full bg-white/60 backdrop-blur-sm border border-emerald-100/50 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md" title={label}>
                <Icon className="w-5 h-5 text-emerald-600" />
              </motion.a>
            ))}
          </motion.div>
          <motion.div className="text-center sm:text-right text-gray-700 text-xs sm:text-sm">
            <p>
              © {currentYear} EcoTracker. Made with{" "}
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }} className="inline-block text-red-500">
                <Heart size={14} />
              </motion.span>{" "}
              for the planet.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Accent Bar */}
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 origin-left" />
    </footer>
  );
};

export default Footer;