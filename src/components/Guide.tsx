import { DownloadIcon } from "lucide-react";

const Guide = () => {
  return (
    <section className="text-sm text-gray-600 leading-relaxed  space-y-2">
      <h2 className="text-xl font-semibold mb-2">HAR 파일이란?</h2>
      <p>
        HAR(HTTP Archive format) 파일은 웹 브라우저의 네트워크 요청을 기록한 파일로, <br />
        페이지 로딩 문제나 API 오류 분석에 사용됩니다.
      </p>
      <h2 className="text-xl font-semibold mb-2">HAR 파일을 만드는 방법</h2>
      <ol className="list-decimal list-inside space-y-2  leading-relaxed">
        <li>네트워크 분석이 필요한 웹 페이지로 접속합니다.</li>
        <li>개발자 도구 실행 후 네트워크 탭을 선택합니다.</li>
        <li>이슈가 되었던 문제를 재현합니다.</li>
        <li>
          완료되면 상단에 있는
          <span className="inline-flex items-center font-semibold text-gray-800">
            <DownloadIcon className="w-4 h-4 mr-1" />
            다운로드 아이콘
          </span>
          을 눌러 저장하세요.
        </li>
      </ol>
    </section>
  );
};

export default Guide;
