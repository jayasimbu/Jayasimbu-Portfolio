'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const WORKFLOW_NODES = [
  { id: 'webhook', label: 'Webhook\nTrigger', type: 'trigger', x: 60, y: 80 },
  { id: 'validate', label: 'Validate\nInput', type: 'process', x: 200, y: 50 },
  { id: 'ai-parse', label: 'AI\nParsing', type: 'ai', x: 200, y: 140 },
  { id: 'transform', label: 'Data\nTransform', type: 'process', x: 340, y: 80 },
  { id: 'api-call', label: 'API\nCall', type: 'output', x: 480, y: 50 },
  { id: 'database', label: 'Store\nResult', type: 'output', x: 480, y: 140 },
  { id: 'notify', label: 'Send\nNotify', type: 'output', x: 620, y: 80 },
];

const CONNECTIONS = [
  { from: 'webhook', to: 'validate' },
  { from: 'webhook', to: 'ai-parse' },
  { from: 'validate', to: 'transform' },
  { from: 'ai-parse', to: 'transform' },
  { from: 'transform', to: 'api-call' },
  { from: 'transform', to: 'database' },
  { from: 'api-call', to: 'notify' },
  { from: 'database', to: 'notify' },
];

function WorkflowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 700;
    const h = 220;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    let frame: number;
    let time = 0;

    const typeColors: Record<string, string> = {
      trigger: '#FFB800',
      process: '#00F0FF',
      ai: '#B980F0',
      output: '#00FF88',
    };

    const draw = () => {
      /* Slowed down: 0.008 instead of 0.015 */
      time += 0.008;
      ctx.clearRect(0, 0, w, h);

      // Draw connections — fainter (0.06 opacity base)
      CONNECTIONS.forEach((conn, ci) => {
        const fromNode = WORKFLOW_NODES.find((n) => n.id === conn.from)!;
        const toNode = WORKFLOW_NODES.find((n) => n.id === conn.to)!;

        // Curved line
        const midX = (fromNode.x + toNode.x) / 2;
        ctx.beginPath();
        ctx.moveTo(fromNode.x + 30, fromNode.y);
        ctx.bezierCurveTo(midX, fromNode.y, midX, toNode.y, toNode.x - 30, toNode.y);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Traveling pulse — reduced size from 3px to 2px
        const t = (time * 0.4 + ci * 0.15) % 1;
        const px =
          Math.pow(1 - t, 3) * (fromNode.x + 30) +
          3 * Math.pow(1 - t, 2) * t * midX +
          3 * (1 - t) * t * t * midX +
          Math.pow(t, 3) * (toNode.x - 30);
        const py =
          Math.pow(1 - t, 3) * fromNode.y +
          3 * Math.pow(1 - t, 2) * t * fromNode.y +
          3 * (1 - t) * t * t * toNode.y +
          Math.pow(t, 3) * toNode.y;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
        ctx.fill();

        // Subtle trail — smaller
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.05)';
        ctx.fill();
      });

      // Draw nodes — reduced glow
      WORKFLOW_NODES.forEach((node) => {
        const color = typeColors[node.type];
        const pulse = Math.sin(time * 2 + WORKFLOW_NODES.indexOf(node)) * 0.1 + 0.9;

        // Node background
        ctx.beginPath();
        ctx.roundRect(node.x - 30, node.y - 22, 60, 44, 8);
        ctx.fillStyle = 'rgba(10, 10, 30, 0.8)';
        ctx.fill();
        ctx.strokeStyle = color + Math.floor(pulse * 50).toString(16).padStart(2, '0');
        ctx.lineWidth = 1;
        ctx.stroke();

        // Minimal glow — greatly reduced
        ctx.shadowColor = color;
        ctx.shadowBlur = 2;
        ctx.beginPath();
        ctx.roundRect(node.x - 30, node.y - 22, 60, 44, 8);
        ctx.strokeStyle = color + '15';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label
        const lines = node.label.split('\n');
        ctx.font = '9px JetBrains Mono';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        lines.forEach((line, li) => {
          ctx.fillText(line, node.x, node.y - 4 + li * 12);
        });

        // Active indicator — static, no pulse modulation
        ctx.beginPath();
        ctx.arc(node.x + 24, node.y - 16, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color + '80';
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '220px' }}
      className="rounded-lg"
    />
  );
}

const PIPELINES = [
  { name: 'Invoice Processing Pipeline', status: 'ACTIVE', nodes: 7, executions: 1247, color: '#00FF88' },
  { name: 'Document Classification Flow', status: 'ACTIVE', nodes: 5, executions: 893, color: '#00F0FF' },
  { name: 'Data Sync Automation', status: 'STANDBY', nodes: 4, executions: 2156, color: '#FFB800' },
  { name: 'Alert Notification System', status: 'ACTIVE', nodes: 3, executions: 4521, color: '#B980F0' },
];

export default function AutomationModule() {
  return (
    <div className="p-2 font-['Inter'] h-full overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-4 pb-3 border-b border-[rgba(0,240,255,0.1)]"
      >
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#FFB800]">⟐ AUTOMATION CONTROL CENTER</span>
          <span className="flex-1 h-px bg-[rgba(255,184,0,0.1)]" />
          <span className="font-['Orbitron'] text-[10px] text-[#00FF88]">
            {/* Static dot — no animate-pulse */}
            <span className="w-1.5 h-1.5 inline-block rounded-full bg-[#00FF88] mr-1" />
            ONLINE
          </span>
        </div>
      </motion.div>

      {/* Workflow Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mb-4 rounded-xl overflow-hidden"
        style={{ background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(255,184,0,0.08)' }}
      >
        <div className="px-3 py-1.5 border-b border-[rgba(255,184,0,0.06)] flex items-center gap-2">
          {/* Static dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a]">WORKFLOW_GRAPH.live</span>
          <span className="ml-auto font-['JetBrains_Mono'] text-[9px] text-[#00FF88]">7 NODES ACTIVE</span>
        </div>
        <WorkflowCanvas />
      </motion.div>

      {/* Pipeline Cards — all at once, no stagger */}
      <h3 className="font-['JetBrains_Mono'] text-xs text-[#8080A0] mb-2 tracking-widest uppercase flex items-center gap-2">
        <span className="w-4 h-px bg-[#FFB800] opacity-50" />
        ACTIVE PIPELINES
        <span className="flex-1 h-px bg-[rgba(255,184,0,0.1)]" />
      </h3>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-2 mb-4"
      >
        {PIPELINES.map((pipeline) => (
          <div
            key={pipeline.name}
            className="rounded-lg p-3"
            style={{ background: 'rgba(10,10,30,0.4)', border: '1px solid rgba(0,240,255,0.06)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#E0E0FF]">{pipeline.name}</span>
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-['JetBrains_Mono']"
                style={{
                  color: pipeline.color,
                  background: `${pipeline.color}12`,
                  border: `1px solid ${pipeline.color}30`,
                }}
              >
                {pipeline.status}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a]">NODES:</span>
                <span className="font-['Orbitron'] text-[11px]" style={{ color: pipeline.color }}>
                  {pipeline.nodes}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a]">EXECUTIONS:</span>
                <span className="font-['Orbitron'] text-[11px]" style={{ color: pipeline.color }}>
                  {pipeline.executions.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* System Metrics — clean colored text only, no color-specific glows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="grid grid-cols-3 gap-2"
      >
        {[
          { label: 'UPTIME', value: '99.97%', color: '#00FF88' },
          { label: 'AVG LATENCY', value: '23ms', color: '#00F0FF' },
          { label: 'SUCCESS RATE', value: '99.8%', color: '#B980F0' },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg p-2 text-center"
            style={{ background: 'rgba(10,10,30,0.3)', border: '1px solid rgba(0,240,255,0.06)' }}
          >
            <div className="font-['Orbitron'] text-sm font-bold mb-0.5" style={{ color: metric.color }}>
              {metric.value}
            </div>
            <div className="font-['JetBrains_Mono'] text-[9px] text-[#4a4a6a]">{metric.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
