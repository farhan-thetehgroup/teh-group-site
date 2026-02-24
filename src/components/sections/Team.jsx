import { Suspense, lazy, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Mail } from "lucide-react";
import { Badge } from "../Badge";

const teamMembers = [
  {
    name: "Jeffrey Teh",
    role: "Founder & CEO",
    image: "/images/teams/Jeffrey-teh.webp",
    gradient: "from-emerald-500 to-cyan-500",
    email: "jeffrey.teh@thetehgroup.com",
    linkedin: "https://www.linkedin.com/in/jeffrey-teh-7451066/",
  },
  {
    name: "Zen Lai",
    role: "Principal Partner",
    image: "/images/teams/Zen.jpg",
    gradient: "from-cyan-500 to-blue-500",
    email: "Zen@thetehgroup.com",
    linkedin: "https://www.linkedin.com/in/zen-lai-b0242216a/",
  },
  {
    name: "Kennith Ng",
    role: "Principal Partner",
    image: "/images/teams/kennith.png",
    gradient: "from-blue-500 to-cyan-500",
    email: "kennith@thetehgroup.com",
    linkedin: "https://www.linkedin.com/in/kennith-ng-806344aa/",
  },
  {
    name: "JR Inciong",
    role: "Principal Partner",
    image: "/images/teams/JR.png",
    gradient: "from-slate-700 to-slate-900",
    email: "jr@thetehgroup.com",
    linkedin: "https://www.linkedin.com/in/jrinciong/",
  },
  {
    name: "Maria Misa Jon",
    role: "Head of Commercial Asia",
    image: "/images/teams/maria.png",
    gradient: "from-emerald-500 to-blue-500",
    email: "maria@thetehgroup.com",
    linkedin: "https://www.linkedin.com/in/maria-misajon-042548208/",
  },
  {
    name: "Kuldip Singh",
    role: "COO",
    image: "/images/teams/kuldip-singh.png",
    gradient: "from-cyan-500 to-slate-700",
    email: "finance@thetehgroup.com",
    linkedin: "https://www.linkedin.com/in/kuldip-singh-a7a820152/",
  },
  {
    name: "Johnny Chan",
    role: "Head of Greater China",
    image: "/images/teams/johnny-chan.jpg",
    gradient: "from-blue-500 to-emerald-500",
    email: "johnny@thetehgroup.com",
    linkedin: "https://www.linkedin.com/in/%E7%AD%96-%E9%99%88-184758191/",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
};

export default function Team() {
  const prefersReducedMotion = useReducedMotion();
  const enableMotion = !prefersReducedMotion;
  const firstRow = useMemo(() => teamMembers.slice(0, 4), []);
  const secondRow = useMemo(() => teamMembers.slice(4), []);

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

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}>
          <Badge
            icon={<Users className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 " />}
            text="Meet Our Team"
            color="emerald"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
            <span className="text-white">Powered By</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Brilliant Minds
            </span>
          </h2>
          <p className="text-sm sm:text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto px-4">
            100+ passionate professionals driving innovation across Asia Pacific
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 md:mb-14">
          {firstRow.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative perspective-1000"
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}>
              <TeamCard member={member} enableMotion={enableMotion} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-stretch lg:justify-items-center max-w-5xl mx-auto mb-16 md:mb-24">
          {secondRow.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative perspective-1000 w-full"
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: (index + 4) * 0.06 }}>
              <TeamCard member={member} enableMotion={enableMotion} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TeamCard = ({ member, enableMotion }) => (
  <div className="relative bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-emerald-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 preserve-3d">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative overflow-hidden aspect-square">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10`}
      />
      <img
        src={member.image}
        alt={member.name}
        width={400}
        height={400}
        className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-emerald-500/50 transition-all duration-500" />
    </div>

    <div className="relative p-5 sm:p-6 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-sm">
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${member.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
      <h3 className="text-lg sm:text-xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-300">
        {member.name}
      </h3>
      <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wide group-hover:text-emerald-300 transition-colors duration-300">
        {member.role}
      </p>
      <div className="flex gap-3 mt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
        <a
          href={member.linkedin}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/30 flex items-center justify-center transition-colors"
          aria-label="LinkedIn">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a
          href={`mailto:${member.email}`}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/30 flex items-center justify-center transition-colors"
          aria-label="Email">
          <Mail className="w-4 h-4 text-white" />
        </a>
      </div>
    </div>
  </div>
);
