"use client"

import * as React from "react"
import {
  AudioWaveform,
  HandPlatter,
  Megaphone,
  Command,
  GalleryVerticalEnd,
  Store,
  Settings,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/images/sampleProdImage.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/private/dashboard",
      icon: SquareTerminal,
      isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Products/Services Hub",
      url: "#",
      icon: HandPlatter,
      items: [
        {
          title: "Product Management",
          url: "/private/products/list",
        },
        {
          title: "Service Management",
          url: "/private/services/list",
        },
        {
          title: "Stock Management",
          url: "/private/stocks/list",
        },
      ],
    },
    {
      title: "Market Place",
      url: "#",
      icon: Store,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile Settings",
          url: "/private/settings/user-profile",
        },
        {
          title: "Business Settings",
          url: "/private/settings/business-settings",
        },
        {
          title: "Store Configuration",
          url: "/private/settings/store-configuration",
        },
        {
          title: "User Management",
          url: "/private/settings/user-management",
        },
        {
          title: "Notifications",
          url: "/private/settings/notifications",
        },
      ],
    },

  ],


}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavMain items={data.Markets} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
