import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface InstagramFeedProps {
  username?: string;
  limit?: number;
  postUrls?: string[];
}

const FLAT_BLUE = "#1c33c3";
const FLAT_BEIGE = "#feebcb";
const OFF_WHITE = "#f8f8f8";

// Extract post ID from Instagram URL
function getPostId(url: string): string {
  const match = url.match(/\/p\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : "";
}

export default function InstagramFeed({ 
  username = "flatburger.bg", 
  limit = 6,
  postUrls = []
}: InstagramFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  // Load Instagram embed script
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
      // Re-process embeds if script already loaded
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup not needed as we want script to persist
    };
  }, [postUrls]);

  // Re-process embeds when posts change or come into view
  useEffect(() => {
    if (isInView && (window as any).instgrm) {
      setTimeout(() => {
        (window as any).instgrm.Embeds.process();
      }, 100);
    }
  }, [isInView, postUrls]);

  const posts = postUrls.slice(0, limit);

  return (
    <div ref={containerRef}>
      {/* Instagram Embeds Grid - Responsive masonry-like layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {posts.map((url, index) => {
          const postId = getPostId(url);
          
          return (
            <motion.div
              key={postId || index}
              initial={{ opacity: 0, y: 100, scale: 0.8, rotateY: -15 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotateY: 0 
              } : {}}
              transition={{ 
                duration: 1, 
                delay: index * 0.15, 
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: `0 30px 60px rgba(0,0,0,0.4)`,
              }}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-white shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {/* Decorative corner accent */}
              <motion.div
                className="absolute top-0 left-0 w-16 h-16 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${FLAT_BLUE} 50%, transparent 50%)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.5, duration: 0.5, type: "spring" }}
              />
              
              {/* Post number badge */}
              <motion.div
                className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: OFF_WHITE, color: FLAT_BLUE }}
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.6, type: "spring", stiffness: 300 }}
              >
                {index + 1}
              </motion.div>

              {/* Instagram Embed - Actual content */}
              <div className="instagram-embed-container">
                <blockquote 
                  className="instagram-media" 
                  data-instgrm-captioned
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF',
                    border: 0,
                    borderRadius: '3px',
                    boxShadow: 'none',
                    margin: 0,
                    maxWidth: '100%',
                    minWidth: '100%',
                    padding: 0,
                    width: '100%',
                  }}
                >
                  <a 
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-8 text-center"
                    style={{ color: FLAT_BLUE }}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-current border-t-transparent rounded-full"
                      />
                      <span className="text-sm font-medium">Loading Instagram post...</span>
                    </div>
                  </a>
                </blockquote>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Animated Follow CTA */}
      <motion.div 
        className="text-center mt-16 md:mt-20"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.a
          href={`https://www.instagram.com/${username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 px-12 py-6 rounded-full font-bold text-lg transition-all group overflow-hidden relative"
          style={{ 
            background: FLAT_BLUE, 
            color: OFF_WHITE,
            boxShadow: `0 15px 50px ${FLAT_BLUE}60`,
          }}
          whileHover={{ 
            scale: 1.08, 
            boxShadow: `0 25px 70px ${FLAT_BLUE}80`,
            y: -5,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0"
            style={{ background: `linear-gradient(90deg, transparent, ${OFF_WHITE}30, transparent)` }}
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <span className="relative z-10">Follow @{username}</span>
          <motion.svg 
            className="w-6 h-6 relative z-10" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
            <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
            <circle cx="18.406" cy="5.594" r="1.44"/>
          </motion.svg>
        </motion.a>
      </motion.div>
      
      {/* CSS for Instagram embeds */}
      <style>{`
        .instagram-embed-container {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .instagram-media {
          margin: 0 !important;
          max-width: 100% !important;
          min-width: 100% !important;
          width: 100% !important;
        }
        .instagram-media iframe {
          min-height: 400px !important;
        }
      `}</style>
    </div>
  );
}
