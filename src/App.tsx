import Quizz from "./Quizz";
import data from "./data/atbm.json";
import { useState } from "react";
import styled from "styled-components";

const list = [0, 1, 2, 4, 7, 23];
// uuid
// index

type userData = {
  list: {
    [key: number]: {
      correct: number;
      choice: number | null;
    };
  };
  totalTime: number;
  workTime: number;
  score: number;
  totalQuizz: number;
};

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [userData, setUserData] = useState<{
    [key: number]: {
      choice: number | null;
    };
  }>();

  const onNext = () => {
    currentIndex < list.length - 1 && setCurrentIndex(currentIndex + 1);
  };

  const onPrev = () => {
    currentIndex > 1 && setCurrentIndex(currentIndex - 1);
  };
  console.log("userData", userData);

  return (
    <SApp>
      <Quizz
        data={data[list[currentIndex]]}
        onChoice={(ans) => {
          setUserData({
            ...userData,
            [currentIndex]: {
              choice: ans,
            },
          });
        }}
      />
      <div className="handle">
        {currentIndex > 1 && (
          <button
            onClick={() => {
              onPrev();
            }}
          >
            Quay xe
          </button>
        )}
        {currentIndex < list.length - 1 && (
          <button
            onClick={() => {
              onNext();
            }}
          >
            Chiến tiếp
          </button>
        )}
      </div>
    </SApp>
  );
}

export default App;

const SApp = styled.div`
  .handle {
    display: flex;
    justify-content: space-between;
  }
`;
