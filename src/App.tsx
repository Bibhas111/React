import axios from "axios";
import React, { useEffect } from "react";
import './App.css';
import Header from "./Admin/Page/header";
import Search from "./Admin/Page/search";
import { useState,useCallback  } from "react";
import { IUserProfileData } from "./Admin/Page/types/interfaces";



function App() {
  const configValue : string | undefined = process.env.REACT_APP_SOME_CONFIGURATION;
  const [userEmailContext, setuserEmailContext] = useState("default EmailID value");
  var userdata :Array<IUserProfileData>=[{userID:'',accountStatus:''}]
  
  const clickHandle = (data:any) => {
    setuserEmailContext(data);
 }
  
   const getuserProfile= configValue+"GetUserProfile"
   const [post, setPost] = React.useState(userdata);
   
useEffect(()=>{
  axios.get(getuserProfile,{
    method:"GET",

    headers: {
       "Content-Type": "application/json",
       "Access-Control-Allow-Methods": "GET",
       "Access-Control-Allow-Origin": "*",
    },
   params: {email: userEmailContext}}).then((response) => {
    setPost(response.data.value);
  })},[getuserProfile, userEmailContext]
)

  return (
    <div className="App">
      <Header/> 
      <Search handleclick={clickHandle} data={post}/>
 
   </div>
  );
}

export default App;
