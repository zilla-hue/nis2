'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { colors } from '../components/colors';
import HeaderSection from '@/components/sections/header-section';
import FooterSection from '@/components/sections/footer-section';
import { useTheme } from '@/context/theme-context/ThemeContext';
import groupImage from '/assets/ndi-igbo-sunderland-group.jpg';
import eventImage from '/assets/igbo-cultural-event.jpg';
import Organogram from '../components/organogram';

const AboutUs: React.FC = () => {
  const { theme } = useTheme();
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.play().catch((error) => {
        console.error('Error attempting to play video:', error);
        setVideoError(true);
      });
    }
  }, []);

  return (
    <div className={theme}>
      <HeaderSection />
      <div className="relative h-120">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            controls
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/igbo-culture-poster.jpg"
            onError={() => setVideoError(true)}
          >
            <source src="/videos/igbo-culture-poster.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src="/images/igbo-culture-poster.jpg"
            alt="Igbo culture background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <h1 className="text-4xl font-bold mb-6 text-center text-white text-shadow-lg mt-20">
            About Ndi Igbo Sunderland
          </h1>
          <p className="text-xl text-center text-white mb-8">
            Preserving and celebrating Igbo culture in Sunderland
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Card
          className={`mb-12 ${
            theme === 'dark'
              ? 'dark:bg-gray-800 dark:text-white'
              : 'bg-white text-gray-900'
          }`}
        >
          <CardHeader
            className={
              theme === 'dark' ? 'dark:text-gray-100' : 'text-gray-900'
            }
          >
            <CardTitle className="text-3xl font-semibold">Who We Are</CardTitle>
          </CardHeader>
          <CardContent
            className={`flex flex-col md:flex-row items-center ${
              theme === 'dark' ? 'dark:text-gray-300' : 'text-gray-700'
            }`}
          >
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <p className="mb-4">
                Ndi Igbo Sunderland is a vibrant and dynamic not-for-profit
                community interest organisation based in Sunderland, United
                Kingdom. We aim to preserve, celebrate and promote the black and
                minority ethnic (BME) Igbo culture in Sunderland and the
                surrounding areas while encouraging diversity, social cohesion
                and integration of our community into the wider Sunderland
                community.
              </p>
              <p>
                We strive to bring together the black and minority ethnic Igbo
                community to support one another through networking
                opportunities, and hosting programmes and events that meets the
                needs of the community as well as everyone that serve the
                community irrespective of their backgrounds.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src={groupImage}
                alt="Ndi Igbo Sunderland community members"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`mb-12 ${
            theme === 'dark' ? 'dark:bg-gray-800' : 'bg-gray-50'
          }`}
        >
          <CardHeader
            className={
              theme === 'dark' ? 'dark:text-gray-100' : 'text-gray-900'
            }
          >
            <CardTitle className="text-3xl font-semibold">
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent
            className={`flex flex-col md:flex-row-reverse items-center ${
              theme === 'dark' ? 'dark:text-gray-300' : 'text-gray-700'
            }`}
          >
            <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
              <p className="mb-4">
                Our mission is to foster a strong sense of community, cultural
                pride and social support for the black and minority ethnicities
                and Igbo people in the Sunderland area and provide a platform
                for advocacy and representation on matters affecting the black
                and minority communities.
              </p>
              <p>
                Our goal is to create opportunity for community development,
                encourage positive children and youth engagement, promote
                cross-cultural exchange and education to enhance diversity,
                inclusivity and social harmony, as well as preserve the rich
                Igbo cultural heritage.
              </p>
              <Button
                className="mt-6"
                style={{
                  backgroundColor:
                    theme === 'dark' ? colors.dark.accent : colors.light.accent,
                  color:
                    theme === 'dark'
                      ? colors.dark.secondary.main
                      : colors.light.secondary.main,
                }}
              >
                See Our Activities
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src={eventImage}
                alt="Igbo cultural event in Sunderland"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card
          className={
            theme === 'dark'
              ? 'dark:bg-gray-800 dark:text-white'
              : 'bg-white text-gray-900'
          }
        >
          <CardHeader
            className={
              theme === 'dark' ? 'dark:text-gray-100' : 'text-gray-900'
            }
          >
            <CardTitle className="text-3xl font-semibold">
              Objectives and Purpose
            </CardTitle>
          </CardHeader>
          <CardContent
            className={
              theme === 'dark' ? 'dark:text-gray-300' : 'text-gray-700'
            }
          >
            <Accordion type="single" collapsible className="w-full">
              {[
                'Provide a platform for the Igbo community',
                'Provide social support and networking opportunities',
                'Promote cross-cultural education and exchange',
                'Host activities and programmes',
                'Provide a platform for advocacy and representation',
                'Provide access to resources and information',
                'Educational and youth development programs',
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item}</AccordionTrigger>
                  <AccordionContent>
                    {getObjectiveContent(index)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <Organogram />
    </div>
  );
};

const getObjectiveContent = (index: number): string => {
  const objectives = [
    'To provide a platform for the Igbo community to come together, preserve their cultural heritage, and support each other in a new and unfamiliar environment.',
    'Provide social support and networking opportunities among the minority and deprived Communities in the wider Sunderland area through seminars, workshops, social gatherings, and community engagement.',
    'To promote cross-cultural education and exchange, and integration of the black and minority ethnic community into the laws, values and customs of the host community with the aim of fostering social cohesion and harmony.',
    'Host activities and programmes that showcase and promote the Igbo culture and enhance diversity, social cohesion, and cultural integration within the wider Sunderland community.',
    'Provide a platform for advocacy and representation on local, national or international issues affecting the black and African community in Sunderland and beyond.',
    'Provide access to resources and information specific to the needs of the black and minority ethnic Igbo community in Sunderland, such as language support, cultural awareness programs, community and culture magazines, and mentorship opportunities.',
    'Educational and youth development programs to empower young people and children to connect with the local Sunderland community as well as their cultural roots and develop into proud, responsible, and confident members of the society.',
  ];
  return objectives[index];
};

export default AboutUs;
