import {BrowserRouter, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import HomePage from "../view/home";
import CartPage from "../view/cart";
import BookDetailPage from "../view/bookdetail";
import ProfilePage from "../view/profile";
import SearchPage from "../view/search";
import LoginPage from "../view/login";
import {useState} from "react";
import Navbar from "../components/Navbar";


export default function AppRouter({book, setBook, person, setPerson}) {
    //购物车中的书籍集合
    const [cartbook, setCartbook] = useState([]);

    //添加书籍到购物车
    const handleAdd = (addBook) => {
        const isExist = cartbook.some(book => book.id === addBook.id);
        if (isExist) {
            const NewCartbook = cartbook.map(book =>
                book.id === addBook.id ? {...book, quantity: parseInt(book.quantity) + 1} : book
            );
            setCartbook(NewCartbook);
        } else
            setCartbook([...cartbook, addBook]);
    }

    //页面
    const [page, setPage] = useState(1);
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} /> {/* 登录页 */}
                <Route
                    path="/*"
                    element={
                        <>
                            {/* 如果不是登录页面，则渲染NavBar */}
                            <Routes>
                                <Route index element={<HomePage book={book} page={page} setPage={setPage} />} /> {/* 首页 */}
                                <Route path="/cart" element={<CartPage cartbook={cartbook} setCartbook={setCartbook} />} /> {/* 购物车页 */}
                                <Route path="/profile" element={<ProfilePage person={person} setPerson={setPerson} />} /> {/* 个人信息页 */}
                                <Route path="/book/:id" element={<BookDetailPage books={book} handleAdd={handleAdd} />} /> {/* 书籍详情页 */}
                                <Route path="/search" element={<SearchPage book={book} page={page} setPage={setPage} />} /> {/* 搜索页 */}
                            </Routes>
                            <Navbar person={person} />
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}