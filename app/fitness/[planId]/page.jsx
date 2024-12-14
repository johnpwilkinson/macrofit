import {
  getActiveFitnessPlan,
  getExerciseByName,
  getFullFitnessPlanForEditing,
} from "../../lib/actions";
import Modal from "@/components/Modal";
import FitnessForm from "@/components/FitnessForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserFitnessPlans, getUserFitnessTable } from "../../lib/data";
import MyTable from "@/components/MyTable";
import { fitnessTableHeaders } from "../../lib/constants";
import SectionDetail from "@/components/SectionDetail";
import NoData from "@/components/NoData";
import { getFitnessPlanById } from "@/app/lib/actions";
export default async function Page({ params }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userFitnessPlans = await getUserFitnessPlans(user.id);

  const activeFitnessPlan = await getActiveFitnessPlan(user.id);
  const userPlan = await getFitnessPlanById(params.planId);
  const activeFitnessPlanForEditing = await getFullFitnessPlanForEditing(
    user.id,
    params.planId
  );
  return (
    <div className="flex flex-col space-y-4">
      {userFitnessPlans.length === 0 ? (
        <>
          <NoData
            userFirstName={user.given_name}
            userId={user.id}
            sectionName="fitness"
            form={<FitnessForm userId={user.id} />}
          />
        </>
      ) : (
        <>
          <SectionDetail
            title="Active Fitness Plan"
            desc="Details about your current plan"
            userId={user.id}
            userFirstName={user.given_name}
            from="fitness"
            activeData={activeFitnessPlanForEditing}
            userPlan={userPlan}
            planId={params.planId}
          />
          <MyTable
            headers={fitnessTableHeaders}
            data={getUserFitnessTable(userFitnessPlans)}
            from="fitness"
          />
        </>
      )}
    </div>
  );
}
