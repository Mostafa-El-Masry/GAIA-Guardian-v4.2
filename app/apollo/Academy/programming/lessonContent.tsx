"use client";

import CodePlayground from "../components/CodePlayground";

type Props = {
  lessonId: string;
};

export function ProgrammingLessonContent({ lessonId }: Props) {
  if (lessonId === "prog-2-1") {
    return (
      <div className="space-y-3 text-sm gaia-muted">
        <p>
          This is your first real HTML lesson. We will not try to be smart.
          We will just learn very clearly what a web page is made of.
        </p>

        <ol className="list-decimal list-inside space-y-1">
          <li>A web page is just text written in a special language: HTML.</li>
          <li>
            The browser reads that text from top to bottom and builds the
            page you see.
          </li>
          <li>
            HTML is made of <span className="gaia-strong">tags</span>, for
            example <code className="font-mono text-xs">&lt;p&gt;</code> for a
            paragraph.
          </li>
        </ol>

        <p>
          For now, don&apos;t worry about &quot;best practices&quot;. You are
          just teaching your fingers and eyes how HTML looks.
        </p>

        <p className="text-xs gaia-muted/80">
          Exercise: type your own name and a short sentence about you in the
          playground, then hit &quot;Run&quot; and see it appear on the
          right.
        </p>

        <CodePlayground
          initialHtml={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My first HTML page</title>
  </head>
  <body>
    <h1>Hello, Sasa 👋</h1>

    <p>This is your first tiny HTML page inside GAIA.</p>

    <p>
      You can change this text, the heading, and add more paragraphs. Then
      press <strong>Run</strong> to see the result.
    </p>
  </body>
</html>`}
        />
      </div>
    );
  }

  if (lessonId === "prog-2-2") {
    return (
      <div className="space-y-3 text-sm gaia-muted">
        <p>
          In this lesson you practice three basic things: text, links, and
          images. If you can do these three, you can already build simple
          pages.
        </p>

        <ul className="list-disc list-inside space-y-1">
          <li>
            <span className="gaia-strong">Text:</span>{" "}
            <code className="font-mono text-xs">&lt;p&gt;</code> and{" "}
            <code className="font-mono text-xs">&lt;h1&gt;…&lt;h6&gt;</code>
          </li>
          <li>
            <span className="gaia-strong">Links:</span>{" "}
            <code className="font-mono text-xs">&lt;a href=&quot;…&quot;&gt;</code>
          </li>
          <li>
            <span className="gaia-strong">Images:</span>{" "}
            <code className="font-mono text-xs">&lt;img src=&quot;…&quot; /&gt;</code>
          </li>
        </ul>

        <p>
          Read the code slowly from top to bottom. Try to guess what it will
          show before you press Run.
        </p>

        <CodePlayground
          initialHtml={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Text, links and images</title>
  </head>
  <body>
    <h1>Welcome to my tiny page</h1>

    <p>My name is Sasa and I am learning web development step by step.</p>

    <h2>1. A simple link</h2>
    <p>
      Visit 
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
        the HTML docs on MDN
      </a>
      .
    </p>

    <h2>2. A simple image</h2>
    <p>Below is an image loaded from the internet:</p>
    <img
      src="https://placekitten.com/320/180"
      alt="A placeholder kitten"
    />

    <p>
      Try changing the link text, the URL, or the image size (width/height)
      and then press <strong>Run</strong>.
    </p>
  </body>
</html>`}
        />
      </div>
    );
  }

  return (
    <p className="text-sm gaia-muted">
      Detailed content for this lesson is not written yet. For now you can
      still mark it as completed or review the title and plan. We will fill
      these one by one together.
    </p>
  );
}