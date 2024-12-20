import localFont from "next/font/local";
import "./globals.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import ModeToggle from "@/components/ModeToggle";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, params }) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  const user = await getUser();

  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        // className="antialiased w-full overflow-x-hidden"
        className="antialiased max-w-full w-screen overflow-x-hidden mx-auto"
      >
        <div className="max-w-screen w-full mx-auto">
          <SidebarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AppSidebar userid={user.id} />
              <SidebarInset>
                <header className="flex shrink-0 items-center p-4 gap-2 justify-between">
                  <div className="flex items-center gap-2 ">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <MyBreadcrumb />
                  </div>
                  <ModeToggle />
                </header>
                <div className="px-4 sm:px-8 ">{children}</div>
                <Toaster />
              </SidebarInset>
            </ThemeProvider>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}

{
  /* <div className="chart-wrapper p-0 mx-auto w-full flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6   sm:flex-row  ">
<div className="  w-full h-auto   "> */
}
