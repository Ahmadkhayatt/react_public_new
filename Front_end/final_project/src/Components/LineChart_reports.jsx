import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { supabase } from './supabaseClient'; // Import the Supabase client

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Recognition Trends',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.6)', // Bar color
        borderColor: 'rgba(75,192,192,1)', // Bar border color
        borderWidth: 1, // Border thickness
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Supabase
        const { data: usersData, error } = await supabase
          .from('users_main') // Replace with your table name
          .select('name, total_attendance');

        if (error) {
          console.error('Error fetching data:', error.message);
          return;
        }

        // Transform the data for the chart
        const labels = usersData.map((user) => user.name); // X-axis: User name
        const attendanceData = usersData.map((user) => user.total_attendance); // Y-axis: Total attendance

        // Update chart data
        setChartData({
          labels,
          datasets: [
            {
              label: 'Recognition Trends',
              data: attendanceData,
              backgroundColor: 'rgba(75,192,192,0.6)', // Bar color
              borderColor: 'rgba(75,192,192,1)', // Bar border color
              borderWidth: 1, // Border thickness
            },
          ],
        });
      } catch (err) {
        console.error('Unexpected error fetching data:', err);
      }
    };

    fetchData();
  }, []); // Fetch data only once on component mount

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 3, // More horizontal space
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top
        labels: {
          font: {
            size: 14, // Increase font size of legend labels
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14, // Adjust the font size of x-axis labels
            family: 'Arial, sans-serif',
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14, // Adjust the font size of y-axis labels
            family: 'Arial, sans-serif',
          },
        },
      },
    },
  };

  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto bg-gradient-to-r from-blue-500 to-teal-500 p-8 rounded-lg shadow-2xl">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Attendance Recognition Trends
        </h2>
        <div className="w-full" style={{ height: '400px' }}> {/* Set a fixed height */}
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
