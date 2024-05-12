import {BrowserRouter, Route, BrowserRouter as Router, Routes,Navigate,useNavigate} from "react-router-dom";
import HomePage from "../view/home";
import CartPage from "../view/cart";
import BookDetailPage from "../view/bookdetail";
import ProfilePage from "../view/profile";
import SearchPage from "../view/search";
import LoginPage from "../view/login";
import OrderPage from "../view/order";
import {useState} from "react";
import Navbar from "../components/Navbar";


export default function AppRouter({book, setBook, person, setPerson}) {
    //页面
    const [page, setPage] = useState(1);



    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage person={person} setPerson={setPerson}/>}/> {/* 登录页 */}
                <Route
                    path="/*"
                    element={
                        person.isLogin === true ? (
                            <>
                                {/* 如果不是登录页面，则渲染NavBar */}
                                <Routes>
                                    <Route index element={<HomePage page={page}
                                                                    setPage={setPage}/>}/> {/* 首页 */}
                                    <Route path="/cart" element={<CartPage />}/> {/* 购物车页 */}
                                    <Route path="/profile" element={<ProfilePage person={person}
                                                                                 setPerson={setPerson}/>}/> {/* 个人信息页 */}
                                    <Route path="/book/:id" element={<BookDetailPage />}/> {/* 书籍详情页 */}
                                    <Route path="/search" element={<SearchPage book={book} page={page}
                                                                               setPage={setPage}/>}/> {/* 搜索页 */}
                                    <Route path="/orders" element={<OrderPage/>} /> {/* 订单页 */}
                                </Routes>
                                <Navbar person={person}/>
                            </>
                        ) : (
                           <Navigate to="/login"/>
                        )
                    }
                />
            </Routes>
        </Router>
    );
}