"use client";

import { useEffect } from "react";

// Add type declaration for window properties
declare global {
  interface Window {
    chatwootSettings: {
      hideMessageBubble: boolean;
      position: "left" | "right";
      locale: string;
      type: "standard" | "expanded_bubble";
    };
    chatwootSDK: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
    $chatwoot?: {
      toggle: () => void;
    };
  }
}

// Export this function to use anywhere in your application
export const toggleChatwoot = (): void => {
  if (window.$chatwoot) {
    window.$chatwoot.toggle();
  }
};

function ChatwootWidget(): JSX.Element {
  useEffect(() => {
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: "right",
      locale: "en",
      type: "standard",
    };

    // Named function for linting
    function initializeChatwoot(d: Document, t: string): void {
      const BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL;
      const WEBSITE_TOKEN = process.env.NEXT_PUBLIC_CHATWOOT_TOKEN;

      if (!BASE_URL || !WEBSITE_TOKEN) {
        // Replace console.error with a proper error handling method
        throw new Error("Chatwoot configuration is missing");
      }

      const g = d.createElement(t) as HTMLScriptElement,
        s = d.getElementsByTagName(t)[0];
      g.src = `${BASE_URL}/packs/js/sdk.js`;
      g.defer = true;
      g.async = true;
      s.parentNode?.insertBefore(g, s);
      g.onload = () => {
        window.chatwootSDK.run({
          websiteToken: WEBSITE_TOKEN,
          baseUrl: BASE_URL,
        });
      };
    }

    initializeChatwoot(document, "script");
  }, []);

  return <></>;
}

export default ChatwootWidget;
