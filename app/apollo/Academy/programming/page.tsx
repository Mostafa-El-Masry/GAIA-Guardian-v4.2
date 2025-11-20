"use client";

import { useEffect, useState } from "react";
import ClientView from "../ClientView";
import { useAcademyProgress } from "../useAcademyProgress";
import type { LessonMeta } from "../lessonsMap";
import { programmingLessons } from "../lessonsMap";
import { ProgrammingLessonContent } from "./lessonContent";

export const dynamic = "force-dynamic";

type Section = {
  id: string;
  label: string;
  description: string;
  filter: (lesson: LessonMeta) => boolean;
};

const sections: Section[] = [
  {
    id: "foundations",
    label: "Arc 1 · Foundations & Mindset",
    description:
      "Very simple but very important: how the web works, the tools you use, and how to learn without burning yourself out.",
    filter: (lesson) => lesson.code.startsWith("1."),
  },
  {
    id: "html",
    label: "Arc 2 · HTML · Skeleton of the Page",
    description:
      "Everything about the raw structure of a page: tags, text, links, images, lists, tables, forms, and semantic HTML.",
    filter: (lesson) => lesson.code.startsWith("2."),
  },
  {
    id: "css",
    label: "Arc 3 · CSS · Making Things Look Alive",
    description:
      "Visual design: box model, layout, colors, typography. This is where pages start to look like GAIA, not 1998.",
    filter: (lesson) => lesson.code.startsWith("3."),
  },
  {
    id: "javascript",
    label: "Arc 4 · JavaScript · Making Things Move",
    description:
      "Variables, logic, loops, and DOM basics. This is where you tell the browser what to do, step by step.",
    filter: (lesson) => lesson.code.startsWith("4."),
  },
];

const lessonDuration: Record<string, string> = {
  "prog-1-1": "45–60 min",
  "prog-1-2": "45–60 min",
  "prog-1-3": "45–60 min",
  "prog-2-1": "30–45 min",
  "prog-2-2": "30–45 min",
  "prog-2-3": "45–60 min",
  "prog-2-4": "45–60 min",
  "prog-2-5": "45–60 min",
  "prog-3-1": "45–75 min",
  "prog-3-2": "45–75 min",
  "prog-3-3": "45–75 min",
  "prog-3-4": "45–75 min",
  "prog-4-1": "60–90 min",
  "prog-4-2": "60–90 min",
  "prog-4-3": "60–90 min",
  "prog-4-4": "60–90 min",
  "prog-4-5": "60–90 min",
  "prog-4-6": "60–90 min",
};

export default function ProgrammingTrackPage() {
  const { isLessonCompleted, toggleLessonCompleted, markStudyVisit } =
    useAcademyProgress();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  useEffect(() => {
    markStudyVisit("programming");
  }, [markStudyVisit]);

  // Pick from URL hash when arriving from "Start today's session"
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActiveLessonId(hash);
    }
  }, []);

  const allLessons = programmingLessons;
  const activeLesson =
    activeLessonId && allLessons.find((lesson) => lesson.id === activeLessonId);

  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((lesson) =>
    isLessonCompleted("programming", lesson.id)
  ).length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">
          Web Programming · Builder of Worlds
        </h1>
        <p className="text-sm gaia-muted max-w-2xl">
          From &quot;I don&apos;t know anything&quot; to building real
          GAIA-style apps. You study three days per week in small blocks, and
          measure progress by completed lessons, not by how fast you sprint.
        </p>
        <p className="text-xs gaia-muted mt-1">
          Lessons completed:{" "}
          <span className="gaia-strong">
            {completedLessons} / {totalLessons}
          </span>
        </p>
      </header>

      {/* Lesson viewer */}
      <section className="space-y-4 mb-6">
        <article className="rounded-2xl gaia-panel-soft p-4 sm:p-5 shadow-sm border border-white/5">
          {activeLesson ? (
            <div className="space-y-3">
              <p className="text-[11px] gaia-muted uppercase tracking-[0.22em]">
                Currently studying
              </p>
              <h2 className="text-sm font-semibold gaia-strong">
                {activeLesson.code} · {activeLesson.title}
              </h2>
              <ProgrammingLessonContent lessonId={activeLesson.id} />
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] gaia-muted uppercase tracking-[0.22em]">
                Lesson viewer
              </p>
              <p className="text-sm gaia-muted">
                Choose a lesson from the list below, or use the{" "}
                <span className="gaia-strong">Start today&apos;s session</span>{" "}
                button in the Academy dashboard to jump straight into the next
                suggested lesson.
              </p>
            </div>
          )}
        </article>
      </section>

      {/* Sections + lesson list */}
      <section className="space-y-4">
        {sections.map((section) => {
          const lessons = allLessons.filter(section.filter);
          if (lessons.length === 0) return null;

          return (
            <article
              key={section.id}
              className="rounded-2xl gaia-panel-soft p-4 sm:p-5 shadow-sm border border-white/5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] gaia-muted">
                {section.label}
              </p>
              <p className="mt-1 text-xs gaia-muted max-w-3xl">
                {section.description}
              </p>

              <ul className="mt-3 space-y-1.5 text-xs gaia-muted">
                {lessons.map((lesson) => (
                  <li
                    id={lesson.id}
                    key={lesson.id}
                    className="flex items-baseline justify-between gap-2 border-b border-white/5 pb-1 last:border-b-0 last:pb-0 cursor-pointer"
                    onClick={() => setActiveLessonId(lesson.id)}
                  >
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleLessonCompleted("programming", lesson.id);
                      }}
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-[11px]"
                      aria-label={
                        isLessonCompleted("programming", lesson.id)
                          ? "Mark lesson as not completed"
                          : "Mark lesson as completed"
                      }
                    >
                      {isLessonCompleted("programming", lesson.id) ? "✓" : ""}
                    </button>

                    <span className="gaia-strong text-[11px] w-10">
                      {lesson.code}
                    </span>
                    <span className="flex-1">{lesson.title}</span>
                    <span className="text-[11px]">
                      {lessonDuration[lesson.id] ?? "30–60 min"}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      {/* Old view (kept as a soft fallback) */}
      <section className="mt-4">
        <div className="rounded-2xl gaia-panel-soft p-4 sm:p-5 shadow-sm border border-dashed border-white/10">
          <p className="text-xs gaia-muted">
            Below this structure, your existing study view can live. For now,
            it&apos;s connected here as a fallback so you can keep using what
            you already had while these new lessons grow.
          </p>
          <div className="mt-3 rounded-xl bg-black/20 p-3">
            <ClientView />
          </div>
        </div>
      </section>
    </main>
  );
}