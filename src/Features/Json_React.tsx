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
  const [pagination, setPagination] = useState<any>(0);
  const [end, setEnd] = useState<any>(10);

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
    setPagination(_value);
    setEnd(_value + 10);
  };

  // const _handle_previous = (e: any) => {
  //   const { value } = e.target;
  //   const _value = parseInt(value);
  //   if (pagination > 0) {
  //     setPagination(pagination - _value);
  //     setEnd(end - _value);
  //   }
  // };

  // const _handle_next = (e: any) => {
  //   const { value } = e.target;
  //   const _value = parseInt(value);
  //   if (pagination < 190) {
  //     setPagination(pagination + _value);
  //     setEnd(end + _value);
  //   }
  // };

  return (
    <div>
      {data.slice(pagination, end).map((val: any) => {
        return (
          <div key={val.id} style={{ fontSize: "larger", margin: "8px" }}>
            <span>{val.id}. </span>
            <span>Title : {val.title} </span>
          </div>
        );
      })}
      {/* <button value="10" onClick={_handle_previous}>
        Previous
      </button>
      <button value="10" onClick={_handle_next}>
        Next
      </button> */}
      <button value="0" onClick={_handle}>
        1
      </button>
      <button value="10" onClick={_handle}>
        2
      </button>
      <button value="20" onClick={_handle}>
        3
      </button>
      <button value="30" onClick={_handle}>
        4
      </button>
      <button value="40" onClick={_handle}>
        5
      </button>
      <button value="50" onClick={_handle}>
        6
      </button>
      <button value="60" onClick={_handle}>
        7
      </button>
      <button value="70" onClick={_handle}>
        8
      </button>
      <button value="80" onClick={_handle}>
        9
      </button>
      <button value="90" onClick={_handle}>
        10
      </button>
      <button value="100" onClick={_handle}>
        11
      </button>
      <button value="110" onClick={_handle}>
        12
      </button>
      <button value="120" onClick={_handle}>
        13
      </button>
      <button value="130" onClick={_handle}>
        14
      </button>
      <button value="140" onClick={_handle}>
        15
      </button>
      <button value="150" onClick={_handle}>
        16
      </button>
      <button value="160" onClick={_handle}>
        17
      </button>
      <button value="170" onClick={_handle}>
        18
      </button>
      <button value="180" onClick={_handle}>
        19
      </button>
      <button value="190" onClick={_handle}>
        20
      </button>
    </div>
  );
}

export default Json_React;
