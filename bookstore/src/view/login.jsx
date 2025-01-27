import LoginForm from "../components/LoginForm";
import {Flex, notification} from 'antd';
import bgImage from '../img/bg.jpg';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {login} from "../service/login";
import {setCookie} from "../service/cookie";

export default function LoginPage({setIsLogin}) {
    const navigate = useNavigate();
    const handleLogin = (values) => {
        login(values.username,values.password).then(data => {
            const userId = parseInt(data, 10);
            if (userId > 0) {
                //setIsLogin(true);
                setCookie(userId);
                notification.success({
                    message: '登录成功',
                    description: '欢迎回来'
                });
                navigate("/");
            } else if(userId===-1){
                notification.error({
                    message: '登录失败',
                    description: '用户被封禁'
                });
            }else{
                notification.error({
                    message: '登录失败',
                    //description: data.msg
                });
            }
        });
    }

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh', // 让背景充满整个视窗
    };
    return (
        <Flex style={backgroundStyle} justify='center' align='center'>
            <Flex justify='space-evenly' align='center' className="w-96 h-96 bg-white rounded-lg" vertical>
                <p className="text-2xl">线 上 书 店</p>
                <LoginForm handleLogin={handleLogin}/>
            </Flex>
        </Flex>
    )
}