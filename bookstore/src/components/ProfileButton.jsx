import react from 'react';
import ReactDOM from 'react-dom/client';
import avatar from '../img/bg.jpg';

function ProfileButton() {
    return (
        <button className="flex absolute right-0  mr-16 mt-4 " title="profile">
            <img src={avatar} alt="user" className="h-10 w-10 mr-6 rounded-full hover:shadow-lg transform hover:scale-105" />
        </button>
    );
}

export default ProfileButton;