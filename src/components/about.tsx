'use client';
import React from 'react';
import about from '/assets/about-ndi-igbo-sunderland.jpg';
import { Link } from 'react-router-dom';
import { Info, Users, Calendar } from 'lucide-react';
import { useTheme } from '@/context/theme-context/ThemeContext';
import Organogram from './organogram';

const About: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <section
        className={`relative py-20 md:py-32 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 to-gray-800'
            : 'bg-gradient-to-br from-red-50 to-white'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            data-aos="fade-up"
          >
            About{' '}
            <span
              className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}
            >
              Ndi Igbo Sunderland
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              className={`space-y-8 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <p className="text-lg leading-relaxed">
                Ndi Igbo Sunderland is a vibrant and dynamic not-for-profit
                community interest organisation based in Sunderland, United
                Kingdom. Our mission is to preserve, celebrate, and promote the
                Black and Minority Ethnic (BME) Igbo culture in Sunderland and
                the surrounding areas while fostering diversity, social
                cohesion, and integration within the wider Sunderland community.
              </p>

              <div className="mt-10 space-y-6">
                <div
                  className={`flex items-center space-x-4 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } p-4 rounded-lg shadow-md transition-transform hover:scale-105`}
                >
                  <Info
                    className={
                      theme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }
                  />
                  <span className="text-lg font-semibold">
                    Discover Our Heritage
                  </span>
                </div>
                <div
                  className={`flex items-center space-x-4 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } p-4 rounded-lg shadow-md transition-transform hover:scale-105`}
                >
                  <Users
                    className={
                      theme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }
                  />
                  <span className="text-lg font-semibold">
                    Connect with Community
                  </span>
                </div>
                <div
                  className={`flex items-center space-x-4 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } p-4 rounded-lg shadow-md transition-transform hover:scale-105`}
                >
                  <Calendar
                    className={
                      theme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }
                  />
                  <span className="text-lg font-semibold">
                    Join Cultural Events
                  </span>
                </div>
              </div>
            </div>

            <div className="relative" data-aos="zoom-in" data-aos-delay="400">
              <img
                src={about}
                alt="Igbo cultural celebration"
                className="rounded-2xl shadow-2xl relative w-full h-auto"
                style={{
                  filter:
                    theme === 'dark'
                      ? 'brightness(0.8) contrast(1.2)'
                      : 'brightness(0.9) contrast(1.1)',
                }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${
                  theme === 'dark' ? 'from-red-800' : 'from-red-600'
                } to-transparent opacity-30 rounded-2xl`}
              ></div>
            </div>
          </div>

          <div
            className="mt-16 text-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <Link
              to="/about-us"
              className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg text-white ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-950'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg`}
            >
              Explore Our Story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
