import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  getUserInfo,
  getUserBodyMetrics,
  getActiveNutritionPlan,
  getUserFitnessDays,
  getWorkoutById,
} from "../../../lib/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LogFitnessPerformanceForm from "@/components/LogFitnessPerformanceForm";

export default async function Page({ workoutId }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isMetric = await getUserInfo(user.id);

  const userMetrics = await getUserBodyMetrics(user.id);

  const userNutritionPlan = await getActiveNutritionPlan(user.id);
  const userFitnessDays = await getUserFitnessDays(user.id);
  const userWorkout = await getWorkoutById("cm34m94g2001jqrgt5ag8p3fh");

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle> logbook</CardTitle>
          <CardDescription>your logbook </CardDescription>
        </CardHeader>
        <CardContent>
          <LogFitnessPerformanceForm
            userId={user.id}
            isMetric={isMetric}
            userFitnessDays={userFitnessDays.days}
            userWorkoutToEdit={userWorkout}
          />
        </CardContent>
      </Card>
    </div>
  );
}
