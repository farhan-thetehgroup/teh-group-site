// sections/EventExperience.jsx
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Calendar, Users, Clock, Sparkles } from "lucide-react";
import ExperienceModal from "../ExperienceModal";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const EventExperience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const scrollTweenRef = useRef(null);
  const triggersRef = useRef([]);

  const cleanupSectionTriggers = () => {
    triggersRef.current.forEach((trigger) => trigger?.kill?.(true));
    triggersRef.current = [];
  };

  // Offset untuk positioning
  const POSITION_OFFSET = -80;

  // Detect mobile/desktop on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth < 1024;
      setIsMobile(nowMobile);

      // If switching between mobile/desktop, force refresh all ScrollTriggers
      if (wasMobile !== nowMobile) {
        setTimeout(() => {
          ScrollTrigger.refresh(true);
        }, 100);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  // Memoize card dimensions based on screen size
  const cardDimensions = useMemo(() => {
    if (typeof window === "undefined") return { width: 340, height: 540 };

    const width =
      window.innerWidth < 640 ? 340
      : window.innerWidth < 1024 ? 380
      : window.innerWidth < 1440 ? 400
      : window.innerWidth < 1920 ? 440
      : window.innerWidth < 2560 ? 480
      : 560;
    const height =
      window.innerWidth < 640 ? 540
      : window.innerWidth < 1024 ? 600
      : window.innerWidth < 1440 ? 620
      : window.innerWidth < 1920 ? 640
      : window.innerWidth < 2560 ? 680
      : 740;

    return { width, height };
  }, [isMobile]);

  // Memoize container padding style dengan offset
  const containerPaddingStyle = useMemo(() => {
    if (typeof window === "undefined") return {};

    if (isMobile) {
      const horizontalPadding = Math.max(
        (window.innerWidth - cardDimensions.width) / 2,
        0
      );
      return {
        paddingLeft: `${horizontalPadding}px`,
        paddingRight: `${horizontalPadding}px`,
      };
    } else {
      const scrollAreaWidth = window.innerWidth * 0.65;
      const horizontalCenter = Math.max(
        0,
        scrollAreaWidth / 2 - cardDimensions.width / 2 + POSITION_OFFSET
      );
      return {
        paddingLeft: `${horizontalCenter}px`,
        paddingRight: `${horizontalCenter}px`,
      };
    }
  }, [isMobile, cardDimensions.width]);

  const experiences = [
    {
      id: 1,
      title: "Executive Lunch",
      category: "Networking",
      description:
        "Intimate dining experiences with C-level executives in premium venues. Connect with industry leaders in a relaxed, upscale setting designed to foster meaningful conversations and strategic partnerships.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
      sessionDuration: "2-3 hours",
      attendance: "15-30 executives",
      eventDuration: "Half day",
      gallery: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      id: 2,
      title: "VIP Dinner",
      category: "Networking",
      description:
        "Exclusive evening events for senior decision-makers and sponsors. Experience world-class hospitality while building relationships with key stakeholders in an elegant, private atmosphere.",
      image:
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sessionDuration: "3-4 hours",
      attendance: "15-30 VIPs",
      eventDuration: "Evening",
      gallery: [
        "https://images.unsplash.com/photo-1559314809-0f155186bb2e?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1544148103-0413438db0b9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      id: 3,
      title: "Panel Discussion",
      category: "Thought Leadership",
      description:
        "Thought leadership sessions with industry experts and moderators. Gain insights from leading voices in technology and business through engaging discussions on trending topics and future innovations.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      sessionDuration: "1-2 hours",
      attendance: "50-200 attendees",
      eventDuration: "90 minutes",
      gallery: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1496337589254-7e19d01fa585?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      id: 4,
      title: "One-on-One Meeting",
      category: "Strategic Networking",
      description:
        "Pre-scheduled business meetings between sponsors and target accounts. Maximize ROI with focused, high-quality conversations tailored to your business objectives and partnership goals.",
      image:
        "https://images.unsplash.com/photo-1630672790237-38eeb57cb60b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sessionDuration: "30-45 minutes",
      attendance: "2 participants",
      eventDuration: "Custom schedule",
      gallery: [
        "https://images.unsplash.com/photo-1551836026-d5c8cbf7e65a?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      id: 5,
      title: "Conference",
      category: "Large Scale Event",
      description:
        "Large-scale technology conferences with multiple tracks and sessions. Join hundreds of attendees for comprehensive industry coverage, networking opportunities, and hands-on demonstrations of cutting-edge technologies.",
      image:
        "https://images.unsplash.com/photo-1571645163064-77faa9676a46?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sessionDuration: "Full day",
      attendance: "200-1000+ attendees",
      eventDuration: "1-2 days",
      gallery: [
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      id: 6,
      title: "Interactive Workshop",
      category: "Hands-On Learning",
      description:
        "Hands-on learning sessions with practical demonstrations. Engage with experts in interactive environments designed to build skills, share best practices, and drive innovation through collaborative learning.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
      sessionDuration: "2-4 hours",
      attendance: "10-50 participants",
      eventDuration: "Half day",
      gallery: [
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80",
      ],
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !cardsContainer) return;

    // Clean up any existing GSAP animations first
    cleanupSectionTriggers();

    // Reset transform on resize
    gsap.set(cardsContainer, { x: 0 });

    // Mobile: horizontal scroll with snap
    if (isMobile) {
      const handleScroll = () => {
        if (!cardsContainer) return;

        const cards = cardsContainer.querySelectorAll("[data-experience-card]");
        if (cards.length === 0) return;

        const containerCenter =
          cardsContainer.scrollLeft + cardsContainer.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(containerCenter - cardCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      };

      // Use passive listener for better scroll performance
      cardsContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      // Initial check after a small delay to ensure layout is ready
      const timeoutId = setTimeout(handleScroll, 100);

      return () => {
        cardsContainer.removeEventListener("scroll", handleScroll);
        clearTimeout(timeoutId);
      };
    }

    // Desktop: pinned horizontal scroll dengan GSAP
    const totalExperiences = experiences.length;
    const cardWidth = cardDimensions.width;
    const gap = 32;
    const scrollAreaWidth = window.innerWidth * 0.65;

    // Calculate padding dengan offset
    const horizontalCenter = Math.max(
      0,
      scrollAreaWidth / 2 - cardWidth / 2 + POSITION_OFFSET
    );

    // Calculate max scroll distance so last card stays centered
    const maxScrollDistance =
      (totalExperiences - 1) * (cardWidth + gap) + horizontalCenter;
    const scrollDistance = totalExperiences * 100;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      gsap.set(cardsContainer, { x: 0 });

      const tween = gsap.to(cardsContainer, {
        x: () => -maxScrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollDistance}%`,
          invalidateOnRefresh: true,
          onRefresh: () => {
            gsap.set(cardsContainer, { x: 0 });
          },
          onUpdate: (self) => {
            const progress = self.progress;
            const progressPerCard = 1 / totalExperiences;
            const currentCardIndex = Math.min(
              Math.floor(progress / progressPerCard),
              totalExperiences - 1
            );
            if (currentCardIndex !== activeIndex) {
              setActiveIndex(currentCardIndex);
            }
          },
        },
      });

      scrollTweenRef.current = tween.scrollTrigger;
      triggersRef.current.push(tween.scrollTrigger);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
        scrollTweenRef.current = null;
      }
      cleanupSectionTriggers();
    };
  }, [isMobile, experiences.length, cardDimensions.width]);

  return (
    <>
      <section
        className="relative lg:h-screen w-full lg:overflow-hidden bg-gradient-to-b from-black via-emerald-950/20 to-black py-16 lg:py-0"
        ref={sectionRef}
        style={{
          zIndex: 'var(--z-section, 1)',
          isolation: 'isolate',
        }}>
        {/* Background Effects */}
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

        {/* Mobile Header Section */}
        <div className="lg:hidden px-4 sm:px-6 mb-8 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-xs">
              Event Formats
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black leading-tight">
            <span className="text-white">Our Event</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Experiences
            </span>
          </h2>

          {/* Description */}
          <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
            Discover diverse event formats tailored to your business needs. From
            intimate executive gatherings to large-scale conferences.
          </p>
        </div>

        {/* Container */}
        <div
          className="relative h-full flex flex-col lg:flex-row"
          ref={containerRef}>
          {/* Left Section - Pinned Content (Desktop only) */}
          <div className="hidden lg:flex lg:w-[35%] items-center justify-center px-8 xl:px-12 relative z-20">
            <div className="max-w-md space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold uppercase tracking-wider text-xs">
                  Event Formats
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight">
                <span className="text-white">Our Event</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Experiences
                </span>
              </h2>

              {/* Description */}
              <p className="text-base md:text-md lg:text-lg text-gray-300 leading-relaxed">
                Discover diverse event formats tailored to your business needs.
                From intimate executive gatherings to large-scale conferences.
              </p>

              {/* Active Experience Info */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/50 to-transparent" />
                  <span className="text-xs text-emerald-300 uppercase tracking-wider">
                    Now Viewing
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-cyan-400/50 to-transparent" />
                </div>
              <div className="text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    className="space-y-1"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}>
                    <div className="text-xl xl:text-2xl font-bold text-white">
                      {experiences[activeIndex]?.title}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {experiences[activeIndex]?.category}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              </div>
            </div>
          </div>

          {/* Right Section - Scrolling Experiences */}
          <div className="w-full lg:w-[65%] relative lg:overflow-hidden flex items-center">
            {/* Gradient Overlay on Left Edge - to fade cards (Desktop only) */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />

            {/* Mobile: Horizontal Scroll Container with Snap */}
            <div
              className="flex items-center gap-6 lg:gap-8 lg:h-full overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none no-scrollbar"
              ref={cardsContainerRef}
              style={{
                willChange: "transform",
                ...containerPaddingStyle,
                paddingLeft:
                  isMobile ?
                    containerPaddingStyle.paddingLeft
                  : `calc(${containerPaddingStyle.paddingLeft ?? "0px"} + 8rem)`,
              }}>
              {experiences.map((experience, index) => {
                const isActive = index === activeIndex;
                const scale = isActive ? 1 : 0.85;
                const opacity = isActive ? 1 : 0.5;

                return (
                  <div
                    key={experience.id}
                    data-experience-card
                    className="flex-shrink-0 transition-all duration-500 ease-out cursor-pointer snap-center lg:snap-align-none"
                    style={{
                      transform: isMobile ? "scale(1)" : `scale(${scale})`,
                      opacity:
                        isMobile ?
                          isActive ? 1
                          : 0.6
                        : opacity,
                      width: `${cardDimensions.width}px`,
                      willChange: "transform, opacity",
                    }}
                    onClick={() => setSelectedExperience(experience)}>
                    <div
                      className={`
                        relative rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500
                        ${
                          isActive ?
                            "bg-gradient-to-br from-emerald-900/90 via-slate-900/90 to-black/90 border-2 border-emerald-400/50 shadow-[0_0_80px_rgba(16,185,129,0.4)]"
                          : "bg-gradient-to-br from-slate-900/60 to-black/60 border border-white/10"
                        }
                      `}
                      style={{ height: `${cardDimensions.height}px` }}>
                      {/* Image Section with Overlay */}
                      <div className="relative overflow-hidden">
                        <img
                          alt={experience.title}
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            isActive ? "scale-110" : "scale-100"
                          }`}
                          src={experience.image}
                          loading={index < 2 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40">
                            <span className="text-emerald-300 font-semibold text-xs uppercase tracking-wider">
                              {experience.category}
                            </span>
                          </div>
                        </div>

                        {/* Attendance Badge */}
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
                          <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-white font-semibold text-xs">
                              {experience.attendance}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
                        {/* Title */}
                        <h3
                          className={`font-bold transition-all duration-500 ${
                            isActive ?
                              "text-lg sm:text-xl lg:text-2xl text-white"
                            : "text-base sm:text-lg lg:text-xl text-gray-300"
                          }`}>
                          {experience.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`leading-relaxed transition-all duration-500 ${
                            isActive ?
                              "text-sm sm:text-base text-gray-300 line-clamp-3"
                            : "text-xs sm:text-sm text-gray-500 line-clamp-2"
                          }`}>
                          {experience.description}
                        </p>
                        {isActive && (
                          <div className="grid grid-cols-3 gap-2">
                            {/* Session Duration */}
                            <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 mb-1" />
                              <span className="text-xs text-gray-400 mb-0.5">
                                Session
                              </span>
                              <span className="text-xs font-semibold text-emerald-300 text-center">
                                {experience.sessionDuration}
                              </span>
                            </div>

                            {/* Event Duration */}
                            <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
                              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 mb-1" />
                              <span className="text-xs text-gray-400 mb-0.5">
                                Duration
                              </span>
                              <span className="text-xs font-semibold text-cyan-300 text-center">
                                {experience.eventDuration}
                              </span>
                            </div>

                            {/* Gallery Count */}
                            <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl bg-blue-500/10 border border-blue-400/20">
                              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-1 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                              </div>
                              <span className="text-xs text-gray-400 mb-0.5">
                                Photos
                              </span>
                              <span className="text-xs font-semibold text-blue-300">
                                {experience.gallery.length}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* View Details Button */}
                        {isActive && (
                          <button
                            className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm sm:text-base font-semibold hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)] transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedExperience(experience);
                            }}>
                            View Details
                          </button>
                        )}
                      </div>

                      {/* Glow Effect for Active Card */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/30 via-cyan-500/30 to-blue-500/30 blur-2xl" />
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Experience Indicators - Fixed position, always centered */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 lg:left-[calc(35%+32.5%)] transform -translate-x-1/2 z-20 pointer-events-auto">
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
            {experiences.map((experience, index) => (
              <button
                key={experience.id}
                className={`transition-all duration-500 rounded-full ${
                  index === activeIndex ?
                    "w-10 sm:w-12 h-2.5 sm:h-3 bg-gradient-to-r from-emerald-400 to-cyan-400"
                  : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => {
                  const container = cardsContainerRef.current;
                  if (!container) return;

                  // Mobile: scroll horizontally to card
                  if (isMobile) {
                    const cards = container.querySelectorAll(
                      "[data-experience-card]"
                    );
                    const targetCard = cards[index];
                    if (targetCard) {
                      targetCard.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                        block: "nearest",
                      });
                    }
                  } else {
                    // Desktop: GSAP scroll to position
                    if (scrollTweenRef.current) {
                      const totalCards = experiences.length;
                      const progressPerCard = 1 / totalCards;
                      const targetProgress = index * progressPerCard;

                      gsap.to(window, {
                        scrollTo: {
                          y:
                            scrollTweenRef.current.start +
                            (scrollTweenRef.current.end -
                              scrollTweenRef.current.start) *
                              targetProgress,
                          autoKill: false,
                        },
                        duration: 1,
                        ease: "power2.inOut",
                      });
                    }
                  }
                }}
                aria-label={`View ${experience.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Modal */}
      <ExperienceModal
        experience={selectedExperience}
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </>
  );
};

export default EventExperience;
