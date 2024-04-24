import LoginForm from "../components/LoginForm";
import {Flex} from 'antd';
import bgImage from '../img/bg.jpg';

export default function LoginPage() {
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
                <LoginForm/>
            </Flex>
        </Flex>
    )
}