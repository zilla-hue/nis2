"use client";
import React from "react";
import EventCard from "./event-card";
import { useTheme } from "@/context/theme-context/ThemeContext";
import newYamBg from "/assets/new-yam-festival.jpg";
import igboDayBg from "/assets/igbo-day.jpg";
import culturalDanceBg from "/assets/about-ndi-igbo-sunderland.jpg";
import igboLanguageBg from "/assets/igbo-language-workshop.jpg";
import igboArtBg from "/assets/art-exhibition.jpg";
import communityOutreachBg from "/assets/community-outreach-program.jpg";
import arrow from "/assets/arrow-button.svg";

const events = [
  {
    title: "New Yam Festival",
    description:
      "Celebrate the New Yam Festival with traditional dances, music, and feasting.",
    date: 15,
    month: "Aug",
    price: "£50",
    arrowImage: arrow,
    backgroundImage: newYamBg,
  },
  {
    title: "Igbo Day",
    description:
      "Join us for Igbo Day, celebrating Igbo heritage and achievements.",
    date: 29,
    month: "Sept",
    price: "£50",
    arrowImage: arrow,
    backgroundImage: igboDayBg,
  },
  {
    title: "Cultural Dance Night",
    description:
      "Experience an evening of traditional Igbo dances and performances.",
    date: 10,
    month: "Oct",
    price: "£50",
    arrowImage: arrow,
    backgroundImage: culturalDanceBg,
  },
  {
    title: "Igbo Language Workshop",
    description:
      "Learn and practice Igbo language in our interactive workshops.",
    date: 5,
    month: "Nov",
    price: "£50",
    arrowImage: arrow,
    backgroundImage: igboLanguageBg,
  },
  {
    title: "Igbo Art Exhibition",
    description:
      "Explore beautiful artworks by Igbo artists at our annual exhibition.",
    date: 12,
    month: "Dec",
    price: "£50",
    arrowImage: arrow,
    backgroundImage: igboArtBg,
  },
  {
    title: "Community Outreach Program",
    description:
      "Participate in our outreach program to support the local Igbo community.",
    date: 20,
    month: "Jan",
    price: "£50",
    arrowImage: arrow,
    backgroundImage: communityOutreachBg,
  },
];

const Popular: React.FC = () => {
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
            Upcoming{" "}
            <span
              className={theme === "dark" ? "text-red-400" : "text-red-600"}
            >
              Events
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard
              key={index}
              date={event.date}
              month={event.month}
              title={event.title}
              description={event.description}
              price={event.price}
              backgroundImage={event.backgroundImage}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            data-aos="fade-up"
            className={`px-8 py-3 rounded text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              theme === "dark"
                ? "bg-red-700 text-white hover:bg-red-800"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default Popular;
