export interface HarEntry {
  startedDateTime: string;
  time: number;
  request: {
    url: string;
    method: string;
    headers: { name: string; value: string }[];
    postData?: {
      mimeType: string;
      text: string;
    };
  };
  response: {
    status: number;
    statusText: string;
    headers: { name: string; value: string }[];
    content: {
      size: number;
      mimeType: string;
      text?: string;
    };
  };
  timings: {
    wait: number;
    receive: number;
  };
}

export interface HarData {
  log: {
    entries: HarEntry[];
  };
}
export interface ParsedHarEntry {
  url: string;
  status: number;
  type: string;
  size: number;
  time: number;
  method: string;
  startedDateTime?: string;
  timings: {
    wait: number;
    receive: number;
  };
}

export interface HarTableProps {
  entries: ParsedHarEntry[];
}

export type FilterType = "All" | "XHR" | "JS" | "CSS" | "Img" | "Media" | "Other" | "Errors";
