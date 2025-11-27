import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Award, Globe, TrendingUp, Play, Sparkles } from "lucide-react";
import VideoModal from "../VideoModal";
import { Badge } from "../Badge";

export default function About() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const aboutRef = useRef(null);
  const videoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const enableMotion = !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  const orbOffsets = [
    useTransform(scrollYProgress, [0, 1], [0, -30]),
    useTransform(scrollYProgress, [0, 1], [0, -45]),
    useTransform(scrollYProgress, [0, 1], [0, -60]),
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playsInline = true;
    video.muted = true;
    video.preload = "metadata";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldAutoplay(true);
            video
              .play()
              .catch(() => {
                setShouldAutoplay(false);
              });
          } else {
            setShouldAutoplay(false);
            video.pause();
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
      video.pause();
    };
  }, []);

  const focusPoints = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "20+ Years Experience",
      description: "Decade of expertise serving the APAC region",
      gradient: "from-emerald-500 to-cyan-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Finding high-value buyers across the APAC region",
      description: "Your gateway to APAC’s most valuable buyers.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "One-to-one access to verified decision-makers.",
      description: "Your gateway to genuine decision-maker access.",
      gradient: "from-blue-500 to-emerald-500",
    },
  ];

  return (
    <>
      <section
        className="about-section relative py-20 lg:py-24 bg-gradient-to-b from-black via-slate-950/30 to-black overflow-hidden"
        ref={aboutRef}
        style={{
          zIndex: "var(--z-section, 1)",
          isolation: "isolate",
        }}>
        {/* Gradient Transition from Hero Section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none z-10" />

        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              className="hero-orb absolute rounded-full blur-3xl"
              key={i}
              style={{
                background:
                  i === 0 ?
                    "radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent)"
                  : i === 1 ?
                    "radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent)"
                  : "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent)",
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
                top: `${20 + i * 30}%`,
                left: `${10 + i * 30}%`,
                y: enableMotion ? orbOffsets[i] : 0,
              }}
              animate={
                enableMotion ?
                  { opacity: [0.8, 1, 0.8] }
                : { opacity: 0.6 }
              }
              transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>
            <Badge
              icon={<Award className="w-4 h-4 text-emerald-400" />}
              text="About The TEH Group"
              color="emerald"
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4">
              <span className="text-white">Connecting</span>{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Opportunities
              </span>{" "}
              <span className="text-white">Building</span>{" "}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Growth
              </span>
            </h2>
          </motion.div>

          {/* Main 2-Column Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Logo / Visual */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 aspect-square flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="absolute w-full h-full aspect-square rounded-full border-2 border-emerald-400/30"
                    animate={
                      enableMotion ?
                        { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }
                      : { scale: 1, opacity: 0.8 }
                    }
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute w-full h-full aspect-square rounded-full bg-gradient-to-r from-emerald-400/15 to-cyan-400/15 blur-2xl opacity-60"
                    animate={
                      enableMotion ?
                        { scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }
                      : { scale: 1, opacity: 0.6 }
                    }
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <motion.div
                  className="relative z-10 w-full h-full aspect-square rounded-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border-2 border-white/10 shadow-2xl"
                  animate={
                    enableMotion ?
                      { y: [0, -10, 0] }
                    : { y: 0 }
                  }
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                  <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-10 md:p-12">
                    <img
                      alt="TEH Group 3D Logo"
                      className="w-full h-full object-contain relative z-10"
                      src="/images/brand-logo/teh-3d.webp"
                      style={{
                        filter: "drop-shadow(0 8px 30px rgba(16, 185, 129, 0.3))",
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Description */}
            <motion.div
              className="space-y-4 lg:space-y-5"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}>
              <div className="space-y-3">
                <p className="text-base sm:text-md lg:text-lg text-white font-light leading-relaxed">
                  The TEH Group{" "}
                  <span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    specializes in lead and demand generation, focusing on
                    cybersecurity, artificial intelligence, cloud computing,
                    data centers, and enterprise technology solutions
                  </span>{" "}
                  . Our collaborative efforts are meticulously tailored for{" "}
                  <span className="font-bold text-emerald-400">
                    C-level executives and tech experts across the Asia Pacific
                    region
                  </span>
                  .
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
              </div>

              <div className="space-y-3 lg:space-y-4">
                {focusPoints.map((point, index) => (
                  <motion.div
                    key={point.title}
                    className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-4 lg:p-5 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}>
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br ${point.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">{point.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm lg:text-lg font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">
                          {point.title}
                        </h3>
                        <p className="text-sm md:text-md text-gray-400 leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-500 rounded-full" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="relative mt-4 lg:mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-xl blur-lg" />
                <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-4 lg:p-4 border-2 border-emerald-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  </div>
                  <p className="text-sm sm:text-md lg:text-xl font-black text-center bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
                    "Connecting Opportunities, Building Growth."
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
}
