import { motion, useReducedMotion } from "framer-motion";
import { Users, Mail } from "lucide-react";
import { Badge } from "../Badge";

const founder = {
  name: "Jeffrey Teh",
  role: "Founder & CEO",
  image: "/images/teams/Jeffrey-teh.webp",
  gradient: "from-emerald-500 to-cyan-500",
  email: "jeffrey.teh@thetehgroup.com",
  linkedin: "https://www.linkedin.com/in/jeffrey-teh-7451066/",
};

export default function Team() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="team-section relative py-16 md:py-32 bg-gradient-to-b from-black via-slate-950/20 to-black overflow-hidden"
      style={{
        zIndex: "var(--z-section, 1)",
        isolation: "isolate",
      }}>
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}>
          <Badge
            icon={<Users className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 " />}
            text="Leadership"
            color="emerald"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
            <span className="text-white">Meet Our</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Founder
            </span>
          </h2>
          <p className="text-sm sm:text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto px-4">
            The vision guiding TEH Group across Asia Pacific
          </p>
        </motion.div>

        <motion.article
          className="relative mx-auto max-w-4xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${founder.gradient}`}
            />

            <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12 md:p-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:p-12">
              <div className="relative mx-auto w-full max-w-[260px] md:max-w-none">
                <div
                  className={`absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br ${founder.gradient} opacity-40 blur-xl`}
                />
                <div className="relative overflow-hidden rounded-2xl border border-white/20 aspect-[4/5] bg-slate-900">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>

              <div className="text-center md:text-left">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300 sm:text-sm">
                  {founder.role}
                </p>
                <h3 className="mb-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                  {founder.name}
                </h3>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-400 sm:text-base md:mx-0 md:text-lg">
                  Founder and chief executive of TEH Group, connecting
                  businesses with decision-makers across the region.
                </p>

                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:justify-start">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:border-emerald-400/50 hover:bg-emerald-500/20">
                    <svg
                      className="h-4 w-4 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${founder.email}`}
                    className="inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/20">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">{founder.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
