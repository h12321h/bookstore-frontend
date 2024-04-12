import Navbar from "../components/Navbar";
import {useNavigate,useParams} from "react-router-dom";
import BackButton from "../components/BackButton";
import BookDetail from "../components/BookDetail";

export default function BookDetailPage({books, handleAdd,person}) {
    let { id } = useParams(); // 获取URL参数
    id = parseInt(id, 10); // 确保id是数字类型
    console.log(books);
    const book = books.find(book => book.id === id); // 通过id查找对应的book
    console.log(book);

    return(
        <div>
            <div className="relative flex flex-col w-full bg-gray-100">
                <div className="absolute w-full top-24 px-16">
                    <BackButton/>
                </div>
                <BookDetail book={book} handleAdd={handleAdd}/>
            </div>
            <div className="fixed top-0 w-full h-20 bg-white flex flex-col items-center">
                <Navbar person={person}/>
            </div>
        </div>
    )

}