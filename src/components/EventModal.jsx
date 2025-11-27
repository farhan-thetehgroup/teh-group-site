import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Users, ExternalLink, Play } from "lucide-react";
import { GalleryModal } from "./GalleryModal";

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

const EventModal = ({ event, isOpen, onClose }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const galleryImages =
    event?.gallery?.map((src, index) => ({
      src,
      alt: `${event.title} highlight ${index + 1}`,
    })) ?? [];

  const openGallery = (index = 0) => {
    if (!galleryImages.length) return;
    setGalleryIndex(index);
    setShowGallery(true);
  };
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

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center p-4 sm:p-6"
          onClick={onClose}>
          {/* OPTIMIZED: Reduced backdrop blur */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* OPTIMIZED: Simplified modal animation */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4.5 right-4.5 z-10 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center text-white group"
              aria-label="Close modal">
              <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
            </button>

            <div className="flex-1 overflow-y-auto modal-no-scrollbar">
              {/* Banner Image */}
              <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                {/* Event Badge */}
                <div className="absolute top-6 left-6">
                  <div className="px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/50">
                    <span className="text-blue-300 font-semibold text-sm uppercase tracking-wider">
                      Highlights
                    </span>
                  </div>
                </div>

                {/* Attendees Badge */}
                <div className="absolute top-6 right-20 lg:right-24">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-semibold text-sm">
                      {event.attendees}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-10 space-y-6">
                {/* Title */}
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-tight">
                    {event.title}
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 rounded-full" />
                </div>

                {/* Event Details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        Event Date
                      </p>
                      <p className="text-base font-semibold text-white">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        Location
                      </p>
                      <p className="text-base font-semibold text-white">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-blue-300 font-semibold">
                    About This Event
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Event Video Highlight (if available) */}
                {event.video && (
                  <div className="space-y-3">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-emerald-300 font-semibold">
                      Event Highlight Video
                    </h3>
                    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-emerald-500/30 group">
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        poster={event.image}
                        loop
                        playsInline
                        muted={isMuted}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}>
                        <source src={event.video} type="video/mp4" />
                      </video>

                      {/* Video Controls Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Play/Pause Button - Center */}
                      {!isPlaying && (
                        <button
                          onClick={handlePlayPause}
                          className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                          <div className="w-16 h-16 rounded-full bg-emerald-500/90 backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-2xl">
                            <Play
                              className="w-8 h-8 text-white ml-1"
                              fill="currentColor"
                            />
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
                  </div>
                )}

                {/* Event Gallery (if available) */}
                {galleryImages.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-semibold">
                        Documentations
                      </h3>
                      <button
                        type="button"
                        onClick={() => openGallery(0)}
                        className="text-xs uppercase tracking-[0.3em] text-emerald-400 underline underline-offset-4">
                        View All
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {galleryImages.map((img, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => openGallery(index)}
                          className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-6 w-20 h-20 border-t-2 border-l-2 border-blue-400/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-cyan-400/20 rounded-br-2xl pointer-events-none" />

            {/* CTA Button Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky bottom-0 z-10 w-full px-6 sm:px-8 py-4 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-slate-900/50 backdrop-blur-xl border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={event.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-[0_20px_50px_rgba(59,130,246,0.4)] transition-all duration-300 group">
                  <span>View Event Details</span>
                  <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <button
                  onClick={onClose}
                  className="sm:w-auto px-6 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      <GalleryModal
        images={galleryImages}
        index={galleryIndex}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        onIndexChange={setGalleryIndex}
        backdropGradient="from-blue-900/60 via-blue-900/10 to-slate-900/70"
      />
    </AnimatePresence>
  );
};

export default EventModal;