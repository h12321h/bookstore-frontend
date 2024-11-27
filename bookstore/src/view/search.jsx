
import BookList from '../components/BookList';
import { useLocation } from 'react-router-dom';
import PageChange from "../components/PageChange";
import {getBookByAuthor, getBookByPublisher, getBookByTitle, getBookNum, getBooks,getNumByTitle} from "../service/book";
import {useState,useEffect} from "react";
import {Pagination} from "antd";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const query = useQuery();
    const searchType = query.get('type');//解析url
    const searchTerm = query.get('query');


    const [searchBook, setSearchBook] = useState([]);

    const initSearch = async () => {
        if(searchType === 'title'){
            getBookByTitle(searchTerm,page-1,12).then(data => setSearchBook(data));
        }
        if(searchType === 'author'){
            getBookByAuthor(searchTerm).then(data => setSearchBook(data));
        }
        if(searchType === 'publisher'){
            getBookByPublisher(searchTerm).then(data => setSearchBook(data));
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNumByTitle(searchTerm);
                //把json格式的data转化为数字
                setTotal(parseInt(data));
            } catch (error) {
                console.error('Error fetching book number:', error);
            }
        };
        fetchData();
    }, [searchTerm,searchType]);

    useEffect(() => {
        initSearch();
    },[page,searchTerm,searchType]);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <p className="text-xl mt-6 ml-10">{'以下是"' + searchTerm + '"的搜索结果'}</p>
                <BookList books={searchBook}/>
                <div className="page_change relative h-20 flex flex-row justify-center mt-8">
                    <Pagination current={page} pageSize={12} showSizeChanger={false} total={total}
                                onChange={handlePageChange}/>
                </div>
            </div>
        </div>
    );
}