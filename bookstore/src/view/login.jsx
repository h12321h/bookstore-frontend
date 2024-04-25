import LoginForm from "../components/LoginForm";
import {Flex, notification} from 'antd';
import bgImage from '../img/bg.jpg';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function LoginPage({person,setPerson}) {
    const navigate = useNavigate();
    const handleLogin = (values) => {
        console.log(values);
        console.log(person.name, person.password);
        if (values.username === person.name && values.password === person.password) {
            setPerson({...person, isLogin: true});
            notification.success({
                message: '登录成功',
                description: '欢迎回来！',
            });
            navigate('/');
            return true;
        }
        return false;
    }

    useEffect(() => {
        setPerson({...person,isLogin: false});
    }, []);

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