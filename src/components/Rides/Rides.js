import React from 'react';
import Bike from '../../images/bike.png';
import Car from '../../images/car.png';
import Bus from '../../images/bus.png';
import Train from '../../images/train.png';
import { Link } from 'react-router-dom';

const Rides = () => {
    const card = (img, name, link) => {
        return (
            <Link className="nav-link" to={'/rides/'+ link}>
                <div className="row m-1">
                    <div className="col-lg-8 col-sm-12"></div>
                    <div className="col-lg-4 col-sm-12">
                        <div className="bg-light p-2 rounded shadow row" style={{ width: '18rem' }}>
                            <div className="col-lg-7">
                                <img src={img} className="mt-2 w-75" alt="" />
                            </div >
                            <div className="col-lg-5 card-body ">
                                <h5 className="card-title fs-1 text-primary mt-1">{name}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
    return (
        <div>
            {card(Bike, "Bike", "bike")}
            {card(Car, "Car", "car")}
            {card(Bus, "Bus", "bus")}
            {card(Train, "Train", "train")}
        </div>
    );
};

export default Rides;