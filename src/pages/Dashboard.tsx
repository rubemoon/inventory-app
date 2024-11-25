import React from 'react';
import ChartComponent from '../components/ChartComponent';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ChartComponent />
    </div>
  );
};

export default Dashboard;