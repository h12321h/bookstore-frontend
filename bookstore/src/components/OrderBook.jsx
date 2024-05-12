import trash from '../img/trash.png';
import {useNavigate} from "react-router-dom";
import Table from "./Table";

export default function OrderBook({order}) {
    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Price', accessor: 'price' },
        { header: 'Quantity', accessor: 'quantity' },
    ];
    console.log(order);
    const navigate = useNavigate();
    const handle2detail = (id) => {
        navigate('/book/' + id);
    }
    return (
        <div className="flex flex-col items-center bg-white rounded-lg mt-8 mx-8  hover:shadow-lg">
            <div className="flex flex-row mt-4 w-full items-center">
                {/*<p className="ml-8 text-2xl mr-auto">{order.orderDate}</p>*/}
                <div className="flex-col mr-16">
                    <p className="mr-8 text-2xl text-blue-800">{'¥' + order.totalPrice}</p>
                    <p className="mr-8 text-l">{order.status}</p>
                </div>

            </div>
            <Table data={order.orderItems} columns={columns}/>
        </div>


    );
}