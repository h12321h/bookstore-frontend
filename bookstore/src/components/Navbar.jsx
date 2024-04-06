import React from 'react';
import SearchBar from './SearchBar';
import JumpButton from "./JumpButton";
import ProfileButton from "./ProfileButton";

import logo from '../img/logo.png';
import cart from '../img/shopping-cart.png';
import order from '../img/orders.png';
import home from '../img/home.png';

function Navbar() {
    return (
        <div className="relative flex flex-row justify-center h-16 w-full mt-1">
            <img src={logo} alt="logo"
                 className="absolute left-0 h-12 w-40 ml-16 mt-3 shadow-lg rounded-lg"/>
            <SearchBar/>
            <JumpButton imageUrl={home} to="/" className="flex absolute right-28 mr-32 mt-4"/>
            <JumpButton imageUrl={cart} to="/cart" className="flex absolute right-16 mr-32 mt-4"/>
            <JumpButton imageUrl={order} to="/orders" className="flex absolute right-6 mr-32 mt-4"/>
            <ProfileButton/>
        </div>
    );
}

export default Navbar;