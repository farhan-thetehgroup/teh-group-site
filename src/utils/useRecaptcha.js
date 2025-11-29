import { useEffect, useState, useCallback } from "react";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const useRecaptcha = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Load reCAPTCHA script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.warn("reCAPTCHA site key not found. reCAPTCHA will be disabled.");
      return;
    }

    // Check if script is already loaded
    if (window.grecaptcha && window.grecaptcha.ready) {
      setIsLoaded(true);
      setIsReady(true);
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(
      'script[src*="recaptcha/api.js"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        setIsLoaded(true);
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            setIsReady(true);
          });
        }
      });
      return;
    }

    // Create and load script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsReady(true);
        });
      }
    };
    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script");
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      const scriptToRemove = document.querySelector(
        'script[src*="recaptcha/api.js"]'
      );
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  const executeRecaptcha = useCallback(
    async (action) => {
      if (!RECAPTCHA_SITE_KEY) {
        return null;
      }

      if (!isReady || !window.grecaptcha) {
        throw new Error("reCAPTCHA is not ready yet");
      }

      try {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
          action: action || "submit",
        });
        return token;
      } catch (error) {
        console.error("reCAPTCHA execution error:", error);
        throw error;
      }
    },
    [isReady]
  );

  return { executeRecaptcha, isReady };
};

export default useRecaptcha;

