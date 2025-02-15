"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  // Command,
  // Frame,
  GalleryVerticalEnd,
  // Map,
  // PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
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
    name: "Milton",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Bidarthi",
      logo: GalleryVerticalEnd,
      plan: "Learning Platform",
    },
    {
      name: "Breking Chemistry",
      logo: AudioWaveform,
      plan: "Startup",
    },
   
  ],
  navMain: [
    {
      title: "Category Management",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add Category",
          url: "/admin/dashboard/category",
        },
      ],
    },
    {
      title: "Course Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Add Courses",
          url: "/admin/dashboard/addCourse",
        },
        {
          title: "Trending Courses",
          url: "/admin/dashboard/trendingCourses",
        },
      ],
    },
    {
      title: "Student Mangament",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Students Resquest",
          url: "/admin/dashboard/studentsRequest",
        },
        {
          title: "Students List",
          url: "/admin/dashboard/studentsList",
        },
      ],
    },
    {
      title: "Demo Class",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Demo Videos",
          url: "/admin/dashboard/demoClass",
        },
        
      ],
    },
    {
      title: "Manage Banner",
      url: "/admin/dashboard/banner",
      icon: Settings2,
      items: [
        {
          title: "Home banner",
          url: "#",
        },
        
      ],
    },
  ],
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
