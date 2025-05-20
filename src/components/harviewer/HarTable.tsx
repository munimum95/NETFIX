import { HarTableProps } from "@/types/har";
import HarFilterButton from "./HarFilterButton";
import HarStatsBox from "@/components/harviewer/HarStatsBox";
import { useState } from "react";

const FILTERS = ["All", "XHR", "JS", "CSS", "Img", "Media", "Other", "Errors"];

const HarTable = ({ entries }: HarTableProps) => {
  const [selected, setSelected] = useState(FILTERS[0]);

  const totalSize = entries.reduce((sum, e) => sum + (e.size || 0), 0);
  const totalTime = entries.reduce((sum, e) => sum + (e.time || 0), 0);

  return (
    <div className="w-full mb-6 ">
      <HarStatsBox totalRequests={entries.length} totalSize={totalSize} loadTime={totalTime} />
      <HarFilterButton options={FILTERS} value={selected} onChange={setSelected} />
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">URL</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Size</th>
            <th className="p-2 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2 max-w-[400px] truncate text-gray-700">{e.url}</td>
              <td className="p-2 text-gray-800">{e.status}</td>
              <td className="p-2 text-gray-600">{e.type}</td>
              <td className="p-2">{e.size > 0 ? (e.size / 1024).toFixed(1) + " KB" : "-"}</td>
              <td
                className={`p-2 font-medium ${e.time >= 200 && e.status < 400 ? "text-orange-600" : "text-green-600"}`}
              >
                {e.time}ms
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HarTable;
