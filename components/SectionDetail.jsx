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
} from "@/app/lib/helpers";
import NutritionDetails from "./NutritionDetails";
import FitnessDetails from "./FitnessDetails";
import { Button } from "./ui/button";
import Modal from "./Modal";
import NutritionForm from "./NutritionForm";
import FitnessForm from "./FitnessForm";
import Link from "next/link";

export default async function SectionDetail({
  data,
  title,
  desc,
  userId,
  from,
  activeData,
  userPlan,
  planId,
}) {
  return (
    <Card className="border-none space-y-4">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-3xl font-black flex justify-between">
          <div>Summary</div>
          {from === "nutrition" && (
            <Modal
              title={"Edit Nutrition Plan"}
              desc={""}
              btnStyle={""}
              btnTitle={"Edit Nutrition Plan"}
            >
              <NutritionForm userId={userId} userData={userPlan} />
            </Modal>
          )}
          {from === "fitness" && (
            <Link href={`/fitness/edit/${planId}`}>
              <Button>Edit Fitness Plan</Button>
            </Link>
          )}
        </CardTitle>
        <CardDescription className=" ">{desc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        {from === "nutrition" && (
          <NutritionDetails
            title={title}
            desc={desc}
            userId={userId}
            userPlan={userPlan}
          />
        )}
        {from === "fitness" && (
          <FitnessDetails
            title={title}
            desc={desc}
            userId={userId}
            userPlan={userPlan}
            activeData={activeData}
          />
        )}
      </CardContent>
    </Card>
  );
}
