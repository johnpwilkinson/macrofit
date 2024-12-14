import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { toTitleCase } from "@/app/lib/helpers";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getUserFitnessDays,
  getUserInfo,
  getUserWorkouts,
} from "../../lib/actions";
import LogFitnessPerformanceForm from "@/components/LogFitnessPerformanceForm";
import FitnessLogBook from "@/components/FitnessLogBook";
export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isMetric = await getUserInfo(user.id);
  const userFitnessDays = await getUserFitnessDays(user.id);

  const userWorkouts = await getUserWorkouts(userFitnessDays.days);

  return <div className="flex flex-col space-y-4">fdf</div>;
}
{
  /* <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem className="hidden md:block">
      <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator className="hidden md:block" />
    <BreadcrumbItem>
      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>; */
}
