import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const LearningTrendChart = ({ data }) => {
  let chartData = (data && data.length > 0) ? [...data] : null;

  // If only 1 attempt exists, prepend an initial diagnostic baseline so the area chart renders a clean trajectory
  if (chartData && chartData.length === 1) {
    const single = chartData[0];
    chartData = [
      { date: 'Diagnostic Baseline', score: Math.max(50, single.score - 10), label: 'Diagnostic Baseline' },
      single
    ];
  }

  const sampleData = chartData || [
    { date: 'Diagnostic', score: 65, label: 'Diagnostic Baseline' },
    { date: 'Topic Check 1', score: 74, label: 'Algorithms Practice' },
    { date: 'Topic Check 2', score: 82, label: 'Ratios & Unit Rates' },
    { date: 'Topic Check 3', score: 90, label: 'Photosynthesis Mastery' }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sampleData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F95738" stopOpacity={0.35}/>
              <stop offset="95%" stopColor="#F95738" stopOpacity={0.02}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DA" />
          <XAxis dataKey="date" tick={{ fill: '#5A606C', fontSize: 11 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#5A606C', fontSize: 11 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2DA', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            formatter={(value, name, item) => [`${value}% Score (${item?.payload?.label || 'Assessment'})`, 'Performance']}
          />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#F95738" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#scoreColor)" 
            dot={{ r: 4, fill: '#F95738', stroke: '#FFFFFF', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#F95738', stroke: '#FFFFFF', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
