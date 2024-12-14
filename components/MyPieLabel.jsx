"use client";
import { Pie, PieChart, LabelList } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function MyPieLabel({
  chartData,
  chartConfig,
  dataKey,
  nameKey,
  className,
}) {
  return (
    <ChartContainer
      config={chartConfig}
      className={` pb-0 [&_.recharts-pie-label-text]:fill-foreground ${className}`}
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />

        <Pie data={chartData} dataKey={dataKey} nameKey={nameKey}>
          <LabelList
            dataKey={nameKey}
            position="outside"
            className="fill-primary font-black text-xl stroke-none"
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
