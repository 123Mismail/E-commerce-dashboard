 

import { client } from "@/app/lib/sanity";
import { NextRequest, NextResponse } from "next/server";


 

export const POST = async () => {
     try {
         // Fetch orders from Sanity
         const orders = await client.fetch(`*[_type == "order"]`);

         // Check if orders exist
         if (!orders || orders.length === 0) {
             return NextResponse.json(
                 { message: 'No orders found' },
                 { status: 404 }
             );
         }

         // Return the orders
         return NextResponse.json(orders, { status: 200 });
     } catch (error: any) {
         console.error('Error fetching orders:', error);

         // Return a proper error response
         return NextResponse.json(
             { message: 'Failed to fetch orders', error: error.message },
             { status: 500 }
         );
     }
 };

 
