import React from "react";

type CartIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const TelIcon = ({ size = 24, color = "#000", ...props }: CartIconProps) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.8257 36.4305L34.5006 38.625C26.8508 34.7855 22.1256 30.375 19.3756 23.5L21.4929 12.1422L17.4905 1.5L3.57126 1.5C2.44371 1.5 1.55031 2.4232 1.65493 3.54589C2.20423 9.44017 4.79248 26.7919 16.6256 38.625C29.0312 51.0306 47.912 55.1111 54.3002 56.1774C55.476 56.3736 56.5006 55.4575 56.5006 54.2655L56.5005 40.4984L45.8257 36.4305Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TelIcon;
