

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
  const hiddenNavbarRoutes = ["/Login", "/Register", "/ForgetPassword"];

  // Check if the current route is in the hiddenNavbarRoutes list
  const hideNavbar = hiddenNavbarRoutes.includes(location.pathname);

  return !hideNavbar && <Navbar />;
};

const AdminNav = () => {
  const location = useLocation();

  // Define the routes where the Navbar should NOT be shown
  const hiddenAdminNavbarRoutes = [
    "/Login",
    "/login",
    "/AdminForgetPassword",
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
                    <Route path="/log-in" element={<Login />} />
                    <Route
                      path="/ForgetPassword"
                      element={<ForgetPassword />}
                    />
                    <Route
                      path="/AdminManageEvent"
                      element={
                        <ProtectAdmin>
                          <AdminManageEvents />
                        </ProtectAdmin>
                      }
                    />
                    <Route
                      path="/Dashboard"
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
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Register" element={<Register />} />
                  <Route path="/ForgetPassword" element={<ForgetPassword />} />
                </>
              )}
              <Route
                index path="/"
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



// import {
//   Navigate,
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import { AdminNavbar } from "./Admin/AdminNavbar/AdminNavbar";
// import { AdNav } from "./Admin/AdminNavbar/AdNav";
// import { Register } from "./Register/Register";
// import { Login } from "./Login/Login";
// import { AdminDashboard } from "./Admin/AdminDashboard/AdminDashboard";
// import { ForgetPassword } from "./ForgetPassword/ForgetPassword";
// import { AdminManageEvents } from "./Admin/AdminManageEvents/AdminManageEvents";
// import { AddEvents } from "./User/AddEvents/AddEvents";
// import { UserOrganizer } from "./User/UserOrganizer/UserOrganizer";
// import { ManageOrganizer } from "./Admin/ManageOrganizer/ManageOrganizer";
// import { Navbar } from "./User/Navbar/Navbar";
// import { Dashboard } from "./User/UserDashboard/Dashboard";
// import { UserEvents } from "./User/UserEvents/UserEvents";
// import { Notification } from "./User/UserNotification/Notification";
// import { AuthenContext, LoginDetails } from "./Login/AuthenContext";
// import { NoPage } from "./NoPage";
// import { RejectedOrganizer } from "./Admin/RejectedOrganizer/RejectedOrganizer";
// import { AccepetOrganizer } from "./Admin/AccepetOrganizer/AccepetOrganizer";

// export const protectRouter = createContext();

// const Protector = ({ children }) => {
//   const { authen } = useContext(LoginDetails);
//   if (authen) {
//     return children;
//   } else {
//     return <Login/> ;
//   }
// };

// const ProtectAdmin = ({ children }) => {
//   const { adminAuthen } = useContext(LoginDetails);
//   if (adminAuthen) {
//     return children;
//   } else {
//     return <Login/> ;
//   }
// };

// const MainNavbar = () => {
//   const location = useLocation();

//   // Define the routes where the Navbar should NOT be shown
//   const hiddenNavbarRoutes = ["/Login", "/Register", "/ForgetPassword"];

//   // Check if the current route is in the hiddenNavbarRoutes list
//   const hideNavbar = hiddenNavbarRoutes.includes(location.pathname);

//   return !hideNavbar && <Navbar />;
// };

// const AdminNav = () => {
//   const location = useLocation();

//   // Define the routes where the Navbar should NOT be shown
//   const hiddenAdminNavbarRoutes = [
//     "/Login",
//     "/login",
//     "/AdminForgetPassword",
//     "/Register",
//     "/ForgetPassword",
//   ];

//   // Check if the current route is in the hiddenNavbarRoutes list
//   const hideAdminNavbar = hiddenAdminNavbarRoutes.includes(location.pathname);

//   return !hideAdminNavbar && <AdminNavbar />  ;
// };

// export const Main = () => {
//   const [updateEvent, setUpdateEvent] = useState([{ Status: "" }]);
//   const [userDtl, setUserDtl] = useState([]);
//   const [evnDtl, setEvnDtl] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [EventID, setEventID] = useState("");
//   const [DelEventID, setDelEventID] = useState({});
//   const [dash, setDash] = useState(null);
//   const { authen, adminAuthen } = useContext(LoginDetails);

//   useEffect(() => {
//     setUserId(userDtl._id);
//     setEventID(evnDtl.userId);
//   }, [userDtl, evnDtl]);

//   return (
//     <protectRouter.Provider
//       value={{
//         updateEvent,
//         setUpdateEvent,
//         dash,
//         setDash,
//         userDtl,
//         setUserDtl,
//         userId,
//         setUserId,
//         EventID,
//         evnDtl,
//         setEvnDtl,
//         DelEventID,
//         setDelEventID,
//       }}
//     >
//       <Router>
//         {dash ? (
//           <div className=".container-fluid p-0 -m-0" id="frontend-main-parent">
//             {adminAuthen ?<AdNav/>: <Login/> }
//             <div className="row d-flex p-0 m-0" id="frontend-second-parent">
//               <div
//                 className="col p-0 m-0"
//                 style={adminAuthen ? { display: "block" } : { display: "none" }}
//                 id="frontend-first-Child"
//               >
//                 <ProtectAdmin>
//                     <AdminNav />
//                   </ProtectAdmin>
//                 {/* {adminAuthen ? (
//                   <ProtectAdmin>
//                     <AdminNav />
//                   </ProtectAdmin>
//                 ) : (
//                   ""
//                 )} */}
//               </div>
//               <div
//                 className={
//                   adminAuthen ? "col-lg-9 m-0 p-0" : "col-12 m-0  p-0 "
//                 }
//                 style={{ overflow: "hidden", float: "start" }}
//               >
//                 <div id="frontend-second-Child">
//                   <Routes>
//                     <Route path="/log-in" element={<Login />} />
//                     <Route
//                       path="/ForgetPassword"
//                       element={<ForgetPassword />}
//                     />
//                     <Route
//                       path="/AdminManageEvent"
//                       element={
//                         <ProtectAdmin>
//                           <AdminManageEvents />
//                         </ProtectAdmin>
//                       }
//                     />
//                     <Route
//                       path="/Dashboard"
//                       element={
//                         <ProtectAdmin>
//                           <AdminDashboard />
//                         </ProtectAdmin>
//                       }
//                     />
//                     <Route
//                       path="/ManageOrganizer"
//                       element={
//                         <ProtectAdmin>
//                           <ManageOrganizer />
//                         </ProtectAdmin>
//                       }
//                     />
//                     <Route
//                       path="/AccepetedOrganizer"
//                       element={
//                         <ProtectAdmin>
//                           <AccepetOrganizer/>
//                         </ProtectAdmin>
//                       }
//                     />
//                     <Route
//                       path="/RejectedOrganizer"
//                       element={
//                         <ProtectAdmin>
//                           <RejectedOrganizer/>
//                         </ProtectAdmin>
//                       }
//                     />
//                   </Routes>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <AuthenContext>
//              {/* Conditional Navbar  */}
//              <Protector>
//               <MainNavbar />
//             </Protector>
//             <Routes>
//               {/* {authen ? (
//                 <Route
//                   path="Nav"
//                   element={
//                     <Protector>
//                       <MainNavbar />
//                     </Protector>
//                   }
//                 />
//               ) : (
//                 <>
//                   <Route path="/Login" element={<Login />} />
//                   <Route path="/Register" element={<Register />} />
//                   <Route path="/ForgetPassword" element={<ForgetPassword />} />
//                 </>
//               )} */}
//               <Route
//                 index path="/"
//                 element={
//                   <Protector>
//                     <Dashboard />
//                   </Protector>
//                 }
//               />
//               <Route
//                 path="/AddEvents"
//                 element={
//                   <Protector>
//                     <AddEvents />
//                   </Protector>
//                 }
//               />
//               <Route
//                 path="/UserEvents"
//                 element={
//                   <Protector>
//                     <UserEvents />
//                   </Protector>
//                 }
//               />
//               <Route
//                 path="/UserOrganizer"
//                 element={
//                   <Protector>
//                     <UserOrganizer />
//                   </Protector>
//                 }
//               />
//               <Route
//                 path="/Notification"
//                 element={
//                   <Protector>
//                     <Notification />
//                   </Protector>
//                 }
//               />
//             </Routes>
//           </AuthenContext>
//         )}
//       </Router>
//     </protectRouter.Provider>
//   );
// };

// import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   Navigate,
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   useLocation,
// } from "react-router-dom";
// import { AdminNavbar } from "./Admin/AdminNavbar/AdminNavbar";
// import { AdNav } from "./Admin/AdminNavbar/AdNav";
// import { Register } from "./Register/Register";
// import { Login } from "./Login/Login";
// import { AdminDashboard } from "./Admin/AdminDashboard/AdminDashboard";
// import { ForgetPassword } from "./ForgetPassword/ForgetPassword";
// import { AdminManageEvents } from "./Admin/AdminManageEvents/AdminManageEvents";
// import { AddEvents } from "./User/AddEvents/AddEvents";
// import { UserOrganizer } from "./User/UserOrganizer/UserOrganizer";
// import { ManageOrganizer } from "./Admin/ManageOrganizer/ManageOrganizer";
// import { Navbar } from "./User/Navbar/Navbar";
// import { Dashboard } from "./User/UserDashboard/Dashboard";
// import { UserEvents } from "./User/UserEvents/UserEvents";
// import { Notification } from "./User/UserNotification/Notification";
// import { AuthenContext, LoginDetails } from "./Login/AuthenContext";

// export const protectRouter = createContext();

// const Protector = ({ children }) => {
//   const { authen } = useContext(LoginDetails);
//   if (authen ) {
//     return children;
//   } else  {
//     return <Navigate to="/Login" />;
//   }

// };

// const UserNavbar = () => {
//   const location = useLocation();

//   // Define the routes where the Navbar should NOT be shown
//   const hiddenNavbarRoutes = ["/Login", "/Register", "/ForgetPassword"];

//   // Check if the current route is in the hiddenNavbarRoutes list
//   const hideNavbar = hiddenNavbarRoutes.includes(location.pathname);

//   return !hideNavbar && <Navbar />

// };

// // const ADNavbar = () => {
// //   const location = useLocation();

// //   // Define the routes where the Navbar should NOT be shown
// //   const hiddenAdminNavbarRoutes = ["/login", "/AdminForgetPassword"];

// //   // Check if the current route is in the hiddenNavbarRoutes list
// //   const hideAdminNavbar = hiddenAdminNavbarRoutes.includes(location.pathname);

// //   return !hideAdminNavbar &&
// //     <>
// //     <AdNav />
// //     <AdminNavbar/>
// //    </>

// // };

// export const Main = () => {
//   const [updateEvent, setUpdateEvent] = useState([{ Status: "" }]);
//   const [userDtl, setUserDtl] = useState([]);
//   const [evnDtl, setEvnDtl] = useState([]);
//   //user id store usesatate
//   const [userId, setUserId] = useState("");
//   //event delete id store useState
//   const [EventID, setEventID] = useState("");
//   // Organizer deleted id stored usesate
//   const [DelEventID, setDelEventID] = useState({});
//   console.log(EventID);
//   const { authen,adminAuthen } = useContext(LoginDetails);

//   useEffect(() => {
//     setUserId(userDtl._id);
//     setEventID(evnDtl.userId);
//   }, [userDtl, evnDtl]);

//   const [dash, setDash] = useState(null);

//   return (
//     <protectRouter.Provider
//       value={{
//         updateEvent,
//         setUpdateEvent,
//         dash,
//         setDash,
//         userDtl,
//         setUserDtl,
//         userId,
//         setUserId,
//         EventID,
//         evnDtl,
//         setEvnDtl,
//         DelEventID,
//         setDelEventID,
//       }}
//     >
//       {/* <Notification/> */}
//       {dash ?
//       (
//             <Router>
//               <div
//                 className=".container-fluid p-0 -m-0"
//                 id="frontend-main-parent"
//               >
//                 <AdNav />
//                 <div className="row d-flex p-0 m-0" id="frontend-second-parent">
//                   <div
//                     className="col p-0 m-0 "
//                     style={{ backgroundColor: "rgb(117, 72, 137)" }}
//                     id="frontend-first-Child"
//                   >
//                     <AdminNavbar />
//                   </div>
//                   <div
//                     className="col-lg-9  m-0 p-0 "
//                     style={{ overflow: "hidden", float: "start" }}
//                   >
//                     <div id="frontend-second-Child">
//                       <Routes>
//                       <Route path= "/Login" element={<Login />} />
//                         <Route
//                           path="/AdminForgetPassword"
//                           element={<ForgetPassword />}
//                         />
//                         <Route
//                           path="/AdminManageEvent"
//                           element={
//                             <Protector><AdminManageEvents /></Protector>
//                           }
//                         />
//                         <Route path="/AdminDashBoard" element={<Protector><AdminDashboard /></Protector> }/>
//                         <Route
//                           path="/ManageOrganizer"
//                           element={<Protector><ManageOrganizer /></Protector>}
//                         />
//                       </Routes>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Router>
//       )

//       :

//       (
//         <AuthenContext>
//         <Router>
//           <UserNavbar/>
//           <Routes>
//             <Route path= "/Login" element={<Login />} />
//             <Route path="/Register" element={<Register />} />
//             <Route path="/ForgetPassword" element={<ForgetPassword />} />
//             <Route  path="/Navbar" element={<Navbar/>} />
//             <Route index path="/" element={ <Protector>
//               <Dashboard /></Protector> } />
//             <Route
//               path="/AddEvents"
//               element={
//                 <Protector> <AddEvents /></Protector>
//               }
//             />
//             <Route
//               path="/UserEvents"
//               element={
//                 <Protector>  <UserEvents /></Protector>
//               }
//             />
//             <Route
//               path="/UserOrganizer"
//               element={
//                   <Protector> <UserOrganizer /></Protector>
//               }
//             />
//             <Route
//               path="/Notification"
//               element={
//                   <Protector> <Notification /></Protector>
//               }
//             />
//           </Routes>
//         </Router>
//         </AuthenContext>
//       )}
//     </protectRouter.Provider>
//   );
// };
