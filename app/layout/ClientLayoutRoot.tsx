"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Cookies, CookiesProvider } from "react-cookie";
import { Toaster } from "@/components/ui/toaster";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { ReactQueryClientProvider } from "@/services/query/QueryClientProvider";
import AppSidebar from "@/components/features/side-bar/app-sidebar";
import { useMobile } from "@/hooks/custom/use-custom-mobile";
import { UserContextProvider } from "@/context/userContext";
import { CustomerIcon, HomeIcon } from "@/components/icons";
import { usePathname } from "next/navigation";
import "../styles/globals.css";

export default function ClientLayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isMobile = useMobile();
  const cookies = new Cookies();
  const user = cookies.get("user");
  const token = cookies.get("token");

  const items = [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: HomeIcon,
    },
    {
      title: "Clientes",
      url: "/dashboard/customers",
      icon: CustomerIcon,
    },
    // {
    //   title: "Controle de Gastos",
    //   url: "/dashboard/customers",
    //   icon: CustomerIcon,
    // },
  ];

  return (
    <CookiesProvider>
      <UserContextProvider token={token} user={user}>
        <ReactQueryClientProvider>
          <html lang="en">
            <body
              className={`${GeistSans.className} ${GeistMono.className} bg-[#0F0F10]`}
            >
              <Toaster />

              <SidebarProvider>
                {pathname !== "/login" && (
                  <>
                    <AppSidebar navItems={items} user={user} />
                    {isMobile ? null : (
                      <SidebarTrigger className="mt-5 rounded ml-5 w-5 h-5" />
                    )}
                  </>
                )}
                {children}
              </SidebarProvider>
            </body>
          </html>
        </ReactQueryClientProvider>
      </UserContextProvider>
    </CookiesProvider>
  );
}
