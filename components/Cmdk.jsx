"use client";
import { Command } from "cmdk";
import React from "react";
import { exercises, muscleGroups } from "../app/lib/constants";
import Filters from "./Filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ExerciseDetail from "./ExerciseDetail";
export default function Cmdk({ addExerciseToDay, days }) {
  const [selectedExercise, setSelectedExercise] = React.useState(exercises[0]);
  const [allExercises, setAllExercises] = React.useState(exercises);

  const [filterLevel, setFilterLevel] = React.useState("all");
  const [filterForce, setFilterForce] = React.useState("all");
  const [filterMechanic, setFilterMechanic] = React.useState("all");
  const [filterPrimaryMuscle, setFilterPrimaryMuscle] = React.useState("all");
  const [filterSecondaryMuscle, setFilterSecondaryMuscle] =
    React.useState("all");
  const [filterEquipment, setFilterEquipment] = React.useState("all");

  const filteredExercises = allExercises.filter((exercise) => {
    return (
      (filterLevel === "all" || exercise.level === filterLevel) &&
      (filterForce === "all" || exercise.force === filterForce) &&
      (filterMechanic === "all" || exercise.mechanic === filterMechanic) &&
      (filterPrimaryMuscle === "all" ||
        exercise.primaryMuscles.includes(filterPrimaryMuscle)) &&
      (filterSecondaryMuscle === "all" ||
        exercise.secondaryMuscles.includes(filterSecondaryMuscle)) &&
      (filterEquipment === "all" || exercise.equipment === filterEquipment)
    );
  });

  // const [selectedDay, setSelectedDay] = React.useState(0); // Store the day to add exercise to

  // const [filters, setFilters] = React.useState({
  //   force: { push: true, pull: true },
  //   level: { beginner: true, intermediate: true, advanced: true },
  //   mechanic: { compound: true, isolation: true },
  //   equipment: { barbell: true, machine: true },
  //   primaryMuscles: {
  //     chest: true,
  //     back: true,
  //     legs: true,
  //     shoulders: true,
  //     biceps: true,
  //     triceps: true,
  //     abs: true,
  //   },
  //   secondaryMuscles: {
  //     chest: true,
  //     back: true,
  //     legs: true,
  //     shoulders: true,
  //     biceps: true,
  //     triceps: true,
  //     abs: true,
  //   },
  //   category: { strength: true, stretching: true, endurance: true },
  // });

  // const filteredExercises = allExercises.filter((exercise) => {
  //   const isForceMatch =
  //     filters.force[exercise.force] !== undefined
  //       ? filters.force[exercise.force]
  //       : true;
  //   const isLevelMatch =
  //     filters.level[exercise.level] !== undefined
  //       ? filters.level[exercise.level]
  //       : true;
  //   const isMechanicMatch =
  //     filters.mechanic[exercise.mechanic] !== undefined
  //       ? filters.mechanic[exercise.mechanic]
  //       : true;
  //   const isEquipmentMatch =
  //     filters.equipment[exercise.equipment] !== undefined
  //       ? filters.equipment[exercise.equipment]
  //       : true;
  //   const isCategoryMatch =
  //     filters.category[exercise.category] !== undefined
  //       ? filters.category[exercise.category]
  //       : true;

  //   // Allow exercises without secondary muscles by checking if the array exists and isn't empty
  //   const isPrimaryMusclesMatch = exercise.primaryMuscles.some((muscle) =>
  //     filters.primaryMuscles[muscle] !== undefined
  //       ? filters.primaryMuscles[muscle]
  //       : true
  //   );
  //   const isSecondaryMusclesMatch =
  //     exercise.secondaryMuscles.length === 0 ||
  //     exercise.secondaryMuscles.some((muscle) =>
  //       filters.secondaryMuscles[muscle] !== undefined
  //         ? filters.secondaryMuscles[muscle]
  //         : true
  //     );

  //   return (
  //     isForceMatch &&
  //     isLevelMatch &&
  //     isMechanicMatch &&
  //     isEquipmentMatch &&
  //     isPrimaryMusclesMatch &&
  //     isSecondaryMusclesMatch &&
  //     isCategoryMatch
  //   );
  // });

  const handleAddExercise = (dayId) => {
    // Find the day index based on dayId
    const dayIndex = days.findIndex((day) => day.id === dayId);

    if (dayIndex !== -1 && selectedExercise) {
      addExerciseToDay(dayIndex, selectedExercise);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow">
      <Command value={selectedExercise.value} onValueChange={(v) => {}}>
        <div className="flex items-center gap-2 h-fit px-2 border-b border-b-1 mb-2">
          <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          <Command.Input
            autoFocus
            placeholder="Find exercises..."
            // className="w-full text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent text-base outline-none"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 outline-none ring-0 border-none"
          />
        </div>
        <Command.List>
          <div className="flex flex-col min-h-[308px]">
            <div className="flex">
              <div className="flex flex-col w-[300px]">
                <div className="text-sm font-semibold pl-2 h-14">
                  Exercises {filteredExercises.length}
                </div>
                <div className="w-[300px]">
                  <ScrollArea className="h-96">
                    <Command.Group>
                      {filteredExercises.map((exercise) => (
                        <Item
                          key={exercise.id}
                          value={exercise.name}
                          subtitle={exercise.level}
                          selectedExercise={selectedExercise}
                          onSelect={() => setSelectedExercise(exercise)}
                        >
                          <ButtonIcon />
                        </Item>
                      ))}
                    </Command.Group>
                    <ScrollBar orientation="vertical" className="p-0" />
                  </ScrollArea>
                  {/* </div> */}
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="flex px-2 space-x-2">
                  <Filters
                    categoryName={"experience"}
                    value={filterLevel}
                    width="w-[120px]"
                    setFilter={setFilterLevel}
                    options={[
                      { name: "all", value: "all" },
                      { name: "beginner", value: "beginner" },
                      { name: "intermediate", value: "intermediate" },
                      { name: "expert", value: "expert" },
                    ]}
                  />
                  <Filters
                    categoryName={"force"}
                    value={filterForce}
                    width="w-[75px]"
                    setFilter={setFilterForce}
                    options={[
                      { name: "all", value: "all" },
                      { name: "push", value: "push" },
                      { name: "pull", value: "pull" },
                      { name: "static", value: "static" },
                      { name: "other", value: null },
                    ]}
                  />
                  <Filters
                    categoryName={"mechanic"}
                    value={filterMechanic}
                    width="w-[108px]"
                    setFilter={setFilterMechanic}
                    options={[
                      { name: "all", value: "all" },
                      { name: "compound", value: "compound" },
                      { name: "isolation", value: "isolation" },

                      { name: "other", value: null },
                    ]}
                  />
                  <Filters
                    categoryName={"primary Muscle"}
                    value={filterPrimaryMuscle}
                    width="w-[138px]"
                    setFilter={setFilterPrimaryMuscle}
                    options={muscleGroups}
                  />
                  <Filters
                    categoryName={"secondary Muscle"}
                    value={filterSecondaryMuscle}
                    width="w-[155px]"
                    setFilter={setFilterSecondaryMuscle}
                    options={muscleGroups}
                  />
                  <Filters
                    categoryName={"equipment"}
                    value={filterEquipment}
                    width="w-[120px]"
                    setFilter={setFilterEquipment}
                    options={[
                      { name: "all", value: "all" },
                      { name: "bands", value: "bands" },
                      { name: "barbell", value: "barbell" },
                      { name: "body only", value: "body only" },
                      { name: "cable", value: "cable" },
                      { name: "dumbbell", value: "dumbbell" },
                      { name: "e-z curl bar", value: "e-z curl bar" },
                      { name: "exercise ball", value: "exercise ball" },
                      { name: "foam roll", value: "foam roll" },
                      { name: "kettlebells", value: "kettlebells" },
                      { name: "machine", value: "machine" },
                      { name: "medicine ball", value: "medicine ball" },
                      { name: "none", value: null },
                      { name: "other", value: "other" },
                    ]}
                  />
                </div>
                <ExerciseDetail
                  exercise={selectedExercise}
                  addExercise={
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-green-500 text-green-500"
                        >
                          add exercise
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="rounded-xl w-fit space-y-2"
                        side="left"
                      >
                        <div>add exercise</div>
                        <ToggleGroup type="single" orientation="vertical">
                          {days.map((day, index) => (
                            <ToggleGroupItem
                              key={day.id}
                              value={day.id}
                              aria-label={`Add to ${day.name}`}
                              onClick={() => {
                                addExerciseToDay(index, selectedExercise);
                              }}
                            >
                              Day {day.dayNumber} {day.name}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </PopoverContent>
                    </Popover>
                  }
                />
              </div>
            </div>
          </div>
        </Command.List>
      </Command>
    </div>
  );
}

function Item({ children, value, subtitle, onSelect, selectedExercise }) {
  return (
    <div className={`flex flex-col  `}>
      <Command.Item
        value={value}
        onSelect={onSelect}
        className={`flex items-center gap-3 p-2   cursor-pointer text-primary dark:text-primary font-medium text-sm transition duration-150 ease-in-out hover:bg-blue-500 dark:hover:bg-accent ${
          value === selectedExercise.name
            ? "bg-background/80 dark:bg-accent/20"
            : ""
        }`}
      >
        {/* <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-md">
          {children}
        </div> */}
        <div className="flex flex-col gap-1">
          {value}
          <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
            {subtitle}
          </span>
        </div>
      </Command.Item>
      <Separator className=" " />
    </div>
  );
}

// Sample icon component
function ButtonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* SVG path data */}
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}
