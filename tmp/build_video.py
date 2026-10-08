import os
import subprocess
import shutil

slides = [
    # Slide 1: Welcome & Intro
    """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a0e1a"/>
          <stop offset="50%" stopColor="#0f172a"/>
          <stop offset="100%" stopColor="#1e1b4b"/>
        </linearGradient>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8"/>
          <stop offset="50%" stopColor="#818cf8"/>
          <stop offset="100%" stopColor="#c084fc"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="640" cy="230" r="70" fill="#312e81" stroke="#818cf8" stroke-width="4"/>
      <text x="640" y="248" font-family="DejaVu Sans, sans-serif" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">50</text>
      
      <!-- Children -->
      <line x1="600" y1="280" x2="480" y2="380" stroke="#818cf8" stroke-width="4"/>
      <line x1="680" y1="280" x2="800" y2="380" stroke="#818cf8" stroke-width="4"/>
      
      <circle cx="480" cy="400" r="50" fill="#1e1b4b" stroke="#38bdf8" stroke-width="3"/>
      <text x="480" y="415" font-family="DejaVu Sans, sans-serif" font-size="36" font-weight="bold" fill="#ffffff" text-anchor="middle">25</text>
      
      <circle cx="800" cy="400" r="50" fill="#1e1b4b" stroke="#c084fc" stroke-width="3"/>
      <text x="800" y="415" font-family="DejaVu Sans, sans-serif" font-size="36" font-weight="bold" fill="#ffffff" text-anchor="middle">75</text>
      
      <rect x="340" y="520" width="600" height="60" rx="30" fill="url(#grad)" opacity="0.15"/>
      <text x="640" y="560" font-family="DejaVu Sans, sans-serif" font-size="34" font-weight="bold" fill="url(#grad)" text-anchor="middle">AlgoLearn • Visual Lesson</text>
      <text x="640" y="620" font-family="DejaVu Sans, sans-serif" font-size="44" font-weight="800" fill="#ffffff" text-anchor="middle">Tree Data Structures &amp; BST</text>
      <text x="640" y="660" font-family="DejaVu Sans, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Core Concepts, Hierarchical Anatomy &amp; Algorithmic Traversals</text>
    </svg>""",

    # Slide 2: Tree Terminology & Anatomy
    """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
      <rect width="100%" height="100%" fill="#0a0e1a"/>
      <!-- Header -->
      <text x="80" y="80" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#818cf8" letter-spacing="2">CHAPTER 1: TREE ANATOMY</text>
      <text x="80" y="125" font-family="DejaVu Sans, sans-serif" font-size="38" font-weight="bold" fill="#ffffff">Root, Branches, Leaves &amp; Levels</text>

      <!-- Connections -->
      <line x1="640" y1="210" x2="440" y2="320" stroke="#475569" stroke-width="3"/>
      <line x1="640" y1="210" x2="840" y2="320" stroke="#475569" stroke-width="3"/>
      <line x1="440" y1="360" x2="340" y2="470" stroke="#475569" stroke-width="3"/>
      <line x1="440" y1="360" x2="540" y2="470" stroke="#475569" stroke-width="3"/>
      <line x1="840" y1="360" x2="740" y2="470" stroke="#475569" stroke-width="3"/>
      <line x1="840" y1="360" x2="940" y2="470" stroke="#475569" stroke-width="3"/>

      <!-- Nodes -->
      <circle cx="640" cy="200" r="45" fill="#4338ca" stroke="#a5b4fc" stroke-width="4"/>
      <text x="640" y="212" font-family="DejaVu Sans, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">50</text>
      <rect x="710" y="180" width="120" height="36" rx="18" fill="#1e293b" stroke="#818cf8"/>
      <text x="770" y="204" font-family="DejaVu Sans, sans-serif" font-size="16" font-weight="bold" fill="#a5b4fc" text-anchor="middle">ROOT (Level 0)</text>

      <circle cx="440" cy="340" r="38" fill="#1e293b" stroke="#38bdf8" stroke-width="3"/>
      <text x="440" y="350" font-family="DejaVu Sans, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">25</text>

      <circle cx="840" cy="340" r="38" fill="#1e293b" stroke="#38bdf8" stroke-width="3"/>
      <text x="840" y="350" font-family="DejaVu Sans, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">75</text>

      <circle cx="340" cy="490" r="32" fill="#0f766e" stroke="#2dd4bf" stroke-width="3"/>
      <text x="340" y="498" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">10</text>

      <circle cx="540" cy="490" r="32" fill="#0f766e" stroke="#2dd4bf" stroke-width="3"/>
      <text x="540" y="498" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">35</text>

      <circle cx="740" cy="490" r="32" fill="#0f766e" stroke="#2dd4bf" stroke-width="3"/>
      <text x="740" y="498" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">60</text>

      <circle cx="940" cy="490" r="32" fill="#0f766e" stroke="#2dd4bf" stroke-width="3"/>
      <text x="940" y="498" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">90</text>

      <!-- Legend -->
      <rect x="80" y="580" width="1120" height="90" rx="16" fill="#111827" stroke="#1f2937"/>
      <text x="120" y="620" font-family="DejaVu Sans, sans-serif" font-size="18" font-weight="bold" fill="#2dd4bf">● LEAF NODES (Green): Nodes with 0 children</text>
      <text x="120" y="648" font-family="DejaVu Sans, sans-serif" font-size="16" fill="#94a3b8">Height = Longest path from root to leaf (2)  •  Depth of Root = 0  •  Degree of 50 = 2</text>
    </svg>""",

    # Slide 3: Binary Search Tree Property
    """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
      <rect width="100%" height="100%" fill="#0a0e1a"/>
      <text x="80" y="80" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#38bdf8" letter-spacing="2">CHAPTER 2: BINARY SEARCH TREE RULE</text>
      <text x="80" y="125" font-family="DejaVu Sans, sans-serif" font-size="38" font-weight="bold" fill="#ffffff">Left Subtree &lt; Node &lt; Right Subtree</text>

      <!-- Central Formula Card -->
      <rect x="80" y="170" width="1120" height="90" rx="18" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
      <text x="640" y="225" font-family="DejaVu Sans, sans-serif" font-size="30" font-weight="bold" fill="#a5b4fc" text-anchor="middle">All Left Descendants &lt; ROOT (50) &lt; All Right Descendants</text>

      <!-- Connections -->
      <line x1="640" y1="360" x2="400" y2="450" stroke="#38bdf8" stroke-width="4"/>
      <line x1="640" y1="360" x2="880" y2="450" stroke="#c084fc" stroke-width="4"/>

      <!-- Root -->
      <circle cx="640" cy="350" r="50" fill="#4f46e5" stroke="#ffffff" stroke-width="4"/>
      <text x="640" y="365" font-family="DejaVu Sans, sans-serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle">50</text>

      <!-- Left Subtree Zone -->
      <rect x="240" y="420" width="320" height="180" rx="20" fill="#0369a1" fill-opacity="0.2" stroke="#38bdf8" stroke-dasharray="6,6"/>
      <circle cx="400" cy="490" r="42" fill="#0284c7" stroke="#e0f2fe" stroke-width="3"/>
      <text x="400" y="502" font-family="DejaVu Sans, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">30</text>
      <text x="400" y="565" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#38bdf8" text-anchor="middle">Left &lt; 50 (Valid)</text>

      <!-- Right Subtree Zone -->
      <rect x="720" y="420" width="320" height="180" rx="20" fill="#701a75" fill-opacity="0.2" stroke="#c084fc" stroke-dasharray="6,6"/>
      <circle cx="880" cy="490" r="42" fill="#a21caf" stroke="#fae8ff" stroke-width="3"/>
      <text x="880" y="502" font-family="DejaVu Sans, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">80</text>
      <text x="880" y="565" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#f0abfc" text-anchor="middle">Right &gt; 50 (Valid)</text>

      <text x="640" y="650" font-family="DejaVu Sans, sans-serif" font-size="18" fill="#94a3b8" text-anchor="middle">This strict ordering property allows O(log n) binary search in average cases!</text>
    </svg>""",

    # Slide 4: BST Search & Lookup
    """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
      <rect width="100%" height="100%" fill="#0a0e1a"/>
      <text x="80" y="80" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#eab308" letter-spacing="2">CHAPTER 3: SEARCH ALGORITHM TRACE</text>
      <text x="80" y="125" font-family="DejaVu Sans, sans-serif" font-size="38" font-weight="bold" fill="#ffffff">Searching for Key = 65</text>

      <!-- Steps on Left -->
      <rect x="80" y="170" width="460" height="490" rx="20" fill="#111827" stroke="#374151"/>
      <text x="110" y="220" font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="bold" fill="#eab308">Step-by-Step Traversal:</text>

      <rect x="110" y="250" width="400" height="70" rx="12" fill="#1f2937" stroke="#4f46e5" stroke-width="2"/>
      <text x="130" y="280" font-family="DejaVu Sans, sans-serif" font-size="16" font-weight="bold" fill="#818cf8">1. Compare 65 with Root (50)</text>
      <text x="130" y="305" font-family="DejaVu Sans, sans-serif" font-size="15" fill="#cbd5e1">65 &gt; 50 → Turn RIGHT to node 75</text>

      <rect x="110" y="340" width="400" height="70" rx="12" fill="#1f2937" stroke="#ca8a04" stroke-width="2"/>
      <text x="130" y="370" font-family="DejaVu Sans, sans-serif" font-size="16" font-weight="bold" fill="#facc15">2. Compare 65 with 75</text>
      <text x="130" y="395" font-family="DejaVu Sans, sans-serif" font-size="15" fill="#cbd5e1">65 &lt; 75 → Turn LEFT to node 65</text>

      <rect x="110" y="430" width="400" height="80" rx="12" fill="#064e3b" stroke="#10b981" stroke-width="3"/>
      <text x="130" y="462" font-family="DejaVu Sans, sans-serif" font-size="18" font-weight="bold" fill="#34d399">3. Target Found! 65 == 65</text>
      <text x="130" y="492" font-family="DejaVu Sans, sans-serif" font-size="15" fill="#a7f3d0">Search terminated successfully in 3 checks</text>

      <!-- Tree Diagram on Right -->
      <line x1="880" y1="230" x2="740" y2="330" stroke="#334155" stroke-width="3"/>
      <line x1="880" y1="230" x2="1020" y2="330" stroke="#facc15" stroke-width="6"/> <!-- Highlighted path -->
      <line x1="1020" y1="360" x2="940" y2="470" stroke="#10b981" stroke-width="6"/> <!-- Highlighted path -->
      <line x1="1020" y1="360" x2="1100" y2="470" stroke="#334155" stroke-width="3"/>

      <!-- Root Node 50 -->
      <circle cx="880" cy="220" r="40" fill="#4f46e5" stroke="#ffffff" stroke-width="3"/>
      <text x="880" y="232" font-family="DejaVu Sans, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">50</text>

      <circle cx="740" cy="350" r="35" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
      <text x="740" y="360" font-family="DejaVu Sans, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">25</text>

      <!-- Node 75 Highlighted -->
      <circle cx="1020" cy="350" r="42" fill="#ca8a04" stroke="#fef08a" stroke-width="4"/>
      <text x="1020" y="362" font-family="DejaVu Sans, sans-serif" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">75</text>

      <!-- Target Node 65 MATCH -->
      <circle cx="940" cy="490" r="46" fill="#059669" stroke="#6ee7b7" stroke-width="5"/>
      <text x="940" y="503" font-family="DejaVu Sans, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">65</text>
      <text x="940" y="570" font-family="DejaVu Sans, sans-serif" font-size="18" font-weight="bold" fill="#34d399" text-anchor="middle">MATCH FOUND</text>

      <circle cx="1100" cy="490" r="35" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
      <text x="1100" y="500" font-family="DejaVu Sans, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">90</text>
    </svg>""",

    # Slide 5: Traversals
    """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
      <rect width="100%" height="100%" fill="#0a0e1a"/>
      <text x="80" y="80" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#a855f7" letter-spacing="2">CHAPTER 4: TREE TRAVERSAL ORDERS</text>
      <text x="80" y="125" font-family="DejaVu Sans, sans-serif" font-size="38" font-weight="bold" fill="#ffffff">In-Order, Pre-Order &amp; Post-Order</text>

      <!-- Card 1: In-Order -->
      <rect x="80" y="170" width="1120" height="130" rx="16" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
      <text x="110" y="210" font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="bold" fill="#818cf8">1. IN-ORDER (Left → Root → Right)</text>
      <text x="110" y="240" font-family="DejaVu Sans, sans-serif" font-size="16" fill="#c7d2fe">Crucial Property: Yields values in strictly SORTED ascending order for any valid BST!</text>
      <text x="110" y="275" font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="bold" fill="#4ade80">[ 10, 25, 35, 50, 60, 75, 90 ]</text>

      <!-- Card 2: Pre-Order -->
      <rect x="80" y="320" width="1120" height="130" rx="16" fill="#0f172a" stroke="#0ea5e9" stroke-width="2"/>
      <text x="110" y="360" font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8">2. PRE-ORDER (Root → Left → Right)</text>
      <text x="110" y="390" font-family="DejaVu Sans, sans-serif" font-size="16" fill="#bae6fd">Usage: Perfect for cloning/copying trees and prefix expressions.</text>
      <text x="110" y="425" font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8">[ 50, 25, 10, 35, 75, 60, 90 ]</text>

      <!-- Card 3: Post-Order -->
      <rect x="80" y="470" width="1120" height="130" rx="16" fill="#1c1917" stroke="#f97316" stroke-width="2"/>
      <text x="110" y="510" font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="bold" fill="#fb923c">3. POST-ORDER (Left → Right → Root)</text>
      <text x="110" y="540" font-family="DejaVu Sans, sans-serif" font-size="16" fill="#fed7aa">Usage: Bottom-up evaluation, deleting trees, calculating subtree sizes.</text>
      <text x="110" y="575" font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="bold" fill="#fb923c">[ 10, 35, 25, 60, 90, 75, 50 ]</text>
    </svg>""",

    # Slide 6: Summary & Congratulations
    """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
      <defs>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#0a0e1a"/>
      <circle cx="640" cy="200" r="70" fill="url(#glow)"/>
      <path d="M610 200 L630 220 L675 175" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>

      <text x="640" y="320" font-family="DejaVu Sans, sans-serif" font-size="44" font-weight="bold" fill="#ffffff" text-anchor="middle">Visual Lesson Completed!</text>
      <text x="640" y="370" font-family="DejaVu Sans, sans-serif" font-size="24" fill="#94a3b8" text-anchor="middle">You have mastered the foundational properties of Tree Data Structures.</text>

      <rect x="240" y="430" width="800" height="150" rx="20" fill="#111827" stroke="#374151"/>
      <text x="280" y="480" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#38bdf8">Key Takeaways:</text>
      <text x="280" y="515" font-family="DejaVu Sans, sans-serif" font-size="16" fill="#cbd5e1">• Trees provide hierarchical O(log n) efficiency for searching and sorting.</text>
      <text x="280" y="545" font-family="DejaVu Sans, sans-serif" font-size="16" fill="#cbd5e1">• Click "Completed" above to register your 20% visual lesson progress!</text>

      <text x="640" y="650" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#a78bfa" text-anchor="middle">AlgoLearn • Interactive Data Structures &amp; Algorithms</text>
    </svg>"""
]

os.makedirs('/tmp/tree_slides', exist_ok=True)
for i, slide in enumerate(slides):
    svg_path = f'/tmp/tree_slides/slide_{i}.svg'
    png_path = f'/tmp/tree_slides/slide_{i}.png'
    with open(svg_path, 'w') as f:
        f.write(slide)
    subprocess.run(['ffmpeg', '-y', '-i', svg_path, png_path], check=True, capture_output=True)

# Generate 8s video clip for each slide (total 48s)
video_segments = []
for i in range(len(slides)):
    seg_path = f'/tmp/tree_slides/seg_{i}.mp4'
    png_path = f'/tmp/tree_slides/slide_{i}.png'
    # loop image for 8 seconds at 25 fps
    cmd = [
        'ffmpeg', '-y',
        '-loop', '1', '-i', png_path,
        '-t', '8',
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
        '-r', '25',
        seg_path
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    video_segments.append(seg_path)

# Concat video segments
concat_file = '/tmp/tree_slides/concat.txt'
with open(concat_file, 'w') as f:
    for seg in video_segments:
        f.write(f"file '{seg}'\n")

concat_video = '/tmp/tree_slides/combined.mp4'
subprocess.run([
    'ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', concat_file,
    '-c', 'copy', concat_video
], check=True, capture_output=True)

# Generate audio (calm gentle educational synth chord progression for 48s)
# 48 seconds total
audio_path = '/tmp/tree_slides/audio.aac'
subprocess.run([
    'ffmpeg', '-y', '-f', 'lavfi',
    '-i', 'sine=frequency=220:sample_rate=44100:duration=48',
    '-af', 'volume=0.03,afade=t=in:ss=0:d=2,afade=t=out:st=46:d=2',
    '-c:a', 'aac', '-b:a', '128k', audio_path
], check=True, capture_output=True)

# Mux combined video with audio into final public video
target_dir = os.path.join(os.getcwd(), 'public', 'videos')
os.makedirs(target_dir, exist_ok=True)
final_mp4 = os.path.join(target_dir, 'lesson.mp4')

subprocess.run([
    'ffmpeg', '-y',
    '-i', concat_video,
    '-i', audio_path,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '128k',
    '-shortest',
    final_mp4
], check=True, capture_output=True)

# Also copy to dist/videos if dist exists
dist_videos = os.path.join(os.getcwd(), 'dist', 'videos')
if os.path.exists(os.path.join(os.getcwd(), 'dist')):
    os.makedirs(dist_videos, exist_ok=True)
    shutil.copyfile(final_mp4, os.path.join(dist_videos, 'lesson.mp4'))

print("Generated successfully! File size:", os.path.getsize(final_mp4))
