import React from 'react';
// import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from '@/context/theme-context/ThemeContext';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  socialLinks,
}) => {
  const { theme } = useTheme();

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      data-aos-delay={100}
      className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl`}
    >
      <div className="relative h-64 md:h-72">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 text-center">
        <h3
          className={`text-xl font-semibold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          {name}
        </h3>
        <p
          className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {role}
        </p>
        <div className="flex justify-center space-x-4">
          {socialLinks.facebook && (
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 hover:text-blue-500 ${
                theme === 'dark' ? 'hover:text-blue-400' : ''
              }`}
            >
              <Facebook size={20} />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 hover:text-blue-400 ${
                theme === 'dark' ? 'hover:text-blue-400' : ''
              }`}
            >
              <Twitter size={20} />
            </a>
          )}
          {socialLinks.instagram && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 hover:text-pink-500 ${
                theme === 'dark' ? 'hover:text-pink-400' : ''
              }`}
            >
              <Instagram size={20} />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 hover:text-blue-600 ${
                theme === 'dark' ? 'hover:text-blue-500' : ''
              }`}
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const EventCommittee: React.FC = () => {
  const { theme } = useTheme();
  const teamMembers: TeamMemberProps[] = [
    {
      name: 'Chinedu Okoye',
      role: 'Media & Publicity',
      image: '/assets/chinedu-okoye.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      name: 'Frank Mbweke',
      role: 'Logistics/Planning',
      image: '/assets/frank-mbweke.jpg',
      socialLinks: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      name: 'Sunday Chika',
      role: 'Decoration',
      image: '/assets/sunday-chika.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      name: 'Obiageli Mbanor',
      role: 'Usher/Stewards',
      image: '/assets/obiageli-mbanor.jpg',
      socialLinks: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      name: 'Mazi James',
      role: "Men's Dance/Presentation",
      image: '/assets/mazi-james.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      name: 'Udo Chimdindu',
      role: "Women's Dance",
      image: '/assets/udo-chimdindu.jpg',
      socialLinks: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
      },
    },
  ];

  return (
    <section
      className={`py-20 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-gray-800'
          : 'bg-gradient-to-b from-red-50 to-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div data-aos="fade-up" className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Meet Our{' '}
            <span
              className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}
            >
              Committee
            </span>
          </h2>
          <p
            className={`mt-4 text-xl ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            The dedicated team behind our vibrant events
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCommittee;
