import { useState, useEffect } from "react";
import InstagramEmbed from "./InstagramEmbed";

interface InstagramFeedProps {
  username: string;
  limit?: number;
  postUrls: string[];
}

export default function InstagramFeed({ username, limit = 6, postUrls }: InstagramFeedProps) {
  const [displayedPosts, setDisplayedPosts] = useState<string[]>([]);

  useEffect(() => {
    // Use the provided postUrls, limited by the limit prop
    const postsToShow = postUrls.slice(0, limit);
    setDisplayedPosts(postsToShow);
  }, [postUrls, limit]);

  if (displayedPosts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {displayedPosts.map((url, index) => (
        <div key={index} className="w-full">
          <InstagramEmbed url={url} className="w-full" />
        </div>
      ))}
    </div>
  );
}
