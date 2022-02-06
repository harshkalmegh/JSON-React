import { useState } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Addnew from "../Features/AddNew";
import Edit_data from "../Features/Edit_data";
import Json_React from "../Features/Json_React";
import SignIn from "../Features/SignIn";

function Routing() {
  const [userSignIn, setUserSignIn] = useState(true);

  if (userSignIn === true) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Json_React />} />
          <Route path="/Addnew" element={<Addnew />} />
          <Route path="/:key" element={<Edit_data />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Routing;
