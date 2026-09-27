import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ConceptGapsChart = ({ data }) => {
  const chartData = data || [
    { topic: 'Linear Equations', percentageStruggling: 37.5 },
    { topic: 'Ecology & Pyramids', percentageStruggling: 25.0 },
    { topic: 'Ratios & Unit Rates', percentageStruggling: 16.6 },
    { topic: 'Photosynthesis', percentageStruggling: 8.3 }
  ];

  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DA" horizontal={false} />
          <XAxis type="number" unit="%" domain={[0, 50]} tick={{ fill: '#5A606C', fontSize: 11 }} />
          <YAxis dataKey="topic" type="category" tick={{ fill: '#1E2229', fontSize: 11, fontWeight: 600 }} width={110} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2DA' }}
            formatter={(val) => [`${val}% of class needing support`, 'Struggling Rate']}
          />
          <Bar dataKey="percentageStruggling" fill="#F95738" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
