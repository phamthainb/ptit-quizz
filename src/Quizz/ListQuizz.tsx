import Quizz, { TQuizz } from "./Quizz";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { useHistory } from "react-router-dom";
import { TInput } from "./DashBoard";
// import TotalCheck from "./TotalCheck";

//data
import atbm from "../data/atbm.json";
import mmt from "../data/mmt.json";

const data: any = {
  atbm: atbm,
  mmt: mmt,
};

const settings: Settings = {
  dots: false,
  infinite: false,
  arrows: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <span>nextArrow</span>,
  prevArrow: <span>prevArrow</span>,
};

function ListQuizz() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [setup, setSetUp] = useState<TInput>();
  const [correct, setTimerCorrect] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const refSlider = useRef<any>();
  const history = useHistory();

  useEffect(() => {
    // user setup
    const getLocal = localStorage.getItem("quizz");
    if (getLocal) {
      const setupProps: any = JSON.parse(getLocal);
      // console.log("setupProps", setupProps);

      const listData = setupProps?.listQuizz.map(
        (item: any) =>
          ({ ...data[setupProps.subject] }[
            Object.keys(data[setupProps.subject])[item - 1]
          ])
      );
      setSetUp({ ...setupProps, listData: listData });

      localStorage.setItem(
        "quizz-current",
        JSON.stringify({
          ...setupProps,
          listAnswer: Array.from({ length: setupProps.length }),
        })
      );
    }
  }, [history]);

  const onChoice = (ans: number, quizz: number) => {
    const stateData = localStorage.getItem("quizz-current");

    if (stateData) {
      const paser = JSON.parse(stateData);
      let k = paser.listAnswer;
      k.splice(quizz, 1, ans);

      localStorage.setItem(
        "quizz-current",
        JSON.stringify({
          ...paser,
          listAnswer: k,
        })
      );
    }
  };
  // console.log("setup", setup);

  useEffect(() => {
    setInterval(() => {
      setTimer((pre) => pre + 1);
    }, 1000);
  }, []);

  return (
    <SApp>
      {setup && (
        <>
          <div
            className="head"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="list">
              {currentIndex + 1 <= setup?.length
                ? `${currentIndex + 1}/${setup?.length}`
                : "Total Check"}
            </div>
            <div className="time-total">
              {Math.floor(timer / 60)} : {timer - Math.floor(timer / 60) * 60}s
            </div>
            <div
              className="check"
              style={{ color: "green" }}
            >{`${correct}/${setup?.length}`}</div>
          </div>
          <br />
          {setup?.listData ? (
            <Slider
              ref={refSlider}
              afterChange={(current) => {
                setCurrentIndex(current);
              }}
              {...settings}
            >
              {setup?.listData.map((item: any, index: number) => (
                <Quizz
                  key={item?.id}
                  index={index}
                  currentIndex={currentIndex}
                  data={item as TQuizz}
                  onChoice={(ans) => {
                    onChoice(ans, index);
                  }}
                  setTimerCorrect={setTimerCorrect}
                />
              ))}
              {/* <TotalCheck /> */}
            </Slider>
          ) : (
            "Nothing here."
          )}
          {currentIndex + 1 === setup?.length && (
            <p>
              Hết rồi, quay lại để kiểm tra lại hoặc reload trang để làm mới.
            </p>
          )}
        </>
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
