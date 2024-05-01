import trash from '../img/trash.png';
import {useNavigate} from "react-router-dom";

export default function OrderBook({book}) {
    console.log(book);
    const navigate = useNavigate();
    const handle2detail = () => {
        navigate('/book/' + book.id);
    }
    return (
            <div className="flex flex-row items-center bg-white h-40 rounded-lg mt-8 mx-8  hover:shadow-lg">
                <img src={`http://localhost:8080/${book.coverImage}`} className="ml-32 h-32 rounded-lg"/>
                <div className="flex flex-col ml-48 text-left h-32">
                    <button className="text-2xl mt-8 text-left hover:text-blue-900"
                            onClick={handle2detail}>{book.title}</button>
                    <p className="mt-4 text-xs text-gray-400">{book.author}</p>
                </div>
                <p className="ml-56 text-xl text-blue-800">{'¥' + book.price}</p>
                <input disabled
                       type="number"
                       className="w-12 h-10 ml-56 border-2 border-blue-400 rounded-lg text-center"
                       value={book.quantity}
                />
            </div>


    );
}