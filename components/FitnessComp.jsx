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
import { date } from "zod";
import Logs from "./Logs";
import { format } from "date-fns";
import { TrendingDownIcon, TrendingUpIcon, Trophy } from "lucide-react";

export default function FitnessComp({ userId, userMetrics, nutritionPlan }) {
  const [activeMetric, setActiveMetric] = useState("weight");
  const startingWeight = nutritionPlan.currentWeight; // e.g., 220
  const goalWeight = nutritionPlan.goalWeight; // e.g., 200
  const startingBf = nutritionPlan.currentBodyFat; // e.g., 20
  // startingBmi = nutritionPlan.currentBmi; // e.g., 20
  const isCut = goalWeight < startingWeight; // e.g., true
  const energyDelta = nutritionPlan.energyDelta; // e.g., 500
  const startDate = nutritionPlan.createdAt; // e.g., "2024-10-20T10:20:24.000Z"
  const [hoveredData, setHoveredData] = useState(null);

  const getChartData = () => {
    const chartData = userMetrics.map((metric) => ({
      date: metric.date,
      value: metric[activeMetric],
    }));

    if (activeMetric === "weight") {
      const ddata = generateAndLogWeightData(userMetrics, energyDelta);

      return ddata;
    }
    return chartData.filter((data) => data.value !== null);
  };
  const chartData = getChartData();

  const progressItems = {
    weight: {
      value: startingWeight - hoveredData?.actualWeight,
      units: "lbs",
      isGood: startingWeight > hoveredData?.actualWeight,
      goodDir: "down",
      keyName: "weight",
      displayName: "Weight",
      chartConfig: {
        actualWeight: {
          label: "Actual Weight",
          color: "hsl(var(--chart-1))",
        },
        expectedWeight: {
          label: "Expected Weight",

          color: "hsl(var(--chart-2))",
        },
      },
    },
    bodyFat: {
      value: (startingBf - hoveredData?.value).toFixed(2),
      units: "%",
      isGood: startingBf > hoveredData?.value,
      goodDir: "down",
      keyName: "bodyFat",
      displayName: "Body Fat",
      chartConfig: {
        value: {
          label: "Body Fat",
          color: "hsl(var(--chart-1))",
        },
      },
    },
    bmi: {
      value:
        chartData?.[0]?.value && hoveredData?.value
          ? (chartData?.[0].value - hoveredData.value).toFixed(2)
          : "loading...",
      units: "%",
      isGood: chartData?.[0].value > hoveredData?.value,
      goodDir: "down",
      keyName: "bmi",
      displayName: "BMI",
      chartConfig: {
        value: {
          label: "BMI",
          color: "hsl(var(--chart-1))",
        },
      },
    },
    waist: {
      value:
        chartData?.[0]?.value && hoveredData?.value
          ? (chartData?.[0].value - hoveredData.value).toFixed(2)
          : "loading...",
      units: "in",
      isGood: chartData?.[0].value > hoveredData?.value,
      goodDir: "down",
      keyName: "waist",
      displayName: "Waist",
      chartConfig: {
        value: {
          label: "waist",
          color: "hsl(var(--chart-1))",
        },
      },
    },
    hips: {
      value:
        chartData?.[0]?.value && hoveredData?.value
          ? (chartData?.[0].value - hoveredData.value).toFixed(2)
          : "loading...",
      units: "in",
      isGood: chartData?.[0].value > hoveredData?.value,
      goodDir: "down",
      keyName: "hips",
      displayName: "Hips",
      chartConfig: {
        value: {
          label: "hips",
          color: "hsl(var(--chart-1))",
        },
      },
    },
    neck: {
      value:
        chartData?.[0]?.value && hoveredData?.value
          ? Math.abs((chartData?.[0].value - hoveredData.value).toFixed(2))
          : "loading...",
      units: "in",
      isGood: chartData?.[0].value < hoveredData?.value,
      goodDir: "up",
      keyName: "neck",
      displayName: "Neck",
      chartConfig: {
        value: {
          label: "neck",
          color: "hsl(var(--chart-1))",
        },
      },
    },
    bicep: {
      value:
        chartData?.[0]?.value && hoveredData?.value
          ? Math.abs((chartData?.[0].value - hoveredData.value).toFixed(2))
          : "loading...",
      units: "in",
      isGood: chartData?.[0].value < hoveredData?.value,
      goodDir: "up",
      keyName: "bicep",
      displayName: "Bicep",
      chartConfig: {
        value: {
          label: "bicep",
          color: "hsl(var(--chart-1))",
        },
      },
    },
    legs: {
      value:
        chartData?.[0]?.value && hoveredData?.value
          ? Math.abs((chartData?.[0].value - hoveredData.value).toFixed(2))
          : "loading...",
      units: "in",
      isGood: chartData?.[0].value < hoveredData?.value,
      goodDir: "up",
      keyName: "legs",
      displayName: "Legs",
      chartConfig: {
        value: {
          label: "legs",
          color: "hsl(var(--chart-1))",
        },
      },
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-black">Body Composition</CardTitle>
        <CardDescription>Body composition metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-full h-fit gap-2">
            <div className="flex-1  ">
              <div className="flex rounded-xl border  text-card-foreground shadow p-2 justify-between">
                {Object.values(progressItems).map((metric) => (
                  <button
                    key={metric}
                    className={`text-left w-fit ${
                      activeMetric === metric.keyName
                        ? "bg-primary-foreground text-primary-background"
                        : "bg-primary-background text-primary-background"
                    } p-2 rounded-md`}
                    onClick={() => setActiveMetric(metric.keyName)}
                  >
                    {metric.displayName}
                  </button>
                ))}
              </div>
            </div>
            <Separator orientation="vertical" className="mx-4" />
            <div className="flex-1 rounded-xl border  text-card-foreground shadow p-2">
              <MyLine
                chartData={chartData}
                activeMetric={activeMetric}
                hoveredData={hoveredData}
                setHoveredData={setHoveredData}
                chartConfig={progressItems[activeMetric].chartConfig}
              />
            </div>
          </div>
          <div className="h-auto w-96 flex flex-col justify-between gap-4">
            <div>
              <Logs
                data={hoveredData}
                title={"Progress"}
                desc={`from the start to ${
                  hoveredData?.date
                    ? format(new Date(hoveredData.date), "P")
                    : "loading..."
                }`}
                value={progressItems[activeMetric].value}
                units={progressItems[activeMetric].units}
                icon={
                  progressItems[activeMetric].isGood ? (
                    progressItems[activeMetric].goodDir === "down" ? (
                      <TrendingDownIcon
                        size={32}
                        className="stroke-green-500"
                      />
                    ) : (
                      <TrendingUpIcon size={32} className="stroke-green-500" />
                    )
                  ) : progressItems[activeMetric].goodDir === "down" ? (
                    <TrendingDownIcon size={32} className="stroke-red-500" />
                  ) : (
                    <TrendingUpIcon size={32} className="stroke-red-500" />
                  )
                }
              />
            </div>
            <div className="flex-1 ">
              <Logs />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
  );
}
