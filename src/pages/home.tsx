'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Hero from '@/components/hero';
import About from '@/components/about';
import Popular from '@/components/popular';
import WhatWeDoPage from '@/components/what-we-do';
import EventComittee from '@/components/event-comittee';
import Events from '@/components/events';

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
      once: true,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  return (
    <div>
      <Hero />
      <About />
      <WhatWeDoPage />
      <Popular />
      <Events />
      <EventComittee />
    </div>
  );
};

export default HomePage;
