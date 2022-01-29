import React, { useEffect, useState } from "react";
import { GetRequest } from "../Utilities/Network";

function Json_React() {
  /**
   * Algorithm
   * 1. maintain a usestate for data initial value as []
   * 2. create a function to fetch data from server using axios
   * 3. pass function in useEffect
   * 4. display the data using map
   */
  const [data, setData] = useState<any>([]);
  const [pagination, setPagination] = useState<any>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetRequest(
        "https://jsonplaceholder.typicode.com/todos"
      );
      let userData = [...response.splice(pagination, 10)];
      setData(userData);
    };
    fetchData();
  }, [pagination]);

  return (
    <div>
      {data.map((val: any) => {
        return (
          <div key={val.id} style={{ fontSize: "larger", margin: "8px" }}>
            <span>{val.id}. </span>
            <span>Title : {val.title} </span>
          </div>
        );
      })}
      <button
        onClick={() => {
          setPagination(0);
        }}
      >
        1
      </button>
      <button
        onClick={() => {
          setPagination(10);
        }}
      >
        2
      </button>
      <button
        onClick={() => {
          setPagination(20);
        }}
      >
        3
      </button>
      <button
        onClick={() => {
          setPagination(30);
        }}
      >
        4
      </button>
      <button
        onClick={() => {
          setPagination(40);
        }}
      >
        5
      </button>
      <button
        onClick={() => {
          setPagination(50);
        }}
      >
        6
      </button>
      <button
        onClick={() => {
          setPagination(60);
        }}
      >
        7
      </button>
      <button
        onClick={() => {
          setPagination(70);
        }}
      >
        8
      </button>
      <button
        onClick={() => {
          setPagination(80);
        }}
      >
        9
      </button>
      <button
        onClick={() => {
          setPagination(90);
        }}
      >
        10
      </button>
      <button
        onClick={() => {
          setPagination(100);
        }}
      >
        11
      </button>
      <button
        onClick={() => {
          setPagination(110);
        }}
      >
        12
      </button>
      <button
        onClick={() => {
          setPagination(120);
        }}
      >
        13
      </button>
      <button
        onClick={() => {
          setPagination(130);
        }}
      >
        14
      </button>
      <button
        onClick={() => {
          setPagination(140);
        }}
      >
        15
      </button>
      <button
        onClick={() => {
          setPagination(150);
        }}
      >
        16
      </button>
      <button
        onClick={() => {
          setPagination(160);
        }}
      >
        17
      </button>
      <button
        onClick={() => {
          setPagination(170);
        }}
      >
        18
      </button>
      <button
        onClick={() => {
          setPagination(180);
        }}
      >
        19
      </button>
      <button
        onClick={() => {
          setPagination(190);
        }}
      >
        20
      </button>
    </div>
  );
}

export default Json_React;
