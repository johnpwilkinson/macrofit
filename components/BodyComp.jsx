"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import MyLine from "./MyLine";
import { getUserBodyMetrics } from "../app/lib/actions";
import {
  generateAndLogWeightData,
  generateInitialExpectedWeightData,
} from "../app/lib/helpers";
import { motion, AnimatePresence } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Cross1Icon, Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useWindowSize } from "@uidotdev/usehooks";

function MetricSelect({
  activeMetric,
  setActiveMetric,
  categories,
  removeMetric,
  isRightSelect,
  selectedColor,
}) {
  const [isSelectOneOpen, setIsSelectOneOpen] = useState(false);

  const handleSelectOneOpen = () => {
    setIsSelectOneOpen(true);
  };

  const handleSelectOneClose = () => {
    setIsSelectOneOpen(false);
  };

  return (
    <div className="w-1/2">
      <Select
        onValueChange={(v) => setActiveMetric(v)}
        value={activeMetric}
        onOpenChange={(open) => {
          if (open) handleSelectOneOpen();
          else handleSelectOneClose();
        }}
      >
        <SelectTrigger
          className={`w-full sm:w-36 focus:ring-0  `}
          style={{ color: selectedColor || "var(--primary, #3490dc)" }} // Set color dynamically
        >
          <SelectValue placeholder="Select a metric" />
        </SelectTrigger>
        <SelectContent
          contentClassName={`${
            isSelectOneOpen ? "w-[calc(2*9rem+0.5rem)]" : "w-36"
          } ${isRightSelect ? "-translate-x-[calc(10%)]" : ""}`}
          viewportClassName={`${
            isSelectOneOpen ? "w-[calc(2*9rem+0.5rem)]" : "w-36"
          } `}
        >
          {categories.map((category) => (
            <SelectGroup key={category.name}>
              <SelectLabel className="text-lg font-bold">
                {category.name}
              </SelectLabel>
              {category.items.map((item) => (
                <SelectItem key={item.keyName} value={item.keyName}>
                  {item.displayName}{" "}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
function formatExerciseDataForSelect(data) {
  const loadCategory = {
    name: "Load Over Time",
    items: data.map((exercise) => ({
      keyName: `${exercise.exerciseId}_load`,
      displayName: exercise.exerciseName,
      data: exercise.loadOverTime,
    })),
  };

  const volumeCategory = {
    name: "Volume Over Time",
    items: data.map((exercise) => ({
      keyName: `${exercise.exerciseId}_volume`,
      displayName: exercise.exerciseName,
      data: exercise.volumeOverTime,
    })),
  };

  return [loadCategory, volumeCategory];
}

export default function BodyComp({
  userId,
  userMetrics,
  nutritionPlan,
  userWorkoutExerciseHistory,
  userDashboardData,
}) {
  const [activeMetricOne, setActiveMetricOne] = useState(null);
  const [activeMetricTwo, setActiveMetricTwo] = useState(null);

  const selectdata = formatExerciseDataForSelect(userWorkoutExerciseHistory);
  const [addSecondMetric, setAddSecondMetric] = useState(false);
  const widthConfig = {
    select: 370, // Original width for the select component
    badge: 150, // Width for the badge when a metric is selected
    selectExpanded: 220, // Width for the second select when first metric is selected
  };
  const [activeMetricOneChartData, setActiveMetricOneChartData] = useState({
    chartData: [],
    chartConfig: {},
  });
  const [activeMetricTwoChartData, setActiveMetricTwoChartData] = useState({
    chartData: [],
    chartConfig: {},
  });

  const selectedMetric =
    activeMetricOne || (selectdata?.[0]?.categories?.[0]?.keyName ?? "");

  const startingWeight = nutritionPlan.currentWeight; // e.g., 220
  const goalWeight = nutritionPlan.goalWeight; // e.g., 200
  const startingBf = nutritionPlan.currentBodyFat; // e.g., 20
  // startingBmi = nutritionPlan.currentBmi; // e.g., 20
  const isCut = goalWeight < startingWeight; // e.g., true
  const energyDelta = nutritionPlan.energyDelta; // e.g., 500
  const startDate = nutritionPlan.createdAt; // e.g., "2024-10-20T10:20:24.000Z"
  const [hoveredData, setHoveredData] = useState(null);

  const getChartData = (data, activeMetric, isMetricOne) => {
    if (!activeMetric || !data) {
      return { chartData: [], chartConfig: {} };
    }

    // Find the metric directly in the flattened array
    const item = data.find((metric) => metric.keyName === activeMetric);
    if (item) {
      if (item.keyName === "weight") {
        return {
          chartData: generateAndLogWeightData(item.data, energyDelta),
          chartConfig: {
            [isMetricOne ? "metricOneValue" : "metricTwoValue"]: {
              label: item.displayName,
              color: `hsl(var(--chart-${isMetricOne ? 3 : 4}))`,
            },
            expectedWeight: {
              label: "Expected Weight",
              color: "hsl(var(--chart-2))",
            },
            axisLabel: item.axisLabel,
          },
        };
      }
      return {
        chartData: item.data,
        chartConfig: {
          [isMetricOne ? "metricOneValue" : "metricTwoValue"]: {
            label: item.displayName,
            color: `hsl(var(--chart-${isMetricOne ? 3 : 4}))`,
          },
          axisLabel: item.axisLabel,
        },
      };
    }

    return { chartData: [], chartConfig: {} };
  };

  useEffect(() => {
    const chartData = getChartData(
      userDashboardData.flattenedDashboardData,
      activeMetricOne,
      true
    );

    setActiveMetricOneChartData(chartData);
  }, [activeMetricOne, userDashboardData]);

  useEffect(() => {
    const chartData = getChartData(
      userDashboardData.flattenedDashboardData,
      activeMetricTwo,
      false
    );

    setActiveMetricTwoChartData(chartData);
  }, [activeMetricTwo, userDashboardData]);

  // if (hoveredData?.value)
  //   console.log(startingBf, hoveredData.value, startingBf - hoveredData.value);
  const removeSecondMetric = () => {
    setAddSecondMetric(false);
    setActiveMetricTwo(null);
  };
  const [parent, enableAnimations] = useAutoAnimate();

  const size = useWindowSize();

  const isMobile = size.width < 640;
  return (
    <Card className="w-full border-none px-0">
      <div className="flex flex-col sm:flex-row justify-between  sm:px-0">
        <CardHeader className="mb-4 sm:mb-0 p-0">
          <CardTitle className="text-xl sm:text-2xl font-black  ">
            Body Composition & Gainz Over Time
          </CardTitle>
          <CardDescription>
            Select metrics to view & compare progess over time
          </CardDescription>
        </CardHeader>
        <div
          className="flex sm:w-72 gap-2 transition-all duration-750 justify-between w-full sm:justify-end"
          ref={parent}
        >
          {/* First Metric Select / Badge */}
          <MetricSelect
            categories={userDashboardData.userDashboardData}
            activeMetric={activeMetricOne}
            setActiveMetric={setActiveMetricOne}
            isRightSelect={false}
            width={{ badge: widthConfig.badge, select: widthConfig.select }}
            selectedColor={
              activeMetricOneChartData?.chartConfig?.metricOneValue?.color
            }
            // className={`${
            //   activeMetricOne ? "w-36" : "w-full"
            // } transition-all duration-500`}
          />

          {/* Second Metric Select / Badge */}

          <MetricSelect
            categories={userDashboardData.userDashboardData}
            isRightSelect={true}
            activeMetric={activeMetricTwo}
            setActiveMetric={setActiveMetricTwo}
            removeMetric={() => setActiveMetricTwo(null)}
            selectedColor={
              activeMetricTwoChartData?.chartConfig?.metricTwoValue?.color
            }
            width={{
              badge: widthConfig.selectExpanded,
              select: widthConfig.selectExpanded,
            }}
            // className="w-36 transition-all duration-500"
          />
        </div>
      </div>
      {/* <CardDescription className="flex justify-between">
          <div className=""> body composition metrics over time</div>
          <div className="">fitness performance metrics over time</div>
        </CardDescription> */}

      <CardContent className="px-0 mt-4 sm:mt-0">
        {/* <div className="flex justify-between gap-4"> */}
        <div
          className="flex-1 w-full  text-card-foreground shadow"
          ref={parent}
        >
          <MyLine
            activeMetricOneChartData={activeMetricOneChartData?.chartData}
            activeMetricOne={activeMetricOne}
            activeMetricOneChartConfig={activeMetricOneChartData?.chartConfig}
            hoveredData={hoveredData}
            setHoveredData={setHoveredData}
            chartConfig={{
              ...activeMetricOneChartData?.chartConfig,
              ...activeMetricTwoChartData?.chartConfig,
            }}
            activeMetricTwo={activeMetricTwo}
            activeMetricTwoChartData={activeMetricTwoChartData?.chartData}
            activeMetricTwoChartConfig={activeMetricTwoChartData?.chartConfig}
            isMobile={isMobile}
          />
        </div>
        {/* </div> */}
      </CardContent>
    </Card>
  );
}
function EmptyChart() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-lg text-center text-gray-500">
        Select a Metric from the drop down above to view your progress
      </p>
    </div>
  );
}
// return (
//   <Card className="w-full border-none px-0">
//     <CardHeader className="px-0">
//       <CardTitle className="text-2xl font-black flex justify-between">
//         <div className="">Body Composition</div>
//         <div className="">
//           <MetricSelect
//             metrics={progressItems}
//             activeMetricOne={activeMetricOne}
//             setactiveMetricOne={setactiveMetricOne}
//           />
//         </div>
//       </CardTitle>
//       <CardDescription className="flex justify-between">
//         <div className=""> body composition metrics over time</div>
//         <div className="">fitness performance metrics over time</div>
//       </CardDescription>
//     </CardHeader>
//     <CardContent className="px-0">
//       <div className="flex justify-between gap-4">
//         {/* <div className="flex  w-full h-fit gap-2"> */}
//         {/* <div className="flex-1  "> */}
//         {/* <div className="flex flex-col w-fit rounded-xl border  text-card-foreground shadow p-2 justify-between">
//             {Object.values(progressItems).map((metric) => (
//               <button
//                 key={metric}
//                 className={`text-left w-fit ${
//                   activeMetric === metric.keyName
//                     ? "bg-primary-foreground text-primary-background"
//                     : "bg-primary-background text-primary-background"
//                 } p-2 rounded-md`}
//                 onClick={() => setActiveMetric(metric.keyName)}
//               >
//                 {metric.displayName}
//               </button>
//             ))}
//           </div> */}
//         {/* </div> */}
//         {/* <Separator orientation="vertical" className="mx-4" /> */}
//         <div className="flex-1 rounded-xl border w-full  text-card-foreground shadow p-2">
//           <MyLine
//             chartData={chartData}
//             activeMetricOne={activeMetricOne}
//             hoveredData={hoveredData}
//             setHoveredData={setHoveredData}
//             chartConfig={progressItems[activeMetricOne].chartConfig}
//           />
//         </div>
//         {/* </div> */}
//         {/* <div className="h-auto w-96 flex flex-col justify-between gap-4"> */}
//         {/* <div className="flex-1  "> */}
//         {/* <div className="flex flex-col w-fit rounded-xl border  text-card-foreground shadow p-2 justify-between">
//             {Object.values(progressItems).map((metric) => (
//               <button
//                 key={metric}
//                 className={`text-left w-fit ${
//                   activeMetric === metric.keyName
//                     ? "bg-primary-foreground text-primary-background"
//                     : "bg-primary-background text-primary-background"
//                 } p-2 rounded-md`}
//                 onClick={() => setActiveMetric(metric.keyName)}
//               >
//                 {metric.displayName}
//               </button>
//             ))}
//           </div> */}
//         {/* </div> */}
//         {/* <Logs
//                 data={hoveredData}
//                 title={"Progress"}
//                 desc={`from the start to ${
//                   hoveredData?.date
//                     ? format(new Date(hoveredData.date), "P")
//                     : "loading..."
//                 }`}
//                 value={progressItems[activeMetric].value}
//                 units={progressItems[activeMetric].units}
//                 icon={
//                   progressItems[activeMetric].isGood ? (
//                     progressItems[activeMetric].goodDir === "down" ? (
//                       <TrendingDownIcon
//                         size={32}
//                         className="stroke-green-500"
//                       />
//                     ) : (
//                       <TrendingUpIcon size={32} className="stroke-green-500" />
//                     )
//                   ) : progressItems[activeMetric].goodDir === "down" ? (
//                     <TrendingDownIcon size={32} className="stroke-red-500" />
//                   ) : (
//                     <TrendingUpIcon size={32} className="stroke-red-500" />
//                   )
//                 }
//               />
//             </div>
//             <div className="flex-1 ">
//               <Logs /> */}
//         {/* </div> */}
//       </div>
//     </CardContent>
//   </Card>
// );
