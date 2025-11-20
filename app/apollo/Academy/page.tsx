import Link from "next/link";

type TrackSummary = {
  id: string;
  title: string;
  href: string;
  totalLessons: number;
  completedLessons: number;
};

const tracks: TrackSummary[] = [
  {
    id: "programming",
    title: "Web Programming · Builder of Worlds",
    href: "/apollo/academy/programming",
    totalLessons: 34,
    completedLessons: 0,
  },
  {
    id: "accounting",
    title: "Accounting · Keeper of Numbers",
    href: "/apollo/academy/accounting",
    totalLessons: 26,
    completedLessons: 0,
  },
  {
    id: "self-repair",
    title: "Self-Repair · Rebuilding Me",
    href: "/apollo/academy/self-repair",
    totalLessons: 18,
    completedLessons: 0,
  },
];

function formatPercent(completed: number, total: number) {
  if (total === 0) return "0%";
  const pct = Math.round((completed / total) * 100);
  return `${pct}%`;
}

export default function AcademyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Academy</h1>
        <p className="text-sm gaia-muted max-w-2xl">
          Three main study paths running in parallel. Progress is measured by
          completed lessons, not by how fast you rush. Programming and
          accounting move in small blocks across three days each week; Fridays
          are for soul work and self-repair.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tracks.map((track) => {
          const percent = formatPercent(
            track.completedLessons,
            track.totalLessons
          );
          return (
            <Link
              key={track.id}
              href={track.href}
              className="group rounded-2xl gaia-panel-soft p-4 sm:p-5 shadow-sm border border-white/5 hover:border-white/15 hover:shadow-md transition"
            >
              <div className="space-y-2">
                <h2 className="text-sm font-semibold gaia-strong">
                  {track.title}
                </h2>

                <div className="mt-3 flex items-baseline justify-between text-xs gaia-muted">
                  <span className="font-semibold gaia-strong">
                    {percent} complete
                  </span>
                  <span>
                    {track.completedLessons} / {track.totalLessons} lessons
                  </span>
                </div>

                <p className="mt-3 text-[11px] font-semibold gaia-accent group-hover:underline">
                  Enter path →
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
