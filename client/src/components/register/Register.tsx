import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import axios from "axios";

import styled from "styled-components";

import { errorHandle } from "../../errorhandle/errorhandle";
import { reducerContext } from "../../App";
import { ActionType } from "../../reducer/userReducers";

const Register = () => {
  const history = useHistory();
  const { dispatch } = useContext(reducerContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState<Array<string>>(["x"]);

  const submit = (e: any) => {
    e.preventDefault();
    setError(errorHandle(userName, password, confirmedPassword));
    if (error.length === 0) {
      axios
        .post("http://localhost:5002/register", {
          username: userName,
          password: password,
        })
        .then((res) => {
          console.log(res);
          dispatch({ type: ActionType.LOGIN, payload: { name: userName } });
          history.push({
            pathname: "/rooms",
          });
        })
        .catch((err) => {
          console.log("error");
          setError((prev) => [
            ...prev,
            `The username ${userName}  is already taken.`,
          ]);
        });
    }
  };

  return (
    <MainRegister>
      <h1 className="registerCaption">Register</h1>
      <RegisterForm onSubmit={submit}>
        <input
          className="marginInput"
          type="text"
          placeholder="Enter Username"
          value={userName}
          minLength={6}
          maxLength={15}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="marginInput"
          type="password"
          value={password}
          minLength={6}
          maxLength={15}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="marginInput"
          type="password"
          placeholder="Confirm password"
          minLength={3}
          maxLength={15}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        {error[0] !== "x" && (
          <ErrorMsg>
            {error.map((error, index) => {
              return (
                <span className="msg" key={`register-${index}`}>
                  {error}
                </span>
              );
            })}
          </ErrorMsg>
        )}
        <button className="submitButton">Submit</button>
      </RegisterForm>
      <Footer>
        Already have an Account?
        <NavLink to="login">Login</NavLink>
      </Footer>
    </MainRegister>
  );
};

export default Register;

const MainRegister = styled.div`
  margin: 1em;
  background-color: rgba(120, 120, 120, 0.5);
  display: grid;
  grid-column: 2/5;
  grid-row: 3;
  overflow: hidden;
  grid-template-rows: 1fr 5fr 2fr;
  grid-template-columns: 1fr 4fr 1fr;

  .registerCaption {
    margin-top: 0;
    grid-row: 1;
    grid-column: 1/-1;
    color: white;
    font-size: 5vmin;
    background-color: rgb(120, 120, 120);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Footer = styled.div`
  grid-row: 3;
  grid-column: 2;
  color: white;
  font-size: 2vmin;
  display: flex;
  flex-direction: column;
`;

const RegisterForm = styled.form`
  grid-column: 2;
  grid-row: 2;
  display:flex;
  flex-direction:column;
  margin-top 5vh;
  margin-bottom:5vh;
  width:100%;
  align-items:center;
  overflow:auto;
  font-size:2vmin;
  .marginInput{
      margin-top:2vh;
      margin-bottom:2vh;
      text-align: center;
  }
`;

const ErrorMsg = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2vmin;
  color: rgb(200, 0, 0);
  margin-bottom: 1vh;

  .msg {
    margin-left: auto;
    margin-right: auto;
  }
`;
