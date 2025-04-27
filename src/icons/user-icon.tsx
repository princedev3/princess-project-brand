import React from "react";

type CartIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const UserIcon = ({ size = 24, color = "#000", ...props }: CartIconProps) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.0002 3.33333C10.7954 3.33333 3.3335 10.7953 3.3335 20C3.3335 29.2047 10.7954 36.6667 20.0002 36.6667C29.2049 36.6667 36.6668 29.2047 36.6668 20C36.6668 10.7953 29.2049 3.33333 20.0002 3.33333Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.11914 30.5762C7.11914 30.5762 10.8342 25.8333 20.0009 25.8333C29.1675 25.8333 32.8826 30.5762 32.8826 30.5762"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;
