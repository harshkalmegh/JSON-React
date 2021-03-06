import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Addnew from "../Features/AddNew";
import Edit_data from "../Features/Edit_data";
import Json_React from "../Features/Json_React";
import SignIn from "../Features/SignIn";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Json_React />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Addnew" element={<Addnew />} />
        <Route path="/:key" element={<Edit_data />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
