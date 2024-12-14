"use client";
import { Children, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { date, z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { useDialogClose } from "./Modal";
import { addBodyCompLog } from "@/app/lib/actions";

const inputStyle =
  "block w-full rounded-br-none text-right rounded-bl-none border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent focus-visible:ring-0 focus:ring-none focus:outline-none text-2xl p-0 px-0  placeholder-transparent box-border";
const labelStyle =
  "mb-0 whitespace-nowrap prose font-black text-primary text-2xl";
const LogBodyCompSchema = z.object({
  date: z.date(),
  weight: z.coerce.number(),
  bodyFat: z.coerce.number(),
  bmi: z.coerce.number(),
  waist: z.coerce.number(),
  hips: z.coerce.number(),
  neck: z.coerce.number(),
  bicep: z.coerce.number(),
  legs: z.coerce.number(),
});

const FormFrame = ({ label, children, style }) => {
  return (
    <div className="flex flex-col">
      <div className={style}>{label}</div>
      <div>{children}</div>
    </div>
  );
};

export default function LogBodyCompForm({ userId, isMetric }) {
  console.log("isMetric", isMetric);
  const closeDialog = useDialogClose();
  const logBodyCompForm = useForm({
    resolver: zodResolver(LogBodyCompSchema),
    defaultValues: {
      //   name: "",
      //   daysPerWeek: "1",
      //   days: [],
    },
  });
  const { control, watch } = logBodyCompForm;

  async function onSubmit(data) {
    const id = userId;
    data.userId = userId;
    console.log(
      "Final DATA Structure Before Submission",
      JSON.stringify(data, null, 2)
    );
    addBodyCompLog(data);
  }

  function onError(errors) {
    console.log("Validation errors:", errors);
  }

  return (
    <Form {...logBodyCompForm}>
      <form onSubmit={logBodyCompForm.handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col w-full space-y-4 ">
          <div className="   w-full ">
            <div className="flex flex-col">
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="sr-only">Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "sr-only pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative w-full">
                <Controller
                  name={`weight`} // Use index here
                  control={control}
                  render={({ field }) => (
                    <div className="w-full">
                      <Input
                        {...field}
                        type="text"
                        placeholder="weight"
                        value={field.value || ""} // Ensure form state's value persists
                        className="w-full rounded-none text-xl bg-transparent p-1 pb-0 focus-visible:ring-0 focus:ring-none focus:outline-none border border-primary border-t-transparent border-l-transparent border-r-transparent focus:border-primary focus:border-l-transparent focus:border-r-transparent focus:border-t-transparent placeholder:text-red-500 px-0"
                        onBlur={field.onBlur} // Automatically tracks blur
                      />
                      <span className="absolute right-1 top-6 transform -translate-y-1/2 text-gray-500">
                        {isMetric ? "kg" : "lbs"}
                      </span>
                    </div>
                  )}
                />
              </div>
              <div className="relative">
                <Controller
                  name={`bodyFat`} // Use index here
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        placeholder="body fat"
                        value={field.value || ""} // Ensure form state's value persists
                        className="rounded-none text-xl bg-transparent p-1 pb-0 focus-visible:ring-0 focus:ring-none focus:outline-none border border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent placeholder:text-red-500 px-0"
                        onBlur={field.onBlur} // Automatically tracks blur
                      />
                      <span className="absolute right-1 top-6 transform -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </>
                  )}
                />{" "}
              </div>
              <div className="relative">
                <Controller
                  name={`bmi`} // Use index here
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        placeholder="bmi"
                        value={field.value || ""} // Ensure form state's value persists
                        className="rounded-none text-xl bg-transparent p-1 pb-0 focus-visible:ring-0 focus:ring-none focus:outline-none border border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent placeholder:text-red-500 px-0"
                        onBlur={field.onBlur} // Automatically tracks blur
                      />
                      <span className="absolute right-1 top-6 transform -translate-y-1/2 text-gray-500"></span>
                    </>
                  )}
                />{" "}
              </div>
              <div className="relative">
                <Controller
                  name={`waist`} // Use index here
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        placeholder="waist"
                        value={field.value || ""} // Ensure form state's value persists
                        className="rounded-none text-xl bg-transparent p-1 pb-0 focus-visible:ring-0 focus:ring-none focus:outline-none border border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent placeholder:text-red-500 px-0"
                        onBlur={field.onBlur} // Automatically tracks blur
                      />
                      <span className="absolute right-1 top-6 transform -translate-y-1/2 text-gray-500">
                        {isMetric ? "cm" : "in"}
                      </span>
                    </>
                  )}
                />{" "}
              </div>
              <div className="relative">
                <Controller
                  name={`hips`} // Use index here
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        placeholder="hips"
                        value={field.value || ""} // Ensure form state's value persists
                        className="rounded-none text-xl bg-transparent p-1 pb-0 focus-visible:ring-0 focus:ring-none focus:outline-none border border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent placeholder:text-red-500 px-0"
                        onBlur={field.onBlur} // Automatically tracks blur
                      />
                      <span className="absolute right-1 top-6 transform -translate-y-1/2 text-gray-500">
                        {isMetric ? "cm" : "in"}
                      </span>
                    </>
                  )}
                />{" "}
              </div>
              <div className="relative">
                <Controller
                  name={`neck`} // Use index here
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        placeholder="neck"
                        value={field.value || ""} // Ensure form state's value persists
                        className="rounded-none text-xl bg-transparent p-1 pb-0 focus-visible:ring-0 focus:ring-none focus:outline-none border border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent placeholder:text-red-500 px-0"
                        onBlur={field.onBlur} // Automatically tracks blur
                      />
                      <span className="absolute right-1 top-6 transform -translate-y-1/2 text-gray-500">
                        {isMetric ? "cm" : "in"}
                      </span>
                    </>
                  )}
                />
              </div>
              <div className="relative">
                <Controller
                  name={`bicep`} // Use index here
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        placeholder="bicep"
                        value={field.value || ""} // Ensure form state's value persists
                        className="rounded-none text-xl bg-transparent p-1 pb-0 focus-visible:ring-0 focus:ring-none focus:outline-none border border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent placeholder:text-red-500 px-0"
                        onBlur={field.onBlur} // Automatically tracks blur
                      />
                      <span className="absolute right-1 top-6 transform -translate-y-1/2 text-gray-500">
                        {isMetric ? "cm" : "in"}
                      </span>
                    </>
                  )}
                />
              </div>
              <div className="relative">
                <Controller
                  name={`legs`} // Use index here
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        placeholder="legs"
                        value={field.value || ""} // Ensure form state's value persists
                        className="rounded-none text-xl bg-transparent p-1 pb-0 focus-visible:ring-0 focus:ring-none focus:outline-none border border-primary border-t-transparent border-l-transparent border-r-transparent  focus:border-primary  focus:border-l-transparent  focus:border-r-transparent  focus:border-t-transparent placeholder:text-red-500 px-0"
                        onBlur={field.onBlur} // Automatically tracks blur
                      />
                      <span className="absolute right-1 top-6 transform -translate-y-1/2 text-gray-500">
                        {isMetric ? "cm" : "in"}
                      </span>
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div
            className={`flex justify-center mt-6 w-full  border border-primary border-t-0 border-l-0 border-r-0  `}
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
