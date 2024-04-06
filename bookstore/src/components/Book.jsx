import react from "react";
import {useNavigate} from "react-router-dom";

function Book({id, coverImageUrl, title, author, price}) {
    const navigate=useNavigate();
    const handleClick = () => {
        navigate('/book/'+id);
    }
    return (
        <button
            className="book-item flex flex-col items-center bg-white transform booksize rounded-lg m-8  shadow-lg  hover:-translate-y-2"
            onClick={handleClick}>
            <img src={coverImageUrl} className="mt-2 px-4 pt-4 pb-2 h-64 "/>
            <h1 className="book-name text-xl">{title}</h1>
            <p className="mt-1 text-xs text-gray-400">{author}</p>
            <p className="mt-2 text-m text-blue-800">{'¥' + price}</p>
        </button>
    );
}

export default Book;