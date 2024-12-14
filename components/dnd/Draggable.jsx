"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { motion } from "framer-motion";

export default function Draggable({ children, id, key }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <motion.div
      ref={setNodeRef}
      id={id}
      key={key}
      // {...attributes}
      // {...listeners}
      style={style}
      whileDrag={{ scale: 1.25, boxShadow: "0px 4px 12px rgb(237, 230, 230)" }}
    >
      {children}
    </motion.div>
  );
}
