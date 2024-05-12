import Navbar from "../components/Navbar";
import BookList from '../components/BookList';
import PageChange from '../components/PageChange';
import {useState,useEffect} from "react";
import {getBooks} from "../service/book";
export default function HomePage({page,setPage}) {
    const [book, setBook] = useState([]);
    //处理页面切换
    const handlePageChange = (newPage) => {
        if(newPage>=1&&((newPage-1)*12<book.length)){
            setPage(newPage);
            return 1;
        }else{
            return 0;
        }
    }

    const initBook = async () => {
        const data = await getBooks();
        setBook(data);
    }

    //从后端抓取books数据
    useEffect(() => {
        initBook();
    }, []);

    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <BookList books={book} currentPage={page}/>
                <PageChange currentPage={page} handlePageChange={handlePageChange}/>
            </div>
        </div>
    );
}