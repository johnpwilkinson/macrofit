import { getActiveFitnessPlan, getExerciseByName } from "../lib/actions";
import Modal from "@/components/Modal";
import FitnessForm from "@/components/FitnessForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserFitnessPlans, getUserFitnessTable } from "../lib/data";
import MyTable from "@/components/MyTable";
import { fitnessTableHeaders } from "../lib/constants";
import SectionDetail from "@/components/SectionDetail";
import NoData from "@/components/NoData";
import { redirect } from "next/navigation";
export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userFitnessPlans = await getUserFitnessPlans(user.id);

  const activeFitnessPlan = await getActiveFitnessPlan(user.id);

  if (!activeFitnessPlan) {
    return (
      <NoData
        userFirstName={user.given_name}
        userId={user.id}
        sectionName="fitness"
        form={<FitnessForm userId={user.id} />}
      />
    );
  }
  redirect(`/fitness/${activeFitnessPlan.id}`);
}
