import React,{useState,useEffect} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetchGlobal } from "../Api/CovidApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({data}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Covid-19-Tracker Chart",
      },
    },
    maintainAspectRatio: false,
  };

  const labels = [
    "Cases",
    "Recovered",
    "Active",
    "Death",
    "Critical",
    "Today Cases",
  ];
  const chartdata = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  };
  return <Bar options={options} height={"500px"} data={chartdata} />;
}
