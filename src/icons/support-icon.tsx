import React from "react";

type CartIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const SupportIcon = ({
  size = 24,
  color = "#000",
  ...props
}: CartIconProps) => {
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
        d="M20.0002 36.6666C29.2049 36.6666 36.6668 29.2047 36.6668 20C36.6668 10.7952 29.2049 3.33331 20.0002 3.33331C10.7954 3.33331 3.3335 10.7952 3.3335 20C3.3335 23.0357 4.14512 25.8819 5.5632 28.3333L4.16683 35.8333L11.6668 34.4369C14.1183 35.855 16.9644 36.6666 20.0002 36.6666Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SupportIcon;
