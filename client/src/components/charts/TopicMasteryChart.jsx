import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export const TopicMasteryChart = ({ data }) => {
  const chartData = data || [
    { name: 'Mastered', count: 3, color: '#0D9488' },
    { name: 'Practising', count: 4, color: '#4F46E5' },
    { name: 'Needs Review', count: 2, color: '#F95738' }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 15, right: 30, left: 20, bottom: 10 }}>
          <XAxis type="number" allowDecimals={false} tick={{ fill: '#5A606C', fontSize: 11 }} />
          <YAxis dataKey="name" type="category" tick={{ fill: '#1E2229', fontSize: 12, fontWeight: 700 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2DA', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            formatter={(val) => [`${val} Modules`, 'Mastery Status']}
          />
          <Bar dataKey="count" radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
