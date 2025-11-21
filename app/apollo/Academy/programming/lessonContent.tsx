"use client";

import { useMemo, useState } from "react";
import CodePlayground from "../components/CodePlayground";

type TabId = "study" | "quiz" | "practice";

type ProgrammingLessonContentProps = {
  lessonCode: string;
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

type PracticeCheckResult = {
  ok: boolean;
  message?: string;
};

function getQuizForLesson(lessonCode: string): QuizConfig | null {
  switch (lessonCode) {
    case "1.1":
      return {
        id: "quiz-1-1",
        title: "Check your understanding of how the web works",
        questions: [
          {
            id: "q1",
            prompt:
              "When you type a URL and press Enter, what is the browser actually doing?",
            options: [
              {
                id: "q1-a",
                label: "It opens the file directly from your computer.",
              },
              {
                id: "q1-b",
                label:
                  "It sends a request over the network to a server, then shows the response it gets back.",
              },
              {
                id: "q1-c",
                label: "It asks GAIA for the page and GAIA sends it.",
              },
              {
                id: "q1-d",
                label: "It just reloads the same page every time.",
              },
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
              {
                id: "q3-a",
                label: "The language that defines logic and user interaction.",
              },
              {
                id: "q3-b",
                label: "The language that defines structure and content.",
              },
              {
                id: "q3-c",
                label:
                  "The language that defines the visual presentation (layout, colors, spacing).",
              },
              {
                id: "q3-d",
                label: "A database language for saving information.",
              },
            ],
            correctOptionId: "q3-c",
            explanation:
              "CSS controls how things look: layout, colors, typography, spacing, etc.",
          },
          {
            id: "q4",
            prompt: "Where does JavaScript run in a normal web app?",
            options: [
              { id: "q4-a", label: "Only on the server" },
              {
                id: "q4-b",
                label:
                  "Inside the browser, and sometimes on the server too (for example with Node.js).",
              },
              { id: "q4-c", label: "Inside the database" },
              {
                id: "q4-d",
                label: "It does not actually run, it is only for comments.",
              },
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
              {
                id: "q1-a",
                label: "To run your entire application in production.",
              },
              {
                id: "q1-b",
                label:
                  "To help you write, navigate, and manage your code files comfortably.",
              },
              {
                id: "q1-c",
                label: "To act as a replacement for the browser.",
              },
              {
                id: "q1-d",
                label: "To store your backups for you.",
              },
            ],
            correctOptionId: "q1-b",
            explanation:
              "The editor is your workspace. It helps you write and organize code, but it is not the browser, server, or backup system.",
          },
          {
            id: "q2",
            prompt: "Why do we use Git in our workflow?",
            options: [
              {
                id: "q2-a",
                label: "To change the colors of our website.",
              },
              {
                id: "q2-b",
                label:
                  "To track changes, create history, and safely experiment without losing work.",
              },
              {
                id: "q2-c",
                label: "To make websites load faster.",
              },
              {
                id: "q2-d",
                label: "To host images and videos.",
              },
            ],
            correctOptionId: "q2-b",
            explanation:
              "Git is version control: it keeps history of your changes, lets you go back in time, and experiment safely in branches.",
          },
          {
            id: "q3",
            prompt: "What is the terminal mainly used for in web development?",
            options: [
              {
                id: "q3-a",
                label: "Browsing social media without a browser.",
              },
              {
                id: "q3-b",
                label: "Running commands like npm, git, and local dev servers.",
              },
              {
                id: "q3-c",
                label: "Editing images and videos.",
              },
              {
                id: "q3-d",
                label: "It has no real use; it is just for hackers.",
              },
            ],
            correctOptionId: "q3-b",
            explanation:
              "The terminal is where you run commands: installing dependencies, starting dev servers, using Git, running linters, etc.",
          },
          {
            id: "q4",
            prompt:
              "Why is it important to keep your project in a dedicated folder (workspace)?",
            options: [
              {
                id: "q4-a",
                label:
                  "Because VS Code refuses to open files from other folders.",
              },
              {
                id: "q4-b",
                label:
                  "So tools like Git, linters, and dev servers know exactly which files belong to this project.",
              },
              {
                id: "q4-c",
                label: "It makes the website faster in production.",
              },
              {
                id: "q4-d",
                label: "It does not matter at all; any file can be anywhere.",
              },
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
            prompt:
              "What is the main idea of working in short, focused sessions (like 30–60 minutes)?",
            options: [
              {
                id: "q1-a",
                label: "To finish the whole track in one week.",
              },
              {
                id: "q1-b",
                label:
                  "To give your brain a clear sprint, then rest, so you can come back again tomorrow.",
              },
              {
                id: "q1-c",
                label: "To avoid ever taking breaks.",
              },
              {
                id: "q1-d",
                label: "To impress other people with how long you study.",
              },
            ],
            correctOptionId: "q1-b",
            explanation:
              "Short, focused sessions plus rest is sustainable. It is designed so you can keep coming back instead of burning out.",
          },
          {
            id: "q2",
            prompt:
              "When you feel stuck on a lesson, what is the healthiest first step?",
            options: [
              {
                id: "q2-a",
                label: "Insult yourself and force yourself to stay longer.",
              },
              {
                id: "q2-b",
                label: "Close everything and never come back.",
              },
              {
                id: "q2-c",
                label:
                  "Take a short break, breathe, maybe walk, then come back and ask smaller questions.",
              },
              {
                id: "q2-d",
                label: "Immediately start a completely new topic.",
              },
            ],
            correctOptionId: "q2-c",
            explanation:
              "A small reset plus breaking the problem into smaller questions keeps you moving without destroying your mood.",
          },
          {
            id: "q3",
            prompt:
              "Why is tracking your progress (like GAIA does) helpful for motivation?",
            options: [
              {
                id: "q3-a",
                label:
                  "Because then you can compare yourself to everyone else online.",
              },
              {
                id: "q3-b",
                label:
                  "Because you can see proof that you are moving, even if it is one small lesson at a time.",
              },
              {
                id: "q3-c",
                label: "It is not helpful at all.",
              },
              {
                id: "q3-d",
                label: "Only so others can judge your numbers.",
              },
            ],
            correctOptionId: "q3-b",
            explanation:
              "Progress tracking is for you: it reminds you that every small session is real movement, not just nothing.",
          },
        ],
      };
    case "2.1":
      return {
        id: "quiz-2-1",
        title: "Check your understanding of basic HTML structure",
        questions: [
          {
            id: "q1",
            prompt:
              "What is the correct order of the main HTML tags in a page?",
            options: [
              {
                id: "q1-a",
                label: "<html> inside <body> inside <head>",
              },
              {
                id: "q1-b",
                label: "<head> and <body> are siblings inside <html>",
              },
              {
                id: "q1-c",
                label: "<body> and <html> are inside <head>",
              },
              {
                id: "q1-d",
                label: "There is no required structure.",
              },
            ],
            correctOptionId: "q1-b",
            explanation:
              "The root is <html>, and inside it you have two main children: <head> and <body>.",
          },
          {
            id: "q2",
            prompt: "Which tag is the best for the main title of the page?",
            options: [
              { id: "q2-a", label: "<p>" },
              { id: "q2-b", label: "<h1>" },
              { id: "q2-c", label: "<div>" },
              { id: "q2-d", label: "<span>" },
            ],
            correctOptionId: "q2-b",
            explanation:
              "<h1> is the main heading of the page. It gives structure and helps screen readers and search engines understand the page.",
          },
          {
            id: "q3",
            prompt: "What is the purpose of the <head> element?",
            options: [
              {
                id: "q3-a",
                label: "To show visible content like text and images.",
              },
              {
                id: "q3-b",
                label:
                  "To contain metadata, title, and links to styles or scripts.",
              },
              {
                id: "q3-c",
                label: "To display the main navigation menu.",
              },
              {
                id: "q3-d",
                label: "It has no purpose, it is optional and unused.",
              },
            ],
            correctOptionId: "q3-b",
            explanation:
              "The <head> contains information about the document itself: title, meta tags, links to CSS, etc.",
          },
        ],
      };
    case "2.2":
      return {
        id: "quiz-2-2",
        title: "Check your understanding of semantic HTML",
        questions: [
          {
            id: "q1",
            prompt:
              "Which tag is most appropriate for the main navigation links of a site?",
            options: [
              { id: "q1-a", label: "<div>" },
              { id: "q1-b", label: "<nav>" },
              { id: "q1-c", label: "<section>" },
              { id: "q1-d", label: "<article>" },
            ],
            correctOptionId: "q1-b",
            explanation:
              "<nav> clearly tells the browser and assistive tech that this area holds navigation links.",
          },
          {
            id: "q2",
            prompt:
              "If you have a block of content that could stand alone (like a blog post), which tag is best?",
            options: [
              { id: "q2-a", label: "<article>" },
              { id: "q2-b", label: "<section>" },
              { id: "q2-c", label: "<aside>" },
              { id: "q2-d", label: "<span>" },
            ],
            correctOptionId: "q2-a",
            explanation:
              "<article> is for self-contained pieces of content that could be reused or syndicated.",
          },
          {
            id: "q3",
            prompt:
              "Why does semantic HTML matter for GAIA and for future-you?",
            options: [
              {
                id: "q3-a",
                label:
                  "It makes the code bigger and more complex, which is fun.",
              },
              {
                id: "q3-b",
                label:
                  "It makes the structure clearer, improves accessibility, and makes it easier for tools (and your brain) to understand pages.",
              },
              {
                id: "q3-c",
                label:
                  "It is required or the browser will not render the page.",
              },
              {
                id: "q3-d",
                label: "It is only for SEO and does not affect you.",
              },
            ],
            correctOptionId: "q3-b",
            explanation:
              "Semantic HTML is about meaning. It makes your pages easier to maintain, extend, and connect into systems like GAIA.",
          },
        ],
      };
    case "2.3":
      return {
        id: "quiz-2-3",
        title: "Check your understanding of links and navigation",
        questions: [
          {
            id: "q1",
            prompt: "Which tag is used to create a hyperlink in HTML?",
            options: [
              { id: "q1-a", label: "<link>" },
              { id: "q1-b", label: "<a>" },
              { id: "q1-c", label: "<href>" },
              { id: "q1-d", label: "<nav>" },
            ],
            correctOptionId: "q1-b",
            explanation:
              "The <a> tag (anchor) is used to create hyperlinks. The href attribute tells the browser where the link goes.",
          },
          {
            id: "q2",
            prompt: "What is the purpose of the href attribute on an <a> tag?",
            options: [
              { id: "q2-a", label: "To set the hover color" },
              { id: "q2-b", label: "To specify the destination URL or path" },
              { id: "q2-c", label: "To make the text bold" },
              { id: "q2-d", label: "To change the font family" },
            ],
            correctOptionId: "q2-b",
            explanation:
              "href is short for 'hypertext reference'. It tells the browser where this link should take the user.",
          },
          {
            id: "q3",
            prompt:
              "Which is a good example of a relative link inside a GAIA-style project?",
            options: [
              { id: "q3-a", label: '<a href="https://gaia.com">GAIA</a>' },
              {
                id: "q3-b",
                label: '<a href="/apollo/academy">Academy</a>',
              },
              {
                id: "q3-c",
                label: '<a href="C:\\Users\\file.html">File</a>',
              },
              {
                id: "q3-d",
                label: '<a href="mailto:sasa@example.com">Mail</a>',
              },
            ],
            correctOptionId: "q3-b",
            explanation:
              "In a web app, /apollo/academy is a relative path on the same site. It is how you link between GAIA pages.",
          },
        ],
      };
    case "2.4":
      return {
        id: "quiz-2-4",
        title: "Check your understanding of images and alt text",
        questions: [
          {
            id: "q1",
            prompt: "Which tag is used to display an image in HTML?",
            options: [
              { id: "q1-a", label: "<image>" },
              { id: "q1-b", label: "<img>" },
              { id: "q1-c", label: "<pic>" },
              { id: "q1-d", label: "<src>" },
            ],
            correctOptionId: "q1-b",
            explanation:
              "The <img> tag is used to embed images. It is a self-closing tag that uses src and alt attributes.",
          },
          {
            id: "q2",
            prompt: "Why is the alt attribute important on <img>?",
            options: [
              { id: "q2-a", label: "It makes the image bigger" },
              { id: "q2-b", label: "It is required by the browser" },
              {
                id: "q2-c",
                label:
                  "It provides a text description for screen readers and when the image cannot load.",
              },
              { id: "q2-d", label: "It sets the file size of the image" },
            ],
            correctOptionId: "q2-c",
            explanation:
              "alt text is critical for accessibility. It tells people using screen readers what the image represents, and it appears when the image fails to load.",
          },
          {
            id: "q3",
            prompt:
              "Which of these is the best alt text for a GAIA logo image?",
            options: [
              { id: "q3-a", label: "image1234" },
              { id: "q3-b", label: "logo" },
              { id: "q3-c", label: "GAIA leaf logo" },
              { id: "q3-d", label: "" },
            ],
            correctOptionId: "q3-c",
            explanation:
              "Good alt text describes the content and purpose: 'GAIA leaf logo' is clear and specific without being too long.",
          },
        ],
      };
    case "2.5":
      return {
        id: "quiz-2-5",
        title: "Check your understanding of HTML forms",
        questions: [
          {
            id: "q1",
            prompt:
              "Which tag wraps a group of inputs that are submitted together?",
            options: [
              { id: "q1-a", label: "<input>" },
              { id: "q1-b", label: "<label>" },
              { id: "q1-c", label: "<form>" },
              { id: "q1-d", label: "<fieldset>" },
            ],
            correctOptionId: "q1-c",
            explanation:
              "<form> groups inputs together and defines where the data will be sent when the user submits.",
          },
          {
            id: "q2",
            prompt: "What is the main purpose of a <label> element?",
            options: [
              { id: "q2-a", label: "To display helper text inside an input" },
              {
                id: "q2-b",
                label:
                  "To provide a caption that is associated with a specific input field.",
              },
              { id: "q2-c", label: "To store the value of an input" },
              { id: "q2-d", label: "To submit the form" },
            ],
            correctOptionId: "q2-b",
            explanation:
              "A <label> is tied to an input by id/for or by wrapping. It makes forms easier to use, especially for screen readers.",
          },
          {
            id: "q3",
            prompt:
              "Which attribute on <input> defines what kind of data the field expects?",
            options: [
              { id: "q3-a", label: "name" },
              { id: "q3-b", label: "type" },
              { id: "q3-c", label: "value" },
              { id: "q3-d", label: "placeholder" },
            ],
            correctOptionId: "q3-b",
            explanation:
              "The type attribute (text, email, password, number, etc.) tells the browser how to treat and validate the input.",
          },
        ],
      };
    default:
      return null;
  }
}

function getStudyDescription(lessonCode: string): {
  title: string;
  paragraphs: string[];
  videoUrl?: string;
} {
  switch (lessonCode) {
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
    case "2.1":
      return {
        title: "HTML Foundations: Skeleton of a Page",
        paragraphs: [
          "HTML is the skeleton of every web page. Before you think about colors or animations, you need a clear structure: where is the title, where is the content, where is the navigation.",
          "In this lesson, you will focus on the basic structure: <!DOCTYPE html>, <html>, <head>, and <body>. This is the frame that every modern page still uses, including GAIA.",
          "You will also see how headings (<h1>, <h2>, …), paragraphs (<p>), and simple lists (<ul>, <li>) help you express the logical order of your content.",
          "The goal is not to write something beautiful yet. The goal is to write something that is clean, valid, and easy to read — for you and for GAIA.",
        ],
      };
    case "2.2":
      return {
        title: "Semantic HTML: Giving Meaning to Structure",
        paragraphs: [
          "Once you know the basic tags, the next step is semantics: using tags that describe the role of each part of your page.",
          "Instead of wrapping everything in <div>, you can use <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer>. These tags tell a story about your page structure.",
          "Semantic HTML helps screen readers, search engines, and tools like GAIA understand your layout. It also helps future-you quickly see what is going on without reading every line.",
          "In this lesson, you will look at a small page and practice choosing semantic tags that match the meaning of each block.",
        ],
      };
    case "2.3":
      return {
        title: "Links and Navigation: Connecting Your Pages",
        paragraphs: [
          "HTML pages become powerful when they are connected. Links let you move between sections of GAIA, between modules, and between completely different sites.",
          "The <a> tag (anchor) plus the href attribute creates a clickable link. The text inside <a> is what the user sees and clicks.",
          "You can link to external sites (like a YouTube video or Mahesh Hamadani tutorial) with full URLs starting with http/https. You can also link between GAIA pages using relative paths like /apollo/academy.",
          "In this lesson, you will focus on building simple navigation links and understanding when to use absolute versus relative paths.",
        ],
      };
    case "2.4":
      return {
        title: "Images and Alt Text: Visuals with Meaning",
        paragraphs: [
          "Images are a big part of GAIA: logos, avatars, gallery items, thumbnails. The <img> tag lets you embed an image file into your page.",
          "Every <img> should have a src attribute (where the file lives) and an alt attribute (a short description of what the image is).",
          "Alt text is not decoration. It is how people using screen readers understand your page, and it also appears when images fail to load.",
          "In this lesson, you will practice writing <img> tags with good alt text that clearly describes the image, especially for important UI elements like logos and icons.",
        ],
      };
    case "2.5":
      return {
        title: "HTML Forms: Collecting Data from Users",
        paragraphs: [
          "Forms are how users talk back to your app. In GAIA-style apps, forms will be used to add logs, update health metrics, save financial data, and more.",
          "A form is usually built from a <form> element containing <label> and <input> (or other form fields like <textarea>, <select>, etc.).",
          "Labels should be clearly connected to inputs so users and screen readers know what each field is about.",
          "In this lesson, you will build a tiny form, like a 'New GAIA note' or 'Daily summary' form, with proper labels and input types.",
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

function getPracticePrompt(lessonCode: string): {
  title: string;
  description: string;
  instructions: string[];
} {
  switch (lessonCode) {
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
    case "2.1":
      return {
        title: "Build a clean HTML skeleton",
        description:
          "Now you will write a complete, simple HTML page by hand. Focus on structure and correctness, not on design.",
        instructions: [
          "In the practice box below, write a full HTML document with <!DOCTYPE html>, <html>, <head>, and <body>. In <head>, include a <title> like 'GAIA · HTML Foundations'.",
          "Inside <body>, create a main <h1> heading, at least two <h2> subheadings, some <p> paragraphs, and one unordered list (<ul>) with 3–5 items.",
          "When you are done, click 'Check practice & mark lesson'. GAIA will quickly check if the required tags exist before it marks the lesson completed.",
        ],
      };
    case "2.2":
      return {
        title: "Refactor a layout using semantic tags",
        description:
          "Here you will practice replacing generic containers with semantic HTML to make the structure clearer.",
        instructions: [
          "In the practice box below, write a simple layout that represents a page with header, navigation, main content area, and footer using semantic tags.",
          "Use <header>, <nav>, <main>, <section> or <article>, and <footer> at minimum.",
          "When you are done, click 'Check practice & mark lesson'. GAIA will check for these semantic tags before it marks the lesson completed.",
        ],
      };
    case "2.3":
      return {
        title: "Build a simple GAIA-style navigation",
        description:
          "Now you will practice creating real links that could exist inside GAIA, both internal and external.",
        instructions: [
          "In the practice box below, write a small HTML snippet for a navigation area with at least three links.",
          "Include at least one internal link (for example /apollo/academy or /health) and at least one external link (for example a YouTube tutorial).",
          "When you are done, click 'Check practice & mark lesson'. GAIA will check that you are actually using <a> tags with href attributes.",
        ],
      };
    case "2.4":
      return {
        title: "Embed images with meaningful alt text",
        description:
          "Here you will practice writing <img> tags that would make sense inside GAIA, with good alt text.",
        instructions: [
          "In the practice box below, write HTML that includes at least two <img> elements.",
          "Give each image a realistic src (you can use placeholder paths like /images/gaia-logo.png) and a clear alt description (for example 'GAIA leaf logo').",
          "When you are done, click 'Check practice & mark lesson'. GAIA will check that you used <img> with alt attributes.",
        ],
      };
    case "2.5":
      return {
        title: "Create a tiny GAIA note form",
        description:
          "Here you will build a basic HTML form that could later be wired into GAIA for daily notes or logs.",
        instructions: [
          "In the practice box below, write HTML for a small form with at least one text input and one textarea.",
          "Use <form>, <label>, and <input> with a type like text or email. Add a <button> to submit.",
          "When you are done, click 'Check practice & mark lesson'. GAIA will check that you used form, label, and input correctly.",
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

function validatePracticeCode(
  lessonCode: string,
  content: string
): PracticeCheckResult {
  const src = content.toLowerCase();

  if (lessonCode === "2.1") {
    const required = [
      "<!doctype html",
      "<html",
      "<head",
      "<body",
      "<h1",
      "<h2",
      "<ul",
      "<li",
    ];
    const missing = required.filter((snippet) => !src.includes(snippet));
    if (missing.length > 0) {
      return {
        ok: false,
        message:
          "Your HTML skeleton is missing some required pieces: " +
          missing.join(", "),
      };
    }
    return { ok: true };
  }

  if (lessonCode === "2.2") {
    const required = ["<header", "<nav", "<main", "<footer"];
    const missing = required.filter((snippet) => !src.includes(snippet));
    if (missing.length > 0) {
      return {
        ok: false,
        message:
          "Your semantic layout is missing some required tags: " +
          missing.join(", "),
      };
    }
    return { ok: true };
  }

  if (lessonCode === "2.3") {
    const required = ["<a", "href="];
    const missing = required.filter((snippet) => !src.includes(snippet));
    if (missing.length > 0) {
      return {
        ok: false,
        message:
          "Your navigation is missing some required link pieces: " +
          missing.join(", "),
      };
    }
    return { ok: true };
  }

  if (lessonCode === "2.4") {
    const required = ["<img", "alt="];
    const missing = required.filter((snippet) => !src.includes(snippet));
    if (missing.length > 0) {
      return {
        ok: false,
        message:
          "Your images are missing some required pieces: " + missing.join(", "),
      };
    }
    return { ok: true };
  }

  if (lessonCode === "2.5") {
    const required = ["<form", "<label", "<input"];
    const missing = required.filter((snippet) => !src.includes(snippet));
    if (missing.length > 0) {
      return {
        ok: false,
        message:
          "Your form is missing some required pieces: " + missing.join(", "),
      };
    }
    return { ok: true };
  }

  // For other lessons, any sufficiently long text is OK for now.
  return { ok: true };
}

const MIN_PRACTICE_LENGTH = 250;

const ProgrammingLessonContent = ({
  lessonCode,
  isCompleted,
  onLessonCompleted,
}: ProgrammingLessonContentProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("study");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [practiceText, setPracticeText] = useState("");
  const [practiceStatus, setPracticeStatus] = useState<
    "idle" | "error" | "success"
  >("idle");
  const [practiceMessage, setPracticeMessage] = useState<string | null>(null);

  const quizConfig = useMemo(() => getQuizForLesson(lessonCode), [lessonCode]);
  const study = useMemo(() => getStudyDescription(lessonCode), [lessonCode]);
  const practice = useMemo(() => getPracticePrompt(lessonCode), [lessonCode]);

  const allAnswered =
    !!quizConfig &&
    quizConfig.questions.every(
      (q) => quizAnswers[q.id] && quizAnswers[q.id].length > 0
    );

  const allCorrect =
    !!quizConfig &&
    quizConfig.questions.every((q) => quizAnswers[q.id] === q.correctOptionId);

  const handleQuizSubmit = () => {
    if (!quizConfig) return;
    setQuizSubmitted(true);
  };

  const handlePracticeCheck = () => {
    const trimmed = practiceText.trim();

    if (trimmed.length < MIN_PRACTICE_LENGTH) {
      setPracticeStatus("error");
      setPracticeMessage(
        `Write a bit more so future-you can really understand it. Aim for at least ${MIN_PRACTICE_LENGTH} characters.`
      );
      return;
    }

    const validation = validatePracticeCode(lessonCode, trimmed);
    if (!validation.ok) {
      setPracticeStatus("error");
      setPracticeMessage(
        validation.message ||
          "Something is still missing. Re-read the instructions and adjust your code/text."
      );
      return;
    }

    if (!allCorrect) {
      setPracticeStatus("error");
      setPracticeMessage(
        "Your practice looks good, but some quiz answers are still incorrect. Go back to the Quiz tab, review the explanations, and try again."
      );
      return;
    }

    setPracticeStatus("success");
    setPracticeMessage(
      "Great. You passed both the quiz and the practice check. This lesson is now marked as completed."
    );

    if (!isCompleted) {
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
                  const isCorrect = selected && selected === q.correctOptionId;
                  const isWrong =
                    quizSubmitted && selected && selected !== q.correctOptionId;

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
                                setPracticeStatus("idle");
                                setPracticeMessage(null);
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
              A quiz for this lesson is not ready yet. You can switch back to
              Study or Practice for now.
            </p>
          )}
        </div>
      )}

      {activeTab === "practice" && (
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-semibold gaia-strong">
            {practice.title}
          </h3>
          <p className="text-xs sm:text-sm gaia-muted">
            {practice.description}
          </p>
          <ul className="list-disc pl-4 space-y-1">
            {practice.instructions.map((item, idx) => (
              <li key={idx} className="text-[11px] sm:text-xs gaia-muted">
                {item}
              </li>
            ))}
          </ul>

          <textarea
            className="mt-2 h-32 w-full rounded-xl border border-white/15 bg-black/40 p-2 text-xs sm:text-sm text-white outline-none focus:border-white/40"
            placeholder="Write your explanation or code here..."
            value={practiceText}
            onChange={(e) => {
              setPracticeText(e.target.value);
              setPracticeStatus("idle");
              setPracticeMessage(null);
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

          {practiceStatus === "error" && practiceMessage && (
            <p className="text-[11px] sm:text-xs text-amber-300">
              {practiceMessage}
            </p>
          )}
          {practiceStatus === "success" && practiceMessage && (
            <p className="text-[11px] sm:text-xs text-emerald-300">
              {practiceMessage}
            </p>
          )}

          <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-3">
            <p className="text-[11px] sm:text-xs gaia-muted mb-2">
              Optional: play in the code playground for this lesson. For HTML
              lessons, try building the structures we described above. You can
              also paste your final code into the practice box so GAIA can check
              it.
            </p>
            <CodePlayground
              language="html"
              initialCode={`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Practice</title>
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
