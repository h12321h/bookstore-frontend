
import {useEffect, useState} from "react";
import OrderBook from "../components/OrderBook";
import coverImageUrl from "../img/bg.jpg";
import {getStatisticOrders} from "../service/order";
import {getCookie} from "../service/cookie";
import {DatePicker,Space,Input,Radio} from "antd";
import {useNavigate} from "react-router-dom";

const { RangePicker } = DatePicker;
export default function StatisticsPage() {
    const navigate = useNavigate();

    const [dates, setDates] = useState([]);
    const [dateStrings, setDateStrings] = useState(["",""]);

    const handleDateChange = (dates, dateStrings) => {
        setDates(dates);
        setDateStrings(dateStrings);
        console.log("date:",dates);
        console.log("string",dateStrings);
    };


    const handleScreen = () => {
        fetchStatisticOrders(dateStrings[0],dateStrings[1]);
    }

    const cancelScreen = () => {
        setDates([]);
        setDateStrings(["",""]);
        fetchStatisticOrders("","");
    }

    const [orders, setOrders] = useState([]);

    // const initOrders = async () => {
    //     const data = await getOrders();
    //     console.log(data);
    //     setOrders(data);
    // }

    const fetchStatisticOrders = async (startDate,endDate) => {
        const data = await getStatisticOrders(startDate,endDate);
        setOrders(data);
    }

    useEffect(() => {
        fetchStatisticOrders(dateStrings[0],dateStrings[1]);
    }, []);


    return (
        <div className="absolute w-full top-24 px-16  bg-gray-100">
            <div className="w-full h-16 bg-gray-100 flex flex-row mt-4 justify-center items-center">
                <div>
                    <div className="text-l ml-2">时间范围</div>
                    <RangePicker value={dates} onChange={handleDateChange}/>
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
                        统计
                    </button>
                </div>
            </div>

            <div className="w-full h-20 bg-gray-100"></div>
        </div>
    )
}