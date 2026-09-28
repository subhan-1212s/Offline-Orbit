import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const AssignmentCompletionChart = ({ data }) => {
  const chartData = (data && data.length > 0) ? data : [
    { assignment: 'Core Diagnostic Assessment', completed: 1, inProgress: 0, notStarted: 0 },
    { assignment: 'Photosynthesis & Plant Energy', completed: 1, inProgress: 0, notStarted: 0 },
    { assignment: 'Algorithms & Logic Quest', completed: 1, inProgress: 0, notStarted: 0 }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
          <XAxis dataKey="assignment" tick={{ fill: '#5A606C', fontSize: 11 }} />
          <YAxis tick={{ fill: '#5A606C', fontSize: 11 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2DA', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} 
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: '10px' }} />
          <Bar dataKey="completed" name="Completed" stackId="a" fill="#0D9488" radius={[0, 0, 0, 0]} />
          <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#4F46E5" radius={[0, 0, 0, 0]} />
          <Bar dataKey="notStarted" name="Not Started" stackId="a" fill="#E5E2DA" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
