import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MyPie from "./MyPie";
import MyBar from "./MyBar";
import MyLine from "./MyLine";
import ChartCard from "./ChartCard";
import { getActiveNutritionPlan } from "@/app/lib/actions";
import {
  calculateCalsForMacros,
  calculateMacroBreakdown,
  percentFormatter,
} from "@/app/lib/helpers";
import {
  nutritionCaloriesBarChartConfig,
  nutritionMacroPieChartConfig,
} from "@/app/lib/constants";
import NutritionPlanMetrics from "./NutritionPlanMetrics";
export default async function NutritionDetails({
  title,
  desc,
  userId,
  userPlan,
}) {
  const activeNutritionPlan = await getActiveNutritionPlan(userId);
  const pieData = calculateMacroBreakdown(userPlan);
  const barData = calculateCalsForMacros(userPlan);

  return (
    <div className="flex flex-col space-y-4 p-0">
      <NutritionPlanMetrics nutritionPlanData={userPlan} />

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-between w-full h-full">
        <ChartCard
          title="Macro Breakdown"
          desc="for current nutritional plan"
          chart={
            <MyPie
              title="Macro Breakdown"
              desc="for current nutritional plan"
              chartData={pieData}
              chartConfig={nutritionMacroPieChartConfig}
              dataKey="percent"
              nameKey="macro"
              className="mx-auto aspect-square sm:max-h-[300px] min-h-[200px] w-full"
            />
          }
        />
        <ChartCard
          title="Caloric Breakdown"
          desc="for current nutritional plan"
          chart={
            <MyBar
              title="Caloric Breakdown"
              desc="for current nutritional plan"
              chartData={barData}
              chartConfig={nutritionCaloriesBarChartConfig}
              className="mx-auto aspect-square sm:max-h-[300px] min-h-[200px] w-full"
            />
          }
          chartData={barData}
        />
      </div>
    </div>
  );
}
