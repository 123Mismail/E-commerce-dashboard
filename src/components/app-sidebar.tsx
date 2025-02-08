"use client"

import {  Home, Search, Settings ,ListOrdered ,PersonStanding ,ShipIcon} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import {useRouter} from "next/navigation"
// Menu items.
 

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ListOrdered,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: PersonStanding,
  },
  {
    title: "Shipping Details",
    url: "/shippingDetails",
    icon: ShipIcon,
  },
  {
    title: "Products",
    url: "products",
    icon: Search,
  },
 
  {
    title: "Analytics",
    url: "/analytics",
    icon: Settings,
  },
]

export function AppSidebar() {
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  const router =  useRouter();
  useEffect(() => {
    function getCookie(name: string) {
      const cookieString = document.cookie;
      const cookies = cookieString.split("; ");
      const cookie = cookies.find((c) => c.startsWith(`${name}=`));
      return cookie ? cookie.split("=")[1] : null;
    }

    // Fetch the desired cookie value
    const sessionId = getCookie("session_id");
    setCookieValue(sessionId);
  }, []);
   
   
 
 
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });
  
      if (response.ok) {
        alert("Successfully logged out");
        router.push("/login"); // Redirect to login page
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <Sidebar className="px-5 py-4 mt-5">
      <SidebarContent>
        <SidebarGroup>

        <button onClick={()=>handleLogout()} className="px-2 py-1 rounded-md my-3 bg-blue-600 text-white">Log Out</button>
          <SidebarGroupLabel className="text-xl font-medium">Dashboard</SidebarGroupLabel> 
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="text-xl font-semibold ">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
