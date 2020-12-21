import React, { useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "./components/login/Login";

import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register";
import Room from "./components/room/Room";
import { INITIAL_STATE } from "./reducer/initialState";
import { userReducer } from "./reducer/userReducers";

export const reducerContext = React.createContext<any>(null);

function App() {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  return (
    <Main>
      <reducerContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />

          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/rooms" component={Room} />
        </Router>
      </reducerContext.Provider>
    </Main>
  );
}

const Main = styled.div`
  background-color: rgba(120, 120, 120, 0.5);
  display: Grid;
  grid-template-rows: 1fr 1fr 12fr 1fr;
  grid-template-columns: 20fr 20fr 20fr 20fr 20fr;
  height: 100vh;
  width: 100wh;
`;

export default App;
