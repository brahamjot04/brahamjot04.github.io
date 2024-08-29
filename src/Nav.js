import { Link, useNavigate } from "react-router-dom";
import logo from "./images/1317107.jpeg";
import { useEffect, useState } from "react";

export default function Nav() {

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser.uid);
            console.log(user);
        });
        return () => unsubscribe();
    });
    return (
        <>
            <div className=" col-xxl-1 col-xl-1 col-lg-1 d-xxl-flex d-xl-flex d-lg-flex d-md-none d-none bg-dark nav border-start-0 border-top-0 border-bottom-0">
                <img className="nav-name col-1" src={logo} alt="/" />
                <div className="mt-auto mb-auto col-12 nav-links" >
                    <Link to={"/#Home"} className="text-decoration-none">
                        <div className="nav-link text-light d-flex align-items-center justify-content-evenly fs-6">
                            <div>Home</div>
                        </div>
                    </Link>
                    <Link to={"#skills"} className="text-decoration-none"><div className="nav-link text-light text-center fs-6">Skill</div></Link>
                    <Link to={"#Resume"} className="text-decoration-none"><div className="nav-link text-light text-center fs-6">Resume</div></Link>
                    <Link to={"#Contact_us"} className="text-decoration-none"><div className="nav-link text-light text-center fs-6">Contact us</div></Link>
                    <Link to={"/Tasks"} className="text-decoration-none"><div className="nav-link text-light text-center fs-6">Tasks</div></Link>
                </div>
                {(user === null) ? (
                    <Link to={"/Adminlogin"} className=" login-button col-12 text-decoration-none"><div className=" py-2 text-center fs-6">Admin login</div></Link>
                ) : (
                    <div className=" login-button col-12 text-decoration-none">
                        <div className=" py-2 text-center fs-6" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</div>
                    </div>
                )}
            </div>
            <nav class=" navbar navbar-dark bg-dark container-fluid d-xxl-none d-xl-none d-lg-none d-md-block d-block">
                <div class="container-fluid">
                    <a class="navbar-brand col-md-1 col-sm-2 col-3" href="#"><img className="col-8" src={logo} alt="/" />TaranjeetDev</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel"><p className="nav-name"><img className="col-2" src={logo} alt="/" />TaranjeetDev</p></h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body" data-bs-dismiss="offcanvas" >
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="#Home">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#Skill">Skill</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#Resume">Resume</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#Contact_us">Contact us</a>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to={"/Tasks"}>Tasks</Link>
                                </li>
                            </ul>
                            {(user === null) ? (
                                <Link to={"/Adminlogin"} className=" login-button col-12 text-decoration-none"><div className=" py-2 text-center fs-6">Admin login</div></Link>
                            ) : (
                                <div className=" login-button col-12 text-decoration-none">
                                    <div className=" py-2 text-center fs-6" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
              {/* Modal */}

              <div className="modal fade" id="logoutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="logoutModalLabel">Logout</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to log out?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={handleLogout} data-bs-dismiss="modal">Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    )
};