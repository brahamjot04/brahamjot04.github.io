// import firebase from "firebase/compat/app";
import Nav from "./Nav";
import img from "./images/3840x2160.jpg";
import { useEffect, useState } from "react";
export default function Home() {
  const [top, settop] = useState(0);
  const [flag, setflag] = useState();
  const [nav, setnav] = useState();

  const [Firstname, setFirstname] = useState();
  const [Lastname, setLastname] = useState();
  const [Email, setEmail] = useState();
  const [Contactnumber, setContactnumber] = useState();
  const [Objective, setObjective] = useState();
  const [File, setFile] = useState();
  const [Value, setValue] = useState();
  const sendEmailFunction = httpsCallable(functions, "sendEmail");

  const submit = async () => {
    const data = {
      Firstname: Firstname,
      Lastname: Lastname,
      Email: Email,
      Contactnumber: Contactnumber,
      Objective: Objective,
      Value: Value,
    };
    console.log(File);
    try {
      const docRef = await addDoc(collection(db, "contactus"), { data });
      if (docRef.id !== null) {
        alert("Data successfully added!");
        var subject, text;
        await sendEmailFunction({ Email, subject, text })
          .then((succ) => {
            console.log("email send");
            document.getElementById("contact").reset();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
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
  };
  const Top = (x) => {
    window.scrollTo(0, nav);
  };
  const bottom = (x) => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const main = document.getElementById("main");
    setnav(document.getElementById("nav").clientHeight);
    if (flag === 0) {
      Top(main);
    }
    if (flag === 1) {
      bottom(main);
    }
  }, [flag]);
  return (
    <div className="container-fluid p-0" id="body">
      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="m-0 p-0 col-fluid" id="nav">
          <Nav />
        </div>
        <div
          className=" col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 col-12 ms-lg-auto mt-lg-0 m-0 p-0 scroll bg-dark"
          onScroll={(e) => scroll(e.currentTarget.scrollTop)}
          id="main"
        >
          <div className="main row pt-5 p-0 m-0 col-12" id="Home">
            <div className="main-info ps-md-5 ps-sm-3 ps-3 d-flex align-items-center col-xxl-7 col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12">
              <div className="text-light">
                <p className=" fs-6 m-0 ">Hi, I am</p>
                <p className=" fs-1 org">Taranjeet Singh</p>
                <p className=" fs-5 d-flex align-itmes-center">
                  <div className="m-2">
                    <IoLocationSharp />
                  </div>
                  <p className="m-2">
                    324, Gurudwara Sri Manji sahib, Alamgir,Dashmesh Enclave 2,
                    Ludhiana
                  </p>
                </p>
                <p className=" fs-5 d-flex align-itmes-center">
                  <div className="m-2">
                    <BiLogoGmail />
                  </div>
                  <p className="m-2">1080taranjeetsingh@gmail.com</p>
                </p>
                <p className=" fs-5 d-flex align-itmes-center">
                  <div className="m-2">
                    <IoMdCall />
                  </div>
                  <p className="m-2">98551-43056</p>
                </p>
              </div>
            </div>
            <div className="main-img col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12 d-md-block d-sm-flex d-flex p-3 justify-content-center">
              <img src={img} alt="/" className="main-img-i" />
            </div>
          </div>
          <div
            className="about p-md-5 p-md-3 mb-md-3 md-2 pb-2 bg-light col-fluid"
            id="About"
          >
            <p className=" fs-3 p-0 m-0">About</p>
            <div
              className="w-100"
              style={{ border: "1px solid orangered" }}
            ></div>
            <div className="pt-4 row">
              <div className="about-main mb-md-0 mb-5 col-7">
                <div className="mb-3">
                  I am Taranjeet Singh, an IT student at Guru Nanak Dev
                  Engineering College (GNDEC), Ludhiana, currently in my 3rd
                  year. With a solid foundation in web development, I specialize
                  in the MERN stack (MongoDB, Express.js, React.js, Node.js). I
                  have practical experience from a 6-month internship at Ansh
                  Info Tech, where I contributed to multiple web development
                  projects, focusing on both front-end and back-end development.
                </div>
                In addition to my hands-on experience, I hold certifications in
                React and Angular development from Infosys Springboard. I am
                also an active member of the Data Science Club at GNDEC, where I
                collaborate on various data-driven projects, further expanding
                my knowledge in this field.
                <br />
                <br />
                My portfolio, which showcases my work, is available here. I am
                passionate about leveraging my skills in web development and
                data science to create innovative solutions. I am constantly
                seeking opportunities to learn, grow, and contribute to
                impactful projects.
              </div>
              <div className="col-2 mx-auto text-center row">
                <div className="col a-link-a bg-dark text-light fs-1 ">
                  <FaGithub />
                </div>
                <div className="col a-link-b fs-1 ">
                  <FaLinkedin />
                </div>
                <div className="col a-link-a bg-dark text-light fs-1">
                  <FaLinkedin />
                </div>
              </div>
            </div>
          </div>
          <div className="skills p-md-5 p-3 col-fluid" id="Skill">
            <p className="text-light fs-3 border-bottom border-2">Skills</p>
            <div className="text-light">
              <p>MERN stack development</p>
              <div className="row p-3">
                <div className="org fs-1 m-auto icon col-md-2 col-3 d-flex align-items-center justify-content-center">
                  <BiLogoMongodb />
                </div>
                <div className="org fs-1 m-auto icon col-md-2 col-3 d-flex align-items-center justify-content-center">
                  <SiExpress />
                </div>
                <div className="org fs-1 m-auto icon col-md-2 col-3 d-flex align-items-center justify-content-center">
                  <FaReact />
                </div>
                <div className="org fs-1 m-auto icon col-md-2 col-3 d-flex align-items-center justify-content-center">
                  <FaNodeJs />
                </div>
              </div>
              <p>Others </p>
              <div className="row p-3">
                <div className="org fs-1 m-auto icon col-md-2 col-3 d-flex align-items-center justify-content-center">
                  <MdOutlinePhp />
                </div>
                <div className="org fs-1 m-auto icon col-md-2 col-3 d-flex align-items-center justify-content-center">
                  <TbSql />
                </div>
                <div className="org fs-1 m-auto icon col-md-2 col-3 d-flex align-items-center justify-content-center">
                  <FaPython />
                </div>
                <div className="org fs-1 m-auto icon col-md-2 col-3 d-flex align-items-center justify-content-center">
                  <IoLogoJavascript />
                </div>
              </div>
            </div>
          </div>
          <div className="education bg-light p-md-5 p-3 col-fluid">
            <p className="fs-3 border-bottom border-2 mb-md-5 mb-3 ">
              Education
            </p>
            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead className="">
                  <tr className="border-bottom border-3">
                    <th scope="col">Passing Year</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Institute</th>
                    <th scope="col">Board/University</th>
                    <th scope="col">Marks</th>
                  </tr>
                </thead>
                <tbody className="col-12">
                  <tr>
                    <th scope="row">2020</th>
                    <td>10th</td>
                    <td>Joseph's School</td>
                    <td>PSEB</td>
                    <td>85 %</td>
                  </tr>
                  <tr>
                    <th scope="row">2023</th>
                    <td>CSE</td>
                    <td>Guru Nanak Dev Polytechnic College</td>
                    <td>PSBTE&IT, Chandigrah</td>
                    <td>76 %</td>
                  </tr>
                  <p className="mt-md-3 mt-3 text-dark  fs-6">Currently</p>
                  <tr className="border bordre-1">
                    <th>2026</th>
                    <td>IT</td>
                    <td>Guru Nanak Dev Engineering College</td>
                    <td>IKGPTU, Jalandhar</td>
                    <td>76 %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="experiance p-md-5 p-3 col-fluid">
            <p className="text-light fs-3 mb-md-5 mb-3">Experiance</p>
            <div className="text-white row">
              <div className="col-md-1 col-2 d-flex justify-content-center ">
                <p className="dote"> </p>
              </div>
              <div className="col-md-11 col-10">
                <p className="fs-4 org">6 Month's Tranning</p>
                <p>at AnshInfotech,Ludhiana</p>
              </div>
            </div>
            <div className="text-white row">
              <div className="col-md-1 col-2 d-flex justify-content-center ">
                <p className="dote"> </p>
              </div>
              <div className="col-md-11 col-10">
                <p className="fs-4 org">6 week Tranning</p>
                <p>at StepGNDEC,Ludhiana</p>
              </div>
            </div>
          </div>
          <div className="resume p-md-5 p-3 col-fluid" id="Resume">
            <div className="resume-sub p-md-3 p-2">
              <p className="text-light fs-3 border-bottom border-2">Resume</p>
              <div className="p-5 d-flex align-items-center justify-content-center">
                <a href="#" className=" resume-btn" download={file}>
                  <button className="btn text-decoration-none text-light">
                    Download
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="contact col-fluid" id="Contact_us">
            <div className="contact-sub bg-light p-md-5 p-3 ">
              <p className="fs-3">Contact me</p>
              <form className="p-lg-5 p-3 row" id="contact">
                <div class="mb-3 col-md-6 col-12">
                  <label for="exampleFormControlInput1" class="form-label">
                    First name
                  </label>
                  <input
                    onChange={(e) => setFirstname(e.currentTarget.value)}
                    type="text"
                    required
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your first name"
                  />
                </div>
                <div class="mb-3 col-md-6 col-12">
                  <label for="exampleFormControlInput1" class="form-label">
                    Last name
                  </label>
                  <input
                    onChange={(e) => setLastname(e.currentTarget.value)}
                    type="text"
                    required
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your last name"
                  />
                </div>
                <div class="mb-3 col-md-6 col-12">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    type="email"
                    class="form-control"
                    required
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>
                <div class="mb-3 col-6">
                  <label for="exampleFormControlInput1" class="form-label">
                    Contact number
                  </label>
                  <input
                    onChange={(e) => setContactnumber(e.currentTarget.value)}
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your mobile number"
                  />
                </div>
                <div class="mb-3 col-6">
                  <label for="exampleFormControlInput1" class="form-label">
                    Objective
                  </label>
                  <input
                    onChange={(e) => setObjective(e.currentTarget.value)}
                    type="text"
                    class="form-control"
                    required
                    id="exampleFormControlInput1"
                    placeholder="Objective for contact"
                  />
                </div>
                <div class="mb-3 col-md-6 col-12">
                  <label for="exampleFormControlInput1" class="form-label">
                    File
                  </label>
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    class="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Example textarea
                  </label>
                  <textarea
                    onChange={(e) => setValue(e.currentTarget.value)}
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <div
                  className="btn btn-success ms-auto col-lg-1 col-3"
                  onClick={submit}
                >
                  Submit
                </div>
              </form>
            </div>
          </div>
          <div className="col-fluid text-light row m-0 p-3 s-link bg-dark">
            <div className="col-md-2 col-4 mt-auto mb-auto">TaranjeetDev</div>
            <hr className="mt-3" />
            <div className="row">
              <div className="col-12 align-items-center">
                <p className="ms-auto me-auto">
                  &copy; 2024 - All Rights Reserved - Taranjeet Singh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
