import React, { useContext } from "react";
import styled from "styled-components";

import { reducerContext } from "../../../App";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const { state } = useContext(reducerContext);
  return (
    <MainMenu>
      {state.loggedIn ? (
        <div>
          <NavLink className="left displayCenter" to="/Game">
            Create Game
          </NavLink>
          <NavLink className="displayCenter" to="/rooms">
            Join Game
          </NavLink>
          <div className="displayCenter">Logout</div>
        </div>
      ) : (
        <div>
          <NavLink className="left" to="/login">
            Log in
          </NavLink>
          <NavLink className="right" to="register">
            Register
          </NavLink>
        </div>
      )}
    </MainMenu>
  );
};

const MainMenu = styled.div`
  background-color: green;
  display: flex;
  height: 100%;
  width: 20vw;
  margin-right: 2vw;
  justify-content: center;
  flex-direction: column;
  color: white;
`;

export default Menu;
