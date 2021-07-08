import Quizz, { TQuizz } from "./Quizz";
import data from "./data/atbm.json";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { useHistory } from "react-router-dom";
import { TInput } from "./DashBoard";
import TotalCheck from "./TotalCheck";

const settings: Settings = {
  dots: true,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function ListQuizz() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [setup, setSetUp] = useState<TInput>();

  const refSlider = useRef<any>();
  const history = useHistory();

  useEffect(() => {
    // user setup
    const setupProps: any = history.location.state;
    const listData = setupProps?.listQuizz.map(
      (item: any) => ({ ...data }[Object.keys(data)[item]])
    );
    setSetUp({ ...setupProps, listData: listData });

    localStorage.setItem(
      "quizz-current",
      JSON.stringify({
        ...setupProps,
        listAnswer: Array.from({ length: setupProps.length }),
      })
    );
  }, [history]);

  const onChoice = (ans: number, quizz: number) => {
    const stateData = localStorage.getItem("quizz-current");

    if (stateData) {
      const paser = JSON.parse(stateData);
      // console.log("paser", paser);
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

  return (
    <SApp>
      {setup && (
        <>
          {currentIndex + 1 <= setup?.length
            ? `${currentIndex + 1}/${setup?.length}`
            : "Total Check"}
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
                />
              ))}
              <TotalCheck />
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
