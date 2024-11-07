'use client';

import * as React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { FileLock, Lock } from 'lucide-react';

const members: { title: string; href: string; description: string }[] = [
  {
    title: 'Payment',
    href: '/admin-only/payment',
    description: 'A module for processing transactions and managing payments.',
  },
  {
    title: 'Payment History',
    href: '/admin-only/payment/history',
    description: 'A record of past transactions and payment activities.',
  },
  {
    title: 'Events',
    href: '/admin-only/events',
    description: 'An area for managing and viewing upcoming or past events.',
  },
  {
    title: 'Committees',
    href: '/admin-only/committees',
    description: 'Sections for organizing and managing committees or groups.',
  },

  {
    title: 'Market Place',
    href: '/admin-only/market-place',
    description:
      'An online platform for buying, selling, or trading goods and services.',
  },
];

interface NavItemsProps {
  userId: string | undefined;
  userRole: string | undefined;
  membershipStatus: string | undefined;
  onboardingStatus: boolean | undefined;
  registrationFee: boolean | undefined;
}

export function NavItems({
  userId,
  registrationFee,
  userRole,
  membershipStatus,
  onboardingStatus,
}: NavItemsProps) {
  const isAdmin = !(
    userId !== undefined &&
    registrationFee &&
    membershipStatus === 'ACTIVE' &&
    userRole === 'ADMIN' &&
    onboardingStatus
  );
  const isMember = !(
    userId !== undefined &&
    registrationFee &&
    membershipStatus === 'ACTIVE' &&
    onboardingStatus
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <img
                      src="/assets/images/NdiIgbo_Sunderland_transparent.png"
                      width={128}
                      height={38}
                      alt="Ndiigbo logo"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Ndi Igbo Sunderland
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A vibrant and dynamic Nigerian community in Sunderland,
                      fostering cultural heritage, unity, and social engagement
                      among members.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                id="about-us"
                href="/about-us"
                title="About Ndi-Igbo Sunderland"
              >
                A vibrant Nigerian community promoting culture and unity in
                Sunderland.
              </ListItem>
              <ListItem id="organogram" href="/organogram" title="Organogram">
                {
                  "Detailed structure of Ndi-Igbo Sunderland's organizational hierarchy."
                }
              </ListItem>

              {!isAdmin ? (
                <ListItem
                  href="/admin-screens/board-routes"
                  title="Manage Members"
                >
                  Activate, Susupend, Make Admin...etc
                </ListItem>
              ) : (
                <ListItem
                  href={'#'}
                  title="Manage Members"
                  className="pointer-events-none text-gray-500"
                >
                  {'Admin Only!'}
                </ListItem>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {!isMember ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Members</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {members.map((member) => (
                    <ListItem
                      key={member.title}
                      title={member.title}
                      href={member.href}
                    >
                      {member.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/admin-only/blog">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        ) : (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Members</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {members.map((member) => (
                  <ListItem
                    className="pointer-events-none text-gray-500"
                    key={member.title}
                    title={member.title}
                    href={member.href}
                  >
                    {'Sorry! members only...'}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
