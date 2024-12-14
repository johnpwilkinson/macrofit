"use client";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A stacked bar chart with a legend";

export default function MyStackedBar({
  barOneDataKey,
  barTwoDataKey,
  xAxisdataKey,
  chartData,
  chartConfig,
}) {
  const CustomTick = ({ x, y, payload }) => {
    return (
      <text
        x={x}
        y={y}
        className="fill-primary font-black text-xl stroke-none" // Tailwind classes here
        textAnchor="middle"
      >
        {payload.value} {/* Render the value directly */}
      </text>
    );
  };
  return (
    <ChartContainer config={chartConfig} className="    w-full min-h-[250px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} horizontal={false} />
        <XAxis
          dataKey={xAxisdataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          hide
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend
          content={
            <ChartLegendContent
              // nameKey={nameKey}
              className=""
              textClassName="text-lg"
              legendIconsClassName="h-4 w-4"
            />
          }
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />{" "}
        <Bar
          dataKey={barOneDataKey}
          stackId="a"
          fill="var(--color-primary)"
          radius={[0, 0, 4, 4]}
        ></Bar>
        <Bar
          dataKey={barTwoDataKey}
          stackId="a"
          fill="var(--color-secondary)"
          radius={[4, 4, 0, 0]}
        >
          {" "}
          <LabelList
            dataKey={xAxisdataKey}
            position="insideTop"
            offset={8}
            className="fill-primary font-black"
            fontSize={25}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
