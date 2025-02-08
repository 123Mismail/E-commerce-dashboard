

"use client";
import React from "react";

export default function OrderTableSkeleton() {
  const skeletonRows = Array.from({ length: 6 }); // Number of rows in skeleton

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-200 text-sm font-semibold text-gray-700">
            <th className="p-4">ORDER_ID</th>
            <th className="p-4">Products</th>
            <th className="p-4">Customer Email</th>
            <th className="p-4">Order Date</th>
            <th className="p-4">Action</th>
            <th className="p-4">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="p-4">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-48 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
