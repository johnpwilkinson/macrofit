import {
  computeTimeToGoal,
  inchesToFeetHeight,
  summarizeWorkoutPlan,
} from "@/app/lib/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import convert from "convert-units";
import {
  ArrowBigDown,
  ArrowBigUp,
  CalendarHeart,
  Flag,
  Info,
  PersonStandingIcon,
  Play,
} from "lucide-react";
import { Separator } from "./ui/separator";
import {
  InfoCircledIcon,
  LayersIcon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";

function MetricCard({ title, children, icon }) {
  return (
    <Card className="min-w-36 border-none">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-xl font-black flex justify-between space-x-2 h-7 whitespace-nowrap w-full">
          <div>{title}</div>
          <div className="h-6 w-6">{icon}</div>
        </CardTitle>
        <CardDescription className="sr-only ">
          Details about your current plan
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 p-0">
        {children}
      </CardContent>
      <CardFooter className="sr-only">
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default function NutritionPlanMetrics({ nutritionPlanData, planName }) {
  let isMetric = false;
  return (
    <div className="flex flex-col sm:flex-row w-full justify-between shadow h-fit gap-4">
      <MetricCard
        title="My Info"
        icon={<InfoCircledIcon className="h-full w-full" />}
      >
        {nutritionPlanData.age} yr old{" "}
        {inchesToFeetHeight(nutritionPlanData.height)}{" "}
        {nutritionPlanData.gender}
      </MetricCard>
      <MetricCard
        title="Body Composition"
        icon={<LayersIcon className="h-full w-full" />}
      >
        <div className="flex flex-1 h-full items-center whitespace-nowrap space-x-4">
          <div className="flex space-x-1">
            <div>Starting:</div>
            <div>
              {nutritionPlanData.currentWeight} {isMetric ? "kg" : "lbs"}
            </div>
            <div>@</div>
            <div>{nutritionPlanData.currentBodyFat}% bf</div>
          </div>
          <Separator orientation="vertical" className="h-6 bg-gray-300" />
          <div className="flex space-x-1">
            <div>Goal:</div>
            <div>
              {nutritionPlanData.goalWeight} {isMetric ? "kg" : "lbs"}
            </div>
            <div>@</div>
            <div>{nutritionPlanData.goalBodyFat}% bf</div>
          </div>
        </div>
      </MetricCard>
      <MetricCard
        title={`Daily
            ${
              nutritionPlanData.currentWeight > nutritionPlanData.goalWeight
                ? " deficit"
                : " surplus"
            }`}
        icon={
          nutritionPlanData.currentWeight > nutritionPlanData.goalWeight ? (
            <ThickArrowDownIcon className="h-full w-full" />
          ) : (
            <ThickArrowUpIcon className="h-full w-full" />
          )
        }
      >
        {nutritionPlanData.energyDelta} calories
      </MetricCard>
      <MetricCard
        title="Time to Goal"
        icon={<Flag className="h-full w-full" />}
      >
        {computeTimeToGoal(nutritionPlanData)} days
      </MetricCard>
    </div>
  );
}
