import React, { useState } from "react";
import "./Day9.scss";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

const Day9 = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [hibpStatus, setHibpStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, SetShowPassword] = useState(false);

  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });

  const handlepwd = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
    if (newPassword.length >= 8) {
      checkIfPasswordBreached(newPassword);
    } else {
      setHibpStatus(null);
    }
  };

  const checkPasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const upperCaseCriteria = /[A-Z]/.test(password);
    const lowerCaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const specialCharacterCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setCriteria({
      length: lengthCriteria,
      uppercase: upperCaseCriteria,
      lowercase: lowerCaseCriteria,
      number: numberCriteria,
      specialCharacter: specialCharacterCriteria,
    });

    let strengthLevel = 0;

    if (lengthCriteria) strengthLevel += 1;
    if (upperCaseCriteria) strengthLevel += 1;
    if (lowerCaseCriteria) strengthLevel += 1;
    if (numberCriteria) strengthLevel += 1;
    if (specialCharacterCriteria) strengthLevel += 1;

    let strengthText = "";
    switch (strengthLevel) {
      case 5:
        strengthText = "Strong";
        break;
      case 4:
        strengthText = "Good";
        break;
      case 3:
        strengthText = "Moderate";
        break;
      case 2:
        strengthText = "Weak";
        break;
      default:
        strengthText = "VeryWeak";
    }

    setStrength(strengthText);
    console.log(strengthText);
  };

  const checkIfPasswordBreached = async (password) => {
    const hash = CryptoJS.SHA1(password)
      .toString(CryptoJS.enc.Hex)
      .toUpperCase();
    const hashPrefix = hash.substring(0, 5);
    const hashSuffix = hash.substring(5);

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.pwnedpasswords.com/range/${hashPrefix}`
      );
      const data = await response.text();

      const breached = data
        .split("\n")
        .some((line) => line.startsWith(hashSuffix));
      setHibpStatus(
        breached ? "Password has been compromised!" : "Password is safe."
      );
    } catch (error) {
      setHibpStatus("Error checking password breach status");
    } finally {
      setLoading(false);
    }
  };

  const getProgressBarClass = () => {
    switch (strength) {
      case "Strong":
        return "strong";
      case "Good":
        return "good";
      case "Moderate":
        return "moderate";
      case "Weak":
        return "weak";
      default:
        return "";
    }
  };

  return (
    <div className="pwd-checker">
      <div className="todo__box1">
        <p className="todo__title">
          <Link to="/">Back</Link>
        </p>
        <div className="todo__title">Passward Strength Checker</div>
      </div>
      <div className="pwd-checker__container">
        <form className="pwd-checker__form" onSubmit={(e) => e.preventDefault()}>
          <label className="pwd-checker__label"  htmlFor="pwd">
            Enter Your Password &nbsp;
            <input
              className="pwd-checker__input"
              type={showPassword ? "text" : "password"}
              name="pwd"
              value={password}
              onChange={handlepwd}
              id="pwd"
              placeholder="Enter password"
            />
          </label>
          <label className="pwd-checker__label pwd-checker__show"  htmlFor="show">
            {showPassword ? "Hide" : "Show"}&nbsp;
            <button
              type="radio"
              className="toggle-password"
              onClick={() => {
                SetShowPassword(!showPassword);
              }}
            ></button>
          </label>
        </form>
        <div className="progress-container">
          <div
            className={`progress-bar ${getProgressBarClass()}`}
            style={{
              width:
                strength === "Strong"
                  ? "100%"
                  : strength === "Good"
                  ? "75%"
                  : strength === "Moderate"
                  ? "50%"
                  : strength === "Weak"
                  ? "25%"
                  : strength === "VeryWeak"
                  ? "10%"
                  : "0%",
            }}
          >
            <span>{strength}</span>
          </div>
        </div>

        <div className="criteria-checklist">
          <ul>
            <li
              className={
                criteria.length
                  ? "criteria-checklist__valid"
                  : "criteria-checklist__invalid"
              }
            >
              At least 8 characters
            </li>
            <li
              className={
                criteria.uppercase
                  ? "criteria-checklist__valid"
                  : "criteria-checklist__invalid"
              }
            >
              At least 1 uppercase letter
            </li>
            <li
              className={
                criteria.lowercase
                  ? "criteria-checklist__valid"
                  : "criteria-checklist__invalid"
              }
            >
              At least 1 lowercase letter
            </li>
            <li
              className={
                criteria.number
                  ? "criteria-checklist__valid"
                  : "criteria-checklist__invalid"
              }
            >
              At least 1 number
            </li>
            <li
              className={
                criteria.specialCharacter
                  ? "criteria-checklist__valid"
                  : "criteria-checklist__invalid"
              }
            >
              At least 1 special character
            </li>
          </ul>
        </div>

        {hibpStatus && (
          <div
            className={`status ${
              hibpStatus.includes("compromised")
                ? "status__error"
                : "status__safe"
            }`}
          >
            <span>HIBP Result: {hibpStatus}</span>
          </div>
        )}

        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default Day9;
