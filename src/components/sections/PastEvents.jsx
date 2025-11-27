// sections/PastEvents.jsx
import { useState, useMemo, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Calendar,
  ExternalLink,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import EventModal from "../EventModal";
import { Badge } from "../Badge";

const pastEvents = [
  {
    id: 1,
    title: "Identity & AI Leadership Forum Singapore 2025",
    date: "12 November 2025",
    location: "Guoco Midtown Networking Hub, Singapore",
    attendees: "120+",
    description:
      "Identity as the foundation of secure, scalable AI adoption—from continuous protection and adaptive access to frictionless experiences for both humans and AI systems.",
    image: "/images/banners/Okta-Background.jpg",
    gallery: [
      "/images/Documentations/Okta-Singapore-2025/OktaEventTehGroup023.jpg",
      "/images/Documentations/Okta-Singapore-2025/OktaEventTehGroup069.jpg",
      "/images/Documentations/Okta-Singapore-2025/OktaEventTehGroup096.jpg",
      "/images/Documentations/Okta-Singapore-2025/OktaEventTehGroup101.jpg",
      "/images/Documentations/Okta-Singapore-2025/OktaEventTehGroup137.jpg",
      "/images/Documentations/Okta-Singapore-2025/OktaEventTehGroup178.jpg",
    ],
    socialLink:
      "https://www.linkedin.com/posts/teh-group_tehgroup-identitysecurity-aicybersecurity-activity-7396402113523740672-lA2_",
  },
  {
    id: 2,
    title: "AI Data Center Project",
    date: "24 - 26 August 2025",
    location: "Mulia Resort, Bali",
    attendees: "300+",
    description:
      "Over 300 participants, 15 exhibitors, curated one-to-one meetings, fun golf, and a seamless travel experience with 200+ flights and full ground coordination.",
    image: "/images/banners/neutraDC.png",
    gallery: [
      "/images/Documentations/NeutraDC/Neutra-1.jpg",
      "/images/Documentations/NeutraDC/Neutra-2.jpg",
      "/images/Documentations/NeutraDC/Neutra-3.jpg",
      "/images/Documentations/NeutraDC/Neutra-4.jpg",
      "/images/Documentations/NeutraDC/Neutra-5.jpg",
      "/images/Documentations/NeutraDC/Neutra-6.jpg",
      "/images/Documentations/NeutraDC/Neutra-7.jpg",
    ],
    socialLink:
      "https://www.linkedin.com/posts/teh-group_tehgroup-eventmanagement-eventplanning-activity-7368598565784383488-5S5W",
  },
  {
    id: 3,
    title: "Tech Fest Hong Kong 2025",
    date: "21 May 2025",
    location: "HKCEC, Hong Kong",
    attendees: "3000+",
    description:
      "A fresh platform combining multiple tech experiences—uniting innovators, operators, and investors to explore what is next in technology.",
    image: "/images/banners/Tech-Fest-2025.png",
    gallery: [
      "/images/Documentations/Tech-Fest-2025/Tech-fest-1.jpg",
      "/images/Documentations/Tech-Fest-2025/Tech-fest-2.jpg",
      "/images/Documentations/Tech-Fest-2025/Tech-fest-3.jpg",
      "/images/Documentations/Tech-Fest-2025/Tech-fest-4.jpg",
      "/images/Documentations/Tech-Fest-2025/Tech-fest-5.jpg",
      "/images/Documentations/Tech-Fest-2025/Tech-fest-6.jpg",
      "/images/Documentations/Tech-Fest-2025/Tech-fest-7.jpg",
    ],
    socialLink:
      "https://www.linkedin.com/posts/teh-group_nicholaschan-techfestsummit-thankyou-activity-7331260019176366083-YGWL",
  },
  {
    id: 4,
    title: "AI Nexus 2025",
    date: "22-23 October 2025",
    location: "25 Hours Hotel Jakarta, Indonesia",
    attendees: "150+",
    description:
      "A convergence of AI and cybersecurity leaders through panels, one-to-one meetings, live demos, and conferences exploring the digital future.",
    image:
      "/images/banners/ai-nexus-banner.png",
    gallery: [
      "/images/Documentations/Ai-Nexus/ai-nexus-1.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-2.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-3.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-4.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-5.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-6.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-7.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-8.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-9.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-10.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-11.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-12.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-13.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-14.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-15.jpg",
      "/images/Documentations/Ai-Nexus/ai-nexus-16.jpg",
    ],
    socialLink:
      "https://www.linkedin.com/posts/teh-group_nexus2025-ainexus-artificialintelligence-activity-7388488029755273216-PzPu",
  },
  {
    id: 5,
    title: "Cyber Attack Nexus Malaysia 2025",
    date: "21-22 August 2025",
    location: "M Resort Hotel, Kuala Lumpur",
    attendees: "150+",
    description:
      "Tailored one-to-one business meetings aligning organizations with cutting-edge cybersecurity vendors, delivered with precision hospitality.",
    image:
      "/images/banners/cyber-attack-my.jpg",
    gallery: [
      "/images/Documentations/Cyber-Attack-MY/CA-MY-1.jpg",
      "/images/Documentations/Cyber-Attack-MY/CA-MY-2.jpg",
      "/images/Documentations/Cyber-Attack-MY/CA-MY-3.jpg",
    ],
    socialLink:
      "https://www.linkedin.com/posts/teh-group_cyberattacknexus-tehgroup-cybersecurity-activity-7366686614078619648-HOU2",
  },
  {
    id: 6,
    title: "More Engagements Ahead",
    date: "Coming Soon",
    location: "Indonesia | 100% | APAC",
    attendees: "∞",
    description:
      "Our journey doesn't stop here. Join us for upcoming exclusive engagements across Indonesia and the entire APAC region. Be part of the next wave of innovation and networking opportunities.",
    image: null, // Special card without image
    isSpecial: true,
    ctaLink: "#contact",
    ctaText: "Get In Touch",
  },
];

const accentGradients = [
  "from-blue-400 to-cyan-400",
  "from-emerald-400 to-cyan-400",
  "from-purple-400 to-blue-400",
  "from-amber-400 to-pink-400",
  "from-lime-400 to-emerald-400",
];

const PastEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
  });
  const progressWidth = useTransform(smoothProgress, [0, 1], ["14%", "100%"]);

  const handleNavigation = useCallback(
    (direction) => {
      if (direction === "next" && activeIndex < pastEvents.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else if (direction === "prev" && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    },
    [activeIndex]
  );

  // Calculate position relative to active card - Memoized for performance
  const getCardStyle = useCallback(
    (index) => {
      const diff = index - activeIndex;
      const isActive = diff === 0;
      const isPrev = diff === -1;
      const isNext = diff === 1;

      // Base styles
      let transform = "";
      let opacity = 0.4;
      let scale = 0.75;
      let zIndex = 0;
      let rotateY = 0;
      let willChange = "auto";

      if (isActive) {
        // Center card
        transform = "translateX(0%) translateZ(0)";
        opacity = 1;
        scale = 1;
        zIndex = 10;
        rotateY = 0;
        willChange = "transform";
      } else if (isPrev) {
        // Left card
        transform = "translateX(-85%) translateZ(0)";
        opacity = 0.6;
        scale = 0.85;
        zIndex = 5;
        rotateY = 35;
        willChange = "transform";
      } else if (isNext) {
        // Right card
        transform = "translateX(85%) translateZ(0)";
        opacity = 0.6;
        scale = 0.85;
        zIndex = 5;
        rotateY = -35;
        willChange = "transform";
      } else if (diff < -1) {
        // Far left cards
        transform = "translateX(-120%) translateZ(0)";
        opacity = 0;
        scale = 0.7;
        zIndex = 0;
        rotateY = 45;
        willChange = "auto";
      } else if (diff > 1) {
        // Far right cards
        transform = "translateX(120%) translateZ(0)";
        opacity = 0;
        scale = 0.7;
        zIndex = 0;
        rotateY = -45;
        willChange = "auto";
      }

      return {
        transform: `${transform} scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        zIndex,
        willChange,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      };
    },
    [activeIndex]
  );

  return (
    <section
      className="relative w-full bg-gradient-to-b from-black via-slate-950/35 to-black py-16 lg:py-24 overflow-hidden"
      style={{ isolation: "isolate" }}>
      {/* Grid + blobs */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full blur-3xl"
            style={{
              background:
                index === 0 ?
                  "radial-gradient(circle, rgba(59,130,246,0.17), transparent)"
                : index === 1 ?
                  "radial-gradient(circle, rgba(6,182,212,0.17), transparent)"
                : "radial-gradient(circle, rgba(16,185,129,0.17), transparent)",
              width: `${360 + index * 150}px`,
              height: `${360 + index * 150}px`,
              top: `${8 + index * 22}%`,
              right: `${6 + index * 20}%`,
              filter: "blur(42px)",
            }}
            animate={{
              y: [0, -18, 0],
              x: [0, index % 2 === 0 ? 18 : -14, 0],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center">
          <Badge
            icon={<Calendar className="w-4 h-4 text-blue-400" />}
            text="Past Experiences"
            color="blue"
          />
        </div>
        <div className="pt-4 flex flex-col space-y-3 justify-center text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            <span className="text-white">Celebrating</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            From intimate C-level retreats to large-scale technology summits,
            explore our portfolio of impactful events across the APAC region.
          </p>
        </div>

        {/* Coverflow Carousel Container */}
        <div className="relative pb-16">
          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 z-30">
            <motion.button
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("prev")}
              disabled={activeIndex === 0}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                activeIndex === 0 ?
                  "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70"
              }`}>
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>
          <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-30">
            <motion.button
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("next")}
              disabled={activeIndex === pastEvents.length - 1}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                activeIndex === pastEvents.length - 1 ?
                  "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70"
              }`}>
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Mobile Navigation Buttons - Below Card */}
          <div className="lg:hidden flex items-center justify-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("prev")}
              disabled={activeIndex === 0}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                activeIndex === 0 ?
                  "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
              }`}>
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-sm text-white font-semibold">
                {activeIndex + 1} / {pastEvents.length}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("next")}
              disabled={activeIndex === pastEvents.length - 1}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                activeIndex === pastEvents.length - 1 ?
                  "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
              }`}>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
          {/* Coverflow Cards - 3D Perspective Container */}
          <div
            className="relative h-[500px] lg:h-[580px] flex items-center justify-center overflow-hidden"
            style={{
              perspective: "1800px",
              perspectiveOrigin: "center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}>
            <div className="relative w-full max-w-lg lg:max-w-xl h-full flex items-center justify-center">
              {pastEvents.map((event, index) => {
                const cardStyle = getCardStyle(index);
                const isActive = index === activeIndex;
                const diff = Math.abs(index - activeIndex);

                // Only render cards that are visible (active and adjacent)
                if (diff > 2) return null;

                // Special card rendering
                if (event.isSpecial) {
                  return (
                    <div
                      key={event.id}
                      className="absolute w-full max-w-sm lg:max-w-lg cursor-pointer"
                      style={{
                        ...cardStyle,
                        transformStyle: "preserve-3d",
                        pointerEvents: isActive ? "auto" : "none",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      onClick={() => {
                        if (!isActive && Math.abs(index - activeIndex) === 1) {
                          setActiveIndex(index);
                        }
                      }}>
                      <motion.div
                        className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-500 ${
                          isActive
                            ? "border-2 border-emerald-400/50 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-blue-500/20 shadow-[0_0_80px_rgba(16,185,129,0.6),0_20px_70px_rgba(0,0,0,0.4)]"
                            : "border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 shadow-[0_20px_70px_rgba(0,0,0,0.4)]"
                        }`}
                        whileHover={isActive ? { y: -8 } : {}}
                        animate={
                          isActive
                            ? {
                                boxShadow: [
                                  "0 0 80px rgba(16,185,129,0.6), 0 20px 70px rgba(0,0,0,0.4)",
                                  "0 0 100px rgba(6,182,212,0.7), 0 20px 70px rgba(0,0,0,0.4)",
                                  "0 0 80px rgba(16,185,129,0.6), 0 20px 70px rgba(0,0,0,0.4)",
                                ],
                              }
                            : {}
                        }
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          boxShadow: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        style={{
                          willChange: isActive ? "transform" : "auto",
                        }}>
                        {/* Animated background gradient */}
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.2), rgba(6,182,212,0.2), rgba(59,130,246,0.2))",
                          }}
                          animate={
                            isActive
                              ? {
                                  backgroundPosition: [
                                    "0% 0%",
                                    "100% 100%",
                                    "0% 0%",
                                  ],
                                }
                              : {}
                          }
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        {/* Special Content Section */}
                        <div className="relative p-8 sm:p-10 space-y-6 flex flex-col items-center text-center min-h-[500px] justify-center">
                          {/* Icon/Badge */}
                          <motion.div
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center"
                            animate={
                              isActive
                                ? {
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}>
                            <Calendar className="w-10 h-10 text-white" />
                          </motion.div>

                          {/* Title */}
                          <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                              {event.title}
                            </span>
                          </h3>

                          {/* Stats Info */}
                          <div className="flex flex-wrap items-center justify-center gap-12">
                            <div className="flex flex-col items-center">
                              <span className="text-4xl font-bold text-cyan-300">
                                100%
                              </span>
                              <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                                Success Rate
                              </span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-4xl font-bold text-blue-300">
                                APAC
                              </span>
                              <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                                Regional Focus
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-base text-gray-200 leading-relaxed max-w-md">
                            Stay tuned for Our Upcoming Engagements across the APAC region. Join thousands of industry leaders in shaping the future of technology.
                          </p>

                          {/* CTA Button - Always visible on special card */}
                          {isActive && (
                            <motion.a
                              href={event.ctaLink}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="mt-4 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white text-base font-bold shadow-lg hover:shadow-[0_10px_40px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center gap-2"
                              onClick={(e) => e.stopPropagation()}>
                              {event.ctaText}
                              <ExternalLink className="w-5 h-5" />
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  );
                }

                return (
                  <div
                    key={event.id}
                    className="absolute w-full max-w-sm lg:max-w-lg cursor-pointer"
                    style={{
                      ...cardStyle,
                      transformStyle: "preserve-3d",
                      pointerEvents: isActive ? "auto" : "none",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    onClick={() => {
                      if (!isActive && Math.abs(index - activeIndex) === 1) {
                        setActiveIndex(index);
                      }
                    }}>
                    <motion.div
                      className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-500 ${
                        isActive ?
                          "border-2 border-blue-400/50 bg-white/10 shadow-[0_0_60px_rgba(59,130,246,0.4),0_20px_70px_rgba(0,0,0,0.4)]"
                        : "border border-white/10 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.4)]"
                      }`}
                      whileHover={isActive ? { y: -8 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      style={{
                        willChange: isActive ? "transform" : "auto",
                      }}>
                      {/* Background gradient overlay */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          isActive ?
                            "opacity-0 group-hover:opacity-100"
                          : "opacity-0"
                        }`}
                        style={{
                          background:
                            "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.15), transparent 60%)",
                        }}
                      />

                      {/* Image section */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500"
                          style={{
                            transform: isActive ? "scale(1)" : "scale(1.05)",
                            willChange: isActive ? "transform" : "auto",
                          }}
                          loading={diff === 0 ? "eager" : "lazy"}
                          decoding="async"
                          fetchpriority={diff === 0 ? "high" : "low"}
                        />

                        {/* Floating badges */}
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-300" />
                          {event.attendees}
                        </div>
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-white">
                          #{String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Date & Location overlay */}
                        <div className="absolute bottom-3 left-3 right-3 space-y-2">
                          <div className="flex items-center gap-2 text-xs text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 w-fit">
                            <Calendar className="w-3.5 h-3.5 text-blue-300" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 w-fit max-w-full">
                            <MapPin className="w-3.5 h-3.5 text-cyan-300 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="relative p-5 sm:p-6 space-y-4">
                        <div className="space-y-2">
                          <h3
                            className={`text-xl sm:text-2xl font-bold text-white leading-tight line-clamp-2 transition-all duration-300 ${
                              isActive ?
                                "group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text"
                              : ""
                            }`}>
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                            {event.description}
                          </p>
                        </div>

                        {/* Action buttons - only show on active card */}
                        {isActive && (
                          <motion.div
                            className="flex flex-wrap gap-2 pt-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex-1 min-w-[120px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                              }}>
                              View Gallery
                            </motion.button>
                            <motion.a
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              href={event.socialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-2 text-sm transition-colors duration-300"
                              aria-label="Open social post"
                              onClick={(e) => e.stopPropagation()}>
                              <ExternalLink className="w-4 h-4" />
                            </motion.a>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Progress Indicators - Desktop Only */}
          <div className="hidden lg:flex items-center justify-center gap-2 mt-8">
            {pastEvents.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ?
                    "w-8 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50"
                  : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Mobile Progress Indicators */}
          <div className="lg:hidden flex items-center justify-center gap-2 mt-6">
            {pastEvents.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ?
                    "w-6 bg-gradient-to-r from-blue-500 to-cyan-500"
                  : "w-2 bg-white/20"
                }`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};

export default PastEvents;
