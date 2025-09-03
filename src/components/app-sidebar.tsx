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
  SidebarContext,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

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
      baseUrl: "/private/dashboard",
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
      url: "/private/catalog/products/list",
      baseUrl: "/private/catalog",
      icon: HandPlatter,
      isActive: false,
      items: [
        {
          title: "Product Management",
          url: "/private/catalog/products/list",
        },
        {
          title: "Service Management",
          url: "/private/catalog/services/list",
        },
        {
          title: "Stock Management",
          url: "/private/catalog/stocks/overview",
        },
      ],
    },
    {
      title: "Market Place",
      url: "#",
      icon: Store,
      isActive: false,
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
      isActive: false,
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
      url: "/private/settings/user-profile",
      baseUrl: "/private/settings",
      icon: Settings,
      isActive: false,
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
  const [sidebarLinks, setsidebarLinks] = useState(data.navMain)

  const sideBarContext = React.useContext(SidebarContext)

  useEffect(() => {
    let updatedLinks;
    if (sideBarContext?.state === 'collapsed') {
      updatedLinks = sidebarLinks.map(link => ({
        ...link,
        isActive: true
      }))
      setsidebarLinks(updatedLinks)
    } else {
      updatedLinks = sidebarLinks.map(link => ({
        ...link,
        isActive: link.items?.length ? false : true // Set the default active link when expanded
      }))
      setsidebarLinks(updatedLinks)
    }

    return () => {

    }
  }, [sideBarContext?.state])


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarLinks} />
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
