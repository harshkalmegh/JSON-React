import React, { useState } from "react";
import data from "../Context";
import Routing from "../Router/Router";

function MainFile() {
  const [contextData, setcontextData] = useState("+918085657070");

  const value = { contextData, setcontextData };

  console.log(value.contextData);

  return (
    <div>
      <data.Provider value={value.contextData}>
        <Routing />
      </data.Provider>
    </div>
  );
}

export default MainFile;
