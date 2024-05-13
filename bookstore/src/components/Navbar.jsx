import React from 'react';
import SearchBar from './SearchBar';
import JumpButton from "./JumpButton";
import ProfileButton from "./ProfileButton";
import {useNavigate} from "react-router-dom";

import logo from '../img/logo.png';
import cart from '../img/shopping-cart.png';
import order from '../img/orders.png';
import home from '../img/home.png';

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="fixed top-0 w-full h-20 bg-white flex flex-col items-center">
            <div className="relative flex flex-row justify-center h-16 w-full mt-1">
                <button className="absolute left-0 h-12 w-40 ml-16 mt-3"
                        onClick={() => navigate("/")}>
                    <img src={logo} alt="logo" className="hover:scale-105 shadow-lg rounded-lg"/>
                </button>
                <SearchBar/>
                <JumpButton imageUrl={home} to="/" className="flex absolute right-28 mr-32 mt-4"/>
                <JumpButton imageUrl={cart} to="/cart" className="flex absolute right-16 mr-32 mt-4"/>
                <JumpButton imageUrl={order} to="/orders" className="flex absolute right-6 mr-32 mt-4"/>
                <ProfileButton />
            </div>
        </div>
    );
}

export default Navbar;