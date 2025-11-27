import { useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const enableMotion = !prefersReducedMotion;
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const parallaxX = useTransform(pointerX, [0, 1], [-18, 18]);
  const parallaxY = useTransform(pointerY, [0, 1], [-18, 18]);
  const textX = useTransform(pointerX, [0, 1], [-8, 8]);
  const textY = useTransform(pointerY, [0, 1], [-8, 8]);
  const ctaX = useTransform(pointerX, [0, 1], [-5, 5]);
  const ctaY = useTransform(pointerY, [0, 1], [-5, 5]);

  const smoothParallaxX = useSpring(parallaxX, { stiffness: 120, damping: 24 });
  const smoothParallaxY = useSpring(parallaxY, { stiffness: 120, damping: 24 });
  const smoothTextX = useSpring(textX, { stiffness: 120, damping: 24 });
  const smoothTextY = useSpring(textY, { stiffness: 120, damping: 24 });
  const smoothCtaX = useSpring(ctaX, { stiffness: 120, damping: 24 });
  const smoothCtaY = useSpring(ctaY, { stiffness: 120, damping: 24 });

  const particleField = useMemo(() => {
    const count = prefersReducedMotion ? 4 : 10;
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 6 + Math.random() * 10,
      blur: 10 + Math.random() * 14,
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 6,
      hue: i % 2 === 0 ? 170 + Math.random() * 30 : 200 + Math.random() * 40,
      alpha: 0.35 + Math.random() * 0.35,
    }));
  }, [prefersReducedMotion]);

  const sponsors = [
    { src: "/images/sponsors/akamai.png", name: "Akamai", link: "#" },
    { src: "/images/sponsors/alibaba.png", name: "Alibaba", link: "#" },
    { src: "/images/sponsors/aws.png", name: "AWS", link: "#" },
    { src: "/images/sponsors/zscaler.svg", name: "Zscaler", link: "#" },
    { src: "/images/sponsors/cloudflare.png", name: "Cloudflare", link: "#" },
    { src: "/images/sponsors/coupa.png", name: "Coupa", link: "#" },
    { src: "/images/sponsors/darktrace.png", name: "Darktrace", link: "#" },
    {
      src: "/images/sponsors/googlecloud.png",
      name: "Google Cloud",
      link: "#",
    },
    { src: "/images/sponsors/ibm.png", name: "IBM", link: "#" },
    { src: "/images/sponsors/lark_logo.png", name: "Lark", link: "#" },
    { src: "/images/sponsors/lmntrix_logo.png", name: "LMNTRIX", link: "#" },
    {
      src: "/images/sponsors/tencent-cloud.png",
      name: "Tencent Cloud",
      link: "#",
    },
    { src: "/images/sponsors/secgra.png", name: "Secgra", link: "#" },
    { src: "/images/sponsors/gigamon.png", name: "Gigamon", link: "#" },
    { src: "/images/sponsors/tenable.png", name: "Tenable", link: "#" },
    { src: "/images/sponsors/Okta_logo.png", name: "Okta", link: "#" },
    { src: "/images/sponsors/cloudmile.webp", name: "CloudMile", link: "#" },
    { src: "/images/sponsors/trend.png", name: "Trend Micro", link: "#" },
  ];

  useEffect(() => {
    if (!enableMotion) return undefined;
    const handleMove = (e) => {
      pointerX.set(e.clientX / window.innerWidth);
      pointerY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enableMotion, pointerX, pointerY]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/30 to-emerald-900/20 relative overflow-hidden cursor-default hero-section">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0">
        {/* Particle Glow Field */}
        <div className="absolute inset-0 pointer-events-none">
          {particleField.map((particle, index) => (
            <span
              key={`glow-${index}`}
              className="absolute rounded-full mix-blend-screen"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                background: `radial-gradient(circle, hsla(${particle.hue}, 85%, 65%, ${particle.alpha}), transparent 65%)`,
                filter: `drop-shadow(0 0 ${particle.blur}px hsla(${particle.hue}, 85%, 65%, ${particle.alpha}))`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay with pulse */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"
          animate={
            enableMotion ? { opacity: [0.85, 1, 0.85] } : { opacity: 0.9 }
          }
          transition={{
            duration: 10,
            repeat: enableMotion ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
          animate={
            enableMotion ?
              { y: [-12, 12, -12], x: [-8, 8, -8] }
            : { y: 0, x: 0 }
          }
          transition={{
            duration: 14,
            repeat: enableMotion ? Infinity : 0,
            ease: "easeInOut",
          }}
          style={{
            x: enableMotion ? smoothParallaxX : 0,
            y: enableMotion ? smoothParallaxY : 0,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl"
          animate={
            enableMotion ? { y: [10, -10, 10], x: [8, -8, 8] } : { y: 0, x: 0 }
          }
          transition={{
            duration: 12,
            repeat: enableMotion ? Infinity : 0,
            ease: "easeInOut",
          }}
          style={{
            x: enableMotion ? smoothParallaxX : 0,
            y: enableMotion ? smoothParallaxY : 0,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl"
          animate={
            enableMotion ?
              { y: [-16, 16, -16], x: [12, -12, 12] }
            : { y: 0, x: 0 }
          }
          transition={{
            duration: 16,
            repeat: enableMotion ? Infinity : 0,
            ease: "easeInOut",
          }}
          style={{
            x: enableMotion ? smoothParallaxX : 0,
            y: enableMotion ? smoothParallaxY : 0,
          }}
        />

        {/* Digital Rain */}
        {!prefersReducedMotion && enableMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(6)].map((_, i) => (
              <div
                key={`rain-${i}`}
                className="absolute w-px bg-gradient-to-b from-transparent via-blue-400/60 to-transparent animate-digitalRain"
                style={{
                  left: `${i * 12}%`,
                  height: "90px",
                  top: "-100px",
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${5 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Small floating particles */}
        {[
          ...Array(
            prefersReducedMotion ? 2
            : enableMotion ? 6
            : 3
          ),
        ].map((_, i) => (
          <motion.span
            key={`p-${i}`}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={
              enableMotion ?
                { y: ["0%", "-18%", "0%"], opacity: 0.6 }
              : { opacity: 0.4 }
            }
            transition={{
              duration: 10 + Math.random() * 6,
              repeat: enableMotion ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}
        {[
          ...Array(
            prefersReducedMotion ? 2
            : enableMotion ? 5
            : 2
          ),
        ].map((_, i) => (
          <motion.span
            key={`pe-${i}`}
            className="absolute w-2 h-2 bg-emerald-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={
              enableMotion ?
                { y: ["0%", "18%", "0%"], opacity: [0.3, 0.7, 0.3] }
              : { opacity: 0.4 }
            }
            transition={{
              duration: 14 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen h-full flex flex-col justify-center items-center text-center lg:text-left pt-28 sm:pt-32 lg:pt-0 pb-12 sm:pb-16 lg:pb-0">
        <div className="w-full h-full flex flex-col lg:flex-row items-center lg:justify-between">
          {/* Logo */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-start mb-10 lg:mb-0">
            <motion.div
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-4/5 md:h-4/5"
              animate={
                enableMotion ?
                  { rotate: [0, 4, -4, 0], y: [0, 10, -8, 0] }
                : { rotate: 0, y: 0 }
              }
              transition={{
                duration: 10,
                repeat: enableMotion ? Infinity : 0,
                ease: "easeInOut",
              }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 via-cyan-400/15 to-blue-400/20 blur-3xl" />
              <motion.div
                className="relative w-full h-full rounded-full bg-white/5 backdrop-blur-sm border-2 border-white/10 shadow-2xl overflow-hidden"
                style={{
                  x: enableMotion ? smoothParallaxX : 0,
                  y: enableMotion ? smoothParallaxY : 0,
                }}>
                <img
                  src="/images/brand-logo/teh-3d.webp"
                  alt="TEH Group 3D Logo"
                  fetchpriority="high"
                  loading="eager"
                  width={512}
                  height={512}
                  className="w-full h-full object-contain p-6 sm:p-8"
                  style={{
                    filter:
                      "drop-shadow(0 12px 40px rgba(16, 185, 129, 0.35)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.25))",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              className="w-full"
              style={{ x: smoothTextX, y: smoothTextY }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6">
                Connecting
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Tech Leaders and Buyers
                </span>{" "}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 leading-relaxed px-2 sm:px-0">
                Across Asia-Pacific, we bring innovation, decision-makers, and
                enterprise demand together in one network.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 md:mb-16 w-full lg:w-auto lg:self-start"
              style={{ x: smoothCtaX, y: smoothCtaY }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}>
              <motion.a
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:hello@thetehgroup.com?subject=${encodeURIComponent("Want to know more about TEH Group")}&body=${encodeURIComponent(`Dear TEH Group Team,

I hope this message finds you well. I am writing to express my interest in learning more about TEH Group and the exciting events you organize across the Asia-Pacific region.

After visiting your website, I was impressed by your mission to connect tech leaders and buyers, bringing together innovation, decision-makers, and enterprise demand in one comprehensive network. Your regional presence and industry partnerships demonstrate a strong commitment to fostering meaningful connections in the technology sector.

I would appreciate the opportunity to:
• Learn more about your upcoming events and initiatives
• Understand how I can participate in or collaborate with TEH Group
• Explore potential partnership opportunities
• Stay updated on your latest developments and announcements

Could you please provide me with more information about your current and upcoming events, as well as any relevant materials that would help me better understand TEH Group's offerings and how I might get involved?

I look forward to hearing from you and potentially becoming part of the TEH Group community.

Best regards,
[Your Name]
[Your Title]
[Your Company]
[Your Contact Information]`)}`}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-lg lg:text-2xl bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/60 transition-all duration-200 ease-out text-center lg:text-left no-underline">
                Connect with us
              </motion.a>
            </motion.div>

            <motion.div
              className="w-full max-w-6xl overflow-hidden lg:self-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}>
              <p className="text-gray-400 text-xs sm:text-sm mb-3 uppercase tracking-widest">
                Trusted by Industry Leaders
              </p>
              <div className="relative">
                <motion.div
                  className="flex space-x-8 sm:space-x-12 w-max"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: "linear",
                  }}>
                  {[...sponsors, ...sponsors].map((sponsor, index) => (
                    <motion.a
                      key={index}
                      href={sponsor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 1, y: -2 }}>
                      <img
                        src={sponsor.src}
                        alt={sponsor.name}
                        width={140}
                        height={40}
                        className="h-6 sm:h-8 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950/80 pointer-events-none z-20" />
    </div>
  );
};

export default Hero;
