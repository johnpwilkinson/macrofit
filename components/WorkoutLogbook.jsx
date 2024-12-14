"use client";
import React from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
export default function WorkoutLogbook({ workoutLogs, isMetric }) {
  // Flatten all workout exercises
  const allExercises = workoutLogs.flatMap((log) => log.workoutExercises);

  // Find the maximum number of sets in any exercise
  const maxSets = Math.max(
    ...allExercises.map((exerciseObj) => exerciseObj.workoutSets.length)
  );

  // Generate headers for each set
  const setHeaders = Array.from({ length: maxSets }, (_, index) => (
    <TableHead
      key={`setHeader-${index}`}
      colSpan={2}
      className="border text-center"
    >
      Set {index + 1}
    </TableHead>
  ));

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Table className="  mx-auto">
        <TableCaption className="sr-only">
          A summary of your workout exercises.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border"></TableHead>
            {setHeaders}
          </TableRow>
          <TableRow>
            <TableHead className="border">Exercise</TableHead>
            {Array.from({ length: maxSets }).flatMap((_, index) => [
              <TableHead
                key={`repsHeader-${index}`}
                className="border text-center max-w-[100px]"
              >
                Reps
              </TableHead>,
              <TableHead
                key={`weightHeader-${index}`}
                className="border text-center max-w-fit whitespace-nowrap"
              >
                Weight ({isMetric ? "kg" : "lbs"})
              </TableHead>,
            ])}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allExercises.map((exerciseObj, index) => (
            <TableRow key={`exercise-${index}`}>
              <TableCell className="border w-64">
                {exerciseObj.exercise.name}
              </TableCell>
              {Array.from({ length: maxSets }).map((_, setIndex) => {
                const set = exerciseObj.workoutSets[setIndex];
                return set ? (
                  <React.Fragment key={`set-${index}-${setIndex}`}>
                    <TableCell
                      key={`reps-${setIndex}`}
                      className="border text-center"
                    >
                      {set.reps}
                    </TableCell>
                    <TableCell
                      key={`weight-${setIndex}`}
                      className="border text-center"
                    >
                      {set.weight || "-"}
                    </TableCell>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={`empty-set-${index}-${setIndex}`}>
                    <TableCell
                      key={`reps-empty-${setIndex}`}
                      className="border text-center"
                    >
                      -
                    </TableCell>
                    <TableCell
                      key={`weight-empty-${setIndex}`}
                      className="border text-center"
                    >
                      -
                    </TableCell>
                  </React.Fragment>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="">
        <div className="text-primary">
          <h1 className="  font-bold">Notes</h1>
          <p>{workoutLogs.notes || "No notes"}</p>
        </div>
      </div>
    </div>
  );
}
