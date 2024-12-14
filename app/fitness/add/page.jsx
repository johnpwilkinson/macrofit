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
} from "../../lib/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LogFitnessPerformanceForm from "@/components/LogFitnessPerformanceForm";
import FitnessForm from "@/components/FitnessForm";

export default async function Page({ params }) {
  const date = params.date;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Get user information
  const isMetric = await getUserInfo(user.id);

  // Fetch user fitness days
  const userFitnessDays = await getUserFitnessDays(user.id);

  // Extract dayIds from userFitnessDays
  const dayIds = userFitnessDays.days.map((day) => day.id);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <FitnessForm userId={user.id} />
    </div>
  );
}
