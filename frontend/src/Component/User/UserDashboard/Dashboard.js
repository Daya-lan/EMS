import React from "react";
import video1 from "../../images/Events.mp4";
import Marriage from "../../images/marriage.jpg";
import Wedding from "../../images/wedding-1313266.webp";
import EarPiercing from "../../images/ear piercing ceremony.jpg";
import DjParty from "../../images/Dj Party.jpg";
import Conference from "../../images/conference.jpeg";
import Birthday from "../../images/pngtree-girl-s-birthday-party-picture-image_2771730.jpg";
import "./Dashboard.css";
import"./Footer.css"

export const Dashboard = () => {
  return (
    <div className=".container-fluid m-0 p-0 " id="user-Dashbord-Main-Parent">
      <div className="row  p-0 m-0" id="User-Dashboard-Second-Parent">
        <div className="col m-0 p-0" id="user-Dashborad-first-child">
          <div className="" id="user-Dashboard-sub-child">
            <div className="" id="user-Dashbord-Sec-Sub-Child">
              <video autoPlay loop muted src={video1} width="100%" />

              <div className="w-100" id="user-Dashboard-Text-Parent">
                <p> welcome To My Event </p>
                <div id="User-Dashboard-Sub-Text">
                  <p> Make Event to joy and Happiness of customer service </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row p-0 m-0" id="User-Dashboard-Second-part">
        <div className="col-12 m-0" id="user-Dashboard-second-child">
          <div id="user-Dashboard-Marriage">
            <div className="" id="user-Dashboard-Marriage-text">
              <p>MARRIAGE</p>
            </div>
            <img class="img-fluid " src={Marriage} alt="marriage.jpg" />
          </div>
          <div id="user-Dashboard-Wedding">
            <div className="" id="user-Dashboard-Wedding-text">
              <p>WEDDING</p>
            </div>
            <img class="img-fluid " src={Wedding} alt="Wedding.jpg" />
          </div>
          <div id="user-Dashboard-Birthday">
            <div className="" id="user-Dashboard-Birthday-text">
              <p>BIRTHDAY</p>
            </div>
            <img class="img-fluid " src={Birthday} alt="Birthday.jpg" />
          </div>
          <div id="User-Dashboard-EarPiercing">
            <div className="" id="user-Dashboard-Earpiercing-text">
              <p>EARPIERCING</p>
            </div>
            <img class="img-fluid " src={EarPiercing} alt="" />
          </div>
          <div id="User-Dashboard-Conference">
            <div className="" id="user-Dashboard-conference-text">
              <p>CONFERENCE</p>
            </div>
            <img class="img-fluid " src={Conference} alt="" />
          </div>
          <div id="User-dashboard-DJParty">
            <div className="" id="user-Dashboard-party-text">
              <p>PARTY</p>
            </div>
            <img class="img-fluid " src={DjParty} alt="" />
          </div>
        </div>
      </div>

      <section className="container-fluid m-0 p-0" id="Event-User-Dashbord-Footer-Main-Parent">
        <footer className="row m-0 p-0" id="Event-user-Dashboard-second-parent">
          <div className="col-xxl-6 col-xl-12 col-md-12 col-lg-12 col-sm-12 col-xs-12 mt-5 p-0 m-0" >
          <article id="Event-user-Dashboard-information">
            <main id="Event-user-Dashboard-end-line" className="" >
              <p id="Event-user-Dashboard-contact-line" className="d-none" ></p>
            </main>

            <p id="Event-user-Dasboard-contact">Contact</p>

            <main id="Event-user-Dashboard-info-one">
              <p id="Event-user-Dashboard-address">
                500 terry franchies street,<br></br> san francisco CA 94158{" "}
              </p>
            </main>

            <main id="Event-user-Dashboard-info-two">
              <p>Tel: 123-456-7890</p>
              <p>Fax: 123-456-7890</p>
            </main>

            <main id="Event-user-Dashboard-info-three">
              <p>info@myEvent.com</p>
            </main>

            <main id="Event-user-Dashboard-info-four">
              <p>
                <i class="fa-brands fa-facebook"></i>
              </p>

              <p>
                <i class="fa-brands fa-twitter"></i>
              </p>

              <p>
                <i class="fa-brands fa-instagram"></i>
              </p>

              <p>
                <i class="fa-brands fa-youtube"></i>
              </p>
            </main>

            <main id="Event-user-Dashboard-info-four">
              <p id="Event-user-Dashboard-Personal">
                2035 by Personal Life Coach
                <br />
                powered and Secured by My  Event
              </p>
            </main>
          </article>
          </div>
          <div className="col-xxl-6 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 m-0 " >
          <form>
            <table>
              <tr>
                <td>Enter your Name</td>
              </tr>

              <tr>
                <td>
                  <input type="text" required="your Name" />
                </td>
              </tr>

              <tr>
                <td>Enter your Email</td>
              </tr>

              <tr>
                <td>
                  <input type="email" required="Enter Your Email" />
                </td>
              </tr>

              <tr>
                <td>Enter Your Subject</td>
              </tr>

              <tr>
                <td>
                  <input type="text" />
                </td>
              </tr>

              <tr>
                <td>Enter Your FeedBack</td>
              </tr>

              <tr>
                <td>
                  <textarea name="" id="" rows="5" cols="64"></textarea>
                </td>
              </tr>

              <td id="submit">
                <button>submit</button>
              </td>
            </table>
          </form>
          </div>
        </footer>
      </section>
    </div>
  );
};
