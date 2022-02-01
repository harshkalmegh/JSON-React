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
  const current = data.slice(first, last);

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
    if (currentPage < data.length / 10) {
      setCurrentPage(currentPage + _value);
    }
  };

  const emptyArr: any = [];
  for (let i = 1; i <= data.length / page; i++) {
    emptyArr.push(i);
    console.log(emptyArr);
  }

  return (
    <div>
      {current.map((val: any) => {
        return (
          <div key={val.id} style={{ fontSize: "larger", margin: "8px" }}>
            <span>{val.id}. </span>
            <span>Title : {val.title} </span>
          </div>
        );
      })}
      <button value="1" onClick={_handle_previous}>
        Previous
      </button>
      {emptyArr.map((key: any) => {
        for (let i = 0; i < data.length / page; i++) {
          return (
            <button key={key} value={key} onClick={_handle}>
              {key}
            </button>
          );
        }
      })}
      <button value="1" onClick={_handle_next}>
        Next
      </button>
    </div>
  );
}

export default Json_React;
