"use client";
import {
  Label,
  LabelList,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useWindowSize } from "@uidotdev/usehooks";

export default function MyRadial({ chartConfig, chartData, height }) {
  const total = chartData[0].Upper + chartData[0].Lower;
  const isMobile = useWindowSize().width < 640;
  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-full min-h-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={chartData}
          endAngle={180}
          innerRadius={80}
          outerRadius={"130"}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 12} // Adjusted for "Total Muscle" placement
                        className="fill-muted-foreground  "
                      >
                        Total Muscle
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 28} // Adjusted for "Engagement" placement
                        className="fill-muted-foreground  "
                      >
                        Engagement
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="Upper"
            stackId="a"
            cornerRadius={5}
            fill="var(--color-Upper)"
            className="stroke-transparent stroke-2"
          >
            {" "}
            <LabelList
              position="insideEnd"
              dataKey="titleOne"
              className="fill-primary capitalize mix-blend-luminosity font-bold"
              fontSize={11}
              // offset={10}
              // textAnchor="start"
            />
          </RadialBar>
          <RadialBar
            dataKey="Lower"
            fill="var(--color-Lower)"
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          >
            {" "}
            <LabelList
              position="insideEnd"
              dataKey="titleTwo"
              className="fill-primary capitalize mix-blend-luminosity font-bold"
              fontSize={11}
            />
          </RadialBar>
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
