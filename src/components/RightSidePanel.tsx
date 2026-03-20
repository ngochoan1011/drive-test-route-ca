import { useState, useRef, useCallback, type ReactNode } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface RightSidePanelProps {
  children: ReactNode;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
}

const RightSidePanel = ({ 
  children, 
  minWidth = 320, 
  maxWidth = 600, 
  defaultWidth = 400 
}: RightSidePanelProps) => {
  const [width, setWidth] = useState(defaultWidth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (isCollapsed) return; // don't allow resize if collapsed
    dragging.current = true;
    startX.current = e.clientX;
    startW.current = width;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [width, isCollapsed]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    // ClientX increases to the right. Dragging left means e.clientX is smaller than startX.
    // So delta = startX - e.clientX represents moving left.
    // If we move left, width increases.
    const delta = startX.current - e.clientX;
    const newW = Math.max(minWidth, Math.min(maxWidth, startW.current + delta));
    setWidth(newW);
  }, [minWidth, maxWidth]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  return (
    <div
      className="absolute right-0 top-0 bottom-0 z-20 bg-background shadow-[-4px_0_20px_rgba(0,0,0,0.1)] border-l border-border transition-transform duration-300 ease-in-out flex"
      style={{ 
        width: isCollapsed ? width : width, 
        transform: isCollapsed ? `translateX(100%)` : `translateX(0)`
      }}
    >
      {/* Hide/Show Toggle Button positioned outside sticking left */}
      <button
        onClick={toggleCollapse}
        className="absolute top-1/2 -left-8 -translate-y-1/2 w-8 h-16 bg-background border border-border border-r-0 rounded-l-lg shadow-[-2px_0_8px_rgba(0,0,0,0.05)] flex items-center justify-center hover:bg-accent transition-colors z-30 group"
        aria-label={isCollapsed ? "Show panel" : "Hide panel"}
      >
        {isCollapsed ? (
          <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
        )}
      </button>

      {/* Drag handle (left vertical edge) */}
      {!isCollapsed && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-primary/20 transition-colors z-30"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      )}

      {/* Content wrapper */}
      <div className="flex-1 overflow-y-auto px-4 py-4 h-full">
        {children}
      </div>
    </div>
  );
};

export default RightSidePanel;
