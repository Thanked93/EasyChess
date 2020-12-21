import React, { useContext } from "react";
import { reducerContext } from "../../App";

const Room = () => {
  const { state } = useContext(reducerContext);
  return <div>Hello {state.name}</div>;
};
export default Room;
