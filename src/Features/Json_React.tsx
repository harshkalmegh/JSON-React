import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetRequest } from "../Utilities/Network";

function Json_React() {
  /**
   * Algorithm
   * 1. maintain a usestate for data initial value as []
   * 2. create a function to fetch data from server using axios
   * 3. pass function in useEffect
   * 4. display the data using map
   */
  const [input, setInput] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const [result, setResult] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetRequest(
        "https://jsonplaceholder.typicode.com/todos"
      );
      let userData = [...response];
      localStorage.setItem("data", JSON.stringify(userData));
      setData(userData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data: any = localStorage.getItem("data");
    const parsedData = JSON.parse(data);
    const output = parsedData.map((val: any) => val.title);
    const newOutput = output.filter(
      (el: any) => el.indexOf(input.toLowerCase()) !== -1
    );
    setResult([...newOutput]);
  }, [input]);

  let newdata: any = localStorage.getItem("data");
  const parsedData = JSON.parse(newdata);

  return (
    <div>
      <div>
        <span>Search : </span>
        <input
          type="text"
          placeholder="Enter Title Here"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      {input
        ? result.map((val: any, key: any) => {
            // console.log(val);
            return (
              <div key={key} style={{ fontSize: "larger", margin: "8px" }}>
                <span>Title : {val} </span>
                <button
                  onClick={() => {
                    setInput(val);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    data.splice(key, 1);
                    setData([...data]);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })
        : parsedData.map((val: any, key: any) => {
            return (
              <div key={key} style={{ fontSize: "larger", margin: "8px" }}>
                <span>Title : {val.title} </span>
                <Link to={`/${key}`}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => {
                    parsedData.splice(key, 1);
                    const _data = [...parsedData];
                    localStorage.setItem("data", JSON.stringify(_data));
                    // console.log(parsedData);

                    // setData([...data]);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
    </div>
  );
}

export default Json_React;
