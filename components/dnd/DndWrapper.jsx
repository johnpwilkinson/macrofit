// DragAndDropWrapper.js
"use client";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import React from "react";
import { motion } from "framer-motion";

export default function DndWrapper({ items, onDragEnd, strategy, children }) {
  const getTaskIndex = (id) => items.findIndex((item) => item.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return; // Exit if dropped on itself

    const oldIndex = getTaskIndex(active.id);
    const newIndex = getTaskIndex(over.id);

    onDragEnd(arrayMove(items, oldIndex, newIndex));
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      //   shouldPreventFocusOnMount={true}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 1 }}
        // transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex"
      >
        <SortableContext
          items={items}
          strategy={strategy || horizontalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </motion.div>
    </DndContext>
  );
}
