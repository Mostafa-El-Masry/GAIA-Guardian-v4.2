"use client";

import { useEffect, useState } from "react";

type Props = {
  initialHtml: string;
};

export default function CodePlayground({ initialHtml }: Props) {
  const [html, setHtml] = useState(initialHtml);
  const [srcDoc, setSrcDoc] = useState(initialHtml);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(html);
    }, 300);

    return () => clearTimeout(timeout);
  }, [html]);

  return (
    <div className="mt-3 grid gap-3 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] gaia-muted uppercase tracking-[0.22em]">
          HTML editor
        </p>
        <textarea
          value={html}
          onChange={(event) => setHtml(event.target.value)}
          className="min-h-[220px] w-full rounded-lg border border-white/15 bg-black/40 p-2 font-mono text-xs leading-snug text-slate-50"
          spellCheck={false}
        />
        <p className="text-[11px] gaia-muted">
          Edit the code and wait a moment. The preview on the right will
          update automatically.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[11px] gaia-muted uppercase tracking-[0.22em]">
          Preview
        </p>
        <div className="relative w-full overflow-hidden rounded-lg border border-white/15 bg-white">
          <iframe
            title="Code playground preview"
            srcDoc={srcDoc}
            className="h-64 w-full"
          />
        </div>
      </div>
    </div>
  );
}