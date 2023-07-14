import React from 'react';

const SenateOverview = () => {
    const radius = 200;
    const centerX = radius;
    const centerY = radius;
    const numCircles = 100;
    const circleRadius = 5;
    const spacing = 10;
  
    const angleStep = Math.PI / numCircles;
  
    const circles = Array.from({ length: numCircles }).map((_, index) => {
      const angle = angleStep * index;
      const x = centerX + (radius - circleRadius - spacing) * Math.cos(angle + Math.PI / 2);
      const y = centerY - (radius - circleRadius - spacing) * Math.sin(angle + Math.PI / 2);
  
      return (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={circleRadius}
          fill="red"
        />
      );
    });
  
    return (
      <svg width={radius * 2} height={radius}>
        <path
          d={`M${centerX - radius} ${centerY} A${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="blue"
        />
        {circles}
      </svg>
    );
  };
  
export default SenateOverview;
