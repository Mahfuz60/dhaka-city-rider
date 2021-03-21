import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const login = "Log in";
  let user = false;
  console.log(loggedInUser.name);
  if (loggedInUser.name !== undefined) {
    user = true;
  }
  console.log("log from header", loggedInUser.name);
  const history = useHistory();
  const loginHandler = () => {
    history.push("/login");
  };
  return (
    <div>
      <div className="fixed-top row mt-3 ">
        <div className="col-lg-6 text-light"> 
            <h2 style={{ marginLeft:'100px',color:'black',fontWeight:'bold' }}>DhakaCity Riders</h2>
        
        </div>
        <div className=" col-lg-6 ">
          <nav className=" navbar navbar-expand-lg navbar-light bg-transparent">
            <div className="container-fluid">
              <Link style={{ fontSize:'25px',fontWeight:'700'}}
                className="navbar-brand text-warning fs-3 fw-bold"
                to="/home"
              >
                Pick Me
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div style={{ fontSize:'22px',fontWeight:'500'}}
                className="collapse navbar-collapse "
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-dark fw-bold fs-5"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active  text-dark fw-bold fs-5"
                      href="#"
                    >
                      Destination
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link  active  text-dark fw-bold fs-5"
                      href="#"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      Contact
                    </a>
                  </li>
                  <li className="nav-item">
                    <button style={{ fontSize:'25px',fontWeight:'700'}}
                      className="btn  btn-outline-warning  fw-bold fs-5"
                      onClick={loginHandler}
                      type="submit"
                    >
                      {user ? loggedInUser.name : login}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
