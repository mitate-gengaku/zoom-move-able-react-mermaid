"use client"

import { Manual } from "@/app/_components/manual";
import { Toolbar } from "@/app/_components/toolbar";
import { ZoomMeter } from "@/app/_components/zoom-meter";
import mermaid from "mermaid";
import React, { useCallback, useState } from "react";

export const Mermaid = ({ code }: { code: string }) => {
  const id = React.useId();
  const outputRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState({ x: 0, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const applyTransform = useCallback(() => {
    if (svgRef.current) {
      svgRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${zoom})`;
    }
  }, [position.x, position.y, zoom]);

  const render = React.useCallback(async () => {
    if (outputRef.current && code) {
      try {
        const { svg } = await mermaid.render(id, code);
        outputRef.current.innerHTML = svg;

        const svgElement = outputRef.current.querySelector("svg");
        if (svgElement) {
          svgRef.current = svgElement;
          svgElement.style.transition = isDragging ? "none" : "transform 0.2s ease";
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        outputRef.current.innerHTML = "Invalid syntax";
      }
    }
  }, [code, id]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 5))

  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.1))

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const delta = e.deltaY > 0 ? 0.9 : 1.1

    setZoom((prev) => Math.max(0.1, Math.min(5, prev * delta)))
  }

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });

      if (svgRef.current) {
        svgRef.current.style.transition = "none";
      }
    },
    [position.x, position.y],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        requestAnimationFrame(() => {
          setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
          });
        });
      }
    },
    [isDragging, dragStart.x, dragStart.y],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    if (svgRef.current) {
      svgRef.current.style.transition = "transform 0.2s ease";
    }
  }, []);

  React.useEffect(() => {
    render();
  }, [render]);

  React.useEffect(() => {
    applyTransform();
  }, [position, zoom, applyTransform]);

  return code ? (
    <div className="relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden bg-white font-geist-sans">
      <Toolbar
        zoomIn={handleZoomIn}
        zoomOut={handleZoomOut}
        reset={handleReset}
      />
      <ZoomMeter zoom={zoom} />
      <div
        className="w-full h-full overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        <div ref={outputRef} className="w-full h-full" />
      </div>
      <Manual />
    </div>
  ) : null;
};