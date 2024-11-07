"use client";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { AlignJustify } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/admin-only/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

const MobileNav = () => {
  return (
    <nav className="md:hidden ml-4 ">
      <Sheet>
        <SheetTrigger className="align-middle">
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col gap-6  md:hidden">
          <img src="/assets/images/NdiIgbo_Sunderland_transparent.png" alt="logo" width={128} height={38} />
          <Separator className="border" />
          <MobileNavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

const MobileNavItems = () => {
  const { pathname } = useLocation();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li key={link.route} className={`${isActive && "text-primary-500"} flex-center p-medium-16 whitespace-nowrap`}>
            <Link to={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileNav;
