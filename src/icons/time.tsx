import React from "react";

type CartIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const Time = ({ size = 24, color = "#000", ...props }: CartIconProps) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33 16.5L33 33L49.5 33"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 60.5C48.1878 60.5 60.5 48.1878 60.5 33C60.5 17.8122 48.1878 5.5 33 5.5C17.8122 5.5 5.5 17.8122 5.5 33C5.5 48.1878 17.8122 60.5 33 60.5Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Time;
