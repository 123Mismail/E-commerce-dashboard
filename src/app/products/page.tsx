
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
  import {  EditIcon} from "lucide-react"
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
 

interface Iproduct {
  stockLevel:number,
  category:string,
  discountPercentage:number,
  price:number,
  name:string
}
  
 export default function ProductsPage (){

    const [product, setproduct] = useState<Iproduct[]>();
  
    useEffect(() => {
      const fetchproduct = async () => {
        const query = ` *[_type== "product"]{

   name, stockLevel , category , discountPercentage , price 
 }`;
  
        try {
          const orderResponse = await client.fetch(query); // Fetch data from Sanity
          setproduct(orderResponse);
          console.log(orderResponse, "product data"); // Log the response directly
        } catch (error) {
          console.log(error, "error fetching data from Sanity");
        }
      };
      fetchproduct();
    }, []);
    console.log(product, "product data from sanity ");
    


    return (

<div className="py-10 w-full px-5">
    <h1 className="text-center text-3xl font-bold pb-8"> products Detail </h1>
<Table  className="table-auto h-72 border border-gray-300 border-collapse">
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead  className="border-r-2 p-4">PRODUCT_NAME</TableHead>
      <TableHead className="border-r-2">PRODUCT_CATEGORY </TableHead>
      <TableHead className="border-r-2">STOCK_LEVEL </TableHead>
      <TableHead className="border-r-2">DISCOUNT</TableHead>
      <TableHead className="border-r-2">PRICE</TableHead>
      <TableHead className="border-r-2" >EDIT</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {product &&  product.map((products:Iproduct ,indx)=>(

    <TableRow key={indx}>
      <TableCell   className="border-r-2 p-2">{products.name}</TableCell>
      <TableCell className="border-r-2">{products.category}</TableCell>
      <TableCell className="border-r-2">{products.stockLevel}</TableCell>
      <TableCell className="border-r-2">{products.discountPercentage}</TableCell>
      <TableCell className="border-r-2">{products.price}</TableCell>
      <TableCell   className="border-r-2"><EditIcon/></TableCell>
      
    </TableRow>
    ))}
  </TableBody>
</Table>
</div>

    )
 }
