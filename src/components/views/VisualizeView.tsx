import React, { useState, useRef, useEffect } from 'react';
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
  Upload,
  Video as VideoIcon,
  CheckCircle2,
  Circle,
  FileVideo,
  Sparkles,
  Loader2
} from 'lucide-react';

interface VisualizeViewProps {
  isDarkMode: boolean;
  videoUrl?: string | null;
  videoName?: string;
  videoSize?: string;
  isVideoCompleted?: boolean;
  onToggleVideoCompleted?: () => void;
  onUploadVideo?: (file: File) => void;
  onRemoveVideo?: () => void;
  isUploadingVideo?: boolean;
  uploadStatus?: string;
}

const DEFAULT_VIDEO_URL = '/videos/lesson.mp4';
const DEFAULT_VIDEO_NAME = 'Tree DSA Complete Visual Lesson';
const DEFAULT_VIDEO_SIZE = '11.0 MB';

export const VisualizeView: React.FC<VisualizeViewProps> = ({
  isDarkMode,
  videoUrl,
  videoName,
  videoSize,
  isVideoCompleted = false,
  onToggleVideoCompleted,
  onUploadVideo,
  onRemoveVideo,
  isUploadingVideo = false,
  uploadStatus = ''
}) => {
  const activeVideoUrl = videoUrl || DEFAULT_VIDEO_URL;
  const activeVideoName = videoName || DEFAULT_VIDEO_NAME;
  const activeVideoSize = videoSize || DEFAULT_VIDEO_SIZE;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Restore and remember last playback timestamp across navigation and reloads
  useEffect(() => {
    try {
      const savedTime = parseFloat(localStorage.getItem('tree_dsa_video_last_time') || '0');
      if (savedTime > 0 && videoRef.current) {
        const onLoaded = () => {
          if (videoRef.current && savedTime < (videoRef.current.duration || 10000)) {
            videoRef.current.currentTime = savedTime;
            setCurrentTime(savedTime);
          }
        };
        if (videoRef.current.readyState >= 1) {
          onLoaded();
        } else {
          videoRef.current.addEventListener('loadedmetadata', onLoaded, { once: true });
        }
      }
    } catch {}
  }, [activeVideoUrl]);

  // Sync fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
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

  // File upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && onUploadVideo) {
      onUploadVideo(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && onUploadVideo) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|ogg|mkv)$/i)) {
        onUploadVideo(file);
      } else {
        alert('Please select a valid video file (MP4, WebM, MOV, etc.).');
      }
    }
  };

  // Trigger hidden file picker
  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
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
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="max-w-5xl mx-auto space-y-6 py-2 outline-none"
    >
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header Section */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-slate-100 shadow-xl shadow-violet-950/30'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-violet-400 mb-2">
              <VideoIcon className="w-4 h-4" />
              <span>VIDEO LEARNING SECTION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Tree DSA Complete Visual Lesson
            </h1>
            <p className="text-xs sm:text-sm mt-1.5 opacity-80 leading-relaxed max-w-2xl">
              One comprehensive visual masterclass covering all fundamental Tree data structures,
              binary trees, BST algorithms, and tree traversals.
            </p>
          </div>

          {/* Action Badges & Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Completion Status Toggle */}
            {onToggleVideoCompleted && (
              <button
                id="btn-visualize-toggle-completed"
                onClick={onToggleVideoCompleted}
                className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl border transition-all cursor-pointer shadow-sm ${
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

            {/* Uploading indicator */}
            {isUploadingVideo && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-violet-600/30 border border-violet-500/50 text-violet-200 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                <span>Saving video...</span>
              </div>
            )}

            {/* Upload Video Button ONLY when no video is uploaded yet */}
            {!activeVideoUrl && (
              <button
                id="btn-visualize-upload-video"
                onClick={triggerUpload}
                disabled={isUploadingVideo}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                  isDarkMode
                    ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-950/50'
                    : 'bg-[#6D3DF5] hover:bg-[#5B2FD9] text-white shadow-indigo-100'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Upload feedback banner */}
        {uploadStatus && (
          <div className="mt-3 px-3.5 py-2 rounded-xl bg-violet-600/20 border border-violet-500/40 text-xs font-medium text-violet-200 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            <span>{uploadStatus}</span>
          </div>
        )}

        {/* Keyboard shortcuts row if video exists */}
        {activeVideoUrl && (
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-violet-950/40 text-xs opacity-70">
            <span>Keyboard shortcuts: Space (Play/Pause) • M (Mute) • F (Fullscreen) • Left/Right (Seek 5s)</span>
          </div>
        )}
      </div>

      {/* Main Video Learning Section */}
      {activeVideoUrl ? (
        <div
          ref={playerContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 bg-black select-none ${
            isDarkMode ? 'border-violet-900/50 shadow-violet-950/40' : 'border-blue-200 shadow-blue-200/40'
          }`}
        >
          {/* Native Video Element */}
          <div className="relative w-full aspect-video flex items-center justify-center bg-black overflow-hidden">
            <video
              ref={videoRef}
              src={activeVideoUrl}
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={() => {
                if (videoRef.current) {
                  const t = videoRef.current.currentTime;
                  setCurrentTime(t);
                  try {
                    localStorage.setItem('tree_dsa_video_last_time', String(t));
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
                  localStorage.removeItem('tree_dsa_video_last_time');
                } catch {}
                if (onToggleVideoCompleted && !isVideoCompleted) {
                  onToggleVideoCompleted();
                }
              }}
              style={{ transform: 'scale(3)', transformOrigin: 'center center' }}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* Big Center Play Button Overlay (when paused) */}
            {!isPlaying && (
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
            className={`absolute bottom-0 left-0 right-0 z-30 px-4 py-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-300 ${
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

            {/* Bottom Controls Row: Play/Pause, Skip, Time, Volume, Speed, Fullscreen */}
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

              {/* Right Controls: Volume, Speed, Fullscreen */}
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
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-xl hover:bg-white/15 transition-colors cursor-pointer text-slate-200 hover:text-white"
                  title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Upload Drag & Drop Zone (When no video is uploaded yet) */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerUpload}
          className={`p-10 sm:p-14 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
            isDragOver
              ? 'border-violet-500 bg-violet-950/30 scale-[1.01]'
              : isDarkMode
              ? 'border-violet-900/50 hover:border-violet-600 bg-[#0b101e] hover:bg-[#0e1426]'
              : 'border-blue-200 hover:border-blue-400 bg-blue-50/40 hover:bg-blue-50/80'
          }`}
        >
          {isUploadingVideo ? (
            <div className="flex flex-col items-center justify-center py-6">
              <Loader2 className="w-12 h-12 animate-spin text-violet-400 mb-4" />
              <h3 className="text-lg font-bold text-violet-200 mb-1">Saving Video Lesson...</h3>
              <p className="text-xs text-violet-300/80 max-w-sm">
                Uploading and storing video file.
              </p>
            </div>
          ) : (
            <>
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  isDarkMode
                    ? 'bg-violet-950/70 border border-violet-800/60 text-violet-400 shadow-xl shadow-violet-950/50'
                    : 'bg-violet-100 border border-violet-200 text-[#6D3DF5]'
                }`}
              >
                <VideoIcon className="w-8 h-8" />
              </div>

              <h3 className="text-lg sm:text-xl font-black tracking-tight mb-1">
                Upload Tree DSA Complete Video Lesson
              </h3>
              <p className="text-xs sm:text-sm max-w-md opacity-75 mb-6 leading-relaxed">
                Drag and drop your complete video lesson file here, or click to browse.
                Supported formats: MP4, WebM, MOV, MKV.
              </p>

              <button
                type="button"
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                  isDarkMode
                    ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-950/60'
                    : 'bg-[#6D3DF5] hover:bg-[#5B2FD9] text-white shadow-violet-200'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Select Video File</span>
              </button>
            </>
          )}
        </div>
      )}


    </div>
  );
};
