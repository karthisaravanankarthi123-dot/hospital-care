import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface IconProps {
  active?: boolean;
  color?: string;
  size?: number;
}

export const HomeIcon = ({ active, color, size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path 
      d="M12 3.5l6.5 6v9.5c0 1.1-.9 2-2 2h-9c-1.1 0-2-.9-2-2v-9.5L12 3.5z" 
      stroke={color || (active ? "#FFFFFF" : "#8e99af")} 
      strokeWidth="1.8" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Path 
      d="M9 17h6" 
      stroke={color || (active ? "#FFFFFF" : "#8e99af")} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
    />
  </Svg>
);

export const ShortsIcon = ({ active, color, size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle 
      cx="12" 
      cy="12" 
      r="9" 
      stroke={color || (active ? "#FFFFFF" : "#8e99af")} 
      strokeWidth="1.8" 
      fill="none" 
    />
    <Path 
      d="M10.5 8.5v7c0 .5.5.8.9.5l4.5-3.5c.4-.3.4-.8 0-1l-4.5-3.5c-.4-.3-.9 0-.9.5z" 
      stroke={color || (active ? "#FFFFFF" : "#8e99af")} 
      strokeWidth="1.5" 
      fill="none" 
      strokeLinejoin="round" 
    />
  </Svg>
);

export const DetailsIcon = ({ active, color, size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path 
      d="M12 3.5l6.5 6v9.5c0 1.1-.9 2-2 2h-9c-1.1 0-2-.9-2-2v-9.5L12 3.5z" 
      stroke={color || (active ? "#FFFFFF" : "#8e99af")} 
      strokeWidth="1.8" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Path 
      d="M9 17h6" 
      stroke={color || (active ? "#FFFFFF" : "#8e99af")} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
    />
  </Svg>
);

export const ProfileIcon = ({ active, color, size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle 
      cx="12" 
      cy="12" 
      r="9" 
      stroke={color || (active ? "#FFFFFF" : "#8e99af")} 
      strokeWidth="1.8" 
      fill="none" 
    />
    <Circle 
      cx="12" 
      cy="9.5" 
      r="3" 
      stroke={color || (active ? "#FFFFFF" : "#8e99af")} 
      strokeWidth="1.8" 
      fill="none" 
    />
    <Path 
      d="M6 18c1.5-2.5 4-3.5 6-3.5s4.5 1 6 3.5" 
      stroke={color || (active ? "#FFFFFF" : "#8e99af")} 
      strokeWidth="1.8" 
      fill="none" 
      strokeLinecap="round" 
    />
  </Svg>
);
