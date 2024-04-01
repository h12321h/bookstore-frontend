import react from 'react';
import ReactDOM from 'react-dom/client';

function JumpButton({imageUrl,to,className}) {
    const handleClick = () => {
        //history.push(to); // 点击按钮时改变路由地址
    };

    return (
        <button className={className} onClick={handleClick}>
            <img src={imageUrl} className="p-2 h-10 w-10 rounded-lg hover:shadow-lg hover:bg-gray-200 bg-transparent transform hover:scale-105" />
        </button>
    );
}

export default JumpButton;