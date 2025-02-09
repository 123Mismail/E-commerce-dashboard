"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { client } from "@/lib/sanity";

 
const chartConfig = {
  views: {
    label: "Page Views",
  },
  totalAmount: {
    label: "Total Amount ",
    color: "hsl(var(--chart-1))",
  },
  price: {
    label: " Average Price Per Month",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface IProduct {
  price: number;
}

interface IOrder {
  products?: IProduct[];
  price?: number;
  orderDate: string;
  totalAmount: number;
}

export default function AnalyticsPage() {
  const [orders, setOrders] = React.useState<IOrder[]>([]);

  React.useEffect(() => {
    const fetchOrders = async () => {
      const query = `*[_type == "order"] { products, price, orderDate, totalAmount }`;

      try {
        const orderResponse = await client.fetch(query);
        const order = orderResponse.map((data: IOrder) => ({
          orderDate: data.orderDate.split("T")[0],
          price: data.products?.[0]?.price || 0,
          totalAmount: data.totalAmount,
        }));
        setOrders(order);
      } catch (error) {
        console.error("Error fetching data from Sanity", error);
      }
    };
    fetchOrders();
  }, []);

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("totalAmount");

  const total = React.useMemo(
    () => ({
      totalAmount: orders.reduce((acc, curr) => acc + curr.totalAmount, 0),
      price: orders.reduce((acc, curr) => acc + (curr.price || 0), 0),
    }),
    [orders]
  ) ;

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total orders and revenue over time
          </CardDescription>
        </div>  
        <div className="flex">
        
          {["totalAmount", "price"].map((key) => {
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
               
                  {total[key as keyof typeof total ].toLocaleString()}
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
                const orderDate = new Date(value);
                return orderDate.toLocaleDateString("en-US", {
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
        <div className="mx-15 py-5">
        <span className="text-gray-900 font-semibold">Note</span> : This chart is not showing any insights about orders its for just UI effetcs But the data used are fetched from sanity . 
      </div>
      </CardContent>
     
    </Card>
  );
}
