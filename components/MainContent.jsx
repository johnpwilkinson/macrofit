"use client";
import NavBar from "./NavBar";
import { ThemeProvider } from "./theme-provider";

export default function MainContent({ children, activeUser }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="w-full mx-auto">
          <NavBar activeUser={activeUser} />
        </div>
        {children}
      </ThemeProvider>
    </>
  );
}
