"use client";

import type React from "react";
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
export const toggleChatwoot = () => {
  if (window.$chatwoot) {
    window.$chatwoot.toggle();
  }
};

const ChatwootWidget: React.FC = () => {
  useEffect(() => {
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: "right",
      locale: "en",
      type: "standard",
    };

    (function (d, t) {
      const BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL;
      const g = d.createElement(t) as HTMLScriptElement,
        s = d.getElementsByTagName(t)[0];
      g.src = `${BASE_URL}/packs/js/sdk.js`;
      g.defer = true;
      g.async = true;
      s.parentNode?.insertBefore(g, s);
      g.onload = () => {
        window.chatwootSDK.run({
          websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_TOKEN,
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }, []);

  return null;
};

export default ChatwootWidget;
