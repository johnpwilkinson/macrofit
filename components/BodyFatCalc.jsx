"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calculator } from "@phosphor-icons/react";
import { useState } from "react";
import { useDialogClose } from "./Modal"; // Adjust this import based on your structure

const calculateBf = (gender, weight, waist) => {
  if (gender === "Male") {
    return ((4.15 * waist - 0.082 * weight - 98.42) / weight) * 100;
  } else if (gender === "Female") {
    return ((4.15 * waist - 0.082 * weight - 76.76) / weight) * 100;
  }
  return 0; // Return 0 if gender is not recognized
};

export default function BodyFatCalc({ gender, nutritionPlanForm }) {
  const closeDialog = useDialogClose(); // Hook to close the dialog
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");

  const handleCalculate = () => {
    const bodyFat = calculateBf(gender, parseFloat(weight), parseFloat(waist));
    nutritionPlanForm.setValue("currentBodyFat", bodyFat.toFixed(2)); // Set calculated body fat to the form
    // closeDialog(); // Close the popover
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Calculator
          className="text-primary items-center justify-center"
          weight="thin"
          size={24}
        />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Body Fat Calculator</h4>
            <p className="text-sm text-muted-foreground">
              Compute Body Fat Percentage
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                value={gender || ""}
                className="col-span-2 h-8"
                disabled
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="col-span-2 h-8"
                placeholder="Enter your weight"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="waist">Waist (inches)</Label>
              <Input
                id="waist"
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="col-span-2 h-8"
                placeholder="Enter your waist measurement"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCalculate}>Calculate Body Fat</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
