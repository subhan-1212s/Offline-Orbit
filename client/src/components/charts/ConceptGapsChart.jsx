import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ConceptGapsChart = ({ data }) => {
  const chartData = (data && data.length > 0) ? data : [
    { topic: 'Algorithmic Problem Solving', percentageStruggling: 30, subject: 'Computer Science' },
    { topic: 'Photosynthesis & Light Reactions', percentageStruggling: 20, subject: 'Science' },
    { topic: 'Solving Linear Equations', percentageStruggling: 15, subject: 'Mathematics' },
    { topic: 'Ratios & Unit Rates', percentageStruggling: 10, subject: 'Mathematics' }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DA" horizontal={false} />
          <XAxis 
            type="number" 
            unit="%" 
            domain={[0, (dataMax) => Math.min(100, Math.max(40, Math.ceil((dataMax + 10) / 10) * 10))]} 
            tick={{ fill: '#5A606C', fontSize: 11 }} 
          />
          <YAxis 
            dataKey="topic" 
            type="category" 
            tick={{ fill: '#1E2229', fontSize: 11, fontWeight: 600 }} 
            width={150} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2DA', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            formatter={(val) => [`${val}% of class needing support`, 'Struggling Rate']}
          />
          <Bar dataKey="percentageStruggling" fill="#F95738" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
