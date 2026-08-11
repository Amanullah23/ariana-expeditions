"use client";
import { useState } from "react";

function getYouTubeEmbedId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function VideoPlayer({ youtubeUrl, videoUrl, title }) {
  const [playing, setPlaying] = useState(false);
  const youtubeId = getYouTubeEmbedId(youtubeUrl);

  if (!youtubeId && !videoUrl) return null;

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-dark shadow-lg">
      {!playing ? (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title || "video"}`}
          className="group absolute inset-0 w-full h-full flex items-center justify-center bg-dark/40 hover:bg-dark/30 transition-colors duration-300"
        >
          <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 group-hover:bg-gold flex items-center justify-center transition-colors duration-300 shadow-lg">
            <svg
              className="w-7 h-7 md:w-8 md:h-8 text-dark ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      ) : youtubeId ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl}
          controls
          autoPlay
        />
      )}
    </div>
  );
}
