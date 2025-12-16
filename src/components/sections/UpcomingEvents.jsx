import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Sparkles,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import UpcomingEventModal from "../UpcomingEventModal";
import VideoModal from "../VideoModal";
import { Badge } from "../Badge";

const UpcomingEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const upcomingEvents = [
    // {
    //   id: 3,
    //   title: "Momentum in Insurance – Hong Kong",
    //   date: "2025-11-27",
    //   location: "Prince and the Peacock, Hongkong",
    //   type: "Networking Drinks",
    //   attendees: "30+",
    //   description:
    //     "Hong Kong's insurance sector is at a turning point. Beyond managing technical debt, insurers must now address capability debt to accelerate their plans to build new digital and operational capabilities to remain competitive, accelerate growth, and align with the city's vision as a global insurance hub. DXC Technology, together with AWS, ServiceNow, and Dynatrace, invites you to an exclusive executive session: Momentum in Insurance - Hong Kong.",
    //   image:
    //     "/images/banners/Momentum-in-Insurance.webp",
    //   registrationStatus: "Open",
    //   registrationLink: "https://momentum-in-insurance-1.thetehgroup.com/",
    //   highlights: ["Networking Drinks", "Exclusive Executive Session"],
    // },
    {
      id: 1,
      title: "Zenith Live Encore Malaysia",
      date: "2026-01-22",
      location: "The St. Regis, Jalan Stesen Sentral 2, Kuala Lumpur Sentral, Malaysia",
      type: "Networking Lunch",
      attendees: "30+",
      description:
        "Join us for this morning event focused on accelerating your Zero Trust journey, expanding your Zscaler use cases, and learning how Industry is driving better outcomes across users, workloads, branches, OT/IoT, and AI.",
      image:
        "https://storage.thetehgroup.com/flmngr-prod/images/69280c62b070c_8e30af1a78b17aaf880ef1f9f5853c47.jpg",
      registrationStatus: "Open",
      registrationLink: "https://event.thetehgroup.com/zenith-live-encore-malaysia/overview?token=ZT01NDgzNDU1NC05NTg0LTQwOGMtOGFmOC1hYTBjZDkyOTIxZGY%3d",
      highlights: ["Networking Lunch", "Exclusive Executive Session"],
    },
    {
      id: 2,
      title: "Nexus Indonesia 2026",
      date: "2026-02-04",
      location: "Pullman Ciawi Vimala Hills Resort, Indonesia",
      type: "Conference",
      attendees: "200+",
      description:
        "Join us for AI Nexus Indonesia 2026, a premier gathering of leading minds in Artificial Intelligence and Cybersecurity from across Asia. This exclusive event will bring together senior executives, technology leaders, and innovators to explore the latest trends, address real-world challenges, and build strategic connections that shape the future of AI and Cybersecurity.",
      image:
        "/images/banners/Nexus-Apac-Indonesia.webp",
      registrationStatus: "Open",
      registrationLink:
        "https://event.thetehgroup.com/-nexus-indonesia-2026/overview?token=ZT1jNTU3N2JiMy0wOTJkLTRjNjUtODIyNi0zMjUzODEwNDE4NGU%3d",
      highlights: [
        "One-to-One Meetings",
        "Technology Showcase",
        "Expert-Led Sessions",
      ],
    },
    {
      id: 3,
      title: "Nexus Singapore 2026",
      date: "2026-03-11",
      location: "Mandai Rainforest Resort by Banyan Tree",
      type: "Conference",
      attendees: "200+",
      description:
        "Join us for Nexus Singapore 2026, an exclusive executive retreat that redefines the traditional conference experience by uniting the most influential leaders in cybersecurity, AI  and digital innovation for intimate, high-level discussions, curated thought leadership, and actionable outcomes. Designed to foster candor, collaboration, and meaningful partnerships, Nexus blends strategic dialogue with structured buyer-seller engagements, creating both transformative insights and tangible business opportunities. It is a rare environment where leadership meets opportunity-exclusive, purposeful, and built to deliver results This exclusive event will bring together senior executives, technology leaders, and innovators to explore the latest trends, address real-world challenges, and build strategic connections that shape the future of AI and Cybersecurity.",
      image:
        "https://storage.thetehgroup.com/flmngr-prod/images/68d2499badd26_FA 16x9 AI Nexus APAC 2026 Landing Page.webp",
      registrationStatus: "Open",
      registrationLink: "https://event.thetehgroup.com/-nexus-singapore-2026/overview?token=ZT1kNmZmMTFiMC1iZTFhLTQ0NjEtOWY3OS05MjczMmY0MmY4ZjU%3d",
      highlights: ["Conference", "Exclusive Executive Session"],
    },
    {
      id: 4,
      title: "Beyond Passwords: Securing the Workforce with Zero Trust – Exclusive Luncheon Roundtable",
      date: "2026-03-12",
      location: "Pullman Melbourne City Centre - Room 1954",
      type: "Roundtable Luncheon",
      attendees: "20+",
      description:
        "Join us for an exclusive roundtable luncheon to explore how adopting phishing-resistant authentication can help you strengthen your security posture while delivering a seamless user experience. Together, we’ll unpack the principles of Zero Trust, passwordless access, and modern authentication strategies that leading organisations are leveraging to reduce risk and streamline workforce security.",
      image:
        "/images/banners/Exclusive-luncheon.png",
      registrationStatus: "Open",
      registrationLink:
        "https://event.thetehgroup.com/-beyond-passwords-securing-the-workforce-with-zero-trust-exclusive-luncheon-roundtable/overview?token=ZT03YTFlNjc2NC04ZDhlLTQ4NjQtYTFlNy00YmZkNjc0ZTBkMGU%3d",
      highlights: [
        "Business Strategy",
        "Exclusive Luncheon Roundtable",
        "Exclusive Executive Session",
      ],
    },
    {
      id: 5,
      title: "Tech Fest 2026",
      date: "2026-05-21",
      location: "Convention Hall, Hong Kong Convention and Exhibition Centre",
      type: "Conference",
      attendees: "2000+",
      description:
        "Welcome to the most electrifying tech experience in the city. Tech Fest Hong Kong unites over 2,000+ senior tech leaders, visionary executives and bold decision-makers - powered by the teams behind Cloud Forum (a KORNERSTONE event), Revive Tech Asia, and Cyber Attack (a TEH Group event).",
      image:
        "/images/banners/tech-fest.png",
      video: "https://files.thetehgroup.com/hktechfest/Video/HIGHLIGHT-TECHFEST.mp4",
      registrationStatus: "Open",
      registrationLink:
        "https://event.thetehgroup.com/tech-fest-2026/overview?token=ZT0wZWFhMmU3YS0yNmM0LTRjMWQtODE4YS00NDgyMThhOTQ1OGI%3d",
      highlights: [
        "One-to-One Business Matchmaking",
        "2000+ Senior Tech Leaders",
        "Workshops",
        "Roundtable Discussions",
        "Exhibition",
        "Awards Celebration",
        "Conferences",
        "World Cafe Dialogue"
      ],
    },
  ];

  const getDaysLeft = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDuration = (eventDate) => {
    const daysLeft = getDaysLeft(eventDate);
    if (daysLeft < 0) {
      return "Event Passed";
    } else if (daysLeft === 0) {
      return "Today";
    } else if (daysLeft === 1) {
      return "1 Day Left";
    } else if (daysLeft <= 7) {
      return `${daysLeft} Days Left`;
    } else if (daysLeft <= 30) {
      return `${daysLeft} Days Left`;
    } else {
      const months = Math.floor(daysLeft / 30);
      const days = daysLeft % 30;
      if (months === 0) {
        return `${daysLeft} Days Left`;
      } else if (days === 0) {
        return `${months} ${months === 1 ? "Month" : "Months"} Left`;
      } else {
        return `${months} ${months === 1 ? "Month" : "Months"} ${days} ${days === 1 ? "Day" : "Days"} Left`;
      }
    }
  };

  const getRegistrationStatusConfig = (status) => {
    switch (status) {
      case "Open":
        return {
          icon: CheckCircle,
          color: "emerald",
          bgClass: "bg-emerald-500/20",
          textClass: "text-emerald-400",
          borderClass: "border-emerald-400/50",
        };
      case "Limited":
        return {
          icon: AlertCircle,
          color: "orange",
          bgClass: "bg-orange-500/20",
          textClass: "text-orange-400",
          borderClass: "border-orange-400/50",
        };
      case "Closed":
        return {
          icon: XCircle,
          color: "red",
          bgClass: "bg-red-500/20",
          textClass: "text-red-400",
          borderClass: "border-red-400/50",
        };
      default:
        return {
          icon: CheckCircle,
          color: "blue",
          bgClass: "bg-blue-500/20",
          textClass: "text-blue-400",
          borderClass: "border-blue-400/50",
        };
    }
  };

  const handleNavigation = useCallback(
    (direction) => {
      if (direction === "next" && activeIndex < upcomingEvents.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else if (direction === "prev" && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    },
    [activeIndex, upcomingEvents.length]
  );

  // Horizontal carousel with flip effect - Different from PastEvents
  const getCardStyle = useCallback(
    (index) => {
      const diff = index - activeIndex;
      const isActive = diff === 0;

      let transform = "";
      let opacity = 0.5;
      let scale = 0.85;
      let zIndex = 0;
      let rotateY = 0;
      let willChange = "auto";

      if (isActive) {
        // Center card - larger and straight
        transform = "translateX(0%) translateZ(0)";
        opacity = 1;
        scale = 1;
        zIndex = 10;
        rotateY = 0;
        willChange = "transform";
      } else if (diff === -1) {
        // Left card - slight flip to right
        transform = "translateX(-90%) translateZ(0)";
        opacity = 0.65;
        scale = 0.88;
        zIndex = 5;
        rotateY = 25;
        willChange = "transform";
      } else if (diff === 1) {
        // Right card - slight flip to left
        transform = "translateX(90%) translateZ(0)";
        opacity = 0.65;
        scale = 0.88;
        zIndex = 5;
        rotateY = -25;
        willChange = "transform";
      } else if (diff < -1) {
        // Far left
        transform = "translateX(-130%) translateZ(0)";
        opacity = 0;
        scale = 0.75;
        zIndex = 0;
        rotateY = 40;
        willChange = "auto";
      } else if (diff > 1) {
        // Far right
        transform = "translateX(130%) translateZ(0)";
        opacity = 0;
        scale = 0.75;
        zIndex = 0;
        rotateY = -40;
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
      className="relative w-full bg-gradient-to-b from-black via-emerald-950/20 to-black py-16 lg:py-24 overflow-hidden"
      style={{ isolation: "isolate" }}>
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
          <motion.div
            className="absolute rounded-full blur-3xl"
            key={i}
            style={{
              background:
                i === 0
                  ? "radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent)"
                  : i === 1
                  ? "radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent)"
                  : "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent)",
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              top: `${20 + i * 30}%`,
              left: `${10 + i * 30}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, i % 2 === 0 ? 15 : -12, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge
            icon={<Sparkles className="w-4 h-4 text-emerald-400" />}
            text="Featured Opportunities"
            color="emerald"
          />
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              <span className="text-white">Join Our </span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Next Engagement
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mt-3 max-w-3xl mx-auto">
              Register now for exclusive access to our featured Opportunities.
              Connect with industry leaders and expand your network.
            </p>
          </div>
        </div>

        {/* Horizontal Coverflow Carousel */}
        <div className="relative pb-16">
          {/* Navigation Buttons - Desktop */}
          <div className="hidden lg:block absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-30">
            <motion.button
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("prev")}
              disabled={activeIndex === 0}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                activeIndex === 0
                  ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                  : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70"
              }`}>
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="hidden lg:block absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-30">
            <motion.button
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("next")}
              disabled={activeIndex === upcomingEvents.length - 1}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                activeIndex === upcomingEvents.length - 1
                  ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                  : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70"
              }`}>
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Mobile Navigation - Top */}
          <div className="lg:hidden flex items-center justify-center gap-4 mb-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("prev")}
              disabled={activeIndex === 0}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                activeIndex === 0
                  ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                  : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50"
              }`}>
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-sm text-white font-semibold">
                {activeIndex + 1} / {upcomingEvents.length}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("next")}
              disabled={activeIndex === upcomingEvents.length - 1}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                activeIndex === upcomingEvents.length - 1
                  ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                  : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50"
              }`}>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Coverflow Cards - Horizontal */}
          <div
            className="relative h-[580px] lg:h-[620px] flex items-center justify-center overflow-hidden"
            style={{
              perspective: "2000px",
              perspectiveOrigin: "center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}>
            <div className="relative w-full max-w-lg lg:max-w-2xl h-full flex items-center justify-center">
              {upcomingEvents.map((event, index) => {
                const cardStyle = getCardStyle(index);
                const isActive = index === activeIndex;
                const diff = Math.abs(index - activeIndex);

                // Only render visible cards
                if (diff > 2) return null;

                const daysLeft = getDaysLeft(event.date);
                const statusConfig = getRegistrationStatusConfig(
                  event.registrationStatus
                );
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={event.id}
                    className="absolute w-full max-w-sm lg:max-w-md cursor-pointer"
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
                          ? "border-2 border-emerald-400/50 bg-white/10 shadow-[0_0_60px_rgba(16,185,129,0.4),0_20px_70px_rgba(0,0,0,0.4)]"
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
                      {/* Image Section */}
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

                        {/* Countdown Badge */}
                        <div className="absolute top-3 left-3">
                          <div
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border ${
                              daysLeft <= 7
                                ? "bg-red-500/20 border-red-400/50"
                                : daysLeft <= 30
                                ? "bg-orange-500/20 border-orange-400/50"
                                : "bg-emerald-500/20 border-emerald-400/50"
                            }`}>
                            <Clock
                              className={`w-4 h-4 ${
                                daysLeft <= 7
                                  ? "text-red-400"
                                  : daysLeft <= 30
                                  ? "text-orange-400"
                                  : "text-emerald-400"
                              }`}
                            />
                            <span
                              className={`text-sm font-bold ${
                                daysLeft <= 7
                                  ? "text-red-300"
                                  : daysLeft <= 30
                                  ? "text-orange-300"
                                  : "text-emerald-300"
                              }`}>
                              {daysLeft} Days
                            </span>
                          </div>
                        </div>

                        {/* Event Type Badge */}
                        <div className="absolute bottom-3 right-3">
                          <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                            <span className="text-white text-xs font-semibold uppercase tracking-wider">
                              {event.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 sm:p-6 space-y-3">
                        {/* Registration Status */}
                        <div className="flex items-center justify-between">
                          <div
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgClass} border ${statusConfig.borderClass}`}>
                            <StatusIcon
                              className={`w-4 h-4 ${statusConfig.textClass}`}
                            />
                            <span
                              className={`text-xs font-bold uppercase tracking-wider ${statusConfig.textClass}`}>
                              {event.registrationStatus}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3
                          className={`text-lg sm:text-xl font-bold leading-tight line-clamp-2 transition-all duration-300 ${
                            isActive
                              ? "group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 group-hover:bg-clip-text text-white"
                              : "text-gray-300"
                          }`}>
                          {event.title}
                        </h3>

                        {/* Event Details */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <span>
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Users className="w-4 h-4 text-emerald-400" />
                              <span>{event.attendees}</span>
                            </div>
                            <div className="text-cyan-400 font-semibold text-xs">
                              {getDuration(event.date)}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>

                        {/* CTA Button - Only on active */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                              }}
                              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                                event.registrationStatus === "Closed"
                                  ? "bg-gray-500/20 text-gray-400 border border-gray-500/30 cursor-not-allowed"
                                  : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-[0_10px_40px_rgba(16,185,129,0.4)]"
                              }`}
                              disabled={event.registrationStatus === "Closed"}>
                              {event.registrationStatus === "Closed"
                                ? "Registration Closed"
                                : "View Details"}
                              {event.registrationStatus !== "Closed" && (
                                <ExternalLink className="w-4 h-4" />
                              )}
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Indicators - Desktop */}
          <div className="hidden lg:flex items-center justify-center gap-2 mt-8">
            {upcomingEvents.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-8 bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/50"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Mobile Progress Indicators */}
          <div className="lg:hidden flex items-center justify-center gap-2 mt-6">
            {upcomingEvents.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-6 bg-gradient-to-r from-emerald-500 to-cyan-500"
                    : "w-2 bg-white/20"
                }`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpcomingEventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onVideoPlay={(video) => {
          setVideoSrc(video);
          setIsVideoModalOpen(true);
        }}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={videoSrc}
      />
    </section>
  );
};

export default UpcomingEvents;