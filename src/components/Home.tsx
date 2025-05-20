import { useState } from "react";
import FileUpload from "@/components/file/FileUpload";
import HarTable from "@/components/harviewer/HarTable";
import { parseHarFile } from "@/utils/harFileUtils";
import Header from "./layout/Header";
import NetworkAnalysis from "./analysis/NetworkAnalysis";
import AIAnalysis from "./analysis/AIAnalysis";
import { ParsedHarEntry } from "@/types/har";

const Home = () => {
  const [entries, setEntries] = useState<ParsedHarEntry[]>([]);

  const handleFile = async (file: File) => {
    const result = await parseHarFile(file);
    console.log(result);
    setEntries(result);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <Header title="NETFIX" description="네트워크 요청 분석을 통한 오류 진단과 해결" />
      <FileUpload onFileSelect={handleFile} />
      {entries.length > 0 && <HarTable entries={entries} />}
      <NetworkAnalysis entries={entries} />
      <AIAnalysis />
    </div>
  );
};

export default Home;
//필터
// 숫자 변환포맷
// 타임 변환포맷
