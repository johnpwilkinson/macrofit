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
} from "../../../lib/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LogFitnessPerformanceForm from "@/components/LogFitnessPerformanceForm";

export default async function Page({ params }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isMetric = (await getUserInfo(user.id)).isMetric;

  const userMetrics = await getUserBodyMetrics(user.id);

  const userNutritionPlan = await getActiveNutritionPlan(user.id);
  const userFitnessDays = await getUserFitnessDays(user.id);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card className="w-full">
        <CardHeader className="pb-0">
          <CardTitle className="sr-only"> logbook</CardTitle>
          <CardDescription className="sr-only">your logbook </CardDescription>
        </CardHeader>
        <CardContent>
          <LogFitnessPerformanceForm
            userId={user.id}
            isMetric={isMetric}
            userFitnessDays={userFitnessDays.days}
          />
        </CardContent>
      </Card>
    </div>
  );
}
