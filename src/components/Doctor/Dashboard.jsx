import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

export default function Ahome() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Series 1',
        data: [700, 799, 1999, 1400, 2599],
      },
      {
        name: 'Series 2',
        data: [1200, 1500, 800, 2000, 1000],
      },
    ],
    options: {
      chart: {
        height: 500,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'top',
      },
      xaxis: {
        categories: [
          '20-05-2023',
          '21-05-2023',
          '22-05-2023',
          '23-05-2023',
          '24-05-2023',
        ],
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
    },
  });

  return (
    <div className="w-full">
      <h3 className="font-semibold text-primaryViolet text-center text-2xl mt-15 mb-10">
        Dashboard
      </h3>

      {/* Additional content */}
      {/* Add any additional content you want to display */}
      {/* Remove the extra div and adjust the margin-bottom to control the space below the chart */}
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={500}
        style={{ marginBottom: '-20px' }}
      />
    </div>
  );
}
