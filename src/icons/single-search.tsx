import React from "react";

type CartIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const SingleSecure = ({
  size = 24,
  color = "#000",
  ...props
}: CartIconProps) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.208 26.2083L32.3747 32.375"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.625 16.9583C4.625 23.7698 10.1468 29.2917 16.9583 29.2917C20.37 29.2917 23.4581 27.9064 25.6909 25.6677C27.916 23.4367 29.2917 20.3582 29.2917 16.9583C29.2917 10.1468 23.7698 4.625 16.9583 4.625C10.1468 4.625 4.625 10.1468 4.625 16.9583Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SingleSecure;
