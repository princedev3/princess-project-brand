"use client";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useLazyGetALLOrderChartDatasQuery } from "@/app/apis/_order_index.api";
import LoadingPage from "@/components/navbar/loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    return d.toISOString().split("T")[0];
  });

  const [endDate, setEndDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  const [trigger, { data, isLoading }] = useLazyGetALLOrderChartDatasQuery();

  useEffect(() => {
    trigger({ startDate, endDate });
  }, [startDate, endDate, trigger]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: true },
      y: { display: true },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sales Chart",
      },
    },
  };

  const datas = {
    labels: data?.dailySales.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
      });
    }),
    datasets: [
      {
        type: "line" as const,
        label: "Sales",
        data: data?.dailySales.map((item) => item.total),
        borderColor: "#17cf97",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="w-full">
      <div className="flex gap-4 mb-4 items-center">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="w-full h-full">
          <div className="relative w-full h-[400px] md:h-full ">
            <Line
              options={options}
              style={{ height: "100%", width: "100%" }}
              data={datas}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
