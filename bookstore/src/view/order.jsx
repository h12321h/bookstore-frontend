
import {useEffect, useState} from "react";
import OrderBook from "../components/OrderBook";
import coverImageUrl from "../img/bg.jpg";
export default function OrderPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/orders')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);


    return (
        <div className="absolute w-full top-24 px-16  bg-gray-100">
            <div className="flex flex-col gap-4">
                {orders.map(book => <OrderBook book={book}/>)}
            </div>
            <div className="w-full h-20 bg-gray-100"></div>
        </div>
    )
}