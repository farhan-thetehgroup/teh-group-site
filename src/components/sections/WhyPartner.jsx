// sections/WhyPartner.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "../Badge";
import { Rocket } from "lucide-react";

const highlightStats = [
  {
    number: "100,000+",
    label: "Decision Makers Engaged",
    image: "/images/icons/decision.png",
  },
  {
    number: "500+",
    label: "Sponsors Partnered",
    image: "/images/icons/sponsors.png",
  },
  {
    number: "12+",
    label: "Countries Covered",
    image: "/images/icons/country.png",
  },
];

const keyPoints = [
  "Curated C-Level Audience",
  "Proven ROI for Sponsors",
  "Premium, Intimate, and Targeted Experiences",
];

const WhyPartner = () => {
  const prefersReducedMotion = useReducedMotion();
  const enableMotion = !prefersReducedMotion;
  const [isMobile, setIsMobile] = useState(false);
  const motionOnDesktop = enableMotion && !isMobile;
  const stats = useMemo(() => highlightStats, []);
  const points = useMemo(() => keyPoints, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#010409] via-[#020b14] to-[#010409] py-20 text-white">
      {/* Dots */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-400/40 blur-[1px]"
            style={{
              top: `${(i * 83) % 100}%`,
              left: `${(i * 47) % 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mx-auto mb-12 flex flex-col items-center text-center gap-6">
          <Badge
            icon={<Rocket className="h-4 w-4 text-emerald-300" />}
            text="Why Partner With Us"
            color="emerald"
          />
          <motion.p
            className="text-sm sm:text-lg md:text-2xl text-gray-300 max-w-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}>
            We deliver high-quality, precision-driven lead generation solutions
            that empower organizations to accelerate growth and unlock new
            opportunities.
          </motion.p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch">
          <motion.div
            className="relative flex justify-center lg:w-1/2"
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center"
              transition={{
                duration: 10,
                repeat: motionOnDesktop ? Infinity : 0,
                ease: "easeInOut",
              }}>
              <motion.div
                className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-emerald-400/15 blur-2xl opacity-65"
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                }}
              />
              <div className="rounded-full relative z-10 w-full h-full overflow-hidden bg-white/5 border border-white/10 backdrop-blur">
                <img
                  alt="TEH Group 3D icon"
                  className="w-full h-full object-contain"
                  src="/images/brand-logo/teh-3d.webp"
                  width={256}
                  height={256}
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 space-y-6 flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex min-h-[110px] items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-blue-600/20 px-6 py-5 border border-white/5 shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                whileHover={enableMotion ? { y: -6, scale: 1.01 } : {}}>
                <div className="relative h-14 w-14 rounded-full bg-black/40 flex items-center justify-center overflow-hidden border border-emerald-400/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/40 to-blue-500/40" />
                  <img
                    alt={item.label}
                    className="relative z-10 w-10 h-10 object-contain"
                    src={item.image}
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{item.number}</p>
                  <p className="text-gray-200 text-sm md:text-base">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm md:text-lg text-gray-300"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: "easeOut" }}>
          {points.map((point, index) => (
            <motion.div
              key={point}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.05,
              }}>
              <span className="relative flex h-5 w-5 items-center justify-center ">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/30"
                  animate={
                    enableMotion ?
                      { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }
                    : { opacity: 0.6 }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>{point}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPartner;
