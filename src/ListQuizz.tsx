import Quizz, { TQuizz } from "./Quizz";
import data from "./data/atbm.json";
import { useRef, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { useHistory } from "react-router-dom";
import { TInput } from "./DashBoard";

const settings: Settings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function ListQuizz() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [checkAnswer, setCheckAnwser] = useState<boolean>(true);
  const refSlider = useRef<any>();
  const history = useHistory();
  const setting: any = history.location.state;
  const listData = setting.listQuizz.map(
    (item: any) => ({ ...data }[Object.keys(data)[item]])
  );

  return (
    <SApp>
      {currentIndex + 1}/{setting.length}
      <Slider
        ref={refSlider}
        afterChange={(current) => {
          setCurrentIndex(current);
        }}
        {...settings}
      >
        {listData.map((item: any, index: number) => (
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
      {currentIndex + 1 === setting.length && (
        <p>Hết rồi, quay lại để kiểm tra lại hoặc reload trang để làm mới.</p>
      )}
    </SApp>
  );
}

export default ListQuizz;

const SApp = styled.div`
  max-width: 600px;
  width: 100%;
  display: block;
  margin: 0 auto;
`;
