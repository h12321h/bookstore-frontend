import Navbar from "../components/Navbar";
import {useNavigate,useParams} from "react-router-dom";
import BackButton from "../components/BackButton";
import BookDetail from "../components/BookDetail";
import {useEffect,useState} from "react";
import {getBookById} from "../service/book";

export default function BookDetailPage() {
    const [book, setBook] = useState({});

    let { id } = useParams(); // 获取URL参数
    id = parseInt(id, 10); // 确保id是数字类型

    const getBook = async (id) => {
        const data = await getBookById(id);
        setBook(data);
    }

    useEffect(() => {
        getBook(id);
    },[id]);

    return(
        <div>
            <div className="relative flex flex-col w-full bg-gray-100">
                <div className="absolute w-full top-24 px-16">
                    <BackButton/>
                </div>
                <BookDetail book={book}/>
            </div>
        </div>
    )

}