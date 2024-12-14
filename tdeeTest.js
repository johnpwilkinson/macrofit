import { prisma } from "./lib/prisma.js";
export async function testTDEEField() {
  try {
    const result = await prisma.mFNutrition.create({
      data: {
        userId: "kp_0ea3c388d32d4fd68f8be52aede91443", // Replace with an actual userId
        height: 72,
        gender: "Male",
        activityLevel: "Low",
        currentWeight: 220,
        currentBodyFat: 20,
        goalWeight: 200,
        goalBodyFat: 15,
        tdee: 2491, // Explicitly adding the tdee field
        dailyCalories: 2491,
        protein: 200,
        fat: 83,
        carbs: 236,
        energyDelta: 0,
        age: 40,
      },
    });
  } catch (error) {
    console.error("Error creating nutrition plan:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testTDEEField();
