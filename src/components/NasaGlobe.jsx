import { useRef, useState, useCallback, useEffect } from 'react';
import './NasaGlobe.css';

// Default position: approximate Strait of Hormuz on the initial globe view
const DEFAULT_POS = { x: 58, y: 44 }; // percentages

const NasaGlobe = () => {
  const containerRef = useRef(null);
  const [markerPos, setMarkerPos] = useState(DEFAULT_POS);
  const [isDragging, setIsDragging] = useState(false);
  const [hasBeenMoved, setHasBeenMoved] = useState(false);
  const dragStartRef = useRef(null);

  // Convert mouse/touch event coords into % relative to container
  const toPercent = useCallback((clientX, clientY) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
    return { x, y };
  }, []);

  // ── Mouse ──────────────────────────────────────────────
  const onMouseDown = useCallback((e) => {
    // Only start drag if clicking near the pin (within 30px)
    const rect = containerRef.current.getBoundingClientRect();
    const pinX = (markerPos.x / 100) * rect.width + rect.left;
    const pinY = (markerPos.y / 100) * rect.height + rect.top;
    const dist = Math.hypot(e.clientX - pinX, e.clientY - pinY);

    if (dist <= 30) {
      e.preventDefault();
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  }, [markerPos]);

  const onMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const pos = toPercent(e.clientX, e.clientY);
    setMarkerPos(pos);
    setHasBeenMoved(true);
  }, [isDragging, toPercent]);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ── Touch ──────────────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const pinX = (markerPos.x / 100) * rect.width + rect.left;
    const pinY = (markerPos.y / 100) * rect.height + rect.top;
    const dist = Math.hypot(touch.clientX - pinX, touch.clientY - pinY);

    if (dist <= 40) {
      e.preventDefault();
      setIsDragging(true);
    }
  }, [markerPos]);

  const onTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const pos = toPercent(touch.clientX, touch.clientY);
    setMarkerPos(pos);
    setHasBeenMoved(true);
  }, [isDragging, toPercent]);

  const onTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse up so drag ends even if cursor leaves container
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  return (
    <div className="nasa-globe-container" ref={containerRef}>
      {/* NASA Globe iframe */}
      <iframe
        src="https://solarsystem.nasa.gov/gltf_embed/2393/"
        title="NASA Earth Globe"
        className="nasa-globe-iframe"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        // pointer-events are handled by the overlay when not dragging
        style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
      />

      {/* Transparent drag-capture overlay — only active near the pin via JS */}
      <div
        className={`globe-drag-overlay ${isDragging ? 'dragging' : ''}`}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {/* Draggable Marker */}
      <div
        className={`hormuz-marker-overlay ${isDragging ? 'is-dragging' : ''}`}
        style={{ left: `${markerPos.x}%`, top: `${markerPos.y}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Drag hint ring — shown until marker is moved */}
        {!hasBeenMoved && (
          <div className="drag-hint">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
            </svg>
          </div>
        )}

        {/* Pulsing glow */}
        <div className="marker-pulse" />

        {/* Pin body */}
        <div className="marker-pin">
          <div className="pin-dot" />
        </div>

        {/* Tooltip label above pin */}
        <div className="marker-tooltip">
          {hasBeenMoved ? 'Custom location' : 'Strait of Hormuz'}
          {!hasBeenMoved && <span className="drag-hint-text">drag to reposition</span>}
        </div>
      </div>

      {/* Reset button — appears after marker is moved */}
      {hasBeenMoved && (
        <button
          className="reset-marker-btn"
          onClick={() => { setMarkerPos(DEFAULT_POS); setHasBeenMoved(false); }}
        >
          Reset to Hormuz
        </button>
      )}
    </div>
  );
};

export default NasaGlobe;
