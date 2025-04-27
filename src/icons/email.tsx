import React from "react";

type CartIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const Email = ({ size = 24, color = "#000", ...props }: CartIconProps) => {
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
        d="M19.25 24.75L33 34.375L46.75 24.75"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 50.25V15.75C5.5 14.6454 6.39543 13.75 7.5 13.75H58.5C59.6046 13.75 60.5 14.6454 60.5 15.75V50.25C60.5 51.3546 59.6046 52.25 58.5 52.25H7.5C6.39543 52.25 5.5 51.3546 5.5 50.25Z"
        stroke={color}
        strokeWidth="2.5"
      />
    </svg>
  );
};

export default Email;
