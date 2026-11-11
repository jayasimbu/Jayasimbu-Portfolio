'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AI_CONCEPTS } from '@/data/portfolio-data';

function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 320;
    const h = 180;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Neural network layers
    const layers = [3, 5, 6, 4, 2];
    const nodePositions: { x: number; y: number; layer: number }[] = [];

    layers.forEach((count, layerIdx) => {
      const x = 40 + (layerIdx * (w - 80)) / (layers.length - 1);
      for (let i = 0; i < count; i++) {
        const y = (h / (count + 1)) * (i + 1);
        nodePositions.push({ x, y, layer: layerIdx });
      }
    });

    let frame: number;
    let time = 0;

    const draw = () => {
      /* Slowed down: 0.008 instead of 0.02 */
      time += 0.008;
      ctx.clearRect(0, 0, w, h);

      // Draw connections — fainter
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = 0; j < nodePositions.length; j++) {
          if (nodePositions[j].layer === nodePositions[i].layer + 1) {
            const pulse = Math.sin(time * 2 + i * 0.5 + j * 0.3) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
            ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.02 + pulse * 0.04})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Traveling signal — subtler
            if (pulse > 0.85) {
              const t = (time * 0.5 + i * 0.1) % 1;
              const sx = nodePositions[i].x + (nodePositions[j].x - nodePositions[i].x) * t;
              const sy = nodePositions[i].y + (nodePositions[j].y - nodePositions[i].y) * t;
              ctx.beginPath();
              ctx.arc(sx, sy, 1, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes — reduced glow
      nodePositions.forEach((node, i) => {
        const pulse = Math.sin(time * 3 + i * 0.7) * 0.2 + 0.6;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${pulse * 0.35})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(0, 240, 255, ${pulse * 0.5})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Minimal ambient glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${pulse * 0.02})`;
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
      style={{ width: '100%', height: '180px' }}
      className="rounded-lg"
    />
  );
}

function TerminalLog() {
  const [logs, setLogs] = useState<string[]>([]);
  const logMessages = [
    '[INFO] Neural network initialized...',
    '[PROC] Loading VLM weights...',
    '[OK] Model ready — latency: 23ms',
    '[INFO] Processing batch 0x7F3A...',
    '[PROC] Analyzing document structure...',
    '[OK] 12 entities extracted',
    '[INFO] Prompt template compiled',
    '[PROC] Running inference pipeline...',
    '[OK] Output validated — confidence: 97.3%',
    '[INFO] Automation trigger detected',
    '[PROC] Executing workflow node...',
    '[OK] Pipeline complete — 0 errors',
  ];

  useEffect(() => {
    let idx = 0;
    /* Slowed interval to 3000ms */
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, logMessages[idx % logMessages.length]];
        return next.slice(-8);
      });
      idx++;
    }, 3000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="rounded-lg p-3 font-['JetBrains_Mono'] text-[10px] h-[160px] overflow-hidden"
      style={{ background: 'rgba(5,5,16,0.8)', border: '1px solid rgba(0,240,255,0.08)' }}
    >
      <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[rgba(0,240,255,0.06)]">
        {/* Static dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
        <span className="text-[#4a4a6a]">SYSTEM LOG — AI.lab</span>
      </div>
      {/* Simpler fade — opacity only, no x-slide */}
      {logs.map((log, i) => (
        <motion.div
          key={`${i}-${log}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-0.5"
          style={{
            color: log.startsWith('[OK]')
              ? '#00FF88'
              : log.startsWith('[PROC]')
              ? '#B980F0'
              : '#4a4a6a',
          }}
        >
          {log}
        </motion.div>
      ))}
      <span className="typing-cursor" style={{ width: '6px', height: '10px' }} />
    </div>
  );
}

export default function AILabModule() {
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
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#00FF88]">◎ AI LABORATORY</span>
          <span className="flex-1 h-px bg-[rgba(0,255,136,0.1)]" />
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#00FF88]">
            {/* Static dot — no animate-pulse */}
            <span className="w-1.5 h-1.5 inline-block rounded-full bg-[#00FF88] mr-1" />
            ACTIVE
          </span>
        </div>
      </motion.div>

      {/* Neural Network */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mb-4 rounded-xl overflow-hidden"
        style={{ background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(0,240,255,0.05)' }}
      >
        <div className="px-3 py-1.5 border-b border-[rgba(0,240,255,0.06)] flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a]">NEURAL_NETWORK.viz</span>
        </div>
        <NeuralNetworkCanvas />
      </motion.div>

      {/* AI Concept Cards — all at once, single fade, no stagger */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-2 mb-4"
      >
        {AI_CONCEPTS.map((concept) => (
          <div
            key={concept.title}
            className="rounded-lg p-3"
            style={{
              background: 'rgba(10,10,30,0.4)',
              border: '1px solid rgba(0,240,255,0.08)',
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-['JetBrains_Mono'] text-sm text-[#E0E0FF] font-medium">
                {concept.title}
              </h3>
              {/* Status badge — no text-shadow/glow */}
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-['JetBrains_Mono']"
                style={{
                  color:
                    concept.status === 'DEPLOYED'
                      ? '#00FF88'
                      : concept.status === 'ACTIVE'
                      ? '#00F0FF'
                      : '#FFB800',
                  background:
                    concept.status === 'DEPLOYED'
                      ? 'rgba(0,255,136,0.08)'
                      : concept.status === 'ACTIVE'
                      ? 'rgba(0,240,255,0.08)'
                      : 'rgba(255,184,0,0.08)',
                  border: `1px solid ${
                    concept.status === 'DEPLOYED'
                      ? 'rgba(0,255,136,0.2)'
                      : concept.status === 'ACTIVE'
                      ? 'rgba(0,240,255,0.2)'
                      : 'rgba(255,184,0,0.2)'
                  }`,
                }}
              >
                {concept.status}
              </span>
            </div>
            <p className="text-xs text-[#8080A0] leading-relaxed">{concept.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Terminal Log */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <TerminalLog />
      </motion.div>
    </div>
  );
}
