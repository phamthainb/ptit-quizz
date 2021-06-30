import styled from "styled-components";
import slugify from "slugify";
export interface Props {
  data: {
    question: string;
    answers: string[];
    correct: number;
  };
  onChoice: (index: number) => void; // pick one ans
}

export default function Quizz({ data, onChoice }: Props) {
  return (
    <SQuizz>
      <h2 className="question">{data.question}</h2>
      <ul className="answers">
        {data.answers.map((item, index) => (
          <li
            className="item"
            key={slugify(`${data.question}__${index}`)}
            onClick={() => {
              onChoice(index);
            }}
          >
            <label>
              <input type="radio" name={slugify(data.question)} value={index} />{" "}
              <p className="item-text">{item}</p>
            </label>
          </li>
        ))}
      </ul>
    </SQuizz>
  );
}

const SQuizz = styled.div`
  max-width: 600px;
  display: block;
  margin: 0 auto;
  padding: 12px;

  ul {
    list-style: none;
    li {
      label {
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
