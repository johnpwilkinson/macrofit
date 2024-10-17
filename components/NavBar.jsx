import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

import ModeToggle from "./ModeToggle";
import AuthLinks from "./AuthLinks";
import { Button } from "./ui/button";

export default async function NavBar({ activeUser }) {
  return (
    <NavigationMenu className="border border-solid p-2 rounded-lg">
      <NavigationMenuList className="flex items-center space-x-4">
        <NavigationMenuItem className="flex items-center space-x-4">
          <Link href="/nutrition" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Nutrition
            </NavigationMenuLink>
          </Link>
          <Link href="/fitness" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Fitness
            </NavigationMenuLink>
          </Link>
          <Link href="/account" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              My Account
            </NavigationMenuLink>
          </Link>
          <ModeToggle />
          {activeUser ? (
            <LogoutLink>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-auto whitespace-nowrap">
                Sign out
              </button>
            </LogoutLink>
          ) : (
            <div className="flex space-x-4">
              <LoginLink>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-auto whitespace-nowrap">
                  Sign in
                </button>
              </LoginLink>
              <RegisterLink>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-auto whitespace-nowrap">
                  Sign up
                </button>
              </RegisterLink>
            </div>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
