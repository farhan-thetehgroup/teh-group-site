import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const FOCUSABLE_SELECTOR =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const GlassModal = ({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-5xl",
  overlayClassName = "",
  containerClassName = "",
  contentClassName = "",
  backdropContent = null,
  ariaLabelledby,
  ariaDescribedby,
  trapFocus = true,
  freezeScroll = false,
}) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const scrollPositionRef = useRef({ x: 0, y: 0 });
  const previousBodyStylesRef = useRef({});
  const previousBodyOverflow = useRef("");
  const previousHtmlOverflowRef = useRef("");
  const previouslyFocusedRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !isClient) return;

    const body = document.body;
    const html = document.documentElement;

    if (freezeScroll) {
      previousBodyStylesRef.current = {
        overflow: body.style.overflow,
        position: body.style.position,
        width: body.style.width,
        top: body.style.top,
        left: body.style.left,
        touchAction: body.style.touchAction,
      };
      previousHtmlOverflowRef.current = html.style.overflow;

      scrollPositionRef.current = {
        x: window.scrollX,
        y: window.scrollY,
      };

      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.width = "100%";
      body.style.top = `-${scrollPositionRef.current.y}px`;
      body.style.left = `-${scrollPositionRef.current.x}px`;
      body.style.touchAction = "none";
      html.style.overflow = "hidden";
    } else {
      previousBodyOverflow.current = body.style.overflow;
      previousHtmlOverflowRef.current = html.style.overflow;

      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.1"
      )
      .fromTo(
        panelRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.3)" },
        "-=0.1"
      );

    const preventScrollChaining = (event) => {
      if (!panelRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = panelRef.current;
      const isScrollable = scrollHeight > clientHeight;
      if (!isScrollable) {
        event.preventDefault();
        return;
      }

      const isScrollingUp = event.deltaY < 0;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && isScrollingUp) || (atBottom && !isScrollingUp)) {
        event.preventDefault();
      }
    };

    const preventTouchPan = (event) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target)) {
        event.preventDefault();
      }
    };

    panelRef.current?.addEventListener("wheel", preventScrollChaining, {
      passive: false,
    });
    panelRef.current?.addEventListener("touchmove", preventTouchPan, {
      passive: false,
    });

    return () => {
      panelRef.current?.removeEventListener("wheel", preventScrollChaining);
      panelRef.current?.removeEventListener("touchmove", preventTouchPan);

      if (freezeScroll) {
        body.style.overflow = previousBodyStylesRef.current.overflow || "";
        body.style.position = previousBodyStylesRef.current.position || "";
        body.style.width = previousBodyStylesRef.current.width || "";
        body.style.top = previousBodyStylesRef.current.top || "";
        body.style.left = previousBodyStylesRef.current.left || "";
        body.style.touchAction = previousBodyStylesRef.current.touchAction || "";
        html.style.overflow = previousHtmlOverflowRef.current || "";
        window.scrollTo(
          scrollPositionRef.current.x,
          scrollPositionRef.current.y
        );
      } else {
        body.style.overflow = previousBodyOverflow.current || "";
        html.style.overflow = previousHtmlOverflowRef.current || "";
      }
      tl.kill();
    };
  }, [isOpen, isClient, freezeScroll]);

  useEffect(() => {
    if (!isOpen || !trapFocus || !isClient) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ?
        document.activeElement
      : null;

    const focusableElements = panelRef.current ?
      Array.from(panelRef.current.querySelectorAll(FOCUSABLE_SELECTOR))
    : [];

    (focusableElements[0] || panelRef.current)?.focus?.();

    const trapFocusHandler = (event) => {
      if (event.key !== "Tab" || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", trapFocusHandler);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", trapFocusHandler);
      document.removeEventListener("keydown", handleEscape);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen, trapFocus, onClose, isClient]);

  if (!isOpen || !isClient) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}>
      <div
        ref={overlayRef}
        className={`absolute inset-0 bg-black/80 backdrop-blur-xl ${overlayClassName}`.trim()}
        onClick={onClose}>
        {backdropContent && (
          <div className="w-full h-full pointer-events-none">{backdropContent}</div>
        )}
      </div>

      <div
        className={`relative w-full ${maxWidth} ${containerClassName}`.trim()}
        onClick={(e) => e.stopPropagation()}>
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          tabIndex={-1}
          className={`relative max-h-[88vh] overflow-y-auto overscroll-contain no-scrollbar touch-pan-y rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.65)] ${contentClassName}`.trim()}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GlassModal;
