
import {useEffect, useState} from "react";
import OrderBook from "../components/OrderBook";
import coverImageUrl from "../img/bg.jpg";
import {deleteOrder, getOrders} from "../service/order";
import {getCookie} from "../service/cookie";
import {DatePicker,Space,Input,Radio} from "antd";
import {useNavigate} from "react-router-dom";

const { RangePicker } = DatePicker;
export default function OrderPage() {
    const navigate = useNavigate();

    const [dates, setDates] = useState([]);
    const [dateStrings, setDateStrings] = useState(["",""]);

    const handleDateChange = (dates, dateStrings) => {
        setDates(dates);
        setDateStrings(dateStrings);
        console.log("date:",dates);
        console.log("string",dateStrings);
    };

    const [bookName, setBookName] = useState("");
    const handleBookNameChange = (e) => {
        const value = e.target.value;
        setBookName(value);
    }


    const handleScreen = () => {
        fetchOrders(dateStrings[0],dateStrings[1],bookName);
    }

    const cancelScreen = () => {
        setBookName("");
        setDates([]);
        setDateStrings(["",""]);
        fetchOrders("","","");
    }

    const [orders, setOrders] = useState([]);

    // const initOrders = async () => {
    //     const data = await getOrders();
    //     console.log(data);
    //     setOrders(data);
    // }

    const fetchOrders = async (startDate,endDate,bookName) => {
        const data = await getOrders(startDate,endDate,bookName);
        setOrders(data);
    }

    useEffect(() => {
        fetchOrders(dateStrings[0],dateStrings[1],bookName);
    }, []);

    const onDelete = async (id) => {
        await deleteOrder(id);
        fetchOrders(dateStrings[0],dateStrings[1],bookName);
    }


    return (
        <div className="absolute w-full top-24 px-16  bg-gray-100">
            <div className="w-full h-16 bg-gray-100 flex flex-row mt-4 justify-center items-center">
                <div>
                    <div className="text-l ml-2">时间范围</div>
                    <RangePicker value={dates} onChange={handleDateChange}/>
                </div>
                <div className="ml-36">
                    <div className="text-l ml-2">书籍名称</div>
                    <Input value={bookName}
                           onChange={handleBookNameChange}
                           placeholder="BookName"
                           style={{width: '300px'}}/>
                </div>
                <div className="ml-56">
                    <button
                        className="mt-4 bg-blue-900 w-20  h-10 rounded-lg shadow-lg text-white hover:bg-blue-950 ml-4"
                        onClick={cancelScreen}>
                        清除
                    </button>
                </div>
                <div className="ml-2">
                    <button
                        className="mt-4 bg-blue-900 w-20  h-10 rounded-lg shadow-lg text-white hover:bg-blue-950 ml-4"
                        onClick={handleScreen}>
                        筛选
                    </button>
                </div>
                <div className="ml-24">
                    <button
                        className="mt-4 bg-white w-20  h-10 rounded-lg shadow-lg text-blue-800 hover:bg-blue-50 ml-4 border-2 border-blue-900"
                        onClick={()=>{navigate('/statistics')}}>
                        总统计
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {orders.map(order => <OrderBook order={order} onDelete={onDelete}/>)}
            </div>
            <div className="w-full h-20 bg-gray-100"></div>
        </div>
    )
}