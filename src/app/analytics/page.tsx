"use client"
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
 
 
 

const chartConfig = {
  views: {
    label: "Total Amount",
  },
  totalAmount: {
    label: "Total Orders",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Total Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { client } from "../lib/sanity";

export const description = "An interactive bar chart";
 
 
 

interface IOrder {

  orderDate: string; // or use `Date` if you plan to convert it to a Date object
  totalAmount: number;
}


  export default function Component() {

     const [orders, setOrders] = React.useState<IOrder[]>();
    
      React.useEffect(() => {
        const fetchOrders = async () => {
          const query = `*[_type == "order"] {
               
           
              orderDate,
              totalAmount ,
              
            }`;
    
          try {
            const orderResponse = await client.fetch(query); // Fetch data from Sanity
            setOrders((orderResponse.map((orders:any)=>({...orders
              ,orderDate: orders.orderDate.split('T')[0]
            } ) )));
            console.log(orderResponse, "orders data"); // Log the response directly
          } catch (error) {
            console.log(error, "error fetching data from Sanity");
          }
        };
        fetchOrders();
      }, []);

       console.log(orders ,"orders value is fetching")
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("totalAmount");
    

      
      
      const total = React.useMemo(
        () => ({
          totalAmount:orders &&   orders.reduce((acc, curr) => acc + curr.totalAmount, 0),
          mobile: orders && orders.reduce((acc, curr) => acc + curr.totalAmount, 0),
        }),
        []
      );
     
  

  return (
    <Card className="w-full px-4">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total   revenue
          </CardDescription>
        </div>
        <div className="flex">
          {["totalAmount", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                   { total &&   total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={orders}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="orderDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
