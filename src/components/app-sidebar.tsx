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

// Menu items.

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Orers",
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
   
   
 console.log(cookieValue ,"khkhkhkj")
 
  const handelLogout = async ()=>{
   try {
     const response = await fetch('api/logout') 
     if(response){
      alert("successfully logout" )
     }
   } catch (error) {
    console.log(error)
    alert("failed to logout")
   }
    
  }

  return (
    <Sidebar className="px-5 py-4 mt-5">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-medium">Dashboard</SidebarGroupLabel> 
          <button onClick={()=>handelLogout()} className="px-2 py-1 rounded-md my-3 bg-blue-600 text-white">Log Out</button>
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
