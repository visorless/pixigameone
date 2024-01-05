import { Stage, Container, Graphics, Text } from '@pixi/react';
import React, { useState, useEffect } from 'react';
import DraggableBunny from './DraggableBunny';

import * as PIXI from "pixi.js";
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST


export const PixiStage = () => {
    const titleText = "GET TO THE HOLE!"
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerWidth = width/2;
    const centerHeight = height/2;  
    
    const stageProps = {
        width,
        height,
        options: {          
          antialias: true,
        },
      };

      const [circles, setCircles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a unique key for each circle to avoid rendering issues
      const uniqueKey = `circle-${Date.now()}`;

      // Adding a new circle to the existing array of circles
      setCircles(prevCircles => [
        ...prevCircles,
        <Graphics
          key={uniqueKey}
          draw={g => {
            g.beginFill(0xFF0000);
            g.drawCircle(0, 0, Math.random() * 100 + 5); // Adjust circle properties as needed
            g.endFill();
          }}
          x={Math.random() * width} // Adjust x position within the stage
          y={Math.random() * height} // Adjust y position within the stage
        />,
      ]);
    }, 10000); // 5000ms = 5 seconds

    // Clean up the interval on unmount or when the component is destroyed
    return () => clearInterval(interval);
  }, []);

      

    return (
        <div className="divContainer">
            <Stage {...stageProps}>
                {circles}
                <DraggableBunny x={100} scale={3} />
                <Container x={centerWidth} y={50} style={{fill: ['#ffffff', '#00ff99']}}>
                    <Text text={titleText} anchor={{x:0.5, y:0.5}}  style={{fill: ['#ffffff', '#00ff99']}}/>
                </Container>
            </Stage>
        </div>
    )
};