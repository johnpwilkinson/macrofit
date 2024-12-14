"use client";

import { usePathname, useRouter } from "next/navigation";
import { Calendar } from "./ui/calendar";
import { useState, useEffect } from "react";

export default function DatePicker({ bodyMetricDates, workoutDates }) {
  const pathname = usePathname();
  const router = useRouter();

  // Function to parse date string and return a Date object in local timezone
  const parseDate = (dateString) => {
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Extract the date from the URL, or fallback to today's date
  const initialDateString = pathname?.split("/")[2];
  const initialDate = parseDate(initialDateString);

  // Set up date state with initial date as a Date object
  const [date, setDate] = useState(initialDate);

  const handleSelect = (newDate) => {
    if (newDate instanceof Date && !isNaN(newDate.getTime())) {
      setDate(newDate);

      // Format the date as YYYY-MM-DD for the URL
      const formattedDate = newDate.toISOString().split("T")[0];

      // Update the URL without reloading the page
      router.push(`/logbook/${formattedDate}`);
    } else {
      console.warn("Selected date is invalid:", newDate);
    }
  };

  // Keep `date` in sync with `initialDate` if the URL changes
  useEffect(() => {
    const newDate = parseDate(initialDateString);
    setDate(newDate);
  }, [initialDateString]);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleSelect}
      bodyMetricDates={bodyMetricDates}
      workoutDates={workoutDates}
      className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
    />
  );
}
