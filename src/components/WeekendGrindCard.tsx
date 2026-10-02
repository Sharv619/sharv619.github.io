import { motion } from "framer-motion";

interface WeekendGrindCardProps {
  workflow: {
    title: string;
    label: string;
    description: string;
    technologies: string[];
    detail: string;
  };
  index: number;
}

export default function WeekendGrindCard({ workflow, index }: WeekendGrindCardProps) {
  return (
    <motion.article
      key={workflow.title}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
        {workflow.label}
      </p>
      <h4 className="text-lg font-bold text-stone-950 dark:text-white">
        {workflow.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
        {workflow.description}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${workflow.title} technologies`}>
        {workflow.technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            {technology}
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
          How it works
        </p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-gray-800 dark:text-gray-100">
          {workflow.detail}
        </p>
      </div>
    </motion.article>
  );
}