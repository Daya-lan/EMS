import React, { useCallback, useContext, useState } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { BsCalendarEventFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import logo from "../../images/logo-image.jpg";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { LoginDetails } from "../../Login/AuthenContext";
import { TbMessageReportFilled } from "react-icons/tb";

export const Navbar = () => {
  const { authen, logout } = useContext(LoginDetails);
  return (
    <section className=".container-fluid p-0 m-0" id="Navbar-main-Parent">
      <div className="row m-0 p-0" id="Navbar-second-Parent">
        <div
          className=" col col-lg-4 d-flex justify-content-between align-items-center "
          id="navbar-first-Child"
        >
          <div className="d-flex justify-content-center align-items-center p-0">
            <div
              className="d-flex justify-content-center align-items-center "
              id="navbar-logo"
            >
              <img src={logo} alt="" />
              <h2>MyEvent</h2>
            </div>
          </div>
          <p
            className="fs-2 d-lg-none d-sm-block "
            data-bs-toggle="offcanvas"
            aria-controls="offcanvasWithBothOptions"
            data-bs-target="#offcanvasWithBothOptions"
          >
            <GiHamburgerMenu />
          </p>
        </div>
        <div
          className="col-8 d-none d-lg-block"
          id="Navbar-second-Child-parent"
        >
          <ul
            className=" d-flex justify-content-center align-items-center"
            id="Navbar-Second-Child"
          >
            <Link className="text-decoration-none" to="/Dashboard">
              <li className="d-flex justify-content-center align-items-center ">
                <FaHome />
                Dashbord
              </li>
            </Link>
            <Link className="text-decoration-none" to="UserEvents">
              <li className="d-flex justify-content-center align-items-center">
                <BsCalendarEventFill />
                Event
              </li>
            </Link>
            <Link className="text-decoration-none" to="AddEvents">
              <li className="d-flex justify-content-center align-items-center ">
                <FaAddressCard />
                Add
              </li>
            </Link>
            <Link className="text-decoration-none" to="UserOrganizer">
              <li className="d-flex justify-content-center align-items-center">
                <FaUsers />
                Organizer
              </li>
            </Link>
            {/* <Link className="text-decoration-none" to="Login">
              <li className="d-flex justify-content-center align-items-center">
                <FaUserTie />
              </li>
            </Link> */}
            <Link className="text-decoration-none" to="Notification">
              <li className="d-flex justify-content-center align-items-center">
              <TbMessageReportFilled />Notification
              </li>
            </Link>
            <Link className="text-decoration-none" to="/">
              <button onClick={logout}>
                Log
                <AiOutlineLogout />
              </button>
            </Link>
          </ul>
        </div>
      </div>
      <div
        class="offcanvas offcanvas-start d-lg-none"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header" id="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Welcome
          </h5>
          <button
            type="button"
            id="Side-Bar-Btn-Close"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div className="row " id="sideBar-main-Parent">
            <div className="col py-5 " id="SideBar-child">
              <ul className="d-flex justify-content-center align-items-center">
                <Link className="text-decoration-none" to="/Dashboard">
                  <li
                    className=" px-3 d-flex justify-content-center align-items-center"
                    id="Side-bar-gap-all" data-bs-dismiss="offcanvas"
                  >
                    <FaHome />
                    Dashbord
                  </li>
                </Link>
                <Link className="text-decoration-none" to="UserEvents">
                  <li
                    className="d-flex justify-content-center align-items-center"
                    id="Side-bar-gap-all" data-bs-dismiss="offcanvas"
                  >
                    <BsCalendarEventFill />
                    Events
                  </li>
                </Link>
                <Link className="text-decoration-none" to="AddEvents">
                  <li
                    className="d-flex justify-content-center align-items-center"
                    id="Side-bar-gap-all" data-bs-dismiss="offcanvas"
                  >
                    <FaAddressCard />
                    Add events
                  </li>
                </Link>
                <Link className="text-decoration-none" to="UserOrganizer">
                  <li
                    className="d-flex justify-content-center align-items-center"
                    id="Side-bar-gap-all" data-bs-dismiss="offcanvas"
                  >
                    <FaUsers />
                    Organizer
                  </li>
                </Link>
                <Link className="text-decoration-none" to="Notification">
                  <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas" >
                    Notification
                  </li>
                </Link>
                <div className="" id="side-bar-Logout">
                  <Link className="text-decoration-none" to="/">
                    <button onClick={logout}>
                      Log
                      <AiOutlineLogout />
                    </button>
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

{
  /* <div className="row d-lg-none " style={side? {display:"none"}:{display:"block"}} id="sideBar-main-Parent">
<div className="col py-5 " id="SideBar-child">
  <ul className="d-flex justify-content-center align-items-center">
    <li className="d-flex justify-content-center align-items-center">
      <FaHome />
      Dashbord
    </li>
    <li className="d-flex justify-content-center align-items-center">
      <BsCalendarEventFill />
      Events
    </li>
    <li className="d-flex justify-content-center align-items-center">
      <FaAddressCard />
      Add events
    </li>
    <li className="d-flex justify-content-center align-items-center">
      <FaUsers />
      Organizer
    </li>
    <div
    className=""
    id="side-bar-Logout"
  >
    <button>Logout</button>
  </div>
  </ul>

</div>
</div> */
}
