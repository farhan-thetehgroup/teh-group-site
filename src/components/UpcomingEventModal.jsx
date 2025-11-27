import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  XCircle,
  Sparkles,
} from "lucide-react";

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

const UpcomingEventModal = ({ event, isOpen, onClose }) => {
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

  if (!event) return null;

  const getDaysLeft = (eventDate) => {
    const today = new Date();
    const eventDay = new Date(eventDate);
    const diffTime = eventDay - today;
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
          bgClass: "bg-emerald-500/20",
          textClass: "text-emerald-400",
          borderClass: "border-emerald-400/50",
          badgeBgClass: "bg-emerald-500/20",
        };
      case "Limited":
        return {
          icon: AlertCircle,
          bgClass: "bg-orange-500/20",
          textClass: "text-orange-400",
          borderClass: "border-orange-400/50",
          badgeBgClass: "bg-orange-500/20",
        };
      case "Closed":
        return {
          icon: XCircle,
          bgClass: "bg-red-500/20",
          textClass: "text-red-400",
          borderClass: "border-red-400/50",
          badgeBgClass: "bg-red-500/20",
        };
      default:
        return {
          icon: CheckCircle,
          bgClass: "bg-blue-500/20",
          textClass: "text-blue-400",
          borderClass: "border-blue-400/50",
          badgeBgClass: "bg-blue-500/20",
        };
    }
  };

  const daysLeft = getDaysLeft(event.date);
  const statusConfig = getRegistrationStatusConfig(event.registrationStatus);
  const StatusIcon = statusConfig.icon;

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
              <div className="relative w-full aspect-video overflow-hidden rounded-t-3xl">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />

                {/* Registration Status Badge - Top Left */}
                <div className="absolute top-6 left-6">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.badgeBgClass} backdrop-blur-md border ${statusConfig.borderClass}`}>
                    <StatusIcon
                      className={`w-4 h-4 ${statusConfig.textClass}`}
                    />
                    <span
                      className={`${statusConfig.textClass} font-semibold text-sm uppercase tracking-wider`}>
                      {event.registrationStatus}
                    </span>
                  </div>
                </div>

                {/* Countdown Badge - Top Right */}
                <div className="absolute top-6 right-20 lg:right-24">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border ${
                      daysLeft <= 7 ? "bg-red-500/20 border-red-400/50"
                      : daysLeft <= 30 ? "bg-orange-500/20 border-orange-400/50"
                      : "bg-emerald-500/20 border-emerald-400/50"
                    }`}>
                    <Clock
                      className={`w-4 h-4 ${
                        daysLeft <= 7 ? "text-red-400"
                        : daysLeft <= 30 ? "text-orange-400"
                        : "text-emerald-400"
                      }`}
                    />
                    <span
                      className={`font-semibold text-sm ${
                        daysLeft <= 7 ? "text-red-300"
                        : daysLeft <= 30 ? "text-orange-300"
                        : "text-emerald-300"
                      }`}>
                      {daysLeft} Days
                    </span>
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-tight drop-shadow-2xl">
                    {event.title}
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
                    About This Event
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Event Details Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Date */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        Event Date
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        Location
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  {/* Attendees */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        Expected
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {event.attendees}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        Duration
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {getDuration(event.date)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event Highlights */}
                {event.highlights && event.highlights.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-semibold">
                      Event Highlights
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {event.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-400/20 group hover:border-emerald-400/40 transition-all duration-300">
                          <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <span className="text-sm font-semibold text-white">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Registration Status Message */}
                {event.registrationStatus === "Limited" && (
                  <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-400/30">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-orange-200">
                        <span className="font-semibold">
                          Limited Seats Available!
                        </span>{" "}
                        Register early to secure your spot at this exclusive
                        event.
                      </p>
                    </div>
                  </div>
                )}

                {event.registrationStatus === "Closed" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/30">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-200">
                        <span className="font-semibold">
                          Registration Closed.
                        </span>{" "}
                        This event has reached maximum capacity. Please check
                        our other upcoming events.
                      </p>
                    </div>
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
                {event.registrationStatus !== "Closed" ?
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)] transition-all duration-300 group">
                    <span>
                      {event.registrationStatus === "Limited" ?
                        "Register Now - Limited Seats"
                      : "Register Now"}
                    </span>
                    <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                : <div className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gray-500/20 text-gray-400 border border-gray-500/30 font-semibold cursor-not-allowed">
                    <XCircle className="w-5 h-5" />
                    <span>Registration Closed</span>
                  </div>
                }
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpcomingEventModal;
