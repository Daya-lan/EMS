import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import"./UserEvents.css"
import { protectRouter } from '../../Main'

export const UserEvents = () => {
    const [events,setEvents] = useState([])
    const [userEventsError,setuserEventsError] = useState(null)
    const {userDtl} = useContext(protectRouter)

    useEffect(()=>{
        fetchingData()
    },[])

    const fetchingData = async() =>{
        try {
            const Events = await axios.get(`${process.env.REACT_APP_API_URL}/Eve/allEvents`)
            if(Events.data.AllEvents){
                console.log("data fetched successfully");
                setEvents(Events.data.AllEvents)
            }
        } catch (error) {
            setuserEventsError("something Error,please relode the page",error)
            console.log("somthing error ",error);
        }
    }


    const [timer, setTimer] = useState(0);
    const [TimerActive, setTimerActive] = useState(true); // To manage timer status

    useEffect(() => {
        if (!TimerActive) return; // Stop if timer is inactive

        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer >= 60) {
                    clearInterval(interval); // Stop timer after 30 seconds
                    setTimerActive(false);
                    return prevTimer; // Keep the timer at 30
                }
                return prevTimer + 1;
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [TimerActive]);

    const remainingSeconds = 60 - timer; // Calculate remaining time
  
    const FiterEvent = events.filter((each)=>{
        return each.userId === userDtl._id 
    })
  return (
  {userEventsError} && <section className='.container-fluid m-0 px-0' id='Events-Main-Parent'>
    <div className='' id='UserEvents-Heading'>
        <p>Your Event</p>
    </div>
        <div className='row m-0' id='Events-second-Parent'>
            <div className='col-12' class="table-responsive"  id='Events-First-child'>

              {  FiterEvent.length===0 ? < div id="Accepted-Organizer-Message" >
              <p id="page-logo"  >Add Your Event to Enjoy Your Special Day</p>
              </div>  :
               <table >
                    <thead className=''>
                        <tr>
                        <th>ID</th>
                        <th>Event Name</th>
                        <th>Venue</th>
                        <th>City</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Budget</th>
                        <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {events.filter((each)=>{
                         return each.userId === userDtl._id 
                    })
                    .map((each,index) => (
                       <tr key={each._id}>
                       <td>{index}</td>
                       <td>{each.EventName}</td>
                       <td>{each.Venue}</td>
                       <td>{each.city}</td>
                       <td>{each.startDate}</td>
                       <td>{each.Enddate}</td>
                       <td>{each.Budget}</td>
                       <p className=' d-flex justify-content-center align-items-center mt-4 py-1' id='UserEvents-Status' style={each.Status==="Waiting..." ? {backgroundColor:"purple",color:"white"} : each.Status === "Inactive" ? {backgroundColor:"red",color:"white"} : each.Status === "Active" ? {backgroundColor:"green",color:"white"} : {backgroundColor:"blue",color:"white"} }  >{each.Status}</p>
                       <td id='User-Event-Cancel-Button' >
                        {/* <div style={remainingSeconds===30?{display:"none"}:{display:"block"}} id='user-Events-Timer' >
                       <p style={each.Status==="Waiting..." ?{display:"block"}:{display:"none"}}>{remainingSeconds} Sec</p>
                       </div> */}
                       <div  style={remainingSeconds===0?{display:"none"}:{display:"block"}}>
                       <button style={each.Status==="Waiting..." ?{display:"block"} : {display:"none"}}
                        >{remainingSeconds} Sec <br></br>
                        cancel</button>
                        </div>
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
}

























