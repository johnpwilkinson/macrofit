"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Label,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  LabelList,
  RadarChart,
} from "recharts";

export default function MyRadar({
  chartConfig,
  chartData,
  dataKey,
  nameKey,
  dataKeyTwo,
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
    <ChartContainer config={chartConfig} className=" w-full min-h-[250px]">
      <RadarChart data={chartData}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey={nameKey} />}
        />
        <PolarGrid gridType="polygon" />
        <PolarAngleAxis
          dataKey={nameKey}
          domain={[0, "dataMax"]}
          orientation="outer"
          tick={<CustomTick />} // Use custom tick component
        ></PolarAngleAxis>
        <Radar
          dataKey={dataKey}
          outerRadius="100%"
          fill={`var(--color-${dataKey})`}
          // fillOpacity={0.6}
          // dot={{
          //   r: 4,
          //   fillOpacity: 1,
          // }}
        />
        {dataKeyTwo && (
          <Radar
            dataKey={dataKeyTwo}
            fill={`var(--color-${dataKeyTwo})`}
            fillOpacity={0.6}
            // dot={{
            //   r: 4,
            //   fillOpacity: 1,
            // }}
          />
        )}
      </RadarChart>
    </ChartContainer>
  );
}
