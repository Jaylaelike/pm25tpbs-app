import "./App.css";
import React, { useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";

const options = ["NOC", "chumphon"];
// import keys from "./keys";

// const api = {
//   key: keys.API_KEY,
//   base: keys.BASE_URL,
// };

// function App() {
//   const dateBuild = (d) => {
//     let date = String(new window.Date());
//     date = date.slice(3, 15);
//     return date;
//   };

// const [query, setQuery] = useState("");
// const [results, setWeather] = useState({});

// const search = (e) => {
//   if (e.key === "Enter") {
//     fetch(
//       `http://192.168.1.18:8086/query?pretty=true&db=pm_dht_map_data&q=SELECT%20%22pm2p5%22,%22pm10%22,%22temp%22,%22humid%22,%22name%22%20FROM%20%22deviceD%22%20%20WHERE%20%22name%22%20=%20%27${query}%27%20GROUP%20BY%20*%20ORDER%20BY%20DESC%20LIMIT%201`
//     )
//       .then((res) => res.json())
//       .then((result) => {
//         setQuery("");
//         setWeather(result);
//         console.log(result);
//       });
//   }
// };

function App() {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [results, setWeather] = useState({});

  const fetchData = async (e) => {
    const response = await axios.get(
      `https://apidata.pm25vipa.tk/query?pretty=true&db=pm_dht_map_data&q=SELECT%20%22pm2p5%22,%22pm10%22,%22temp%22,%22humid%22,%22name%22%20FROM%20%22databaseall%22%20%20WHERE%20%22name%22%20=%20%27${query}%27%20GROUP%20BY%20*%20ORDER%20BY%20DESC%20LIMIT%201`
    );

    setWeather(response.data.results[0]);
    console.log(response.data.results[0]);
  };

  // const [query, setQuery] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  return (
    // Condition ? Result : Condition ? Result :
    // Condition ? Result : end
    <div
      className={
        typeof results.series !== "undefined"
          ? results.series[0].values[0][3] > 30
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
      <main>
        <div className="search-container">
          <div>
            {/* <div>{`value: ${query !== null ? `'${query}'` : "null"}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div> */}
            <br />
            <Autocomplete
              onKeyPress={fetchData}
              // onChange={(e) => setQuery(e.target.value)}
              // value={query}
              onChange={(event, newValue) => {
                setQuery(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="กรุณาเลือกสถานี" />
              )}
            />

            <br />
            <div>
              <Button variant="outlined" onClick={fetchData}>
                Search{" "}
              </Button>
            </div>
          </div>
        </div>

        {typeof results.series !== "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">{results.series[0].values[0][5]}</div>
              <div className="date"> {dateBuild(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                {results.series[0].values[0][1]}
                <br></br>
                µg./m3
              </div>
              <div className="weather">{results.series[0].values[0][3]} °C</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
