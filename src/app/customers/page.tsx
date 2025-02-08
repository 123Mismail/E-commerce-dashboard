
"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
 

interface Icustomer {
  firstName:string,
email:string,
country:string,
zipCode:string,
city:string,
phone:string
}
  
 export default function CustomersPage (){

    const [customer, setcustomer] = useState<Icustomer[]>();
  
    useEffect(() => {
      const fetchcustomer = async () => {
        const query = `*[_type== "customer"]{
   firstName , email , country , zipCode , city , phone
 } `;
  
        try {
          const orderResponse = await client.fetch(query); // Fetch data from Sanity
          setcustomer(orderResponse);
          console.log(orderResponse, "customer data"); // Log the response directly
        } catch (error) {
          console.log(error, "error fetching data from Sanity");
        }
      };
      fetchcustomer();
    }, []);
    console.log(customer, "customer data from sanity ");
    


    return (

<div className="py-10 w-full px-5">
    <h1 className="text-center text-3xl font-bold pb-8"> Customers Detail </h1>
<Table  className="table-auto h-72 border border-gray-300 border-collapse">
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead  className="border-r-2 p-4"> NAME</TableHead>
      <TableHead className="border-r-2">EMAIL ID </TableHead>
      <TableHead className="border-r-2">COUNTRY </TableHead>
      <TableHead className="border-r-2">COUNTRY CODE</TableHead>
      <TableHead className="border-r-2">CITY</TableHead>
      <TableHead className="border-r-2" >PHONE NUMBER</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {customer &&  customer.map((customers:Icustomer ,indx)=>(

    <TableRow key={indx}>
      <TableCell   className="border-r-2 p-2">{customers.firstName}</TableCell>
      <TableCell className="border-r-2">{customers.email}</TableCell>
      <TableCell className="border-r-2">{customers.country}</TableCell>
      <TableCell className="border-r-2">{customers.zipCode}</TableCell>
      <TableCell className="border-r-2">{customers.city}</TableCell>
      <TableCell   className="border-r-2">{customers.phone}</TableCell>
      
    </TableRow>
    ))}
  </TableBody>
</Table>
</div>

    )
 }
