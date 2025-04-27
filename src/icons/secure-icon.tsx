import React from "react";

type CartIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const SecureIcon = ({ size = 24, color = "#000", ...props }: CartIconProps) => {
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
        d="M36.6668 15V10.3333C36.6668 9.22874 35.7714 8.33331 34.6668 8.33331H5.33349C4.22892 8.33331 3.3335 9.22874 3.3335 10.3333V29.6666C3.3335 30.7712 4.22893 31.6666 5.3335 31.6666H20.0002M36.6668 15H10.0002M36.6668 15V18.3333"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.3256 23.4583L36.2144 24.6999C36.4804 24.7675 36.6674 25.0133 36.6625 25.2877C36.4871 35.1617 30.8333 36.6666 30.8333 36.6666C30.8333 36.6666 25.1795 35.1617 25.0042 25.2877C24.9993 25.0133 25.1863 24.7675 25.4523 24.6999L30.341 23.4583C30.6641 23.3763 31.0026 23.3763 31.3256 23.4583Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SecureIcon;
