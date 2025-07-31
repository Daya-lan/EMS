
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { AdminNavbar } from "./Admin/AdminNavbar/AdminNavbar";
import { AdNav } from "./Admin/AdminNavbar/AdNav";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { AdminDashboard } from "./Admin/AdminDashboard/AdminDashboard";
import { ForgetPassword } from "./ForgetPassword/ForgetPassword";
import { AdminManageEvents } from "./Admin/AdminManageEvents/AdminManageEvents";
import { AddEvents } from "./User/AddEvents/AddEvents";
import { UserOrganizer } from "./User/UserOrganizer/UserOrganizer";
import { ManageOrganizer } from "./Admin/ManageOrganizer/ManageOrganizer";
import { Navbar } from "./User/Navbar/Navbar";
import { Dashboard } from "./User/UserDashboard/Dashboard";
import { UserEvents } from "./User/UserEvents/UserEvents";
import { Notification } from "./User/UserNotification/Notification";
import { AuthenContext, LoginDetails } from "./Login/AuthenContext";
import { RejectedOrganizer } from "./Admin/RejectedOrganizer/RejectedOrganizer";
import { AccepetOrganizer } from "./Admin/AccepetOrganizer/AccepetOrganizer";

export const protectRouter = createContext();

const Protector = ({ children }) => {
  const { authen } = useContext(LoginDetails);
  if (authen) {
    return children;
  } else {
    return "" ;
  }
};

const ProtectAdmin = ({ children }) => {
  const { adminAuthen } = useContext(LoginDetails);
  if (adminAuthen) {
    return children;
  } else {
    return <Login/> ;
  }
};



const MainNavbar = () => {
  const location = useLocation();

  // Define the routes where the Navbar should NOT be shown
  const hiddenNavbarRoutes = ["/", "/Register", "/ForgetPassword"];

  // Check if the current route is in the hiddenNavbarRoutes list
  const hideNavbar = hiddenNavbarRoutes.includes(location.pathname);

  return !hideNavbar && <Navbar />;
};

const AdminNav = () => {
  const location = useLocation();

  // Define the routes where the Navbar should NOT be shown
  const hiddenAdminNavbarRoutes = [
    "/",
    // "/AdminForgetPassword",
    "/Register",
    "/ForgetPassword",
  ];

  // Check if the current route is in the hiddenNavbarRoutes list
  const hideAdminNavbar = hiddenAdminNavbarRoutes.includes(location.pathname);

  return !hideAdminNavbar && <AdminNavbar />  ;
};

export const Main = () => {
  const [updateEvent, setUpdateEvent] = useState([{ Status: "" }]);
  const [userDtl, setUserDtl] = useState([]);
  const [evnDtl, setEvnDtl] = useState([]);
  const [userId, setUserId] = useState("");
  const [EventID, setEventID] = useState("");
  const [DelEventID, setDelEventID] = useState({});
  const [dash, setDash] = useState(null);
  const { authen, adminAuthen } = useContext(LoginDetails);

  useEffect(() => {
    setUserId(userDtl._id);
    setEventID(evnDtl.userId);
  }, [userDtl, evnDtl]);

  return (
    <protectRouter.Provider
      value={{
        updateEvent,
        setUpdateEvent,
        dash,
        setDash,
        userDtl,
        setUserDtl,
        userId,
        setUserId,
        EventID,
        evnDtl,
        setEvnDtl,
        DelEventID,
        setDelEventID,
      }}
    >
      <Router>
        {dash ? (
          <div className=".container-fluid p-0 -m-0" id="frontend-main-parent">
            {adminAuthen ?<AdNav/>: <Login/> }
            <div className="row d-flex p-0 m-0" id="frontend-second-parent">
              <div
                className="col p-0 m-0"
                style={adminAuthen ? { display: "block" } : { display: "none" }}
                id="frontend-first-Child"
              >
                {/* <ProtectAdmin>
                    <AdminNav />
                  </ProtectAdmin> */}
                {adminAuthen ? (
                  <ProtectAdmin>
                    <AdminNav />
                  </ProtectAdmin>
                ) : (
                  ""
                )}
              </div>
              <div
                className={
                  adminAuthen ? "col-lg-9 m-0 p-0" : "col-12 m-0  p-0 "
                }
                style={{ overflow: "hidden", float: "start" }}
              >
                <div id="frontend-second-Child">
                  <Routes>
                    {/* <Route
                      path="/ForgetPassword"
                      element={<ForgetPassword />}
                    /> */}
                    <Route
                      path="/AdminManageEvent"
                      element={
                        <ProtectAdmin>
                          <AdminManageEvents />
                        </ProtectAdmin>
                      }
                    />
                    <Route
                      path="/AdminDashboard"
                      element={
                        <ProtectAdmin>
                          <AdminDashboard />
                        </ProtectAdmin>
                      }
                    />
                    <Route
                      path="/ManageOrganizer"
                      element={
                        <ProtectAdmin>
                          <ManageOrganizer />
                        </ProtectAdmin>
                      }
                    />
                    <Route
                      path="/AccepetedOrganizer"
                      element={
                        <ProtectAdmin>
                          <AccepetOrganizer/>
                        </ProtectAdmin>
                      }
                    />
                    <Route
                      path="/RejectedOrganizer"
                      element={
                        <ProtectAdmin>
                          <RejectedOrganizer/>
                        </ProtectAdmin>
                      }
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <AuthenContext>
             {/* Conditional Navbar  */}
             <Protector>
              <MainNavbar />
            </Protector>
            <Routes>
              {authen ? (
                <Route
                  path="Nav"
                  element={
                    <Protector>
                      <MainNavbar />
                    </Protector>
                  }
                />
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/Register" element={<Register />} />
                  <Route path="/ForgetPassword" element={<ForgetPassword />} />
                </>
              )}
              <Route
                index path="/Dashboard"
                element={
                  <Protector>
                    <Dashboard />
                  </Protector>
                }
              />
              <Route
                path="/AddEvents"
                element={
                  <Protector>
                    <AddEvents />
                  </Protector>
                }
              />
              <Route
                path="/UserEvents"
                element={
                  <Protector>
                    <UserEvents />
                  </Protector>
                }
              />
              <Route
                path="/UserOrganizer"
                element={
                  <Protector>
                    <UserOrganizer />
                  </Protector>
                }
              />
              <Route
                path="/Notification"
                element={
                  <Protector>
                    <Notification />
                  </Protector>
                }
              />
            </Routes>
          </AuthenContext>
        )}
      </Router>
    </protectRouter.Provider>
  );
};
