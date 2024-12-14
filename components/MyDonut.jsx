"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, LabelList, Pie, PieChart } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function MyDonut({
  title,
  desc,
  chartData,
  chartConfig,
  dataKey,
  nameKey,
  className,
  chartLabelType,
}) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => {
      return acc + curr[dataKey];
    }, 0);
  }, [dataKey]);

  return (
    <ChartContainer config={chartConfig} className={className}>
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={"50%"}
          outerRadius={"100%"}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Exercises
                    </tspan>
                  </text>
                );
              }
            }}
          />
          <LabelList
            dataKey={nameKey}
            // position="outside"
            className="fill-primary "
            content={<CustomLabel />}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

function CustomLabel(props) {
  const { cx, cy, value, index, data, viewBox, chartLabelType, nameKey } =
    props;
  const { innerRadius, outerRadius, startAngle, endAngle } = viewBox;

  const RADIAN = Math.PI / 180;
  const midAngle = (startAngle + endAngle) / 2;

  // Compute the radius you want the labels to be from the center
  const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.5;

  // Calculate x and y based on the midpoint of the slice
  const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">
      <tspan
        className="font-bold"
        // style={{ fontSize: "14px", fontWeight: "bold" }}
        fontSize={15}
        x={x} // Set x for alignment with textAnchor
        dy="-.1em"
      >
        {value}
        {/* {data[index][`${nameKey}`]} */}
      </tspan>

      {/* Second line of text */}
      <tspan
        className="text-secondary"
        fontSize={30}
        // style={{ fontSize: "14px", fontWeight: "normal" }}
        x={x} // Reapply x to align with previous tspan
        dy="1.2em" // Adjusts spacing to place it below the first tspan
      >
        {/* {`${value}%`} */}
      </tspan>
    </text>
  );
}
