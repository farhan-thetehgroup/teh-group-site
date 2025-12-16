import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Play } from "lucide-react";

export default function VideoModal({ isOpen, onClose, videoSrc }) {
  const [videoError, setVideoError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
    return () => setIsClient(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setHasAnimatedIn(false);
    const frame = requestAnimationFrame(() => setHasAnimatedIn(true));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [isOpen]);

  if (!isOpen || !isClient) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center px-4 transition-opacity duration-500 ease-out ${
        hasAnimatedIn ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}>
      <div className="absolute inset-0 bg-linear-to-br from-black/80 via-slate-950/70 to-black/85 backdrop-blur-[20px]" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.15),transparent_60%)]" />
      </div>

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-6xl aspect-video bg-slate-950/40 backdrop-blur-2xl rounded-[28px] border border-white/10 shadow-[0_25px_120px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-500 ease-out transform ${
          hasAnimatedIn ?
            "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,rgba(59,130,246,0.3),rgba(16,185,129,0.25))]" />
          <div className="absolute -inset-1 rounded-[30px] border border-white/15 blur-xl" />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-50 w-12 h-12 rounded-2xl bg-black/60 hover:bg-emerald-500/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 group border border-white/20 hover:border-emerald-300 shadow-lg"
          onClick={onClose}>
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Video Player - Auto Play */}
        <video
          autoPlay
          className="w-full h-full object-cover rounded-[28px]"
          controls
          onError={() => setVideoError(true)}
          onLoadedData={() => setVideoError(false)}
          playsInline>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback: If no video source, show message */}
        {(!videoSrc || videoError) && (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 rounded-[28px]">
            <div className="text-center p-8">
              <Play className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Video Coming Soon
              </h3>
              <p className="text-gray-400">
                Please add your video file to{" "}
                <code className="text-emerald-400">
                  /public/videos/teh-group-intro.mp4
                </code>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}