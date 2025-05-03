import React from "react";

type IconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

export const GameIcon = ({
  size = 24,
  color = "#000",
  ...props
}: IconProps) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2603_1931)">
        <path
          d="M40 12H8C5.79086 12 4 13.7909 4 16V32C4 34.2091 5.79086 36 8 36H40C42.2091 36 44 34.2091 44 32V16C44 13.7909 42.2091 12 40 12Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 24H20M16 20V28"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 22V22.0207"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36 25.9999V26.0206"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2603_1931">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GameIcon;
