import React, { useState } from "react";
import "./Day8.scss";
import { Link } from "react-router-dom";
import { generateColorScheme } from "../../services/ColorSchemeService";

const Day8 = () => {
  const [selectedColor, SetselectedColor] = useState("#8f8fe6");
  const [selectedMode, SetselectedMode] = useState("");
  const [colorScheme, setColorScheme] = useState([]);

  const handleColor = (e) => {
    e.preventDefault();
    SetselectedColor(e.target.value);
    console.log(e.target.value);
  };
  const handleMode = (e) => {
    e.preventDefault();
    SetselectedMode(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedColor || selectedColor[0] !== "#") {
      console.error("Invalid color selected");
      return;
    }

    console.log(selectedColor);
    const colorcode = selectedColor.slice(1, 7);

    const fetchColorScheme = async () => {
      console.log(colorcode, "colorcode");
      try {
        const response = await generateColorScheme(colorcode, selectedMode);
        setColorScheme(response.colors);
        console.log("ColorScheme", response.colors);
      } catch (error) {
        console.error("Error in Axios Color API call", error);
      }
    };
    fetchColorScheme();
  };
  return (
    <div
      className="color-pick"
      style={{
        backgroundColor: `${selectedColor}`,
      }}
    >
      <div className="todo__box1">
        <p className="todo__title">
          <Link to="/">Back</Link>
        </p>
        <div className="todo__title">Color Picker</div>
      </div>
      <div className="color-pick__container">
        <div className="color-pick__container1">
          <label className="recipe__label" htmlFor="choose">
            Choose Your Color&nbsp;
            <input
              type="color"
              name="choose-color"
              id="choose"
              value={selectedColor}
              onChange={handleColor}
            />
          </label>
          <label className="recipe__label" htmlFor="scheme">
            Choose Your Color Scheme &nbsp;
            <select
              name="mode"
              id="scheme"
              value={selectedMode}
              onChange={handleMode}
              className="color__select"
            >
              <option value="monochrome">Monochrome</option>
              <option value="monochrome-light">Light Monochrome</option>
              <option value="monochrome-dark">Dark Monochrome</option>
              <option value="analogic">Analogic</option>
              <option value="complement">Complement</option>
              <option value="analogic-complement">Analogic Compliment</option>
              <option value="triad">Triad</option>
              <option value="Quad">Quad</option>
            </select>
          </label>
          <button className="recipe__button" onClick={handleSubmit}>
            Generate
          </button>
        </div>
        <div className="color-scheme">
          {colorScheme.length > 0 && (
            <div className="color-scheme__container">
              {colorScheme.map((color, index) => (
                <div
                  key={index}
                  className="color-scheme__color"
                  style={{
                    backgroundColor: `${color.hex.value}`, 
                  }}
                >
                  <p>{color.hex.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Day8;
