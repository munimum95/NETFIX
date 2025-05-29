import { AnalyzedHarEntry, FilterType, HarEntry, ParsedHarEntry } from "@/types/har";

export const parseHarFile = async (file: File) => {
  if (!file) {
    return;
  }
  //파일 텍스트로 읽기
  const text = await file.text();
  //텍스트를 json으로 파싱
  const json = JSON.parse(text);
  //log.entries 배열 추출
  const entries = json?.log?.entries || [];

  return entries.map((entry: HarEntry) => {
    const contentType = entry.response.content.mimeType || "unknown";

    return {
      url: entry.request.url,
      status: entry.response.status,
      type: contentType,
      size: entry.response.content.size,
      time: Math.round(entry.time),
      method: entry.request.method,
      startedDateTime: entry.startedDateTime,
      timings: entry.timings,
    };
  });
};

export const getFilterType = (entry: ParsedHarEntry): FilterType => {
  if (entry.status >= 400) {
    return "Errors";
  }
  if (
    entry.url.includes("xhr") ||
    entry.url.includes("fetch") ||
    entry.type.includes("json") ||
    entry.type.includes("xml")
  ) {
    return "XHR";
  }
  if (entry.type.includes("javascript")) {
    return "JS";
  }
  if (entry.type.includes("css")) {
    return "CSS";
  }
  if (entry.type.includes("image")) {
    return "Img";
  }
  if (entry.type.includes("audio") || entry.type.includes("video")) {
    return "Media";
  }
  return "Other";
};

export const getColorForTime = (time: number): string => {
  if (time <= 200) {
    return "text-green-500";
  }
  if (time <= 400) {
    return "text-orange-500";
  }
  if (time <= 500) {
    return "text-red-500";
  }
  return "text-red-700";
};

export const getStatusColor = (status: number) => {
  if (status >= 500) return "bg-red-100 text-red-600";
  if (status >= 400) return "bg-yellow-100 text-yellow-600";
  if (status >= 300) return "bg-blue-100 text-blue-600";
  return "bg-green-100 text-green-600";
};

export const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "bg-blue-100 text-blue-700";
    case "POST":
      return "bg-green-100 text-green-700";
    case "PUT":
    case "PATCH":
      return "bg-yellow-100 text-yellow-700";
    case "DELETE":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
/**
 Lighthouse 기준 네트워크 분석
 1.ttfb 600ms
 2.느린응답 2000ms
 3.용량 큰 js파일 1Mb
 4.용량 큰 이미지파일 100Kb
 5.중복 요청 추적
 6.전체 응답 용량 계산 
 7.렌더링 차단 리소스
 8.캐시 비적용 리소스
 */

export const analyzeHarEntries = (entries: AnalyzedHarEntry[]) => {
  const ttfbLimit = 600; // ms
  const slowLimit = 2000; // ms
  const largeJS = 1024 * 1024; // 1MB
  const largeImg = 100 * 1024; // 100KB

  const ttfb = entries
    .filter((e) => e.timings?.wait && e.timings.wait > ttfbLimit)
    .sort((a, b) => (b.timings?.wait ?? 0) - (a.timings?.wait ?? 0));
  const slow = entries.filter((e) => e.time > slowLimit).sort((a, b) => b.time - a.time);
  const largeJsFiles = entries
    .filter((e) => (e.type?.includes("javascript") || e.url.endsWith(".js")) && e.size > largeJS)
    .sort((a, b) => b.size - a.size);
  const largeImages = entries
    .filter((e) => e.type?.startsWith("image/") && e.size > largeImg)
    .sort((a, b) => b.size - a.size);

  return {
    ttfb: {
      count: ttfb.length,
      topExamples: ttfb.slice(0, 5),
    },
    slow: {
      count: slow.length,
      topExamples: slow.slice(0, 5),
    },
    largeJsFiles: {
      count: largeJsFiles.length,
      topExamples: largeJsFiles.slice(0, 5),
    },
    largeImages: {
      count: largeImages.length,
      topExamples: largeImages.slice(0, 5),
    },
  };
};
