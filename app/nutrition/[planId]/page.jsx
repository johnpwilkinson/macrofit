import Modal from "@/components/Modal";
import NutritionForm from "@/components/NutritionForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserNutritionPlans, getUserNutritionTable } from "../../lib/data";
import MyTable from "@/components/MyTable";
import { nutritionTableHeaders } from "../../lib/constants";
import SectionDetail from "@/components/SectionDetail";
import NoData from "@/components/NoData";
import { getNutritionPlanById } from "@/app/lib/actions";
export default async function Page({ params }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userNutritionPlans = await getUserNutritionPlans(user.id);

  const userPlan = await getNutritionPlanById(params.planId);

  return (
    <div className="flex flex-col space-y-4">
      {userNutritionPlans.length === 0 ? (
        <NoData
          userFirstName={user.given_name}
          userId={user.id}
          sectionName="nutrition"
          form={<NutritionForm userId={user.id} />}
        />
      ) : (
        <>
          <SectionDetail
            title="Active Nutrition Plan"
            desc="Details about your current plan"
            userId={user.id}
            userFirstName={user.given_name}
            from="nutrition"
            userPlan={userPlan}
          />
          <MyTable
            headers={nutritionTableHeaders}
            data={getUserNutritionTable(userNutritionPlans)}
            caption="A list of your nutrition plans"
            from="nutrition"
          />
        </>
      )}
    </div>
  );
}
