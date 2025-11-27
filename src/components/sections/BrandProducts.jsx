import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProductModal from "../ProductModal";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Nexus APAC",
    slug: "nexus-apac",
    ctaUrl: "https://nexus-apac.com",
    highlight:
      "Flagship go-to-market platform connecting brands with decision-makers across 15 APAC markets.",
    description:
      "The Nexus - APAC Tour is an exclusive, invitation-only series connecting top technology leaders across Asia’s fastest-growing digital economies. Each event serves as a dynamic hub where leading solution providers engage directly with 200+ pre-qualified decision makers, fostering active collaboration, strategic partnerships, and meaningful business growth.",
    format:
      "Live Demo Sessions • Interactive Workshops • One on One Meetings • Insightfull Conference • Exhibition Hall",
    keyFeatures: [
      {
        icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        color: "yellow",
        title: "One-to-One Meetings",
        desc: "Personally scheduled business meetings for targeted engagement",
      },
      {
        icon: "M5 13l4 4L19 7",
        color: "emerald",
        title: "High-Impact Engagement",
        desc: "Designed for meaningful connections across APAC markets",
      },
      {
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        color: "cyan",
        title: "Executive Network",
        desc: "Connect with C-level decision makers and industry leaders",
      },
      {
        icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        color: "blue",
        title: "Regional Reach",
        desc: "Pan-APAC coverage with local market expertise",
      },
      {
        icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm8-2v-1a4 4 0 00-3-3.87m-3 12a4 4 0 01-4-4v-1a4 4 0 013.87-3M21 8a2 2 0 11-4 0 2 2 0 014 0z",
        color: "red",
        title: "200+ Attendees",
        desc: "Engage with over 200 tech professionals and decision-makers across the APAC region.",
      },
    ],
    logoSrc: "/images/products/nexus-green.svg",
  },
  {
    name: "AI Nexus",
    slug: "ai-nexus",
    ctaUrl: "https://ai-nexus.thetehgroup.com",
    highlight:
      "AI Nexus is an exclusive platform showcasing the latest innovations in Cybersecurity and Artificial Intelligence (AI)",
    description:
      "AI Nexus is an exclusive platform showcasing the latest innovations in Cybersecurity and Artificial Intelligence (AI). More than just a tech conference, it connects exhibitors, sponsors, and potential buyers through personally scheduled one-to-one business meetings. With a Buyer Meet Seller approach at its core, AI Nexus ensures every interaction is targeted, meaningful, and business driven. By bringing together industry leaders, C-level executives, and key decision-makers from across Asia, AI Nexus offers the ideal environment for building relationships, closing deals, and forming long-term strategic Partnerships.",
    format: "One to One Meetings • Exhibitor Area • Conference",
    logoSrc: "/images/products/ai-nexus-logo.png",
    keyFeatures: [
      {
        icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        color: "purple",
        title: "AI-Powered Insights",
        desc: "Cutting-edge artificial intelligence solutions and machine learning innovations",
      },
      {
        icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
        color: "red",
        title: "Cybersecurity Focus",
        desc: "Advanced cybersecurity solutions and threat protection strategies",
      },
      {
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        color: "blue",
        title: "Executive Networking",
        desc: "Direct access to C-level executives and key decision makers",
      },
      {
        icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        color: "emerald",
        title: "One-to-One Meetings",
        desc: "Personally scheduled business meetings for targeted engagement",
      },
    ],
  },
  {
    name: "Tech Fest",
    slug: "tech-fest",
    ctaUrl: "https://techfest.hk",
    highlight:
      "Tech Fest is a premier, large-scale technology event designed to unite thousands of senior leaders and decision-makers from across industries.",
    description:
      "Tech Fest is a premier, large-scale technology event designed to unite thousands of senior leaders and decision-makers from across industries. Powered by leading organizers like Cloud Forum (Kornerstone), Revive Tech Asia, and Cyber Attack (TEH Group), the event serves as a strategic platform for shaping the future of business through advancements in AI, cloud technologies, and cybersecurity. It stands as a key convergence point for innovation, collaboration, and high-level discussions driving the next era of digital transformation.",
    format:
      "Conference • Workshops • Roundtable Discussions • Exhibition • 1 to 1 Business Matchmaking • Awards Celebration",
    video: "https://files.thetehgroup.com/hktechfest/Video/HIGHLIGHT-TECHFEST.mp4",
    poster: "/images/banners/tech-fest.png",
    keyFeatures: [
      {
        icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        color: "emerald",
        title: "One-to-One Meetings",
        desc: "Personally scheduled business meetings for targeted engagement",
      },
      {
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        color: "orange",
        title: "2000+ Attendees",
        desc: "Engage with over 2,000 tech professionals and decision-makers across the APAC region.",
      },
      {
        icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
        color: "red",
        title: "40+ Industry Speakers",
        desc: "Featuring 40+ experts sharing real-world strategies and industry-leading perspectives.",
      },
      {
        icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
        color: "yellow",
        title: "40+ Global Sponsors",
        desc: "Trusted by 40+ global sponsors who bring cutting-edge solutions, industry leadership, and strategic expertise to our platform.",
      },
    ],
    logoSrc: "/images/products/teh-fest-logo.png",
  },
  {
    name: "Nexus Club",
    slug: "nexus-club",
    ctaUrl: "https://nexusclub.thetehgroup.com",
    highlight:
      "Nexus Club is a lifestyle - driven community, supported by Teh Group, that connects IT professionals across Asia",
    description:
      "Nexus Club is a lifestyle - driven community, supported by Teh Group, that connects IT professionals across Asia-including senior software engineers, fullstack developers, tech leads, infrastructure specialists, and more-through shared social experiences beyond work. Our focus is on building genuine relationships through informal meetups and recreational activities like golf, hiking, paddle, tennis, billiards, cricket, and badminton. Not as courses or competitions, but as opportunities to unwind, laugh, and connect. At Nexus Club, we believe that the strongest professional networks are built in real moments, where people can engage authentically beyond screens and boardrooms.",
    format: "Golf • Hiking • Paddle • Tennis • Badminton",
    keyFeatures: [
      {
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        color: "blue",
        title: "Executive Networking",
        desc: "Direct access to C-level executives and key decision makers",
      },
      {
        icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        color: "green",
        title: "Informal Social Meetups",
        desc: "Regular gatherings that encourage members to relax, unwind, and connect naturally outside of traditional work environments",
      },
      {
        icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        color: "cyan",
        title: "Authentic, Relationship-Focused Engagements",
        desc: "Designed to build genuine connections. Not formal networking, but real conversations and meaningful interactions.",
      },
      {
        icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
        color: "yellow",
        title: "Non-Competitive, Experience-Led Approach",
        desc: "Activities are not held as tournaments or classes, but as casual opportunities to bond, laugh, and enjoy time together.",
      },
    ],
    logoSrc: "/images/products/nexus-club-logo.png",
  },
];

export default function BrandProducts() {
  const sectionRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTweenRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  // OPTIMIZED: Simplified shine effect - removed complex state management
  // Removed debouncing and multiple timeouts to reduce overhead

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".brand-product-panel");
      if (!panels.length) return;

      console.log(`📍 Initialized ${panels.length} panels`);

      // OPTIMIZED: Simplified scroll trigger - removed shine effect callbacks
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () =>
            `+=${sectionRef.current?.offsetWidth * panels.length * 1.2}`,
          pin: true,
          scrub: 0.8, // Slightly slower for smoother feel
          snap: {
            snapTo: 1 / (panels.length - 1),
            inertia: true,
            duration: { min: 0.3, max: 0.8 },
            delay: 0.1,
          },
          anticipatePin: 0,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            // OPTIMIZED: Simplified update - only track active index
            const progress = self.progress;
            const exactIndex = progress * (panels.length - 1);
            const newIndex = Math.round(exactIndex);
            setActiveIndex(newIndex);
          },
        },
      });

      scrollTweenRef.current = scrollTween;
      scrollTriggerRef.current = scrollTween.scrollTrigger;

      panels.forEach((panel, index) => {
        const content = panel.querySelector(".product-content");
        if (!content) return;

        gsap.from(content, {
          opacity: 0,
          y: 100,
          scale: 0.95,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 80%",
            end: "left 30%",
            scrub: 0.5,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []); // OPTIMIZED: Removed dependencies

  return (
    <section
      ref={sectionRef}
      className="brand-products-section relative overflow-hidden bg-gradient-to-b from-black via-slate-950/40 to-black"
      style={{
        zIndex: 'var(--z-section, 1)',
        isolation: 'isolate',
        willChange: 'auto'
      }}>
      <div className="flex w-[400vw]" style={{ willChange: 'transform' }}>
        {products.map((product, index) => (
          <div
            key={product.slug}
            className="brand-product-panel w-screen h-screen flex items-center justify-center relative px-4"
            style={{
              background: `linear-gradient(135deg, ${
                index === 0 ? "rgba(6, 78, 59, 0.3)"
                : index === 1 ? "rgba(8, 51, 68, 0.3)"
                : index === 2 ? "rgba(23, 37, 84, 0.3)"
                : "rgba(76, 29, 149, 0.3)"
              }, transparent)`,
            }}>
            <div className="product-content max-w-4xl px-2 sm:px-4 md:px-8 text-center">
              {/* OPTIMIZED: Reduced blur layers from 3 to 1 */}
              <div className="mb-8 sm:mb-10 md:mb-12 flex justify-center">
                <div className="relative">
                  <div
                    className="absolute inset-0 -m-8 md:-m-12 rounded-full blur-2xl opacity-60"
                    style={{
                      background: `linear-gradient(45deg, ${
                        index === 0 ?
                          "rgba(16, 185, 129, 0.4), rgba(6, 182, 212, 0.4)"
                        : index === 1 ?
                          "rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4)"
                        : index === 2 ?
                          "rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.4)"
                        : "rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4)"
                      }`,
                    }}
                  />
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 overflow-hidden rounded-full">
                    <img
                      src={product.logoSrc}
                      alt={`${product.name} logo`}
                      width={320}
                      height={320}
                      className="relative z-10 w-full h-full object-contain"
                      style={{
                        filter: `drop-shadow(0 0 30px ${
                          index === 0 ? "rgba(16, 185, 129, 0.5)"
                          : index === 1 ? "rgba(6, 182, 212, 0.5)"
                          : index === 2 ? "rgba(59, 130, 246, 0.5)"
                          : "rgba(168, 85, 247, 0.5)"
                        })`,
                      }}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-xl xs:text-2xl sm:text-4xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 md:mb-8">
                {product.name}
              </h3>
              <p className="text-sm xs:text-base sm:text-md lg:text-lg text-gray-300 leading-relaxed px-2 sm:px-4 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12">
                {product.highlight}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center">
                <a
                  href={product.ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-md font-semibold rounded-full text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 text-center transition-all duration-300 hover:from-cyan-400 hover:to-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  Visit Website
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-md font-semibold rounded-full border-2 border-white/20 text-white hover:border-emerald-400/70 hover:text-emerald-200 hover:bg-white/5 transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute hidden lg:flex left-4 md:left-8 top-0 bottom-0 flex-col justify-around z-30">
        {products.map((product, index) => (
          <button
            key={product.slug}
            className={`group relative text-left text-xs tracking-[0.3em] uppercase transition-all duration-500 py-2 px-3 rounded-lg ${
              activeIndex === index ?
                "text-white font-bold scale-110"
              : "text-white/40 hover:text-white/70"
            }`}>
            {activeIndex === index && (
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-lg blur-xl animate-pulse" />
            )}
            <span
              className={`absolute inset-0 rounded-lg transition-all duration-500 ${
                activeIndex === index ?
                  "border-2 border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : "border border-white/10 group-hover:border-emerald-400/30"
              }`}>
              {activeIndex === index && (
                <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-950/50 via-cyan-950/30 to-blue-950/50" />
              )}
            </span>
            <span className="relative z-10 block whitespace-nowrap">
              {product.name}
            </span>
            {activeIndex === index && (
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            )}
          </button>
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

      {/* OPTIMIZED: Removed shine effect animation styles - too heavy */}
    </section>
  );
}