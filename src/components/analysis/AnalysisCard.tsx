import { getMethodColor, getStatusColor } from "@/utils/harFileUtils";
import { AnalyzedHarEntry } from "@/types/har";
import { CircleAlert, CircleCheck } from "lucide-react";

interface AnalysisCardProps {
  title: string;
  description: string;
  count: number;
  topExamples?: AnalyzedHarEntry[];
  unit?: "ms" | "KB";
}

const AnalysisCard = ({ title, description, count, topExamples = [], unit }: AnalysisCardProps) => {
  return (
    <div className={`p-4 border rounded-xl shadow space-y-2 ${count > 0 ? "bg-white" : "bg-gray-100 text-gray-400"}`}>
      <h3 className="text-lg font-bold flex items-center gap-1">
        {count > 0 ? <CircleAlert className="text-red-500" /> : <CircleCheck className="text-gray-400" />}
        {title}
      </h3>
      <p className="text-sm">{description}</p>

      {count > 0 ? (
        <>
          <ul className="text-sm text-gray-700 divide-y">
            {topExamples!.map((item, i) => (
              <li key={i} className="flex justify-between items-center py-1">
                <div className="flex flex-col w-full overflow-hidden">
                  <span className="truncate" title={item.url}>
                    {item.url}
                  </span>
                  <div className="flex gap-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs rounded ${getMethodColor(item.method)}`}>{item.method}</span>
                    <span className={`px-2 py-0.5 text-xs rounded ${getStatusColor(item.status)}`}>{item.status}</span>
                  </div>
                </div>
                <span className="text-sm font-mono text-gray-600 text-right ml-2">
                  {unit === "KB" ? `${(item.size / 1024).toFixed(1)}KB` : `${item.time}ms`}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-right text-gray-500">총 {count}개</p>
        </>
      ) : (
        <p className="text-sm">문제 없음</p>
      )}
    </div>
  );
};

export default AnalysisCard;
