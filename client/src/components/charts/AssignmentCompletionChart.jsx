import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const AssignmentCompletionChart = ({ data }) => {
  const chartData = data || [
    { assignment: 'Photosynthesis Lab', completed: 21, inProgress: 2, notStarted: 1 },
    { assignment: 'Ratios Quiz', completed: 18, inProgress: 4, notStarted: 2 },
    { assignment: 'Ecology Quest', completed: 12, inProgress: 8, notStarted: 4 }
  ];

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
          <XAxis dataKey="assignment" tick={{ fill: '#5A606C', fontSize: 11 }} />
          <YAxis tick={{ fill: '#5A606C', fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2DA' }} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: '10px' }} />
          <Bar dataKey="completed" name="Completed" stackId="a" fill="#0D9488" radius={[0, 0, 0, 0]} />
          <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#4F46E5" radius={[0, 0, 0, 0]} />
          <Bar dataKey="notStarted" name="Not Started" stackId="a" fill="#E5E2DA" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
