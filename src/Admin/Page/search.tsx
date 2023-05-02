import React from "react";
import "./css/search.css";
import image from "./images/home.png";
import { useState, useContext } from "react";
import UserSearchContext from "../Context/searchContext";
import Searchresult from "./searchresult";
import { IUserProfileData } from './types/interfaces';

interface PropsInterface {
  handleclick: (url: string) => void;
  data:IUserProfileData[]
}

const Search: React.FunctionComponent<PropsInterface> = (
  {handleclick,data}: PropsInterface
) => {
  const [showSearchStatements, setSearchStatements] = useState("");


  const handleChange = (event: any) => {
      setSearchStatements(event.target.value);
      console.log("value is:", event.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        marginLeft: "10%",
        width: "80%",
        marginRight: "10%",
        height: "900px",
        boxShadow:' 0 6px 10px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
      }}
    >
      <div
        style={{
          marginLeft: "10%",
          backgroundColor: "white",
          width: "80%",
          height: "300px",
          boxShadow:' 0 6px 10px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
        }}
      >
        <img
          style={{
            height: "110%",
            width: "80%",
          }}
          src={image}
          alt="alternatetext"
        />
      </div>

      <div
        style={{
          marginLeft: "10%",
          backgroundColor: "white",
          width: "80%",
          height: "500px",
          boxShadow:' 0 15px 10px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.0)'
        }}
      >
        <div className="searchDiv">
          <label htmlFor="header-search">
            <span className="visually-hidden">Search user posts</span>
          </label>
          <input
            type="text"
            onChange={handleChange}
            id="header-search"
            placeholder="Enter valid EmailID"
            name="s"
            className="searchbar"
          />
          <button
            className="buttons"
            type="submit"
            onClick={() => {
              handleclick(showSearchStatements);
            }}
          >
            Search
          </button>
        </div>
        <Searchresult data={data}/>
      </div>
    </div>
  );
};

export default Search;
