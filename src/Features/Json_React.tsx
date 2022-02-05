import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const newData: any = localStorage.getItem("data");
      const parsedNewData = JSON.parse(newData);
      if (!parsedNewData || parsedNewData.length === 0) {
        const response = await GetRequest(
          "https://jsonplaceholder.typicode.com/todos"
        );
        let userData = [...response];
        setData(userData);
        localStorage.setItem("data", JSON.stringify(userData));
      }
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
        <br />
        <button
          onClick={() => {
            navigate("/Addnew");
          }}
        >
          Add New
        </button>
      </div>
      {input
        ? result.map((val: any, key: any) => {
            // console.log(val);
            return (
              <div key={key} style={{ fontSize: "larger", margin: "8px" }}>
                <span>Title : {val} </span>
                {/* {console.log(key)} */}

                <Link to={`/${key}`}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => {
                    result.splice(key, 1);
                    setResult([...result]);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })
        : parsedData.slice(0, 10).map((val: any, key: any) => {
            return (
              <div key={key} style={{ fontSize: "larger", margin: "8px" }}>
                <span>Title : {val.title} </span>
                <Link to={`/${key}`}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => {
                    parsedData.splice(key, 1);
                    localStorage.setItem("data", JSON.stringify(parsedData));
                    navigate("/");
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
