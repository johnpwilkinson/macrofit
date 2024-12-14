import {
  getUserInfo,
  getUserBodyMetrics,
  getActiveNutritionPlan,
  getUserFitnessDays,
  getUserWorkoutLogs,
  getFullFitnessPlanForEditing,
} from "../../../lib/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LogFitnessPerformanceForm from "@/components/LogFitnessPerformanceForm";
import FitnessForm from "@/components/FitnessForm";

export default async function Page({ params }) {
  const fitnessPlanId = await params.fitnessPlanId;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Get user information
  const isMetric = await getUserInfo(user.id);

  const activeFitnessPlanForEditing = await getFullFitnessPlanForEditing(
    user.id,
    fitnessPlanId
  );
  return (
    <div className="flex flex-col space-y-4 w-full">
      <FitnessForm userId={user.id} userData={activeFitnessPlanForEditing} />
    </div>
  );
}
