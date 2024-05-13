
import BookList from '../components/BookList';
import { useLocation } from 'react-router-dom';
import PageChange from "../components/PageChange";
import {getBookByAuthor,getBookByPublisher,getBookByTitle} from "../service/book";
import {useState,useEffect} from "react";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchPage({page,setPage}) {
    const query = useQuery();
    const searchType = query.get('type');//解析url
    const searchTerm = query.get('query');


    const [searchBook, setSearchBook] = useState([]);

    const initSearch = async () => {
        if(searchType === 'title'){
            getBookByTitle(searchTerm).then(data => setSearchBook(data));
        }
        if(searchType === 'author'){
            getBookByAuthor(searchTerm).then(data => setSearchBook(data));
        }
        if(searchType === 'publisher'){
            getBookByPublisher(searchTerm).then(data => setSearchBook(data));
        }
    }

    useEffect(() => {
        initSearch();
    },[searchTerm,searchType]);

    const handlePageChange = (newPage) => {//处理页面切换
        if(newPage>=1&&((newPage-1)*12<searchBook.length)){
            setPage(newPage);
            return 1;
        }else{
            return 0;
        }
    }

    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <p className="text-xl mt-6 ml-10">{'以下是"'+searchTerm+'"的搜索结果'}</p>
                <BookList books={searchBook} currentPage={page}/>
                <PageChange currentPage={page} handlePageChange={handlePageChange}/>
            </div>
        </div>
    );
}