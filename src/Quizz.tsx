import styled from "styled-components";
import slugify from "slugify";
import { useState } from "react";

export type TQuizz = {
  index: number;
  id: string;
  question: string;
  answers: string[];
  correct: number;
  note?: string;
};
export interface Props {
  data: TQuizz;
  index: number;
  currentIndex: number;
  checkAnswer: boolean;
  onChoice: (index: number) => void; // pick one ans
}

export default function Quizz(props: Props) {
  const { data, checkAnswer, index, currentIndex, onChoice } = props;
  const [check, setCheck] = useState(false);
  console.log("props", props);

  return (
    <SQuizz className={`${currentIndex === index ? "active" : "hidden"}`}>
    { data ? <> <h2 className="question">
        {Number(data.index) + 1}. {data.question}
      </h2>
      <ul className="answers">
        {data.answers.map((item, index) => {
          return (
            <li
              className="item"
              key={slugify(`${data.question}__${index}`)}
              onClick={() => {
                if (index === data.correct) setCheck(true);
                else setCheck(false);
              }}
            >
              <label
                className={`${
                  check && data.correct === index ? "correct" : ""
                }`}
              >
                <input
                  type="radio"
                  name={slugify(data.question)}
                  value={index}
                />{" "}
                <p className="item-text">{item}</p>
              </label>
            </li>
          );
        })}
      </ul>
      {check && data?.note && (
        <p className="note">
          Note: <br />
          {data?.note}
        </p>
      )}</> : "chuwa cos gi"  }  </SQuizz>
  );
}

const SQuizz = styled.div`
  max-width: 100%;
  width: 100%;
  position: relative;
  .question {
    padding: 0 24px;
  }
  .note {
    padding: 0 24px;
    text-transform: capitalize;
  }
  ul {
    list-style: none;
    padding-right: 12px;
    li {
      label {
        &.correct {
          color: green;
          text-shadow: 1px 0 1px green;
        }
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;

        input[type="radio"] {
          margin-right: 12px;
        }
      }
    }
  }
`;
