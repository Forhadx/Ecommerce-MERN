import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => {
        //console.log("cat: ", res);
        console.log("cat2: ", res.data.products[0].allProducts);
        setArr(res.data.products[0].allProducts)
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("p: ", arr);
  return (
    <div className="App">
      <h1>hello</h1>
    </div>
  );
};

export default App;
