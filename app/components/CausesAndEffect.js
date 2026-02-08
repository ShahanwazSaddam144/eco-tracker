"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


const causes = [
  {
    title: "Air & Water Pollution",
    desc: "Toxic emissions and untreated waste degrade air and water quality.",
    img: "/causesImages/airPollution.jpeg",
    severity: "High",
    stat: "7M+ premature deaths annually linked to pollution",
    insight: "Eco-Tracker monitors pollution indicators and visualizes risk zones.",
  },
  {
    title: "Deforestation",
    desc: "Large-scale tree loss disrupts ecosystems and carbon balance.",
    img: "/causesImages/deforestion.jpeg",
    severity: "Critical",
    stat: "10M hectares of forest lost every year",
    insight: "Our platform tracks deforestation trends using open datasets.",
  },
  {
    title: "Overconsumption",
    desc: "Excessive use of natural resources exceeds Earth’s capacity.",
    img: "/causesImages/overconsumption.jpg",
    severity: "Medium",
    stat: "Humanity uses 1.7× Earth’s resources yearly",
    insight: "Eco-Tracker promotes data-driven sustainable consumption.",
  },
  {
    title: "Plastic Waste",
    desc: "Non-biodegradable plastics pollute land and marine life.",
    img: "/causesImages/plasticwaste.jpg",
    severity: "High",
    stat: "11M tons of plastic enter oceans annually",
    insight: "We analyze waste patterns to support smarter recycling policies.",
  },
];

const effects = [
  {
    title: "Climate Change",
    desc: "Rising global temperatures cause extreme weather patterns.",
    img: "/effectImages/climateChange.jpeg",
    impact: "Global",
    stat: "1.1°C temperature rise since pre-industrial era",
    insight: "Eco-Tracker visualizes climate risk forecasts for awareness.",
  },
  {
    title: "Loss of Biodiversity",
    desc: "Species extinction increases due to habitat destruction.",
    img: "/effectImages/lossBio.jpeg",
    impact: "Ecosystems",
    stat: "1M species at risk of extinction",
    insight: "Our dashboards highlight biodiversity-threat zones.",
  },
  {
    title: "Water Scarcity",
    desc: "Clean water availability decreases worldwide.",
    img: "/effectImages/waterSecarity.jpeg",
    impact: "Human Survival",
    stat: "2B people lack safe drinking water",
    insight: "Eco-Tracker maps water stress regions in real time.",
  },
  {
    title: "Health Issues",
    desc: "Pollution contributes to respiratory and chronic diseases.",
    img: "/effectImages/healthImages.jpeg",
    impact: "Public Health",
    stat: "Air pollution causes 1 in 9 deaths globally",
    insight: "We connect environmental data with health risk awareness.",
  },
];

   {/*REUSABLE CARDS*/}

const CauseCard = ({ item }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.03 }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="card-elevated bg-gradient-to-br from-white via-emerald-50/30 to-green-50/20 border border-emerald-100/50 overflow-hidden group"
  >
    <div className="relative overflow-hidden h-40">
      <Image
        src={item.img}
        alt={item.title}
        width={300}
        height={300}
        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        {item.severity}
      </span>
    </div>

    <div className="p-5 text-center">
      <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors duration-300">
        {item.title}
      </h4>

      <p className="text-sm text-gray-700 mb-3">{item.desc}</p>

      <div className="space-y-2 pt-3 border-t border-emerald-100">
        <p className="text-xs text-emerald-600 font-bold">📊 {item.stat}</p>
        <p className="text-xs text-gray-600 italic">💡 {item.insight}</p>
      </div>
    </div>
  </motion.div>
);

const EffectCard = ({ item }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.03 }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="card-elevated bg-gradient-to-br from-white via-red-50/20 to-orange-50/20 border border-red-100/50 overflow-hidden group"
  >
    <div className="relative overflow-hidden h-40">
      <Image
        src={item.img}
        alt={item.title}
        width={300}
        height={300}
        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        {item.impact}
      </span>
    </div>

    <div className="p-5 text-center">
      <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-red-600 transition-colors duration-300">
        {item.title}
      </h4>

      <p className="text-sm text-gray-700 mb-3">{item.desc}</p>

      <div className="space-y-2 pt-3 border-t border-red-100">
        <p className="text-xs text-red-600 font-bold">📉 {item.stat}</p>
        <p className="text-xs text-gray-600 italic">💡 {item.insight}</p>
      </div>
    </div>
  </motion.div>
);


   {/* MAIN SECTION */}

const CausesAndEffect = () => {
  return (
    <section
      className="bg-gradient-to-b from-white via-emerald-50/50 to-white py-20 px-4 overflow-hidden relative"
      id="causesAndEffects"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
            Causes & Effects of Environmental Tension
          </h2>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
            Eco-Tracker identifies the root causes of environmental stress and
            translates complex data into meaningful insights for awareness,
            policy support, and sustainable action.
          </p>
        </motion.div>

        { /* CAUSES */ }
        <div className="mb-24">
          <h3 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-8 flex items-center gap-3">
            <span className="text-3xl">🌿</span> Causes of Environmental Tension
          </h3>

          {/* Mobile Swiper */}
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1.1}
            >
              {causes.map((item, index) => (
                <SwiperSlide key={index}>
                  <CauseCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-6">
            {causes.map((item, index) => (
              <CauseCard key={index} item={item} />
            ))}
          </div>
        </div>

        {/* EFFECTS */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-red-600 mb-8 flex items-center gap-3">
            <span className="text-3xl">⚠️</span> Effects on Our Environment
          </h3>

          {/* Mobile Swiper */}
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3200 }}
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1.1}
            >
              {effects.map((item, index) => (
                <SwiperSlide key={index}>
                  <EffectCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-6">
            {effects.map((item, index) => (
              <EffectCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CausesAndEffect;
