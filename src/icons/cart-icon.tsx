import React from "react";

type CartIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const CartIcon = ({ size = 24, color = "#000", ...props }: CartIconProps) => {
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
        d="M32.5 36.6667C33.8807 36.6667 35 35.5474 35 34.1667C35 32.786 33.8807 31.6667 32.5 31.6667C31.1193 31.6667 30 32.786 30 34.1667C30 35.5474 31.1193 36.6667 32.5 36.6667Z"
        fill="white"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8335 36.6667C17.2142 36.6667 18.3335 35.5474 18.3335 34.1667C18.3335 32.786 17.2142 31.6667 15.8335 31.6667C14.4528 31.6667 13.3335 32.786 13.3335 34.1667C13.3335 35.5474 14.4528 36.6667 15.8335 36.6667Z"
        fill="white"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.5002 6.66667H36.6668L33.3335 25H25.8335M27.5002 6.66667L25.8335 25M27.5002 6.66667H17.9168M25.8335 25H19.1668M17.9168 6.66667H8.3335L11.6668 25H19.1668M17.9168 6.66667L19.1668 25"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.3335 6.66667C8.05572 5.55555 6.66683 3.33333 3.3335 3.33333"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.3332 25H11.6665H8.71779C5.74394 25 4.1665 26.3021 4.1665 28.3333C4.1665 30.3646 5.74394 31.6667 8.71779 31.6667H32.4998"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CartIcon;
