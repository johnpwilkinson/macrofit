import { differenceInCalendarDays } from "date-fns";

function lbsToKg(lbs) {
  return lbs * 0.453592;
}

function inchesToCm(inches) {
  return inches * 2.54;
}

export function calculateBmrAndTdee(
  age,
  gender,
  weight,
  weightType,
  height,
  heightType,
  activityLevel
) {
  if (weightType === "lbs") {
    weight = lbsToKg(weight);
  }

  if (heightType === "in") {
    height = inchesToCm(height);
  }

  let bmr;

  if (gender === "Male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else if (gender === "Female") {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  } else {
    throw new Error("Gender must be 'male' or 'female'");
  }

  let activityFactor;
  switch (activityLevel) {
    case "Low":
      activityFactor = 1.2;
      break;
    case "lightly active":
      activityFactor = 1.375;
      break;
    case "Moderate":
      activityFactor = 1.55;
      break;
    case "very active":
      activityFactor = 1.725;
      break;
    case "High":
      activityFactor = 1.9;
      break;
    default:
      throw new Error("Invalid activity level");
  }

  const tdee = (bmr * activityFactor).toFixed(0);

  return { bmr, tdee };
}

export const computeInitialMacros = (goalWeight, dailyCals) => {
  const protein = goalWeight * 1; // Do not round here
  const fat = (dailyCals * 0.3) / 9; // Do not round here
  const carbs = (dailyCals - protein * 4 - fat * 9) / 4; // Do not round here
  return {
    protein: protein.toFixed(0),
    fat: fat.toFixed(0),
    carbs: carbs.toFixed(0),
  }; // Round only at the end
};

export const updateMacros = (goalWeight, dailyCals, macro, newAmt) => {
  const protein = parseInt(goalWeight);
  const calsLeft = dailyCals - protein * 4;
  if (macro === "f") {
    const fat = newAmt;
    const carbs = (calsLeft - fat * 9) / 4;
    return { protein, fat, carbs };
  } else if (macro === "c") {
    const carbs = newAmt;
    const fat = (calsLeft - carbs * 4) / 9;
    return { protein, fat, carbs };
  }
};

export const calculateMacroBreakdown = (plan) => {
  const totalCalories = plan.dailyCalories;

  return [
    {
      macro: "protein",
      percent: Math.round(((plan.protein * 4) / totalCalories) * 100),
      fill: "var(--color-protein)",
    },
    {
      macro: "fat",
      percent: Math.round(((plan.fat * 9) / totalCalories) * 100),
      fill: "var(--color-fat)",
    },
    {
      macro: "carbs",
      percent: Math.round(((plan.carbs * 4) / totalCalories) * 100),
      fill: "var(--color-carbs)",
    },
  ];
};

// Use it in your component:
const NutritionDetail = ({ plan }) => {
  const chartData = calculateMacroBreakdown(plan);

  return (
    <MyPie
      title="Macro Breakdown"
      desc="for current nutritional plan"
      data={chartData}
    />
  );
};

export function calculateCalsForMacros(plan) {
  // Destructure relevant values from userData
  const { protein, fat, carbs, dailyCalories } = plan;

  // Calculate calories based on grams
  const proteinCalories = protein * 4; // Convert grams to calories
  const fatCalories = fat * 9; // Convert grams to calories
  const carbsCalories = carbs * 4; // Convert grams to calories

  // Define the chartData array using the calculated calorie values
  const chartData = [
    {
      name: "protein",
      displayName: "Protein",
      val: proteinCalories, // Use the calculated protein calories
      fill: "var(--color-protein)",
    },
    {
      name: "fat",
      displayName: "Fat",
      val: fatCalories, // Use the calculated fat calories
      fill: "var(--color-fat)",
    },
    {
      name: "carbs",
      displayName: "Carbs",
      val: carbsCalories, // Use the calculated carbs calories
      fill: "var(--color-carbs)",
    },
    {
      name: "totalCalories",
      displayName: "Total Calories",
      val: dailyCalories, // Use the dailyCalories value directly
      fill: "var(--color-totalCalories)",
    },
  ];

  return chartData;
}

export function toTitleCase(str) {
  return str
    .toLowerCase() // Convert the entire string to lowercase
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
}

export const generateInitialExpectedWeightData = (
  currentWeight,
  caloricDeficit
) => {
  const expectedWeightData = [];
  const weeks = 12; // 12 weeks for 90 days
  const daysInWeek = 7;

  for (let i = 0; i < weeks; i++) {
    const expectedWeight =
      currentWeight - (caloricDeficit * (i * daysInWeek)) / 3500; // 3500 calories per pound
    expectedWeightData.push({
      date: new Date(Date.now() + i * daysInWeek * 86400000).toISOString(), // Weekly intervals
      value: Math.round(expectedWeight * 10) / 10,
    });
  }
  return expectedWeightData;
};

const calculateExpectedWeightloss = (
  startDate,
  caloricDeficit,
  startWeight,
  date
) => {
  const dailyWeightLoss = caloricDeficit / 3500; // lbs lost per day
  const totalDays = differenceInCalendarDays(date, startDate);

  const expectedWeight = startWeight - dailyWeightLoss * totalDays;

  return expectedWeight.toFixed(0);
};

export const generateAndLogWeightData = (bodyMetrics, caloricDeficit) => {
  const chartData = [];
  const weeks = bodyMetrics.length; // Up to 10 weeks of data
  const daysInWeek = 7;
  const startDate = new Date(bodyMetrics[0].date); // Earliest log date

  // Calculate the daily weight loss based on caloric deficit
  const dailyWeightLoss = caloricDeficit / 3500; // lbs lost per day

  // Add existing body metrics to the chartData array
  bodyMetrics.forEach((metric) => {
    chartData.push({
      date: new Date(metric.date), // Ensure date is a JavaScript Date object
      value: metric.value,
      expectedWeight: calculateExpectedWeightloss(
        startDate,
        caloricDeficit,
        bodyMetrics[0].value,
        new Date(metric.date)
      ), // Initially, expected weight matches actual weight
    });
  });

  // Calculate expected weight for the future dates
  for (let i = bodyMetrics.length; i < weeks; i++) {
    const totalDays = i * daysInWeek;
    const expectedWeight = bodyMetrics[0].weight - dailyWeightLoss * totalDays; // Calculate expected weight

    const date = new Date(startDate.getTime() + totalDays * 86400000); // Get future date

    chartData.push({
      date, // Now returns Date object
      value: null, // No logged data for future dates
      expectedWeight: Math.round(expectedWeight * 10) / 10, // Rounded to 1 decimal place
    });
  }

  return chartData;
};

export const standardizeChartData = (chartData) => {
  return chartData.map((entry) => ({
    ...entry,
    date: new Date(entry.date), // Convert all dates to JavaScript Date objects
  }));
};

export function summarizeWorkoutPlan(workoutDays) {
  return workoutDays.reduce(
    (summary, day) => {
      summary.totalDays += 1;

      day.exercises.forEach((exercise) => {
        summary.totalExercises += 1;

        const force = exercise.force || "other";
        summary.exercisesByForce[force] =
          (summary.exercisesByForce[force] || 0) + 1;

        const isCardio = exercise.category === "cardio";
        if (isCardio) {
          summary.cardioCount = (summary.cardioCount || 0) + 1;
        }

        const level = exercise.level;
        summary.exercisesByLevel[level] =
          (summary.exercisesByLevel[level] || 0) + 1;

        const mechanic = exercise.mechanic;
        summary.exercisesByMechanic[mechanic] =
          (summary.exercisesByMechanic[mechanic] || 0) + 1;

        // Check if primaryMuscles is defined and is an array before iterating
        if (Array.isArray(exercise.primaryMuscles)) {
          exercise.primaryMuscles.forEach((muscle) => {
            summary.primaryMuscleGroups[muscle] =
              (summary.primaryMuscleGroups[muscle] || 0) + 1;
            summary.aggregateMuscles[muscle] =
              (summary.aggregateMuscles[muscle] || 0) + 1;
          });
        }

        // Check if secondaryMuscles is defined and is an array before iterating
        if (Array.isArray(exercise.secondaryMuscles)) {
          exercise.secondaryMuscles.forEach((muscle) => {
            summary.secondaryMuscleGroups[muscle] =
              (summary.secondaryMuscleGroups[muscle] || 0) + 1;
            summary.aggregateMuscles[muscle] =
              (summary.aggregateMuscles[muscle] || 0) + 0.5;
          });
        }
      });
      summary.aggregateMuscles.cardio = summary.cardioCount || 0;

      return summary;
    },
    {
      totalDays: 0,
      totalExercises: 0,
      exercisesByForce: {},
      exercisesByLevel: {},
      exercisesByMechanic: {},
      primaryMuscleGroups: {},
      secondaryMuscleGroups: {},
      aggregateMuscles: {},
    }
  );
}

function calculateWeeklyMuscleEngagement(plan) {
  const weeklyEngagement = {
    primaryMuscleGroups: {},
    secondaryMuscleGroups: {},
  };

  plan.forEach((day) => {
    day.exercises.forEach((exercise) => {
      // Primary muscles get full weight (1 per occurrence)
      exercise.primaryMuscles.forEach((muscle) => {
        weeklyEngagement.primaryMuscleGroups[muscle] =
          (weeklyEngagement.primaryMuscleGroups[muscle] || 0) + 1;
      });
      // Secondary muscles get half weight (0.5 per occurrence)
      exercise.secondaryMuscles.forEach((muscle) => {
        weeklyEngagement.secondaryMuscleGroups[muscle] =
          (weeklyEngagement.secondaryMuscleGroups[muscle] || 0) + 0.5;
      });
    });
  });

  return weeklyEngagement;
}

export function getExerciseInsights(days) {
  const insights = {
    force: {},
    primaryMuscles: {},
    secondaryMuscles: {},
    levels: {},
    equipmentUsage: {},
    mostFrequentMuscleGroups: {},
    categories: {},
    weeklyDistribution: {},
    muscleVolume: {},
    exerciseVariability: { uniqueExercises: [], repeatExercises: {} },
    instructionsComplexity: {},
    muscleEngagementByForce: {}, // For Suggestion 11
  };

  const exerciseNames = new Set();

  days.forEach((day) => {
    // For weekly distribution insights
    if (!insights.weeklyDistribution[day.dayNumber]) {
      insights.weeklyDistribution[day.dayNumber] = {
        force: {},
        primaryMuscles: {},
        secondaryMuscles: {},
        categories: {},
      };
    }

    day.exercises.forEach((exercise) => {
      const {
        name,
        force,
        level,
        equipment,
        primaryMuscles,
        secondaryMuscles,
        instructions,
        category,
      } = exercise;

      // Suggestion 1: Force and Exercise Names
      insights.force[force] = insights.force[force] || [];
      insights.force[force].push(name);

      // Suggestion 2: Primary and Secondary Muscle Engagement
      primaryMuscles.forEach((muscle) => {
        insights.primaryMuscles[muscle] =
          (insights.primaryMuscles[muscle] || 0) + 1;
        insights.muscleVolume[muscle] =
          (insights.muscleVolume[muscle] || 0) + 1;

        // Weekly distribution for primary muscles
        insights.weeklyDistribution[day.dayNumber].primaryMuscles[muscle] =
          (insights.weeklyDistribution[day.dayNumber].primaryMuscles[muscle] ||
            0) + 1;
      });

      secondaryMuscles.forEach((muscle) => {
        insights.secondaryMuscles[muscle] =
          (insights.secondaryMuscles[muscle] || 0) + 1;
        insights.muscleVolume[muscle] =
          (insights.muscleVolume[muscle] || 0) + 1;

        // Weekly distribution for secondary muscles
        insights.weeklyDistribution[day.dayNumber].secondaryMuscles[muscle] =
          (insights.weeklyDistribution[day.dayNumber].secondaryMuscles[
            muscle
          ] || 0) + 1;
      });

      // Suggestion 3: Level Distribution
      insights.levels[level] = insights.levels[level] || [];
      insights.levels[level].push(name);

      // Suggestion 4: Equipment Usage
      insights.equipmentUsage[equipment] =
        (insights.equipmentUsage[equipment] || 0) + 1;

      // Suggestion 6: Exercise Category Distribution
      insights.categories[category] = (insights.categories[category] || 0) + 1;

      // Weekly distribution for category
      insights.weeklyDistribution[day.dayNumber].categories[category] =
        (insights.weeklyDistribution[day.dayNumber].categories[category] || 0) +
        1;

      // Suggestion 7: Weekly Distribution of Force
      insights.weeklyDistribution[day.dayNumber].force[force] =
        (insights.weeklyDistribution[day.dayNumber].force[force] || 0) + 1;

      // Suggestion 9: Exercise Variability
      if (!exerciseNames.has(name)) {
        insights.exerciseVariability.uniqueExercises.push(name);
        exerciseNames.add(name);
      } else {
        insights.exerciseVariability.repeatExercises[name] =
          (insights.exerciseVariability.repeatExercises[name] || 1) + 1;
      }

      // Suggestion 10: Instructions Complexity
      insights.instructionsComplexity[name] = instructions.length;

      // Suggestion 11: Most Engaged Muscles by Force Type
      if (!insights.muscleEngagementByForce[force]) {
        insights.muscleEngagementByForce[force] = {
          primary: {},
          secondary: {},
        };
      }

      primaryMuscles.forEach((muscle) => {
        insights.muscleEngagementByForce[force].primary[muscle] =
          (insights.muscleEngagementByForce[force].primary[muscle] || 0) + 1;
      });

      secondaryMuscles.forEach((muscle) => {
        insights.muscleEngagementByForce[force].secondary[muscle] =
          (insights.muscleEngagementByForce[force].secondary[muscle] || 0) + 1;
      });
    });
  });

  return insights;
}

export const getForceInsights = (forceData) =>
  Object.entries(forceData).map(([force, exercises], index) => ({
    force: force === "null" ? "other" : force,
    count: exercises.length,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

export function getEquipmentInsights(equipmentUsage) {
  return Object.entries(equipmentUsage).map(([equipment, count], index) => ({
    equipment,
    count,
    fill: `hsl(var(--chart-${index + 1}))`, // Dynamically assign colors based on index
  }));
}

export function getLevelInsights(levels) {
  return Object.entries(levels).map(([level, exercises], index) => ({
    level,
    count: exercises.length,
    fill: `hsl(var(--chart-${index + 1}))`, // Dynamically assign colors based on index
  }));
}

export const getMuscleEngagementByForceData = (muscleEngagement) => {
  const chartData = [];

  for (const forceType in muscleEngagement) {
    const primaryMuscles = muscleEngagement[forceType].primary;
    const secondaryMuscles = muscleEngagement[forceType].secondary;

    // Create an entry for each force type
    chartData.push({
      force: forceType === "null" ? "other" : forceType,
      primary: Object.values(primaryMuscles).reduce((a, b) => a + b, 0), // Sum primary muscle counts
      secondary: Object.values(secondaryMuscles).reduce((a, b) => a + b, 0), // Sum secondary muscle counts
    });
  }

  return chartData;
};

export const percentFormatter = (value) => `${value}%`;

const muscleGroupMap = {
  abdominals: { group: "Core", location: "Upper" },
  abductors: { group: "Legs", location: "Lower" },
  adductors: { group: "Legs", location: "Lower" },
  biceps: { group: "Arms", location: "Upper" },
  chest: { group: "Chest", location: "Upper" },
  shoulders: { group: "Shoulders", location: "Upper" },
  calves: { group: "Legs", location: "Lower" },
  triceps: { group: "Arms", location: "Upper" },
  forearms: { group: "Arms", location: "Upper" },
  glutes: { group: "Legs", location: "Lower" },
  hamstrings: { group: "Legs", location: "Lower" },
  lats: { group: "Back", location: "Upper" },
  "middle back": { group: "Back", location: "Upper" },
  "lower back": { group: "Back", location: "Lower" },
  neck: { group: "Neck", location: "Upper" },
  quadriceps: { group: "Legs", location: "Lower" },
  traps: { group: "Back", location: "Upper" },
};

export function getAggregateByGroupAndLocation(aggregateMuscles) {
  const groupAggregation = {};
  const locationAggregation = { Upper: 0, Lower: 0 };

  for (const [muscle, value] of Object.entries(aggregateMuscles)) {
    if (muscle !== "cardio") {
      const { group, location } = muscleGroupMap[muscle];

      // Aggregate by muscle group
      if (!groupAggregation[group]) {
        groupAggregation[group] = 0;
      }
      groupAggregation[group] += value;

      // Aggregate by location (Upper/Lower)
      locationAggregation[location] += value;
    }
  }

  return { groupAggregation, locationAggregation };
}

export const getAggregateMuscleGroupData = (aggregateMuscles) => {
  return Object.entries(aggregateMuscles).map(([muscle, count], index) => ({
    muscle,
    count,
    fill: `hsl(var(--chart-${index + 1}))`, // Dynamically assign colors based on index
  }));
};

export const getLargeMuscleGroupData = (aggregateMuscles) => {
  aggregateMuscles.titleOne = "upper body";
  aggregateMuscles.titleTwo = "lower body";

  return [aggregateMuscles];
};

export const inchesToFeetHeight = (inches) => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
};

export function computeTimeToGoal(plan) {
  const {
    currentWeight,
    currentBodyFat,
    goalWeight,
    goalBodyFat,
    energyDelta,
  } = plan;

  const weightDelta = currentWeight - goalWeight;

  return ((weightDelta * 3500) / energyDelta).toFixed(0);
}
