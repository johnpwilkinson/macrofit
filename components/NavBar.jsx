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
          {/* <Button>{activeUser ? "log out" : "log in"}</Button> */}
          <AuthLinks activeUser={activeUser} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
