import React from 'react';
import { useParams } from 'react-router';
import map from '../../images/Map.png'
import Header from '../Header/Header';

const RideConfirm = () => {
    const {rideType} = useParams()
    const blurHandler = () => 
    {

    }
    const searchHandler = () => 
    {

    }
    return (
        <div>
            <Header/>
            {/* <h1 className="text-light mt-5">Ride is confirmed</h1> */}
            <div className="row mt-5 pt-5">
                <div className="col-lg-3 text-light ps-5">
                    <div>  
                        <form className="form-control " action="" onSubmit={searchHandler}>
                            <label className="fs-5 " htmlFor="from" > From</label>
                            <input className="form-control form-control-label " onBlur={blurHandler} required placeholder="from where you starts the ride." name="from" type="text"/>
                            <label className="fs-5 " htmlFor="to" > To</label>
                            <input className="form-control form-control-label " onBlur={blurHandler} required placeholder="where you end the ride." name="to" type="text"/>
                            <label className="fs-5 " htmlFor="date" > Date</label>
                            <input className="form-control form-control-label " onBlur={blurHandler} required placeholder="riding date." name="date" type="date"/>
                            <label className="fs-5 " htmlFor="date" > Time</label>
                            <input className="form-control form-control-label " onBlur={blurHandler} required placeholder="riding time." name="time" type="time"/>
                            <input className="form-control btn-warning mt-2 "  type="submit" value="SEARCH"/>
                        </form>
                    </div> 
                </div>
                 
                <div className="col-lg-7 text-light"><div style={{width: '700rem'}}> <img src={map} width="600rem" alt=""/> </div> </div>
            </div>
        </div>
    );
};

export default RideConfirm;