"use client";
import { Children, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { DevTool } from "@hookform/devtools";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { useDialogClose } from "./Modal";
import { Hammer, Minus, Plus, X } from "lucide-react";
import { PlusIcon } from "@radix-ui/react-icons";
import FitnessDay from "./FitnessDay";
import Cmdk from "./Cmdk";
import FitnessDays from "./FitnessDays";
import FitnessPlanMetrics from "./FitnessPlanMetrics";
import { createId } from "@paralleldrive/cuid2";
import { addFitnessPlan, updateFitnessPlan } from "@/app/lib/actions";
import { Switch } from "@/components/ui/switch";
import { exercises } from "@/app/lib/constants";

const inputStyle =
  "block w-full rounded-br-none text-right rounded-bl-none border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent focus-visible:ring-0 focus:ring-none focus:outline-none text-2xl p-0 px-0  placeholder-transparent box-border";
const labelStyle =
  "mb-0 whitespace-nowrap prose font-black text-primary text-2xl";
const FitnessPlanSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please enter a name for your fitness plan." }),
  daysPerWeek: z.enum(["1", "2", "3", "4", "5", "6", "7"], {
    required_error: "Please select your workout frequency.",
  }),

  days: z
    .array(
      z.object({
        dayNumber: z
          .number()
          .min(1, { message: "Day number must be a positive integer." }),
        name: z
          .string()
          .min(1, { message: "Please enter a name for each day." }),
        exercises: z
          .array(
            z.object({
              exerciseId: z
                .string()
                .min(1, { message: "Exercise ID must be provided." }),
              name: z
                .string()
                .min(1, { message: "Please enter a name for each day." }),
              // sets: z
              //   .number()
              //   .min(1, { message: "Sets must be a positive number." }),
              // reps: z
              //   .number()
              //   .min(1, { message: "Reps must be a positive number." }),
            })
          )
          .optional(), // Users can optionally add exercises now or later
      })
    )
    .optional(), // Allow users to define days later
});

const FormFrame = ({ label, children, style }) => {
  return (
    <div className="flex flex-col">
      <div className={style}>{label}</div>
      <div>{children}</div>
    </div>
  );
};
// const exerciseOptions = [
//   { label: "Squat", value: "en", part: "push", type: "legs" },
//   { label: "pull-up", value: "fr", part: "pull", type: "arms" },
//   { label: "leg curl", value: "de", part: "pull", type: "legs" },
//   { label: "curls", value: "es", part: "pull", type: "arms" },
//   { label: "benchpress", value: "pt", part: "push", type: "chest" },
//   { label: "incline press", value: "ru", part: "push", type: "chest" },
//   { label: "chest fly", value: "ja", part: "push", type: "chest" },
//   { label: "back fly", value: "ko", part: "push", type: "back" },
//   { label: "back ext", value: "zh", part: "push", type: "back" },
// ];
export default function FitnessForm({ userId, userData }) {
  const closeDialog = useDialogClose();
  const [step, setStep] = useState(1);

  const fitnessPlanForm = useForm({
    resolver: zodResolver(FitnessPlanSchema),
    defaultValues: {
      name: "",
      daysPerWeek: "1",
      days: [],
    },
  });
  const { control, watch, reset } = fitnessPlanForm;
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "days",
  });
  useEffect(() => {
    if (userData) {
      const formattedData = {
        name: userData.name,
        daysPerWeek: String(userData.daysPerWeek),
        days: userData.days.map((day) => ({
          name: day.name,
          dayNumber: day.dayNumber,
          id: day.id,
          exercises: day.dayExercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            name: exercise.name,
            dayId: exercise.dayId,
            category: exercise.exercise.category,
            equipment: exercise.exercise.equipment,
            force: exercise.exercise.force,
            level: exercise.exercise.level,
            mechanic: exercise.exercise.mechanic,
            primaryMuscles: exercise.exercise.primaryMuscles,
            secondaryMuscles: exercise.exercise.secondaryMuscles,
          })),
        })),
      };
      reset(formattedData);
    }
  }, [userData]);

  function onSubmit(data) {
    const id = userId;
    data.daysPerWeek = fields.length;
    data.userId = userId;

    if (userData) {
      updateFitnessPlan(userData.id, data);
    } else {
      addFitnessPlan(data);
    }
    // if (step === 2) {
    //   // Only execute save logic if `isSaving` is true
    //   const myData = FitnessPlanSchema.getValues();
    //   try {
    //     // const validatedData = FitnessPlanSchema.parse(myData);
    //     // validatedData.userId = id;

    //     // console.log("VALIDATED DATA", validatedData);
    //     // await FitnessPlanSchema(validatedData);

    //     toast({
    //       title: "Fitness plan added successfully!",
    //       description: (
    //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //           <code className="text-white">
    //             {JSON.stringify(validatedData, null, 2)}
    //           </code>
    //         </pre>
    //       ),
    //     });
    //     closeDialog();
    //   } catch (error) {
    //     toast({
    //       title: "Error adding fitness plan",
    //       description: error.message,
    //     });
    //     console.log(error.message);
    //   }
    // }
  }

  function onError(errors) {
    console.log("Validation errors:", errors);
  }
  const handleDelete = (index) => {
    remove(index);
  };

  const addExerciseToDay = (index, selectedExercise) => {
    const currentDay = fitnessPlanForm.getValues(`days.${index}`);

    const exerciseToAdd = {
      exerciseId: selectedExercise.id, // Set the exerciseId using the id from selectedExercise
      name: selectedExercise.name, // Set the name using the name from selectedExercise
      ...selectedExercise, // Spread the rest of the properties from selectedExercise
    };
    // Preserve the day properties, but only modify the exercises array
    const updatedDay = {
      ...currentDay,
      exercises: [...currentDay.exercises, exerciseToAdd],
    };

    // Update only the exercises for that specific day, keeping the name intact
    fitnessPlanForm.setValue(`days.${index}`, updatedDay);
  };

  const removeExerciseFromDay = (dayIndex, exerciseId) => {
    const currentDay = fitnessPlanForm.getValues(`days.${dayIndex}`);
    const updatedDay = {
      ...currentDay,
      exercises: currentDay.exercises.filter(
        (exercise) => exercise.exerciseId !== exerciseId
      ),
    };
    fitnessPlanForm.setValue(`days.${dayIndex}`, updatedDay);
  };

  return (
    <Form {...fitnessPlanForm}>
      <form onSubmit={fitnessPlanForm.handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col w-full space-y-4 ">
          <div className="flex justify-between space-x-4 ">
            <Controller
              name={`name`} // Use index here
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Plan Name"
                  value={field.value || ""} // Ensure form state's value persists
                  className="rounded-none text-xl bg-transparent p-1 pb-0 focus-visible:ring-0 focus:ring-none focus:outline-none border border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent placeholder:text-red-500 px-0"
                  onBlur={field.onBlur} // Automatically tracks blur
                />
              )}
            />
          </div>
          <FitnessPlanMetrics
            fitnessPlanData={fitnessPlanForm.watch("days")}
            planName={fitnessPlanForm.watch("name")}
          />
          <FitnessDays
            days={fitnessPlanForm.watch("days")}
            name={fitnessPlanForm.watch("days.name")}
            control={control} // Pass control here
            setValue={fitnessPlanForm.setValue} // Pass setValue here
            addDay={() =>
              append({
                name: "",
                dayNumber: fitnessPlanForm.watch("days").length + 1,
                exercises: [],
                id: createId(),
              })
            }
            removeExercise={removeExerciseFromDay}
          />
          <Cmdk
            addExerciseToDay={addExerciseToDay}
            days={fitnessPlanForm.watch("days")}
          />
        </div>
        {/* <div className="flex flex-col w-full space-x-4 ">
          <div className="flex justify-between space-x-4 ">
            <FormField
              control={fitnessPlanForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-2 ">
                  <FormLabel className={labelStyle}>Plan Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder=""
                      className={inputStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="sr-only">
                    Name of your fitness plan
                  </FormDescription>
                </FormItem>
              )}
            />

            <div>{fields.length}</div>
            <Plus
              className="h-6 w-6"
              onClick={() =>
                append({
                  name: "",
                  exercises: [{ exerciseId: "", sets: "", reps: "" }],
                })
              }
            />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {fields.map((field, index) => (
              <AccordionItem value={`day-${index}`} key={field.id}>
                <AccordionTrigger>
                  {fitnessPlanForm.watch(`days[${index}].name`) ||
                    `Day ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={fitnessPlanForm.control}
                    name={`days[${index}].name`}
                    render={({ field }) => (
                      <FormItem className="flex items-end space-x-2 ">
                        <FormLabel className={labelStyle}>Day Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder=""
                            className={inputStyle}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription className="sr-only">
                          Name of your day
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <ExerciseFields index={index} control={control} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div> */}

        <div className="flex">
          <div
            className={`flex justify-center mt-6 w-1/2 border border-primary border-t-0 border-l-0 border-r-0 ${
              step === 2 ? "border-b-0" : ""
            }`}
          >
            <Button
              className="w-full text-2xl rounded-none hover:bg-primary hover:text-primary-foreground"
              variant="ghost"
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </Form>
  );
}

const ExerciseFields = ({ index, control }) => {
  const {
    fields: exerciseFields,
    append: appendExercise,
    remove: removeExercise,
  } = useFieldArray({
    control,
    name: `days[${index}].exercises`,
  });

  return (
    <>
      <Button
        onClick={() => appendExercise({ exerciseId: "", sets: "", reps: "" })}
        variant="outline"
        type="button"
        className="mt-2"
      >
        Add Exercise
      </Button>
      {exerciseFields.map((exercise, exerciseIndex) => (
        <FormField
          control={control}
          name={`days[${index}].exercises[${exerciseIndex}].exerciseId`}
          key={exercise.id}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex justify-between">
                <FormLabel className="sr-only">Exercise </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={`w-[200px] justify-between ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value
                          ? exerciseOptions.find(
                              (exerciseOption) =>
                                exerciseOption.value === field.value
                            )?.label
                          : "Select Exercise"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No exercise found.</CommandEmpty>
                        <CommandGroup>
                          {exerciseOptions.map((exercise) => (
                            <CommandItem
                              key={exercise.value}
                              onSelect={() => {
                                field.onChange(exercise.value);
                              }}
                            >
                              {exercise.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />

                <Button
                  onClick={() => removeExercise(exerciseIndex)}
                  variant="outline"
                  type="button"
                  className="mt-2"
                >
                  Remove Exercise
                </Button>
              </div>
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

// // {/* <div className="w-1/2 flex flex-col text-xl space-y-4">
// //               <div className="space-y-4 text-lg">
// //                 <p className="text-primary font-medium">
// //                   <span className="font-bold">
// //                     Fill out personal information
// //                   </span>{" "}
// //                   to get started.
// //                 </p>
// //                 <p className="text-primary font-thin pl-4">
// //                   If you know your body fat percentage, enter it in the form to
// //                   the left. If not, estimate it using the{" "}
// //                   <span className="font-bold">body fat calculator</span>.
// //                 </p>
// //                 <p className="text-primary font-thin pl-4">
// //                   Smart scales, DEXA scans, calipers, or the calculator... The
// //                   method doesn't matter, what's{" "}
// //                   <span className="font-semibold">
// //                     important is using the same method consistently.
// //                   </span>
// //                 </p>
// //                 <p className="text-primary font-light pl-4">
// //                   Tracking trends helps us optimize your plan over time.
// //                 </p>
// //               </div> */}

// {
//   /* <FormField
//                 control={fitnessPlanForm.control}
//                 name="daysPerWeek"
//                 render={({ field }) => (
//                   <FormItem className="flex items-end space-x-2">
//                     <FormLabel className={`${labelStyle}`}>
//                       Days per week
//                     </FormLabel>
//                     <Select
//                       onValueChange={(value) => {
//                         field.onChange(value);

//                         // handleDaysChange(value); // Call your handler here
//                       }}
//                       value={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger
//                           className={`${inputStyle} w-full flex justify-end items-center focus:ring-0 focus-visible:ring-0`}
//                         >
//                           <SelectValue
//                             placeholder=""
//                             className="flex-grow text-right"
//                           />
//                         </SelectTrigger>
//                       </FormControl>

//                       <SelectContent
//                         contentClassName="min-w-[--radix-select-trigger-width] border-primary rounded-none"
//                         viewportClassName="bg-background"
//                       >
//                         {["1", "2", "3", "4", "5", "6", "7"].map((day) => (
//                           <SelectItem
//                             key={day}
//                             className="text-xl rounded-none focus:bg-primary focus:text-background"
//                             value={day}
//                           >
//                             {day}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormDescription className="sr-only">
//                       Select the number of workout days per week
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               /> */
// }
// {
//   /* Display entered workout days in real-time */
// }
// {
//   /* {fitnessPlanForm.watch("days")?.map((day, index) => (
//               <div key={index} className="text-lg text-primary">
//                 {`Day ${index + 1} - ${day.name || ""}`}{" "}
//                </div>
//             ))} */
// }
// // {
//   /* <FormField
//               control={fitnessPlanForm.control}
//               name="days"
//               render={({ field }) => (
//                 <FormItem className="flex items-end space-x-2">
//                   <FormLabel className={`${labelStyle}`}>
//                     Days per week
//                   </FormLabel>
//                   <Select
//                     onValueChange={(value) => {
//                       field.onChange(value);
//                       handleDaysChange(value); // Call your handler here
//                     }}
//                     value={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger
//                         className={`${inputStyle} w-full flex justify-end items-center focus:ring-0 focus-visible:ring-0`}
//                       >
//                         <SelectValue
//                           placeholder=""
//                           className="flex-grow text-right"
//                         />
//                       </SelectTrigger>
//                     </FormControl>

//                     <SelectContent
//                       contentClassName="min-w-[--radix-select-trigger-width] border-primary rounded-none"
//                       viewportClassName="bg-background"
//                     >
//                       {fitnessPlanForm.watch("days").map((day) => (
//                         <SelectItem
//                           key={day.number}
//                           className="text-xl rounded-none focus:bg-primary focus:text-background"
//                           value={day.number}
//                         >
//                           {day.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormDescription className="sr-only">
//                     Select the number of workout days per week
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */
// }
// {
//   /* {fitnessPlanForm.watch("daysPerWeek") &&
//               Array.from({
//                 length: parseInt(fitnessPlanForm.watch("daysPerWeek")),
//               }).map((_, index) => (
//                 <div>Day: {fitnessPlanForm.watch(`days[${index}].name`)}</div>
//               ))} */
// }
// {
//   /* <div>Day: {fitnessPlanForm.watch("days[0].name")}</div>
//             <div>Day: {fitnessPlanForm.watch("days[1].name")}</div>
//             <div>Day: {fitnessPlanForm.watch("days[2].name")}</div>
//             <div>Day: {fitnessPlanForm.watch("days[3].name")}</div> */
// }
// {/* <>
//                     <FormField
//                       key={fields.id}
//                       control={fitnessPlanForm.control}
//                       name={`days[${index}].name`} // Adjusting name to be an array
//                       render={({ field }) => (
//                         <FormItem className="flex items-end space-x-2">
//                           <FormLabel className={`${labelStyle}`}>
//                             name:
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               type="text"
//                               placeholder={`Enter name for Day ${index + 1}`}
//                               className={inputStyle}
//                               {...field}
//                               onChange={(e) => {
//                                 // Update the value in the form state
//                                 field.onChange(e.target.value);
//                               }}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
// {field.exercises.map((exercise, exerciseIndex) => (
//   <div key={exerciseIndex}>
//     <FormField
//       key={fields.id}
//       control={fitnessPlanForm.control}
//       name={`days[${index}].exercises[${exerciseIndex}].exerciseId`} // Adjusting name to be an array
//       render={({ field }) => (
//         <FormItem className="flex items-end space-x-2">
//           <FormLabel className={`${labelStyle}`}>
//             Exercise ID:
//           </FormLabel>
//           <FormControl>
//             <Input
//               type="text"
//               placeholder={`Enter exercise ID`}
//               className={inputStyle}
//               {...field}
//               onChange={(e) => {
//                 // Update the value in the form state
//                 field.onChange(e.target.value);
//               }}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//                         />
//                       </div>
//                     ))} */}
//                   </>

//               ))}
