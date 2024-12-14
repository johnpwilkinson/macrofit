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
import {
  getActiveFitnessPlan,
  getDayExercises,
  getFitnessPlanDays,
} from "@/app/lib/actions";
import FitnessPlanMetrics from "./FitnessPlanMetrics";
import {
  getAggregateByGroupAndLocation,
  getAggregateMuscleGroupData,
  getEquipmentInsights,
  getExerciseInsights,
  getForceInsights,
  getLargeMuscleGroupData,
  getLevelInsights,
  getMuscleEngagementByForceData,
  summarizeWorkoutPlan,
} from "@/app/lib/helpers";
import ChartCard from "./ChartCard";
import {
  fitnessEquipmentChartConfig,
  fitnessForcePieChartConfig,
  fitnessLevelChartConfig,
  largeMuscleEngagementRadarChartConfig,
  muscleEngagementBarChartConfig,
  muscleEngagementChartConfig,
  muscleEngagementRadarChartConfig,
} from "@/app/lib/constants";
import MyStackedBar from "./MyStackedBar";
import MyRadar from "./MyRadar";
import MyRadial from "./MyRadial";
import MyPieLabel from "./MyPieLabel";
import { MyDonut } from "./MyDonut";
import MultiRadar from "./MultiRadar";
import { Separator } from "./ui/separator";
export default async function FitnessDetails({ userId, activeData, userPlan }) {
  const activeFitnessPlanDays = await getFitnessPlanDays(userPlan.id);
  const fitnessPlan = summarizeWorkoutPlan(activeFitnessPlanDays);

  const advancedInsights = getExerciseInsights(activeFitnessPlanDays);

  const engagementMusclegroup = getAggregateMuscleGroupData(
    getAggregateByGroupAndLocation(
      summarizeWorkoutPlan(activeFitnessPlanDays).aggregateMuscles
    ).groupAggregation
  );

  const engagementForce = getMuscleEngagementByForceData(
    advancedInsights.muscleEngagementByForce
  );

  const distEquipment = getEquipmentInsights(advancedInsights.equipmentUsage);
  const distLevel = getLevelInsights(advancedInsights.levels);
  const distForce = getForceInsights(advancedInsights.force);
  return (
    <div className="flex flex-col space-y-4 p-0">
      <Card className="w-full min-w-36 border-none">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-xl font-black flex flex-col sm:flex-row justify-between  w-full sm:whitespace-nowrap">
            <div>Fitness Plan Info</div>
            <div className="flex justify-between sm:space-x-2  m-0">
              <div className="text-border">
                {fitnessPlan.totalDays} days / week
              </div>
              <Separator orientation="vertical" />
              <div className="text-border">
                {fitnessPlan.totalExercises} exercises / week
              </div>
            </div>
          </CardTitle>
          <CardDescription className=" sr-only">
            Details about your current plan
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row space-y-4 p-0">
          <div className=" flex-grow sm:max-w-56">
            <MyRadial
              height={"120"}
              chartData={getLargeMuscleGroupData(
                getAggregateByGroupAndLocation(
                  summarizeWorkoutPlan(activeFitnessPlanDays).aggregateMuscles
                ).locationAggregation
              )}
              chartConfig={largeMuscleEngagementRadarChartConfig}
              dataKey={"count"}
              nameKey={"muscle"}
            />
          </div>
          <div className="h-auto flex-grow">
            <FitnessPlanMetrics
              fitnessPlanData={activeFitnessPlanDays}
              planName={userPlan.name}
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col sm:flex-row sm:justify-between mt-4 sm:gap-4 sm:space-y-0 sm:space-x-4 sm:w-full">
        {/* <div className="flex flex-col sm:flex-row sm:justify-between mt-4 sm:gap-4"> */}
        <div className={`sm:w-1/2`}>
          <MultiRadar
            title="Muscle Engagement by"
            options={["muscle group", "force"]}
            desc="for current nutritional plan"
            chartData={{
              "muscle group": {
                chartData: engagementMusclegroup,
                chartConfig: muscleEngagementRadarChartConfig,
                dataKey: "count",
                nameKey: "muscle",
              },
              force: {
                chartData: engagementForce,
                chartConfig: muscleEngagementBarChartConfig,
                nameKey: "force",
                dataKey: "primary",
                dataKeyTwo: "secondary",
              },
            }}
          >
            <MyRadar />
          </MultiRadar>
        </div>
        <div className={`sm:w-1/2`}>
          <MultiRadar
            title="Exercise Distribution by"
            desc="for current nutritional plan"
            options={["equipment", "challenge level", "force"]}
            chartData={{
              equipment: {
                chartData: distEquipment,
                chartConfig: fitnessEquipmentChartConfig,
                dataKey: "count",
                nameKey: "equipment",
              },
              "challenge level": {
                chartData: distLevel,
                chartConfig: fitnessLevelChartConfig,
                dataKey: "count",
                nameKey: "level",
              },
              force: {
                chartData: distForce,
                chartConfig: fitnessForcePieChartConfig,
                dataKey: "count",
                nameKey: "force",
              },
            }}
          >
            <MyDonut />
          </MultiRadar>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
