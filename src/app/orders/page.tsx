"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  Delete} from "lucide-react"
import { client } from "../lib/sanity";
import { useEffect, useState } from "react";
import {format ,parseISO} from "date-fns"


interface Product {
  productName: string;
  quantity: number;
  price: number;
  _type: string;
  _key: string;
}

interface Customer {
  email: string;
}

interface Order {
  title: string;
  products: Product;
  customer: Customer;
  orderDate: string; // or use `Date` if you plan to convert it to a Date object
  totalAmount: number;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    const fetchOrders = async () => {
      const query = `*[_type == "order"] {
          title,
          products[0],
          customer->{email},
          orderDate,
          totalAmount
        }`;

      try {
        const orderResponse = await client.fetch(query); // Fetch data from Sanity
        setOrders(orderResponse);
        console.log(orderResponse, "orders data"); // Log the response directly
      } catch (error) {
        console.log(error, "error fetching data from Sanity");
      }
    };
    fetchOrders();
  }, []);
  console.log(orders, "orders data from sanity ");

  const formatDate = (isoDateString:string) => {
    const date = parseISO(isoDateString);
    return format(date, 'MMMM dd, yyyy hh:mm a');
  };

  return (
    <div className="py-10 w-full px-5">
      <h1 className="text-center text-2xl font-bold p-3"> Orders Detail </h1>
      <Table className="table-auto border border-gray-300 border-collapse">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r-2">ORDER_ID</TableHead>
            <TableHead className="border-r-2" >Products</TableHead>
            <TableHead className="border-r-2" >Customer Email</TableHead>
            <TableHead className="border-r-2" >Order Date</TableHead>
            <TableHead className="border-r-2" >Action</TableHead>

            <TableHead className="border-r-2" > Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            
          {orders && orders.map((order:Order )=> (


          <TableRow key={order.orderDate} className="max-h-screen">
            <TableCell className="border-r-2" >{order.title}</TableCell>
            <TableCell className="border-r-2" >{order.products.productName}</TableCell>
            <TableCell className="border-r-2" >{order.customer.email}</TableCell>
            <TableCell className="border-r-2" >{formatDate(order.orderDate)}</TableCell>
            <TableCell className="border-r-2" ><Delete/></TableCell>

            <TableCell className="text-right border-r-2">${order.totalAmount}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
