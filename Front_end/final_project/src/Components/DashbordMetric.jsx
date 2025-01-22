import React, { useEffect, useState } from 'react';
import MetricCard from './metricCard_report';
import { supabase } from './supabaseClient'; // Import the Supabase client

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalAttendance: 0,
    happinessPercentage: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch all rows from the table
        const { data: usersData, error: usersError } = await supabase
          .from('users_main') // Replace with your table name
          .select('id, Emotion'); // Fetch `id` and `Emotion` columns

        if (usersError) {
          console.error('Error fetching users:', usersError.message);
          return;
        }

        // Count unique user IDs (as strings)
        const uniqueUserIds = new Set(usersData.map((user) => user.id.trim())); // Ensure IDs are trimmed
        const totalUsers = uniqueUserIds.size;

        // Count total rows (total attendance)
        const totalAttendance = usersData.length;

        // Count the number of "Happiness" occurrences in the `Emotion` column
        const happinessCount = usersData.filter(
          (user) => user.Emotion && user.Emotion.toLowerCase() === 'happy'
        ).length;

        // Calculate the percentage of happiness
        const happinessPercentage =
          totalAttendance > 0 ? (happinessCount / totalAttendance) * 100 : 0;

        // Update metrics state
        setMetrics({
          totalUsers,
          totalAttendance,
          happinessPercentage: happinessPercentage.toFixed(2), // Rounded to 2 decimal places
        });
      } catch (err) {
        console.error('Unexpected error fetching metrics:', err);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <MetricCard title="Total Users" value={metrics.totalUsers} icon="👥" />
      <MetricCard title="Total Attendance" value={metrics.totalAttendance} icon="✅" />
      <MetricCard
        title="Happiness Percentage"
        value={`${metrics.happinessPercentage}%`}
        icon="😊"
      />
    </div>
  );
};

export default DashboardMetrics;
