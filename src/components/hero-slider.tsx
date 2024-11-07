import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useTheme } from '@/context/theme-context/ThemeContext';

// Import images
import heroImage from "/assets/hero-image.jpg";
import igboFestival from "/assets/igbo-festival.jpg";
import igboArt from "/assets/igbo-art.jpg";

interface SlideData {
  image: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

const slides: SlideData[] = [
  {
    image: heroImage,
    title: "Celebrate Igbo Culture & Heritage",
    description:
      "Discover the rich traditions, vibrant history, and cultural wonders of the Igbo people. Join us in preserving and promoting our cultural heritage for future generations.",
    ctaPrimary: "Explore Now",
    ctaSecondary: "Learn More",
  },
  {
    image: igboFestival,
    title: "Experience the Vibrant Igbo Festivals",
    description:
      "Immerse yourself in the colorful world of Igbo festivals. From the New Yam Festival to the Masquerade celebrations, witness the living traditions that have shaped our culture for generations.",
    ctaPrimary: "View Calendar",
    ctaSecondary: "Learn About Festivals",
  },
  {
    image: igboArt,
    title: "Discover Igbo Art & Craftsmanship",
    description:
      "From intricate masks to vibrant textiles, Igbo art tells the story of our people. Explore the symbolism and techniques behind our traditional and contemporary artworks.",
    ctaPrimary: "Browse Gallery",
    ctaSecondary: "Meet Local Artists",
  },
  // Uncomment and update the fourth slide if needed
  // {
  //   image: igboCuisine,
  //   title: "Savor the Flavors of Igboland",
  //   description:
  //     "Embark on a culinary journey through Igbo cuisine. Learn about our traditional dishes, cooking methods, and the cultural significance behind our favorite foods.",
  //   ctaPrimary: "Find Recipes",
  //   ctaSecondary: "Join Cooking Class",
  // },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = [
    {
      initial: { opacity: 0, scale: 1.1 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
    {
      initial: { opacity: 0, x: "100%" },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: "-100%" },
    },
    {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: -90 },
    },
    {
      initial: { opacity: 0, y: "100%" },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: "-100%" },
    },
  ];

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={slideVariants[currentSlide].initial}
          animate={slideVariants[currentSlide].animate}
          exit={slideVariants[currentSlide].exit}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'}`}></div>
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-white'}`}
          >
            {slides[currentSlide].title}
          </motion.h1>
          <motion.p
            key={`description-${currentSlide}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-200'}`}
          >
            {slides[currentSlide].description}
          </motion.p>
          <motion.div
            key={`cta-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center group"
            >
              {slides[currentSlide].ctaPrimary}
              <div className="ml-2 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1">
                <ChevronRight className="h-5 w-5" />
              </div>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`${theme === 'dark' ? 'bg-transparent text-white border-white hover:bg-white hover:text-gray-900' : 'bg-transparent text-white border-white hover:bg-white hover:text-black'} transition-colors duration-300`}
            >
              {slides[currentSlide].ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
