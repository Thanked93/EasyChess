import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { reducerContext } from "../../App";
import { ActionType } from "../../reducer/userReducers";
import { errorHandle } from "../../errorhandle/errorhandle";

const Login = () => {
  const { dispatch } = useContext(reducerContext);
  const history = useHistory();
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<Array<string>>(["x"]);

  const submit = (e: any) => {
    e.preventDefault();
    setError(errorHandle(userName, password));
    if (error.length < 1) {
      axios
        .post("http://localhost:5002/login", { username: userName, password })
        .then((_) => {
          dispatch({ type: ActionType.LOGIN, payload: { name: userName } });
          history.push({
            pathname: "/rooms",
          });
        })
        .catch((err) => {
          setError((prev) => [...prev, "Wrong username or password."]);
        });
    }
  };

  const submitAnon = (e: any) => {
    e.preventDefault();
    dispatch({ type: ActionType.LOGIN, payload: { name: "anonUser" } });
    history.push({
      pathname: "/rooms",
    });
  };

  return (
    <MainLogin>
      <h1 className="loginCaption">Login</h1>
      <LoginForm>
        <input
          className="inputUsername"
          type="text"
          placeholder={"Enter username"}
          minLength={3}
          maxLength={15}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="inputPassword"
          type="password"
          placeholder={"Enter password"}
          minLength={6}
          maxLength={15}
          onChange={(e) => setPassword(e.target.value)}
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
        <button className="loginButton" onClick={submit}>
          Login
        </button>
        <button className="anonButton" onClick={submitAnon}>
          Play Anonymous
        </button>
      </LoginForm>
      <LoginFooter>
        <div className="footerDescription">Don't have an Account yet?</div>

        <NavLink className="footerLink" to="register">
          Register
        </NavLink>
      </LoginFooter>
    </MainLogin>
  );
};

const MainLogin = styled.div`
  margin: 1em;
  background-color: rgba(120, 120, 120, 0.5);
  display: grid;
  grid-column: 2/5;
  grid-row: 3;
  grid-template-rows: 1fr 5fr 2fr;
  grid-template-columns: 1fr 4fr 1fr;

  .loginCaption {
    color: white;
    display: flex;
    font-size: 5vmin;
    justify-content: center;
    grid-column: 1/-1;
    grid-row: 1;
    align-items: center;
    margin-top: 0;
    background-color: rgb(120, 120, 120);
  }
`;

const LoginFooter = styled.div`
  grid-column: 2;
  grid-row: 3;
  color: white;
  font-size: 2vmin;
  display: flex;
  flex-direction: column;
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

const LoginForm = styled.form`
  grid-column: 2;
  grid-row: 2;
  display:flex;
  flex-direction: column;
  margin-top: 5vh;
  margin-bottom 5vh;
  width:100%;
  overflow:hidden;
  align-items:center;

  .inputUsername{
    margin-top: 2vh;
    font-size: 3vmin;
    text-align: center;
 
  }
  .inputPassword{
    margin-top:2vh;
    font-size: 3vmin;
    text-align: center;
  }
  .loginButton{
    margin-top: 2vh;
    font-size: 3vmin;
    
  }
  .anonButton{
    margin-top:2vh;
    font-size: 3vmin;

  }
}


`;

export default Login;
