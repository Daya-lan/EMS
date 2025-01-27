import React, { useContext, useState } from 'react'
import "./AssignOrganizer.css"
import axios from 'axios'
import { protectRouter } from '../../Main'

 const AssignOrganizer = () => {

  const [organizer,setOrganizer] = useState([{
    OrganizerName:"",
    OrganizerEmail:"",
    OrganizerContact:"",
    OrganizerAddress:"",
    image:null,
  }])

  const {EventID} = useContext(protectRouter)

  const handelOrganizerChange = (e) =>{
    const {name,value} = e.target;
    setOrganizer((prev)=>({...prev,[name]:value}))
  }

  const handelImageChange = (e) =>{
    setOrganizer((prev)=>({...prev,image:e.target.files[0]}))
  }

  const handelOrganizerSubmit = async (e) =>{
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("OrgnizerName",organizer.OrganizerName)
    formdata.append("OrganizerEmail",organizer.OrganizerEmail)
    formdata.append("OrganizerContact",organizer.OrganizerContact)
    formdata.append("OrganizerAddress",organizer.OrganizerAddress)
    formdata.append("image",organizer.image)

    try {
      const organizerResponse = await axios.post(`${process.env.REACT_APP_API_URL}/Eve/AssignOrganizer${EventID}`,organizer, {
        headers:{
          "Content-Type": "multipart/form-data",
        },
      })

      if(organizerResponse.data){
        console.log(organizerResponse.data);
        alert("Assign Organizer Successfully")
        setOrganizer([{
          OrganizerName:"",
          OrganizerEmail:"",
          OrganizerContact:'',
          OrganizerAddress:"",
          image:null
        }])
      }
    } catch (error) {
      console.log("error while organizer Assign",error);
    }
  }


    
  return (
    <div class="modal fade" id="AssignOrganizer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <form  onSubmit={handelOrganizerSubmit} >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body" id='Assign-Organizer-model-body' >
          <section  className="container-fluid" id="Assign-Organizer-main-Parent">
              <div className="row px-2" id="Assign-Organizer-Second-Parent">
                <main className="" >
                  <div className="d-flex " id="Assign-Organizer-Heading">
                    <p>Assign Organizer</p>
                  </div>
                  <div
                    className="col-12 py-3 d-flex flex-md-row flex-column justify-content-center align-items-start"
                    id="Assign-Organizer-First-Child"
                  >
                    <div
                      className="w-100 d-flex flex-column justify-content-center align-items-start"
                      id="Assign-Organizer-Name-Parent"
                    >
                      <label htmlFor="organizer Name">Organizer Name</label>
                      <div className="w-100 py-2 ">
                        <input
                          className="w-100"
                          type="text"
                          placeholder="Orgnizer Name"
                          name="OrganizerName"
                          value={organizer.OrganizerName}
                          onChange={handelOrganizerChange}
                          required
                        />
                      </div>
                    </div>
                    <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
                      <label htmlFor="OrganizerEmail">Organizer Email</label>
                      <div className="w-100 py-2">
                        <input  className="w-100" type='email' name="OrganizerEmail" placeholder='OrganizerEmail' value={organizer.OrganizerEmail} onChange={handelOrganizerChange} required  />       
                      </div>
                    </div>
                  </div>
                  <div  className="col-12 py-1 d-flex flex-md-row flex-column justify-content-center align-items-start"
                    id="Assign-Organizer-Second-Child">
                    <div className="w-100 d-flex flex-column justify-content-center align-items-start">
                      <label htmlFor="OrganizerContact">Organizer Contact</label>
                      <div className="w-100 py-2">
                        <input
                          type="number"
                          placeholder="Organizer Contact"
                          name="OrganizerContact"
                          value={organizer.OrganizerContact}
                          onChange={handelOrganizerChange}
                          required
                        />
                      </div>
                    </div>

                    <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
                      <label htmlFor="image">image</label>
                      <div className="w-100 py-2">
                        <input type='file' accept='image/*' name='image' onChange={handelImageChange} required />
                      </div>  
                    </div>

                      </div>
                  <div
                    className="col-12 py-3 d-flex flex-md-row flex-column justify-content-center align-items-start "
                    id="Assign-Organizer-Third-Child"
                  >
                    <div className="d-flex flex-column justify-content-center align-items-start">
                        <label htmlFor="OrgnizerAddress">Orgnizer Address</label>
                        <div className="py-2">
                          <textarea className="form-control"
                            placeholder="Orgnizer Address"
                            name="OrganizerAddress"
                            value={organizer.OrganizerAddress}
                            onChange={handelOrganizerChange}
                            rows="3"
                            cols="180"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  <div class="modal-footer" id='Assign-Organizer-Buttons'>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit"  class="btn btn-primary">Assign Organizer</button>
                  </div>
                </main>
              </div>
          </section>
          </div>
        </div>
      </div>
      </form>
    </div>
  )
}

export default AssignOrganizer


// {/* <section class="modal-dialog" className="container-fluid" id="Assign-Organizer-main-Parent">
//               <div className="row px-2" id="Assign-Organizer-Second-Parent">
//                 <form className="" >
//                   <div className="d-flex " id="Assign-Organizer-Heading">
//                     <p>Assign Organizer</p>
//                   </div>
//                   <div
//                     className="col-12 py-3 d-flex flex-md-row flex-column justify-content-center align-items-start"
//                     id="Assign-Organizer-First-Child"
//                   >
//                     <div
//                       className="w-100 d-flex flex-column justify-content-center align-items-start"
//                       id="Assign-Organizer-Name-Parent"
//                     >
//                       <label htmlFor="organizer Name">Organizer Name</label>
//                       <div className="w-100 py-2 ">
//                         <input
//                           className="w-100"
//                           type="text"
//                           placeholder="Orgnizer Name"
//                           name="OrganizerName"
//                           value={organizer.OrganizerName}
//                           onChange={handelOrganizerChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
//                       <label htmlFor="OrganizerEmail">Organizer Email</label>
//                       <div className="w-100 py-2">
//                         <input  className="w-100" type='email' name="OrganizerEmail" placeholder='OrganizerEmail' value={organizer.OrganizerEmail} onChange={handelOrganizerChange} required  />       
//                       </div>
//                     </div>
//                   </div>
//                   <div  className="col-12 py-1 d-flex flex-md-row flex-column justify-content-center align-items-start"
//                     id="Assign-Organizer-Second-Child">
//                     <div className="w-100 d-flex flex-column justify-content-center align-items-start">
//                       <label htmlFor="OrganizerContact">Organizer Contact</label>
//                       <div className="w-100 py-2">
//                         <input
//                           type="number"
//                           placeholder="Organizer Contact"
//                           name="OrganizerContact"
//                           value={organizer.OrganizerContacte}
//                           onChange={handelOrganizerChange}
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className=" w-100 d-flex flex-column justify-content-center align-items-start">
//                       <label htmlFor="image">image</label>
//                       <div className="w-100 py-2">
//                         <input type='file' accept='image/*' onChange={handelImageChange} required />
//                       </div>  
//                     </div>

//                       </div>
//                   <div
//                     className="col-12 py-3 d-flex flex-md-row flex-column justify-content-center align-items-start "
//                     id="Assign-Organizer-Third-Child"
//                   >
//                     <div className="d-flex flex-column justify-content-center align-items-start">
//                         <label htmlFor="OrgnizerAddress">Orgnizer Address</label>
//                         <div className="py-2">
//                           <textarea className="form-control"
//                             placeholder="Orgnizer Address"
//                             name="OrganizerAddress"
//                             value={organizer.OrganizerAddress}
//                             onChange={handelOrganizerChange}
//                             rows="3"
//                             cols="180"
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   <div class="modal-footer" id='Assign-Organizer-Buttons'>
//                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                     <button type="submit"  class="btn btn-primary">Assign Organizer</button>
//                   </div>
//                 </form>
//               </div>
//           </section>  */}