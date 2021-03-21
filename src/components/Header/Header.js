import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    const loginHandler = () => 
    {
        history.push('/login');
    }
    return (
        <div>
            <div className="row mt-3">
                <div className="col-lg-5">
                    <h2 style={{color:'white',marginLeft:'100px',fontWeight:'bold'}}>DhakaCity Riders</h2>
                
                </div>
                <div className="col-lg-7 ">
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                        <div className="container-fluid">
                            <Link className="navbar-brand text-danger  fs-3 fw-bold" to="/home">Pick Me</Link>
                            
                            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                    <li className="nav-item">
                                        <Link className="nav-link active text-light fw-bold fs-5" aria-current="page" to="/home">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active  text-light fw-bold fs-5" href="#">Destination</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link  active  text-light fw-bold fs-5" href="#" tabIndex="-1" aria-disabled="true">Contact</a>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn  btn-outline-danger  fw-bold fs-5" onClick={loginHandler} type="submit">Login</button>
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