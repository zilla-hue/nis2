import { Link } from 'react-router-dom';
import React from 'react';
import { useTheme } from '@/context/theme-context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-12 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gray-100 text-gray-800'
      }`}
    >
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <Link
            to="/"
            className="inline-block mb-4 transition-transform hover:scale-105"
          >
            <img
              src="/assets/images/NdiIgbo_Sunderland_transparent.png"
              width={96}
              height={28}
              alt="Ndiigbo logo"
            />
          </Link>
          <p
            className={`text-sm lg:text-base font-normal mb-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Promoting Igbo culture and heritage through community and
            information sharing.
          </p>
          <p
            className={`text-sm lg:text-base font-normal mb-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <a
              href="tel:+8001234567890"
              className={`hover:text-yellow-600 transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              (+800) 1234 5678 90
            </a>
            {' - '}
            <a
              href="mailto:info@ndiigbosunderland.org"
              className={`hover:text-yellow-600 transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              info@ndiigbosunderland.org
            </a>
          </p>
          <div className="flex space-x-4">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
              <a
                key={social}
                href={`https://${social}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-yellow-600 transition-colors ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <span className="sr-only">{social}</span>
                <i className={`fab fa-${social} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
        <FooterColumn
          heading="Navigation"
          links={[
            { name: 'About us', href: '/about-us' },
            { name: 'What we do', href: '/what-we-do' },
            { name: 'News', href: '/news' },
            { name: 'Contact', href: '/contact' },
          ]}
        />
        <FooterColumn
          heading="Community"
          links={[
            { name: 'Igbo Diaspora', href: '#' },
            { name: 'Support Groups', href: '#' },
            { name: 'Forum', href: '#' },
            { name: 'My Transactions', href: '#' },
            { name: 'Track My Cell', href: '#' },
          ]}
        />
        <FooterColumn
          heading="Resources"
          links={[
            { name: 'Language Learning', href: '#' },
            { name: 'Historical Archives', href: '#' },
            { name: 'Library', href: '#' },
            { name: 'Latest Product', href: '#' },
            { name: 'Sale Products', href: '#' },
          ]}
        />
      </div>
      <div
        className={`mt-8 pt-8 border-t ${
          theme === 'dark'
            ? 'border-gray-700 text-gray-400'
            : 'border-gray-300 text-gray-600'
        } text-center text-sm`}
      >
        <p className="mb-2">
          © {new Date().getFullYear()} Ndi-Igbo Sunderland. All rights reserved.
        </p>
        <p className="hover:text-yellow-600 transition-colors">
          Powered by{' '}
          <a
            href="https://beicraft.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Beicraft Ltd
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

interface FooterColumnProps {
  heading: string;
  links: { name: string; href: string }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ heading, links }) => {
  const { theme } = useTheme();
  return (
    <div className="col-span-1">
      <h3
        className={`text-lg font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
        }`}
      >
        {heading}
      </h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.href}
              className={`text-sm lg:text-base hover:text-yellow-600 transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
