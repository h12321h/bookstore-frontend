import trash from '../img/trash.png';
import {useNavigate} from "react-router-dom";
import '../css/index.css';
export default function CartBook({ id,book,checked,onCheck,quantity,onQuantity,onDelete}) {
const navigate = useNavigate();
    const handle2detail = () => {
        navigate('/book/'+book.id);
    }
    return(
        <div className="flex flex-row items-center bg-white h-40 rounded-lg mt-8 mx-8  hover:shadow-lg">
            <input type="checkbox" className="ml-8 w-4 h-4 rounded-full checked:bg-blue-400"
                   checked={checked}
                   onChange={e=>onCheck(id,e.target.checked) }/>
            <img src={book.cover_image} className="ml-16 h-32 rounded-lg"/>
            <div className="flex flex-col ml-36 text-left h-32">
                <button className="text-2xl mt-8 text-left hover:text-blue-900"
                        onClick={handle2detail}>{book.title}</button>
                <p className="mt-4 text-xs text-gray-400">{book.author}</p>
            </div>
            <p className="cartprice text-xl text-blue-800">{'¥' + book.price}</p>
            <input type="number"
                   className="cartquatity w-12 h-10 border-2 border-blue-400 rounded-lg text-center"
                   value={quantity}
                   onChange={e=>onQuantity(id,e.target.value)}/>
            <button className="cartdelete w-8 h-10 rounded-lg hover:bg-gray-200"
                    onClick={e => {onDelete(id)}}>
                <img src={trash} alt="delete" className="w-5 h-5 mx-auto my-auto"/>
            </button>
        </div>
    );
}