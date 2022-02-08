import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Addnew() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

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

  const _handleAddNew = () => {
    const data: any = localStorage.getItem("data");
    const parsedData = JSON.parse(data);
    // console.log(parsedData);
    parsedData.unshift({ title: value });
    localStorage.setItem("data", JSON.stringify(parsedData));
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
      <button onClick={_handleAddNew}>Add New</button>
    </div>
  );
}
export default Addnew;
