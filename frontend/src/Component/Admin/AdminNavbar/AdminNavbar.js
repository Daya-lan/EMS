import React, { useCallback, useContext, useState } from "react";
import"./AdminNavbar.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { BsCalendarEventFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import logo from "../../images/logo-image.jpg"
import { Link } from "react-router-dom";
import AdminImage from "../../images/Admin-Profile-Vector-PNG-Clipart.png"
import { MdOutlineLogout } from "react-icons/md";
import { LoginDetails } from "../../Login/AuthenContext";
import { FaUserXmark } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";

export const AdminNavbar = () => {
  const {authen,logout} = useContext(LoginDetails)
  return (
    <section className=".container-fluid mx-0" id="AdminNavbar-main-Parent">
      <div className="row mx-0 d-none " id="AdminNavbar-second-Parent">
        <div className="col-12 col-lg-12 justify-content-between align-items-center " id="Adminnavbar-first-Child">
            <div className="d-flex justify-content-center align-items-center p-0">
                <div className="d-flex justify-content-center align-items-center " id="Adminnavbar-logo">
                    <img src={logo} alt="logo" />
                    <h2>MyEvent</h2>    
                </div>
            
            </div>
          <p className="fs-2 " data-bs-toggle="offcanvas" aria-controls="offcanvasWithBothOptions" data-bs-target="#offcanvasWithBothOptions">
            <GiHamburgerMenu />
          </p>
        </div>
        </div>

        <div className="row d-lg-block d-sm-none mx-0" id="admin-menu-bar-parent" >
            <aside className="col d-none d-lg-block py-4 z-1 " id="AdminNavbar-second-Child-parent">
              <div className="" id="Admin-Profile-png-image">
                <img className="text-align-center" class="img-fluid" src={AdminImage} alt="Admin-Profile.png" />
                <div className="d-flex flex-column justify-content-center align-items-center ">
                <p className="d-flex justify-content-center align-items-center">Admin</p>
                <Link className="text-decoration-none" to="Login" >
               <h2 onClick={logout} ><MdOutlineLogout /></h2>
               </Link>
                </div>
              </div>
              <ul
                className=" py-4 d-flex justify-content-center align-items-start"
                id="Navbar-Second-Child"
              >
                <Link className="text-decoration-none" to="/AdminDashboard">
                <li className=""  >
                  <div className="d-flex justify-content-start  align-items-start">
                  <p><FaHome /></p>
                  <p>Dashbord</p>
                  </div>
                </li>
                </Link>
                <Link className="text-decoration-none" to="/AccepetedOrganizer"  >
                <li className="" >
                  <div className="d-flex justify-content center align-items-center">
                  <p><FaUserCheck /></p>
                  <p>Accepet Organizer</p>
                  </div>
                </li>
                </Link>
                <Link className="text-decoration-none" to="/RejectedOrganizer" >
                <li className="" >
                  <div className="d-flex justify-content center align-items-center">
                  <p><FaUserXmark /></p>
                  <p>Rejected Organizer</p>
                  </div>
                </li>
                </Link>
                <Link className="text-decoration-none" to="AdminManageEvent" >
                <li className="" >
                  <div className="d-flex justify-content center align-items-center" >
                  <p><FaAddressCard /></p>
                  <p>Manage Events</p>
                  </div>
                </li>
                </Link>
                <Link className="text-decoration-none" to="ManageOrganizer" >
                <li className="" >
                  <div className="d-flex justify-content center align-items-center" >
                  <p><FaUsers /></p>
                  <p>Manage Organizer</p>
                  </div>
                </li>
                </Link>
                <Link className="text-decoration-None"  to="/" >
                <button onClick={logout} >Logout</button>
                </Link>
              </ul>
            </aside>
            </div>

            <div className="d-lg-none " class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-body" className=""> 
            <div className="row d-block " id="AdminNav-sideBar-main-Parent">
          <div className="col py-5 " id="AdminNav-SideBar-child">
            <ul className="d-flex justify-content-center align-items-center">
              <li className="d-flex justify-content-center align-items-center">
                <FaHome />
                Dashbord
              </li>
              <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
                <BsCalendarEventFill />
                Events
              </li>
              <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
                <FaAddressCard />
                Manage Events
              </li>
              <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
                <FaUsers />
                Add Organizer
              </li>
              <div
              className=""
              id="AdminNav-side-bar-Logout"
            >
              <Link className="text-decoration-none" to="/" >
              <button onClick={logout} >Logout</button>
              </Link>
            </div>
            </ul>

          </div>
          </div>
        </div>
        </div>

















































































        {/* <div className="" class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-body"> 
          <div className="row d-lg-none d-sm-none mx-0" >
            <aside className="col d-none d-lg-block py-4 z-1 " id="AdminNavbar-second-Child-parent">
              <div className="" id="Admin-Profile-png-image">
                <img className="text-align-center" class="img-fluid" src={AdminImage} alt="Admin-Profile.png" />
                <div>
                <p className="d-flex justify-content-center align-items-center">Admin</p>
                <MdOutlineLogout />
                </div>
              </div>
              <ul
                className=" py-4 d-flex justify-content-center align-items-center"
                id="Navbar-Second-Child"
              >
                <Link className="text-decoration-none" to="/">
                <li className="d-flex justify-content-center align-items-center " data-bs-dismiss="offcanvas" >
                  <FaHome />
                  Dashbord
                </li>
                </Link>
                <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
                  <BsCalendarEventFill />
                  Events
                </li>
                <Link className="text-decoration-none" to="AdminManageEvent" >
                <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
                  <FaAddressCard />
                  Manage Events
                </li>
                </Link>
                <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
                  <FaUsers />
                  Add Organizer
                </li>
                <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
                  <FaUserTie />
                  Manage Organizer
                </li>
                <button>Logout</button>
              </ul>
            </aside>
            </div> 

            <div className="row  d-lg-none d-block " id="AdminNav-sideBar-main-Parent">
          <div className="col py-5 " id="AdminNav-SideBar-child">
            <ul className="d-flex justify-content-center align-items-center">
              <li className="d-flex justify-content-center align-items-center">
                <FaHome />
                Dashbord
              </li>
              <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
                <BsCalendarEventFill />
                Events
              </li>
              <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
                <FaAddressCard />
                Manage Events
              </li>
              <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
                <FaUsers />
                Add Organizer
              </li>
              <li className="d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas">
              <FaUserTie />
              User Detials
            </li>
              <div
              className=""
              id="AdminNav-side-bar-Logout"
            >
              <button>Logout</button>
            </div>
            </ul>

          </div>
          </div>
        </div>
        </div> */}

      

                                    {/* Side-Bar-small */}
     
    </section>
  );
};



{/* <div className="row  " id="AdminNav-sideBar-main-Parent">
<div className="col py-5 " id="AdminNav-SideBar-child">
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
      Manage Events
    </li>
    <li className="d-flex justify-content-center align-items-center">
      <FaUsers />
      Add Organizer
    </li>
    <li className="d-flex justify-content-center align-items-center">
    <FaUserTie />
    User Detials
  </li>
    <div
    className=""
    id="AdminNav-side-bar-Logout"
  >
    <button>Logout</button>
  </div>
  </ul>

</div>
</div> */}



//  <div className="row mx-0" >
// <aside className="col d-none d-lg-block py-4 z-1 " id="AdminNavbar-second-Child-parent">
//   <div className="" id="Admin-Profile-png-image">
//     <img className="text-align-center" class="img-fluid" src={AdminImage} alt="Admin-Profile.png" />
//     <p className="d-flex justify-content-center align-items-center">Admin</p>
//   </div>
//   <ul
//     className=" py-4 d-flex justify-content-center align-items-center"
//     id="Navbar-Second-Child"
//   >
//     <li className="d-flex justify-content-center align-items-center ">
//       <FaHome />
//       Dashbord
//     </li>
//     <li className="d-flex justify-content-center align-items-center">
//       <BsCalendarEventFill />
//       Events
//     </li>
//     <Link className="text-decoration-none" to="/">
//     <li className="d-flex justify-content-center align-items-center">
//       <FaAddressCard />
//       Manage Events
//     </li>
//     </Link>
//     <li className="d-flex justify-content-center align-items-center">
//       <FaUsers />
//       Add Organizer
//     </li>
//     <li className="d-flex justify-content-center align-items-center">
//       <FaUserTie />
//       User Detials
//     </li>
//     <button>Logout</button>
//   </ul>
// </aside>
// </div> 