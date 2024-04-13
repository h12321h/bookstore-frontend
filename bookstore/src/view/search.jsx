
import BookList from '../components/BookList';
import { useLocation } from 'react-router-dom';
import PageChange from "../components/PageChange";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchPage({book,page,setPage}) {
    const query = useQuery();
    const searchType = query.get('type');//解析url
    const searchTerm = query.get('query');

    const searchBook = book.filter(book => {//筛选符合条件的书籍
        if(searchType === 'name'){
            return book.title.toLowerCase().includes(searchTerm.toLowerCase());
        }else if(searchType === 'author'){
            return book.author.toLowerCase().includes(searchTerm.toLowerCase());
        }else if(searchType === 'publisher') {
            return book.publisher.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });
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