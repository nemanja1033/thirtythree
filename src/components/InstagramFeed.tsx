import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface InstagramFeedProps {
  username?: string;
  limit?: number;
  postUrls?: string[];
}

const FLAT_BLUE = "#1c33c3";
const FLAT_BEIGE = "#feebcb";
const DARK_BG = "#0a0a0a";
const OFF_WHITE = "#f8f8f8";

// Instagram post data with thumbnails
const instagramPosts = [
  {
    url: "https://www.instagram.com/p/DQxGa6FDFlT/",
    thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop",
    type: "image",
    caption: "Fresh smash burgers 🍔",
  },
  {
    url: "https://www.instagram.com/p/DSQYJtFDB96/",
    thumbnail: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=600&fit=crop",
    type: "video",
    caption: "The sizzle never stops 🔥",
  },
  {
    url: "https://www.instagram.com/p/DRuQwnQDGNI/",
    thumbnail: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=600&fit=crop",
    type: "image",
    caption: "Stack it up 📚",
  },
  {
    url: "https://www.instagram.com/p/DIMKKCesMch/",
    thumbnail: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&h=600&fit=crop",
    type: "video",
    caption: "Behind the grill 🎬",
  },
  {
    url: "https://www.instagram.com/p/DGgNQ3PMwcf/",
    thumbnail: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=600&fit=crop",
    type: "image",
    caption: "Belgrade's finest 🏆",
  },
  {
    url: "https://www.instagram.com/p/DFsia-DsduT/",
    thumbnail: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&h=600&fit=crop",
    type: "image",
    caption: "Perfect patties 👌",
  },
];

export default function InstagramFeed({ 
  username = "flatburger.bg", 
  limit = 6,
  postUrls = []
}: InstagramFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const posts = postUrls.length > 0 
    ? postUrls.map((url, i) => ({ ...instagramPosts[i % instagramPosts.length], url }))
    : instagramPosts;

  return (
    <div ref={containerRef}>
      {/* Masonry-style Grid with varied sizes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
        {posts.slice(0, limit).map((post, index) => {
          // Create varied sizes for visual interest
          const isLarge = index === 0 || index === 3;
          const isTall = index === 1 || index === 4;
          
          return (
            <motion.a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: 45 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotateX: 0 
              } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.12, 
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                scale: 1.05, 
                zIndex: 20,
                rotateY: hoveredIndex === index ? 5 : 0,
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`
                relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer
                ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                ${isTall ? 'row-span-2' : ''}
                aspect-square group
              `}
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Image */}
              <motion.div
                className="absolute inset-0"
                animate={hoveredIndex === index ? { scale: 1.15 } : { scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img 
                  src={post.thumbnail} 
                  alt={post.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              
              {/* Gradient Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={hoveredIndex === index ? { opacity: 1 } : { opacity: 0.4 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Brand Color Overlay on Hover */}
              <motion.div 
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${FLAT_BLUE}90, transparent)` }}
                initial={{ opacity: 0 }}
                animate={hoveredIndex === index ? { opacity: 0.3 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Video indicator */}
              {post.type === "video" && (
                <motion.div 
                  className="absolute top-4 right-4 z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.12 + 0.3, type: "spring", stiffness: 400 }}
                >
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md"
                    style={{ background: `${FLAT_BLUE}CC` }}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </motion.div>
              )}
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                {/* Caption */}
                <motion.p
                  className="text-white font-semibold text-sm md:text-base lg:text-lg leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={hoveredIndex === index ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {post.caption}
                </motion.p>
                
                {/* View Post CTA */}
                <motion.div
                  className="flex items-center gap-2 mt-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={hoveredIndex === index ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  <span className="text-xs md:text-sm font-medium" style={{ color: FLAT_BEIGE }}>
                    View on Instagram
                  </span>
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke={FLAT_BEIGE}
                    viewBox="0 0 24 24"
                    animate={hoveredIndex === index ? { x: [0, 4, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.div>
              </div>
              
              {/* Floating Instagram icon */}
              <motion.div
                className="absolute top-4 left-4 z-10"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: index * 0.12 + 0.4, type: "spring", stiffness: 300 }}
              >
                <div 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-md"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                    <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>
                  </svg>
                </div>
              </motion.div>
              
              {/* Decorative corner accent */}
              <motion.div
                className="absolute bottom-0 right-0 w-20 h-20 md:w-28 md:h-28"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${FLAT_BLUE}40 50%)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={hoveredIndex === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          );
        })}
      </div>

      {/* Animated Follow CTA */}
      <motion.div 
        className="text-center mt-12 md:mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.a
          href={`https://www.instagram.com/${username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 px-10 py-5 rounded-full font-bold text-lg transition-all group overflow-hidden relative"
          style={{ 
            background: FLAT_BLUE, 
            color: OFF_WHITE,
            boxShadow: `0 10px 40px ${FLAT_BLUE}50`,
          }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: `0 15px 50px ${FLAT_BLUE}70`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0"
            style={{ background: `linear-gradient(90deg, transparent, ${OFF_WHITE}20, transparent)` }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <span className="relative z-10">@{username}</span>
          <motion.svg 
            className="w-6 h-6 relative z-10" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
            <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
            <circle cx="18.406" cy="5.594" r="1.44"/>
          </motion.svg>
          <motion.span 
            className="relative z-10"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </div>
  );
}
