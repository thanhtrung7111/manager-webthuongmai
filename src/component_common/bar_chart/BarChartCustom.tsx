import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
const BarChartCustom = () => {
  const chartData = [
    { month: "January", desktop: 186, laptop: 186 },
    { month: "February", desktop: 305, laptop: 186 },
    { month: "March", desktop: 237, laptop: 186 },
    { month: "April", desktop: 73, laptop: 186 },
    { month: "May", desktop: 209, laptop: 186 },
    { month: "June", desktop: 214, laptop: 186 },
    { month: "December", desktop: 214, laptop: 186 },
    { month: "October", desktop: 214, laptop: 186 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    laptop: {
      label: "laptop",
      color: "#09B291",
    },
  } satisfies ChartConfig;
  return (
    <div className="w-full h-80">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
          }}
          barGap={0}
          maxBarSize={15}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            label={{
              value: "(Số lượng)",
              angle: -90,
              position: "insideLeft",
            }}
            axisLine={false}
          ></YAxis>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="text-gray-600"
              fontSize={12}
            />
          </Bar>
          <Bar dataKey="laptop" fill="var(--color-laptop)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="text-gray-600"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default BarChartCustom;
