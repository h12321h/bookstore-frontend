import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuProps} from 'antd';
import {  Dropdown, ConfigProvider,notification } from 'antd';
import{useState} from "react";
import{getUser} from "../service/user";
import {getCookie} from "../service/cookie";
import {logout} from "../service/login";

function ProfileButton() {
    const navigate = useNavigate();

    const [person,setPerson] = useState({});

    const initPerson =async () => {
        console.log("cookie",getCookie());
        getUser(getCookie()).then(data => setPerson(data));
        console.log(person);
    }

    useEffect(() => {
       // console.log(localStorage.getItem('userId'));
        initPerson();
    }, []);

    const handleLogout = async () => {
        logout().then(data => {
            const minutes = parseInt(data, 10); // 将返回的字符串转换为整数

            if (!isNaN(minutes) && minutes >= 0) {
                // 如果返回的分钟数有效，显示会话持续时间
                let message = `会话持续了 ${minutes} 分钟`;

                if (minutes > 60) {
                    const hours = Math.floor(minutes / 60);
                    const remainingMinutes = minutes % 60;
                    message = `会话持续了 ${hours} 小时 ${remainingMinutes} 分钟`;
                }

                // 清空session，显示成功消息
                notification.success({
                    message: '退出成功',
                    description: `${message}，期待您下次光临`
                });

                navigate('/login'); // 重定向到登录页面
            } else {
                // 如果返回的时间无效，显示错误消息
                notification.error({
                    message: '退出失败',
                    description: '请重试'
                });
            }
        });
    };


    //下拉菜单
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <button onClick={()=>{navigate('/profile')}}>
                    个人信息
                </button>
            ),
        },
        {
            key: '2',
            label: (
                <button onClick={() => {navigate('/profile')}}>
                    修改密码
                </button>
            ),
        },
        {
            key: '3',
            label: (
                <button onClick={() => handleLogout()}>
                    退出登录
                </button>
            ),
        },
    ];


    return (
        <ConfigProvider
            theme={{
                components: {
                    Dropdown: {
                        paddingBlock: 10,
                        zIndexPopup: 2000,
                    },
                },
            }}
        >
            <Dropdown menu={{items}} placement="bottomRight" arrow>
                <button className="flex absolute right-0  mr-16 mt-4 ">
                    < img src={person.avatar} alt="user"
                          className="h-10 w-10 mr-6 rounded-full hover:shadow-lg transform hover:scale-105" />
                < /button>
            </Dropdown>
        </ConfigProvider>
    );
}

export default ProfileButton;