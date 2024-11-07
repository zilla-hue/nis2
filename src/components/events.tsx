"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";
import { colors } from "./colors";
import { useTheme } from '@/context/theme-context/ThemeContext';

interface Event {
  date: string;
  time?: string;
  title: string;
  description: string;
  location?: string;
}

const events: Event[] = [
  {
    date: "MAY 15",
    time: "2:00 PM",
    title: "Igbo Fest Festival",
    description:
      "Annual celebration of Igbo culture featuring music, dance, and traditional food.",
    location: "Sunderland City Hall",
  },
  {
    date: "JUN 29",
    time: "6:30 PM",
    title: "Igbo Language Workshop",
    description:
      "Learn and practice Igbo language with native speakers and linguistic experts.",
    location: "Sunderland University, Room 201",
  },
  {
    date: "JUL 10",
    time: "7:00 PM",
    title: "Cultural Dance Night",
    description:
      "Experience the vibrant and energetic traditional dances of the Igbo people.",
    location: "Sunderland Community Center",
  },
  // ... (other events)
];

const EventCard: React.FC<Event> = ({
  date,
  time,
  title,
  description,
  location,
}) => {
  const { theme } = useTheme();

  return (
    <Card
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      data-aos-delay={100}
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <CardHeader
        className="p-4 flex flex-row items-center space-x-4"
        style={{
          backgroundColor:
            theme === "dark" ? colors.dark.accent : colors.light.accent,
          color:
            theme === "dark"
              ? colors.dark.secondary.main
              : colors.light.secondary.main,
        }}
      >
        <div className="text-center">
          <CardTitle className="text-3xl font-bold">
            {date.split(" ")[1]}
          </CardTitle>
          <p className="text-sm uppercase">{date.split(" ")[0]}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          {time && (
            <p className="text-sm flex items-center mt-1">
              <Clock className="w-4 h-4 mr-1" /> {time}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p
          className={`text-sm mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>
        {location && (
          <p
            className={`text-sm flex items-center mb-4 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <MapPin className="w-4 h-4 mr-1" /> {location}
          </p>
        )}
        <Button
          variant="outline"
          className={`w-full transition-all duration-300 ${
            theme === "dark" ? "hover:bg-gray-700" : "hover:bg-red-50"
          }`}
          style={{
            color:
              theme === "dark"
                ? colors.dark.primary.main
                : colors.light.primary.main,
            borderColor:
              theme === "dark"
                ? colors.dark.primary.main
                : colors.light.primary.main,
          }}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

const Events: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section
      className={`py-16 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-gray-800"
          : "bg-gradient-to-b from-white to-red-50"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
            data-aos="fade-up"
          >
            Past{" "}
            <span
              className={theme === "dark" ? "text-red-400" : "text-red-600"}
            >
              Events
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
