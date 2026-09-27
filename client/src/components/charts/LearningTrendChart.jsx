import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const LearningTrendChart = ({ data }) => {
  const sampleData = data || [
    { date: 'Sep 18', score: 65, label: 'Diagnostic Quiz' },
    { date: 'Sep 20', score: 72, label: 'Ecology Quiz' },
    { date: 'Sep 22', score: 84, label: 'Ratios & Unit Rates' },
    { date: 'Sep 24', score: 92, label: 'Photosynthesis Mastery' }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sampleData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F95738" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#F95738" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DA" />
          <XAxis dataKey="date" tick={{ fill: '#5A606C', fontSize: 11 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#5A606C', fontSize: 11 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2DA', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            formatter={(value) => [`${value}% Score`, 'Performance']}
          />
          <Area type="monotone" dataKey="score" stroke="#F95738" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
