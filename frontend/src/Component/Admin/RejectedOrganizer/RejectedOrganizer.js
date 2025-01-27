import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAutoDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "./RejectedOrganizer.css"

export const RejectedOrganizer = () => {
  const [rejectedOrganizer, setRejectedOrganizer] = useState([]);
  const [searchRejectedOrganizer, setSearchRejectedOrganizer] = useState("");
  const [orgId, setOrgId] = useState();
  console.log(orgId);
  const [updateorganizer, setUpdateOrganizer] = useState([
    {
      OrganizerName: "",
      OrganizerEmail: "",
      OrganizerContact: "",
      OrganizerAddress: "",
      image: null,
    },
  ]);

  const handelOraganizerSearchChange = (e) => {
    setSearchRejectedOrganizer(e.target.value);
  };

  useEffect(() => {
    fetchOrganizer();
  }, []);

  const fetchOrganizer = async () => {
    try {
      const getOrganizer = await axios.get(
        `${process.env.REACT_APP_API_URL}/Eve/allOrganizer`
      );
      if (getOrganizer.data.AllOrganizer) {
        console.log("organizer fetch successully");
        setRejectedOrganizer(getOrganizer.data.AllOrganizer);
      }
    } catch (error) {
      console.log("error while fetch organizer", error);
    }
  };

  const handelSendOrganizerChange = (Items) => {
    setUpdateOrganizer(Items);
  };

  const handelUpdateOrganizerChange = (e) => {
    const { name, value } = e.target;
    setUpdateOrganizer((prev) => ({ ...prev, [name]: value }));
  };

  const handelUpdateImageChange = (e) => {
    setUpdateOrganizer((img) => ({ ...img, image: e.target.files[0] }));
  };

  const handelupdateOrganizerSubmit = async (e) => {
    e.preventDefault();

    const Update = new FormData();
    Update.append("OrganizerName", updateorganizer.OrganizerName);
    Update.append("OrganizerEmail", updateorganizer.OrganizerEmail);
    Update.append("OrganizerContact", updateorganizer.OrganizerContact);
    Update.append("OrganizerAddress", updateorganizer.OrganizerAddress);
    Update.append("image", updateorganizer.image);

    try {
      const UpdateOrganizer = axios.post(
        `${process.env.REACT_APP_API_URL}/Eve/UpdateOrganizer`,
        updateorganizer,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (UpdateOrganizer) {
        alert("Organizer Updated Sucessfully");
        console.log("Organizer Update Successfully");
        setUpdateOrganizer([
          {
            OrganizerName: "",
            OrganizerEmail: "",
            OrganizerContact: "",
            OrganizerAddress: "",
            image: null,
          },
        ]);
        fetchOrganizer();
      }
    } catch (error) {
      console.log("Error while update Organizer", error);
    }
  };

  //Organizer Delete Fuction

  const handelClickOrganizerDelete = async (_id) => {
    try {
      const DltOrganizer = axios.post(
        `${process.env.REACT_APP_API_URL}/Eve/dltOrganize/${_id}`
      );
      if (DltOrganizer) {
        alert("Organizer Deleted Successfully");
        console.log("Organizer Deleted Successfully");
        fetchOrganizer()
      }
    } catch (error) {
      console.log("error while delete Organizer",error);
    }
  };

  const Rejected = rejectedOrganizer.filter((Items)=>{
    return Items.status==="rejected"
  })

  return (
    <section className=".container-fluid p-0 " id="RejectedOrganizer-Main-Parent">
      <div className="p-0" id="RejectedOrganizer-Heading">
        <p>Rejected Organizer</p>
      </div>
      <div
        className="w-100 d-flex  justify-content-end align-items-center p-3"
        id="RejectedOrganizer-Search-box"
      >
        <label htmlFor="Search">Search</label>
        <div className="d-flex justify-content-center align-items-center position-relative ">
          <input
            className="position-relative"
            type="search"
            placeholder="search"
            value={searchRejectedOrganizer}
            onChange={handelOraganizerSearchChange}
          />
          <p className="position-absolute  " id="RejectedOrganizer-Search-Icon">
            <FaSearch />
          </p>
        </div>
      </div>
      <div className="row p-0 m-0" id="RejectedOrganizer-second-Parent">
        <div
          className="col-12 p-0 m-0"
          class="table-responsive"
          id="RejectedOrganizer-First-child"
        >
          { Rejected.length===0? 
            < div id="Accepted-Organizer-Message" >
              <p id="page-logo"  >No Rejected  Organizer found </p>
              </div>  
              :
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Profile</th>
                <th>Organizer Name</th>
                <th>Organizer Email</th>
                <th>Organizer Contact</th>
                <th>Organizer Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rejectedOrganizer
                .filter((Items) => {
                  return searchRejectedOrganizer.toLowerCase() === ""
                    ? Items
                    : Items.OrganizerName.toLowerCase().includes(
                        searchRejectedOrganizer
                      );
                }).filter((Items)=>{
                    return Items.status==="rejected"
                })
                .map((Items, index) => (
                  <tr key={Items._id}>
                    <td>{index}</td>
                    <td id="Organizer-Image">
                      {Items.image && (
                        <img
                          src={`http://localhost:4000/uploads/${Items.image}`}
                          alt=""
                        />
                      )}{" "}
                    </td>
                    <td>{Items.OrganizerName}</td>
                    <td>{Items.OrganizerEmail}</td>
                    <td>{Items.OrganizerContact}</td>
                    <td>{Items.OrganizerAddress}</td>
                    <td
                      className="d-flex"
                      id="AdminManagevent-Update-and-dlt-icon-parent"
                    >
                      <p
                        className=""
                        id="AdminManageEvent-Update-Icons"
                        class="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#UpdateOrganizer"
                        onClick={() => handelSendOrganizerChange(Items)}
                      >
                        <FaEdit />
                      </p>
                      <p
                        className=""
                        class="btn"
                        id="AdminManageEvent-Dlt-Icons"
                        data-bs-toggle="modal"
                        data-bs-target="#Organizer-Delete-Model"
                        onClick={() => setOrgId(Items._id)}
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

      {/* Organizer Update Model */}

      <div
        class="modal fade"
        id="UpdateOrganizer"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={handelupdateOrganizerSubmit}>
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-body" id="Update-Organizer-model-body">
                <section
                  className="container-fluid"
                  id="update-Organizer-main-Parent"
                >
                  <div className="row px-2" id="Update-Organizer-Second-Parent">
                    <main className="">
                      <div className="d-flex " id="Update-Organizer-Heading">
                        <p>Update Organizer</p>
                      </div>
                      <div
                        className="col-12 py-3 d-flex flex-md-row flex-column justify-content-center align-items-start"
                        id="Update-Organizer-First-Child"
                      >
                        <div
                          className="w-100 d-flex flex-column justify-content-center align-items-start"
                          id="Update-Organizer-Name-Parent"
                        >
                          <label htmlFor="organizer Name">Organizer Name</label>
                          <div className="w-100 py-2 ">
                            <input
                              className="w-100"
                              type="text"
                              placeholder="Orgnizer Name"
                              name="OrganizerName"
                              value={updateorganizer.OrganizerName}
                              onChange={handelUpdateOrganizerChange}
                              required
                            />
                          </div>
                        </div>
                        <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
                          <label htmlFor="OrganizerEmail">
                            Organizer Email
                          </label>
                          <div className="w-100 py-2">
                            <input
                              className="w-100"
                              type="email"
                              name="OrganizerEmail"
                              placeholder="OrganizerEmail"
                              value={updateorganizer.OrganizerEmail}
                              onChange={handelUpdateOrganizerChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 py-1 d-flex flex-md-row flex-column justify-content-center align-items-start"
                        id="Update-Organizer-Second-Child"
                      >
                        <div className="w-100 d-flex flex-column justify-content-center align-items-start">
                          <label htmlFor="OrganizerContact">
                            Organizer Contact
                          </label>
                          <div className="w-100 py-2">
                            <input
                              type="number"
                              placeholder="Organizer Contact"
                              name="OrganizerContact"
                              value={updateorganizer.OrganizerContact}
                              onChange={handelUpdateOrganizerChange}
                              required
                            />
                          </div>
                        </div>

                        <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
                          <label htmlFor="image">image</label>
                          <div className="w-100 py-2">
                            <input
                              type="file"
                              name="image"
                              accept="image/*"
                              onChange={handelUpdateImageChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 py-3 d-flex flex-md-row flex-column justify-content-center align-items-start "
                        id="Update-Organizer-Third-Child"
                      >
                        <div className="d-flex flex-column justify-content-center align-items-start">
                          <label htmlFor="OrgnizerAddress">
                            Orgnizer Address
                          </label>
                          <div className="py-2">
                            <textarea
                              className="form-control"
                              placeholder="Orgnizer Address"
                              name="OrganizerAddress"
                              value={updateorganizer.OrganizerAddress}
                              onChange={handelUpdateOrganizerChange}
                              rows="3"
                              cols="180"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer" id="Update-Organizer-Buttons">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                          Update Organizer
                        </button>
                      </div>
                    </main>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Organizer Delete Model */}

      <div
        class="modal fade"
        id="Organizer-Delete-Model"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body" id="AdminEvent-delete-model-body">
              ARE YOU SURE YOU WANT TO DELETE THIS Organizer
            </div>
            <div class="modal-footer" id="Admin-Delete-Event-Buttons">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={()=>setOrgId(null)}
              >
                cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handelClickOrganizerDelete(orgId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
