import React, { useState, useEffect, useRef } from "react";
import {
  FaShareAlt,
  FaThumbsUp,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Reel = ({
  src,
  isPlaying,
  isMuted,
  toggleMute,
  onLike,
  onShare,
  isLiked,
  id,
  tags,
}) => {
  const videoRef = useRef(null);
  const [animateThumb, setAnimateThumb] = useState(false);
  const [animateSpeaker, setAnimateSpeaker] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const playVideo = () => {
      if (isPlaying) {
        video
          .play()
          .catch((err) => console.error("Playback error:", err.message || err));
      } else {
        video.pause();
      }
    };

    playVideo();
  }, [isPlaying]);

  const handleLikeClick = () => {
    onLike();
    setAnimateThumb(true);
    setTimeout(() => setAnimateThumb(false), 1000);
  };

  const handleMuteClick = () => {
    toggleMute();
    setAnimateSpeaker(true);
    setTimeout(() => setAnimateSpeaker(false), 1000);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-black border-4 border-white shadow-lg p-4 box-border">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain cursor-pointer rounded-lg transition-opacity duration-300 ease-in-out"
        loop
        muted={isMuted}
        playsInline
        onClick={handleMuteClick}
      />

      {animateThumb && (
        <motion.div
          className="absolute z-20"
          animate={{ scale: 2, opacity: 1 }}
          initial={{ scale: 1, opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <FaThumbsUp className="text-sky-500 text-6xl" />
        </motion.div>
      )}

      {animateSpeaker && (
        <motion.div
          className="absolute z-20"
          animate={{ scale: 2, opacity: 1 }}
          initial={{ scale: 1, opacity: 0 }}
          transition={{ duration: 2 }}
        >
          {isMuted ? (
            <FaVolumeMute className="text-sky-500 text-6xl" />
          ) : (
            <FaVolumeUp className="text-sky-500 text-6xl" />
          )}
        </motion.div>
      )}

      <div className="absolute bottom-5 left-5 z-10 flex justify-center items-center gap-2">
        <motion.button
          onClick={handleMuteClick}
          className="bg-black/50 text-white text-base px-4 py-2 rounded-md transition-colors duration-300 hover:bg-black/70"
        >
          {isMuted ? "Unmute" : "Mute"}
        </motion.button>

        <motion.button
          onClick={handleLikeClick}
          className={`text-base px-4 py-2 rounded-md transition-colors duration-300 ${
            isLiked
              ? "bg-blue-500 text-white"
              : "bg-black/50 text-white hover:bg-black/70"
          }`}
        >
          <FaThumbsUp />
        </motion.button>

        <motion.button
          onClick={onShare}
          className="bg-black/50 text-white text-base px-4 py-2 rounded-md transition-colors duration-300 hover:bg-black/70"
        >
          <FaShareAlt />
        </motion.button>
      </div>

      <motion.div
        className="absolute top-10 left-5 bg-black/70 text-white px-4 py-2 text-base rounded-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        #AmazingReel id: {id}
      </motion.div>

      <div className="absolute bottom-20 left-0 w-full bg-black/70 text-white px-4 py-2 text-sm rounded-md flex justify-center gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-blue-400 hover:text-blue-500 hover:underline cursor-pointer transition duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Reel;
