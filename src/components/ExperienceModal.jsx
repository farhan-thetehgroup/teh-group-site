import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Clock, Image as ImageIcon } from "lucide-react";
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

const ExperienceModal = ({ experience, isOpen, onClose }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setShowGallery(false); // Reset gallery when modal opens
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (showGallery) {
          setShowGallery(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, showGallery, onClose]);

  if (!experience) return null;

  // Convert gallery format for GalleryModal
  const galleryImages =
    experience.gallery?.map((src) => ({
      src,
      alt: `${experience.title} - Gallery`,
    })) || [];

  const handleGalleryClick = (index) => {
    setGalleryIndex(index);
    setShowGallery(true);
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[55] flex min-h-screen items-center justify-center p-4 sm:p-6"
          onClick={onClose}>
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl"
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
              <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden rounded-t-3xl">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />

                {/* Experience Badge */}
                <div className="absolute top-6 left-6">
                  <div className="px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/50">
                    <span className="text-emerald-300 font-semibold text-sm uppercase tracking-wider">
                      {experience.category || "Event Experience"}
                    </span>
                  </div>
                </div>

                {/* Gallery Button */}
                {galleryImages.length > 0 && (
                  <div className="absolute top-6 right-20 lg:right-24">
                    <button
                      onClick={() => handleGalleryClick(0)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 hover:border-white/40 transition-all duration-300 group">
                      <ImageIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-white font-semibold text-sm">
                        {galleryImages.length}
                      </span>
                    </button>
                  </div>
                )}

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-tight drop-shadow-2xl">
                    {experience.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-10 space-y-6">
                {/* Decorative Line */}
                <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full" />

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-emerald-300 font-semibold">
                    About This Experience
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {experience.description}
                  </p>
                </div>

                {/* Session Details Grid */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Session Duration */}
                  {experience.sessionDuration && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                          Session Duration
                        </p>
                        <p className="text-base font-semibold text-white">
                          {experience.sessionDuration}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Attendance */}
                  {experience.attendance && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                          Attendance
                        </p>
                        <p className="text-base font-semibold text-white">
                          {experience.attendance}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Event Duration */}
                  {experience.eventDuration && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                          Event Duration
                        </p>
                        <p className="text-base font-semibold text-white">
                          {experience.eventDuration}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gallery Preview (if available) */}
                {galleryImages.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-semibold">
                      Event Gallery
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {galleryImages.slice(0, 4).map((img, index) => (
                        <div
                          key={index}
                          onClick={() => handleGalleryClick(index)}
                          className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group cursor-pointer">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ImageIcon className="w-8 h-8 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      ))}
                    </div>
                    {galleryImages.length > 4 && (
                      <button
                        onClick={() => handleGalleryClick(0)}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        <span>View All {galleryImages.length} Photos</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-6 w-20 h-20 border-t-2 border-l-2 border-emerald-400/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-cyan-400/20 rounded-br-2xl pointer-events-none" />

            {/* CTA Button Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky bottom-0 z-10 w-full px-6 sm:px-8 py-4 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-slate-900/50 backdrop-blur-xl border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    setTimeout(() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)] transition-all duration-300 group">
                  <span>Inquire About This Format</span>
                  <Calendar className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {createPortal(modalContent, document.body)}
      <GalleryModal
        images={galleryImages}
        index={galleryIndex}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        onIndexChange={setGalleryIndex}
        backdropGradient="from-emerald-500/20 via-cyan-500/20 to-blue-500/20"
      />
    </>
  );
};

export default ExperienceModal;
