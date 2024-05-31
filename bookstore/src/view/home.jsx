import Navbar from "../components/Navbar";
import BookList from '../components/BookList';
import PageChange from '../components/PageChange';
import {useState,useEffect} from "react";
import {getBooks,getBookNum} from "../service/book";
import {Pagination} from 'antd';
export default function HomePage() {
    const [book, setBook] = useState([]);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBookNum();
                //把json格式的data转化为数字
                setTotal(parseInt(data));
            } catch (error) {
                console.error('Error fetching book number:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchBook = async () => {
            const data = await getBooks(page-1,12);
            setBook(data);
        }

        fetchBook();
    },[page]);


    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <BookList books={book}/>
                <div className="page_change relative h-20 flex flex-row justify-center mt-8">
                    <Pagination current={page} pageSize={12} showSizeChanger={false}  total={total} onChange={handlePageChange}/>
                </div>
                {/*<PageChange currentPage={page} handlePageChange={handlePageChange}/>*/}
            </div>
        </div>
    );
}