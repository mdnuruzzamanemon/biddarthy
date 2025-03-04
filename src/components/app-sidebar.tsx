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
import { parseCookies } from "nookies"; // Read cookies
import {jwtDecode} from "jwt-decode"; // Decode JWT token



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<any>(null);


  React.useEffect(() => {
    // const token = cookies.token; // Read token from cookies
    async function fetchUser() {

      const data = await fetch('/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const user = await data.json();
      // console.log(user);
      // setUser(user);
      if (user.token) {
        const decoded: any = jwtDecode(user.token); // Decode JWT
        setUser(decoded); // Store decoded user info
      }
    }
    fetchUser();
    

   
  }, []);
  // console.log(user);
  if (!user) return <p>Loading sidebar...</p>;

  // This is sample data.
const data = {
  user: {
    name: user?.role || "Admin",
    email: user?.email || "admin@biddarthi.org",
    avatar: "../images/user1.png",
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
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Home banner",
          url: "/admin/dashboard/banner",
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
