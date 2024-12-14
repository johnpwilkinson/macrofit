import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getUserInfo,
  getUserBodyMetrics,
  getActiveNutritionPlan,
  getUserFitnessDays,
  getUserWorkoutLogs,
  getUserBodyMetricsByDate,
} from "../../lib/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LogFitnessPerformanceForm from "@/components/LogFitnessPerformanceForm";
import WorkoutLogbook from "@/components/WorkoutLogbook";
import BodyMetricsLogbook from "@/components/BodyMetricsLogbook";
import ModalDrawer from "@/components/ModalDrawer";
import { parseISO, format } from "date-fns";
import GenericWrapper from "@/components/GenericWrapper";
import LogBodyCompForm from "@/components/LogBodyCompForm";

export default async function Page({ params }) {
  const date = params.date;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Get user information
  const isMetric = (await getUserInfo(user.id)).isMetric;

  // Fetch user fitness days
  const userFitnessDays = await getUserFitnessDays(user.id);

  // Extract dayIds from userFitnessDays
  const dayIds = userFitnessDays.days.map((day) => day.id);
  const bodyMetricLogs = (await getUserBodyMetricsByDate(user.id, date)) || {}; // Default to an empty object if null

  // Fetch workout logs for the user on the specified date
  const workoutLogs = await getUserWorkoutLogs(user.id, dayIds, date);
  console.log(workoutLogs);
  const isWorkoutLogsEmpty = workoutLogs.length === 0;
  const isBodyMetricLogsEmpty = Object.keys(bodyMetricLogs).length === 0;
  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card className="w-full border-none space-y-2">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="flex justify-between">
            <div className="text-3xl">Logbook</div>
            <div className="flex justify-between space-x-2">
              {!isWorkoutLogsEmpty && (
                <ModalDrawer title={"edit workout"} desc={``}>
                  <LogFitnessPerformanceForm
                    userId={user.id}
                    isMetric={isMetric}
                    userFitnessDays={userFitnessDays.days}
                    userWorkoutToEdit={workoutLogs[0]}
                  />
                </ModalDrawer>
              )}
              {!isBodyMetricLogsEmpty && (
                <ModalDrawer title={"edit metrics"} desc={``}></ModalDrawer>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-4">
          <GenericWrapper title="Fitness" desc={`Your workout logs`}>
            {isWorkoutLogsEmpty ? (
              <div className="">
                <ModalDrawer
                  title={"add workout"}
                  desc={`Add your workout for ${format(
                    parseISO(date),
                    "M/d/yyyy"
                  )}`}
                >
                  <LogFitnessPerformanceForm
                    userId={user.id}
                    isMetric={isMetric}
                    userFitnessDays={userFitnessDays.days}
                  />
                </ModalDrawer>
              </div>
            ) : (
              <WorkoutLogbook workoutLogs={workoutLogs} isMetric={isMetric} />
            )}
          </GenericWrapper>
          <GenericWrapper title="Body Metrics" desc={`Your body metrics`}>
            {isBodyMetricLogsEmpty ? (
              <div className="">
                <ModalDrawer
                  title="add body metrics"
                  desc={`add your body metrics for ${format(
                    parseISO(date),
                    "M/d/yyyy"
                  )}`}
                >
                  <LogBodyCompForm userId={user.id} isMetric={isMetric} />
                </ModalDrawer>
              </div>
            ) : (
              <BodyMetricsLogbook logs={bodyMetricLogs} isMetric={isMetric} />
            )}
          </GenericWrapper>
        </CardContent>
      </Card>
    </div>
  );
}
