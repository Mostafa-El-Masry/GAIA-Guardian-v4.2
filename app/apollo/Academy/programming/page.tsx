
"use client";

import { useEffect, useState } from "react";
import { useAcademyProgress } from "../useAcademyProgress";
import { programmingLessons } from "../lessonsMap";
import ProgrammingLessonContent from "./lessonContent";

export const dynamic = "force-dynamic";

type Lesson = {
  id: string;
  code: string;
  title: string;
  estimate: string;
};

type Section = {
  id: string;
  label: string;
  title: string;
  focus: string;
  lessons: Lesson[];
};

const makeLesson = (code: string, estimate: string): Lesson => {
  const meta = programmingLessons.find(
    (l) => l.code === code && l.trackId === "programming"
  );
  if (!meta) {
    return {
      id: `missing-${code}`,
      code,
      title: `Missing lesson for code ${code}`,
      estimate,
    };
  }
  return {
    id: meta.id,
    code: meta.code,
    title: meta.title,
    estimate,
  };
};

const sections: Section[] = [
  {
    id: "arc-1",
    label: "Arc 1 · Foundations",
    title: "How the Web Works & Your Tools",
    focus:
      "Understand browsers, servers, and the tools you will use so nothing feels like magic.",
    lessons: [
      makeLesson("1.1", "30–45 min"),
      makeLesson("1.2", "45–60 min"),
      makeLesson("1.3", "45–60 min"),
    ],
  },
  {
    id: "arc-2",
    label: "Arc 2 · HTML",
    title: "HTML Structure & Semantics",
    focus:
      "Learn how to structure pages with clean, semantic HTML that GAIA can read easily later.",
    lessons: [
      makeLesson("2.1", "60–90 min"),
      makeLesson("2.2", "60–90 min"),
      makeLesson("2.3", "45–60 min"),
      makeLesson("2.4", "60–90 min"),
      makeLesson("2.5", "45–60 min"),
    ],
  },
  {
    id: "arc-3",
    label: "Arc 3 · CSS & Tailwind",
    title: "Styling, Layouts, and Tailwind Basics",
    focus:
      "Control layout, spacing, and typography, then move to faster styling with Tailwind.",
    lessons: [
      makeLesson("3.1", "60–90 min"),
      makeLesson("3.2", "60–90 min"),
      makeLesson("3.3", "60–90 min"),
      makeLesson("3.4", "60–90 min"),
      makeLesson("3.5", "60–90 min"),
      makeLesson("3.6", "60–90 min"),
    ],
  },
  {
    id: "arc-4",
    label: "Arc 4 · JavaScript",
    title: "JavaScript Fundamentals",
    focus:
      "Build the logic layer so you can interact with users, data, and APIs.",
    lessons: [
      makeLesson("4.1", "60–90 min"),
      makeLesson("4.2", "60–90 min"),
      makeLesson("4.3", "60–90 min"),
      makeLesson("4.4", "60–90 min"),
      makeLesson("4.5", "60–90 min"),
      makeLesson("4.6", "60–90 min"),
      makeLesson("4.7", "60–90 min"),
    ],
  },
  {
    id: "arc-5",
    label: "Arc 5 · React & Next.js",
    title: "Components, State, and Next.js",
    focus:
      "Move from static pages to interactive apps using React and Next.js like GAIA itself.",
    lessons: [
      makeLesson("5.1", "60–90 min"),
      makeLesson("5.2", "60–90 min"),
      makeLesson("5.3", "60–90 min"),
      makeLesson("5.4", "60–90 min"),
      makeLesson("5.5", "60–90 min"),
    ],
  },
  {
    id: "arc-6",
    label: "Arc 6 · Databases & Supabase",
    title: "Data, Auth, and CRUD",
    focus:
      "Learn how to store your data remotely and keep it in sync, just like GAIA Awakening.",
    lessons: [
      makeLesson("6.1", "60–90 min"),
      makeLesson("6.2", "60–90 min"),
      makeLesson("6.3", "60–90 min"),
      makeLesson("6.4", "60–90 min"),
    ],
  },
  {
    id: "arc-7",
    label: "Arc 7 · Capstone",
    title: "Build and Connect a Real Project",
    focus:
      "Plan, build, and polish a small GAIA-style app and connect it into the main system.",
    lessons: [
      makeLesson("7.1", "60–90 min"),
      makeLesson("7.2", "60–120 min"),
      makeLesson("7.3", "60–120 min"),
      makeLesson("7.4", "60–120 min"),
    ],
  },
];

export default function ProgrammingTrackPage() {
  const { isLessonCompleted, toggleLessonCompleted, markStudyVisit } =
    useAcademyProgress();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [showSections, setShowSections] = useState<boolean>(true);

  useEffect(() => {
    markStudyVisit("programming");
  }, [markStudyVisit]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActiveLessonId(hash);
      setShowSections(false);
    }
  }, []);

  const allLessons: Lesson[] = sections.flatMap((section) => section.lessons);
  const activeLesson =
    activeLessonId && allLessons.find((l) => l.id === activeLessonId);

  const totalProgrammingLessons = allLessons.length;
  const completedCount = allLessons.filter((lesson) =>
    isLessonCompleted("programming", lesson.id)
  ).length;
  const completionPercent =
    totalProgrammingLessons === 0
      ? 0
      : Math.round((completedCount / totalProgrammingLessons) * 100);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] gaia-muted">
            Academy · Programming path
          </p>
          <h1 className="mt-1 text-lg sm:text-2xl font-semibold gaia-strong">
            Web Developer Track
          </h1>
          <p className="mt-1 text-xs sm:text-sm gaia-muted max-w-xl">
            From true beginner to building GAIA-style apps: HTML, CSS, JS,
            React, Next.js, and Supabase — all paced for your energy and time.
          </p>
        </div>

        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs sm:text-sm">
          <div className="flex flex-col">
            <span className="gaia-muted text-[11px] uppercase tracking-[0.22em]">
              Overall progress
            </span>
            <span className="gaia-strong text-sm">
              {completedCount}/{totalProgrammingLessons} lessons ·{" "}
              {completionPercent}%
            </span>
          </div>
        </div>
      </header>

      <section className="space-y-4 mt-2">
        <article className="rounded-2xl gaia-panel-soft p-4 sm:p-5 shadow-sm border border-white/5">
          {activeLesson ? (
            <div className="space-y-3">
              <p className="text-[11px] sm:text-xs gaia-muted uppercase tracking-[0.22em]">
                Currently studying
              </p>
              <h2 className="text-base sm:text-lg font-semibold gaia-strong">
                {activeLesson.code} · {activeLesson.title}
              </h2>
              <ProgrammingLessonContent
                lessonId={activeLesson.code}
                isCompleted={isLessonCompleted("programming", activeLesson.id)}
                onLessonCompleted={() => {
                  if (!isLessonCompleted("programming", activeLesson.id)) {
                    toggleLessonCompleted("programming", activeLesson.id);
                  }
                }}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] sm:text-xs gaia-muted uppercase tracking-[0.22em]">
                Lesson viewer
              </p>
              <p className="text-sm sm:text-base gaia-muted">
                Choose a lesson from the list below or use the{" "}
                <span className="gaia-strong">Start today&apos;s session</span>{" "}
                button in the Academy dashboard to jump straight into a
                recommended lesson.
              </p>
            </div>
          )}
        </article>

        {activeLesson && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowSections((prev) => !prev)}
              className="mt-2 inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] sm:text-xs font-semibold bg-white/10 hover:bg-white/20 text-white"
            >
              {showSections ? "Hide lesson list" : "Show lesson list"}
            </button>
          </div>
        )}

        {showSections && (
          <>
            {sections.map((section) => (
              <article
                key={section.id}
                className="rounded-2xl gaia-panel-soft p-4 sm:p-5 shadow-sm border border-white/5"
              >
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] gaia-muted">
                  {section.label}
                </p>
                <h2 className="mt-1 text-sm sm:text-base font-semibold gaia-strong">
                  {section.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm gaia-muted">
                  {section.focus}
                </p>

                <ul className="mt-3 space-y-1.5 text-xs sm:text-sm gaia-muted">
                  {section.lessons.map((lesson) => (
                    <li
                      id={lesson.id}
                      key={lesson.id}
                      className="flex items-baseline justify-between gap-2 border-b border-white/5 pb-1 last:border-b-0 last:pb-0 cursor-pointer"
                      onClick={() => {
                        setActiveLessonId(lesson.id);
                        setShowSections(false);
                      }}
                    >
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-[11px] sm:text-xs ${
                          isLessonCompleted("programming", lesson.id)
                            ? "bg-white text-black font-semibold"
                            : ""
                        }`}
                        aria-hidden="true"
                      >
                        {isLessonCompleted("programming", lesson.id) ? "✓" : ""}
                      </span>

                      <span className="gaia-strong text-[11px] sm:text-xs w-10">
                        {lesson.code}
                      </span>
                      <span className="flex-1">{lesson.title}</span>
                      <span className="text-[11px] sm:text-xs">
                        {lesson.estimate}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </>
        )}
      </section>
    </main>
  );
}
