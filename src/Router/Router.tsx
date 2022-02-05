import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Edit_data from "../Features/Edit_data";
import Json_React from "../Features/Json_React";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Json_React />} />
        <Route path="/:key" element={<Edit_data />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
