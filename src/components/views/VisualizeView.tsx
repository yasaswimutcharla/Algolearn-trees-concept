import React, { useState, useRef, useEffect } from 'react';
import { getActiveUserId, getUserItem, setUserItem, removeUserItem } from '../../utils/userStorage';
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Video as VideoIcon,
  CheckCircle2,
  Circle
} from 'lucide-react';

interface VisualizeViewProps {
  isDarkMode: boolean;
  userId?: string;
  videoUrl?: string | null;
  videoName?: string;
  videoSize?: string;
  isVideoCompleted?: boolean;
  onToggleVideoCompleted?: () => void;
  // Kept optional for backward compatibility
  onUploadVideo?: (file: File) => void;
  isUploadingVideo?: boolean;
  uploadStatus?: string;
}

const PUBLIC_LESSON_VIDEO_URL = '/videos/lesson.mp4?v=2';
const PUBLIC_LESSON_VIDEO_NAME = 'Tree DSA Complete Visual Lesson';

export const VisualizeView: React.FC<VisualizeViewProps> = ({
  isDarkMode,
  userId,
  videoUrl,
  isVideoCompleted = false,
  onToggleVideoCompleted,
}) => {
  const effectiveUserId = userId || getActiveUserId();
  const activeVideoUrl = videoUrl || PUBLIC_LESSON_VIDEO_URL;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoLoadError, setVideoError] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset any legacy cached time so video always plays from start
  useEffect(() => {
    try {
      removeUserItem(effectiveUserId, 'video_last_time');
    } catch {}
  }, [effectiveUserId]);

  // Reset error state on URL change
  useEffect(() => {
    setVideoError(false);
  }, [activeVideoUrl]);

  // Synchronize fullscreen events from browser and native video players
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isDocFull = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isDocFull);
      if (!isDocFull) {
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    const vid = videoRef.current as any;
    const onWebkitBegin = () => {
      setIsFullscreen(true);
      document.body.style.overflow = 'hidden';
    };
    const onWebkitEnd = () => {
      setIsFullscreen(false);
      document.body.style.overflow = '';
    };

    if (vid) {
      vid.addEventListener('webkitbeginfullscreen', onWebkitBegin);
      vid.addEventListener('webkitendfullscreen', onWebkitEnd);
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      if (vid) {
        vid.removeEventListener('webkitbeginfullscreen', onWebkitBegin);
        vid.removeEventListener('webkitendfullscreen', onWebkitEnd);
      }
      document.body.style.overflow = '';
    };
  }, []);

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00';
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Seek handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Skip forward / backward
  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    const target = Math.min(Math.max(0, videoRef.current.currentTime + seconds), duration);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  // Volume slider handler
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  // Mute / Unmute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  // Playback speed cycle
  const cyclePlaybackSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  // Cross-browser Fullscreen toggle (Container + Video native + Viewport fallback)
  const toggleFullscreen = () => {
    const elem = playerContainerRef.current as any;
    const vid = videoRef.current as any;

    if (!isFullscreen) {
      setIsFullscreen(true);
      document.body.style.overflow = 'hidden';

      // 1. Try modern standard requestFullscreen on player container
      if (elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen().catch(() => {
            // Container fullscreen denied or restricted by iframe/environment -> try video element
            if (vid) {
              if (vid.requestFullscreen) {
                vid.requestFullscreen().catch(() => {});
              } else if (vid.webkitEnterFullscreen) {
                vid.webkitEnterFullscreen();
              }
            }
          });
          return;
        } else if (elem.webkitRequestFullscreen) {
          try {
            elem.webkitRequestFullscreen();
            return;
          } catch {}
        } else if (elem.mozRequestFullScreen) {
          try {
            elem.mozRequestFullScreen();
            return;
          } catch {}
        } else if (elem.msRequestFullscreen) {
          try {
            elem.msRequestFullscreen();
            return;
          } catch {}
        }
      }

      // 2. Fallback to video element fullscreen (e.g. iOS Safari)
      if (vid) {
        if (vid.requestFullscreen) {
          vid.requestFullscreen().catch(() => {});
        } else if (vid.webkitEnterFullscreen) {
          vid.webkitEnterFullscreen();
        } else if (vid.webkitRequestFullscreen) {
          vid.webkitRequestFullscreen();
        }
      }
    } else {
      // Exit fullscreen
      setIsFullscreen(false);
      document.body.style.overflow = '';

      if (
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    }
  };

  // Mouse activity for hiding controls when playing
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    if (isPlaying) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      skip(5);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      skip(-5);
    } else if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      toggleMute();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'Escape' && isFullscreen) {
      e.preventDefault();
      toggleFullscreen();
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full max-w-7xl mx-auto space-y-6 py-2 outline-none"
    >
      {/* Header Section */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-slate-100 shadow-xl shadow-violet-950/30'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-violet-400 mb-1.5">
              <VideoIcon className="w-4 h-4" />
              <span>VISUAL LESSON</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {PUBLIC_LESSON_VIDEO_NAME}
            </h1>
            <p className="text-xs sm:text-sm mt-1.5 opacity-80 leading-relaxed max-w-2xl">
              Complete interactive visual lesson covering Tree fundamentals, Binary Search Tree properties, and traversals.
            </p>
          </div>

          {/* Action Badges & Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Completion Status Toggle */}
            {onToggleVideoCompleted && (
              <button
                id="btn-visualize-toggle-completed"
                onClick={onToggleVideoCompleted}
                className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer shadow-sm ${
                  isVideoCompleted
                    ? isDarkMode
                      ? 'text-[#A78BFA] bg-violet-950/70 border-violet-700/60 font-semibold'
                      : 'text-[#6D3DF5] bg-violet-50 border-violet-300 font-semibold'
                    : isDarkMode
                    ? 'text-slate-400 bg-slate-900/40 border-slate-800 hover:bg-slate-800'
                    : 'text-blue-900 bg-white border-blue-200 hover:bg-blue-50'
                }`}
                title="Click to toggle lesson completion status"
              >
                {isVideoCompleted ? (
                  <>
                    <CheckCircle2 className={`w-4 h-4 ${isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'}`} />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 opacity-60" />
                    <span>Not completed</span>
                  </>
                )}
              </button>
            )}

            {/* Full Screen Button replacing 100% Screen Fill */}
            <button
              id="btn-visualize-fullscreen"
              onClick={toggleFullscreen}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                isDarkMode
                  ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-950/50'
                  : 'bg-[#6D3DF5] hover:bg-[#5B2FD9] text-white shadow-indigo-100'
              }`}
              title={isFullscreen ? 'Exit Full Screen' : 'View Full Screen'}
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-3.5 h-3.5" />
                  <span>Exit Full Screen</span>
                </>
              ) : (
                <>
                  <Maximize className="w-3.5 h-3.5" />
                  <span>Full Screen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Keyboard shortcuts row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3.5 border-t border-violet-950/40 text-xs opacity-75">
          <span>Shortcuts: Space (Play/Pause) • M (Mute) • F (Full Screen) • Left/Right (Seek 5s) • Double Click (Full Screen)</span>
        </div>
      </div>

      {/* Main Full-Size Video Learning Section */}
      <div
        ref={playerContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        style={
          isFullscreen
            ? {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 99999,
                margin: 0,
                borderRadius: 0,
              }
            : undefined
        }
        className={`transition-all duration-300 select-none ${
          isFullscreen
            ? 'fixed inset-0 z-[99999] w-screen h-screen bg-black rounded-none border-none flex flex-col justify-between overflow-hidden'
            : `relative w-full rounded-3xl overflow-hidden border shadow-2xl bg-black ${
                isDarkMode ? 'border-violet-900/50 shadow-violet-950/50' : 'border-blue-200 shadow-blue-200/50'
              }`
        }`}
      >
        {/* Floating Exit Fullscreen Button in top right */}
        {isFullscreen && (
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all cursor-pointer shadow-2xl backdrop-blur-md"
              title="Exit Fullscreen (Esc or F)"
            >
              <Minimize className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Video Canvas Container */}
        <div
          className={`relative w-full flex items-center justify-center bg-black overflow-hidden ${
            isFullscreen ? 'h-full w-full max-h-none flex-1' : 'min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] aspect-video w-full'
          }`}
        >
          <video
            key={activeVideoUrl}
            ref={videoRef}
            src={activeVideoUrl}
            poster="/videos/poster.jpg"
            controls
            playsInline
            preload="metadata"
            onClick={togglePlay}
            onDoubleClick={toggleFullscreen}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={() => {
              if (videoRef.current) {
                const t = videoRef.current.currentTime;
                setCurrentTime(t);
                try {
                  setUserItem(effectiveUserId, 'video_last_time', String(t));
                } catch {}
              }
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setDuration(videoRef.current.duration);
              }
            }}
            onEnded={() => {
              setIsPlaying(false);
              try {
                removeUserItem(effectiveUserId, 'video_last_time');
              } catch {}
              if (onToggleVideoCompleted && !isVideoCompleted) {
                onToggleVideoCompleted();
              }
            }}
            onError={() => {
              setVideoError(true);
              setIsPlaying(false);
            }}
            className="w-full h-full transition-all duration-300 object-contain cursor-pointer"
          >
            <source src={activeVideoUrl} type="video/mp4" />
            {typeof window !== 'undefined' && (import.meta as any).env?.BASE_URL && (import.meta as any).env.BASE_URL !== '/' && (
              <source src={`${((import.meta as any).env.BASE_URL as string).replace(/\/$/, '')}${activeVideoUrl}`} type="video/mp4" />
            )}
            Your browser does not support the video tag.
          </video>

          {/* Error / Reload Overlay */}
          {videoLoadError && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-violet-950/80 border border-violet-800 text-violet-400 flex items-center justify-center mb-3">
                <RotateCcw className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-white mb-1">Tree DSA Visual Lesson</p>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                Click below to reload the visual lesson video.
              </p>
              <button
                type="button"
                onClick={() => {
                  setVideoError(false);
                  if (videoRef.current) {
                    videoRef.current.load();
                    videoRef.current.play().catch(() => {});
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Video</span>
              </button>
            </div>
          )}

          {/* Center Play Button Overlay (when paused and no error) */}
          {!isPlaying && !videoLoadError && (
            <button
              onClick={togglePlay}
              className="absolute z-20 w-20 h-20 rounded-full bg-violet-600/90 hover:bg-violet-500 text-white flex items-center justify-center shadow-2xl shadow-violet-900/70 backdrop-blur-sm transition-transform transform hover:scale-110 cursor-pointer"
              title="Play Video"
            >
              <Play className="w-8 h-8 ml-1 fill-current" />
            </button>
          )}
        </div>

        {/* Video Control Bar Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-40 px-4 py-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Seek Bar / Progress Slider */}
          <div className="relative group flex items-center w-full mb-3 cursor-pointer">
            <div className="relative w-full h-1.5 group-hover:h-2 bg-slate-700/80 rounded-full overflow-hidden transition-all">
              <div
                className="h-full bg-violet-500 transition-all rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Seek timeline"
            />
          </div>

          {/* Bottom Controls Row */}
          <div className="flex items-center justify-between gap-2 text-white">
            {/* Left Controls: Play/Pause, Rewind, FastForward, Time Display */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-xl hover:bg-white/15 transition-colors cursor-pointer text-white"
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={() => skip(-10)}
                className="p-1.5 rounded-xl hover:bg-white/15 transition-colors cursor-pointer text-slate-300 hover:text-white"
                title="Rewind 10 seconds"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => skip(10)}
                className="p-1.5 rounded-xl hover:bg-white/15 transition-colors cursor-pointer text-slate-300 hover:text-white"
                title="Forward 10 seconds"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Time Display */}
              <div className="text-xs font-mono font-medium text-slate-200 tracking-tight ml-1">
                <span>{formatTime(currentTime)}</span>
                <span className="opacity-50 mx-1">/</span>
                <span className="opacity-70">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls: Volume, Speed, 100% Fill Toggle, Fullscreen */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Volume Controls */}
              <div className="flex items-center gap-1.5 group">
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-xl hover:bg-white/15 transition-colors cursor-pointer text-slate-200 hover:text-white"
                  title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  title="Volume slider"
                />
              </div>

              {/* Playback Speed Toggle */}
              <button
                onClick={cyclePlaybackSpeed}
                className="px-2 py-1 rounded-lg hover:bg-white/15 text-xs font-mono font-bold text-slate-200 hover:text-white transition-colors cursor-pointer"
                title="Change playback speed"
              >
                {playbackSpeed}x
              </button>

              {/* Fullscreen Button */}
              <button
                id="btn-player-fullscreen-toggle"
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-all cursor-pointer shadow-lg border border-violet-400/50 ml-1 shrink-0"
                title={isFullscreen ? 'Exit Full Screen (F)' : 'Full Screen (F)'}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
