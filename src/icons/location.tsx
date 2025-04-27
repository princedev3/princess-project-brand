import React from "react";

type CartIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const Location = ({ size = 24, color = "#000", ...props }: CartIconProps) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.73232 15.1804L48.1449 2.18484C48.5204 2.07972 48.8664 2.42568 48.7612 2.80114L35.7657 49.2137C35.6391 49.6658 35.0156 49.71 34.8266 49.2803L24.7724 26.43C24.722 26.3155 24.6306 26.224 24.5161 26.1737L1.66577 16.1195C1.23608 15.9305 1.28026 15.307 1.73232 15.1804Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Location;
