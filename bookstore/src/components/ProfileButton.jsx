import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuProps} from 'antd';
import {  Dropdown, ConfigProvider } from 'antd';
import{useState} from "react";
import{getUser} from "../service/user";
import {getCookie} from "../service/cookie";


function ProfileButton() {
    const navigate = useNavigate();

    const [person,setPerson] = useState({});

    const initPerson =async () => {
        console.log("cookie",getCookie());
        getUser(getCookie()).then(data => setPerson(data));
        console.log(person);
    }

    useEffect(() => {
        console.log(localStorage.getItem('userId'));
        initPerson();
    }, []);


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
                <button onClick={() => {navigate('/login')}}>
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