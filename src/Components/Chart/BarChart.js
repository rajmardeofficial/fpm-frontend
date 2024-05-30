import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./BarChart.css"; // Make sure to create this CSS file

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/api/performerstocks"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const labels = data.map((item) => item.symbol);
        const salesData = data.map((item) => parseFloat(item.sales));

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Sales",
              data: salesData,
              backgroundColor: "#36A2EB",
              borderColor: "rgba(0, 0, 139, 1)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.labels.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      // Calculate new dimensions with the same aspect ratio
      const scaleFactor = 1.5; // You can adjust this factor as needed
      const canvasWidth = chartRef.current.offsetWidth * scaleFactor;
      const canvasHeight = chartRef.current.offsetHeight * scaleFactor;

      // Set canvas dimensions
      chartRef.current.width = canvasWidth;
      chartRef.current.height = canvasHeight;

      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          plugins: {
            title: {
              display: true,
              text: "Sales by Symbol",
            },
          },
          responsive: true,
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });

      // Cleanup function to destroy the chart instance when the component unmounts or data changes
      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
    }
  }, [chartData]);

  return (
    <div>
      <h3 style={{textAlign: "center"}}>Market Trend</h3>
      <div className="small-canvas-container">
        <canvas ref={chartRef} className="small-canvas" />
      </div>
    </div>
  );
};

export default BarChart;
