import React from "react";

type CartIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const DeliveryTruck = ({
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
        d="M13.3333 31.6667C15.1743 31.6667 16.6667 30.1743 16.6667 28.3333C16.6667 26.4924 15.1743 25 13.3333 25C11.4924 25 10 26.4924 10 28.3333C10 30.1743 11.4924 31.6667 13.3333 31.6667Z"
        stroke={color}
        strokeWidth="3.5"
        strokeMiterlimit="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.0001 31.6667C31.841 31.6667 33.3334 30.1743 33.3334 28.3333C33.3334 26.4924 31.841 25 30.0001 25C28.1591 25 26.6667 26.4924 26.6667 28.3333C26.6667 30.1743 28.1591 31.6667 30.0001 31.6667Z"
        stroke={color}
        strokeWidth="3.5"
        strokeMiterlimit="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.7501 28.3333H25.0001V10.6C25.0001 10.2686 24.7315 10 24.4001 10H1.66675"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.41667 28.3334H5.6C5.26863 28.3334 5 28.0647 5 27.7334V19.1667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.33325 15L9.99992 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 15H34.6101C34.8472 15 35.0621 15.1396 35.1584 15.3563L38.2816 22.3836C38.3157 22.4604 38.3333 22.5434 38.3333 22.6273V27.7333C38.3333 28.0647 38.0647 28.3333 37.7333 28.3333H34.1667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M25 28.3333H26.6667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DeliveryTruck;
