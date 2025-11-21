"use client";

import { useMemo, useState } from "react";
import CodePlayground from "../components/CodePlayground";

type TabId = "study" | "quiz" | "practice";

type ProgrammingLessonContentProps = {
  lessonId: string;
  isCompleted: boolean;
  onLessonCompleted: () => void;
};

type QuizOption = {
  id: string;
  label: string;
};

type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
};

type QuizConfig = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

function getQuizForLesson(lessonId: string): QuizConfig | null {
  switch (lessonId) {
    case "1.1":
      return {
        id: "quiz-1-1",
        title: "Check your understanding of how the web works",
        questions: [
          {
            id: "q1",
            prompt: "When you type a URL and press Enter, what is the browser actually doing?",
            options: [
              { id: "q1-a", label: "It opens the file directly from your computer." },
              { id: "q1-b", label: "It sends a request over the network to a server, then shows the response it gets back." },
              { id: "q1-c", label: "It asks GAIA for the page and GAIA sends it." },
              { id: "q1-d", label: "It just reloads the same page every time." },
            ],
            correctOptionId: "q1-b",
            explanation:
              "The browser is a client. It sends an HTTP request over the network to a server, which sends back a response (HTML, JSON, etc.). The browser then renders that response.",
          },
          {
            id: "q2",
            prompt: "What is HTML mainly responsible for?",
            options: [
              { id: "q2-a", label: "Styling and colors" },
              { id: "q2-b", label: "Storing data in a database" },
              { id: "q2-c", label: "Structure and meaning of the content" },
              { id: "q2-d", label: "Handling user clicks and keyboard input" },
            ],
            correctOptionId: "q2-c",
            explanation:
              "HTML defines the structure and meaning of the content: headings, paragraphs, lists, links, etc.",
          },
          {
            id: "q3",
            prompt: "Which of these is the best description of CSS?",
            options: [
              { id: "q3-a", label: "The language that defines logic and user interaction." },
              { id: "q3-b", label: "The language that defines structure and content." },
              { id: "q3-c", label: "The language that defines the visual presentation (layout, colors, spacing)." },
              { id: "q3-d", label: "A database language for saving information." },
            ],
            correctOptionId: "q3-c",
            explanation: "CSS controls how things look: layout, colors, typography, spacing, etc.",
          },
          {
            id: "q4",
            prompt: "Where does JavaScript run in a normal web app?",
            options: [
              { id: "q4-a", label: "Only on the server" },
              { id: "q4-b", label: "Inside the browser, and sometimes on the server too (for example with Node.js)." },
              { id: "q4-c", label: "Inside the database" },
              { id: "q4-d", label: "It does not actually run, it is only for comments." },
            ],
            correctOptionId: "q4-b",
            explanation:
              "JavaScript can run in the browser (frontend) and also on the server (backend, like Node.js), but in this track we start with the browser.",
          },
        ],
      };
    case "1.2":
      return {
        id: "quiz-1-2",
        title: "Check your understanding of tools and setup",
        questions: [
          {
            id: "q1",
            prompt: "What is the main job of a code editor like VS Code?",
            options: [
              { id: "q1-a", label: "To run your entire application in production." },
              { id: "q1-b", label: "To help you write, navigate, and manage your code files comfortably." },
              { id: "q1-c", label: "To act as a replacement for the browser." },
              { id: "q1-d", label: "To store your backups for you." },
            ],
            correctOptionId: "q1-b",
            explanation:
              "The editor is your workspace. It helps you write and organize code, but it is not the browser, server, or backup system.",
          },
          {
            id: "q2",
            prompt: "Why do we use Git in our workflow?",
            options: [
              { id: "q2-a", label: "To change the colors of our website." },
              { id: "q2-b", label: "To track changes, create history, and safely experiment without losing work." },
              { id: "q2-c", label: "To make websites load faster." },
              { id: "q2-d", label: "To host images and videos." },
            ],
            correctOptionId: "q2-b",
            explanation:
              "Git is version control: it keeps history of your changes, lets you go back in time, and experiment safely in branches.",
          },
          {
            id: "q3",
            prompt: "What is the terminal mainly used for in web development?",
            options: [
              { id: "q3-a", label: "Browsing social media without a browser." },
              { id: "q3-b", label: "Running commands like npm, git, and local dev servers." },
              { id: "q3-c", label: "Editing images and videos." },
              { id: "q3-d", label: "It has no real use; it is just for hackers." },
            ],
            correctOptionId: "q3-b",
            explanation:
              "The terminal is where you run commands: installing dependencies, starting dev servers, using Git, running linters, etc.",
          },
          {
            id: "q4",
            prompt: "Why is it important to keep your project in a dedicated folder (workspace)?",
            options: [
              { id: "q4-a", label: "Because VS Code refuses to open files from other folders." },
              { id: "q4-b", label: "So tools like Git, linters, and dev servers know exactly which files belong to this project." },
              { id: "q4-c", label: "It makes the website faster in production." },
              { id: "q4-d", label: "It does not matter at all; any file can be anywhere." },
            ],
            correctOptionId: "q4-b",
            explanation:
              "Keeping everything in a project folder makes it easy for tools to understand the structure and for you to keep things tidy.",
          },
        ],
      };
    case "1.3":
      return {
        id: "quiz-1-3",
        title: "Check your plan for learning without burning out",
        questions: [
          {
            id: "q1",
            prompt: "What is the main idea of working in short, focused sessions (like 30–60 minutes)?",
            options: [
              { id: "q1-a", label: "To finish the whole track in one week." },
              { id: "q1-b", label: "To give your brain a clear sprint, then rest, so you can come back again tomorrow." },
              { id: "q1-c", label: "To avoid ever taking breaks." },
              { id: "q1-d", label: "To impress other people with how long you study." },
            ],
            correctOptionId: "q1-b",
            explanation:
              "Short, focused sessions plus rest is sustainable. It is designed so you can keep coming back instead of burning out.",
          },
          {
            id: "q2",
            prompt: "When you feel stuck on a lesson, what is the healthiest first step?",
            options: [
              { id: "q2-a", label: "Insult yourself and force yourself to stay longer." },
              { id: "q2-b", label: "Close everything and never come back." },
              { id: "q2-c", label: "Take a short break, breathe, maybe walk, then come back and ask smaller questions." },
              { id: "q2-d", label: "Immediately start a completely new topic." },
            ],
            correctOptionId: "q2-c",
            explanation:
              "A small reset plus breaking the problem into smaller questions keeps you moving without destroying your mood.",
          },
          {
            id: "q3",
            prompt: "Why is tracking your progress (like GAIA does) helpful for motivation?",
            options: [
              { id: "q3-a", label: "Because then you can compare yourself to everyone else online." },
              { id: "q3-b", label: "Because you can see proof that you are moving, even if it is one small lesson at a time." },
              { id: "q3-c", label: "It is not helpful at all." },
              { id: "q3-d", label: "Only so others can judge your numbers." },
            ],
            correctOptionId: "q3-b",
            explanation:
              "Progress tracking is for you: it reminds you that every small session is real movement, not just nothing.",
          },
        ],
      };
    default:
      return null;
  }
}

function getStudyDescription(lessonId: string): { title: string; paragraphs: string[]; videoUrl?: string } {
  switch (lessonId) {
    case "1.1":
      return {
        title: "How the Web and Browsers Work",
        paragraphs: [
          "In this first lesson, you are not expected to code yet. The goal is to see the whole map before we walk the road.",
          "When you type a URL in your browser, you are acting as a client. The browser sends a request over the internet to a server. That server finds the right data (a page, JSON, etc.), and sends a response back. Your browser then takes that response and renders it into something you can see and interact with.",
          "For GAIA, this matters because everything you will build — from a tiny HTML page to a full Next.js plus Supabase app — is built on top of this simple idea: clients send requests, servers send responses.",
          "In the video below, listen for these ideas: client versus server, what a request/response is, and the difference between HTML, CSS, and JavaScript. Do not worry if you do not understand every word — your only task is to get a general picture.",
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      };
    case "1.2":
      return {
        title: "Your Tools: VS Code, Git, and the Terminal",
        paragraphs: [
          "In this lesson, you will connect the abstract idea of web development to concrete tools on your machine. You do not need to master them today; you only need to become familiar with their names and roles.",
          "VS Code (or another editor) is where you write and navigate your code. It gives you syntax highlighting, search, extensions, and a tree of your files so you never feel lost.",
          "Git is your time machine. It remembers your changes, lets you create checkpoints (commits), and gives you the freedom to experiment without fear of losing everything.",
          "The terminal (or command line) is where you run commands: starting dev servers, installing dependencies, using Git, and running scripts. At first it can feel scary, but you will mostly repeat a small set of commands until they feel natural.",
          "For GAIA, these tools are your base camp. Once they feel familiar, every future lesson (HTML, CSS, JS, React, Supabase) will feel much lighter.",
        ],
      };
    case "1.3":
      return {
        title: "How to Learn Programming Without Burning Out",
        paragraphs: [
          "This lesson is about your energy and your relationship with learning. You are not a robot. You are Sasa, with a job, family, and a life that is already full.",
          "Instead of trying to be perfect, you will use short, honest sessions — like 30, 45, or 60 minutes — and then stop. The goal is to come back again tomorrow, not to destroy yourself in one heroic night.",
          "You will also learn to separate study time from output time. Study time is for understanding and following along. Output time is for building small things, like GAIA modules, with the knowledge you collected.",
          "Feeling stuck, tired, or emotional does not mean you are bad. It means you are human. The skill we are building is to pause, breathe, adjust the plan, and then continue — slowly but stubbornly.",
          "This mindset is what will carry you from the first HTML tag all the way to connected GAIA apps and, later, your accounting center.",
        ],
      };
    default:
      return {
        title: "Lesson coming soon",
        paragraphs: [
          "This lesson path is already planned in your GAIA roadmap, but the detailed content has not been written yet.",
          "For now, you can use this slot as a reminder that you are supposed to study something here, and you can add your own notes in the practice area.",
        ],
      };
  }
}

function getPracticePrompt(lessonId: string): { title: string; description: string; instructions: string[] } {
  switch (lessonId) {
    case "1.1":
      return {
        title: "Describe the journey of a web request",
        description:
          "Here we want to check that you can explain in your own words what is happening when you load a page. This is not about perfect English. It is about you understanding the flow.",
        instructions: [
          "In the box below, write a short explanation (at least 5–6 lines) of what happens when you type a URL in the browser and press Enter.",
          "Mention: the browser, the server, the request, the response, and HTML/CSS/JS.",
          "Imagine you are explaining this to a future version of yourself who forgot everything.",
        ],
      };
    case "1.2":
      return {
        title: "Describe your tools and create your workspace plan",
        description:
          "We want you to be clear about what tools you will use and how you will open them, so there is less friction next time you sit to study.",
        instructions: [
          "In the box below, write which editor you will use (for example VS Code) and where your GAIA projects will live on your machine (for example C:\\gaia or /home/sasa/gaia).",
          "Write 3–5 sentences describing what Git will do for you and why you will use it, even if you are the only person working on GAIA.",
          "Write 2–3 sentences about the terminal: which commands you expect to run often (npm run dev, git status, etc.).",
        ],
      };
    case "1.3":
      return {
        title: "Design your realistic study rhythm",
        description:
          "Here you will transform your ideas about learning into a small contract with yourself that GAIA and I will help you respect.",
        instructions: [
          "Write down your ideal weekly rhythm: for example, three days programming (30 / 45 / 60 minutes) and three days accounting, plus Friday for self-repair.",
          "Write, honestly, what usually breaks this rhythm for you (tiredness, mood, family, work). Do not judge yourself; just describe.",
          "Finally, write 3 small rules you promise to follow when you feel low (for example: I will still open GAIA, I will do 10–15 minutes, and then I am allowed to rest with no guilt).",
        ],
      };
    default:
      return {
        title: "Practice coming soon",
        description:
          "This lesson will get a concrete coding or writing practice later. For now, you can write notes here or play in the code playground.",
        instructions: [
          "Write what you already know about this topic.",
          "Add any questions you have so future-you and GAIA can answer them later.",
        ],
      };
  }
}

const MIN_PRACTICE_LENGTH = 250;

const ProgrammingLessonContent = ({
  lessonId,
  isCompleted,
  onLessonCompleted,
}: ProgrammingLessonContentProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("study");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [practiceText, setPracticeText] = useState("");
  const [practiceStatus, setPracticeStatus] = useState<"idle" | "error" | "success">(
    "idle"
  );

  const quizConfig = useMemo(() => getQuizForLesson(lessonId), [lessonId]);
  const study = useMemo(() => getStudyDescription(lessonId), [lessonId]);
  const practice = useMemo(() => getPracticePrompt(lessonId), [lessonId]);

  const allAnswered =
    !!quizConfig &&
    quizConfig.questions.every((q) => quizAnswers[q.id] && quizAnswers[q.id].length > 0);

  const allCorrect =
    !!quizConfig &&
    quizConfig.questions.every((q) => quizAnswers[q.id] === q.correctOptionId);

  const handleQuizSubmit = () => {
    if (!quizConfig) return;
    setQuizSubmitted(true);
  };

  const handlePracticeCheck = () => {
    if (practiceText.trim().length < MIN_PRACTICE_LENGTH) {
      setPracticeStatus("error");
      return;
    }
    setPracticeStatus("success");
    if (allCorrect && !isCompleted) {
      onLessonCompleted();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["study", "quiz", "practice"] as TabId[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] sm:text-xs font-semibold border ${
              activeTab === tab
                ? "bg-white text-black border-white"
                : "bg-black/40 text-white border-white/20 hover:border-white/40"
            }`}
          >
            {tab === "study" && "1 · Study"}
            {tab === "quiz" && "2 · Quiz"}
            {tab === "practice" && "3 · Practice"}
          </button>
        ))}
      </div>

      {activeTab === "study" && (
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-semibold gaia-strong">
            {study.title}
          </h3>
          {study.paragraphs.map((p, idx) => (
            <p key={idx} className="text-xs sm:text-sm gaia-muted">
              {p}
            </p>
          ))}
          {study.videoUrl && (
            <div className="mt-3 space-y-2">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <iframe
                  src={study.videoUrl}
                  title="Lesson video"
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="text-[11px] sm:text-xs gaia-muted">
                If the video is blocked by your browser or network, you can copy this URL
                and open it directly in YouTube:{" "}
                <span className="underline break-all">{study.videoUrl}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "quiz" && (
        <div className="space-y-3">
          {quizConfig ? (
            <>
              <h3 className="text-sm sm:text-base font-semibold gaia-strong">
                {quizConfig.title}
              </h3>
              <div className="space-y-3">
                {quizConfig.questions.map((q, index) => {
                  const selected = quizAnswers[q.id];
                  const isCorrect =
                    selected && selected === q.correctOptionId;
                  const isWrong =
                    quizSubmitted &&
                    selected &&
                    selected !== q.correctOptionId;

                  return (
                    <div
                      key={q.id}
                      className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4 space-y-2"
                    >
                      <p className="text-xs sm:text-sm gaia-strong">
                        Q{index + 1}. {q.prompt}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt) => (
                          <label
                            key={opt.id}
                            className="flex items-center gap-2 text-[11px] sm:text-xs gaia-muted cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={q.id}
                              className="h-3 w-3"
                              checked={selected === opt.id}
                              onChange={() => {
                                setQuizAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: opt.id,
                                }));
                                setQuizSubmitted(false);
                              }}
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                      {quizSubmitted && (
                        <p
                          className={`text-[11px] sm:text-xs ${
                            isCorrect
                              ? "text-emerald-300"
                              : isWrong
                              ? "text-amber-300"
                              : "gaia-muted"
                          }`}
                        >
                          {isCorrect
                            ? "Correct."
                            : "Not quite. Read the explanation and try to see the pattern."}
                        </p>
                      )}
                      {quizSubmitted && (
                        <p className="text-[11px] sm:text-xs gaia-muted">
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleQuizSubmit}
                  disabled={!quizConfig || !allAnswered}
                  className="inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] sm:text-xs font-semibold bg-white text-black disabled:bg-white/30 disabled:text-black/50"
                >
                  Check my answers
                </button>
                {quizSubmitted && quizConfig && allCorrect && (
                  <p className="text-[11px] sm:text-xs text-emerald-300">
                    Great. You&apos;re ready to move to practice.
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="text-xs sm:text-sm gaia-muted">
              A quiz for this lesson is not ready yet. You can switch back to Study or
              Practice for now.
            </p>
          )}
        </div>
      )}

      {activeTab === "practice" && (
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-semibold gaia-strong">
            {practice.title}
          </h3>
          <p className="text-xs sm:text-sm gaia-muted">{practice.description}</p>
          <ul className="list-disc pl-4 space-y-1">
            {practice.instructions.map((item, idx) => (
              <li key={idx} className="text-[11px] sm:text-xs gaia-muted">
                {item}
              </li>
            ))}
          </ul>

          <textarea
            className="mt-2 h-32 w-full rounded-xl border border-white/15 bg-black/40 p-2 text-xs sm:text-sm text-white outline-none focus:border-white/40"
            placeholder="Write your explanation or notes here..."
            value={practiceText}
            onChange={(e) => {
              setPracticeText(e.target.value);
              setPracticeStatus("idle");
            }}
          />

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handlePracticeCheck}
              className="inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] sm:text-xs font-semibold bg-white text-black"
            >
              Check practice &amp; mark lesson
            </button>
            <p className="text-[11px] sm:text-xs gaia-muted">
              {practiceText.trim().length}/{MIN_PRACTICE_LENGTH} characters
            </p>
          </div>

          {practiceStatus === "error" && (
            <p className="text-[11px] sm:text-xs text-amber-300">
              Write a bit more so future-you can really understand it. Aim for at least{" "}
              {MIN_PRACTICE_LENGTH} characters.
            </p>
          )}
          {practiceStatus === "success" && (
            <p className="text-[11px] sm:text-xs text-emerald-300">
              Nice work. This lesson is now marked as completed for you.
            </p>
          )}

          <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-3">
            <p className="text-[11px] sm:text-xs gaia-muted mb-2">
              Optional: play in the code playground for this lesson (for example, try
              writing a tiny HTML page that says “Hello Sasa”.
            </p>
            <CodePlayground
              language="html"
              initialCode={`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello Sasa</title>
  </head>
  <body>
    <h1>Hello Sasa 👋</h1>
    <p>This is your Academy practice playground.</p>
  </body>
</html>`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgrammingLessonContent;
