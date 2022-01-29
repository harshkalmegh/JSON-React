import React, { useEffect, useState } from "react";
import { GetRequest } from "../Utilities/Network";

function Json_React() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetRequest(
        "https://jsonplaceholder.typicode.com/todos"
      );

      let userData = [...response];

      setData(userData);
    };

    fetchData();
  }, []);

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
    </div>
  );
}

export default Json_React;
