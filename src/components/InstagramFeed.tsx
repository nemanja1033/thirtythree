import { motion } from "framer-motion";

interface InstagramFeedProps {
  username?: string;
  limit?: number;
  postUrls?: string[];
}

const FLAT_BLUE = "#1c33c3";
const FLAT_BEIGE = "#f5e6d3";
const DARK_BG = "#0a0a0f";

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

  if (postUrls.length === 0) {
    return (
      <div className="text-center py-12">
        <a
          href={`https://www.instagram.com/${username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white"
          style={{ background: FLAT_BLUE }}
        >
          Follow @{username}
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Instagram Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {postUrls.slice(0, limit).map((url, index) => {
          const postId = getPostId(url);
          
          return (
            <motion.a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              style={{ background: index % 2 === 0 ? FLAT_BLUE : DARK_BG }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              
              {/* Burger Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-1/3 h-1/3 opacity-30" fill={FLAT_BEIGE}>
                  <rect x="10" y="10" width="80" height="18" rx="9" />
                  <path d="M10 42 Q25 35 40 42 T70 42 T90 42 L90 52 Q75 59 60 52 T30 52 T10 52 Z" />
                  <rect x="10" y="58" width="80" height="10" rx="5" />
                  <rect x="10" y="74" width="80" height="18" rx="9" />
                </svg>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white flex flex-col items-center gap-2">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                    <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>
                  </svg>
                  <span className="text-sm font-medium">View Post</span>
                </div>
              </div>
              
              {/* Post Number Badge */}
              <div 
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: FLAT_BEIGE, color: DARK_BG }}
              >
                {index + 1}
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* View All Button */}
      <motion.div 
        className="text-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.a
          href={`https://www.instagram.com/${username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium border-2 transition-all"
          style={{ borderColor: FLAT_BLUE, color: FLAT_BLUE }}
          whileHover={{ 
            scale: 1.03, 
            backgroundColor: FLAT_BLUE, 
            color: "#fff",
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span>View all on Instagram</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>
      </motion.div>
    </div>
  );
}
