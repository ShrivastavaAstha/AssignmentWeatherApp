import React, { useState } from "react";
import Weather from "./Weather";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div className="App">
        <header>
          <button onClick={toggleTheme}>
            {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </button>
        </header>
        <Weather theme={theme} />
      </div>
      <footer
        style={{
          backgroundColor: "#333333",
          color: "white",
          padding: "10px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <p>&copy; 2024 Weather App</p>
      </footer>
    </>
  );
}

export default App;
