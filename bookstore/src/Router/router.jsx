import {BrowserRouter, Route, BrowserRouter as Router, Routes,Navigate,useNavigate} from "react-router-dom";
import HomePage from "../view/home";
import CartPage from "../view/cart";
import BookDetailPage from "../view/bookdetail";
import ProfilePage from "../view/profile";
import SearchPage from "../view/search";
import LoginPage from "../view/login";
import OrderPage from "../view/order";
import RegisterPage from "../view/register";
import StatisticsPage from "../view/statistics";
import AdminBookPage from "../view/adminBook";
import AdminOrderPage from "../view/adminOrder";
import {useState} from "react";
import Navbar from "../components/Navbar";
import {getCookie} from "../service/cookie";
import {PREFIX} from "../service/config";
import AdminUserPage from "../view/adminUser";
import AdminOderPage from "../view/adminOrder";
import AdminStatisticPage from "../view/adminStatistic";
import React, { useEffect } from 'react';
import {useLocation } from 'react-router-dom';
import { checkLogin, checkIdentity } from '../service/login';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} /> {/* 注册页 */}
                <Route path="/login" element={<LoginPage />} /> {/* 登录页 */}
                <Route path="/*" element={<ProtectedRoutes />} />
            </Routes>
        </Router>
    );
}

function ProtectedRoutes() {
    const [isLogin, setIsLogin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const location = useLocation();

    useEffect(() => {
        async function fetchAuthStatus() {
            try {
                const loginResponse = await checkLogin();
                setIsLogin(loginResponse.isLogin);
                if (loginResponse.isLogin) {
                    const identityResponse = await checkIdentity();
                    setIsAdmin(identityResponse.isAdmin);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setIsLogin(false);
            }
        }
        fetchAuthStatus();
    }, [location.pathname]);

    if (isLogin === null) {
        // Render a loading indicator while checking authentication status
        return <div>Loading...</div>;
    }

    if (!isLogin) {
        return <Navigate to="/login" />;
    }

    if(isLogin){
        if(isAdmin===null){
            return <div>Loading...</div>;
        }
    }

    return (
        <>
            <Routes>
                <Route index element={<HomePage />} /> {/* 首页 */}
                <Route path="/cart" element={<CartPage />} /> {/* 购物车页 */}
                <Route path="/profile" element={<ProfilePage />} /> {/* 个人信息页 */}
                <Route path="/book/:id" element={<BookDetailPage />} /> {/* 书籍详情页 */}
                <Route path="/search" element={<SearchPage />} /> {/* 搜索页 */}
                <Route path="/orders" element={<OrderPage />} /> {/* 订单页 */}
                <Route path="/statistics" element={<StatisticsPage />} /> {/* 统计页 */}

                <Route
                    path="/admin/books"
                    element={isAdmin ? <AdminBookPage /> : <Navigate to="/" />}
                /> {/* 管理员书籍页 */}
                <Route
                    path="/admin/users"
                    element={isAdmin ? <AdminUserPage /> : <Navigate to="/" />}
                /> {/* 管理员用户页 */}
                <Route
                    path="/admin/orders"
                    element={isAdmin ? <AdminOrderPage /> : <Navigate to="/" />}
                /> {/* 管理员订单页 */}
                <Route
                    path="/admin/statistics"
                    element={isAdmin ? <AdminStatisticPage /> : <Navigate to="/" />}
                /> {/* 管理员统计页 */}
            </Routes>
            <Navbar />
        </>
    );
}
