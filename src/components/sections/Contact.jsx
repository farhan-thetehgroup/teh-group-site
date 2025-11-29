// sections/Contact.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Badge } from "../Badge";
import { Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const API_KEY = import.meta.env.VITE_API_KEY;

const Contact = () => {
  const sectionRef = useRef();
  const formRef = useRef();
  const animationCtx = useRef(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (animationCtx.current) {
      animationCtx.current.revert();
      animationCtx.current = null;
    }

    // Only enable ScrollTrigger on desktop
    if (isMobile) return;

    // OPTIMIZED: Simplified entrance animation - once only, no scrub
    animationCtx.current = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        x: 60, // Reduced from 100
        opacity: 0,
        duration: 0.8, // Faster than 1
        ease: "power2.out", // Simpler ease
      });
    }, sectionRef);

    return () => {
      if (animationCtx.current) {
        animationCtx.current.revert();
        animationCtx.current = null;
      }
    };
  }, [isMobile]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFieldErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setStatusMessage("");
    setFieldErrors({});

    if (!API_ENDPOINT || !API_KEY) {
      console.error("Missing contact form API configuration.");
      setStatus("error");
      setStatusMessage(
        "The contact form is temporarily unavailable. Please try again later."
      );
      setLoading(false);
      return;
    }

    try {
      const newFieldErrors = {};
      const trimmedMessage = formData.message.trim();
      if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
        newFieldErrors.message =
          "Message must be between 10 and 5000 characters.";
      }

      if (!formData.from_name.trim()) {
        newFieldErrors.from_name = "Full name is required.";
      }

      if (!formData.from_email.trim()) {
        newFieldErrors.from_email = "Email address is required.";
      }

      if (Object.keys(newFieldErrors).length > 0) {
        setStatus("error");
        setStatusMessage("Please fix the highlighted fields.");
        setFieldErrors(newFieldErrors);
        setLoading(false);
        return;
      }

      // Execute reCAPTCHA v3
      let recaptchaToken = null;
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha("contact_form_submit");
        } catch (error) {
          console.error("reCAPTCHA execution error:", error);
          setStatus("error");
          setStatusMessage(
            "reCAPTCHA verification failed. Please try again."
          );
          setLoading(false);
          return;
        }
      }

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY,
        },
        body: JSON.stringify({
          fullname: formData.from_name,
          email: formData.from_email,
          phone_number: formData.phone,
          company_name: formData.company,
          message: formData.message,
          recaptcha_token: recaptchaToken,
        }),
      });
      const responseBody = await response.json().catch(() => null);

      if (response.status === 429) {
        setFieldErrors({});
        setStatus("error");
        setStatusMessage(
          responseBody?.message ||
            "You have made too many requests. Please wait a moment and try again."
        );
        setTimeout(() => {
          setStatus(null);
          setStatusMessage("");
        }, 5000);
        return;
      }

      if (!response.ok) {
        const apiMessage =
          responseBody?.message ||
          (Array.isArray(responseBody?.errors) ?
            responseBody.errors.join(", ")
          : null);

        setStatus("error");
        setStatusMessage(
          apiMessage || `Failed to submit form. Status: ${response.status}`
        );
        if (Array.isArray(responseBody?.errors)) {
          const parsedErrors = {};
          responseBody.errors.forEach((err) => {
            const lowerErr = err.toLowerCase();
            if (
              lowerErr.includes("full name") ||
              lowerErr.includes("fullname")
            ) {
              parsedErrors.from_name = err;
            } else if (lowerErr.includes("email")) {
              parsedErrors.from_email = err;
            } else if (lowerErr.includes("phone")) {
              parsedErrors.phone = err;
            } else if (lowerErr.includes("company")) {
              parsedErrors.company = err;
            } else if (lowerErr.includes("message")) {
              parsedErrors.message = err;
            }
          });

          setFieldErrors(parsedErrors);
        }
        return;
      }

      setStatus("success");
      setStatusMessage(
        responseBody?.message ||
          "Message sent successfully! We'll contact you soon."
      );
      setFieldErrors({});
      setFormData({
        from_name: "",
        from_email: "",
        phone: "",
        company: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setStatus(null);
        setStatusMessage("");
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setStatusMessage(
        error?.message || "Failed to send message. Please try again."
      );
      setFieldErrors({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-emerald-900/10 relative overflow-hidden py-20"
      ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 3xl:mb-20 4xl:mb-24">
          <Badge
            icon={<Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-400 " />}
            text="Get In Touch"
            color="blue"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 3xl:mb-6 4xl:mb-8">
            Get In Touch With{" "}
            <span className="text-blue-400">Teh Group Team</span>
          </h2>
          <p className="text-sm sm:text-lg md:text-2xl text-gray-300 max-w-3xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto px-4">
            Ready to connect your brand with Asia&apos;s top technology
            decision-makers? Let&apos;s start the conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 3xl:gap-16 4xl:gap-20 max-w-6xl 3xl:max-w-7xl 4xl:max-w-screen-2xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef}>
            {/* Status Messages */}
            {status === "success" && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <p className="text-emerald-400 font-medium">
                  {statusMessage ||
                    "Message sent successfully! We'll contact you soon."}
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <p className="text-red-400 font-medium">
                  {statusMessage ||
                    "Failed to send message. Please try again or email us directly."}
                </p>
              </div>
            )}

            <form
              className="space-y-6 3xl:space-y-8 4xl:space-y-10"
              onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 3xl:gap-6 4xl:gap-8">
                <div>
                  <label className="block text-gray-300 text-sm 3xl:text-base 4xl:text-lg font-semibold mb-2 3xl:mb-3 4xl:mb-4">
                    Full Name *
                  </label>
                  <input
                    className={`w-full px-4 py-3 3xl:px-6 3xl:py-4 4xl:px-8 4xl:py-5 text-base 3xl:text-lg 4xl:text-xl bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                      fieldErrors.from_name ?
                        "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-blue-400"
                    }`}
                    name="from_name"
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    type="text"
                    value={formData.from_name}
                  />
                  {fieldErrors.from_name && (
                    <p className="mt-2 text-sm text-red-400">
                      {fieldErrors.from_name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm 3xl:text-base 4xl:text-lg font-semibold mb-2 3xl:mb-3 4xl:mb-4">
                    Company
                  </label>
                  <input
                    className={`w-full px-4 py-3 3xl:px-6 3xl:py-4 4xl:px-8 4xl:py-5 text-base 3xl:text-lg 4xl:text-xl bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                      fieldErrors.company ?
                        "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-blue-400"
                    }`}
                    name="company"
                    onChange={handleInputChange}
                    placeholder="Your company"
                    type="text"
                    value={formData.company}
                  />
                  {fieldErrors.company && (
                    <p className="mt-2 text-sm text-red-400">
                      {fieldErrors.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm 3xl:text-base 4xl:text-lg font-semibold mb-2 3xl:mb-3 4xl:mb-4">
                    Email Address *
                  </label>
                  <input
                    className={`w-full px-4 py-3 3xl:px-6 3xl:py-4 4xl:px-8 4xl:py-5 text-base 3xl:text-lg 4xl:text-xl bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                      fieldErrors.from_email ?
                        "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-blue-400"
                    }`}
                    name="from_email"
                    onChange={handleInputChange}
                    placeholder="your.email@company.com"
                    required
                    type="email"
                    value={formData.from_email}
                  />
                  {fieldErrors.from_email && (
                    <p className="mt-2 text-sm text-red-400">
                      {fieldErrors.from_email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm 3xl:text-base 4xl:text-lg font-semibold mb-2 3xl:mb-3 4xl:mb-4">
                    Phone Number
                  </label>
                  <input
                    className={`w-full px-4 py-3 3xl:px-6 3xl:py-4 4xl:px-8 4xl:py-5 text-base 3xl:text-lg 4xl:text-xl bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                      fieldErrors.phone ?
                        "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-blue-400"
                    }`}
                    name="phone"
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={formData.phone}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-2 text-sm text-red-400">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  className={`w-full px-4 py-3 3xl:px-6 3xl:py-4 4xl:px-8 4xl:py-5 text-base 3xl:text-lg 4xl:text-xl bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 resize-none ${
                    fieldErrors.message ?
                      "border-red-500 focus:border-red-500"
                    : "border-white/10 focus:border-blue-400"
                  }`}
                  name="message"
                  onChange={handleInputChange}
                  placeholder="Tell us about your requirements and how we can help..."
                  required
                  rows="4"
                  value={formData.message}
                />
                {fieldErrors.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <button
                className="w-full py-4 3xl:py-5 4xl:py-6 text-base sm:text-lg 3xl:text-xl 4xl:text-2xl bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
                type="submit">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
