"use client";
// import Image from "next/image";
import React from "react";
import { useTheme } from "@/context/theme-context/ThemeContext";
import culturalFestivals from "/assets/cultural-festivals.jpg";
import educationalWorkshop from "/assets/educational-workshop.jpg";
import communitySupport from "/assets/community-support.jpg";
import heritagePreservation from "/assets/heritage-preservation.jpg";

const activities = [
  {
    title: "Cultural Festivals",
    description: "We organize vibrant cultural festivals celebrating Igbo traditions, music, dance, and food.",
    image: culturalFestivals,
    delay: "0",
  },
  {
    title: "Educational Workshops",
    description: "We conduct workshops on Igbo language, history, and crafts to educate and inspire the community.",
    image: educationalWorkshop,
    delay: "100",
  },
  {
    title: "Community Support",
    description: "We offer support and resources to Igbo individuals and families to foster a strong and connected community.",
    image: communitySupport,
    delay: "200",
  },
  {
    title: "Heritage Preservation",
    description: "We work to preserve Igbo heritage through documentation, archiving, and promotion of traditional practices.",
    image: heritagePreservation,
    delay: "300",
  },
];

const WhatWeDoPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section
      className={`py-20 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-gray-800"
          : "bg-gradient-to-b from-white to-red-50"
      }`}
    >
      <div className="container mx-auto px-4">
        <div data-aos="fade-up" className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Our{" "}
            <span
              className={theme === "dark" ? "text-red-400" : "text-red-600"}
            >
              Activities
            </span>
          </h2>
          <p
            className={`mt-4 text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Celebrating and preserving Igbo culture in Sunderland
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={activity.delay}
              className={`group ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl`}
            >
              <div className="relative h-48 md:h-64">
              <img
        src={activity.image}
        alt={activity.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {activity.title}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {activity.description}
                </p>
                <button
                  className={`px-4 py-2 ${
                    theme === "dark"
                      ? "bg-red-700 hover:bg-red-800"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white text-sm font-medium rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                >
                  Learn more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoPage;
