import Modal from "@/components/Modal";
import NutritionForm from "@/components/NutritionForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserNutritionPlans, getUserNutritionTable } from "../lib/data";
import MyTable from "@/components/MyTable";
import { nutritionTableHeaders } from "../lib/constants";
import SectionDetail from "@/components/SectionDetail";
import { toTitleCase } from "@/app/lib/helpers";
import NoData from "@/components/NoData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BodyComp from "../../components/BodyComp";
import {
  getActiveNutritionPlan,
  getUserBodyMetrics,
  getUserDashboardData,
  getUserFitnessDays,
  getUserInfo,
  getUserWorkoutExerciseHistory,
  getUserWorkouts,
} from "../lib/actions";
import LogItem from "@/components/LogItem";
import LogBodyCompForm from "@/components/LogBodyCompForm";
import LogFitnessPerformanceForm from "@/components/LogFitnessPerformanceForm";
import FitnessLogBook from "@/components/FitnessLogBook";
export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isMetric = await getUserInfo(user.id);

  const userMetrics = await getUserBodyMetrics(user.id);

  const userNutritionPlan = await getActiveNutritionPlan(user.id);
  const userFitnessDays = await getUserFitnessDays(user.id);

  const userWorkouts = await getUserWorkouts(userFitnessDays.days);

  userWorkouts.map((workout) => {
    workout.workoutExercises.map((exercise) => {});
  });

  const userWorkoutExerciseHistory = await getUserWorkoutExerciseHistory(
    user.id
  );

  const userDashboardData = await getUserDashboardData(user.id, isMetric);

  return (
    <div className="flex flex-col space-y-4">
      <Card className="w-full border-none">
        <CardHeader className="p-0">
          <CardTitle className="text-3xl font-black flex justify-between">
            <div>{`${toTitleCase(user.given_name)}'s Dashboard`}</div>
            {/* <div className="flex space-x-4">
              <LogItem title="log body composition" userId={user.id}>
                <LogBodyCompForm userId={user.id} isMetric={isMetric} />
              </LogItem>
              <LogItem title="log body composition" userId={user.id}>
                <LogFitnessPerformanceForm
                  userId={user.id}
                  isMetric={isMetric}
                  userFitnessDays={userFitnessDays.days}
                />
              </LogItem>{" "}
            </div> */}
          </CardTitle>
          <CardDescription> </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col p-0">
          <BodyComp
            userId={user.id}
            userMetrics={userMetrics}
            userWorkoutExerciseHistory={userWorkoutExerciseHistory}
            nutritionPlan={userNutritionPlan}
            userDashboardData={userDashboardData}
          />
        </CardContent>
        <CardFooter>
          <p></p>
        </CardFooter>
      </Card>
    </div>
  );
}
