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
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import {format ,parseISO} from "date-fns"


interface Ishipping {
  shipmentStatus: string;
  _id: string;
  shipmentId: string;
  name: string;
  shipDate: string;
  countryCode: string;
}

export default function ShippingPage() {
  const [shipping, setshipping] = useState<Ishipping[]>();

  useEffect(() => {
    const fetchshipping = async () => {
      const query = ` *[_type== "shipment"]{
    shipmentId, name, shipDate,  countryCode,  shipmentStatus ,_id 
 } `;

      try {
        const orderResponse = await client.fetch(query); // Fetch data from Sanity
        setshipping(orderResponse);
        console.log(orderResponse, "shipping data"); // Log the response directly
      } catch (error) {
        console.log(error, "error fetching data from Sanity");
      }
    };
    fetchshipping();
  }, []);
  console.log(shipping, "shipping data from sanity ");
  const formatDate = (isoDateString:string) => {
    const date = parseISO(isoDateString);
    return format(date, 'MMMM dd, yyyy hh:mm a');
  };

  return (
    <div className="py-10 w-full px-5">
      <h1 className="text-center text-3xl font-bold pb-8">
        {" "}
        shippings Detail{" "}
      </h1>
      <Table className="table-auto h-72 border border-gray-300 border-collapse">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r-2 p-4"> NAME</TableHead>
            <TableHead className="border-r-2"> SHIPMENT_ID </TableHead>
            <TableHead className="border-r-2">DATE </TableHead>
            <TableHead className="border-r-2">COUNTRY CODE</TableHead>
            <TableHead className="border-r-2">ACTION</TableHead>
            <TableHead className="border-r-2">STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipping &&
            shipping.map((shippings: Ishipping, indx) => (
              <TableRow key={indx}>
                <TableCell className="border-r-2 p-2">
                  {shippings.name}
                </TableCell>
                <TableCell className="border-r-2">
                  {shippings.shipmentId}
                </TableCell>
                <TableCell className="border-r-2">
                {formatDate(shippings.shipDate)}
                </TableCell>
                <TableCell className="border-r-2">
                  {shippings.countryCode}
                </TableCell>
                <TableCell className="border-r-2">
                  <select>
                    <option value="pending1">Pending </option>
                    <option value="pending2">Shipped </option>
                    <option value="pending3">Cancelled</option>
                    <option value="pending3">Delivered</option>
                  </select>
                </TableCell>
                <TableCell className="border-r-2">
                  {shippings.shipmentStatus}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
