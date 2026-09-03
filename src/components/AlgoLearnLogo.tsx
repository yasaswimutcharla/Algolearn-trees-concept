import React from 'react';

interface AlgoLearnLogoProps {
  isDark?: boolean;
  /**
   * 'full' shows the 3D isometric graduation cap icon, "AlgoLearn" title, and "YOUR DSA JOURNEY" subtitle
   * 'icon' shows only the 3D isometric graduation cap emblem
   * 'compact' shows the cap + "AlgoLearn" text without subtitle for tight spaces
   */
  variant?: 'full' | 'icon' | 'compact';
  /**
   * Size presets or custom scaling
   * 'sm' (header compact: ~32px height)
   * 'md' (standard: ~40px height)
   * 'lg' (overview/hero: ~52px height)
   * 'xl' (display: ~64px height)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

/**
 * AlgoLearn 3D Isometric Graduation Cap Icon
 * Exact vector replica of the uploaded reference logo
 */
export const AlgoLearnCapIcon: React.FC<{
  className?: string;
  isDark?: boolean;
  size?: number;
}> = ({ className = '', isDark = false, size = 40 }) => {
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none overflow-visible ${className}`}
      aria-label="AlgoLearn Graduation Cap Icon"
    >
      <defs>
        {/* Diamond Mortarboard Top Gradient: Deep midnight navy to electric royal blue */}
        <linearGradient
          id={`mortarboardGrad-${uniqueId}`}
          x1="20"
          y1="18"
          x2="118"
          y2="74"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#040F28" />
          <stop offset="28%" stopColor="#0A2254" />
          <stop offset="65%" stopColor="#1446A0" />
          <stop offset="100%" stopColor="#1E65FF" />
        </linearGradient>

        {/* Top Rim Specular Highlight */}
        <linearGradient
          id={`mortarboardRimGrad-${uniqueId}`}
          x1="12"
          y1="46"
          x2="124"
          y2="46"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
        </linearGradient>

        {/* Thickness Extrusion Left Gradient */}
        <linearGradient
          id={`extrusionLeftGrad-${uniqueId}`}
          x1="12"
          y1="46"
          x2="68"
          y2="82"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#05122E" />
          <stop offset="100%" stopColor="#0A255C" />
        </linearGradient>

        {/* Thickness Extrusion Right Gradient */}
        <linearGradient
          id={`extrusionRightGrad-${uniqueId}`}
          x1="68"
          y1="82"
          x2="124"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0C2C6B" />
          <stop offset="100%" stopColor="#1D58D8" />
        </linearGradient>

        {/* Skull Cap Body Gradient: Rich violet/purple to radiant electric blue/cyan */}
        <linearGradient
          id={`skullCapGrad-${uniqueId}`}
          x1="22"
          y1="96"
          x2="96"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="25%" stopColor="#6366F1" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="85%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#00D2FF" />
        </linearGradient>

        {/* Collar/Trim White-Cyan Highlight */}
        <linearGradient
          id={`collarHighlightGrad-${uniqueId}`}
          x1="24"
          y1="68"
          x2="94"
          y2="68"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.9" />
        </linearGradient>

        {/* Tassel Gradient: Royal blue to electric sky blue */}
        <linearGradient
          id={`tasselGrad-${uniqueId}`}
          x1="86"
          y1="46"
          x2="96"
          y2="106"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="40%" stopColor="#0284C7" />
          <stop offset="80%" stopColor="#00A3FF" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>

        {/* Dark mode subtle ambient glow */}
        {isDark && (
          <filter id={`ambientGlow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        )}
      </defs>

      <g filter={isDark ? `url(#ambientGlow-${uniqueId})` : undefined}>
        {/* ============================================================== */}
        {/* 1. SKULL CAP BASE (Sitting below the mortarboard)               */}
        {/* ============================================================== */}
        {/* Skull Cap Body with vivid purple-to-cyan gradient */}
        <path
          d="M 27 68 
             C 27 68 25 96 26 102
             C 27 108 34 116 52 120
             C 66 123 78 119 86 112
             C 92 107 94 98 94 65
             C 86 73 75 79 60 79
             C 45 79 34 74 27 68 Z"
          fill={`url(#skullCapGrad-${uniqueId})`}
        />

        {/* Skull Cap Bottom Rim Inner Shadow & Depth */}
        <path
          d="M 26 102
             C 27 108 34 116 52 120
             C 66 123 78 119 86 112
             C 92 107 94 98 94 92
             C 93 100 89 105 84 109
             C 76 115 64 118 51 116
             C 34 112 28 105 26 102 Z"
          fill="#000000"
          fillOpacity="0.25"
        />

        {/* White / Cyan Collar Highlight separating board and skull cap */}
        <path
          d="M 26 67
             C 33 73 45 78 60 78
             C 74 78 86 72 94 64
             C 94 67 85 75 60 81
             C 44 81 32 75 26 67 Z"
          fill={`url(#collarHighlightGrad-${uniqueId})`}
        />

        {/* ============================================================== */}
        {/* 2. MORTARBOARD THICKNESS RIM (Bevel Extrusion)                  */}
        {/* ============================================================== */}
        {/* Left-Front Bevel */}
        <path
          d="M 10 47.5 
             L 10 52.5 
             C 10 55 13 58 17 60.5
             L 64 83
             C 66 84 70 84 72 83
             L 72 77
             C 70 78 66 78 64 77
             L 17 54.5
             C 13 52 10 49.5 10 47.5 Z"
          fill={`url(#extrusionLeftGrad-${uniqueId})`}
        />

        {/* Right-Front Bevel */}
        <path
          d="M 64 83
             C 66 84 70 84 72 83
             L 119 59.5
             C 123 57.5 126 54.5 126 52
             L 126 47
             C 126 49.5 123 52.5 119 54.5
             L 72 77
             C 70 78 66 78 64 77
             L 64 83 Z"
          fill={`url(#extrusionRightGrad-${uniqueId})`}
        />

        {/* ============================================================== */}
        {/* 3. MORTARBOARD TOP DIAMOND (Isometric Surface)                 */}
        {/* ============================================================== */}
        <path
          d="M 16.5 44
             C 11 46.5 11 49.5 16.5 52
             L 63.5 75
             C 66.5 76.5 70.5 76.5 73.5 75
             L 119.5 52
             C 125 49.5 125 46.5 119.5 44
             L 73.5 21
             C 70.5 19.5 66.5 19.5 63.5 21
             L 16.5 44 Z"
          fill={`url(#mortarboardGrad-${uniqueId})`}
        />

        {/* Crisp perimeter highlight on top face */}
        <path
          d="M 16.5 44
             C 11 46.5 11 49.5 16.5 52
             L 63.5 75
             C 66.5 76.5 70.5 76.5 73.5 75
             L 119.5 52
             C 125 49.5 125 46.5 119.5 44
             L 73.5 21
             C 70.5 19.5 66.5 19.5 63.5 21
             L 16.5 44 Z"
          stroke={`url(#mortarboardRimGrad-${uniqueId})`}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* ============================================================== */}
        {/* 4. TASSEL BUTTON, CORD, AND BELL                               */}
        {/* ============================================================== */}
        {/* Button / Knot on top of the cap */}
        <ellipse
          cx="68"
          cy="46"
          rx="3.8"
          ry="2.4"
          fill="#1E3A8A"
          stroke="#3B82F6"
          strokeWidth="0.8"
        />

        {/* Tassel Cord draping over right side */}
        <path
          d="M 68 47
             C 76 49 84 52 89 57
             C 92 60 93 64 93 75
             L 93 78"
          stroke={`url(#tasselGrad-${uniqueId})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tassel Ring / Collar */}
        <rect
          x="90.8"
          y="77"
          width="4.4"
          height="3"
          rx="1.4"
          fill="#38BDF8"
          stroke="#0284C7"
          strokeWidth="0.6"
        />

        {/* Tassel Bell / Pear Droplet */}
        <path
          d="M 91.5 80
             C 90 84 87.5 91 87.5 95.5
             C 87.5 99.5 90 102.5 93 102.5
             C 96 102.5 98.5 99.5 98.5 95.5
             C 98.5 91 96 84 94.5 80
             Z"
          fill={`url(#tasselGrad-${uniqueId})`}
        />
      </g>
    </svg>
  );
};

/**
 * AlgoLearn Full Branding Logo Component
 * Implements exact typography, colors, and graduation cap from the reference images.
 * Automatically switches between light mode and dark mode.
 */
export const AlgoLearnLogo: React.FC<AlgoLearnLogoProps> = ({
  isDark = false,
  variant = 'full',
  size = 'md',
  className = '',
  onClick
}) => {
  // Dimension configurations
  const dimensions = {
    sm: {
      capSize: 32,
      algoTextSize: 'text-lg sm:text-xl',
      subtextSize: 'text-[7.5px] sm:text-[8px]',
      gap: 'gap-2 sm:gap-2.5',
      tracking: 'tracking-[0.24em]'
    },
    md: {
      capSize: 40,
      algoTextSize: 'text-2xl sm:text-[26px]',
      subtextSize: 'text-[9px] sm:text-[10px]',
      gap: 'gap-3',
      tracking: 'tracking-[0.26em]'
    },
    lg: {
      capSize: 50,
      algoTextSize: 'text-3xl sm:text-4xl',
      subtextSize: 'text-[11px] sm:text-[12px]',
      gap: 'gap-3.5 sm:gap-4',
      tracking: 'tracking-[0.28em]'
    },
    xl: {
      capSize: 64,
      algoTextSize: 'text-4xl sm:text-5xl',
      subtextSize: 'text-xs sm:text-sm',
      gap: 'gap-4 sm:gap-5',
      tracking: 'tracking-[0.30em]'
    }
  }[size];

  if (variant === 'icon') {
    return (
      <div
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
      >
        <AlgoLearnCapIcon isDark={isDark} size={dimensions.capSize} />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${dimensions.gap} select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      role="banner"
      aria-label="AlgoLearn - YOUR DSA JOURNEY"
    >
      {/* 3D Isometric Graduation Cap Icon */}
      <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <AlgoLearnCapIcon isDark={isDark} size={dimensions.capSize} />
      </div>

      {/* Typography: "AlgoLearn" + "YOUR DSA JOURNEY" */}
      <div className="flex flex-col justify-center leading-none">
        <div
          className={`font-black tracking-tight leading-none flex items-baseline font-sans ${dimensions.algoTextSize}`}
        >
          {/* "Algo": Dark navy #0B1226 in Light Mode, Crisp White #FFFFFF in Dark Mode */}
          <span
            className={`transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-[#0B132A]'
            }`}
          >
            Algo
          </span>

          {/* "Learn": Blue-to-purple gradient from #0066FF through #2563EB to #7C3AED */}
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] via-[#2563EB] to-[#7C3AED] font-black"
            style={{
              backgroundImage: 'linear-gradient(90deg, #0066FF 0%, #1E6BFF 25%, #3B82F6 50%, #6366F1 75%, #7C3AED 100%)'
            }}
          >
            Learn
          </span>
        </div>

        {/* Subtitle: "YOUR DSA JOURNEY" */}
        {variant === 'full' && (
          <div
            className={`uppercase font-bold ${dimensions.subtextSize} ${dimensions.tracking} mt-1.5 transition-colors duration-200 ${
              isDark ? 'text-[#8E9EB5]' : 'text-[#4A5568]'
            }`}
          >
            YOUR DSA JOURNEY
          </div>
        )}
      </div>
    </div>
  );
};
