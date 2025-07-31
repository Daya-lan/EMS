
import React, { createContext, useEffect, useState } from 'react'

export const LoginDetails = createContext();

export const AuthenContext = ({children}) => {
    const [authen,setAuthen] = useState(false)
    const [adminAuthen,setAdminAuthen] = useState(false)
    const [userToken,setUserToken]=useState(localStorage.getItem("authenToken" || null))

    useEffect(()=>{
      if(userToken==="User"){
        setAuthen(true)
      }
    },[userToken])

    useEffect(()=>{
      if(userToken==="Admin"){
        setAdminAuthen(true)
      }
    },[userToken])

    const login = (newToken) =>{
      setUserToken(newToken)
      localStorage.setItem("authenToken",newToken)
    }

    const logout = () =>{
      setAuthen(null)
      setAdminAuthen(null)
      setUserToken(null)
      localStorage.removeItem("authenToken")
    }
  return (
    <div>
      <LoginDetails.Provider value={{authen,login,logout,adminAuthen}}>
        {children}
      </LoginDetails.Provider>
    </div>
  )
}
