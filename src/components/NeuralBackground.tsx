"use client";

import { useEffect, useRef } from "react";

interface NeuralBackgroundProps {
  isThinking: boolean;
  activeNodes?: number;
}

export default function NeuralBackground({ isThinking = false, activeNodes = 5 }: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      pulse: number;
    }> = [];
    let connections: Array<[number, number]> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      connections = [];
      
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          baseRadius: Math.random() * 2 + 1,
          pulse: Math.random() * Math.PI * 2,
        });
      }

      // Create initial connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            connections.push([i, j]);
          }
        }
      }
    };

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, idx) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Pulse effect
        node.pulse += 0.05;
        const pulseScale = isThinking ? 1 + Math.sin(node.pulse) * 0.5 : 1;
        node.radius = node.baseRadius * pulseScale;

        // Determine if this node should be highlighted
        const isActive = isThinking && idx < activeNodes;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        if (isActive) {
          // Active nodes glow cyan
          ctx.fillStyle = `rgba(0, 255, 255, ${0.8 + Math.sin(node.pulse) * 0.2})`;
          ctx.shadowColor = "cyan";
          ctx.shadowBlur = 15;
        } else {
          // Inactive nodes are dim
          ctx.fillStyle = "rgba(100, 150, 200, 0.3)";
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      // Draw connections
      connections.forEach(([i, j]) => {
        const nodeA = nodes[i];
        const nodeB = nodes[j];
        
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.15;
          
          // Check if either node is active (thinking)
          const isConnectedToActive = isThinking && 
            (i < activeNodes || j < activeNodes);
          
          if (isConnectedToActive) {
            // Active connections glow
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 2})`;
            ctx.lineWidth = 1;
            ctx.shadowColor = "cyan";
            ctx.shadowBlur = 5;
          } else {
            ctx.strokeStyle = `rgba(100, 150, 200, ${opacity})`;
            ctx.lineWidth = 0.5;
          }
          
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [isThinking, activeNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: "linear-gradient(180deg, #0a0a14 0%, #0f172a 100%)",
      }}
    />
  );
}
