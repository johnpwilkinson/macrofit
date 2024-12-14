"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { motion, AnimatePresence } from "framer-motion";
import { createId } from "@paralleldrive/cuid2";

export default function MyLine({
  activeMetricOne,
  activeMetricTwo,
  activeMetricOneChartData,
  activeMetricTwoChartData,
  activeMetricOneChartConfig,
  activeMetricTwoChartConfig,
  setHoveredData,
  chartConfig,
  isMobile,
}) {
  const [chartData, setChartData] = useState([]);
  const [lineKeys, setLineKeys] = useState({
    metricOne: createId(),
    metricTwo: createId(),
    expectedWeightOne: createId(),
    expectedWeightTwo: createId(),
  });

  const mergedData = useMemo(() => {
    return mergeChartData(
      activeMetricOneChartData,
      activeMetricTwoChartData,
      activeMetricOne,
      activeMetricTwo
    );
  }, [
    activeMetricOneChartData,
    activeMetricTwoChartData,
    activeMetricOne,
    activeMetricTwo,
  ]);

  useEffect(() => {
    setChartData(mergedData);
    setLineKeys((prevKeys) => ({
      ...prevKeys,
      metricOne: activeMetricOne ? createId() : prevKeys.metricOne,
      expectedWeightOne:
        activeMetricOne === "weight" ? createId() : prevKeys.expectedWeightOne,
    }));
  }, [activeMetricOne, activeMetricOneChartData]);

  useEffect(() => {
    setChartData(mergedData);
    setLineKeys((prevKeys) => ({
      ...prevKeys,
      metricTwo: activeMetricTwo ? createId() : prevKeys.metricTwo,
      expectedWeightTwo:
        activeMetricTwo === "weight" ? createId() : prevKeys.expectedWeightTwo,
    }));
  }, [activeMetricTwo, activeMetricTwoChartData]);

  const getLabelColor = (activeMetric, metricNum) => {
    return `var(--color-metric${metricNum}Value)`;
  };

  const renderLine = (dataKey, stroke, yAxisId, name, key) => (
    <Line
      key={key}
      dataKey={dataKey}
      type="monotone"
      stroke={stroke}
      strokeWidth={2}
      dot={false}
      yAxisId={yAxisId}
      connectNulls={true}
      animationBegin={0}
      animationDuration={1000}
      isAnimationActive={true}
      animateNewValues={true}
      animationEasing="ease-in-out"
      name={name || ""}
    />
  );

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-full min-h-[200px]"
    >
      <AnimatePresence mode="wait">
        {activeMetricOne || activeMetricTwo ? (
          <motion.div
            key="chart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${String(date.getMonth() + 1).padStart(
                      2,
                      "0"
                    )}/${String(date.getDate()).padStart(2, "0")}`;
                  }}
                  interval={0}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  domain={["dataMin", "dataMax"]}
                  label={
                    !isMobile
                      ? {
                          value: activeMetricOneChartConfig.axisLabel,
                          angle: -90,
                          position: "insideLeft",
                          style: {
                            fontSize: 14,
                            fill: getLabelColor(activeMetricOne, "One"),
                            fontWeight: "bold",
                          },
                        }
                      : null
                  }
                />
                {activeMetricTwo && (
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    domain={["dataMin", "dataMax"]}
                    label={
                      !isMobile
                        ? {
                            value: activeMetricTwoChartConfig.axisLabel,
                            angle: 90,
                            position: "insideRight",
                            style: {
                              fontSize: 14,
                              fill: getLabelColor(activeMetricTwo, "Two"),
                              fontWeight: "bold",
                            },
                          }
                        : null
                    }
                  />
                )}
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                {activeMetricOne &&
                  renderLine(
                    "metricOneValue",
                    "var(--color-metricOneValue)",
                    "left",
                    activeMetricOne?.name,
                    lineKeys.metricOne
                  )}
                {activeMetricOne === "weight" &&
                  renderLine(
                    "expectedWeight",
                    "var(--color-expectedWeight)",
                    "left",
                    "Expected Weight",
                    lineKeys.expectedWeightOne
                  )}
                {activeMetricTwo &&
                  renderLine(
                    "metricTwoValue",
                    "var(--color-metricTwoValue)",
                    "right",
                    activeMetricTwo?.name,
                    lineKeys.metricTwo
                  )}
                {activeMetricTwo === "weight" &&
                  renderLine(
                    "expectedWeight",
                    "var(--color-expectedWeight)",
                    "right",
                    "Expected Weight",
                    lineKeys.expectedWeightTwo
                  )}
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            <EmptyChart />
          </motion.div>
        )}
      </AnimatePresence>
    </ChartContainer>
  );
}

function EmptyChart() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-lg text-center text-gray-500">
        Select a Metric from the drop down above to view your progress
      </p>
    </div>
  );
}

function mergeChartData(
  chartDataOne,
  chartDataTwo,
  activeMetricOne,
  activeMetricTwo
) {
  const dataMap = new Map();

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  const processData = (data, isMetricOne) => {
    data.forEach((item) => {
      const formattedDate = formatDate(item.date);
      if (!dataMap.has(formattedDate)) {
        dataMap.set(formattedDate, {
          date: formattedDate,
          metricOneValue: null,
          metricTwoValue: null,
          expectedWeight: null,
        });
      }

      const entry = dataMap.get(formattedDate);
      if ((isMetricOne ? activeMetricOne : activeMetricTwo) === "weight") {
        entry.expectedWeight = item.expectedWeight;
      }
      entry[isMetricOne ? "metricOneValue" : "metricTwoValue"] = item.value;
    });
  };

  processData(chartDataOne, true);
  processData(chartDataTwo, false);

  return Array.from(dataMap.values()).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}
