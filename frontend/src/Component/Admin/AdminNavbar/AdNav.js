import React from 'react'
import logo from "../../images/logo-image.jpg"
import { GiHamburgerMenu } from "react-icons/gi";

export const AdNav = () => {
  return (
    <div className=" col col-lg-12 d-flex justify-content-between align-items-center  " id="Adminnavbar-first-Child">
    <div className="d-flex justify-content-center align-items-center p-0">
        <div className="d-flex justify-content-center align-items-center " id="Adminnavbar-logo">
            <img src={logo} alt="" />
            <h2>MyEvent</h2>    
        </div>
    
    </div>
  <p className="fs-2 d-lg-none d-sm-block  " data-bs-toggle="offcanvas" aria-controls="offcanvasWithBothOptions" data-bs-target="#offcanvasWithBothOptions">
    <GiHamburgerMenu />
  </p> 
</div>
  )
}
