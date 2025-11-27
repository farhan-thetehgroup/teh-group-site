// sections/ClientTestimonials.jsx
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Handshake,
  Quote,
} from "lucide-react";
import { Badge } from "../Badge";

const ClientTestimonials = () => {
  const sectionRef = useRef(null);
  const hasStartedAutoPlay = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const clientVoices = [
    {
      id: 1,
      company: "NeutraDC",
      initiative: "Executive Innovation Week",
      testimonial:
        "TEH Group delivered an audience that was exactly right for us. The conversations were strategic and the follow-up pipeline proves it.",
      pointPerson: "Regional Partner Marketing Lead",
      logo: "/images/sponsors/neutraDC.webp",
    },
    {
      id: 2,
      company: "Cloudflare",
      initiative: "Cybersecurity Leadership Forum",
      testimonial:
        "From content to curation, everything felt premium. Clients immediately saw the value of our joint solutions after the session.",
      pointPerson: "Head of Strategic Accounts",
      logo: "/images/sponsors/cloudflare.png",
    },
    {
      id: 3,
      company: "Coupa",
      initiative: "C-Level Private Dinner Series",
      testimonial:
        "The intimacy of the event helped us have honest conversations with decision makers. We left with real opportunities, not just leads.",
      pointPerson: "Director, Digital Trust",
      logo: "/images/sponsors/coupa.png",
    },
    {
      id: 4,
      company: "Mastercard",
      initiative: "Future of Work Roundtable",
      testimonial:
        "TEH Group understands how to balance thought leadership with tangible outcomes. The room was full of exactly who we wanted.",
      pointPerson: "Field Marketing Manager",
      logo: "/images/sponsors/mastercard.png",
    },
    {
      id: 5,
      company: "Okta",
      initiative: "APAC Edge Security Briefing",
      testimonial:
        "Logistics, storytelling, and guests were on point. We saw conversions directly from the relationships built in that room.",
      pointPerson: "Regional Alliances Lead",
      logo: "/images/sponsors/Okta_logo.png",
    },
    {
      id: 6,
      company: "Dynatrace",
      initiative: "APAC Edge Security Briefing",
      testimonial:
        "Logistics, storytelling, and guests were on point. We saw conversions directly from the relationships built in that room.",
      pointPerson: "Regional Alliances Lead",
      logo: "/images/sponsors/dynatrace.png",
    },
  ];

  // Start/pause auto-play only when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasStartedAutoPlay.current) {
          setCurrentSlide(0);
          hasStartedAutoPlay.current = true;
        }
      },
      { threshold: 0.25 }
    );

    const target = sectionRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Auto-advance every 6 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isInView]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % clientVoices.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(
      (prev) => (prev - 1 + clientVoices.length) % clientVoices.length
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const currentTestimonial = clientVoices[currentSlide];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-black via-slate-950/30 to-black py-16 lg:py-24 overflow-hidden"
      style={{
        zIndex: "var(--z-section, 1)",
        isolation: "isolate",
      }}>
      {/* Background grid and glow */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 245, 255, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 245, 255, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />
      </div>
      <div className="absolute -left-20 top-10 w-64 h-64 bg-emerald-400/10 blur-3xl rounded-full" />
      <div className="absolute -right-24 bottom-10 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full" />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <Badge
            icon={<Handshake className="w-4 h-4 text-blue-400" />}
            text="Client Testimonials"
            color="blue"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
            <span className="text-white">Trusted by</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Enterprise Clients
            </span>
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Stories from partners who brought their brands to life with TEH
            Group experiences.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-900/80 border border-emerald-400/20 rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.25)] overflow-hidden">
            {/* Animated overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />

            <div
              key={currentSlide}
              className="relative flex flex-col lg:flex-row gap-8 lg:gap-10 p-8 sm:p-10 lg:p-12 transition-all duration-500">
              {/* Company visual */}
              <div className="lg:w-2/5 w-full">
                <div className="relative rounded-2xl border border-emerald-300/30 bg-white overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />
                  <div className="aspect-[4/3] w-full flex items-center justify-center p-8 sm:p-10">
                    <img
                      src={currentTestimonial.logo}
                      alt={currentTestimonial.company}
                      className="w-full h-full object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs sm:text-sm text-emerald-700/80">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-300/30">
                      <Building2 className="w-4 h-4" />
                      <span className="font-semibold truncate">
                        {currentTestimonial.company}
                      </span>
                    </div>
                    <span className="hidden sm:block text-gray-400 uppercase tracking-[0.2em]">
                      Client Story
                    </span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3 text-emerald-300">
                  <Quote className="w-10 h-10 opacity-80" />
                  <div className="text-xs uppercase tracking-[0.25em] text-gray-400">
                    {currentTestimonial.initiative}
                  </div>
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed">
                  “{currentTestimonial.testimonial}”
                </p>
                <div className="h-px bg-gradient-to-r from-emerald-400/60 to-transparent w-28" />
                <div className="space-y-2">
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {currentTestimonial.company}
                  </div>
                  <div className="text-sm sm:text-base text-emerald-200/80 font-semibold">
                    {currentTestimonial.pointPerson}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-2 lg:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/70 hover:bg-black/90 border border-emerald-300/30 hover:border-emerald-300/60 backdrop-blur-md flex items-center justify-center text-emerald-300 hover:text-emerald-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Previous client testimonial">
            <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 transition-transform group-hover:-translate-x-1" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-2 lg:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/70 hover:bg-black/90 border border-emerald-300/30 hover:border-emerald-300/60 backdrop-blur-md flex items-center justify-center text-emerald-300 hover:text-emerald-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Next client testimonial">
            <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8 lg:mt-12">
          {clientVoices.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide ?
                  "w-12 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400"
                : "w-3 h-3 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to client testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-400">
            {currentSlide + 1} / {clientVoices.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
