/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Terminal, HelpCircle, Code } from "lucide-react";

interface EmbedContainerProps {
  embedCode: string;
}

export default function EmbedContainer({ embedCode }: EmbedContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [errorHeader, setErrorHeader] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous contents
    containerRef.current.innerHTML = "";
    setErrorHeader(null);

    if (!embedCode.trim()) {
      return;
    }

    try {
      // Create a document fragment to parse the HTML string
      const parser = new DOMParser();
      const doc = parser.parseFromString(embedCode, "text/html");

      // Extract stylesheets
      const links = doc.querySelectorAll("link[rel='stylesheet']");
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && !document.querySelector(`link[href="${href}"]`)) {
          const newLink = document.createElement("link");
          newLink.rel = "stylesheet";
          newLink.type = "text/css";
          newLink.href = href;
          document.head.appendChild(newLink);
        }
      });

      // Render non-script html elements (like divs, links) to our container
      const bodyElements = Array.from(doc.body.childNodes);
      bodyElements.forEach((node) => {
        if (node.nodeName !== "SCRIPT") {
          containerRef.current?.appendChild(node.cloneNode(true));
        }
      });

      // Find and load script elements
      const scripts = doc.querySelectorAll("script");
      scripts.forEach((script) => {
        const src = script.getAttribute("src");
        if (src) {
          // Check if this script was already loaded
          const newScript = document.createElement("script");
          newScript.src = src;
          newScript.async = true;
          newScript.type = "text/javascript";
          containerRef.current?.appendChild(newScript);
        } else if (script.textContent) {
          // Inline script tag
          const newScript = document.createElement("script");
          newScript.textContent = script.textContent;
          containerRef.current?.appendChild(newScript);
        }
      });

      // If there are iframes, they will be copied over. Let's make sure they are styled nicely.
      const iframes = containerRef.current.querySelectorAll("iframe");
      iframes.forEach((ifr) => {
        ifr.className = "w-full border-0 rounded-xl shadow-inner min-h-[500px]";
      });

    } catch (err) {
      console.error("Error rendering embed code:", err);
      setErrorHeader("Could not render custom embed code. Please verify the format.");
    }
  }, [embedCode]);

  return (
    <div className="relative">
      {errorHeader && (
        <div className="flex items-center gap-2 p-3 mb-3 text-red-700 bg-red-50 rounded-lg text-sm border border-red-100">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorHeader}</span>
        </div>
      )}

      {/* The container where the script/HTML/iframe will render */}
      <div id="embed-sandbox-container" ref={containerRef} className="w-full min-h-[100px] bg-white rounded-xl" />

      {!embedCode && (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50">
          <Code className="w-8 h-8 text-stone-400 mb-3" />
          <h4 className="text-stone-700 font-medium mb-1">No Custom Embed Code Added Yet</h4>
          <p className="text-stone-500 text-xs max-w-xs mb-4">
            Click the "Configure Form Embed" button above to paste your Action Network petition widget code or iframe here!
          </p>
        </div>
      )}
    </div>
  );
}
