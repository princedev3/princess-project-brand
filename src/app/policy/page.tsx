"use client";
import { privacyInfo } from "@/static-data/staticdata";
import React from "react";
import { FaLock } from "react-icons/fa"; // Privacy icon from react-icons

const Policy = () => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8 md:p-12 mt-8">
      <h1 className="text-4xl text-gray-800 text-center font-semibold mb-6">Privacy Policy</h1>
      <div className="space-y-8">
        {privacyInfo.map((item) => (
          <div key={item.id} className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 text-lg font-semibold text-baseGreen mb-3">
              <FaLock size={24} className="text-baseGreen" />
              <span className="text-xl">{item.title}</span>
            </div>
            <p className="text-gray-600 text-md leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policy;
