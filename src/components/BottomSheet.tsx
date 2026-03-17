import { useState, useRef, useCallback, type ReactNode } from "react";

interface BottomSheetProps {
  children: ReactNode;
  minHeight?: number;
  midHeight?: number;
}

const BottomSheet = ({ children, minHeight = 120, midHeight = 380 }: BottomSheetProps) => {
  const [height, setHeight] = useState(midHeight);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startH = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    startY.current = e.clientY;
    startH.current = height;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [height]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const maxH = window.innerHeight * 0.85;
    const delta = startY.current - e.clientY;
    const newH = Math.max(minHeight, Math.min(maxH, startH.current + delta));
    setHeight(newH);
  }, [minHeight]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    // Snap to nearest position
    const maxH = window.innerHeight * 0.85;
    const positions = [minHeight, midHeight, maxH];
    const closest = positions.reduce((prev, curr) =>
      Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev
    );
    setHeight(closest);
  }, [height, minHeight, midHeight]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20 bg-background rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-border transition-[height] duration-200 ease-out flex flex-col"
      style={{ height }}
    >
      <div
        className="flex-shrink-0 cursor-grab active:cursor-grabbing touch-none select-none py-1"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="drag-handle" />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
