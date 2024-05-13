
import {useEffect, useState} from "react";
import OrderBook from "../components/OrderBook";
import coverImageUrl from "../img/bg.jpg";
import {deleteOrder, getOrders} from "../service/order";

export default function OrderPage() {
    const [orders, setOrders] = useState([]);

    const initOrders = async () => {
        const userId = 1;
        const data = await getOrders(userId);
        console.log(data);
        setOrders(data);
    }

    useEffect(() => {
        initOrders();
    }, []);

    const onDelete = async (id) => {
        await deleteOrder(id);
        initOrders();
    }

    return (
        <div className="absolute w-full top-24 px-16  bg-gray-100">
            <div className="flex flex-col gap-4">
                {orders.map(order => <OrderBook order={order} onDelete={onDelete}/>)}
            </div>
            <div className="w-full h-20 bg-gray-100"></div>
        </div>
    )
}