"use client";
import { summarizeWorkoutPlan } from "@/app/lib/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { useWindowSize } from "@uidotdev/usehooks";
function MetricsList({ title, data }) {
  const isMobile = useWindowSize().width < 640;
  // Corrected muscle list without extra brackets and quotes
  const muscles = [
    { muscle: "abdominals", goal: 10 },
    { muscle: "abductors", goal: 10 },
    { muscle: "adductors", goal: 10 },
    { muscle: "biceps", goal: 10 },
    { muscle: "calves", goal: 10 },
    { muscle: "chest", goal: 10 },
    { muscle: "forearms", goal: 10 },
    { muscle: "glutes", goal: 10 },
    { muscle: "hamstrings", goal: 10 },
    { muscle: "lats", goal: 10 },
    { muscle: "lower back", goal: 10 },
    { muscle: "middle back", goal: 10 },
    { muscle: "neck", goal: 10 },
    { muscle: "quadriceps", goal: 10 },
    { muscle: "shoulders", goal: 10 },
    { muscle: "traps", goal: 10 },
    { muscle: "triceps", goal: 10 },
    { muscle: "cardio", goal: 3 },
  ];

  const itemsPerColumn = isMobile ? 6 : 3;
  const columns = [];

  muscles.forEach((muscle, index) => {
    const columnIndex = Math.floor(index / itemsPerColumn);
    if (!columns[columnIndex]) columns[columnIndex] = [];
    columns[columnIndex].push({
      item: muscle.muscle,
      count: data[muscle.muscle] || 0,
      goal: muscle.goal,
    });
  });

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col   ">
            {column.map(({ item, count, goal }) => (
              <div key={item} className="flex  justify-between  space-x-2 ">
                <div className="text-muted-foreground  whitespace-nowrap">
                  {item}
                </div>
                <div
                  className={`${
                    count >= goal ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {count}/{goal}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FitnessPlanMetrics({ fitnessPlanData, planName }) {
  const fitnessPlan = summarizeWorkoutPlan(fitnessPlanData);

  return (
    <MetricsList title="Muscle Groups" data={fitnessPlan.aggregateMuscles} />
  );
}
