"use client";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A bar chart with a custom label";
const CustomLabel = (props) => {
  const { x, y, width, height, value, index, data } = props;

  const highestValue = Math.max(...data.map((item) => item.val));
  const isHighestValue = value === highestValue;

  const xPosition = isHighestValue ? x + width - 8 : x + width + 8;

  return (
    <text
      x={xPosition}
      y={y + height / 2}
      className={`font-bold text-2xl ${
        isHighestValue ? "fill-[var(--color-val)]" : "fill-primary"
      }`} // Tailwind classes for styling
      textAnchor={isHighestValue ? "end" : "start"}
      dy={4}
      fontSize={20}
    >
      {value}
    </text>
  );
};

export default function MyBar({
  data,
  title,
  desc,
  chartData,
  chartConfig,
  className,
}) {
  const maxValue = Math.max(...chartData.map((item) => item.val));

  return (
    <ChartContainer config={chartConfig} className={className}>
      <BarChart accessibilityLayer data={chartData} layout="vertical">
        <CartesianGrid horizontal={false} vertical={false} />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis
          dataKey="val"
          type="number"
          hide
          domain={[0, "dataMax"]}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar dataKey="val" layout="vertical" fill="var(--color-val)" radius={4}>
          <LabelList
            dataKey="displayName"
            position="insideLeft"
            offset={8}
            className="fill-[--color-label] font-black"
            fontSize={25}
          />
          <LabelList dataKey="val" content={<CustomLabel data={chartData} />} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
