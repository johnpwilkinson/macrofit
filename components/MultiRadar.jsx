"use client";
import { cloneElement, useState } from "react";
import MyRadar from "./MyRadar";
import { MyDonut } from "./MyDonut";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MultiRadar({
  title,
  desc,
  chartData,
  options,
  children,
}) {
  const [activeOption, setActiveOption] = useState(options[0]);
  const inputStyle =
    "block rounded-br-none   rounded-bl-none border-primary border-none focus:border-none focus-visible:ring-0 focus:ring-none focus:outline-none text-2xl p-0 px-0  placeholder-transparent box-border";

  const activeChartData = chartData[activeOption].chartData;
  const activeChartConfig = chartData[activeOption].chartConfig;
  const dataKey = chartData[activeOption].dataKey;
  const nameKey = chartData[activeOption].nameKey;
  const dataKeyTwo = chartData[activeOption].dataKeyTwo || null;
  return (
    <div className="  h-auto flex flex-col border-none space-y-2">
      <div className="p-0 flex   items-center  space-x-2 ">
        {" "}
        {/* Added space-x-1 to control gap */}
        <div className="text-xl font-black leading-none tracking-tight whitespace-nowrap">
          {title}
        </div>
        <Select onValueChange={(v) => setActiveOption(v)} value={activeOption}>
          <SelectTrigger
            className={`${inputStyle} h-auto flex items-center text-xl font-black leading-none tracking-tight whitespace-nowrap bg-transparent focus:outline-none focus-visible:outline-none border-none shadow-none focus:ring-0 text-left outline-none`} // Custom styles for inline display
          >
            <SelectValue placeholder="" />
          </SelectTrigger>

          <SelectContent
            contentClassName="min-w-[--radix-select-trigger-width] border-primary rounded-none"
            viewportClassName="bg-background"
          >
            {options.map((option, index) => (
              <SelectItem
                key={index}
                value={option}
                className="text-xl rounded-none focus:bg-primary focus:text-background"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="sr-only">{desc}</div>
      </div>

      <div className="md:flex-1 p-0">
        {/* Use flexbox to display the charts side by side if chart2 exists */}
        <div
          className={`flex flex-col  mx-auto aspect-square max-h-[300px] min-h-[200px] w-full`}
        >
          {cloneElement(children, {
            chartData: activeChartData,
            chartConfig: activeChartConfig,
            nameKey: nameKey,
            dataKey: dataKey,
            dataKeyTwo: dataKeyTwo,
            className:
              "mx-auto aspect-square max-h-[300px] min-h-[200px] w-full",
          })}
        </div>
      </div>
    </div>
  );
}
//  <MyRadar
//    chartData={activeChartData}
//    chartConfig={activeChartConfig}
//    nameKey={nameKey}
//    dataKey={dataKey}
//    dataKeyTwo={dataKeyTwo}
//  />;  // <ChartCard
//   title="by Equipment"
//   desc="for current fitness plan"
//   chart={
//     <MyDonut
//       title="Exercise Insights"
//       desc="for current fitness plan"
//       chartData={getEquipmentInsights(
//         advancedInsights.equipmentUsage
//       )}
//       chartConfig={fitnessEquipmentChartConfig}
//       dataKey="count"
//       nameKey="equipment"
//       chartLabelType="exerciseDist"
//     />
//   }
// />
// <ChartCard
//   title="by Challenge Level"
//   desc="for current fitness plan"
//   chart={
//     <MyDonut
//       title="Exercise Insights"
//       desc="for current fitness plan"
//       chartData={getLevelInsights(advancedInsights.levels)}
//       chartConfig={fitnessLevelChartConfig}
//       dataKey="count"
//       nameKey="level"
//       chartLabelType="exerciseDist"
//     />
//   }
// />
// <ChartCard
//   title="by Force"
//   desc="for current fitness plan"
//   chart={
//     <MyDonut
//       title="Exercise Insights"
//       desc="for current fitness plan"
//       chartData={getForceInsights(advancedInsights.force)}
//       chartConfig={fitnessForcePieChartConfig}
//       dataKey="count"
//       nameKey="force"
//       chartLabelType="exerciseDist"
//     />

// />
