import React, { useRef, useState, useCallback, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * A wrapper component that attracts its children toward the mouse cursor.
 * Creates a premium, tactile interaction effect.
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  strength = 0.35,
  className = "" 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const memberRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!memberRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = memberRef.current.getBoundingClientRect();

    // Center point of the magnetic element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Distance from mouse to center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Threshold for activation (only attract if mouse is close enough)
    // Using a circular radius proportional to the element size
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const radius = Math.max(width, height) * 1.5;

    if (distance < radius) {
      // Apply movement proportional to distance and strength
      // The closer it is, the more it moves
      const x = deltaX * strength;
      const y = deltaY * strength;
      setPosition({ x, y });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={memberRef}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-button-wrapper ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 
          ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' 
          : 'transform 0.1s linear',
        display: 'inline-block',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
