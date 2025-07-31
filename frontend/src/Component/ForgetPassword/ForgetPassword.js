import React, { useEffect, useState } from 'react'
import "./ForgetPassword.css"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export const ForgetPassword = () => {
    const [ForEye, setForEye] = useState(false);
    const [ForgetPassword,setForgetPassword] = useState([{email:'',password:''}])
    const [ForErr,setForErr] = useState(null)
    const [AdminDataForUpdate,setAdminDataForUpdate] = useState([])
    const navigate = useNavigate()

    const handelForgetPasswordChange = (e) =>{
        const {name,value} = e.target
        setForgetPassword((prev)=>({...prev,[name]:value}))
    }

    const handelLoginEyeClick = () => {
        if (ForEye === false) {
          setForEye(true);
        } else {
          setForEye(false);
        }
      };

      useEffect(()=>{
        fetchDataForUpdate()
      },[])

      const fetchDataForUpdate = async() =>{
        try {
          const adminupdatedata = await axios.get(`${process.env.REACT_APP_API_URL}/Eve/AdminData`)
          if(adminupdatedata.data){
            setAdminDataForUpdate(adminupdatedata.data)
          }
        } catch (error) {
          console.log(error.message);
        }
      }

    const handelForgetPasswordSubmit = async (e) =>{
      e.preventDefault()

      if(AdminDataForUpdate.email===ForgetPassword.email){
        try {
          const ForPassword = await axios.post(`${process.env.REACT_APP_API_URL}/Eve/AdminUpdate${ForgetPassword.email}`,ForgetPassword)
          if(ForPassword.data){
            console.log(ForPassword.data);
            alert("Admin password changed")
            setForgetPassword({email:'',password:''}) 
            navigate("/")
          }
        } catch (error) {
          console.log(error.message);
          setForErr("your email is invalid, please check")           
        }
      }
      else{
      try {
        const ForPassword = await  axios.post(`${process.env.REACT_APP_API_URL}/Eve/userUpdate${ForgetPassword.email}`,ForgetPassword)
        if(ForPassword.data){
          console.log(ForPassword.data);
          alert("Your password changed")
          setForgetPassword({email:"",password:''})
          navigate("/")
        }
      } catch (error) {
        console.log("your email is incorrect",error);
        setForErr("your email is invalid , please check")
      }

    }
  }
  return (
    <section className=".container-fluid" id="ForgetPassword-Section-Main-Parent">
      <div className="row m-0 p-0 " id="ForgetPassword-Section-Second_Parent">
        <div className=" col-12 col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-10 px-2" id="ForgetPassword-Section-Child">
          <div id="ForgetPassword-Form-Main-Parent">
            <div id="ForgetPassword-Top-Icon-Parent" className="">
              <FaUserSecret />
            </div>
            <div id="ForgetPassword_heading-Main-Parent">
              <p id="ForgetPassword-Top-Line"></p>
              <p id="ForgetPassword-Heading">Forget-Password</p>
              <p id="ForgetPassword-bottom-line"></p>
            </div>
            <div id="ForgetPassword-Form-Second-Parent" className="w-100">
              <form onSubmit={handelForgetPasswordSubmit} className="w-100 d-flex justify-content-center align-items-center">
                <p>{ForErr}</p>
                <div
                  className="d-flex  justify-content-center align-items-start py-3 w-100"
                  id="ForgetPassword-userName-parent"
                >
                  <label className="d-flex justify-content-center align-items-center" htmlFor="UserName"> <MdMarkEmailUnread />Email</label>
                  <div id="FogetPassword-input-parent" className="d-flex justify-content-center align-items-center w-100">
                    <input
                      type="email"
                      className="w-100"
                      placeholder= " email"
                      name="email"
                      value={ForgetPassword.email}
                      onChange={handelForgetPasswordChange}
                    />
                    <span
                      className="d-flex justify-content-center align-items-center  "
                      id="ForgetPassword-Email-icon"
                    >
                      <MdMarkEmailUnread />
                    </span>
                  </div>
                </div>
                <div className= " d-flex w-100 justify-content-center align-items-start py-3" id="ForgetPassword-password-parent">
                  <label className="d-flex justify-content-center align-items-center" htmlFor="password"> <FaLock />New Password</label>
                  <div className=" d-flex w-100  justify-content-center align-items-center ">
                    <input
                      type={ForEye ? "text" : "password"}
                      className="w-100 position-relative"
                      placeholder="New Password"
                      name="password"
                      value={ForgetPassword.password}
                      onChange={handelForgetPasswordChange}
                    />
                    <span
                      onClick={handelLoginEyeClick}
                      className="d-flex  justify-content-center align-items-center "
                      id="ForgetPassword-Password-icon"
                    >
                      {ForEye ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div id="ForgetPassword-button" className="py-3">
                  <button type="submit">Reset Password</button>
                </div>
                <div id='Forget-password-Login-Link-Parent' >
                  <Link className='text-decoration-none' to="/" >
                  <p>Login..?</p>
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
  )
}
