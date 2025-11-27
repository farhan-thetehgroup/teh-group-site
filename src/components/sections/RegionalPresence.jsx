import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "lucide-react";
import { Badge } from "../Badge";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    country: "China",
    status: "Operational",
    city: "Shanghai",
    flag: "China",
    card: { top: "16%", left: "40%", transform: "translate(-80%, -50%)" },
    pin: { top: "16%", left: "43%" },
  },
  {
    country: "Hong Kong",
    status: "Strong Market",
    city: "Central",
    flag: "Hongkong",
    card: { top: "37%", left: "43%", transform: "translate(-70%, -50%)" },
    pin: { top: "37%", left: "34%" },
  },
  {
    country: "Malaysia",
    status: "Strong Market",
    city: "Kuala Lumpur",
    flag: "Malaysia",
    card: { top: "55%", left: "40%", transform: "translate(-60%, -50%)" },
    pin: { top: "55%", left: "32%" },
  },
  {
    country: "Philippines",
    status: "Strong Market",
    city: "Manila",
    flag: "Philippines",
    card: { top: "50%", left: "55%", transform: "translate(-50%, -50%)" },
    pin: { top: "50%", left: "48%" },
  },
  {
    country: "Vietnam",
    status: "Operational",
    city: "Ho Chi Minh",
    flag: "Vietnam",
    card: { top: "46%", left: "43%", transform: "translate(-60%, -50%)" },
    pin: { top: "46%", left: "36%" },
  },
  {
    country: "Singapore",
    status: "Strong Market",
    city: "Singapore",
    flag: "Singapura",
    card: { top: "64%", left: "27%", transform: "translate(-60%, -50%)" },
    pin: { top: "60%", left: "32%" },
  },
  {
    country: "Indonesia",
    status: "Strong Market",
    city: "Jakarta",
    flag: "Indonesia",
    card: { top: "76%", left: "43%", transform: "translate(-70%, -50%)" },
    pin: { top: "71%", left: "35%" },
  },
  {
    country: "Thailand",
    status: "Operational",
    city: "Bangkok",
    flag: "Thailand",
    card: { top: "46%", left: "31%", transform: "translate(-80%, -50%)" },
    pin: { top: "46%", left: "34%" },
  },
  {
    country: "Taiwan",
    status: "Operational",
    city: "Taipei",
    flag: "Taiwan",
    card: { top: "28%", left: "50%", transform: "translate(-50%, -50%)" },
    pin: { top: "28%", left: "44%" },
  },
  {
    country: "Australia",
    status: "Strong Market",
    city: "Sydney",
    flag: "Australia",
    card: { top: "85%", left: "50%", transform: "translate(-50%, -50%)" },
    pin: { top: "80%", left: "50%" },
  },
];

const RegionalPresence = () => {
  const sectionRef = useRef(null);
  const globeRef = useRef(null);
  const [activeFlags, setActiveFlags] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const triggersRef = useRef([]);

  const cleanupSectionTriggers = () => {
    triggersRef.current.forEach((trigger) => trigger?.kill?.(true));
    triggersRef.current = [];
  };

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth < 768;
      setIsMobile(nowMobile);

      // If switching between mobile/desktop, kill all ScrollTriggers and refresh
      if (wasMobile !== nowMobile) {
        cleanupSectionTriggers();

        // Force refresh after a brief delay
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };

    checkMobile();

    // Debounce resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isMobile]);

  useEffect(() => {
    // Jika mobile, tidak perlu setup GSAP ScrollTrigger
    if (isMobile) {
      // Cleanup any existing ScrollTriggers
      const section = sectionRef.current;
      if (section) {
        cleanupSectionTriggers();

        // Reset inline styles that might have been added by pin
        section.style.transform = '';
        section.style.position = '';
        section.style.top = '';
        section.style.left = '';
        section.style.width = '';
        section.style.height = '';
      }

      // Reset transforms
      if (globeRef.current) {
        gsap.set(globeRef.current, { clearProps: "all" });
      }
      gsap.set(".pulse-ring", { clearProps: "all" });

      // Tampilkan semua lokasi di mobile
      setActiveFlags(locations.length);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    // Clean up any existing GSAP animations first
    cleanupSectionTriggers();

    // Reset inline styles
    section.style.transform = '';
    section.style.position = '';
    section.style.top = '';
    section.style.left = '';

    // Reset transforms
    if (globeRef.current) {
      gsap.set(globeRef.current, { clearProps: "all" });
    }
    gsap.set(".pulse-ring", { clearProps: "all" });

    const timeoutId = setTimeout(() => {
      // OPTIMIZED: Simplified ScrollTrigger with reduced animation complexity
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=200%",
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        pinReparent: false,
        onUpdate: (self) => {
          const progress = self.progress;

          // OPTIMIZED: Only update active flags, removed heavy animations
          const totalFlags = locations.length;
          const activeCount = Math.min(
            totalFlags,
            Math.ceil(progress * totalFlags)
          );
          setActiveFlags(activeCount);

          // OPTIMIZED: Simplified globe scale animation
          if (globeRef.current) {
            gsap.to(globeRef.current, {
              scale: 1 + progress * 0.1, // Reduced from 0.15
              duration: 0.2, // Increased from 0.1 for smoother feel
              ease: "power1.out",
            });
          }

          // OPTIMIZED: Removed pulse ring animations - too heavy
        },
      });

      triggersRef.current.push(scrollTriggerInstance);

      return () => {
        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill(true);
        }
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);

      // Aggressive cleanup
      cleanupSectionTriggers();

      // Reset all inline styles added by ScrollTrigger pin
      if (section) {
        section.style.cssText = '';
        section.removeAttribute('style');

        // Re-apply only the necessary styles
        section.style.zIndex = 'var(--z-section, 1)';
        section.style.isolation = 'isolate';
        section.style.willChange = 'auto';
      }

      // Reset globe and rings
      if (globeRef.current) {
        gsap.set(globeRef.current, { clearProps: "all" });
      }
      gsap.set(".pulse-ring", { clearProps: "all" });

      // Force a refresh to recalculate all ScrollTriggers
      ScrollTrigger.refresh(true);
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="regional-presence-section relative overflow-hidden pt-16 pb-48"
      style={{
        zIndex: 'var(--z-section, 1)',
        isolation: 'isolate',
        willChange: 'auto',
      }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Pulse Rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="pulse-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-400/30"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          />
        ))}

        {/* OPTIMIZED: Reduced particles by 60% */}
        {[...Array(isMobile ? 4 : 6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-400/20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              willChange: "auto", // Removed conditional
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="section-header text-start mb-10 md:mb-14 relative z-20">
          <Badge
            icon={<Globe className="w-4 h-4 text-emerald-400" />}
            text="Market Coverage"
            color="emerald"
          />
          <h2 className="mx-auto mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 font-extrabold text-white max-w-7xl">
            Regional Operations & Market Coverage
          </h2>
        </div>
      </div>

      {/* Desktop View - Globe dengan pins */}
      <div className="hidden lg:block relative mt-12 max-w-7xl 3xl:max-w-screen-2xl mx-auto px-6 lg:px-10 h-[400px] md:h-[500px] lg:h-[600px] 3xl:h-[800px] 4xl:h-[1000px]" style={{ zIndex: 'var(--z-section-content, 2)' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
          <div className="globe-gradient-circle animate-globe-gradient opacity-80" />
        </div>

        {/* Animated Globe */}
        <div
          ref={globeRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            zIndex: 2,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}>
          <img
            src="/images/pattern/globe-asia.svg"
            alt="Globe illustration"
            className="w-full h-full object-cover object-top mix-blend-normal z-10 transition-transform duration-100"
            style={{
              transform: 'translateZ(0)',
            }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
          {locations.map((location, index) => (
            <div key={`location-${location.country}`}>
              <div
                className={`location-pin absolute transition-all duration-500 ${
                  index < activeFlags ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  top: location.pin.top,
                  left: location.pin.left,
                }}
              />
              <div
                className={`flag-badge flex items-center p-1.5 justify-center gap-3 pointer-events-auto absolute transition-all duration-500 ${
                  index < activeFlags ?
                    "opacity-100 scale-100"
                  : "opacity-0 scale-90"
                }`}
                style={{
                  top: location.card.top,
                  left: location.card.left,
                  transform: location.card.transform,
                }}>
                {/* Flag */}
                <img
                  src={`/images/flags/${location.flag}-flag.png`}
                  alt={`${location.country} flag`}
                  className="h-6 w-8 object-cover rounded-sm"
                  loading="lazy"
                  decoding="async"
                />

                {/* Country Name */}
                <div className="flex flex-col items-start">
                  <span className="text-[11px] font-bold text-white whitespace-nowrap">
                    {location.country}
                  </span>

                  {/* Status Badge */}
                  <span
                    className={`text-[9px] font-semibold uppercase tracking-wide ${
                      location.status === "Strong Market" ?
                        "text-emerald-300"
                      : "text-cyan-300"
                    }`}>
                    {location.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View - List Layout */}
      <div className="lg:hidden mt-8 px-6">
        <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto">
          {locations.map((location) => (
            <div
              key={`mobile-list-${location.country}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-4 text-sm shadow-xl shadow-black/40 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/60">
              <div className="flex items-center gap-4 flex-1">
                {/* Flag */}
                <div className="flex-shrink-0">
                  <img
                    src={`/images/flags/${location.flag}-flag.png`}
                    alt={`${location.country} flag`}
                    className="h-8 w-12 object-cover rounded-md border border-white/20"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Country Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-base truncate">
                      {location.country}
                    </span>
                    <span className="text-xs text-gray-400 hidden sm:inline">
                      • {location.city}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      location.status === "Strong Market" ?
                        "text-emerald-400"
                      : "text-blue-400"
                    }`}>
                    {location.status}
                  </span>
                </div>
              </div>

              {/* City (visible on larger mobile screens) */}
              <div className="hidden sm:block flex-shrink-0">
                <span className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded-full">
                  {location.city}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Stats */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">
                {locations.length}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Countries
              </div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                {
                  locations.filter((loc) => loc.status === "Strong Market")
                    .length
                }
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Strong Markets
              </div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {locations.filter((loc) => loc.status === "Operational").length}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Operational
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Counter (desktop overlay) */}
      <div className="hidden lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 lg:text-center">
        <div className="text-sm text-emerald-400 font-semibold mb-2">
          {activeFlags} / {locations.length} Locations
        </div>
        <div className="flex gap-1 justify-center">
          {locations.map((_, index) => (
            <div
              key={`desktop-${index}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index < activeFlags ?
                  "bg-emerald-400 scale-100"
                : "bg-emerald-400/30 scale-75"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .flag-badge {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
        }

        .location-pin {
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5);
          animation: pulse 2s infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .pulse-ring {
          animation: pulse 3s infinite ease-in-out;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
};

export default RegionalPresence;
