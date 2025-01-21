import React, { useState, useEffect, useCallback } from "react";
import Reel from "./Reel";
import throttle from "lodash/throttle";
import videolinks from "../Assets/videolinks";

const VideoReels = () => {
  const [reelsData, setReelsData] = useState([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState(3);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState({});

  useEffect(() => {
    setReelsData(videolinks);
  }, []);

  const loadMoreVideos = useCallback(() => {
    if (loading || loadedVideos >= reelsData.length) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoadedVideos((prev) => Math.min(prev + 3, reelsData.length));
      setLoading(false);
    }, 1000);
  }, [loading, loadedVideos, reelsData.length]);

  const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight } = document.documentElement;
    const { innerHeight } = window;

    const nextReelIndex = Math.floor(
      (scrollTop + innerHeight / 2) / innerHeight
    );

    if (nextReelIndex !== currentReelIndex) {
      setCurrentReelIndex(nextReelIndex);
    }

    if (scrollTop + innerHeight >= scrollHeight - 10) {
      loadMoreVideos();
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleLike = (id) => {
    setLikedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (id) => {
    const shareUrl = `http://localhost:3000/share/${id}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this reel!",
          text: "Check out this amazing video reel on Insta Reels!",
          url: shareUrl,
        })
        .catch((err) => console.error("Share failed", err));
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-y-auto p-0 m-0">
      {reelsData.slice(0, loadedVideos).map((reel, index) => (
        <div key={reel.id} className="relative">
          <Reel
            src={reel.src}
            isPlaying={currentReelIndex === index}
            isMuted={isMuted}
            toggleMute={toggleMute}
            onLike={() => handleLike(reel.id)}
            onShare={() => handleShare(reel.id)}
            isLiked={likedVideos[reel.id]}
            id={reel.id}
            tags={reel.tags}
          />
        </div>
      ))}

      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-white z-50 flex justify-center items-center">
          <div className="spinner-border animate-spin text-white" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          Loading more reels...
        </div>
      )}
    </div>
  );
};

export default VideoReels;
