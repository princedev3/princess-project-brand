"use client";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ShowMapContainer = () => {
  const icon = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    className: "object-contain",
  });

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <h1 className="text-lg font-semibold text-baseGreen">Where we are?</h1>

      {/* Breadcrumb Section */}
      <Breadcrumb>
        <BreadcrumbList className="text-baseGreen">
          <BreadcrumbItem>Nigeria</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Lagos</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Dopemu</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Map Container */}
      <div className="relative w-full h-[400px]">
        <MapContainer
          center={[6.6129, 3.314]} // Lagos coordinates (adjust as needed)
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Marker with Popup */}
          <Marker position={[6.6129, 3.314]} icon={icon}>
            <Popup>
              <div className="flex gap-1 w-full">
                <b>$</b> {/* Add content inside the popup */}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ShowMapContainer;
