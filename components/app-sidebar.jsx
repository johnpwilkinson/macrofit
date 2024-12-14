// "use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ModeToggle from "./ModeToggle";
import DatePicker from "./DatePicker";
import { headers } from "next/headers";
import { getUserBodyMetrics, getUserWorkouts } from "@/app/lib/actions";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",

      isActive: true,
    },
    {
      title: "Nutrition",
      url: "#",

      items: [
        {
          title: "Summary",
          url: "/nutrition",
        },
        {
          title: "Plans",
          url: "#",
        },
      ],
    },
    {
      title: "Fitness",
      url: "#",

      items: [
        {
          title: "Summary",
          url: "/fitness",
        },
        {
          title: "Plans",
          url: "#",
        },
      ],
    },
    {
      title: "Log Book",
      url: `/logbook/${new Date().toISOString().split("T")[0]}`,

      // items: [
      //   {
      //     title: "Nutrition",
      //     url: "#",
      //   },
      //   {
      //     title: "Fitness",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "My Account",
      url: `/account`,

      // items: [
      //   {
      //     title: "Nutrition",
      //     url: "#",
      //   },
      //   {
      //     title: "Fitness",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Tools",
      url: "#",

      items: [
        {
          title: "Nutrition",
          url: "#",
          items: [
            {
              title: "Calculator",
              url: "#",
            },
            {
              title: "Planner",
              url: "#",
            },
          ],
        },
        {
          title: "Fitness",
          url: "#",
          items: [
            {
              title: "Calculator",
              url: "#",
            },
            {
              title: "Planner",
              url: "#",
            },
          ],
        },
        {
          title: "Other",
          url: "#",
          items: [
            {
              title: "Calculator",
              url: "#",
            },
            {
              title: "Planner",
              url: "#",
            },
          ],
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  // navSecondary: [
  //   {
  //     title: "Support",
  //     url: "#",
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: "Feedback",
  //     url: "#",
  //     icon: Send,
  //   },
  // ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export async function AppSidebar({ ...props }) {
  const rawHeadersList = await headers().get("x-custom-data");
  const headersList = rawHeadersList ? JSON.parse(rawHeadersList) : {};
  let userBodyMetricLogDates;
  let userFitnessLogDates;
  // Check if headersList.section exists and default to `false` if not
  const showDatePicker = headersList.section === "logbook";
  if (headersList.section === "logbook") {
    userBodyMetricLogDates = (await getUserBodyMetrics(props.userid)).map(
      (date) => date.date
    );
    userFitnessLogDates = (await getUserWorkouts(props.userid)).map(
      (date) => date.date
    );
  }

  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {showDatePicker && (
          <DatePicker
            bodyMetricDates={userBodyMetricLogDates}
            workoutDates={userFitnessLogDates}
          />
        )}

        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
