import react from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

function JumpButton({imageUrl,to,className}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to); // 点击按钮时改变路由地址
        //history.push(to); // 点击按钮时改变路由地址
    };

    return (
        <button className={className} onClick={handleClick}>
            <img src={imageUrl} className="p-2 h-10 w-10 rounded-lg hover:shadow-lg hover:bg-gray-200 bg-transparent transform hover:scale-105" />
        </button>
    );
}

export default JumpButton;