import { useEffect, useRef } from "react";

interface InstagramEmbedProps {
  url: string;
  className?: string;
}

export default function InstagramEmbed({ url, className = "" }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Instagram embed script if not already loaded
    if (!window.instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
    } else {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <div ref={containerRef} className={className}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "8px",
          margin: "1px",
          maxWidth: "100%",
          minWidth: "326px",
          padding: "0",
          width: "99.375%",
        }}
      />
    </div>
  );
}

// Extend Window interface
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}





