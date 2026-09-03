import React from 'react';

export interface VisualNode {
  id: number | string;
  value: number | string;
  x: number;
  y: number;
  isRoot?: boolean;
  isLeaf?: boolean;
  isInternal?: boolean;
  level?: number;
  highlight?: boolean;
  highlightColor?: string; // 'violet' | 'purple' | 'amber' | 'emerald' | 'rose'
  subLabel?: string;
  tag?: string;
}

export interface VisualEdge {
  fromId: number | string;
  toId: number | string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  highlight?: boolean;
  highlightColor?: string;
  label?: string;
}

interface TreeSvgProps {
  nodes: VisualNode[];
  edges: VisualEdge[];
  width?: number;
  height?: number;
  viewBox?: string;
  activeNodeId?: number | string | null;
  visitedNodeIds?: (number | string)[];
  currentEdge?: { from: number | string; to: number | string } | null;
  onNodeClick?: (node: VisualNode) => void;
  isDarkMode?: boolean;
  levelLines?: { y: number; label: string; depth: number; height: number }[];
  subtreeBox?: { x: number; y: number; width: number; height: number; label: string };
  pathNodeIds?: (number | string)[];
}

export const TreeSvg: React.FC<TreeSvgProps> = ({
  nodes,
  edges,
  width = 650,
  height = 360,
  viewBox = "0 0 650 360",
  activeNodeId,
  visitedNodeIds = [],
  onNodeClick,
  isDarkMode = false,
  levelLines,
  subtreeBox,
  pathNodeIds = []
}) => {
  const getNodeColor = (node: VisualNode) => {
    const isActive = activeNodeId === node.id;
    const isVisited = visitedNodeIds.includes(node.id);
    const isPath = pathNodeIds.includes(node.id);

    if (isActive) {
      return {
        fill: isDarkMode ? '#8b5cf6' : '#7c3aed',
        stroke: isDarkMode ? '#d8b4fe' : '#5b21b6',
        text: '#ffffff',
        shadow: 'rgba(139, 92, 246, 0.6)'
      };
    }

    if (node.highlight) {
      if (node.highlightColor === 'emerald') {
        return {
          fill: isDarkMode ? '#059669' : '#10b981',
          stroke: isDarkMode ? '#6ee7b7' : '#047857',
          text: '#ffffff',
          shadow: 'rgba(16, 185, 129, 0.5)'
        };
      }
      if (node.highlightColor === 'amber') {
        return {
          fill: isDarkMode ? '#d97706' : '#f59e0b',
          stroke: isDarkMode ? '#fde68a' : '#b45309',
          text: '#ffffff',
          shadow: 'rgba(245, 158, 11, 0.5)'
        };
      }
      if (node.highlightColor === 'rose') {
        return {
          fill: isDarkMode ? '#e11d48' : '#f43f5e',
          stroke: isDarkMode ? '#fecdd3' : '#be123c',
          text: '#ffffff',
          shadow: 'rgba(244, 63, 94, 0.5)'
        };
      }
      return {
        fill: isDarkMode ? '#7c3aed' : '#8b5cf6',
        stroke: isDarkMode ? '#c084fc' : '#6d28d9',
        text: '#ffffff',
        shadow: 'rgba(124, 58, 237, 0.5)'
      };
    }

    if (isPath) {
      return {
        fill: isDarkMode ? '#6d28d9' : '#a78bfa',
        stroke: isDarkMode ? '#c084fc' : '#7c3aed',
        text: '#ffffff',
        shadow: 'rgba(167, 139, 250, 0.5)'
      };
    }

    if (isVisited) {
      return {
        fill: isDarkMode ? '#2e1065' : '#ede9fe',
        stroke: isDarkMode ? '#a855f7' : '#8b5cf6',
        text: isDarkMode ? '#e9d5ff' : '#5b21b6',
        shadow: 'rgba(139, 92, 246, 0.25)'
      };
    }

    return {
      fill: isDarkMode ? '#1e1633' : '#ffffff',
      stroke: isDarkMode ? '#4c1d95' : '#cbd5e1',
      text: isDarkMode ? '#f3e8ff' : '#1e293b',
      shadow: 'none'
    };
  };

  return (
    <div className="w-full overflow-x-auto flex justify-center py-2">
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        className="max-w-full h-auto select-none"
      >
        <defs>
          <filter id="glow-active" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.8" />
          </filter>
          <filter id="node-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity={isDarkMode ? 0.4 : 0.1} />
          </filter>
          <linearGradient id="edge-active-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Level Guides / Depth lines */}
        {levelLines && levelLines.map((line, idx) => (
          <g key={`level-${idx}`} opacity={0.6}>
            <line
              x1={20}
              y1={line.y}
              x2={width - 20}
              y2={line.y}
              stroke={isDarkMode ? '#4c1d95' : '#e2e8f0'}
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />
            <rect
              x={22}
              y={line.y - 12}
              width={145}
              height={20}
              rx={4}
              fill={isDarkMode ? '#181229' : '#f1f5f9'}
              stroke={isDarkMode ? '#4c1d95' : '#cbd5e1'}
              strokeWidth="1"
            />
            <text
              x={28}
              y={line.y + 2}
              fontSize="11"
              fontWeight="600"
              fill={isDarkMode ? '#c084fc' : '#64748b'}
            >
              {line.label} (Depth: {line.depth}, H: {line.height})
            </text>
          </g>
        ))}

        {/* Subtree boundary box */}
        {subtreeBox && (
          <g>
            <rect
              x={subtreeBox.x}
              y={subtreeBox.y}
              width={subtreeBox.width}
              height={subtreeBox.height}
              rx={12}
              fill={isDarkMode ? 'rgba(124, 58, 237, 0.12)' : 'rgba(139, 92, 246, 0.08)'}
              stroke={isDarkMode ? '#8b5cf6' : '#7c3aed'}
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <rect
              x={subtreeBox.x + 8}
              y={subtreeBox.y + 6}
              width={110}
              height={20}
              rx={4}
              fill={isDarkMode ? '#6d28d9' : '#7c3aed'}
            />
            <text
              x={subtreeBox.x + 14}
              y={subtreeBox.y + 20}
              fontSize="11"
              fontWeight="700"
              fill="#ffffff"
            >
              {subtreeBox.label}
            </text>
          </g>
        )}

        {/* Render Edges */}
        {edges.map((edge, idx) => {
          const isEdgeHighlighted = edge.highlight;
          const isPathEdge = pathNodeIds.length > 1 && 
            pathNodeIds.includes(edge.fromId) && 
            pathNodeIds.includes(edge.toId);
          
          let strokeColor = isDarkMode ? '#4c1d95' : '#cbd5e1';
          let strokeW = 2.5;

          if (isEdgeHighlighted || isPathEdge) {
            strokeColor = isDarkMode ? '#a855f7' : '#7c3aed';
            strokeW = 3.5;
          }

          return (
            <g key={`edge-${idx}`}>
              <line
                x1={edge.fromX}
                y1={edge.fromY}
                x2={edge.toX}
                y2={edge.toY}
                stroke={strokeColor}
                strokeWidth={strokeW}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              {edge.label && (
                <g>
                  <circle
                    cx={(edge.fromX + edge.toX) / 2}
                    cy={(edge.fromY + edge.toY) / 2}
                    r={10}
                    fill={isDarkMode ? '#2e1065' : '#f3e8ff'}
                    stroke={isDarkMode ? '#7c3aed' : '#c084fc'}
                    strokeWidth="1.5"
                  />
                  <text
                    x={(edge.fromX + edge.toX) / 2}
                    y={(edge.fromY + edge.toY) / 2 + 3.5}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill={isDarkMode ? '#d8b4fe' : '#6b21a8'}
                  >
                    {edge.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Render Nodes */}
        {nodes.map((node) => {
          const colors = getNodeColor(node);
          const isActive = activeNodeId === node.id;

          return (
            <g
              key={`node-${node.id}`}
              onClick={() => onNodeClick && onNodeClick(node)}
              className={onNodeClick ? 'cursor-pointer' : ''}
              filter={isActive ? 'url(#glow-active)' : 'url(#node-shadow)'}
            >
              {/* Outer pulsing ring for active node */}
              {isActive && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={28}
                  fill="none"
                  stroke={isDarkMode ? '#c084fc' : '#7c3aed'}
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  className="animate-spin"
                  style={{ animationDuration: '4s' }}
                />
              )}

              {/* Main Node Circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={22}
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={isActive || node.highlight ? 3 : 2}
                className="transition-all duration-300"
              />

              {/* Node Value */}
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={colors.text}
                className="font-mono select-none"
              >
                {node.value}
              </text>

              {/* Sub-label (e.g. Root, Leaf, Depth, Degree) */}
              {node.subLabel && (
                <g>
                  <rect
                    x={node.x - 30}
                    y={node.y + 26}
                    width={60}
                    height={16}
                    rx={3}
                    fill={isDarkMode ? '#24143d' : '#f8fafc'}
                    stroke={isDarkMode ? '#6d28d9' : '#cbd5e1'}
                    strokeWidth="1"
                  />
                  <text
                    x={node.x}
                    y={node.y + 38}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill={isDarkMode ? '#d8b4fe' : '#475569'}
                  >
                    {node.subLabel}
                  </text>
                </g>
              )}

              {/* Tag bubble (e.g. "Succ", "Del", "Min") */}
              {node.tag && (
                <g>
                  <rect
                    x={node.x + 12}
                    y={node.y - 24}
                    width={38}
                    height={16}
                    rx={4}
                    fill={isDarkMode ? '#7c3aed' : '#6d28d9'}
                  />
                  <text
                    x={node.x + 31}
                    y={node.y - 12}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill="#ffffff"
                  >
                    {node.tag}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
