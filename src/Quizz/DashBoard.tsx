import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

enum TSubject {
  atbm = "atbm",
  mmt = "mmt",
}

export type TInput = {
  subject: TSubject;
  type: "stt" | "random";
  length: number | string;
  startAt?: number | string;
  [key: string]: any;
};

const DataInfo: {
  [key: string]: any;
} = {
  atbm: {
    size: 297,
  },
  mmt: {
    size: 296,
  },
};

type TRandomList = {
  size: number;
  maxSize: number;
  random: boolean;
  startAt: number;
};

const genList = ({ size, maxSize, random, startAt }: TRandomList) => {
  if (random) {
    let arr = [];
    while (arr.length < size) {
      let r = Math.floor(Math.random() * maxSize) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }
  return Array.from({ length: size }, (_, index) => startAt + index);
};

export default function DashBoard() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const onSumit = (data: TInput) => {
    const listQuizz = genList({
      size: Number(data.length),
      maxSize: DataInfo[data.subject].size,
      random: data.type === "random",
      startAt: Number(data?.startAt || 1),
    });

    localStorage.setItem(
      "quizz",
      JSON.stringify({
        ...data,
        listQuizz: listQuizz,
      })
    );
    history.push("/quizz");
  };

  return (
    <SDashBoard>
      <div className="header">
        <h2>Ptit Quizz</h2>
      </div>
      <div className="body">
        <form onSubmit={handleSubmit(onSumit)}>
          <div className="item">
            <p className="item__title">Môn</p>
            <div className="item__input">
              <label>
                <input
                  type="radio"
                  value={TSubject.atbm}
                  {...register("subject", { required: true })}
                />
                An toàn bảo mật
              </label>
              <label>
                <input
                  type="radio"
                  value={TSubject.mmt}
                  {...register("subject", { required: true })}
                />
                Mạng máy tính
              </label>
            </div>
          </div>

          {watch("subject") && (
            <>
              <div className="item">
                <p className="item__title">
                  Số câu:{" "}
                  <span style={{ color: "red" }}>{watch("length") || 30}</span>
                </p>
                <div className="item__input">
                  <input
                    style={{ width: "100%" }}
                    type="range"
                    defaultValue={30}
                    min={10}
                    max={
                      watch("subject") ? DataInfo[watch("subject")].size : 100
                    }
                    {...register("length", { required: true })}
                  />
                </div>
              </div>

              <div className="item">
                <p className="item__title">Hình thức</p>
                <div className="item__input">
                  <label>
                    <input
                      type="radio"
                      value="stt"
                      {...register("type", { required: true })}
                    />
                    Theo thứ tự
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="random"
                      {...register("type", { required: true })}
                    />
                    random
                  </label>
                </div>
              </div>

              {watch("type") === "stt" && (
                <div className="item">
                  <p className="item__title">
                    Bắt đầu từ câu:{" "}
                    <span style={{ color: "red" }}>
                      {watch("startAt") || 1}
                    </span>
                  </p>
                  <div className="item__input">
                    <input
                      style={{ width: "100%" }}
                      type="range"
                      defaultValue={1}
                      min={1}
                      max={
                        watch("subject")
                          ? DataInfo[watch("subject")].size -
                            Number(watch("length"))
                          : 100
                      }
                      {...register("startAt", {
                        required: watch("type") === "stt",
                      })}
                    />
                  </div>
                </div>
              )}
              {Object.keys(errors).length > 0 && (
                <p style={{ color: "red" }}> Chưa chọn đủ </p>
              )}
              <button type="submit">Bắt đầu</button>
            </>
          )}
        </form>
      </div>
    </SDashBoard>
  );
}

const SDashBoard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;

  .item__input {
    display: flex;
    justify-content: space-evenly;
  }

  p.item__title {
    font-weight: 600;
  }

  button {
    padding: 6px 12px;
    display: block;
    margin: 32px auto;
    width: 100%;
  }

  input,
  label,
  button {
    cursor: pointer;
    user-select: none;
    text-transform: capitalize;
  }
`;
