"use client";
import { useEffect, useState } from "react";

export function useTranslation(lng: string, ns: string) {
  const [t, setT] = useState<(key: string) => string>((key: string) => key); // Fallback to key
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const response = await fetch(
          `/api/translations/?locale=${lng}&module=${
            ns === "translation" ? "common" : ns
          }`
        );
        const translations = await response.json();

        setT(() => (key: string) => translations[key] || key);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load translations:", error);
        setIsLoaded(true);
      }
    }

    loadTranslations();
  }, [lng, ns]);

  return { t, isLoaded };
}
