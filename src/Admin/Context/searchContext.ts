import { createContext, useState, useContext, useMemo } from 'react';




const UserSearchContext = createContext({
    userName: '',
    setUserName: () => {},
  });
  

 export default UserSearchContext;