"use client";
import { SortableContext } from "@dnd-kit/sortable";
import React from "react";

export const Droppable = ({ children, items, strategy }) => {
  return (
    <div className="p-8">
      <SortableContext items={items} strategy={strategy}>
        {children}
      </SortableContext>
    </div>
  );
};
