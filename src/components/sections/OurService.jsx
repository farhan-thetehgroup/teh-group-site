import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Badge } from "../Badge";

const ourServices = [
  {
    id: 1,
    iconSrc: "/images/icons/lead_11zon.png",
    title: "Lead Generation",
    description:
      "We design targeted, data-driven lead generation programs that connect enterprises with qualified decision-makers, strengthen pipeline performance, and accelerate commercial opportunities with precision.",
    gradient: "from-blue-500 to-cyan-500",
    iconBg: "from-blue-500/20 to-cyan-500/20",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  {
    id: 2,
    iconSrc: "/images/icons/building_11zon.png",
    title: "Building Professional Community",
    description:
      "We cultivate thriving professional communities by creating continuous engagement, meaningful connections, and high-value interactions that foster loyalty and drive long term business growth.",
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "from-emerald-500/20 to-teal-500/20",
    glowColor: "rgba(16, 185, 129, 0.5)",
  },
  {
    id: 3,
    iconSrc: "/images/icons/event_11zon.png",
    title: "Event Management",
    description:
      "We design premium, executive-level experiences that spark impactful conversations, strengthen presence, and open pathways to measurable business opportunities—each interaction crafted with intention.",
    gradient: "from-emerald-400 to-cyan-500",
    iconBg: "from-emerald-400/20 to-cyan-500/20",
    glowColor: "rgba(16, 185, 129, 0.5)",
  },
  {
    id: 4,
    iconSrc: "/images/icons/appoitment_11zon.png",
    title: "Appointment Setting",
    description:
      "We streamline the path to revenue by securing high-quality business meetings with key decision-makers, ensuring your sales teams engage the right prospects at the right time with maximum efficiency.",
    gradient: "from-cyan-500 to-blue-500",
    iconBg: "from-cyan-500/20 to-blue-500/20",
    glowColor: "rgba(6, 182, 212, 0.5)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 140, damping: 18 } },
};

export default function OurService() {
  const prefersReducedMotion = useReducedMotion();
  const enableMotion = !prefersReducedMotion;
  const services = useMemo(() => ourServices, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden
        bg-gradient-to-b from-slate-950/60 via-black to-slate-950/40
        py-20 sm:py-24 lg:py-32"
      style={{
        zIndex: "var(--z-section, 1)",
        isolation: "isolate",
      }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="event-blur-1 absolute left-1/4 top-20 h-64 w-64 rounded-full bg-blue-500/15 blur-[80px]" />
        <div className="event-blur-2 absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-emerald-500/12 blur-[80px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <Badge
            text="Our Services"
            icon={<Sparkles className="h-4 w-4 text-emerald-300" />}
            color="emerald"
          />

          <motion.h2
            className="font-black leading-tight mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>
            <span className="text-white">How We Support </span>
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Your Growth
            </span>
          </motion.h2>

          <motion.p
            className="max-w-4xl text-slate-300/80 text-sm sm:text-lg md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}>
            From accelerating lead generation efforts to shaping influential communities, we deliver
            event experiences that achieve tangible, strategic business value.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((format, index) => (
            <motion.div
              key={format.id}
              className="group relative rounded-[2rem] overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08 }}
              whileHover={enableMotion ? { scale: 1.02 } : {}}
              style={{ willChange: enableMotion ? "transform" : "auto" }}>
              <div
                className="relative h-full rounded-[2rem] border border-white/10 backdrop-blur-xl
                  bg-gradient-to-br from-white/[0.08] to-white/[0.03]
                  p-6 sm:p-8 lg:p-10
                  transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  hover:border-white/20 hover:from-white/[0.12] hover:to-white/[0.06]
                  shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)]"
                style={{
                  boxShadow: `0 25px 50px -12px ${format.glowColor}`,
                }}>
                <div
                  className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${format.glowColor}, transparent)`,
                  }}
                />

                <motion.div
                  className={`relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-[1.5rem]
                    bg-gradient-to-br ${format.iconBg}
                    mb-6`}
                  animate={
                    enableMotion ?
                      { scale: [1, 1.08, 1], rotate: [0, 4, 0] }
                    : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
                  <img
                    src={format.iconSrc}
                    alt={`${format.title} icon`}
                    width={80}
                    height={80}
                    className="w-14 h-14 lg:w-20 lg:h-20 object-contain"
                    style={{
                      filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.3))",
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>

                <h3
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-4
                    bg-gradient-to-r ${format.gradient} bg-clip-text text-transparent`}>
                  {format.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed">
                  {format.description}
                </p>

                <div className="absolute top-0 right-0 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${format.gradient} rounded-full blur-xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
