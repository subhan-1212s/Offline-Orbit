import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const ActivityHeatmapChart = ({ data }) => {
  const chartData = data || [
    { day: 'Mon', questions: 18 },
    { day: 'Tue', questions: 28 },
    { day: 'Wed', questions: 22 },
    { day: 'Thu', questions: 35 },
    { day: 'Fri', questions: 24 },
    { day: 'Sat', questions: 12 },
    { day: 'Sun', questions: 15 }
  ];

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <XAxis dataKey="day" tick={{ fill: '#5A606C', fontSize: 11 }} />
          <YAxis tick={{ fill: '#5A606C', fontSize: 11 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2DA' }}
            formatter={(val) => [`${val} Practice Questions`, 'Activity']}
          />
          <Bar dataKey="questions" fill="#0D9488" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
