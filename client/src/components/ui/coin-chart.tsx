"use client";

import { Coin, LineChartProps } from "@/app/interfaces";
import axios from "axios";
import {
  ChartOptions,
  Legend,
  Tooltip,
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.timestamps.map((ts) => new Date(ts).toLocaleDateString()), // Convert timestamps to readable dates
    datasets: [
      {
        label: "Prices",
        data: data.values,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: false,
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };
  return <Line data={chartData} options={options} />;
};

const CoinChart = ({ coinData }: { coinData: Coin | undefined }) => {
  console.log(coinData);

  const [coinChartData, setCoinChartData] = useState<any>();
  useEffect(() => {
    const getCoinChart = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cryptix/chart?coinId=${coinData?.id}`
        );
        setCoinChartData(JSON.parse(response.data));
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };
    getCoinChart();
  }, []);
  const separateData = (dataArray: any[]) =>
    dataArray.reduce(
      (acc, [timestamp, value]) => {
        acc.timestamps.push(timestamp);
        acc.values.push(value);
        return acc;
      },
      { timestamps: [], values: [] }
    );

  const pricesData = separateData(coinChartData?.prices || []);

  return (
    <div /*className="max-w-5xl mx-auto px-8"*/>
      <LineChart data={pricesData} />
    </div>
  );
};

export default CoinChart;
