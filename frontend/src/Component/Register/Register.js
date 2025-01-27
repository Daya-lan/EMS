import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Register.css";
import image1 from "../images/event-management-wedding-planner-manager-planning-.jpg";
import image2 from "../images/best-employee_3135723.png"
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [user, setUser] = useState([
    { name: "", email: "", userName: "", password: "", confirmPassword: "" },
  ]);
  const [error, setError] = useState(null);
  const [passEye, setPassEye] = useState(false);
  const [conEye, setConEye] = useState(false);
  const [passError,setPassError] = useState(null)
  const [AdminDataForRegister,setAdminDataForRegister] = useState([])
  const navigate = useNavigate()

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handelPassEyeClick = () => {
    if (passEye === false) {
      setPassEye(true);
    } else {
      setPassEye(false);
    }
  };

  const handelconPassEyeClick = () => {
    if (conEye === false) {
      setConEye(true);
    } else {
      setConEye(false);
    }
  };

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async (res) =>{
    try {
      const AdminDetials = await  axios.get(`${process.env.REACT_APP_API_URL}/Eve/AdminData`)
        if(AdminDetials.data){
          setAdminDataForRegister(AdminDetials.data)  
        }
    } catch (error) {
      console.log('data not found', error);
      
    }
  }

  const handelSubmit = async (e) => {
    e.preventDefault();

    if(AdminDataForRegister.userName===user.userName && AdminDataForRegister.password===user.password){
      setError("your UserName or Password was already exist , please change")
    }
    else{
    try {
        if (user.password === user.confirmPassword) {
          const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/Eve/UserRegister`,
          user
        );
        if (response.data) {
          alert("user Register successfully");
          setUser({
            name: "",
            email: "",
            userName:'',
            password: "",
            confirmPassword: "",
          });
        }
        navigate("/Login")
      }

      else {
        setPassError("your confirm password does not match with password");
      }
    } catch (error) {
      setError("Register failed, please try again");
      console.log("error when you Register", error);
    }
  }
  };

  return (
   <section
      className=".container-fluid text-center"
      id="frontEndRegisterMainParent"
    >
      <div className="row px-2" id="frontEndRegisterSecondParent">
        <div className="col-12 col-md-4  " >
        <div id="Register-Top-Icon-Parent" className="">
              <img src={image2} alt="" />
            </div>
          <div id="sign-Up-parent">
            <h1>Sign-Up</h1>
          </div>
          <div>
            <p id="Login-error-shower" className="" >{error}</p>
          </div>
          <div id="RegisterFormParent" className="">
            <form onSubmit={handelSubmit} className="f-md-1">
              <div className="d-flex w-100 align-items-center justify-content-center">
                <label className="d-none" htmlFor="name">
                  FullName
                </label>
                <input
                  type="text"
                  className=" py-2 p-md-2 py-xl-3 py-sm-3 py-lg-3 py-xxl-4"
                  name="name"
                  placeholder="Name"
                  value={user.name}
                  required
                  onChange={handelChange}
                />
                <p id="Register-Name-Icone">
                  <MdDriveFileRenameOutline />
                </p>
              </div>

              <div className="d-flex w-100 align-items-center justify-content-center">
                <label className="d-none" htmlFor="Email">
                  Email
                </label>
                <input
                  type="email"
                  className=" py-2 p-md-2 py-xl-2 py-sm-3 py-lg-2 py-xxl-4"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  required
                  onChange={handelChange}
                />
                <p id="Register-Email-Icon">
                  <MdEmail />
                </p>
              </div>

              <div className="d-flex w-100 align-items-center justify-content-center">
                <label className="d-none" htmlFor="userName">
                  userName
                </label>
                <input
                  type="text"
                  className=" py-2 p-md-2 py-xl-2 py-sm-3 py-lg-2 py-xxl-4"
                  placeholder="UserName"
                  name="userName"
                  value={user.userName}
                  required
                  onChange={handelChange}
                />
                <p id="Register-userName-icon">
                  <FaUserGraduate />
                </p>
              </div>

              <div className="d-flex w-100 align-items-center justify-content-center">
                <label className="d-none" htmlFor="password">
                  password
                </label>
                <input
                  type={passEye ? "text" : "password"}
                  className=" py-2 p-md-2 py-xl-2 py-sm-3 py-lg-2 py-xxl-4"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  required
                  onChange={handelChange}
                />
                <span
                  onClick={handelPassEyeClick}
                  id="Register-Password-Eye"
                  className=""
                >
                  {passEye ? <IoEyeSharp /> : <FaEyeSlash />}
                </span>
              </div>
              <div>{passError}</div>
              <div className="d-flex w-100 align-items-center justify-content-center">
                <label className="d-none" htmlFor="confirmPassword">
                  confirmPassword
                </label>
                <input
                  type={conEye ? "text" : "password"}
                  className=" py-2 p-md-2 py-xl-3 py-sm-3 py-lg-3 py-xxl-4"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  value={user.confirmPassword}
                  required
                  onChange={handelChange}
                />
                <div
                  onClick={handelconPassEyeClick}
                  id="Register-ConfirmPassword-Eye"
                  className=""
                >
                  {conEye ? <IoEyeSharp /> : <FaEyeSlash />}
                </div>
              </div>
              <div id="Event-Register-Button">
                <button type="submit">SignUp</button>
              </div>
              <div id="Register-Sign-In-Parent" >
                  <Link className='text-decoration-none' to="/Login" >
                  <p>Sign-In..?</p>
                  </Link>
                </div>
            </form>
          </div>
        </div>
        <div className="col col-md-0 d-md-block d-none" id="RegisterImgParent">
          <img src={image1} alt="hero-image-Events.png"  />
        </div>
      </div>
    </section> 
  );
};

export default Register;
