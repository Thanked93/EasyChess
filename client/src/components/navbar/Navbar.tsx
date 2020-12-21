import React from "react";
import styled from "styled-components";

import Menu from "./menu/Menu";

const Navbar = () => {
  return (
    <Nav>
      <div className="left">
        <div className="logoWrapper">Logo</div>
      </div>

      <div className="middle">Easy Chess</div>
      <div className="right">
        <Menu />
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
    background-color:rgb(120,120,120);
    grid-column: 1/-1;
    grid-row: 1;
    display:grid;
    grid-template-columns: 10vw 60vw 30vw;
    .left {
        grid-column: 1;
    
    }
    .middle{
        display:flex
        grid-column: 2;
        justify-content:center;
        align-items:center;
        color:white;
        font-size 7vmin;
    }
    .right{
        display:flex;
        grid-column:5;
        justify-content:center;
        align-items:center;
    }

`;

export default Navbar;
