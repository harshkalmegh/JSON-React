import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import data from "../Context";

function Edit_data() {
  const [value, setValue] = useState("");
  const params: any = useParams();
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
    function setData() {
      const data: any = localStorage.getItem(newContextData);
      const parsedData = JSON.parse(data);
      const title = parsedData[params.key].title;
      setValue(title);
    }
    setData();
  }, []);

  const _handleSubmit = () => {
    const data: any = localStorage.getItem(newContextData);
    const parsedData = JSON.parse(data);
    const _data = [...parsedData];
    _data[params.key].title = value;
    localStorage.setItem(newContextData, JSON.stringify(_data));
    navigate("/");
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e: any) => {
          setValue(e.target.value);
        }}
        value={value}
        style={{ width: "300px", height: "100px" }}
      />
      <button onClick={_handleSubmit}>Submit</button>
    </div>
  );
}

export default Edit_data;
