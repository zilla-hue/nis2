'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Heart,
  Users,
  Award,
  BookOpen,
  Globe,
  Lightbulb,
  UserPlus,
  HomeIcon,
} from 'lucide-react';
import { colors } from '../components/colors';
import FooterSection from '@/components/sections/footer-section';
import HeaderSection from '@/components/sections/header-section';
import { useTheme } from '@/hooks/useTheme';

interface ActivityProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const Activity: React.FC<ActivityProps> = ({ title, content, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  return (
    <Card className={`mb-4 ${theme}`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`${isExpanded ? '' : 'line-clamp-3'}`}>{content}</p>
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </Button>
      </CardContent>
    </Card>
  );
};

const WhatWeDo: React.FC = () => {
  const { theme } = useTheme();
  const activities = [
    {
      title: 'Community Development and Support',
      content:
        'Dedicated to the holistic development of our community, addressing multifaceted needs encompassing educational, economic, social, health and well-being aspects.',
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: 'Cultural Heritage and Integration',
      content:
        'Promoting and preserving the rich Igbo cultural heritage while encouraging diversity, cross-cultural understanding, and integration into the wider Sunderland society.',
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: 'Youth Engagement and Mentorship',
      content:
        'Empowering youths through positive activities, mentorship, and providing tools to make informed choices and resist negative influences.',
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: 'Community and Culture Magazine',
      content:
        'Annual publication promoting community integration and social cohesion, featuring articles that highlight diversity and facilitate cross-cultural exchange.',
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: 'Health and Well-being',
      content:
        'Undertaking various activities to promote and improve the physical, mental, and emotional well-being of our community members and the wider Sunderland community.',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: 'Support for New Migrants',
      content:
        'Providing information and support to help new migrants navigate the complex local environment, from housing and healthcare to employment and community integration.',
      icon: <UserPlus className="w-6 h-6" />,
    },
  ];

  return (
    <div className={theme}>
      <HeaderSection />
      <main className="mx-auto px-4 py-12 mt-20">
        <section className="container mb-16">
          <h1 className="text-4xl font-bold mb-6 text-center">What We Do</h1>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            We are dedicated to fostering a thriving community through a range
            of essential services, supporting our members in every aspect of
            their lives.
          </p>
        </section>

        <section
          className={`py-16 px-8 rounded-3xl mb-16 container ${
            theme === 'dark'
              ? 'bg-gray-800/50 text-gray-100'
              : 'bg-amber-50 text-gray-900'
          }`}
        >
          <h2
            className={`text-3xl font-semibold mb-8 text-center ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            What we do for our community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                  }`}
                >
                  {React.cloneElement(activity.icon, {
                    className: `w-6 h-6 ${
                      theme === 'dark' ? 'text-amber-400' : 'text-red-600'
                    }`,
                  })}
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {activity.title}
                  </h3>
                  <p
                    className={
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }
                  >
                    {activity.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 container">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Projects We Have Done
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'Cultural Festival',
              'Youth Mentorship Program',
              'Community Health Fair',
            ].map((project, index) => (
              <Card key={index} className={theme}>
                <img
                  src={`/placeholder-image-${index + 1}.jpg`}
                  alt={project}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project}</h3>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique.
                  </p>
                  <Button variant={theme === 'dark' ? 'secondary' : 'outline'}>
                    Learn more
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card
          className={`p-8 rounded-3xl container ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-900'
          } text-white`}
        >
          <CardContent className="text-center">
            <h2 className="text-3xl font-semibold mb-4">Partner With Us</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Are you seeking collaborative opportunities or looking for a
              partner for a new project? We are always open to new partnerships
              and welcome ideas that benefit the community.
            </p>
            <a href="/contact">
              <Button className="bg-amber-500 hover:bg-amber-600 text-gray-900">
                Contact Us
              </Button>
            </a>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default WhatWeDo;
