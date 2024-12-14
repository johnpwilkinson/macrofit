"use client";
import { LabelList, Pie, PieChart } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { percentFormatter } from "@/app/lib/helpers";
// export const description = "A pie chart with a legend";
const CustomLabel = (props) => {
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

  if (chartLabelType === "exerciseDist") {
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">
        <tspan
          className="font-bold"
          // style={{ fontSize: "14px", fontWeight: "bold" }}
          fontSize={15}
          x={x} // Set x for alignment with textAnchor
          dy=".1em"
        >
          {data[index][`${nameKey}`]}
        </tspan>

        {/* Second line of text */}
        <tspan
          className="text-secondary"
          fontSize={15}
          // style={{ fontSize: "14px", fontWeight: "normal" }}
          x={x} // Reapply x to align with previous tspan
          dy="1.2em" // Adjusts spacing to place it below the first tspan
        >
          {/* {`${data.find((item) => item.macro === value).percent}%`} */}
        </tspan>
      </text>
    );
  }
  return (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">
      <tspan
        className="font-bold"
        // style={{ fontSize: "14px", fontWeight: "bold" }}
        fontSize={30}
        x={x} // Set x for alignment with textAnchor
        dy="-.1em"
      >
        {data[index][`${nameKey}`]}
      </tspan>

      {/* Second line of text */}
      <tspan
        className="text-secondary"
        fontSize={30}
        // style={{ fontSize: "14px", fontWeight: "normal" }}
        x={x} // Reapply x to align with previous tspan
        dy="1.2em" // Adjusts spacing to place it below the first tspan
      >
        {`${value}%`}
      </tspan>
    </text>
  );
};

export default function MyPie({
  title,
  desc,
  chartData,
  chartConfig,
  dataKey,
  nameKey,
  className,
  chartLabelType,
}) {
  const getFormatter = (key) => {
    if (key === "percent") {
      return percentFormatter; // Use the specific percent formatter
    }
    // Add more conditions if you have other formatters for different keys
    return (value) => value; // Default formatter
  };

  const formatter = getFormatter(dataKey); // Get the appropriate formatter
  return (
    <ChartContainer config={chartConfig} className={className}>
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
        <Pie
          data={chartData}
          dataKey={dataKey}
          // cx="50%"
          // cy="50%"
          outerRadius="100%"
          // fill="#8884d8"
        >
          <LabelList
            dataKey={dataKey}
            content={
              <CustomLabel
                data={chartData}
                dataKey={dataKey}
                nameKey={nameKey}
                chartLabelType={chartLabelType}
              />
            }
            position={"insideStart"}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
