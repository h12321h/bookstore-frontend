import react from 'react';
import search from '../img/search.png';
function SearchBar() {
    return (
        <div class="flex flex-row mt-4 ">
            <select class="w-15 h-10 bg-white border-l-2 border-t-2 border-b-2 border-blue-900 rounded-l-lg shadow-lg focus:outline-none">
                <option value="book_name" class="text-center">书名</option>
                <option value="book_author" class="text-center">作者</option>
                <option value="book_publisher" class="text-center">出版社</option>
            </select>
            <input type="text" name="search" placeholder="搜索" class="w-96 h-10 px-4 shadow-lg border-t-2 border-b-2 border-blue-900 focus:outline-none" />
            <button class="bg-blue-900 w-20 h-10 rounded-r-lg shadow-lg text-white hover:bg-blue-950 focus:outline-none">
                 <img src={search} class="bg-transparent w-6 h-6 mx-auto my-auto" />
            </button>
        </div>
    );
}

export default SearchBar;
