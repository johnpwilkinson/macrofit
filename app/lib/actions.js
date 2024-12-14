"use server";

// Import Prisma client
import { prisma } from "@/lib/prisma"; // Make sure the path is correct based on your project structure
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// Server action to add a new user to Supabase using Prisma
export async function addNewUser(eventData) {
  try {
    // Extract relevant user data from the event payload (e.g., user.created event)
    const { id, email, first_name, last_name } = eventData.user;

    // Insert the new user into the MacroFitUser table using Prisma
    const newUser = await prisma.macroFitUser.create({
      data: {
        id: id, // Assuming you receive the user ID from Kinde or generate a new one
        email: email,
        first_name: first_name,
        last_name: last_name,
        createdAt: new Date(), // Set the createdAt timestamp
        updatedAt: new Date(), // Set the updatedAt timestamp
      },
    });

    return newUser;
  } catch (err) {
    console.error("Error adding new user:", err.message);
    throw new Error(`Failed to add new user: ${err.message}`);
  }
}

export async function addNutritionPlan(data) {
  try {
    const newNutritionPlan = await prisma.mFNutrition.create({
      data: {
        userId: data.userId,
        height: data.height,
        gender: data.gender,
        activityLevel: data.activityLevel,
        currentWeight: data.currentWeight,
        currentBodyFat: data.currentBodyFat,
        goalWeight: data.goalWeight,
        goalBodyFat: data.goalBodyFat,
        tdee: data.tdee,
        dailyCalories: data.dailyCalories,
        protein: data.protein,
        fat: data.fat,
        carbs: data.carbs,
        energyDelta: data.energyDelta,
        age: data.age,
        isActive: true,
      },
    });

    // Debug log to check if prisma.mFMetric is defined

    // Add the initial metric entry for the newly created nutrition plan
    const initialMetric = await prisma.bodyMetric.create({
      data: {
        userId: data.userId,
        date: new Date().toISOString(),
        weight: data.currentWeight,
      },
    });

    // Optionally, revalidate the path if you're using Next.js or a similar framework
    revalidatePath("/nutrition");

    return newNutritionPlan;
  } catch (error) {
    console.error("Error adding nutrition plan:", error);
    throw new Error(`Failed to add nutrition plan: ${error.message}`);
  }
}

export async function getActiveNutritionPlan(userId) {
  try {
    const activeNutritionPlan = await prisma.mFNutrition.findFirst({
      where: {
        userId: userId,
        isActive: true, // Assuming there is a field to indicate the active nutrition plan
      },
    });

    return activeNutritionPlan;
  } catch (error) {
    console.error("Error fetching active nutrition plan:", error);
    throw new Error(`Failed to fetch active nutrition plan: ${error.message}`);
  }
}

export async function getActiveFitnessPlan(userId) {
  try {
    const activeFitnessPlan = await prisma.FitnessPlan.findFirst({
      where: {
        userId: userId,
        isActive: true, // Assuming there is a field to indicate the active fitness plan
      },
    });

    return activeFitnessPlan;
  } catch (error) {
    console.error("Error fetching active fitness plan:", error);
    throw new Error(`Failed to fetch active fitness plan: ${error.message}`);
  }
}
export async function getFitnessPlanDays(fitnessPlanId) {
  try {
    const days = await prisma.Day.findMany({
      where: {
        fitnessPlanId: fitnessPlanId,
      },
    });

    const allDaysWithExercises = await Promise.all(
      days.map(async (day) => {
        const dayExercises = await prisma.DayExercise.findMany({
          where: {
            dayId: day.id,
          },
        });

        // Map over each exercise in DayExercise and retrieve details from Exercise table
        const exercisesWithDetails = await Promise.all(
          dayExercises.map(async (dayExercise) => {
            const exerciseDetails = await prisma.Exercise.findUnique({
              where: {
                id: dayExercise.exerciseId,
              },
            });
            return { ...exerciseDetails };
          })
        );

        return { ...day, exercises: exercisesWithDetails };
      })
    );

    return allDaysWithExercises;
  } catch (error) {
    console.error("Error fetching fitness plan days:", error);
    throw new Error(`Failed to fetch fitness plan days: ${error.message}`);
  }
}

export async function getUserBodyMetrics(userId) {
  try {
    const metrics = await prisma.bodyMetric.findMany({
      where: {
        userId: userId, // Query by the user's ID
      },
      orderBy: {
        date: "asc", // Order by date to track progress over time
      },
    });

    return metrics;
  } catch (error) {
    console.error("Error fetching user body metrics:", error);
    throw new Error("Failed to fetch user body metrics");
  }
}

export async function getExerciseByName(id) {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: id, // Use name to find the exercise
      },
    });
    return exercise;
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return null; // Return null in case of error
  }
}

export async function addFitnessPlan(data) {
  try {
    // Create the fitness plan
    const newFitnessPlan = await prisma.FitnessPlan.create({
      data: {
        userId: data.userId,
        name: data.name,
        daysPerWeek: data.daysPerWeek,
      },
    });

    // Loop through each day and add it to the fitness plan
    for (const day of data.days) {
      // Await the addition of each day
      const newDay = await AddFitnessDay(day, newFitnessPlan.id);

      // Loop through each exercise within the day and add it to the day
      for (const exercise of day.exercises) {
        await AddExerciseToDay(exercise, newDay.id); // Use newDay.id as dayId
      }
    }

    return newFitnessPlan;
  } catch (error) {
    console.error("Error adding fitness plan:", error);
    throw new Error(`Failed to add fitness plan: ${error.message}`);
  }
}

export async function AddFitnessDay(day, fitnessPlanId) {
  try {
    const newDay = await prisma.Day.create({
      data: {
        fitnessPlanId: fitnessPlanId,
        dayNumber: day.dayNumber,
        name: day.name,
      },
    });

    return newDay;
  } catch (error) {
    console.error("Error adding fitness day:", error);
    throw new Error(`Failed to add fitness day: ${error.message}`);
  }
}

export async function AddExerciseToDay(exercise, dayId) {
  try {
    const newExercise = await prisma.DayExercise.create({
      data: {
        dayId: dayId,
        exerciseId: exercise.exerciseId,
        name: exercise.name, // Store exercise name here
      },
    });

    return newExercise;
  } catch (error) {
    console.error("Error adding exercise to day:", error);
    throw new Error(`Failed to add exercise to day: ${error.message}`);
  }
}

export async function getDayExercises(dayId) {
  try {
    const exercises = await prisma.DayExercise.findMany({
      where: {
        dayId: dayId,
      },
    });

    return exercises;
  } catch (error) {
    console.error("Error fetching day exercises:", error);
    throw new Error(`Failed to fetch day exercises: ${error.message}`);
  }
}

export async function addBodyCompLog(data) {
  try {
    const newBodyCompLog = await prisma.BodyMetric.create({
      data: {
        date: data.date,
        userId: data.userId,
        weight: data.weight,
        bodyFat: data.bodyFat,
        bmi: data.bmi,
        waist: data.waist,
        hips: data.hips,
        neck: data.neck,
        bicep: data.bicep,
        legs: data.legs,
      },
    });
    revalidatePath("/dashboard");
    return newBodyCompLog;
  } catch (error) {
    console.error("Error fetching day exercises:", error);
    throw new Error(`Failed to fetch day exercises: ${error.message}`);
  }
}

export const getUserInfo = async (userId) => {
  try {
    const user = await prisma.macroFitUser.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error(`Failed to fetch user info: ${error.message}`);
  }
};

export const updateUserInfo = async (userId, data) => {
  try {
    const updatedUser = await prisma.macroFitUser.update({
      where: {
        id: userId,
      },
      data: {
        isMetric: data.isMetric,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw new Error(`Failed to update user info: ${error.message}`);
  }
};

export async function getUserFitnessDays(userId) {
  try {
    const activePlanWithDays = await prisma.fitnessPlan.findFirst({
      where: {
        userId: userId,
        isActive: true,
      },
      include: {
        days: {
          include: {
            dayExercises: {
              include: {
                exercise: true, // This will bring in exercise details for each DayExercise
              },
            },
          },
        },
      },
    });

    if (!activePlanWithDays) throw new Error("No active fitness plan found.");

    return activePlanWithDays;
  } catch (error) {
    console.error(
      "Error fetching fitness plan with days and exercises:",
      error
    );
    throw new Error("Could not retrieve fitness plan details.");
  }
}

export async function getFitnessDayExercises(dayId) {
  try {
    const exercises = await prisma.dayExercise.findMany({
      where: {
        dayId: dayId,
      },
    });
    return exercises;
  } catch (error) {
    console.error("Error fetching day exercises:", error);
    throw new Error("Could not retrieve day exercises.");
  }
}

export async function addDateToURL(date) {
  redirect(`/logbook?date=${date}`);
}

export async function getUserWorkoutExerciseHistory(userId) {
  try {
    const exerciseStats = await prisma.fitnessPlan.findMany({
      where: {
        userId,
      },
      select: {
        days: {
          select: {
            workouts: {
              select: {
                date: true,
                workoutExercises: {
                  select: {
                    exercise: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                    workoutSets: {
                      select: {
                        setNumber: true,
                        reps: true,
                        weight: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // Reshape data to match desired format
    const reshapedData = {};

    exerciseStats.forEach((plan) => {
      plan.days.forEach((day) => {
        day.workouts.forEach((workout) => {
          workout.workoutExercises.forEach((exerciseInstance) => {
            const exerciseId = exerciseInstance.exercise.id;
            const exerciseName = exerciseInstance.exercise.name;
            const workoutDate = workout.date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

            if (!reshapedData[exerciseId]) {
              reshapedData[exerciseId] = {
                exerciseName,
                exerciseId,
                loadOverTime: [],
                volumeOverTime: [],
              };
            }

            // Calculate total load and volume for this exercise on this date
            const totalLoad = exerciseInstance.workoutSets.reduce(
              (acc, set) => acc + set.weight,
              0
            );
            const totalVolume = exerciseInstance.workoutSets.reduce(
              (acc, set) => acc + set.weight * set.reps,
              0
            );

            // Append to load and volume arrays
            reshapedData[exerciseId].loadOverTime.push({
              date: workoutDate,
              weight: totalLoad,
            });
            reshapedData[exerciseId].volumeOverTime.push({
              date: workoutDate,
              weight: totalVolume,
            });
          });
        });
      });
    });

    // Convert object to array for easier frontend consumption
    return Object.values(reshapedData);
  } catch (error) {
    console.error("Error fetching user workout exercise history:", error);
    throw new Error("Could not fetch user workout exercise history.");
  }
}

export async function addWorkout(data) {
  try {
    const newWorkout = await prisma.workout.create({
      data: {
        date: data.date,
        dayId: data.dayId,
        notes: data.notes,
      },
    });

    const newWorkoutExercises = await Promise.all(
      data.exercises.map(async (exercise) => {
        const newExercise = await prisma.workoutExercise.create({
          data: {
            workoutId: newWorkout.id,
            exerciseId: exercise.exerciseId,
          },
        });
        return newExercise;
      })
    );
    const newWorkoutSets = await Promise.all(
      data.exercises.map(async (exercise) => {
        const newSets = await Promise.all(
          exercise.workoutSets.map(async (set) => {
            const newSet = await prisma.workoutSet.create({
              data: {
                workoutExerciseId: newWorkoutExercises.find(
                  (ex) => ex.exerciseId === exercise.exerciseId
                ).id,
                setNumber: set.setNumber,
                weight: set.weight,
                reps: set.reps,
              },
            });
            return newSet;
          })
        );
        return newSets;
      })
    );

    return newWorkout;
  } catch (error) {
    console.error("Error adding workout:", error);
    throw new Error("Could not add workout.");
  }
}

export async function addWorkoutExercise(workoutId, exerciseData) {
  try {
    const newWorkoutExercise = await prisma.workoutExercise.create({
      data: {
        workoutId: workoutId,
        exerciseId: exerciseData.exerciseId,
      },
    });
    return newWorkoutExercise;
  } catch (error) {
    console.error("Error adding workout exercise:", error);
    throw new Error("Could not add workout exercise.");
  }
}

export async function getUserWorkouts(days) {
  try {
    const workouts = await prisma.workout.findMany({
      where: {
        dayId: {
          in: days.id, // Ensure that `days.id` is defined and valid
        },
      },
      include: {
        day: {
          // Include the Day model to get the day name
          select: {
            name: true, // Fetch the day name
            id: true, // Optionally fetch the day ID if needed
          },
        },
        workoutExercises: {
          include: {
            workoutSets: true, // Includes workout sets associated with the workout exercises
            exercise: {
              // Here we include the Exercise model
              select: {
                name: true, // Fetch the exercise name
                id: true, // Optionally fetch the exercise ID if needed
              },
            },
          },
        },
      },
    });

    return workouts; // Return the workouts with included exercise and day data
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    throw new Error("Could not fetch user workouts.");
  }
}

export async function getWorkoutById(workoutId) {
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id: workoutId,
      },
      include: {
        day: true,
        workoutExercises: {
          include: {
            workoutSets: true,
            exercise: true,
          },
        },
      },
    });

    return workout;
  } catch (error) {
    console.error("Error fetching workout by ID:", error);
    throw new Error("Could not fetch workout by ID.");
  }
}
export async function updateWorkout(data) {
  try {
    // Update the workout details
    const updatedWorkout = await prisma.workout.update({
      where: {
        id: data.id, // ID of the workout to update
      },
      data: {
        date: data.date, // Update the date
        dayId: data.dayId, // Update the day ID
        notes: data.notes, // Update notes
      },
    });

    // Get existing workout exercises to determine which ones to update/remove/add
    const existingExercises = await prisma.workoutExercise.findMany({
      where: { workoutId: data.id },
    });

    // Create a map for easy lookup of existing exercises by exerciseId
    const existingExercisesMap = {};
    existingExercises.forEach((ex) => {
      existingExercisesMap[ex.exerciseId] = ex; // Map exerciseId to workoutExercise
    });

    // Update or create workout exercises
    await Promise.all(
      data.exercises.map(async (exercise) => {
        if (existingExercisesMap[exercise.exerciseId]) {
          // Update existing exercise
          const workoutExerciseId =
            existingExercisesMap[exercise.exerciseId].id;
          await prisma.workoutExercise.update({
            where: {
              id: workoutExerciseId, // Use the unique id to update
            },
            data: {
              // Update any fields needed, currently none specified
            },
          });
        } else {
          // Create new exercise if it doesn't exist
          await prisma.workoutExercise.create({
            data: {
              workoutId: updatedWorkout.id,
              exerciseId: exercise.exerciseId,
            },
          });
        }
      })
    );

    // Update or create workout sets
    await Promise.all(
      data.exercises.map(async (exercise) => {
        const workoutExercise = existingExercisesMap[exercise.exerciseId];

        // If workoutExercise exists, clear existing sets for the exercise
        if (workoutExercise) {
          // Clear existing sets for the exercise
          await prisma.workoutSet.deleteMany({
            where: {
              workoutExerciseId: workoutExercise.id,
            },
          });

          // Create new sets
          await Promise.all(
            exercise.workoutSets.map(async (set) => {
              await prisma.workoutSet.create({
                data: {
                  workoutExerciseId: workoutExercise.id,
                  setNumber: set.setNumber,
                  weight: set.weight,
                  reps: set.reps,
                },
              });
            })
          );
        }
      })
    );

    return updatedWorkout;
  } catch (error) {
    console.error("Error updating workout:", error);
    throw new Error("Could not update workout.");
  }
}

export async function getUserWorkoutLogs(userId, dayIds, date) {
  // Normalize the date by removing the time component
  const inputDate = new Date(date);
  const startOfDay = new Date(inputDate.setUTCHours(0, 0, 0, 0)); // Start of the day
  const endOfDay = new Date(inputDate.setUTCHours(23, 59, 59, 999)); // End of the day

  const logs = await prisma.workout.findMany({
    where: {
      dayId: {
        in: dayIds, // Filter by dayIds
      },
      date: {
        gte: startOfDay, // Greater than or equal to the start of the day
        lte: endOfDay, // Less than or equal to the end of the day
      },
    },
    include: {
      day: true,
      workoutExercises: {
        include: {
          workoutSets: true,
          exercise: true,
        },
      },
    },
  });

  return logs;
}

export async function getUserDashboardData(userId, isMetric) {
  try {
    // Fetch body metrics and workout data concurrently
    const [bodyMetrics, exerciseStats] = await Promise.all([
      prisma.bodyMetric.findMany({
        where: { userId },
        orderBy: { date: "asc" },
        select: {
          date: true,
          weight: true,
          // expectedWeight: true,
          bodyFat: true,
          bmi: true,
          waist: true,
          hips: true,
          neck: true,
          bicep: true,
          legs: true,
        },
      }),
      prisma.fitnessPlan.findMany({
        where: { userId },
        select: {
          days: {
            select: {
              workouts: {
                select: {
                  date: true,
                  workoutExercises: {
                    select: {
                      exercise: { select: { id: true, name: true } },
                      workoutSets: {
                        select: { setNumber: true, reps: true, weight: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    ]);

    // Prepare body metrics for the Select component
    const bodyMetricsData = [
      {
        keyName: "weight",
        displayName: "Weight",
        axisLabel: `Body Weight (${isMetric ? "kg" : "lbs"})`,
        data: bodyMetrics.map((entry) => ({
          date: entry.date,
          value: entry.weight,
        })),
      },

      {
        keyName: "bodyFat",
        displayName: "Body Fat",
        axisLabel: "Body Fat Percentage",
        data: bodyMetrics.map((entry) => ({
          date: entry.date,
          value: entry.bodyFat,
        })),
      },
      {
        keyName: "bmi",
        displayName: "BMI",
        axisLabel: "BMI",
        data: bodyMetrics.map((entry) => ({
          date: entry.date,
          value: entry.bmi,
        })),
      },
      {
        keyName: "waist",
        displayName: "Waist",
        axisLabel: `Waist Size (${isMetric ? "cm" : "in"})`,
        data: bodyMetrics.map((entry) => ({
          date: entry.date,
          value: entry.waist,
        })),
      },
      {
        keyName: "hips",
        displayName: "Hips",
        axisLabel: `Hips Size (${isMetric ? "cm" : "in"})`,
        data: bodyMetrics.map((entry) => ({
          date: entry.date,
          value: entry.hips,
        })),
      },
      {
        keyName: "neck",
        displayName: "Neck",
        axisLabel: `Neck Size (${isMetric ? "cm" : "in"})`,
        data: bodyMetrics.map((entry) => ({
          date: entry.date,
          value: entry.neck,
        })),
      },
      {
        keyName: "bicep",
        displayName: "Bicep",
        axisLabel: `Bicep Size (${isMetric ? "cm" : "in"})`,
        data: bodyMetrics.map((entry) => ({
          date: entry.date,
          value: entry.bicep,
        })),
      },
      {
        keyName: "legs",
        displayName: "Legs",
        axisLabel: `Legs Size (${isMetric ? "cm" : "in"})`,
        data: bodyMetrics.map((entry) => ({
          date: entry.date,
          value: entry.legs,
        })),
      },
    ];

    // Prepare exercise data by load and volume for the Select component
    const loadData = [];
    const volumeData = [];

    exerciseStats.forEach((plan) => {
      plan.days.forEach((day) => {
        day.workouts.forEach((workout) => {
          workout.workoutExercises.forEach((exerciseInstance) => {
            const exerciseId = exerciseInstance.exercise.id;
            const exerciseName = exerciseInstance.exercise.name;
            const workoutDate = workout.date.toISOString().split("T")[0];

            if (
              !loadData.find((item) => item.keyName === `${exerciseId}-load`)
            ) {
              loadData.push({
                keyName: `${exerciseId}-load`,
                displayName: `${exerciseName} Load Over Time`,
                axisLabel: `${exerciseName} Load (${isMetric ? "kg" : "lbs"})`,
                data: [],
              });
            }
            if (
              !volumeData.find(
                (item) => item.keyName === `${exerciseId}-volume`
              )
            ) {
              volumeData.push({
                keyName: `${exerciseId}-volume`,
                displayName: `${exerciseName} Volume Over Time`,
                axisLabel: `${exerciseName} Volume (${
                  isMetric ? "kg" : "lbs"
                })`,
                data: [],
              });
            }

            // Calculate load and volume
            const totalLoad = exerciseInstance.workoutSets.reduce(
              (acc, set) => acc + set.weight,
              0
            );
            const totalVolume = exerciseInstance.workoutSets.reduce(
              (acc, set) => acc + set.weight * set.reps,
              0
            );

            loadData
              .find((item) => item.keyName === `${exerciseId}-load`)
              .data.push({
                date: workoutDate,
                value: totalLoad,
              });
            volumeData
              .find((item) => item.keyName === `${exerciseId}-volume`)
              .data.push({
                date: workoutDate,
                value: totalVolume,
              });
          });
        });
      });
    });

    // Return formatted data for easy consumption in the Select component
    const userDashboardData = [
      { name: "Body Metrics", items: bodyMetricsData },
      { name: "Exercise by Load", items: loadData },
      { name: "Exercise by Volume", items: volumeData },
    ];
    const flattenedDashboardData = userDashboardData.flatMap(
      (category) => category.items
    );

    return { userDashboardData, flattenedDashboardData };
  } catch (error) {
    console.error("Error fetching user dashboard data:", error);
    throw new Error("Failed to fetch user dashboard data.");
  }
}

export async function getFullFitnessPlanForEditing(userId, fitnessPlanId) {
  try {
    const fitnessPlan = await prisma.fitnessPlan.findFirst({
      where: {
        id: fitnessPlanId,
        userId: userId, // Ensures the user owns this fitness plan
      },
      include: {
        days: {
          include: {
            dayExercises: {
              include: {
                exercise: true, // Fetches full details of each exercise
              },
            },
            workouts: {
              include: {
                workoutExercises: {
                  include: {
                    exercise: true, // Include exercise details for each workout
                    workoutSets: true, // Fetch all sets associated with workout exercises
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!fitnessPlan)
      throw new Error("No active fitness plan found for editing.");

    return fitnessPlan;
  } catch (error) {
    console.error("Error fetching full fitness plan for editing:", error);
    throw new Error("Could not retrieve fitness plan details for editing.");
  }
}
export async function updateFitnessPlan(fitnessPlanId, data) {
  let success = false;
  try {
    // Validate data before updating
    if (!data || !data.name || !data.days) {
      throw new Error("Invalid data: 'name' and 'days' are required.");
    }

    // Update the main fitness plan information
    const updatedFitnessPlan = await prisma.FitnessPlan.update({
      where: { id: fitnessPlanId },
      data: {
        name: data.name,
        daysPerWeek: data.daysPerWeek,
      },
    });

    // Get existing days in the fitness plan for comparison
    const existingDays = await prisma.Day.findMany({
      where: { fitnessPlanId },
      include: { dayExercises: true },
    });

    // Map the existing days to their `dayNumber` for easy lookup
    const existingDayNumbers = existingDays.map((day) => day.dayNumber);

    // Separate new days from existing days (new days don't have `id`)
    const newDays = data.days.filter(
      (day) => !existingDayNumbers.includes(day.dayNumber)
    );
    const daysToUpdate = data.days.filter((day) =>
      existingDayNumbers.includes(day.dayNumber)
    );

    // Handle updating existing days
    for (const day of daysToUpdate) {
      const existingDay = existingDays.find(
        (d) => d.dayNumber === day.dayNumber
      );

      if (existingDay) {
        // Update the day itself
        await prisma.Day.update({
          where: { id: existingDay.id },
          data: {
            name: day.name,
            dayNumber: day.dayNumber,
          },
        });

        // Handle exercises for the day
        const existingExercises = existingDay.dayExercises || [];
        const existingExerciseIds = existingExercises.map(
          (ex) => ex.exerciseId
        );

        for (const exercise of day.exercises) {
          const existingExercise = existingExercises.find(
            (ex) => ex.exerciseId === exercise.exerciseId
          );

          if (existingExercise) {
            // If the exercise exists, update it using its existing id
            await prisma.DayExercise.update({
              where: { id: existingExercise.id }, // Use the id of the existing exercise
              data: { name: exercise.name },
            });
          } else {
            // If the exercise doesn't exist, create a new one
            await AddExerciseToDay(exercise, existingDay.id);
          }
        }

        // Remove exercises that are no longer included in the day
        const exerciseIdsToKeep = day.exercises.map((ex) => ex.exerciseId);
        await prisma.DayExercise.deleteMany({
          where: {
            dayId: existingDay.id,
            exerciseId: { notIn: exerciseIdsToKeep },
          },
        });
      }
    }

    // Handle adding new days
    for (const newDay of newDays) {
      // Add new day and its exercises
      const newDayCreated = await AddFitnessDay(newDay, fitnessPlanId);
      for (const exercise of newDay.exercises) {
        await AddExerciseToDay(exercise, newDayCreated.id);
      }
    }

    // Remove days that are no longer part of the fitness plan
    const dayNumbersToKeep = data.days
      .map((day) => day.dayNumber)
      .filter((dayNumber) => dayNumber !== undefined && dayNumber !== null);

    if (dayNumbersToKeep.length > 0) {
      // Remove days that are not included in the updated fitness plan
      await prisma.Day.deleteMany({
        where: {
          fitnessPlanId,
          dayNumber: { notIn: dayNumbersToKeep },
        },
      });
    }

    // return updatedFitnessPlan;
    success = true;
  } catch (error) {
    console.error("Error updating fitness plan:", error);
    throw new Error(`Failed to update fitness plan: ${error.message}`);
  }
  if (success) {
    redirect("/fitness");
  }
}

export async function setActiveFitnessPlan(planId) {
  let success = false;
  try {
    const updatedPlan = await prisma.FitnessPlan.updateMany({
      where: {
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });

    const newActivePlan = await prisma.FitnessPlan.update({
      where: {
        id: planId,
      },
      data: {
        isActive: true,
      },
    });

    success = true;
  } catch (error) {
    console.error("Error setting active fitness plan:", error);
    throw new Error("Failed to set active fitness plan.");
  }
  if (success) {
    redirect("/fitness");
  }
}

export async function setActiveNutritionPlan(planId) {
  let success = false;
  try {
    const updatedPlan = await prisma.mFNutrition.updateMany({
      where: {
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });

    const newActivePlan = await prisma.mFNutrition.update({
      where: {
        id: planId,
      },
      data: {
        isActive: true,
      },
    });

    success = true;
  } catch (error) {
    console.error("Error setting active nutrition plan:", error);
    throw new Error("Failed to set active nutrition plan.");
  }
  if (success) {
    redirect("/nutrition");
  }
}

export async function getNutritionPlanById(planId) {
  try {
    const plan = await prisma.mFNutrition.findUnique({
      where: {
        id: planId,
      },
    });

    return plan;
  } catch (error) {
    console.error("Error fetching nutrition plan by ID:", error);
    throw new Error("Could not fetch nutrition plan by ID.");
  }
}

export async function getFitnessPlanById(planId) {
  try {
    const plan = await prisma.FitnessPlan.findUnique({
      where: {
        id: planId,
      },
    });

    return plan;
  } catch (error) {
    console.error("Error fetching fitness plan by ID:", error);
    throw new Error("Could not fetch fitness plan by ID.");
  }
}

export async function updateNutritionPlan(planId, data) {
  let success = false;
  try {
    const updatedPlan = await prisma.mFNutrition.update({
      where: {
        id: planId,
      },
      data: {
        userId: data.userId,
        height: data.height,
        gender: data.gender,
        activityLevel: data.activityLevel,
        currentWeight: data.currentWeight,
        currentBodyFat: data.currentBodyFat,
        goalWeight: data.goalWeight,
        goalBodyFat: data.goalBodyFat,
        tdee: data.tdee,
        dailyCalories: data.dailyCalories,
        protein: data.protein,
        fat: data.fat,
        carbs: data.carbs,
        energyDelta: data.energyDelta,
        age: data.age,
      },
    });

    success = true;
  } catch (error) {
    console.error("Error updating nutrition plan:", error);
    throw new Error("Could not update nutrition plan.");
  }
  if (success) {
    redirect(`/nutrition/${planId}`);
  }
}

export async function getUserBodyMetricsByDate(userId, date) {
  const inputDate = new Date(date);
  const startOfDay = new Date(inputDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(inputDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  try {
    const metrics = await prisma.bodyMetric.findFirst({
      where: {
        userId: userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return metrics;
  } catch (error) {
    console.error("Error fetching body metrics by date:", error);
    throw new Error("Could not fetch body metrics by date.");
  }
}
