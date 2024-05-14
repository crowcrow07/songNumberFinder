import { searchKeywordType } from "@/app/recoil/atom/atom";
import { useSetRecoilState } from "recoil";

export default function Overlay() {
  const setSearchKeyword = useSetRecoilState(searchKeywordType);

  const signInbutton = () => {
    setSearchKeyword("title");
  };
  const signUpbutton = () => {
    setSearchKeyword("singer");
  };

  return (
    <div className="overlay-container text-white min-h-[660px]">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1 className="font-bold text-[2rem] text-white">
            당신의 애창곡 노래방에 있을까요?
          </h1>
          <p className="text-[14px] text-white mt-[20px] mb-[30px]">
            제목으로 노래를 찾고 싶으시면 아래 버튼을 눌러주세요
          </p>
          <button
            onClick={signInbutton}
            className="ghost border-white border-[1px] border-solid px-[45px] py-[12px] rounded-[20px] text-white"
            id="signIn"
          >
            제목 검색 하러가기
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1 className="font-bold text-[2rem] text-white">
            TJ와 KY를 한번에 조회 해드려요
          </h1>
          <p className="text-[14px] text-white mt-[20px] mb-[30px]">
            가수 이름으로 노래를 찾고 싶으시면 아래 버튼을 눌러주세요
          </p>
          <button
            onClick={signUpbutton}
            className="ghost border-white border-[1px] border-solid px-[45px] py-[12px] rounded-[20px] text-white"
            id="signUp"
          >
            가수 검색 하러가기
          </button>
        </div>
      </div>
    </div>
  );
}
