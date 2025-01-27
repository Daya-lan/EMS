import React, { useContext, useState } from "react";
import "./AddEvents.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { protectRouter } from "../../Main";

export const AddEvents = () => {
  const {userId} = useContext(protectRouter)
  const navigate  = useNavigate()
  const [addEvent, SetAddEvent] = useState([
    {
      EventName: "",
      category: "",
      Venue: "",
      pincode: "",
      city: "",
      startDate: "",
      Enddate: "",
      GuestList: "",
      Budget: "",
      Details:"",
      Status:""
    },
  ]);
  

  const handelEventChange = (e) => {
    const {name,value} = e.target
    SetAddEvent((prev)=>({...prev,[name]:value,Status:"Waiting..."}))
  };


  const handelEventSubmit = async (e) =>{
    e.preventDefault()
    try {
      const EventResponse = await axios.post(`${process.env.REACT_APP_API_URL}/Eve/AddEvent${userId}`,addEvent)
      if(EventResponse.data){
        alert("Event Create Successfully")
        SetAddEvent({  EventName: "",
          category: "",
          Venue: "",
          pincode: "",
          city: "",
          startDate: "",
          Enddate: "",
          GuestList: "",
          Budget: "",
          Details:""
        })
        navigate("/UserEvents")
      }
    } catch (error) {
      console.log("error when you AddEvent",error);
    }
  }
  return (
    <section className=".container-fluid" id="AddEvent-main-Parent">
      <div className="row px-2" id="AddEvent-Second-Parent">
        <form className="" onSubmit={handelEventSubmit}>
          <div className="d-flex " id="AddEvents-Heading">
            <p>ADD Events</p>
          </div>
          <div
            className="col-12 py-3 d-flex flex-md-row flex-column justify-content-center align-items-start"
            id="AddEvent-First-Child"
          >
            <div
              className="w-100 d-flex flex-column justify-content-center align-items-start"
              id="EventName-Parent"
            >
              <label htmlFor="EventName">EventName</label>
              <div className="w-100 py-2 ">
                <input
                  className="w-100"
                  type="text"
                  placeholder="EventName"
                  name="EventName"
                  value={addEvent.EventName}
                  onChange={handelEventChange}
                  required
                />
              </div>
            </div>
            <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
              <label htmlFor="CategoryName">Category Name</label>
              <div className="w-100 py-2">
                <select  className="w-100" name="category" value={addEvent.category} onChange={handelEventChange} required  >
                  <option>Choose</option>
                  <option>Private</option>
                  <option>Public</option>
                </select>
              </div>
            </div>
          </div>
          <div
            className="col-12 py-1 d-flex flex-md-row flex-column justify-content-center align-items-start"
            id="AddEvent-Second-Child"
          >
            <div className="w-100 d-flex flex-column justify-content-center align-items-start">
              <label htmlFor="Venue">Venue</label>
              <div className="w-100 py-2">
                <input
                  type="text"
                  placeholder="Venue"
                  name="Venue"
                  value={addEvent.Venue}
                  onChange={handelEventChange}
                  required
                />
              </div>
            </div>

            <div className="w-100 d-flex flex-column justify-content-center align-items-start ">
              <label htmlFor="Pincode">Pincode</label>
              <div className="w-100 py-2">
                <input
                  type="number"
                  name="pincode"
                  value={addEvent.pincode}
                  onChange={handelEventChange}
                  required
                />
              </div>
            </div>
          </div>

          <div
            className="col-12 py-3 d-flex flex-md-row flex-column justify-content-center align-items-start "
            id="AddEvent-Third-Child"
          >
            <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
              <label htmlFor="City">City</label>
              <div className="w-100 py-2">
                <select
                  className="w-100"
                  name="city"
                  value={addEvent.city}
                  onChange={handelEventChange}
                  required
                >
                  <option>Choose</option>
                  <option>Pondicherry</option>
                  <option>Chennai</option>
                  <option>Coimbotor</option>
                  <option>Cuddalore</option>
                  <option>tirunelveli</option>
                  <option>Madurai</option>
                  <option>Tiruchiy</option>
                  <option>Nagapattinam</option>
                </select>
              </div>
            </div>

            <div className="w-100 d-flex flex-column justify-content-center align-items-start">
              <label htmlFor="budget">Budget</label>
              <div className="w-100 py-2">
                <input
                  type="number"
                  placeholder="Your Budget"
                  name="Budget"
                  value={addEvent.Budget}
                  onChange={handelEventChange}
                  required
                />
              </div>
            </div>
          </div>
          <div
            className="col-12 py-3 d-flex flex-md-row flex-column justify-content-center align-items-start "
            id="AddEvent-Fourth-Child"
          >
            <div className="w-100 d-flex flex-column justify-content-center align-items-start">
              <label htmlFor="startDate">Start Date</label>
              <div className="w-100 py-2">
                <input
                  type="Date"
                  placeholder="StartDate"
                  name="startDate"
                  value={addEvent.startDate}
                  onChange={handelEventChange}
                  required
                />
              </div>
            </div>
            <div className="w-100 d-flex flex-column justify-content-center align-items-start">
              <label htmlFor="EndDate">End Date</label>
              <div className="w-100 py-2">
                <input
                  type="Date"
                  placeholder="EndDate"
                  name="Enddate"
                  value={addEvent.Enddate}
                  onChange={handelEventChange}
                  required
                />
              </div>
            </div>
          </div>
          <div
            className="col-12  py-3 d-flex flex-md-row flex-column justify-content-start align-items-start "
            id="AddEvent-Fifth-Child"
          >
            <div className="d-flex flex-column justify-content-center align-items-start">
              <label htmlFor="Details">Details</label>
              <div className="py-2">
                <textarea className="form-control"
                  placeholder="Detials"
                  name="Details"
                  value={addEvent.Details}
                  onChange={handelEventChange}
                  rows="3"
                  cols="180"
                  required
                />
              </div>
            </div>
            <div className="w-100 d-flex flex-column justify-content-center align-items-start">
              <label htmlFor="EndDate">Guest List</label>
              <div className="w-100 py-2">
                <input
                  type="number"
                  placeholder="Guest List"
                  name="GuestList"
                  value={addEvent.GuestList}
                  onChange={handelEventChange}
                  required
                />
              </div>
            </div>
          </div>    
          <div className="col-12 py-3 d-flex justify-content-start align-items-start "
            id="AddEvent-Sixth-Child">
              <div>
                <button type="submit">AddEvent</button>
              </div>
          </div>
        </form>
      </div>
    </section>
  );
};
