"use client";

import { ReactNode } from "react";

import { useMobile } from "@/hooks/custom/use-custom-mobile";
import { HeaderDashboard } from "./Header";
import { NavItems } from "./NavItem";

export const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMobile();

  return (
    <div className="w-screen flex justify-center items-center mx-4">
      {isMobile && <HeaderDashboard />}
      {isMobile && <NavItems />}
      {children}
    </div>
  );
};
