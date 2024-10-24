import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const LineChartCustom = () => {
  const chartData = [
    { month: "January", desktop: 186, laptop: 0 },
    { month: "February", desktop: 305, laptop: 222 },
    { month: "March", desktop: 237, laptop: 186 },
    { month: "April", desktop: 73, laptop: 333 },
    { month: "May", desktop: 209, laptop: 111 },
    { month: "June", desktop: 214, laptop: 77 },
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
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
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
            content={<ChartTooltipContent indicator="line" />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-desktop)",
            }}
            activeDot={{
              r: 6,
            }}
          >
            {/* <LabelList
              position="top"
              offset={12}
              className="text-gray-500"
              fontSize={12}
            /> */}
          </Line>
          <Line
            dataKey="laptop"
            type="natural"
            stroke="var(--color-laptop)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-laptop)",
            }}
            activeDot={{
              r: 6,
            }}
          >
            {/* <LabelList
              position="top"
              offset={12}
              className="text-gray-500"
              fontSize={12}
            /> */}
          </Line>
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default LineChartCustom;
