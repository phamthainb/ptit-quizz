import Quizz, { TQuizz } from "./Quizz";
import data from "./data/atbm.json";
import { useRef, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";

const ramdomList = (size: number) => {
  let arr = [];
  while (arr.length < size) {
    let r = Math.floor(Math.random() * 297) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

const list = ramdomList(30);
// uuid
// index
const listData = list.map((item) => ({ ...data }[Object.keys(data)[item]]));

const settings: Settings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [checkAnswer, setCheckAnwser] = useState<boolean>(true);
  const refSlider = useRef<any>();
  // console.log("listData", listData);

  return (
    <SApp>
      {currentIndex + 1}/{list.length}
      <Slider
        ref={refSlider}
        afterChange={(current) => {
          setCurrentIndex(current);
        }}
        {...settings}
      >
        {listData.map((item, index) => (
          <Quizz
            key={item?.id}
            index={index}
            currentIndex={currentIndex}
            checkAnswer={checkAnswer}
            data={item as TQuizz}
            onChoice={(ans) => {}}
          />
        ))}
      </Slider>
      {currentIndex + 1 === list.length && (
        <p>Hết rồi, quay lại để kiểm tra lại hoặc reload trang để làm mới.</p>
      )}
      {/* <button
          style={{ position: "fixed", bottom: 0 }}
          onClick={() => {
            setCheckAnwser(true);
            refSlider.current.slickGoTo(0);
          }}
        >
          Tính điểm
        </button> */}
    </SApp>
  );
}

export default App;

const SApp = styled.div`
  max-width: 600px;
  width: 100%;
  display: block;
  margin: 0 auto;
  /* padding: 32px; */
`;
