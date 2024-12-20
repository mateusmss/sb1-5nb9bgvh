import React from 'react';
import { AlertCircle, Users, UserMinus } from 'lucide-react';
import { ChurnStats } from '../types/churn';

interface ChurnAnalysisProps {
  stats: ChurnStats;
}

export default function ChurnAnalysis({ stats }: ChurnAnalysisProps) {
  return (
    <div className="mt-8 space-y-6">
      {/* Early Churn Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
          Early Churn Analysis (First 3 Months)
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-red-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-700">{stats.earlyChurn.count}</div>
            <div className="text-sm text-red-600">Early Churned Customers</div>
          </div>
          <div className="flex-1 bg-red-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-700">{stats.earlyChurn.percentage}%</div>
            <div className="text-sm text-red-600">Early Churn Rate</div>
          </div>
        </div>
      </div>

      {/* Segment Churn Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-500" />
          Churn by Segment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats.segmentChurn).map(([segment, data]) => (
            <div key={segment} className="bg-gray-50 rounded-lg p-4">
              <div className="font-medium text-gray-700 mb-2">{segment}</div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-blue-600 font-semibold">{data.total}</div>
                  <div className="text-gray-500">Total</div>
                </div>
                <div>
                  <div className="text-red-600 font-semibold">{data.churned}</div>
                  <div className="text-gray-500">Churned</div>
                </div>
                <div>
                  <div className="text-purple-600 font-semibold">{data.percentage}%</div>
                  <div className="text-gray-500">Rate</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}