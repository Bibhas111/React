import React from "react";
import { render, screen } from "@testing-library/react";
import "./css/header.css";
import image from "./images/R.png";

const Header: React.FunctionComponent = () => {
  return (
    <div className="header">
      <div>
        <img
          className="img-style"
          style={{
            height: "8%",
            width: "7%",
            float: "left",
          }}
          src={image}
          alt="alternatetext"
        />
        User Admin Application
      </div>
    </div>
  );
};

export default Header;
