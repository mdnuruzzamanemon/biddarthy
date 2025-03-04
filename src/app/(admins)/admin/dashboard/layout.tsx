import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { Separator } from "@/components/ui/separator";
import MyBreadcrumb from "../components/MyBreadcrumb";

import { TrendingCoursesProvider } from "@/app/(admins)/admin/context/TrendingCoursesContext";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import {ModeToggle} from "@/app/(admins)/admin/components/ThemeToggleBtn";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  const cokieStore = await cookies();
  const token = cokieStore.get("token")?.value;

  if (!token) {
    redirect("/admin/login"); // Redirect unauthorized users
  }

  return (

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex justify-between w-full">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <MyBreadcrumb />
                </div>
                <div className="me-4">
                <ModeToggle />
                </div>
                </div>
              </header>
              <TrendingCoursesProvider>
              {children}
              </TrendingCoursesProvider>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>

  );
}


