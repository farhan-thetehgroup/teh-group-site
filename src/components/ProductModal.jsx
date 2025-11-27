import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Add global style to hide scrollbar
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .modal-no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .modal-no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  if (!document.head.querySelector("[data-modal-scrollbar-style]")) {
    style.setAttribute("data-modal-scrollbar-style", "");
    document.head.appendChild(style);
  }
}

const ProductModal = ({ product, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Default key features - can be overridden by product.keyFeatures
  const defaultKeyFeatures = [
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
  ];

  // Use product-specific features if available, otherwise use defaults
  const keyFeatures = product?.keyFeatures || defaultKeyFeatures;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      modalRef.current?.focus?.();
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  // Handle video controls
  const handleToggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (isMuted) {
        video.muted = false;
        video.volume = 1.0;
        setIsMuted(false);
      } else {
        video.muted = true;
        video.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8"
          onClick={onClose}>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          {/* OPTIMIZED: Simplified animation - faster transition */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="modal-no-scrollbar relative w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl shadow-black/50">
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/30 transition-all duration-200 flex items-center justify-center text-white/80 hover:text-white group"
              aria-label="Close modal">
              <svg
                className="w-5 h-5 transition-transform group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto modal-no-scrollbar p-6 sm:p-8 md:p-10 space-y-6">
              {/* Header with Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center space-y-6">
                {/* Large Logo with Glow */}
                <div className="flex justify-center relative">
                  {/* Animated Glow Rings */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                    className="relative">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 blur-3xl animate-pulse" />

                    {/* Middle glow ring */}
                    <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-blue-400/20 blur-2xl" />

                    {/* Logo container */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(6, 182, 212, 0.2)",
                          "0 0 60px rgba(16, 185, 129, 0.4), 0 0 100px rgba(6, 182, 212, 0.3)",
                          "0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(6, 182, 212, 0.2)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative w-56 h-56 md:w-72 md:h-72 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 p-8 sm:p-10 md:p-12 flex items-center justify-center backdrop-blur-sm">
                      {/* Inner glow */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />

                      {/* Logo */}
                      <motion.img
                        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 150,
                          damping: 12,
                        }}
                        src={product.logoSrc}
                        alt={`${product.name} logo`}
                        className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        style={{
                          imageRendering: 'crisp-edges',
                          filter: 'brightness(1.1) contrast(1.1)'
                        }}
                      />

                      {/* Shine effect */}
                      <motion.div
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        style={{ width: "50%" }}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Title - Smaller */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
                    {product.name}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                      Signature Product
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3">
                <h3 className="text-sm md:text-md uppercase tracking-[0.4em] text-emerald-300 font-semibold">
                  About
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </motion.div>

              {/* Video Highlight (if available) */}
              {product.video && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-3">
                  <h3 className="text-sm md:text-md uppercase tracking-[0.4em] text-emerald-300 font-semibold">
                    Event Highlight Video
                  </h3>
                  <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-emerald-500/30 group">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster={product.poster}
                      loop
                      playsInline
                      muted={isMuted}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}>
                      <source src={product.video} type="video/mp4" />
                    </video>

                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Play/Pause Button - Center */}
                    {!isPlaying && (
                      <button
                        onClick={handlePlayPause}
                        className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/90 backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-2xl">
                          <svg
                            className="w-8 h-8 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </button>
                    )}

                    {/* Mute/Unmute Button - Top Right */}
                    {isPlaying && (
                      <button
                        className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border-2 border-emerald-400/70 flex items-center justify-center hover:bg-emerald-500 hover:scale-110 transition-all duration-300 group/sound shadow-lg pointer-events-auto"
                        onClick={handleToggleMute}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}>
                        {isMuted ? (
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
                        ) : (
                          <svg
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
                        )}
                      </button>
                    )}

                    {/* Click overlay to play/pause */}
                    {isPlaying && (
                      <button
                        onClick={handlePlayPause}
                        className="absolute inset-0 pointer-events-auto"
                        aria-label="Pause video"
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* Format Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-3">
                <h3 className="text-sm md:text-md uppercase tracking-[0.4em] text-emerald-300 font-semibold">
                  Experience Format
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.format.split("•").map((item, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-200 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-200">
                      {item.trim()}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-3">
                <h3 className="text-sm md:text-md uppercase tracking-[0.4em] text-emerald-300 font-semibold">
                  Key Features
                </h3>
                <div className="grid gap-3">
                  {keyFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div
                        className={`w-12 h-12 rounded-lg bg-${feature.color}-500/20 border border-${feature.color}-500/30 flex items-center justify-center flex-shrink-0`}>
                        <svg
                          className={`w-6 h-6 text-${feature.color}-400`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={feature.icon}
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm md:text-md font-semibold text-white mb-1">
                          {feature.title}
                        </p>
                        <p className="text-xs md:text-sm text-gray-400">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="sticky bottom-0 z-10 w-full px-6 sm:px-8 py-4 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-slate-900/50 backdrop-blur-xl border-t border-white/10">
              <motion.a
                href={product.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)] transition-all duration-300 group">
                <span>Visit Website</span>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;