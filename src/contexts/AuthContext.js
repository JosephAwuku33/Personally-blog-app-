import React, { createContext, useContext, useState } from 'react'
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider({ children }) {

  function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password); 
  }
  
  const [isAuth, setIsAuth] = useState(false);

  const value = { signup, isAuth, setIsAuth }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
