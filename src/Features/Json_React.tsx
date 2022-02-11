import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetRequest } from "../Utilities/Network";
import { getAuth, signOut } from "firebase/auth";
import data from "../Context";

function Json_React() {
  /**
   * Algorithm
   * 1. maintain a usestate for data initial value as []
   * 2. create a function to fetch data from server using axios
   * 3. pass function in useEffect
   * 4. display the data using map
   */

  const [input, setInput] = useState<any>("");
  // const [data, setData] = useState<any>([]);
  const [result, setResult] = useState<any>([]);
  const [page, setPage] = useState<any>(10);
  const navigate = useNavigate();
  const newContextData = useContext(data);

  useEffect(() => {
    const cookie: any = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce(
        (accumulator, [key, value]) => ({
          ...accumulator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );

    if (!cookie.name) {
      navigate("/signin");
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      const newData: any = localStorage.getItem("data");
      const parsedNewData = JSON.parse(newData);

      if (!parsedNewData || parsedNewData.length === 0) {
        const response = await GetRequest(
          "https://jsonplaceholder.typicode.com/todos"
        );
        let userData = [...response];
        // setData(userData);
        localStorage.setItem("data", JSON.stringify(userData));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data: any = localStorage.getItem(newContextData);
    const parsedData = JSON.parse(data);
    const output = parsedData.map((val: any) => val.title);
    const newOutput = output.filter(
      (el: any) => el.indexOf(input.toLowerCase()) !== -1
    );
    setResult([...newOutput]);
  }, [input]);

  const _handle = (e: any) => {
    const { value } = e.target;
    const _value = parseInt(value);
    console.log("_value", _value);
    setPage(_value);
  };

  let newdata: any = localStorage.getItem(newContextData);
  const parsedData = JSON.parse(newdata);

  // const emptyArr: any = [];
  // for (let i = 1; i <= Math.ceil(parsedData.length / page); i++) {
  //   emptyArr.push(i);
  // }

  const _handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        document.cookie = "name=harsh; max-age = -60";
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={_handleSignOut}>Sign Out</button>
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
        : !parsedData
        ? []
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
                    localStorage.setItem(
                      newContextData,
                      JSON.stringify(parsedData)
                    );
                    navigate("/");
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
      {/* {emptyArr.map((key: any) => {
        return (
          <button key={key} value={key} onClick={_handle}>
            {key}
          </button>
        );
      })} */}

      {/* <button value="10" onClick={_handle}>
        1
      </button>
      <button value="20" onClick={_handle}>
        2
      </button>
      <button value="30" onClick={_handle}>
        3
      </button>
      <button value="40" onClick={_handle}>
        4
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
      </button> */}
    </div>
  );
}

export default Json_React;
