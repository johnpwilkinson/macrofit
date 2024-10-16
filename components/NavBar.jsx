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

export default function NavBar() {
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
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
