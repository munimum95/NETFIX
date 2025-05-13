const Guide = () => {
  return (
    <div className="text-sm text-gray-600 leading-relaxed text-center space-y-2">
      <p>
        <strong>HAR 파일</strong>은 웹 브라우저의 네트워크 요청을 기록한 파일로, <br />
        페이지 로딩 문제나 API 오류 분석에 사용됩니다.
      </p>
      <p>
        크롬 개발자 도구(Network 탭)에서 저장할 수 있으며, 오류 상황을 재현한 뒤
        <strong>"HAR로 저장" 혹은 상단에 다운로드 아이콘을 눌러주세요</strong>
      </p>
    </div>
  );
};

export default Guide;
