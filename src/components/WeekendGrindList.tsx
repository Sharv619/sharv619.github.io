"use client";

import WeekendGrindCard from "@/components/WeekendGrindCard";

interface WeekendGrindListProps {
  weekendGrinds: Array<{
    title: string;
    label: string;
    description: string;
    technologies: string[];
    detail: string;
  }>;
}

export default function WeekendGrindList({ weekendGrinds }: WeekendGrindListProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {weekendGrinds.map((workflow, index) => (
        <WeekendGrindCard key={workflow.title} workflow={workflow} index={index} />
      ))}
    </div>
  );
}