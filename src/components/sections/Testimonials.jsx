// sections/Testimonials.jsx
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Badge } from "../Badge";

const Testimonials = () => {
  const sectionRef = useRef(null);
  const hasStartedAutoPlay = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Edy Susanto",
      position: "IT Director",
      company: "PT Trans Retail Indonesia",
      event: "AI Nexus 2025",
      rating: 5,
      testimonial:
        "It was a great event to met with all the IT Expert to share knowledge and experience. Special thanks to the AI Nexus organizers, TEH Group and support from Raisya Effendi Siregar for the great hospitality during the event.",
      avatar:
        "/images/Testimonials/Edy-Susanto-White.png",
    },
    {
      id: 2,
      name: "Radito Maulana Putra",
      position: "Chief Technology Officer",
      company: "Roatex Indonesia Toll System",
      event: "AI Nexus 2025",
      rating: 5,
      testimonial:
        "Many thanks for the great event and the hospitality TEH Group",
      avatar:
        "/images/Testimonials/Radito-Maulana-White.png",
    },
    {
      id: 3,
      name: "Erikman Pardemean Sitorus",
      position: "Chapter Secretary",
      company: "ISACA Indonesia Chapter",
      event: "AI Nexus",
      rating: 5,
      testimonial:
        "Huge appreciation to the TEH Group team, especially Jeffrey Teh and Raisya, for hosting such a meaningful and well-organized event.",
      avatar:
        "/images/Testimonials/Erikman-Pardamean-White.png",
    },
    {
      id: 4,
      name: "Budiarto Solomon",
      position: "Operation Manager",
      company: "PT Citra Rasa Betawi(Kafe Betawi)",
      event: "COO Dinner",
      rating: 5,
      testimonial:
        "Eventnya sangat seru dan insightful, terutama untuk saya. Semoga lebih banyak acara kedepannya dan saya bisa join kembali.",
      avatar:
        "/images/Testimonials/Budiarto-solomon.jpg",
    },
    {
      id: 5,
      name: "Charles Elias",
      position: "Director of Commercial IT and Digital",
      company: "AstraZeneca",
      event: "AI Nexus",
      rating: 5,
      testimonial:
        "Grateful to the organizers Teh Group, my fellow panelists Karim Taslim Edy Susanto Edi Sugianto Sonny Supriyadi , and the audience for the engaging dialogue and shared optimism for Indonesia’s digital future.",
      avatar:
        "/images/Testimonials/Charles-Elias-White.png",
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

  // OPTIMIZED: Slower auto-play for better readability
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // Increased from 5s to 7s

    return () => clearInterval(interval);
  }, [currentSlide, isInView]);

  // OPTIMIZED: Faster transition lock release
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 300); // Reduced from 500ms
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsTransitioning(false), 300); // Reduced from 500ms
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 300); // Reduced from 500ms
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center bg-gradient-to-b from-black via-cyan-950/20 to-black py-16 lg:py-24 overflow-hidden"
      style={{
        zIndex: "var(--z-section, 1)",
        isolation: "isolate",
      }}>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
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
                  "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent)"
                : i === 1 ?
                  "radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent)"
                : "radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent)",
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              top: `${20 + i * 30}%`,
              right: `${10 + i * 30}%`,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          {/* Badge */}
          <Badge
            icon={<Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
            text="Attendance Testimonials"
            color="blue"
          />

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
            <span className="text-white">What Our</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Attendance Say
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-lg md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Trusted by industry leaders across the APAC region. Hear from
            executives who have transformed their business through our events.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative">
          {/* Main Card */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border-2 border-cyan-400/50 shadow-[0_0_80px_rgba(6,182,212,0.4)] p-8 sm:p-10 lg:p-12 overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/30 via-cyan-500/30 to-emerald-500/30 blur-2xl" />

              {/* Quote Icon */}
              <div className="absolute top-6 left-6 opacity-20">
                <Quote className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-400" />
              </div>

              {/* Content with AnimatePresence-like transition */}
              <div
                key={currentSlide}
                className="relative z-10 space-y-6 animate-fadeIn">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed italic font-light">
                  "{currentTestimonial.testimonial}"
                </p>

                {/* Divider */}
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-transparent" />

                {/* Client Info */}
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full blur-lg opacity-50"></div>
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-cyan-400/50"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-sm sm:text-base text-cyan-300 font-semibold">
                      {currentTestimonial.position}
                    </div>
                    <div className="text-sm text-gray-400 truncate">
                      {currentTestimonial.company}
                    </div>
                  </div>

                  {/* Event Badge */}
                  <div className="hidden sm:block flex-shrink-0">
                    <div className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30 backdrop-blur-sm">
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                        Event
                      </div>
                      <div className="text-sm font-semibold text-cyan-300">
                        {currentTestimonial.event}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Badge Mobile */}
                <div className="sm:hidden">
                  <div className="inline-flex px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30 backdrop-blur-sm">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mr-2">
                      Event:
                    </div>
                    <div className="text-sm font-semibold text-cyan-300">
                      {currentTestimonial.event}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-cyan-400/20 rounded-br-2xl pointer-events-none" />
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-0 lg:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/60 hover:bg-black/80 border border-cyan-400/30 hover:border-cyan-400/60 backdrop-blur-md flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Previous testimonial">
            <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 transition-transform group-hover:-translate-x-1" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-0 lg:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/60 hover:bg-black/80 border border-cyan-400/30 hover:border-cyan-400/60 backdrop-blur-md flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Next testimonial">
            <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8 lg:mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide ?
                  "w-12 h-3 bg-gradient-to-r from-cyan-400 to-emerald-400"
                : "w-3 h-3 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-400">
            {currentSlide + 1} / {testimonials.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
