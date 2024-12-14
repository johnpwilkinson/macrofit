"use client";

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
export default function BodyMetricsLogbook({ logs, isMetric }) {
  // Filter out non-metric fields like id, userId, createdAt, and updatedAt

  const metricEntries = Object.entries(logs).filter(
    ([key]) => !["id", "userId", "createdAt", "updatedAt", "date"].includes(key)
  );

  // Mapping for proper metric names and units
  const metricNames = {
    weight: "Weight",
    bodyFat: "Body Fat",
    bmi: "BMI",
    waist: "Waist",
    hips: "Hips",
    neck: "Neck",
    bicep: "Bicep",
    legs: "Legs",
  };

  const getUnit = (key) => {
    if (["weight"].includes(key)) return isMetric ? "kg" : "lbs";
    if (["waist", "hips", "neck", "bicep", "legs"].includes(key))
      return isMetric ? "cm" : "in";
    if (key === "bodyFat") return "%"; // Percentage for body fat
    return ""; // No unit for BMI
  };

  return (
    <Table className=" mx-auto">
      <TableCaption className="sr-only">
        A summary of your body metrics.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="border">Metric</TableHead>
          <TableHead className="border text-center">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metricEntries.map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="border capitalize">
              {metricNames[key] || key}
            </TableCell>
            <TableCell className="border text-center">
              {value}
              {getUnit(key) && ` ${getUnit(key)}`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
