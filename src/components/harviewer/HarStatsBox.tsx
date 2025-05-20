import { formatBytes, formatMilliseconds } from "@/utils/formatNumber";

interface StatsBoxProps {
  totalRequests: number;
  totalSize: number;
  loadTime: number;
}

const HarStatsBox = ({ totalRequests, totalSize, loadTime }: StatsBoxProps) => {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1 bg-white rounded-lg border p-6 text-center">
        <div className="text-gray-500 text-sm mb-1">Total Requests</div>
        <div className="text-3xl font-bold">{totalRequests}</div>
      </div>
      <div className="flex-1 bg-white rounded-lg border p-6 text-center">
        <div className="text-gray-500 text-sm mb-1">Total Size</div>
        <div className="text-3xl font-bold">{formatBytes(totalSize)}</div>
      </div>
      <div className="flex-1 bg-white rounded-lg border p-6 text-center">
        <div className="text-gray-500 text-sm mb-1">Load Time</div>
        <div className="text-3xl font-bold">{formatMilliseconds(loadTime)}</div>
      </div>
    </div>
  );
};

export default HarStatsBox;
