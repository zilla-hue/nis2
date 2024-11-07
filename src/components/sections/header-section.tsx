'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Navigatebutton } from './submit-buttons';
import { UserButton } from '../auth/user-button';
import { ThemeSwitcherBtn } from './theme-switcher-btn';
import { useTheme } from '@/context/theme-context/ThemeContext';
// import { getCurrentUser } from "@/app/authenticate/auth.action";
import { Skeleton } from '@/components/ui/skeleton'; // Add this import
import { useSession } from '@/providers/SessionProvider';

//  Update the User type to match the structure of your session user
type SessionUser = {
  id: string;
  email?: string;
  picture?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  role?: string;
  isOnboarded?: boolean;
  know_your_member?: boolean;
  membership_status?: string;
};

type User = {
  id: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: string;
  isOnboarded: boolean;
  know_your_member: boolean;
  membership_status: string;
  picture: string; // Add this line
} | null;

type NavItem = {
  title: string;
  href: string;
};

const navItems: NavItem[] = [
  { title: 'About us', href: '/about-us' },
  { title: 'What we do', href: '/what-we-do' },
  { title: 'News', href: '/news' },
  { title: 'Contact', href: '/contact' },
];

export default function HeaderSection() {
  const [userData, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true); // Add this line
  const location = useLocation();
  const pathname = location.pathname;

  const { user } = useSession() as { user: SessionUser | null }; // Access the session object first

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      try {
        if (user && user.id) {
          const currentUser: User = {
            id: user.id,
            email: user.email ?? '',
            first_name: user.first_name ?? '',
            middle_name: user.middle_name ?? '',
            last_name: user.last_name ?? '',
            role: user.role ?? '',
            isOnboarded: user.isOnboarded ?? false,
            know_your_member: user.know_your_member ?? false,
            membership_status: user.membership_status ?? 'unknown',
            picture: user.picture ?? '', // Add this line
          };

          setUser(currentUser);

          // Log specific fields to check what is being returned
          console.log('Current User:', currentUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!mounted) {
    return null;
  }

  return (
    <StyledHeader
      className={`w-full border-b py-4 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } shadow-sm fixed top-0 left-0 right-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src="/assets/images/NdiIgbo_Sunderland_transparent.png"
                  width={96}
                  height={28}
                  alt="Ndiigbo logo"
                />
              </Link>
            </div>

            <NavLinks
              className="hidden md:flex ml-4 lg:ml-10"
              role="navigation"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.href}
                  $isActive={pathname === item.href}
                >
                  {item.title}
                </NavLink>
              ))}
            </NavLinks>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <Skeleton className="w-32 h-10 rounded" />
            ) : userData?.id ? (
              <UserButton
                email={userData.email}
                avatar={userData.picture ?? ''}
                firstName={userData.first_name}
                middleName={userData.middle_name}
                lastName={userData.last_name}
                userRole={userData.role}
                onboardingStatus={userData.isOnboarded}
                knowYourMember={userData.know_your_member}
                membershipStatus={userData.membership_status}
              />
            ) : (
              <Navigatebutton
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                title="Get started"
                size="default"
                link="/auth/login"
              />
            )}
            <ThemeSwitcherBtn />
          </div>
          <MenuButton
            onClick={toggleMenu}
            className="md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle main menu</span>
            <MenuIcon $isOpen={isMenuOpen} />
          </MenuButton>
        </nav>
      </div>
      <MobileMenu $isOpen={isMenuOpen}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <MobileNavLink key={item.title} to={item.href} onClick={toggleMenu}>
              {item.title}
            </MobileNavLink>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-5">
            {userData?.id ? (
              <UserButton
                email={userData.email}
                avatar={userData.picture ?? ''}
                firstName={userData.first_name}
                middleName={userData.middle_name}
                lastName={userData.last_name}
                userRole={userData.role}
                onboardingStatus={userData.isOnboarded}
                knowYourMember={userData.know_your_member}
                membershipStatus={userData.membership_status}
              />
            ) : (
              <Navigatebutton
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-full"
                title="Get started"
                size="sm"
                link="/auth/login"
              />
            )}
          </div>
        </div>
      </MobileMenu>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: var(--header-height, 5rem); // Default to 5rem if not set
  transition: background-color 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? '#2d3748' : '#4a5568')};
  font-weight: 500;
  text-transform: uppercase;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  white-space: nowrap;

  @media (min-width: 1025px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  &:hover,
  &:focus,
  ${({ $isActive }) => $isActive && '&'} {
    color: #2d3748;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: #2d3748;
    transition: all 0.3s ease;
  }

  &:hover::after,
  &:focus::after,
  ${({ $isActive }) => $isActive && '&::after'} {
    width: 100%;
    left: 0;
  }

  .dark & {
    color: ${({ $isActive }) => ($isActive ? '#f7fafc' : '#e2e8f0')};

    &:hover,
    &:focus,
    ${({ $isActive }) => $isActive && '&'} {
      color: #f7fafc;
    }

    &::after {
      background-color: #f7fafc;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #4a5568;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    display: inline-flex;
  }

  &:hover,
  &:focus {
    background-color: #edf2f7;
  }

  .dark & {
    color: #e2e8f0;

    &:hover,
    &:focus {
      background-color: #2d3748;
    }
  }
`;

const MenuIcon = styled.span<{ $isOpen: boolean }>`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 2px;
  background-color: currentColor;
  transition: background-color 0.3s ease;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 24px;
    height: 2px;
    background-color: currentColor;
    transition: transform 0.3s ease;
  }

  &::before {
    top: -6px;
  }

  &::after {
    bottom: -6px;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    background-color: transparent;

    &::before {
      transform: translateY(6px) rotate(45deg);
    }

    &::after {
      transform: translateY(-6px) rotate(-45deg);
    }
  `}
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  @media (min-width: 769px) {
    display: none;
  }

  .dark & {
    background-color: #1a202c;
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #4a5568;
  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: #f7fafc;
  }

  .dark & {
    color: #e2e8f0;

    &:hover,
    &:focus {
      background-color: #2d3748;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  text-align: center;
  padding: 0.5rem;
  background-color: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 0.25rem;
  margin-top: 1rem;

  .dark & {
    color: #fc8181;
    background-color: #2d3748;
    border-color: #fc8181;
  }
`;
