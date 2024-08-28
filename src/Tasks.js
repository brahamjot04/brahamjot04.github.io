import { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
// import { auth } from './Firebase';
// import { useNavigate } from "react-router-dom";

export default function Tasks() {
    const [top, settop] = useState(0);
    const [flag, setflag] = useState();
    const [nav, setnav] = useState()

    // const navigate = useNavigate();

    const scroll = (x) => {
        if (x > top + nav) {
            setflag(0);
            settop(Math.round(x));
        } else {
            if (x < top - nav) {
                settop(Math.round(x));
                setflag(1);
            }
        }
    }
    const Top = (x) => {
        window.scrollTo(0, nav);
    }
    const bottom = (x) => {
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        const main = document.getElementById("main");
        setnav(document.getElementById("nav").clientHeight);
        if (flag === 0) {
            Top(main);
        }
        if (flag === 1) {
            bottom(main);
        }
    }, [flag])

    return (
        <div className="container-fluid p-0" id="body">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12" >
                <div className="m-0 p-0 col-fluid" id="nav">
                    <Nav />
                </div>
                <div className=" col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 ms-lg-auto ms-0 mt-lg-0 p-0 pt-3 px-3 scroll bg-dark" onScroll={(e) => scroll(e.currentTarget.scrollTop)} id="main">
                    <div className="row p-3">
                        <div className="org fs-4 py-5 m-2 icon col-md-2 col-3 d-flex align-items-center justify-content-center">
                            <Link to={"/Password"} className="text-decoration-none " style={{color:"orangered"}} >Password</Link>
                        </div>
                        <div className="org fs-4 py-5 m-2 icon col-md-2 col-3 d-flex align-items-center justify-content-center">
                            <Link to={""} className="text-decoration-none " style={{color:"orangered"}} >to-do list</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};