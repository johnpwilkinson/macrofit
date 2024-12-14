"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { CalendarIcon, Plus, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { addWorkout, updateWorkout } from "@/app/lib/actions";

const LogFitnessPerformanceSchema = z.object({
  date: z.date(),
  dayId: z.string(),
  notes: z.string().optional(),
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      workoutSets: z.array(
        z.object({
          setNumber: z.number().min(0),
          weight: z.number().min(0),
          reps: z.number().min(0),
        })
      ),
    })
  ),
});

export default function LogFitnessPerformanceForm({
  userId,
  isMetric,
  userFitnessDays,
  userWorkoutToEdit,
}) {
  console.log("JDIDDY", userFitnessDays);
  console.log("JDIDDY", userWorkoutToEdit);
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);

  const parseDate = (dateString) => {
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const initialDateString = pathname?.split("/")[2];
  const initialDate = parseDate(initialDateString);

  const form = useForm({
    resolver: zodResolver(LogFitnessPerformanceSchema),
    defaultValues: {
      date: initialDate,
      dayId: null,
      exercises: [],
    },
  });

  const { control, setValue, handleSubmit, watch, reset } = form;

  const { fields: exercisesFields, append: appendExercise } = useFieldArray({
    control,
    name: "exercises",
  });

  useEffect(() => {
    console.log("ray-i fired");
    if (userWorkoutToEdit) {
      console.log("ray-userWorkoutToEdit", userWorkoutToEdit);
      form.setValue("date", new Date(userWorkoutToEdit.date));
      form.setValue("dayId", userWorkoutToEdit.dayId);
      form.setValue("notes", userWorkoutToEdit.notes);
      form.setValue("exercises", userWorkoutToEdit.workoutExercises);
    }
    setIsLoading(false);
  }, [userWorkoutToEdit]);

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);

    // if (userWorkoutToEdit) {
    //   updateWorkout({ ...data, id: userWorkoutToEdit.id });
    // } else {
    //   addWorkout(data);
    // }
  };

  const currentDayId = watch("dayId");
  useEffect(() => {
    if (currentDayId) {
      const currentDay = userFitnessDays?.find(
        (day) => day.id === currentDayId
      );
      if (currentDay) {
        // Replace existing exercises with new ones
        form.setValue(
          "exercises",
          currentDay.dayExercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            workoutSets: [{ setNumber: 0, weight: 0, reps: 0 }], // Initialize with empty sets
          }))
        );
      }
    }
  }, [currentDayId]);

  const getExerciseName = (exerciseId, fallbackIndex) => {
    console.log("Current-ExerciseId from getExerciseName:", exerciseId);
    const currentDayId = watch("dayId");
    console.log("Current dayId from getExerciseName:", currentDayId);
    const currentDay = userFitnessDays?.find((day) => day.id === currentDayId);
    console.log("Current day from getExerciseName:", currentDay);
    const exercise = currentDay?.dayExercises?.find(
      (e) => e.exerciseId === exerciseId
    );
    console.log("Exercise from getExerciseName:", exercise);
    return exercise?.name || `Exercise ${fallbackIndex + 1}`;
  };
  useEffect(() => {
    console.log("Current dayId from watch:", watch("dayId"));
  }, [watch("dayId")]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-full ">
          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col sr-only">
                <FormLabel className="sr-only">Date</FormLabel>
                <Popover>
                  <PopoverTrigger disabled asChild>
                    <FormControl>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal disabled:opacity-100 justify-start px-0",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 " align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dayId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">Day</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userFitnessDays.map((day) => (
                      <SelectItem key={day.id} value={day.id}>
                        Day {day.dayNumber}: {day.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Accordion type="single" collapsible className="w-full">
          {exercisesFields.map((exercise, exerciseIndex) => (
            <AccordionItem key={exercise.id} value={exercise.id}>
              <AccordionTrigger>
                {getExerciseName(exercise.exerciseId, exerciseIndex)}
              </AccordionTrigger>
              <AccordionContent>
                <WorkoutSets
                  control={control}
                  exerciseIndex={exerciseIndex}
                  isMetric={isMetric}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {exercisesFields.length > 0 && (
          <FormField
            control={control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Workout notes"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add any notes about your workout
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit">
          {userWorkoutToEdit ? "Update Workout" : "Save Workout"}
        </Button>
      </form>
    </Form>
  );
}

function WorkoutSets({ control, exerciseIndex, isMetric }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.workoutSets`,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] border-r text-center">Set</TableHead>
          <TableHead className="w-[100px]  border-r text-center">
            Weight ({isMetric ? "kg" : "lbs"})
          </TableHead>
          <TableHead className="w-[100px]  border-r text-center">
            Reps
          </TableHead>
          <TableHead className="text-right border-b-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field, index) => (
          <TableRow
            key={field.id}
            className="data-[state=selected]:bg-transparent hover:bg-transparent"
          >
            <TableCell className="border-r p-0 text-center">
              {index + 1}
            </TableCell>
            <TableCell className="border-r p-0">
              <FormField
                control={control}
                name={`exercises.${exerciseIndex}.workoutSets.${index}.weight`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                        className="outline-none border-none focus-visible:ring-0 text-center text-[16px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell className="border-r p-0">
              <FormField
                control={control}
                name={`exercises.${exerciseIndex}.workoutSets.${index}.reps`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                        className="outline-none border-none focus-visible:ring-0 text-center text-[16px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell className="text-right p-0 space-x-2">
              <Button
                variant="outline"
                onClick={() => remove(index)}
                className="h-7 px-2 "
                size="sm"
              >
                <Minus className="h-4 w-4" />
              </Button>
              {index === fields.length - 1 && (
                <Button
                  variant="outline"
                  onClick={() =>
                    append({ setNumber: fields.length + 1, weight: 0, reps: 0 })
                  }
                  className="h-7 px-2 "
                  size="sm"
                >
                  <Plus className=" h-4 w-4" />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// return (
//   <Table>
//     <TableHeader>
//       <TableRow>
//         <TableHead className="w-[100px] border-r">Set</TableHead>
//         <TableHead className=" border-r">
//           Weight ({isMetric ? "kg" : "lbs"})
//         </TableHead>
//         <TableHead className=" border-r">Reps</TableHead>
//         <TableHead className="text-right">Actions</TableHead>
//       </TableRow>
//     </TableHeader>
//     <TableBody>
//       {fields.map((field, index) => (
//         <TableRow key={field.id}>
//           <TableCell>{index + 1}</TableCell>
//           <TableCell>
//             <FormField
//               control={control}
//               name={`exercises.${exerciseIndex}.workoutSets.${index}.weight`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       {...field}
//                       onChange={(e) =>
//                         field.onChange(parseFloat(e.target.value) || 0)
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </TableCell>
//           <TableCell>
//             <FormField
//               control={control}
//               name={`exercises.${exerciseIndex}.workoutSets.${index}.reps`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       {...field}
//                       onChange={(e) =>
//                         field.onChange(parseInt(e.target.value) || 0)
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </TableCell>
//           <TableCell className="text-right">
//             <Button
//               variant="outline"
//               onClick={() => remove(index)}
//               className="w-8 p-0"
//             >
//               <Minus className="h-4 w-4" />
//             </Button>
//           </TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//     <Button
//       type="button"
//       variant="outline"
//       onClick={() =>
//         append({ setNumber: fields.length + 1, weight: 0, reps: 0 })
//       }
//       className="w-full mt-2"
//     >
//       <Plus className="mr-2 h-4 w-4" />
//       Add Set
//     </Button>
//   </Table>
// );
