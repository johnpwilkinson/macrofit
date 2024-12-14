import { prisma } from "@/lib/prisma"; // Make sure the path is correct based on your project structure
import { format } from "date-fns";
import DetailsIcon from "../icons/details";
export async function getUserNutritionPlans(userId) {
  try {
    const plans = await prisma.mFNutrition.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        height: true,
        gender: true,
        activityLevel: true,
        currentWeight: true,
        currentBodyFat: true,
        goalWeight: true,
        goalBodyFat: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        endDate: true,
        carbs: true,
        dailyCalories: true,
        fat: true,
        protein: true,
        tdee: true,
        age: true,
        energyDelta: true,
        name: true, // Ensure this is included in the select statement
      },
    });

    return plans;
  } catch (error) {
    console.error("Error fetching user nutrition plans:", error);
    throw new Error("Unable to fetch nutrition plans");
  }
}

export function getUserNutritionTable(nutritionPlans) {
  const sortedPlans = [...nutritionPlans].sort(
    (a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0)
  );

  return sortedPlans.map((plan) => ({
    active: plan.isActive, // Active
    dateStarted: format(new Date(plan.createdAt), "yyyy-MM-dd"), // Date Started
    dateEnded: format(new Date(plan.updatedAt), "yyyy-MM-dd"), // Date Ended
    details: <DetailsIcon key={plan.id} className=" " />, // Details icon
    name: plan.name,
    id: plan.id,
  }));
}

export function getUserFitnessTable(fitnessPlans) {
  // Sort the fitness plans to ensure active plans are first
  const sortedPlans = [...fitnessPlans].sort(
    (a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0)
  );

  return sortedPlans.map((plan) => ({
    active: plan.isActive, // Active
    dateStarted: format(new Date(plan.createdAt), "yyyy-MM-dd"), // Date Started
    dateEnded: format(new Date(plan.updatedAt), "yyyy-MM-dd"), // Date Ended
    details: <DetailsIcon key={plan.id} className=" " />, // Details icon
    daysPerWeek: plan.daysPerWeek,
    name: plan.name,
    id: plan.id,
  }));
}

export async function getUserFitnessPlans(userId) {
  try {
    const plans = await prisma.FitnessPlan.findMany({
      where: {
        userId: userId,
      },
    });

    return plans;
  } catch (error) {
    console.error("Error fetching user fitness plans:", error);
    throw new Error("Unable to fetch fitness plans");
  }
}
