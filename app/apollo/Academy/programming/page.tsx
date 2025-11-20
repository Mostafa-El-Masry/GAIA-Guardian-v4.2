"use client";

import ClientView from "../ClientView";
import { useEffect, useState } from "react";
import { useAcademyProgress } from "../useAcademyProgress";
import { ProgrammingLessonContent } from "./lessonContent";

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

const sections: Section[] = [
  {
    id: "prog-1-foundations",
    label: "Section 1",
    title: "Foundations & Mindset",
    focus:
      "Understand how the web works, set up your tools, and learn how to study without burning out.",
    lessons: [
      {
        id: "prog-1-1",
        code: "1.1",
        title: "How the Web & Browsers Work",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-1-2",
        code: "1.2",
        title: "Tools Setup: VS Code, Git, Terminal",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-1-3",
        code: "1.3",
        title: "How to Learn Programming Without Burning Out",
        estimate: "1–2 study sessions",
      },
    ],
  },
  {
    id: "prog-2-html",
    label: "Section 2",
    title: "HTML Essentials",
    focus:
      "Build the skeleton of web pages using semantic HTML so browsers and people can understand your content.",
    lessons: [
      {
        id: "prog-2-1",
        code: "2.1",
        title: "HTML Basics: Tags, Structure, and Layout",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-2-2",
        code: "2.2",
        title: "Text, Links, Images, and Media",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-2-3",
        code: "2.3",
        title: "Lists and Tables",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-2-4",
        code: "2.4",
        title: "Forms Basics",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-2-5",
        code: "2.5",
        title: "Semantic HTML & Accessibility Intro",
        estimate: "1–2 study sessions",
      },
    ],
  },
  {
    id: "prog-3-css-tailwind",
    label: "Section 3",
    title: "CSS & Tailwind",
    focus:
      "Style your pages with modern CSS and then move quickly with Tailwind utilities for layout and design.",
    lessons: [
      {
        id: "prog-3-1",
        code: "3.1",
        title: "CSS Box Model and Display",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-3-2",
        code: "3.2",
        title: "Flexbox for Layout",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-3-3",
        code: "3.3",
        title: "Typography, Color, and Spacing",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-3-4",
        code: "3.4",
        title: "Responsive Design Basics",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-3-5",
        code: "3.5",
        title: "Tailwind Setup in a Project",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-3-6",
        code: "3.6",
        title: "Tailwind Layout & Reusable Components",
        estimate: "1–2 study sessions",
      },
    ],
  },
  {
    id: "prog-4-js-core",
    label: "Section 4",
    title: "JavaScript Core",
    focus:
      "Learn the programming language of the browser so you can add logic and interactivity to your pages.",
    lessons: [
      {
        id: "prog-4-1",
        code: "4.1",
        title: "JS Basics: Variables, Types, and Expressions",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-4-2",
        code: "4.2",
        title: "Conditions and Loops",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-4-3",
        code: "4.3",
        title: "Functions and Scope",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-4-4",
        code: "4.4",
        title: "Arrays and Objects",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-4-5",
        code: "4.5",
        title: "DOM Basics",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-4-6",
        code: "4.6",
        title: "Events and User Interaction",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-4-7",
        code: "4.7",
        title: "Fetch & APIs Intro",
        estimate: "1–2 study sessions",
      },
    ],
  },
  {
    id: "prog-5-react-next",
    label: "Section 5",
    title: "React & Next.js",
    focus:
      "Move from static pages to interactive apps using React components and Next.js routing.",
    lessons: [
      {
        id: "prog-5-1",
        code: "5.1",
        title: "Thinking in Components",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-5-2",
        code: "5.2",
        title: "Props and State",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-5-3",
        code: "5.3",
        title: "Next.js Pages and Routing",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-5-4",
        code: "5.4",
        title: "Data Fetching Basics in Next.js",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-5-5",
        code: "5.5",
        title: "Forms and Local State in React",
        estimate: "1–2 study sessions",
      },
    ],
  },
  {
    id: "prog-6-data-supabase",
    label: "Section 6",
    title: "Data & Supabase",
    focus:
      "Store and read real data from a database so your apps can remember things across sessions and devices.",
    lessons: [
      {
        id: "prog-6-1",
        code: "6.1",
        title: "Intro to Relational Databases",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-6-2",
        code: "6.2",
        title: "Supabase Setup and Auth Basics",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-6-3",
        code: "6.3",
        title: "Reading Data from Supabase",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-6-4",
        code: "6.4",
        title: "Writing Data & Simple CRUD",
        estimate: "1–2 study sessions",
      },
    ],
  },
  {
    id: "prog-7-projects",
    label: "Section 7",
    title: "Projects & GAIA Integration",
    focus:
      "Plan and build small real projects, then connect what you build back into GAIA so you see your skills living inside your own system.",
    lessons: [
      {
        id: "prog-7-1",
        code: "7.1",
        title: "Mini Project Planning",
        estimate: "1–2 study sessions",
      },
      {
        id: "prog-7-2",
        code: "7.2",
        title: "Building a Simple App",
        estimate: "2–4 study sessions",
      },
      {
        id: "prog-7-3",
        code: "7.3",
        title: "Polishing UX & UI",
        estimate: "2–3 study sessions",
      },
      {
        id: "prog-7-4",
        code: "7.4",
        title: "Connecting a Project into GAIA",
        estimate: "2–3 study sessions",
      },
    ],
  },
];

const totalLessons = sections.reduce(
  (sum, section) => sum + section.lessons.length,
  0
);

export default function ProgrammingTrackPage() {
  const { isLessonCompleted, toggleLessonCompleted, markStudyVisit } =
    useAcademyProgress();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  useEffect(() => {
    markStudyVisit("programming");
  }, [markStudyVisit]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActiveLessonId(hash);
    }
  }, []);

  const allLessons: Lesson[] = sections.flatMap((section) => section.lessons);
  const activeLesson =
    activeLessonId && allLessons.find((l) => l.id === activeLessonId);

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
          Total planned lessons:{" "}
          <span className="gaia-strong">{totalLessons}</span>
        </p>
      </header>

      <section className="space-y-4">
        {sections.map((section) => (
          <article
            key={section.id}
            className="rounded-2xl gaia-panel-soft p-4 sm:p-5 shadow-sm border border-white/5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] gaia-muted">
              {section.label}
            </p>
            <h2 className="mt-1 text-sm font-semibold gaia-strong">
              {section.title}
            </h2>
            <p className="mt-2 text-xs gaia-muted">{section.focus}</p>

      <ul className="mt-3 space-y-1.5 text-xs gaia-muted">
        {section.lessons.map((lesson) => (
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
            <span className="text-[11px]">{lesson.estimate}</span>
          </li>
        ))}
      </ul>
    </article>
  ))}
</section>
      <section className="mt-4">
        <div className="rounded-2xl gaia-panel-soft p-4 sm:p-5 shadow-sm border border-dashed border-white/10">
          <p className="text-xs gaia-muted">
            Below this structure, your existing study view can live. For now,
            it&apos;s just connected as a placeholder so you can keep using what
            you already have while this structure grows.
          </p>
          <div className="mt-3 rounded-xl bg-black/20 p-3">
            <ClientView />
          </div>
        </div>
      </section>
    </main>
  );
}
