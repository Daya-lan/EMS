import axios from "axios";
import React, {useContext, useEffect, useState } from "react";
import "./UserOrganizer.css";
import { protectRouter } from "../../Main";
import { ImCheckmark } from "react-icons/im";
import { GiCancel } from "react-icons/gi";

export const UserOrganizer = () => {
  const [organizer, setOrganizer] = useState([]);
  const [OrganizerError, setOrganizerError] = useState(null);
  const {userDtl} = useContext(protectRouter)
  const [eventData, setEventData] = useState([]);
  console.log(eventData);

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    
    try {
      const Events = await axios.get(`${process.env.REACT_APP_API_URL}/Eve/allOrganizer`);
      if (Events.data.AllOrganizer) {
        console.log("organizer fetched successfully");
        setOrganizer(Events.data.AllOrganizer);
        console.log(Events.data.AllOrganizer);
      }
    } catch (error) {
      setOrganizerError("something Error,please relode the page", error);
      console.log("somthing error ", error);
    }

    try {
      const EventData = await axios.get(`${process.env.REACT_APP_API_URL}/Eve/allEvents`);
      if (EventData.data.AllEvents) {
        console.log("Event Data Fetched successfully");
        setEventData(EventData.data.AllEvents);
      }
    } catch (error) {
      console.log("Error while fetch User Organizer Data", error);
    }
  };


  const handleAction = async(_id, action) => {
  try {
    const status =  axios
      .post(`${process.env.REACT_APP_API_URL}/Eve/api/user/${_id}/action`, { action })
      if(status) {
        console.log("status update Successfully");
        fetchingData();
      }
  } catch (error) {
    console.log("error while status update");
  }
      
  };

  const fiterOrg = organizer.filter((Items)=>{
    return Items.EventID===userDtl._id===Items.Status==="rejected" 
  })
  
  const Org = organizer
  .filter((Items) =>{
   return Items.EventID===userDtl._id 
  })
  return (
    { OrganizerError } && (
      <section className=".container-fluid p-0 m-0" id="User-Organizer-Main-Parent">
        <div className="" id="User-organizer-Heading">
          <p>Your Organizer</p>
        </div>
        <div className="row p-0 m-0" id="User-Organizer-second-Parent">
          <div
            className="col-12"
            class="table-responsive"
            id="User-Organizer-First-child"
          >
          { Org.length===0 && fiterOrg ? < div id="Accepted-Organizer-Message" >
              <p id="page-logo"  >Wait until your Organizer Assign </p>
              </div> : 
            <table>
              <thead className="">
                <tr>
                  <th>ID</th>
                  <th>Profile</th>
                  <th>Organizer Name</th>
                  <th>Organizer Email</th>
                  <th>Organizer Contact</th>
                  <th>Organizer Address</th>
                </tr>
              </thead>
              <tbody>
                {organizer
                  .filter((Items) =>{
                   return (
                    Items.EventID === userDtl._id &&
                    (Items.status === "accepted" || Items.status === "pending")
                   )
                  }) 
                  .map((Items, index) => (
                    <tr key={Items._id}>
                      <td>{index}</td>
                      <td id="Organizer-Image">
                          <img
                            src={`${Items.image}`}
                            alt="organizer-Image"
                          />
                      </td>
                      <td>{Items.OrganizerName}</td>
                      <td>{Items.OrganizerEmail}</td>
                      <td>{Items.OrganizerContact}</td>
                      <td>{Items.OrganizerAddress}</td>
                      <td  style={Items.status==="accepted"?{display:"none"}:{display:"block"}} id="user-Organizer-Rejected-or-Accepet-button"  > 
                      <button  onClick={() => handleAction(Items._id, "accepted")} id="user-Organizer-Accepet-button"  >
                      <ImCheckmark /> Accept
                      </button>
                      <button onClick={() => handleAction(Items._id, "rejected")} id="user-Organizer-Rejected-button" >
                      <GiCancel /> Reject
                      </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            }
          </div>
        </div>
      </section>
    )
  );
};
