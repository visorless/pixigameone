import React from 'react';

export const useDrag = ({ x, y }) => {
    const sprite = React.useRef();
    const [isDragging, setIsDragging] = React.useState(false);
    const [position, setPosition] = React.useState({ x, y });
    
    const onDown = React.useCallback(() => setIsDragging(true), []);
    const onUp = React.useCallback(() => setIsDragging(false), []);
    const onMove = React.useCallback(e => {
      if (isDragging && sprite.current) {
        setPosition(e.data.getLocalPosition(sprite.current.parent));
      }
    }, [isDragging, setPosition]);
    
    return {
        ref: sprite,
        interactive: true, 
        pointerdown: onDown, 
        pointerup: onUp, 
        pointerupoutside: onUp,
        pointermove: onMove,
        alpha: isDragging ? 0.5 : 1,
        anchor: 0.5,
        position,
    };
  };