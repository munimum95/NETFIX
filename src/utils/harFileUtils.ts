import { HarEntry } from "@/types/har";

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
