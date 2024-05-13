import trash from '../img/trash.png';
import {useNavigate} from "react-router-dom";
import Table from "./Table";
import {deleteOrder} from "../service/order";

export default function OrderBook({order,onDelete}) {
    let date=new Date(order.date);
    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Price', accessor: 'price' },
        { header: 'Quantity', accessor: 'quantity' },
    ];
    const navigate = useNavigate();
    const handle2detail = (id) => {
        navigate('/book/' + id);
    }

    return (
        <div className="flex flex-col items-center bg-white rounded-lg mt-8 mx-8  hover:shadow-lg">
            <div className="flex flex-row mt-4 w-full items-center">
                <p className="ml-8 text-2xl mr-auto">{date.toLocaleDateString()}</p>
                <div className="flex-col">
                    <p className="mr-6 text-2xl text-blue-800">{'¥' + order.totalPrice}</p>
                    <p className="mr-6 text-l">{order.status}</p>
                </div>
                <button className="mr-6 w-8 h-10 rounded-lg hover:bg-gray-200"
                        onClick={e => {
                            onDelete(order.id)
                        }}>
                    <img src={trash} alt="delete" className="w-5 h-5 mx-auto my-auto"/>
                </button>

            </div>
            <div className="flex flex-row mt-0 w-full items-center">
                <p className="ml-12 text-2xl text-blue-800">{order.name}</p>
                <p className="ml-16 text-l text-gray-500">{order.phone}</p>
                <p className="ml-16 text-l text-gray-500">{order.address}</p>
            </div>

            <Table data={order.items} columns={columns}/>
        </div>


    );
}