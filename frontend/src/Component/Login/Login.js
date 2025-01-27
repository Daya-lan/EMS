import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaUserSecret } from "react-icons/fa";
import "./Login.css";
import { FaRegUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { protectRouter } from "../Main";
import { LoginDetails } from "./AuthenContext";

export const Login = () => {
  const [userLogin, setUserLogin] = useState([{ userName: "", password: "" }]);
  const [loginErr, setLoginErr] = useState(null);
  const [logEye, setLogEye] = useState(false);
  const [adminData,setAdminData] = useState([]);
  const navigate = useNavigate()
  const  [user,setUser] = useState([])
  const {setDash,setUserDtl} = useContext(protectRouter)
  const {login} = useContext(LoginDetails)
  console.log(user);

  const handelUserLoginChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handelLoginEyeClick = () => {
    if (logEye === false) {
      setLogEye(true);
    } else {
      setLogEye(false);
    }
  };

  useEffect(()=>{
    fetchData()
    fetchUser()
  },[])


  const fetchUser = async() =>{
    try {
      const user = await axios.get(`${process.env.REACT_APP_API_URL}/Eve/TotalUser`)
      if(user.data.allUser){
        setUser(user.data.allUser)
      }
    } catch (error) {
      console.log("error while fetch user",error);
    }
  }

  const fetchData = async (res) =>{
    try {
      const AdminDetials = await  axios.get(`${process.env.REACT_APP_API_URL}/Eve/AdminData`)
        if(AdminDetials.data){
          setAdminData(AdminDetials.data)  
        }
    } catch (error) {
      console.log('data not found', error);
      
    }
  }


  const handelLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (adminData.userName!==userLogin.userName && adminData.password!==userLogin.password){ 
    try {
      const UserResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/Eve/userlogin` , 
        userLogin
      );
      if (UserResponse.data.CheckUser) {
        alert("login Successfully");
        setUserLogin({ userName: "", password: "" });
        setUserDtl(UserResponse.data.CheckUser)
        setDash(false)
        navigate("/")
        const UserToken = "User"
        login(UserToken)
      }
    } catch (error) {
      setLoginErr("your UserName or  Password  is Invalid please check");
      console.log("error when you login", error);
    }
  }

  else{
    try {
      const AdminResponse = await axios.post(`${process.env.REACT_APP_API_URL}/Eve/AdminLogin`,userLogin);
       if(AdminResponse.data){
        alert("Adminlogin successfully")
        setUserLogin({userName:"",password:''})
        setDash(true)
        navigate("/Dashboard")
        const UserToken = "Admin"
        login(UserToken)
      }
    } catch (error) {
      setLoginErr("your UserName or  Password  is Invalid please check");
      console.log("error when you login", error);    
    }
  }
  };
  return (
    <section className=".container-fluid" id="Login-Section-Main-Parent">
      <div className="row p-0 m-0" id="Login-Section-Second_Parent">
        <div className=" col-12 col-xxl-4 col-xl-5 col-lg-5 col-md-6 col-sm-8" id="Login-Section-Child">
          <div id="Login-Form-Main-Parent">
            <div id="Top-Icon-Parent" className="">
              <FaUserSecret />
            </div>
            <div id="Login_heading-Main-Parent">
              <p id="Top-Line"></p>
              <p id="Login-Heading">Login</p>
              <p id="bottom-line"></p>
            </div>
            <div id="Login-Form-Second-Parent" className="w-100">
              <form onSubmit={handelLoginSubmit} className="w-100 d-flex justify-content-center align-items-center">
                <p>{loginErr}</p>
                <div
                  className="d-flex  justify-content-center align-items-start py-md-3  w-100"
                  id="login-userName-parent"
                >
                  <label className="d-flex justify-content-center align-items-center" htmlFor="UserName"> <FaRegUser />UserName </label>
                  <div id="login-input-parent" className="d-flex justify-content-center align-items-center w-100">
                    <input
                      type="text"
                      className="w-100"
                      placeholder= " UserName"
                      name="userName"
                      value={userLogin.userName}
                      onChange={handelUserLoginChange}
                    />
                    <span
                      className="d-flex justify-content-center align-items-center  "
                      id="login-userName-icon"
                    >
                      <FaRegUser />
                    </span>
                  </div>
                </div>
                <div className= " d-flex w-100 justify-content-center align-items-start py-md-3 py-2"  id="login-password-parent">
                  <label className="d-flex justify-content-center align-items-center" htmlFor="password"> <FaLock />Password</label>
                  <div className=" d-flex w-100  justify-content-center align-items-center ">
                    <input
                      type={logEye ? "text" : "password"}
                      className="w-100 position-relative"
                      placeholder="Password"
                      name="password"
                      value={userLogin.password}
                      onChange={handelUserLoginChange}
                    />
                    <span
                      onClick={handelLoginEyeClick}
                      className="d-flex  justify-content-center align-items-center "
                      id="Login-Password-icon"
                    >
                      {logEye ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="w-100 d-flex justify-content-center align-items-start">
                <div className="px-2" id="Forget-password-parent">
                  <Link className="text-decoration-none" to="/ForgetPassword">
                  <p>Forget password ?  </p>
                  </Link>
                </div>
                </div>
                <div id="Login-button" className="py-md-3 py-2">
                  <button  type="submit"> Login </button>
                </div>
                <div id="Login-sign-up-Parent">
                  <Link className="text-decoration-none" to="/Register">
                  <p>Sign-up..?</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </section> 
  );
};
