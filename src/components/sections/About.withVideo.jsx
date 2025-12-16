import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Globe, TrendingUp, Play, Sparkles } from "lucide-react";
import VideoModal from "../VideoModal";
import { VIDEO_TEASER_SRC } from "../../constants";
import { Badge } from "../Badge";

export default function About() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const aboutRef = useRef(null);
  const videoRef = useRef(null);

  const isInView = useInView(aboutRef, {
    once: false,
    amount: 0.3,
  });

  // Handle video autoplay with sound when section is in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Don't autoplay if modal is open
    if (isVideoModalOpen) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    if (isInView) {
      // Section is in view - play video
      video.currentTime = 0;

      // Try to play with sound first
      video.muted = false;
      video.volume = 1.0;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch((error) => {
            // Browser blocked autoplay with sound, fallback to muted
            console.log("Autoplay with sound blocked, trying muted:", error);
            video.muted = true;
            setIsMuted(true);
            video
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {
                setIsPlaying(false);
              });
          });
      }
    } else {
      // Section is out of view - pause and reset
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      setIsMuted(true);
    }
  }, [isInView, isVideoModalOpen]);

  // Handle toggle mute/unmute button click
  const handleToggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (isMuted) {
        // Unmute
        video.muted = false;
        video.volume = 1.0;
        setIsMuted(false);
      } else {
        // Mute
        video.muted = true;
        video.volume = 0;
        setIsMuted(true);
      }
    }
  };

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

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const mediaVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.2 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <>
      <section
        className="about-section relative py-20 lg:py-24 bg-linear-to-b from-black via-slate-950/30 to-black overflow-hidden"
        ref={aboutRef}>
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
            <div
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
                willChange: "transform",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 lg:mb-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headerVariants}>
            <Badge
              icon={<Award className="w-4 h-4 text-emerald-400" />}
              text="About The TEH Group"
              color="emerald"
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black my-3 md:mb-4">
              <span className="text-white">Connecting</span>{" "}
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Opportunities
              </span>{" "}
              <span className="text-white">Building</span>{" "}
              <span className="bg-linear-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Growth
              </span>
            </h2>
          </motion.div>

          {/* Main 2-Column Grid - Compact Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 3xl:gap-16 4xl:gap-20 items-center">
            {/* Left Column: Video/Image with Custom Frame */}
            <motion.div
              className="about-media-column relative order-1 lg:order-1 w-full"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={mediaVariants}>
              {/* Container untuk shape background dan video card */}
              <div className="relative w-full">
                {/* Shape Background - LAYER PERTAMA */}
                <div className="absolute -inset-10 lg:-inset-12 flex items-center justify-center z-0">
                  <img
                    src="/images/pattern/shape.svg"
                    alt=""
                    className="w-full h-full max-w-none object-contain opacity-80"
                    style={{
                      filter: "drop-shadow(0 0 80px rgba(16,185,129,0.4))",
                    }}
                  />
                </div>

                {/* Video Card - LAYER KEDUA di atas shape - DIKECILKAN */}
                <div className="relative z-10 w-full max-w-lg mx-auto transform scale-90 lg:scale-95">
                  {/* Decorative Corner Accents */}
                  <div className="absolute -top-2 -left-2 w-14 h-14 border-t-3 border-l-3 border-emerald-400/50 rounded-tl-2xl z-20 pointer-events-none" />
                  <div className="absolute -bottom-2 -right-2 w-14 h-14 border-b-3 border-r-3 border-cyan-400/50 rounded-br-2xl z-20 pointer-events-none" />

                  {/* Frame Container */}
                  <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-2 border-2 border-emerald-500/30 transition-all duration-700">
                    {/* Inner Border Gradient */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500/20 via-transparent to-cyan-500/20 pointer-events-none" />

                    {/* Video/Image Content - Clickable */}
                    <div
                      className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group/video"
                      onClick={() => setIsVideoModalOpen(true)}>
                      {/* Video Element */}
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        poster="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80"
                        loop
                        playsInline
                        preload="metadata"
                        controls={false}>
                        <source src={VIDEO_TEASER_SRC} type="video/mp4" />
                      </video>

                      {/* Fallback if video doesn't load */}
                      <img
                        alt="TEH Group Business Solutions"
                        className="absolute inset-0 w-full h-full object-cover -z-10"
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Mute/Unmute Button - Show when video is playing */}
                      {isPlaying && (
                        <button
                          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border-2 border-emerald-400/70 flex items-center justify-center hover:bg-emerald-500 hover:scale-110 transition-all duration-300 group/sound shadow-lg"
                          onClick={handleToggleMute}
                          aria-label={isMuted ? "Unmute video" : "Mute video"}>
                          {
                            isMuted ?
                              // Muted Icon
                              <svg
                                className="w-5 h-5 text-emerald-400 group-hover/sound:text-white transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                                />
                              </svg>
                              // Unmuted Icon (with sound waves)
                            : <svg
                                className="w-5 h-5 text-emerald-400 group-hover/sound:text-white transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                />
                              </svg>

                          }
                        </button>
                      )}

                      {/* Play Icon Overlay - Only on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 bg-black/40 pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/90 backdrop-blur-sm flex items-center justify-center transform group-hover/video:scale-110 transition-transform duration-300 shadow-2xl">
                          <Play
                            className="w-6 h-6 text-white ml-0.5"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Info Bar - DIKECILKAN */}
                    {/* <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md rounded-lg p-2 border border-emerald-500/30 pointer-events-none">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-linear-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shrink-0">
                          <Globe className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-[11px]">
                            Leading B2B Events in APAC
                          </p>
                          <p className="text-emerald-400 text-[9px]">
                            Trusted by Fortune 500 Companies
                          </p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: TEH Group Description */}
            <motion.div
              className="about-content-column space-y-4 lg:space-y-5 order-2 lg:order-2"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={contentVariants}>
              {/* Main Description */}
              <div className="space-y-3 3xl:space-y-4 4xl:space-y-5">
                <p className="text-base lg:text-xl text-white font-light leading-relaxed">
                  The TEH Group{" "}
                  <span className="font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    specializes in lead and demand generation, focusing on
                    cybersecurity, artificial intelligence, cloud computing,
                    data centers, and enterprise technology solutions.
                  </span>{" "}
                  Our collaborative efforts are meticulously tailored for{" "}
                  <span className="font-bold text-emerald-400">
                    C-level executives and tech experts across the Asia Pacific
                    region
                  </span>
                  .
                </p>

                <div className="h-1 w-20 bg-linear-to-r from-emerald-400 to-cyan-400 rounded-full" />
              </div>

              {/* Focus Points - Compact */}
              <div className="space-y-3 lg:space-y-4 3xl:space-y-5 4xl:space-y-6">
                {focusPoints.map((point, index) => (
                  <div
                    className="focus-point group relative bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-4 lg:p-5 3xl:p-6 4xl:p-8 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105"
                    key={index}>
                    <div className="flex items-start gap-3 3xl:gap-4 4xl:gap-5">
                      <div
                        className={`w-10 h-10 lg:w-12 lg:h-12 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 rounded-lg bg-linear-to-br ${point.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white 3xl:scale-125 4xl:scale-150">
                          {point.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm lg:text-lg font-black text-white mb-1 3xl:mb-2 group-hover:text-emerald-400 transition-colors">
                          {point.title}
                        </h3>
                        <p className="text-sm lg:text-md text-gray-400 leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover Line Animation */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-500 rounded-full" />
                  </div>
                ))}
              </div>

              {/* Tagline - Compact */}
              <div className="relative mt-4 lg:mt-6">
                <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-xl blur-lg" />
                <div className="relative bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-4 lg:p-4 border-2 border-emerald-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-emerald-400 to-transparent" />
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent" />
                  </div>
                  <p className="text-sm sm:text-md lg:text-lg font-black text-center bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
                    "Connecting Opportunities, Building Growth."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        videoSrc={VIDEO_TEASER_SRC}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
}