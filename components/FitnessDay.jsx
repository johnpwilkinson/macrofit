"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { Controller, useWatch } from "react-hook-form"; // Import Controller and useWatch
import { Input } from "./ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";
import { createId } from "@paralleldrive/cuid2";
export default function FitnessDay({
  day,
  control,
  index,
  key,
  removeExercise,
}) {
  const { attributes, listeners } = useDraggable({
    id: day.id,
  });

  return (
    <div className="relative inline-flex w-fit">
      <span className="absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 py-0 px-0 text-sm font-bold text-white shadow-lg">
        {day.dayNumber}
      </span>
      <Card className="w-56 h-52" key={key}>
        <CardHeader className="p-4 pb-0 pt-0">
          <CardTitle>
            <Controller
              name={`days.${index}.name`} // Use index here
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Name"
                  value={field.value || ""} // Ensure form state's value persists
                  className="rounded-none bg-transparent p-1 pb-0 focus-visible:ring-0 focus:ring-none focus:outline-none border border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent placeholder:text-red-500 px-0"
                  onBlur={field.onBlur} // Automatically tracks blur
                  // onMouseDown={(e) => e.stopPropagation()}
                  // onFocus={(e) => e.target.focus()}
                  // onMouseDown={(e) => e.stopPropagation()} // Prevent drag activation on input click
                />
              )}
            />
          </CardTitle>
          <CardDescription className="sr-only">
            Fitness Day Card
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 cursor-grab">
          <div>
            <div
              {...listeners} // Drag only activates here
              {...attributes}
            >
              drag
            </div>
            <ScrollArea className="h-36">
              {day.exercises.map((exercise, dayIndex) => (
                <div key={createId()}>
                  <ExerciseItem
                    exercise={exercise}
                    removeExercise={removeExercise}
                    dayIndex={index}
                  />
                </div>
              ))}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExerciseItem({ exercise, removeExercise, dayIndex }) {
  return (
    <div
      className="flex items-center space-x-1"
      onMouseDown={(e) => e.stopPropagation()} // Prevent drag activation
    >
      <div className="text-sm truncate">{exercise.name}</div>
      <div>
        <X
          className="h-3 w-3 text-red-500"
          onClick={() => removeExercise(dayIndex, exercise.exerciseId)}
        />
      </div>
    </div>
  );
}
