
import {useEffect, useState} from "react";
import OrderBook from "../components/OrderBook";
import coverImageUrl from "../img/bg.jpg";
import {getStatisticBooksNum, getStatisticOrders, getStatisticPrice} from "../service/order";
import {getCookie} from "../service/cookie";
import {DatePicker,Space,Input,Radio} from "antd";
import {useNavigate} from "react-router-dom";
import Bookstatistic from "../components/Bookstatistic";

const { RangePicker } = DatePicker;
export default function StatisticsPage() {
    const navigate = useNavigate();

    const [dates, setDates] = useState([]);
    const [dateStrings, setDateStrings] = useState(["",""]);
    const [bookNum,setBookNum] = useState(0);
    const [price,setPrice] = useState(0);

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
        const num=await getStatisticBooksNum(startDate,endDate);
        setBookNum(parseInt(num));
        const price=await getStatisticPrice(startDate,endDate);
        setPrice(parseFloat(price).toFixed(2));
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
                <div className="flex flex-row ml-12 items-center mt-6 ">
                    <div className="text-l ml-2">总共购买{isNaN(Number(bookNum)) ? '0' : bookNum}本书</div>
                    <div className="text-l ml-2">累计花费{isNaN(Number(price))? '0': price / 100}元</div>
                </div>
                <div className="ml-56"></div>
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

            <Bookstatistic data={orders}/>

            <div className="w-full h-20 bg-gray-100"></div>
        </div>
    )
}