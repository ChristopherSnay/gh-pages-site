import CloseIcon from '@mui/icons-material/CloseSharp';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import useImages from '../hooks/useImages';
import type { ImageContentBlockData } from '../models/ImageContentBlockData';

export default function ZoomableImageDialog(props: Readonly<ZoomableImageDialogProps>) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [touchState, setTouchState] = useState<{
    lastX?: number;
    lastY?: number;
    lastDistance?: number;
    isTouching?: boolean;
    isPinching?: boolean;
  } | null>(null);
  const dialogContentRef = useRef<any>(null);
  const { localImage } = useImages();

  const zoomIn = (factor: number = 1, mult: number = 0.25): void => {
    setZoomLevel((prev) => Math.min(prev + prev * factor * mult, 100));
  };

  const zoomOut = (factor: number = 1, mult: number = 0.25): void => {
    setZoomLevel((prev) => Math.max(prev - prev * factor * mult, 1));
  };

  const handleResetClicked = (): void => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Use window listeners for drag events
  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      // Divide by zoomLevel so panning matches cursor visually
      const dx = (e.clientX - start.x) / zoomLevel;
      const dy = (e.clientY - start.y) / zoomLevel;
      setStart({ x: e.clientX, y: e.clientY });
      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));
    };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, start.x, start.y, zoomLevel]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault(); // Prevent default drag/select behavior
    setIsDragging(true);
    setStart({ x: e.clientX, y: e.clientY });
  };

  const handleWheel = (e: React.WheelEvent): void => {
    if (e.deltaY > 0) {
      zoomOut(0.25, 0.25);
    } else {
      zoomIn(0.25, 0.25);
    }
  };

  const handleTouchStart = (e: React.TouchEvent): void => {
    if (e.touches.length === 1) {
      setTouchState({
        lastX: e.touches[0].clientX,
        lastY: e.touches[0].clientY,
        isTouching: true,
        isPinching: false
      });
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      setTouchState({
        lastDistance: distance,
        isTouching: false,
        isPinching: true
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    if (!touchState) return;
    if (touchState.isTouching && e.touches.length === 1) {
      const dx = (e.touches[0].clientX - (touchState.lastX ?? 0)) / zoomLevel;
      const dy = (e.touches[0].clientY - (touchState.lastY ?? 0)) / zoomLevel;
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setTouchState({
        ...touchState,
        lastX: e.touches[0].clientX,
        lastY: e.touches[0].clientY
      });
    } else if (touchState.isPinching && e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (touchState.lastDistance) {
        const delta = distance - touchState.lastDistance;
        // Pinch sensitivity factor
        const factor = delta / 200;
        setZoomLevel((prev) => Math.max(1, Math.min(prev + prev * factor, 100)));
      }
      setTouchState({ ...touchState, lastDistance: distance });
    }
  };

  const handleTouchEnd = (_e: React.TouchEvent): void => {
    setTouchState(null);
  };

  useEffect(() => {
    if (dialogContentRef.current) {
      dialogContentRef.current.style.overflow = 'hidden';
    }
  }, [dialogContentRef.current]);

  // Prevent browser pinch-zoom on the dialog content as well
  useEffect(() => {
    const el = dialogContentRef.current;
    if (!el) return;
    const preventPinch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    el.addEventListener('touchmove', preventPinch, { passive: false });
    return () => {
      el.removeEventListener('touchmove', preventPinch);
    };
  }, [dialogContentRef]);

  return (
    <Dialog
      open={!!props.isOpen}
      onClose={() => props.onClose && props.onClose()}
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle className="ps-3 pe-1 pt-1 pb-0 d-flex justify-content-between align-items-center">
        <span>{props.imageDetails.caption}</span>
        <IconButton
          onClick={() => props.onClose && props.onClose()}
          size="large"
          color="primary"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* floating controls */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          display: 'flex',
          gap: '8px',
          zIndex: 1
        }}
      >
        <IconButton
          onClick={handleResetClicked}
          size="large"
          className="text-white semi-transparent"
        >
          <RestartAltIcon />
        </IconButton>
        <IconButton
          onClick={(_) => zoomOut()}
          size="large"
          className="text-white semi-transparent"
        >
          <ZoomOutIcon />
        </IconButton>
        <IconButton
          onClick={(_) => zoomIn()}
          size="large"
          className="text-white semi-transparent"
        >
          <ZoomInIcon />
        </IconButton>
      </div>
      {props.imageDetails && (
        <DialogContent
          ref={dialogContentRef}
          style={{
            position: 'relative',
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 0
          }}
        >
          <img
            src={localImage(props.imageDetails.url)}
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease',
              cursor: zoomLevel > 1 ? 'grab' : 'default',
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              margin: 'auto',
              overflow: 'hidden',
              scrollBehavior: 'smooth'
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onDragStart={(e) => e.preventDefault()}
            onTouchStart={(e) => {
              if (e.touches.length > 1) e.preventDefault();
              handleTouchStart(e);
            }}
            onTouchMove={(e) => {
              if (e.touches.length > 1) e.preventDefault();
              handleTouchMove(e);
            }}
            onTouchEnd={handleTouchEnd}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}

export interface ZoomableImageDialogProps {
  imageDetails: ImageContentBlockData;
  onClose?: () => void;
  isOpen?: boolean;
}
