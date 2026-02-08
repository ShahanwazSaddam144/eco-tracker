import React from "react";
import { Lock } from "lucide-react";

const badges = [
  {
    id: 1,
    title: "Eco Starter",
    description: "Logged your first eco activity",
    unlocked: false,
  },
  {
    id: 2,
    title: "Green Commuter",
    description: "Used eco-friendly transport",
    unlocked: false,
  },
  {
    id: 3,
    title: "Energy Saver",
    description: "Reduced electricity usage",
    unlocked: false,
  },
  {
    id: 4,
    title: "Plastic Fighter",
    description: "Avoided single-use plastic",
    unlocked: false,
  },
  {
    id: 5,
    title: "Eco Hero",
    description: "Maintained eco streak for 7 days",
    unlocked: false,
  },
   {  
    id: 6,
    title: "Eco Master",
    description: "Maintained eco streak for one month days",
    unlocked: false,
  },
];

const Badges = () => {
  return (
    <section className="py-12 px-6 bg-green-50">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-2">
        Unlock Your Badges
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Complete eco-friendly actions to earn achievements
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative p-6 rounded-xl border shadow-sm transition
              ${
                badge.unlocked
                  ? "bg-white border-green-300"
                  : "bg-gray-100 border-gray-200 opacity-70"
              }`}
          >
            {!badge.unlocked && (
              <div className="absolute top-3 right-3 text-gray-500">
                <Lock size={18} />
              </div>
            )}

            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full mb-4
                ${
                  badge.unlocked
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-400"
                }`}
            >
              🌱
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {badge.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {badge.description}
            </p>

            <span
              className={`inline-block mt-4 text-xs font-semibold px-3 py-1 rounded-full
                ${
                  badge.unlocked
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-300 text-gray-600"
                }`}
            >
              {badge.unlocked ? "Unlocked" : "Locked"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Badges;
