import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Badge } from "../Badge";

const clients = [
  { name: "Amazon Web Services", logo: "/images/sponsors/aws.png", url: "https://aws.amazon.com/" },
  { name: "Google Cloud", logo: "/images/sponsors/googlecloud.png", url: "https://cloud.google.com/" },
  { name: "IBM", logo: "/images/sponsors/ibm.png", url: "https://www.ibm.com/" },
  { name: "PwC", logo: "/images/sponsors/pwc.svg", url: "https://www.pwc.com/" },
  { name: "Sailpoint", logo: "/images/sponsors/sailpoint.png", url: "https://www.sailpoint.com/" },
  { name: "ServiceNow", logo: "/images/sponsors/servicenow.png", url: "https://www.servicenow.com/" },
  { name: "Cloudflare", logo: "/images/sponsors/cloudflare.png", url: "https://www.cloudflare.com/" },
  { name: "Fortinet", logo: "/images/sponsors/fortinet.png", url: "https://www.fortinet.com/" },
  { name: "Nutanix", logo: "/images/sponsors/nutanix.png", url: "https://www.nutanix.com/" },
  { name: "Alibaba Cloud", logo: "/images/sponsors/alibaba.png", url: "https://www.alibabacloud.com/" },
  { name: "Infoblox", logo: "/images/sponsors/infoblox.png", url: "https://www.infoblox.com/" },
  { name: "Akamai", logo: "/images/sponsors/akamai.png", url: "https://www.akamai.com/" },
  { name: "Coupa", logo: "/images/sponsors/coupa.png", url: "https://www.coupa.com/" },
  { name: "Trend Micro", logo: "/images/sponsors/trend.png", url: "https://www.trendmicro.com/" },
  { name: "SentinelOne", logo: "/images/sponsors/senitalone.png", url: "https://www.sentinelone.com/" },
  { name: "Lark", logo: "/images/sponsors/lark_logo.png", url: "https://www.larksuite.com/" },
  { name: "NeutraDC", logo: "/images/sponsors/neutraDC.webp", url: "https://www.neutradc.com/" },
  { name: "LMNTRIX", logo: "/images/sponsors/lmntrix_logo.png", url: "https://www.lmntrix.com/" },
  { name: "Searce", logo: "/images/sponsors/searce.png", url: "https://www.searce.com/" },
];

const rowCount = 4;
const itemsPerRow = Math.ceil(clients.length / rowCount);

const buildMarqueeRows = () =>
  Array.from({ length: rowCount }, (_, index) => {
    const start = index * itemsPerRow;
    const end = start + itemsPerRow;
    return {
      items: clients.slice(start, end),
      // Baris ganjil (1,3): ke kanan | Baris genap (2,4): ke kiri
      reverse: index % 2 === 0,
      duration: 35 + index * 5,
    };
  });

const MarqueeRow = ({ items, reverse = false, duration = 30, prefersReducedMotion }) => {
  // Duplicate items enough times to fill screen and enable seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative py-6 sm:py-7 md:py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black via-black/80 to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black via-black/80 to-transparent md:w-24" />

      <div className="overflow-x-hidden" style={{ perspective: 1400 }}>
        <motion.div
          className="flex flex-nowrap items-center gap-3 md:gap-4"
          style={{
            willChange: prefersReducedMotion ? "auto" : "transform",
          }}
          initial={{ x: reverse ? "0%" : "-33.333%" }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: reverse ? ["-33.333%", "0%"] : ["-33.333%", "-66.666%"],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    duration,
                  },
                }
          }>
          {duplicatedItems.map((client, index) => (
            <motion.a
              key={`${client.name}-${index}`}
              href={client.url}
              target="_blank"
              rel="noreferrer"
              className="relative flex flex-shrink-0 items-center justify-center
                rounded-lg border border-white/10
                bg-white/100
                shadow-[0_8px_32px_-12px_rgba(0,0,0,0.3)]
                h-11 min-w-[75px] max-w-[95px] px-3
                sm:h-14 sm:min-w-[100px] sm:max-w-[130px] sm:px-4
                md:h-20 md:min-w-[130px] md:max-w-[170px] md:px-5
                lg:h-24 lg:min-w-[150px] lg:max-w-[190px] lg:px-6"
              style={{
                willChange: prefersReducedMotion ? "auto" : "transform",
                transformStyle: "preserve-3d",
                transformOrigin: "50% 50%",
                transformPerspective: 1200,
              }}
              whileHover={
                prefersReducedMotion ?
                  { scale: 1.02 }
                : {
                    scale: 1.07,
                    rotateX: -14,
                    rotateY: 14,
                    translateZ: 22,
                  }
              }
              transition={{ type: "spring", stiffness: 280, damping: 18 }}>
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                width={200}
                height={80}
                className="relative z-10 h-auto w-full object-contain
                  opacity-80 grayscale-[30%] brightness-95
                  transition-all duration-300
                  max-h-[60%] sm:max-h-[65%] md:max-h-[70%]
                  group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-110"
                loading="lazy"
                decoding="async"
              />
              <span className="sr-only">{client.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function OurClients() {
  const prefersReducedMotion = useReducedMotion();
  const marqueeRows = useMemo(buildMarqueeRows, []);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden
        bg-gradient-to-b from-slate-950/40 via-black to-slate-950/60
        py-16 sm:py-20 lg:py-28">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-10 top-6 h-52 w-52 rounded-full bg-emerald-500/20 blur-[100px]" />
        <div className="absolute right-10 bottom-10 h-60 w-60 rounded-full bg-cyan-500/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6 md:gap-8">
          <Badge
            icon={<Sparkles className="w-4 h-4 text-emerald-400" />}
            text="Our Clients"
            color="blue"
          />

          <motion.h2
            className="font-black leading-tight mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>
            <span className="text-white">Trusted by </span>
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Leading Enterprises
            </span>
          </motion.h2>

          <motion.p
            className="max-w-4xl text-slate-300/80 text-sm sm:text-lg md:text-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}>
            More than 500+ enterprise innovators trust TEH Group to build impactful partnerships,
            create memorable experiences, and accelerate revenue growth.
          </motion.p>

          <div className="w-full mt-6 sm:mt-8 md:mt-10">
            {marqueeRows.map((row, idx) => (
              <motion.div
                key={`row-${idx}`}
                className="-mt-2 first:mt-0 sm:-mt-4 md:-mt-6"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}>
                <MarqueeRow
                  items={row.items}
                  reverse={row.reverse}
                  duration={row.duration}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
