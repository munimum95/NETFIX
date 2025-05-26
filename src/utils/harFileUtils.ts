import { FilterType, HarEntry, ParsedHarEntry } from "@/types/har";

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
