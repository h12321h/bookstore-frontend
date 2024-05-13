import react from 'react';
import search from '../img/search.png';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("title");
    const navigate = useNavigate();

    const handleKeyDown = (e) => {//按下回车键搜索
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    const handleSearch = () => {//筛选符合条件的书籍
        if(searchValue==="") return;
        let to="/search?type="+encodeURIComponent(searchType)+"&query="+encodeURIComponent(searchValue);
        setSearchValue("");
        setSearchType("title");
        navigate(to);
    }

    return (
        <div className="flex flex-row mt-4 ">
            <select//选择搜索类型
                value={searchType}
                onChange={e => setSearchType(e.target.value)}
                className="w-15 h-10 bg-white border-l-2 border-t-2 border-b-2 border-blue-900 rounded-l-lg shadow-lg focus:outline-none">
                <option value="title" className="text-center">书名</option>
                <option value="author" className="text-center">作者</option>
                <option value="publisher" className="text-center">出版社</option>
            </select>
            <input type="text" placeholder="搜索"
                   className="w-96 h-10 px-4 shadow-lg border-t-2 border-b-2 border-blue-900 focus:outline-none"
                   value={searchValue} onChange={e => setSearchValue(e.target.value)}
                   onKeyDown={e => handleKeyDown(e)}/>
            <button
                className="bg-blue-900 w-20 h-10 rounded-r-lg shadow-lg text-white hover:bg-blue-950 focus:outline-none"
                onClick={() => handleSearch()}>
                <img src={search} className="bg-transparent w-6 h-6 mx-auto my-auto"/>
            </button>
        </div>
    );
}

export default SearchBar;
