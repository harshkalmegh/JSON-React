import { useEffect, useState } from "react";
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
  const [key, setKey] = useState<any>(0);

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

  useEffect(() => {
    const output = data.map((val: any) => val.title);
    const newOutput = output.filter(
      (el: any) => el.indexOf(input.toLowerCase()) !== -1
    );
    console.log(newOutput);

    setResult([...newOutput]);
    console.log(result);
  }, [input]);

  // console.log("@@RENDER");
  return (
    <div>
      <div>
        <span>Search : </span>
        <input
          type="text"
          placeholder="Enter Title Here"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const _data = [...data];
            _data[key].title = input;
            setData(_data);
          }}
        >
          Submit
        </button>
      </div>
      {
        // input
        // ? result.map((val: any, key: any) => {
        //     return (
        //       <div key={key} style={{ fontSize: "larger", margin: "8px" }}>
        //         <span>Title : {val.title} </span>
        //         <button
        //           onClick={() => {
        //             setInput(val.title);
        //             setKey(key);
        //           }}
        //         >
        //           Edit
        //         </button>
        //         <button
        //           onClick={() => {
        //             data.splice(key, 1);
        //             setData([...data]);
        //           }}
        //         >
        //           Delete
        //         </button>
        //       </div>
        //     );
        //   })
        // :
        data.map((val: any, key: any) => {
          return (
            <div key={key} style={{ fontSize: "larger", margin: "8px" }}>
              <span>Title : {val.title} </span>
              <button
                onClick={() => {
                  setInput(val.title);
                  setKey(key);
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
      }
    </div>
  );
}

export default Json_React;
