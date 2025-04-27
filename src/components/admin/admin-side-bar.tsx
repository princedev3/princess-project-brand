"use client";
import { adminDetails } from "@/static-data/staticdata";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AdminSideBar = ({
  setSelectedSection,
  selectedSection,
}: {
  setSelectedSection: (item: string) => void;
  selectedSection: string;
}) => {
  return (
    <div className="bg-gray-50  relative  flex flex-col gap-4 py-5 rounded-md">
      <div className="h-full w-[2px] bg-black/5 absolute left-0 top-0"></div>
      {adminDetails.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelectedSection(item.activeState as string)}
          className={`${
            selectedSection === item.activeState ? "bg-gray-200" : ""
          } flex relative items-center gap-3 cursor-pointer group hover:bg-gray-200 rounded-sm transition-all duration-600 py-2  px-4 md:px-6`}
        >
          <div
            className={`${
              selectedSection === item.activeState ? "bg-black/50" : ""
            } w-[3px] h-full absolute left-0  group-hover:block `}
          ></div>
          <span className="text-xl font-normal text-gray-700 capitalize hidden md:block">
            {item.title}{" "}
          </span>
          <item.icon size={26} color="#374151" className="hidden md:block " />
          <div className="relative flex items-center justify-center">
            <div className="md:hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <item.icon size={30} color="#374151" className="" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSideBar;
