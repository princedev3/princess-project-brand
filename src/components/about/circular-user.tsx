"use client";
import { userType } from "@/static-data/types";
import Image from "next/image";
import React from "react";

const CirularUser = () => {
  const users: userType = [
    { id: 1, name: "Alice", image: "/face-1.jpg", angle: 0 },
    { id: 2, name: "Bob", image: "/face-2.jpg", angle: 90 },
    { id: 3, name: "Charlie", image: "/face-3.jpg", angle: 180 },
    { id: 4, name: "David", image: "/face-4.jpg", angle: 270 },
  ];

  const radius = 100;

  return (
    <div className="relative flex items-center justify-center  h-[400px] w-[400px] mx-auto">
      <div className="absolute w-[300px] h-[300px] bg-gradient-to-t from-[#E0F7FA] to-pink-50 rounded-full"></div>
      <div className="absolute w-[200px] h-[200px] bg-gradient-to-t from-[#EDE7F6] to-gray-50 rounded-full"></div>
      <div className="absolute w-[100px] h-[100px] bg-black/20 rounded-full"></div>

      {users.map((user) => {
        const angleInRad = (user.angle * Math.PI) / 180;
        const x = Math.cos(angleInRad) * radius;
        const y = Math.sin(angleInRad) * radius;

        return (
          <div
            key={user.id}
            className="absolute"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <Image
              src={user.image}
              alt={""}
              width={50}
              height={50}
              className="rounded-full object-cover min-w-[50px] min-h-[50px] border-2 border-white shadow-lg"
            />
          </div>
        );
      })}
    </div>
  );
};

export default CirularUser;
