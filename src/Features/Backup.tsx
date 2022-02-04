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
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [page] = useState<any>(10);

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

  // Version 1
  const _handle = (e: any) => {
    const { value } = e.target;
    const _value = parseInt(value);
    setCurrentPage(_value);
  };

  const last = currentPage * page;
  const first = last - page;
  const currentData = data.slice(first, last);

  // setCurrent(data.slice(first, last));

  // const __handle = (e: any) => {
  //   setCurrent(currentData);
  // };

  const _handle_previous = (e: any) => {
    const { value } = e.target;
    const _value = parseInt(value);
    if (currentPage > 1) {
      setCurrentPage(currentPage - _value);
    }
  };

  const _handle_next = (e: any) => {
    const { value } = e.target;
    const _value = parseInt(value);
    if (currentPage < Math.ceil(data.length / page)) {
      setCurrentPage(currentPage + _value);
    }
  };

  const emptyArr: any = [];
  for (let i = 1; i <= Math.ceil(data.length / page); i++) {
    emptyArr.push(i);
  }

  const output = data.map((val: any) => val.title);
  const result = output.filter(
    (el: any) => el.indexOf(input.toLowerCase()) !== -1
  );

  const last1 = currentPage * page;
  const first1 = last1 - page;
  const current1 = result.slice(first1, last1);

  // setCurrent(current1);

  const newArr: any = [];
  for (let i = 1; i <= Math.ceil(result.length / page); i++) {
    newArr.push(i);
  }

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
        ? current1.map((val: any, key: any) => {
            return (
              <div key={key} style={{ fontSize: "larger", margin: "8px" }}>
                <span>Title : {val} </span>
              </div>
            );
          })
        : currentData.map((val: any) => {
            return (
              <div key={val.id} style={{ fontSize: "larger", margin: "8px" }}>
                <span>{val.id}. </span>
                <span>Title : {val.title} </span>
              </div>
            );
          })}
      {!input ? (
        <button value="1" onClick={_handle_previous}>
          Previous
        </button>
      ) : null}

      {!input
        ? emptyArr.map((key: any) => {
            return (
              <button key={key} value={key} onClick={_handle}>
                {key}
              </button>
            );
          })
        : newArr.map((key: any) => {
            return (
              <button key={key} value={key} onClick={_handle}>
                {key}
              </button>
            );
          })}
      {!input ? (
        <button value="1" onClick={_handle_next}>
          Next
        </button>
      ) : null}
    </div>
  );
}

export default Json_React;
