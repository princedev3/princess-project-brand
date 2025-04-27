import React from "react";

type IconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

export const PhoneIcon = ({
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
      <g clipPath="url(#clip0_2603_1946)">
        <path
          d="M33.375 5.25H14.625C13.3306 5.25 12.2812 6.29933 12.2812 7.59375V40.4062C12.2812 41.7007 13.3306 42.75 14.625 42.75H33.375C34.6694 42.75 35.7188 41.7007 35.7188 40.4062V7.59375C35.7188 6.29933 34.6694 5.25 33.375 5.25Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 6H26.6875"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 37.7188V37.7404"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="13" y1="34" x2="35" y2="34" stroke={color} strokeWidth="2" />
      </g>
    </svg>
  );
};

export default PhoneIcon;
