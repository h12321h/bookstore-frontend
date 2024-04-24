import Navbar from "../components/Navbar";
import BookList from '../components/BookList';
import PageChange from '../components/PageChange';
import {useState} from "react";
export default function HomePage({book,page,setPage}) {
    //处理页面切换
    const handlePageChange = (newPage) => {
        if(newPage>=1&&((newPage-1)*12<book.length)){
            setPage(newPage);
            return 1;
        }else{
            return 0;
        }
    }
    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <BookList books={book} currentPage={page}/>
                <PageChange currentPage={page} handlePageChange={handlePageChange}/>
            </div>
        </div>
    );
}