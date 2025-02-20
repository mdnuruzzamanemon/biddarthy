"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MyBreadcrumb() {
  const pathname = usePathname();

  const breadcrumbMapping: { 
    [key: string]: { parent?: string; current: string; parentPath?: string } 
  } = {
    "/admin/dashboard": { current: "Dashboard" },
    "/admin/dashboard/category": { parent: "Dashboard", current: "Category", parentPath: "/admin/dashboard" },
    "/admin/dashboard/addCourse": { parent: "Dashboard", current: "Courses", parentPath: "/admin/dashboard" },
    "/admin/dashboard/trendingCourses": {parent: "Dashboard", current: "Trendning Courses", parentPath: "/admin/dashboard" },
    "/admin/dashboard/studentsRequest": {parent: "Dashboard", current: "Students Request", parentPath: "/admin/dashboard" },
    "/admin/dashboard/studentsList": {parent: "Dashboard", current: "Students List", parentPath: "/admin/dashboard" },
    "/admin/dashboard/demoClass": {parent: "Dashboard", current: "Demo Class", parentPath: "/admin/dashboard" },
    "/admin/dashboard/banner": {parent: "Dashboard", current: "Add Banner", parentPath: "/admin/dashboard" },
  };

  const breadcrumb = breadcrumbMapping[pathname] || { current: "Page Not Found" };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.parent && breadcrumb.parentPath && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link href={breadcrumb.parentPath}>{breadcrumb.parent}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{breadcrumb.current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
