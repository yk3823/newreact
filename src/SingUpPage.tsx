import React, { useState, useEffect } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./App.css";

const SingUpPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showFirstNameError, setShowFirstNameError] = useState(false);
  const [showLastNameError, setShowLastNameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFirstName(value);

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(value)) {
      setShowFirstNameError(true);
      setFirstNameError("only letters!");
      setTimeout(() => {
        setShowFirstNameError(false);
      }, 2000);
    } else {
      setShowFirstNameError(false);
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLastName(value);

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(value)) {
      setShowLastNameError(true);
      setLastNameError("only letters!");
      setTimeout(() => {
        setShowLastNameError(false);
      }, 2000);
    } else {
      setShowLastNameError(false);
      setLastNameError("");
    }
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value || "");
  };
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;

  const user_verified = false;

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);

    if (value.length < 6) {
      setShowPasswordError(true);
      setPasswordError("Password must be at least 6 characters long.");
      setTimeout(() => {
        setShowPasswordError(false);
      }, 2000);
    } else {
      setShowPasswordError(false);
      setPasswordError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const jsonObject = {
      firstName: firstName,
      lastName: lastName,
      date: formattedDate,
      email: email,
      phone: phone,
      password: password,
      user_verified: user_verified,
      deceased: [],
    };

    try {
      const response = await axios.post(
        "http://localhost:5020/create",
        jsonObject
      );

      console.log("Response:", response.data);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setErrorMessage("");
      setShowVerificationMessage(true);
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("Email already exists in the system");
      }
    }
  };

  return (
    <div>
      <h1>SingUp</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {showVerificationMessage && (
        <p>In order to proceed, please verify your email.</p>
      )}
      <p>Date: {date}</p>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            className={showFirstNameError ? "error-input" : ""}
          />
          {showFirstNameError && (
            <p className="error-message">{firstNameError}</p>
          )}
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            className={showLastNameError ? "error-input" : ""}
          />
          {showLastNameError && (
            <p className="error-message">{lastNameError}</p>
          )}
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={showPasswordError ? "error-input" : ""}
          />
          {showPasswordError && (
            <p className="error-message">{passwordError}</p>
          )}
        </label>
        <br />
        <label>
          Phone:
          <PhoneInput
            value={phone}
            onChange={handlePhoneChange}
            international
            defaultCountry="IL"
          />
        </label>
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default SingUpPage;
