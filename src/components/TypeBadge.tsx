'use client';
import React from "react";
import { typeColors } from "../utils/typeColors";

type TypeBadgeProps = {
  type: string;
  small?: boolean;
};

export default function TypeBadge({ type, small = false }: TypeBadgeProps) {
  const sizeClass = small ? "text-xs px-2 py-0.5" : "text-xs sm:text-sm px-2 py-0.5";

  return (
    <span
      className={`${typeColors[type] || "text-gray-600"} inline-flex items-center justify-center ${sizeClass} rounded-full border-2 border-current uppercase font-bold whitespace-nowrap mr-1 mb-1`}
    >
      {type}
    </span>
  );
}