import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuProps} from 'antd';
import {  Dropdown, ConfigProvider } from 'antd';

function ProfileButton({person}) {
    const navigate = useNavigate();
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
                <button onClick={() => {navigate('/profile')}}>
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