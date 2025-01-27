import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Notification.css";
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { protectRouter } from "../../Main";

export const Notification = () => {
  const [notification, setNotification] = useState([]);
  const { userId } = useContext(protectRouter);

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      const Notify = await axios.get(`${process.env.REACT_APP_API_URL}/Eve/Notify`);
      if (Notify.data.fetchmessage) {
        setNotification(Notify.data.fetchmessage);
        console.log("Message fetch successfully");
      }
    } catch (error) {
      console.log("error while fetch message data");
    }
  };

  const handelclickMessageDlt = async(_id)=>{
    try {
        const DltMessage = await axios.post(`${process.env.REACT_APP_API_URL}/Eve/DeleteMsg/${_id}`)
        if(DltMessage.data){
            alert("Your msg was deleted")
            fetchNotification()
        }
    } catch (error) {
       console.log("error while Deleting Message",error);
    }
  }
  const EventUpdate = notification.filter((each)=>{
    return  each.userId===userId
  })
  return (
    <section className="" id="user-Notification-Main-Parent">
      <div className="" id="User-Notification-Second-Parent">
        <div id="User-Notification-Heading">
          <p>
            <FaRegMessage />
          </p>
          <p>Message</p>
        </div>
        { EventUpdate.length===0 ?< div id="Accepted-Organizer-Message" >
              <p id="page-logo"  >Wait for your Event Update </p>
              </div>  :
        <div className="" id="User-First-Child">
          {notification.filter((each)=>{
                  return  each.userId===userId
                })
            .map((each) => (
              <div id="user-Notification-message">
                <div className="d-flex" id="user-Notification-message-icon"  >
                    <div><MdOutlineMessage /></div>
                    <p>New Message</p>
                </div>
                <div className="d-flex">
                <p>{each.Message}</p>
                </div>
                <div className="" id="user-Notification-Message-buttons">
                    <button onClick={()=>handelclickMessageDlt(each._id)} >Delete</button>
                </div>
              </div>
            ))}
        </div>
        }
      </div>
    </section>
  );
};
