import React, { useEffect, useState } from 'react'
import axios, { all } from 'axios'
// import TotalUser from "../Admin-images/TotalUser-png.webp"
import TotalUser from "../../images/TotalUser-png.webp"
import TotalEvent from '../../images/1744183.png'
import TotalOrganizer from '../../images/organisers-png-are-you-an-event-goer-or-an-event-organizer-venue-owner-700.png'
import RejectOrganizer from'../../images/137039973935176100business_user_delete-1-hi.png'
import acceptOrganizer from '../../images/13703985771179790809business_user_accept-1-md.png'
import "./AdminDashboard.css"

 export const AdminDashboard = () => {
  const [totalUser,setTotalUser] = useState([])
  const [totalEvent,setTotalEvent] = useState([])
  const [totalOrganizer,setTotalOrganizer] = useState([])
  console.log(totalOrganizer);
  

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async() =>{
    try {
      const allUser = await axios.get(`${process.env.REACT_APP_API_URL}/Eve/TotalUser`)
      if(allUser.data.allUser){
        console.log("User Data fetched Successfully");
        setTotalUser(allUser.data.allUser)
      }
    } catch (error) {
      console.log("Error while fetching Total user",error);
    }

          // Total Events
    try {
      const TotEvents = await axios.get(`${process.env.REACT_APP_API_URL}/Eve/allEvents`)
      if(TotEvents.data.AllEvents){
        console.log("Events Data Fetched Successfully");
        setTotalEvent(TotEvents.data.AllEvents)
      }
    } catch (error) {
      console.log("Error while Total Events data fetched",error);
    }

              //Fetch Organizer
    try {
      const Organizer = await axios.get(`${process.env.REACT_APP_API_URL}/Eve/allOrganizer`)
      if(Organizer.data.AllOrganizer){
        console.log("fetch all Organizer Successfully")
        setTotalOrganizer(Organizer.data.AllOrganizer)
      }
    } catch (error) {
      console.log("error while Organizer Fetch",error);
    }
  }

  const AcceptedOrganizer = totalOrganizer.filter((organizer)=>organizer.status==="accepted")
  const RejectedOrganizer = totalOrganizer.filter((organizer)=>organizer.status==="rejected")
  return (
    <section className='.container-fluid p-0 m-0'  id='AdminDashboard-Main-Parent'>
      <div className='row p-0 m-0' id='AdminDashboard-Second-parent' >
        <div className='col d-flex flex-md-row flex-column
        justify-content-center align-items-center py-5'  id='Admin-Dashboard-First-Child' >
          <div className=' d-flex justify-content-center align-items-center' id='AdminManagement-Total-User-Parent'>
            <img src={TotalUser} alt="Total-user-png" />
            <div>
            <h4>TOTAL USER</h4>
            <p>{totalUser.length}</p>
            </div>
          </div>
          </div>
          <div className='col d-flex justify-content-center align-items-center py-5'>
          <div className='d-flex justify-content-center align-items-center' id='AdminManagement-Total-Event-Parent' >
              <img src={TotalEvent} alt="" />
              <div>
                <h4>TOTAL Events</h4>
                <p>{totalEvent.length}</p>
            </div>
          </div>
          </div>
          <div className='col d-flex justify-content-center align-items-center py-5'>
          <div className='d-flex justify-content-center align-items-center' id='AdminManagement-Total-Event-Organizer-Parent' >
              <img src={TotalOrganizer} alt="" />
              <div>
                <h4>TOTAL Organizer</h4>
                <p>{totalOrganizer.length}</p>
            </div>
          </div>
          </div>
        <div className='col d-flex justify-content-center align-items-center py-5'>
        <div className='d-flex justify-content-center align-items-center' id='AdminManagement-Accept-Event-Organizer-Parent' >
              <img src={acceptOrganizer} alt="" />
              <div>
                <h4>ACCEPTED ORGANIZER</h4>
                <p>{AcceptedOrganizer.length}</p>
            </div>
          </div>
        </div>
        <div className='col d-flex justify-content-center align-items-center py-5'>
          <div className='d-flex justify-content-center align-items-center' id='AdminManagement-Rejected-Event-Organizer-Parent' >
              <img src={RejectOrganizer} alt="" />
              <div>
                <h4>REJECTED ORGANIZER</h4>
                <p>{RejectedOrganizer.length}</p>
            </div>
          </div>
          </div>
      </div>
    </section>
  )
}
