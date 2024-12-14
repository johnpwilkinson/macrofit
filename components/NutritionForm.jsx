"use client";
import { Children, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { addNutritionPlan, updateNutritionPlan } from "@/app/lib/actions";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
import { Input } from "./ui/input";
import Intensity from "./Intensity";
import { calculateBmrAndTdee, computeInitialMacros } from "@/app/lib/helpers";
import { useDialogClose } from "./Modal";
import { Lightning } from "@phosphor-icons/react";
import BodyFatCalc from "./BodyFatCalc";
const NutritionPlanSchema = z.object({
  age: z.coerce.number().min(0, { message: "Age must be a positive number" }),
  height: z.coerce
    .number()
    .min(0, { message: "Height must be a positive number" }),
  gender: z.enum(["Male", "Female"], {
    required_error: "Please select your gender.",
  }),
  activityLevel: z.enum(["Low", "Moderate", "High"], {
    required_error: "Please select your activity level.",
  }),
  currentWeight: z.coerce
    .number()
    .min(0, { message: "Weight must be a positive number" }),
  currentBodyFat: z.coerce
    .number()
    .min(0)
    .max(100, { message: "Body fat percentage must be between 0 and 100" }),
  goalWeight: z.coerce
    .number()
    .min(0, { message: "Goal weight must be a positive number" }),
  goalBodyFat: z.coerce.number().min(0).max(100, {
    message: "Goal body fat percentage must be between 0 and 100",
  }),
  dailyCalories: z.coerce
    .number()
    .min(0, { message: "Daily calories must be a positive number" }),
  energyDelta: z.coerce
    .number()
    .min(0, { message: "Energy delta must be a positive number" }),
  tdee: z.coerce.number().min(0, { message: "TDEE must be a positive number" }),
  protein: z.coerce
    .number()
    .min(0, { message: "Protein must be a positive number" }),
  fat: z.coerce.number().min(0, { message: "Fat must be a positive number" }),
  carbs: z.coerce
    .number()
    .min(0, { message: "Carbs must be a positive number" }),
});

const FormFrame = ({ label, children, style }) => {
  return (
    <div className="flex flex-col">
      <div className={style}>{label}</div>
      <div>{children}</div>
    </div>
  );
};

export default function NutritionForm({ userId, userData }) {
  const closeDialog = useDialogClose();
  const [step, setStep] = useState(1);
  const [intensity, setIntensity] = useState("");

  const nutritionPlanForm = useForm({
    resolver: zodResolver(NutritionPlanSchema),
    defaultValues: userData || {
      age: 0,
      height: 0,
      gender: "",
      activityLevel: "",
      currentWeight: 0,
      currentBodyFat: 0,
      goalWeight: 0,
      goalBodyFat: 0,
      dailyCalories: 0,
      energyDelta: 0,
      tdee: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    },
  });
  function calculateMacros(form) {
    const { bmr, tdee } = calculateBmrAndTdee(
      form.getValues("age"),
      form.getValues("gender"),
      form.getValues("currentWeight"),
      "lbs",
      form.getValues("height"),
      "in",
      form.getValues("activityLevel")
    );

    form.setValue("tdee", tdee);

    form.setValue(
      "dailyCalories",
      form.getValues("tdee") - form.getValues("energyDelta")
    );

    const { protein, fat, carbs } = computeInitialMacros(
      form.getValues("goalWeight"),
      form.getValues("dailyCalories")
    );

    form.setValue("protein", protein);
    form.setValue("fat", fat);
    form.setValue("carbs", carbs);
    if (step === 1) {
      setStep(2);
    }
  }

  async function onSubmit(data) {
    const id = userId;

    if (step === 2) {
      // Only execute save logic if `isSaving` is true
      const myData = nutritionPlanForm.getValues();
      try {
        const validatedData = NutritionPlanSchema.parse(myData);
        validatedData.userId = id;

        if (userData) {
          updateNutritionPlan(userData.id, validatedData);
        } else {
          await addNutritionPlan(validatedData);
        }

        toast({
          title: "Nutrition plan added successfully!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(validatedData, null, 2)}
              </code>
            </pre>
          ),
        });
        closeDialog();
      } catch (error) {
        toast({
          title: "Error adding nutrition plan",
          description: error.message,
        });
        console.log(error.message);
      }
    }
  }

  function onError(errors) {
    console.log("Validation errors:", errors);
  }

  const handleIntensityChange = (value) => {
    setIntensity(value);
    const intensityValues = {
      moderate: 250,
      aggressive: 500,
      extreme: 1000,
    };
    nutritionPlanForm.setValue("energyDelta", intensityValues[value]);
    nutritionPlanForm.setValue(
      "dailyCalories",
      nutritionPlanForm.getValues("tdee") - intensityValues[value]
    );
    updateMacros();
  };

  const updateMacros = () => {
    const macros = computeInitialMacros(
      nutritionPlanForm.getValues("goalWeight"),
      nutritionPlanForm.getValues("dailyCalories")
    );

    nutritionPlanForm.setValue("protein", macros.protein);
    nutritionPlanForm.setValue("fat", macros.fat);
    nutritionPlanForm.setValue("carbs", macros.carbs);
  };

  const handleNumericInput = (e, field, maxLength) => {
    const isBodyFatField =
      field.name === "currentBodyFat" || field.name === "goalBodyFat";

    // Create a regex pattern based on whether the field allows decimals
    const numericPattern = isBodyFatField ? /[^0-9.]/g : /[^0-9]/g;

    // Replace non-numeric characters (or non-decimal characters for body fat fields) and limit the input length
    let value = e.target.value.replace(numericPattern, "");

    // Handle decimal point: limit to one decimal point
    if (isBodyFatField && (value.match(/\./g) || []).length > 1) {
      value = value.replace(/\.+$/, ""); // Remove additional decimal points
    }

    // Limit the length of the input based on the specified maxLength
    value = value.slice(0, maxLength);

    // Coerce to number and use a fallback to avoid NaN
    const numericValue = value ? parseFloat(value) : 0; // Default to 0 if the value is empty

    // Update the input value and call the field's onChange method with the coerced number
    e.target.value = value; // Update the visible input value
    field.onChange(numericValue); // Pass the coerced number to the form state
  };

  const inputStyle =
    "block w-full rounded-br-none text-right rounded-bl-none border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent focus-visible:ring-0 focus:ring-none focus:outline-none text-2xl p-0 px-0  placeholder-transparent box-border";
  const labelStyle =
    "mb-0 whitespace-nowrap prose font-black text-primary text-2xl";
  return (
    <Form {...nutritionPlanForm}>
      <form onSubmit={nutritionPlanForm.handleSubmit(onSubmit, onError)}>
        <div className="flex w-full space-x-4 ">
          <div className="w-1/2">
            <FormFrame label="Personal Info" style={labelStyle}>
              <>
                <FormField
                  control={nutritionPlanForm.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="flex items-end space-x-2 px-1">
                      <FormLabel className={`${labelStyle}`}>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder=""
                          className={inputStyle}
                          {...field}
                          onInput={(e) => handleNumericInput(e, field, 2)} // Limit to 3 digits
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="sr-only">
                        You can set your age
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={nutritionPlanForm.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="flex items-end space-x-2">
                      <FormLabel className={`${labelStyle}`}>Height</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder=""
                          className={inputStyle}
                          {...field}
                          onInput={(e) => handleNumericInput(e, field, 2)} // Limit to 3 digits
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="sr-only">
                        You can set your height
                      </FormDescription>
                    </FormItem>
                  )}
                />
                {/* </div> */}
                <FormField
                  control={nutritionPlanForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="flex items-end space-x-2">
                      <FormLabel className={`${labelStyle}`}>Gender</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                        className="w-full"
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`${inputStyle} w-full flex justify-end items-center focus:ring-0 focus-visible:ring-0`} // Changed to justify-end
                          >
                            <SelectValue
                              placeholder=""
                              className="flex-grow text-right" // Aligns the selected value to the right
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          contentClassName="min-w-[--radix-select-trigger-width] border-primary rounded-none" // Custom styles for .Content
                          viewportClassName=" bg-background"
                        >
                          <SelectItem
                            className="text-xl rounded-none focus:bg-primary focus:text-background"
                            value="Male"
                          >
                            Male
                          </SelectItem>
                          <SelectItem
                            className="text-xl rounded-none focus:bg-primary focus:text-background"
                            value="Female"
                          >
                            Female
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="sr-only">
                        You can manage your gender selection.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={nutritionPlanForm.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem className="flex items-end space-x-2">
                      <FormLabel className={`${labelStyle}`}>
                        Activity Level
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          nutritionPlanForm.setValue("activityLevel", value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            arrowleft={"true"}
                            className={`${inputStyle} w-full flex justify-end items-center focus:ring-0 focus-visible:ring-0`}
                          >
                            <SelectValue
                              placeholder=""
                              className="flex-grow text-right"
                            />
                          </SelectTrigger>
                        </FormControl>

                        {/* Now pass custom classes for content and viewport */}
                        <SelectContent
                          contentClassName="min-w-[--radix-select-trigger-width] border-primary rounded-none" // Custom styles for .Content
                          viewportClassName=" bg-background" // Custom styles for .Viewport
                        >
                          <SelectItem
                            className="text-xl rounded-none focus:bg-primary focus:text-background"
                            value="Low"
                          >
                            Low
                          </SelectItem>
                          <SelectItem
                            className="text-xl rounded-none focus:bg-primary focus:text-background"
                            value="Moderate"
                          >
                            Moderate
                          </SelectItem>
                          <SelectItem
                            className="text-xl rounded-none focus:bg-primary focus:text-background"
                            value="High"
                          >
                            High
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="sr-only">
                        Select activity level
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={nutritionPlanForm.control}
                  name="currentWeight"
                  render={({ field }) => (
                    <FormItem className="flex items-end space-x-2">
                      <FormLabel className={`${labelStyle}`}>
                        Current Weight
                      </FormLabel>{" "}
                      {/* Ensure no bottom margin */}
                      <FormControl>
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          className={`${inputStyle}  `}
                          onInput={(e) => handleNumericInput(e, field, 3)} // Limit to 4 digits
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="sr-only">
                        You can set current weight
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={nutritionPlanForm.control}
                  name="goalWeight"
                  render={({ field }) => (
                    <FormItem className="flex items-end space-x-2">
                      <FormLabel className={`${labelStyle}`}>
                        Goal Weight
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          className={`${inputStyle} `}
                          onInput={(e) => handleNumericInput(e, field, 3)} // Limit to 4 digits
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="sr-only">
                        You can set goal weight
                      </FormDescription>
                    </FormItem>
                  )}
                />
                {/* <div className="flex items-center space-x-2"> */}
                <FormField
                  control={nutritionPlanForm.control}
                  name="currentBodyFat"
                  render={({ field }) => (
                    <FormItem className="flex items-end space-x-2">
                      <FormLabel className={`${labelStyle}`}>
                        Current Body Fat %
                      </FormLabel>
                      <div className="flex items-center   ">
                        <BodyFatCalc
                          gender={nutritionPlanForm.getValues("gender")}
                          nutritionPlanForm={nutritionPlanForm}
                        />{" "}
                        {/* New wrapper for input and icon */}
                        <FormControl>
                          <Input
                            type="text"
                            placeholder=""
                            {...field}
                            className={`${inputStyle}  `}
                            onInput={(e) => handleNumericInput(e, field, 4)} // Limit to 3 digits (e.g., 99%)
                          />
                        </FormControl>
                        {/* Align icon next to input */}
                      </div>
                      <FormMessage />
                      <FormDescription className="sr-only">
                        You can set current body fat %
                      </FormDescription>
                    </FormItem>
                  )}
                />
                {/* </div> */}
                <FormField
                  control={nutritionPlanForm.control}
                  name="goalBodyFat"
                  render={({ field }) => (
                    <FormItem className="flex items-end space-x-2">
                      <FormLabel className={`${labelStyle}`}>
                        Goal Body Fat %
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          className={`${inputStyle}  `}
                          onInput={(e) => handleNumericInput(e, field, 2)} // Limit to 3 digits
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="sr-only">
                        You can set goal body fat %
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </>
            </FormFrame>
          </div>
          {step === 2 ? (
            <div className="w-1/2 flex flex-col">
              <FormFrame label="Plan" style={labelStyle}>
                <div>
                  <div className="pl-4">
                    <FormField
                      control={nutritionPlanForm.control}
                      name="dailyCalories"
                      render={() => (
                        <FormItem className="flex items-end justify-between space-x-2">
                          <FormLabel className={labelStyle}>
                            Daily Calories
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              value={nutritionPlanForm.watch("dailyCalories")}
                              disabled
                              className={`${inputStyle}  text-right disabled:text-primary disabled:bg-transparent disabled:opacity-100`}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormItem className="flex justify-between items-end space-x-2">
                      <FormLabel className={`${labelStyle}`}>TDEE</FormLabel>
                      <FormControl>
                        <Controller
                          control={nutritionPlanForm.control}
                          name="tdee"
                          render={({ field }) => (
                            <Input
                              className={`${inputStyle}   m-0 text-right`}
                              type="text"
                              {...field}
                              onInput={(e) => {
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                e.target.value = value.slice(0, 4);
                                field.onChange(value);
                                nutritionPlanForm.setValue(
                                  "dailyCalories",
                                  nutritionPlanForm.getValues("tdee") -
                                    nutritionPlanForm.getValues("energyDelta")
                                );
                                updateMacros();
                              }}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="sr-only">
                        Enter your TDEE
                      </FormDescription>
                    </FormItem>

                    <FormItem className="flex items-end justify-between space-x-2 px-1">
                      <FormLabel className={`${labelStyle}`}>
                        {nutritionPlanForm.watch("currentWeight") >
                        nutritionPlanForm.watch("goalWeight")
                          ? "Deficit"
                          : "Surplus"}
                      </FormLabel>
                      <FormControl>
                        <Controller
                          control={nutritionPlanForm.control}
                          name="energyDelta"
                          render={({ field }) => (
                            <Input
                              className={`${inputStyle}   m-0`}
                              type="text"
                              {...field}
                              onInput={(e) => {
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                e.target.value = value.slice(0, 4);
                                field.onChange(value);
                                nutritionPlanForm.setValue(
                                  "dailyCalories",
                                  nutritionPlanForm.getValues("tdee") -
                                    nutritionPlanForm.getValues("energyDelta")
                                );

                                updateMacros();
                                setIntensity("");
                              }}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="sr-only">
                        Enter your energy delta (calorie deficit or surplus)
                      </FormDescription>
                    </FormItem>
                    <div className="flex w-full justify-center items-center my-2">
                      <Intensity
                        className="w-full"
                        intensity={intensity}
                        setIntensity={handleIntensityChange}
                      />
                    </div>
                  </div>
                </div>
              </FormFrame>
              <FormFrame label="Macros" style={labelStyle}>
                <div className="pl-4">
                  <FormItem className="flex justify-between items-end space-x-2">
                    <FormLabel className={labelStyle}>Protein</FormLabel>
                    <FormControl>
                      <Controller
                        control={nutritionPlanForm.control}
                        name="protein"
                        render={({ field }) => (
                          <Input
                            className={`${inputStyle}  m-0 text-right disabled:text-primary disabled:bg-transparent disabled:opacity-100`}
                            type="text"
                            value={field.value}
                            disabled
                          />
                        )}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex justify-between items-end space-x-2">
                    <FormLabel className={labelStyle}>Fat</FormLabel>
                    <FormControl>
                      <Controller
                        control={nutritionPlanForm.control}
                        name="fat"
                        render={({ field }) => (
                          <Input
                            className={`${inputStyle}   m-0 text-right`}
                            type="text"
                            {...field}
                            onInput={(e) => {
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              field.onChange(value);
                              nutritionPlanForm.setValue(
                                "carbs",
                                (
                                  (nutritionPlanForm.getValues(
                                    "dailyCalories"
                                  ) -
                                    nutritionPlanForm.getValues("protein") * 4 -
                                    nutritionPlanForm.getValues("fat") * 9) /
                                  4
                                ).toFixed(0)
                              );
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex justify-between items-end space-x-2">
                    <FormLabel className={labelStyle}>Carbs</FormLabel>
                    <FormControl>
                      <Controller
                        control={nutritionPlanForm.control}
                        name="carbs"
                        render={({ field }) => (
                          <Input
                            className={`${inputStyle}   m-0 text-right`}
                            type="text"
                            {...field}
                            onInput={(e) => {
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              field.onChange(value);
                              nutritionPlanForm.setValue(
                                "fat",
                                (
                                  (nutritionPlanForm.getValues(
                                    "dailyCalories"
                                  ) -
                                    nutritionPlanForm.getValues("protein") * 4 -
                                    nutritionPlanForm.getValues("carbs") * 4) /
                                  9
                                ).toFixed(0)
                              );
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </FormFrame>

              {/* <div className={`${labelStyle} `}>Macros</div> */}
            </div>
          ) : (
            <div className="w-1/2 flex flex-col text-xl space-y-4">
              <div className="space-y-4 text-lg">
                <p className="text-primary font-medium">
                  <span className="font-bold">
                    Fill out personal information
                  </span>{" "}
                  to get started.
                </p>
                <p className="text-primary font-thin pl-4">
                  If you know your body fat percentage, enter it in the form to
                  the left. If not, estimate it using the{" "}
                  <span className="font-bold">body fat calculator</span>.
                </p>
                <p className="text-primary font-thin pl-4">
                  Smart scales, DEXA scans, calipers, or the calculator... The
                  method doesn't matter, what's{" "}
                  <span className="font-semibold">
                    important is using the same method consistently.
                  </span>
                </p>
                <p className="text-primary font-light pl-4">
                  Tracking trends helps us optimize your plan over time.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex">
          <div
            className={`flex justify-center mt-6 w-1/2 border border-primary border-t-0 border-l-0 border-r-0 ${
              step === 2 ? "border-b-0" : ""
            }`}
          >
            {step === 1 && (
              <Button
                onClick={() => calculateMacros(nutritionPlanForm)}
                className="w-full text-2xl rounded-none hover:bg-primary hover:text-primary-foreground"
                variant="ghost"
                type="button"
              >
                Lets Go!
              </Button>
            )}
            {step === 2 && (
              <Button
                onClick={() => calculateMacros(nutritionPlanForm)}
                className="w-full text-2xl rounded-none hover:bg-primary hover:text-primary-foreground"
                variant="ghost"
                type="button"
              >
                Recalculate
              </Button>
            )}
          </div>
          <div
            className={`flex justify-center mt-6 w-1/2 border border-primary border-t-0 border-l-0 border-r-0 ${
              step === 1 ? "border-b-0" : ""
            }`}
          >
            {step === 2 && (
              <Button
                className="w-full text-2xl rounded-none hover:bg-primary hover:text-primary-foreground"
                variant="ghost"
                type="submit"
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
