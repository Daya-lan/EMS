import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./AdminManageEvents.css";
import { MdOutlineAutoDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import AssignOrganizer from "../AssingOrganizer/AssignOrganizer";
import { protectRouter } from "../../Main";

export const AdminManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [userEventsError, setuserEventsError] = useState(null);
  const { updateEvent, setUpdateEvent, setEvnDtl, setDelEventID, DelEventID } =
    useContext(protectRouter);
  const [message, setMessage] = useState([{
    userId:"",Message: "" }]);
    console.log("message",message);
  const [searchEvent, setSearchEvent] = useState("");
  const [_id, set_ID] = useState({});
  console.log(_id);

  const handelManageEventChange = (e) => {
    const { name, value } = e.target;
    setUpdateEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handelAdminManagementsubmit = async (e) => {
    //Data Updating
    e.preventDefault();
    try {
      const EventResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/Eve/ManageUpdated${updateEvent._id}`,
        updateEvent
      );
      if (EventResponse.data) {
        alert("EventUpdate Create Successfully");
        fetchingData();
        updateEvent([
          {
            EventName: "",
            category: "",
            Venue: "",
            pincode: "",
            city: "",
            startDate: "",
            GuestList: "",
            Budget: "",
            Details: "",
            Status: "",
          },
        ]);
      }
    } catch (error) {
      console.log("error when you UpdateEvent", error);
    }
  };

  const handelClick = (Items) => {
    //Send Event Data for Update Event
    setUpdateEvent(Items);
    setMessage(Items)
  };

  const handelOrganizerClick = (Items) => {
    setEvnDtl(Items);
  };

  useEffect(() => {
    //fetch data help of useState
    fetchingData();
  }, []);

  const fetchingData = async () => {
    /*fetching Data for Show */
    try {
      const Events = await axios.get(`${process.env.REACT_APP_API_URL}/Eve/allEvents`);
      if (Events.data.AllEvents) {
        console.log("data fetched successfully");
        setEvents(Events.data.AllEvents);
      }
    } catch (error) {
      setuserEventsError("something Error,please relode the page", error);
      console.log("somthing error ", error);
    }
  };

  const handelSearchChange = (e) => {
    setSearchEvent(e.target.value);
  };

  const handelClickSendId = (_id,userId) => {
    set_ID(_id);
    setDelEventID(userId);
  };

  const handelClickDelete = async (_id) => {
    try {
      const DltEvent = await axios.post(
        `${process.env.REACT_APP_API_URL}/Eve/DeleteEvent/${_id}`
      );
      if (DltEvent.data) {
        alert("Event Deleted successfully");
        console.log("Event Deleted Successfully");
      }
    } catch (error) {
      console.log("Error while dlt Event", error);
    }

    try {
      const DltOrganizer = await axios.post(
        `${process.env.REACT_APP_API_URL}/Eve/DeleteOrganizer/${DelEventID}`
      );
      if (DltOrganizer.data.DeleteOrganizer) {
        alert("Organizer delete Successfully");
        console.log(
          "Organizer Deleted Successfully",
          DltOrganizer.data.DeleteOrganizer
        );
        setDelEventID(null);
      }
    } catch (error) {
      console.log("error while Deleting Organizer");
    }

    fetchingData();
  };

  //Send Message to user Function

  const handelChangeNotification = (e) =>{
    const {name,value} = e.target;
    setMessage((prev)=>({...prev,[name]:value}))
  }

  const handelNotificationSubmit = async(e) => {
    e.preventDefault();
    try {
      const UserMessage = await axios.post(`${process.env.REACT_APP_API_URL}/Eve/AddNotification`,message)
      if(UserMessage.data){
        alert("Message Send Successfully")
        setMessage([{
          userId:"",
          Message:""
        }])
      }
    } catch (error) {
      console.log("error while send message to User",error);
    }

  };

  return (
    { userEventsError } && (
      <section className=".container-fluid p-0 " id="ManageEvent-Main-Parent">
        <div className="p-0" id="ManageEvents-Heading">
          <p>Manage Events</p>
        </div>
        <div
          className="w-100 d-flex  justify-content-end align-items-center p-3"
          id="ManageEvents-Search-box"
        >
          <label htmlFor="Search">Search</label>
          <div className="d-flex justify-content-center align-items-center position-relative">
            <input
              className="position-relative"
              type="search"
              placeholder="Search"
              value={searchEvent}
              onChange={handelSearchChange}
            />
            <p className="position-absolute  " id="ManageEvents-Search-Icon">
              <FaSearch />
            </p>
          </div>
        </div>
        <div className="row p-0 m-0" id="ManageEvents-second-Parent">
          <div
            className="col-12 p-0 m-0"
            class="table-responsive"
            id="Events-First-child"
          >
            { events.length===0?< div id="Accepted-Organizer-Message" >
              <p id="page-logo"  >no Events Found</p>
              </div>  :
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event Name</th>
                  <th>Venue</th>
                  <th>City</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Budget</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ overflowy: "scroll" }}>
                {events
                  .filter((Items) => {
                    return searchEvent.toLowerCase() === ""
                      ? Items
                      : Items.Status.toLowerCase().includes(searchEvent);
                  })
                  .map((Items, index) => (
                    <tr key={Items._id}>
                      <td>{index}</td>
                      <td>{Items.EventName}</td>
                      <td>{Items.Venue}</td>
                      <td>{Items.city}</td>
                      <td>{Items.startDate}</td>
                      <td>{Items.Enddate}</td>
                      <td>{Items.Budget}</td>
                      <td className="">
                        <p
                          className=""
                          id="AdminEvents-Status"
                          style={
                              Items.Status === "Waiting..."
                              ? { backgroundColor: "purple", color: "white" }
                              : Items.Status === "Inactive"
                              ? { backgroundColor: "red", color: "white" }
                              : Items.Status === "Active"
                              ? { backgroundColor: "green", color: "white" }
                              : Items.Status === "Cancel"
                              ? { backgroundColor: "red", color: "whitesmoke" }
                              : { backgroundColor: "blue", color: "white" }
                          }
                        >
                          {Items.Status}
                        </p>
                      </td>
                      <td
                        className="d-flex"
                        id="AdminManagevent-Update-and-dlt-icon-parent"
                      >
                        <p
                          className=""
                          id="AdminManageEvent-Update-Icons"
                          class="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#updateStatus"
                          onClick={() => handelClick(Items)}
                        >
                          <FaEdit />
                        </p>

                        <p
                          id="AdminMangaeEvent-Organizer-icon"
                          onClick={() => handelOrganizerClick(Items)}
                          class="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#AssignOrganizer"
                        >
                          <FaUserEdit />
                        </p>

                        <p
                          className=""
                          class="btn"
                          id="AdminManageEvent-Dlt-Icons"
                          data-bs-toggle="modal"
                          data-bs-target="#AdminEvent-Delete-Model-main-parent"
                          onClick={() => handelClickSendId(Items._id,Items.userId)}
                        >
                          <MdOutlineAutoDelete />
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
              }
          </div>
        </div>

        {/* Admin Update user Status Model */}

        <form onSubmit={handelAdminManagementsubmit}>
          <div
            class="modal fade"
            id="updateStatus"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog"
              id="Admin-Management-update-Model-second-parent"
            >
              <div
                class="modal-content"
                id="Admin-Managemen-Update-Model-First-child"
              >
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Update Event Status
                  </h1>
                </div>
                <div class="modal-body">
                  <div
                    className="col-12  py-3 d-flex flex-md-row flex-sm-column justify-content-start align-items-start"
                    id="update-Status-Main-Parent"
                  >
                    <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
                      <label htmlFor="Status"> Update Status</label>
                      <div className="w-100 py-2">
                        <select
                          className="w-100"
                          name="Status"
                          value={updateEvent.Status}
                          onChange={handelManageEventChange}
                        >
                          <option>Waiting...</option>
                          <option>Inactive</option>
                          <option>Active</option>
                          <option>Completed</option>
                          <option>Cancel</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#SendMessage"
                  >
                    Save Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Admin Event Delete Model */}

        <div
          class="modal fade"
          id="AdminEvent-Delete-Model-main-parent"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body" id="AdminEvent-delete-model-body">
                ARE YOU SURE YOU WANT TO DELETE THIS EVENT
              </div>
              <div class="modal-footer" id="Admin-Delete-Event-Buttons">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => {
                    set_ID(null);
                  }}
                  data-bs-dismiss="modal"
                >
                  cancel
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => handelClickDelete(_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* send message to user Model */}

        <form onSubmit={handelNotificationSubmit}>
          <div
            class="modal fade"
            id="SendMessage"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog"
              id="Admin-Management-update-Model-second-parent"
            >
              <div
                class="modal-content"
                id="Admin-Managemen-Update-Model-First-child"
              >
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Notify Event Update To User
                  </h1>
                </div>
                <div class="modal-body">
                  <div
                    className="col-12  py-3 d-flex flex-md-row flex-sm-column justify-content-start align-items-start"
                    id="update-Status-Main-Parent"
                  >
                    <div className=" w-100 d-flex flex-column justify-content-center align-items-start" id="Admin-msg-main-Parent">
                      <div className="d-flex">
                      <label className=""><MdOutlineMessage /></label>
                      <label className="d-flex justify-content-center align-items-center" htmlFor="Status">Message</label>
                      </div>
                      <div className="w-100 py-2" id="Admin-msg-Second-Parent">
                        <textarea
                          className="w-100 p-2"
                          name="Message"
                          value={message.Message}
                          onChange={handelChangeNotification}
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    class="btn btn-primary"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <AssignOrganizer />
      </section>
    )
  );
};

//  <section className=".container-fluid" id="AddEvent-main-Parent">
//                     <div className="row " id="AddEvent-Second-Parent">
//                         <form >
//                         <div className="d-flex " id="AddEvents-Heading">
//                             <h2>Update Events</h2>
//                         </div>
//                         <div
//                             className="col-12 py-3 d-flex flex-md-row flex-sm-column justify-content-center align-items-start"
//                             id="AddEvent-First-Child"
//                         >
//                             <div
//                             className="w-100 d-flex flex-column justify-content-center align-items-start"
//                             id="EventName-Parent"
//                             >
//                             <label htmlFor="EventName">EventName</label>
//                             <div className="w-100 py-2 ">
//                                 <input
//                                 className="w-100"
//                                 type="text"
//                                 placeholder="EventName"
//                                 name="EventName"
//                                 value={updateEvent.EventName}
//                                 onChange={handelManageEventChange}
//                                 />
//                             </div>
//                             </div>
//                             <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
//                             <label htmlFor="CategoryName">Category Name</label>
//                             <div className="w-100 py-2">
//                                 <select  className="w-100" name="category" value={updateEvent.category} onChange={handelManageEventChange} >
//                                 <option>Choose</option>
//                                 <option>Birthday</option>
//                                 <option>Wedding</option>
//                                 <option>Marriage</option>
//                                 <option>Party Event</option>
//                                 <option>Ear fuction</option>
//                                 </select>
//                             </div>
//                             </div>
//                         </div>
//                         <div
//                             className="col-12 py-1 d-flex flex-md-row flex-sm-column justify-content-center align-items-start"
//                             id="AddEvent-Second-Child"
//                         >
//                             <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//                             <label htmlFor="Venue">Venue</label>
//                             <div className="w-100 py-2">
//                                 <input
//                                 type="text"
//                                 placeholder="Venue"
//                                 name="Venue"
//                                 value={updateEvent.Venue}
//                                 onChange={handelManageEventChange}
//                                 />
//                             </div>
//                             </div>

//                             <div className="w-100 d-flex flex-column justify-content-center align-items-start ">
//                             <label htmlFor="Pincode">Pincode</label>
//                             <div className="w-100 py-2">
//                                 <input
//                                 type="number"
//                                 name="pincode"
//                                 value={updateEvent.pincode}
//                                 onChange={handelManageEventChange}
//                                 />
//                             </div>
//                             </div>
//                         </div>

//                         <div
//                             className="col-12 py-3 d-flex flex-md-row flex-sm-column justify-content-center align-items-start "
//                             id="AddEvent-Third-Child"
//                         >
//                             <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
//                             <label htmlFor="City">City</label>
//                             <div className="w-100 py-2">
//                                 <select
//                                 className="w-100"
//                                 name="city"
//                                 value={updateEvent.city}
//                                 onChange={handelManageEventChange}
//                                 >
//                                 <option>Choose</option>
//                                 <option>Pondicherry</option>
//                                 <option>Chennai</option>
//                                 <option>Coimbotor</option>
//                                 <option>Cuddalore</option>
//                                 <option>tirunelveli</option>
//                                 <option>Madurai</option>
//                                 <option>Tiruchiy</option>
//                                 <option>Nagapattinam</option>
//                                 </select>
//                             </div>
//                             </div>

//                             <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//                             <label htmlFor="budget">Budget</label>
//                             <div className="w-100 py-2">
//                                 <input
//                                 type="number"
//                                 placeholder="Your Budget"
//                                 name="Budget"
//                                 value={updateEvent.Budget}
//                                 onChange={handelManageEventChange}
//                                 />
//                             </div>
//                             </div>
//                         </div>
//                         <div
//                             className="col-12 py-3 d-flex flex-md-row flex-sm-column justify-content-center align-items-start "
//                             id="AddEvent-Fourth-Child"
//                         >
//                             <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//                             <label htmlFor="startDate">Start Date</label>
//                             <div className="w-100 py-2">
//                                 <input
//                                 type="Date"
//                                 placeholder="StartDate"
//                                 name="startDate"
//                                 value={updateEvent.startDate}
//                                 onChange={handelManageEventChange}
//                                 />
//                             </div>
//                             </div>
//                             <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//                             <label htmlFor="EndDate">End Date</label>
//                             <div className="w-100 py-2">
//                                 <input
//                                 type="Date"
//                                 placeholder="EndDate"
//                                 name="Enddate"
//                                 value={updateEvent.Enddate}
//                                 onChange={handelManageEventChange}
//                                 />
//                             </div>
//                             </div>
//                         </div>
//                         <div
//                             className="col-12  py-3 d-flex flex-md-row flex-sm-column justify-content-start align-items-start "
//                             id="AddEvent-Fifth-Child"
//                         >
//                             <div className="d-flex flex-column justify-content-center align-items-start">
//                             <label htmlFor="Details">Details</label>
//                             <div className="py-2">
//                                 <textarea className="form-control"
//                                 placeholder="Detials"
//                                 name="Details"
//                                 value={updateEvent.Details}
//                                 onChange={handelManageEventChange}
//                                 rows="3"
//                                 cols="180"
//                                 />
//                             </div>
//                             </div>
//                             <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//                             <label htmlFor="EndDate">Guest List</label>
//                             <div className="w-100 py-2">
//                                 <input
//                                 type="number"
//                                 placeholder="Guest List"
//                                 name="GuestList"
//                                 value={updateEvent.GuestList}
//                                 onChange={handelManageEventChange}
//                                 />
//                             </div>
//                             </div>
//                         </div>
//                         <div className='col-12  py-3 d-flex flex-md-row flex-sm-column justify-content-start align-items-start' id="AddEvent-Fifth-Child">
//                         <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
//                             <label htmlFor="Status">Status</label>
//                             <div className="w-100 py-2">
//                                 <select
//                                 className="w-100"
//                                 name="Status"
//                                 value={updateEvent.Status}
//                                 onChange={handelManageEventChange}
//                                 >
//                                 <option>Choose</option>
//                                 <option>Waiting...</option>
//                                 <option>Inactive</option>
//                                 <option>Active</option>
//                                 <option>Completed</option>
//                                 </select>
//                             </div>
//                             </div>
//                         </div>
//                         <div className="col-12 py-3 d-flex justify-content-start align-items-start "
//                             id="AddEvent-Sixth-Child">
//                             <div>
//                                 <button type="submit">AddEvent</button>
//                             </div>
//                         </div>
//                         </form>
//                     </div>
//                     </section>

// tempevents

//    <section className=".container-fluid" id="AddEvent-main-Parent">
// <div className="row " id="AddEvent-Second-Parent">
//     <form >
//     <div className="d-flex " id="AddEvents-Heading">
//         <h2>Update Events</h2>
//     </div>
//     <div
//         className="col-12 py-3 d-flex flex-md-row flex-sm-column justify-content-center align-items-start"
//         id="AddEvent-First-Child"
//     >
//         <div
//         className="w-100 d-flex flex-column justify-content-center align-items-start"
//         id="EventName-Parent"
//         >
//         <label htmlFor="EventName">EventName</label>
//         <div className="w-100 py-2 ">
//             <input
//             className="w-100"
//             type="text"
//             placeholder="EventName"
//             name="EventName"
//             value={tempEvent.EventName}
//             onChange={handelManageEventChange}
//             />
//         </div>
//         </div>
//         <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
//         <label htmlFor="CategoryName">Category Name</label>
//         <div className="w-100 py-2">
//             <select  className="w-100" name="category" value={tempEvent.category} onChange={handelManageEventChange} >
//             <option>Choose</option>
//             <option>Birthday</option>
//             <option>Wedding</option>
//             <option>Marriage</option>
//             <option>Party Event</option>
//             <option>Ear fuction</option>
//             </select>
//         </div>
//         </div>
//     </div>
//     <div
//         className="col-12 py-1 d-flex flex-md-row flex-sm-column justify-content-center align-items-start"
//         id="AddEvent-Second-Child"
//     >
//         <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//         <label htmlFor="Venue">Venue</label>
//         <div className="w-100 py-2">
//             <input
//             type="text"
//             placeholder="Venue"
//             name="Venue"
//             value={tempEvent.Venue}
//             onChange={handelManageEventChange}
//             />
//         </div>
//         </div>

//         <div className="w-100 d-flex flex-column justify-content-center align-items-start ">
//         <label htmlFor="Pincode">Pincode</label>
//         <div className="w-100 py-2">
//             <input
//             type="number"
//             name="pincode"
//             value={tempEvent.pincode}
//             onChange={handelManageEventChange}
//             />
//         </div>
//         </div>
//     </div>

//     <div
//         className="col-12 py-3 d-flex flex-md-row flex-sm-column justify-content-center align-items-start "
//         id="AddEvent-Third-Child"
//     >
//         <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
//         <label htmlFor="City">City</label>
//         <div className="w-100 py-2">
//             <select
//             className="w-100"
//             name="city"
//             value={tempEvent.city}
//             onChange={handelManageEventChange}
//             >
//             <option>Choose</option>
//             <option>Pondicherry</option>
//             <option>Chennai</option>
//             <option>Coimbotor</option>
//             <option>Cuddalore</option>
//             <option>tirunelveli</option>
//             <option>Madurai</option>
//             <option>Tiruchiy</option>
//             <option>Nagapattinam</option>
//             </select>
//         </div>
//         </div>

//         <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//         <label htmlFor="budget">Budget</label>
//         <div className="w-100 py-2">
//             <input
//             type="number"
//             placeholder="Your Budget"
//             name="Budget"
//             value={tempEvent.Budget}
//             onChange={handelManageEventChange}
//             />
//         </div>
//         </div>
//     </div>
//     <div
//         className="col-12 py-3 d-flex flex-md-row flex-sm-column justify-content-center align-items-start "
//         id="AddEvent-Fourth-Child"
//     >
//         <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//         <label htmlFor="startDate">Start Date</label>
//         <div className="w-100 py-2">
//             <input
//             type="Date"
//             placeholder="StartDate"
//             name="startDate"
//             value={tempEvent.startDate}
//             onChange={handelManageEventChange}
//             />
//         </div>
//         </div>
//         <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//         <label htmlFor="EndDate">End Date</label>
//         <div className="w-100 py-2">
//             <input
//             type="Date"
//             placeholder="EndDate"
//             name="Enddate"
//             value={tempEvent.Enddate}
//             onChange={handelManageEventChange}
//             />
//         </div>
//         </div>
//     </div>
//     <div
//         className="col-12  py-3 d-flex flex-md-row flex-sm-column justify-content-start align-items-start "
//         id="AddEvent-Fifth-Child"
//     >
//         <div className="d-flex flex-column justify-content-center align-items-start">
//         <label htmlFor="Details">Details</label>
//         <div className="py-2">
//             <textarea className="form-control"
//             placeholder="Detials"
//             name="Details"
//             value={tempEvent.Details}
//             onChange={handelManageEventChange}
//             rows="3"
//             cols="180"
//             />
//         </div>
//         </div>
//         <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//         <label htmlFor="EndDate">Guest List</label>
//         <div className="w-100 py-2">
//             <input
//             type="number"
//             placeholder="Guest List"
//             name="GuestList"
//             value={tempEvent.GuestList}
//             onChange={handelManageEventChange}
//             />
//         </div>
//         </div>
//     </div>
//     <div className='col-12  py-3 d-flex flex-md-row flex-sm-column justify-content-start align-items-start' id="AddEvent-Fifth-Child">
//     <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
//         <label htmlFor="Status">Status</label>
//         <div className="w-100 py-2">
//             <select
//             className="w-100"
//             name="Status"
//             value={tempEvent.Status}
//             onChange={handelManageEventChange}
//             >
//             <option>Choose</option>
//             <option>Waiting...</option>
//             <option>Inactive</option>
//             <option>Active</option>
//             <option>Completed</option>
//             </select>
//         </div>
//         </div>
//     </div>
//     <div className="col-12 py-3 d-flex justify-content-start align-items-start "
//         id="AddEvent-Sixth-Child">
//         <div>
//             <button type="submit">AddEvent</button>
//         </div>
//     </div>
//     </form>
// </div>
// </section>
