import React, { useEffect, useState } from 'react';
import {Button, Table, ConfigProvider, Modal, Divider, notification, Input} from 'antd';
import {BanUser, LiftBanUser,getUserNum,getUserList} from "../service/admin";
export default function AdminUserPage() {

    const [user, setUser] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const paginationConfig = {
        current: page,
        total: total,
        pageSize: 12,
        onChange: (page) => {
            setPage(page);
        },
    };

    const updateData = async () => {
        getUserNum().then((data) => {
            setTotal(parseInt(data));
            getUserList(page-1,12).then((data) => {
                setUser(data);
            });
        });
    }

    useEffect(() => {
        updateData();
    }, [page]);

    const handleBan = async (record) => {
        Modal.confirm({
            title: '确认封禁',
            content: '确定要封禁这个用户吗？',
            okButtonProps: { type: 'default' },
            cancelButtonProps: { type: 'default' },
            onOk: () => {
                if(record.type === true){
                    notification.error({
                        message: '封禁失败',
                        description: '不能封禁管理员'
                    });
                    return;
                }
                if(record.banned === true){
                    notification.error({
                        message: '封禁失败',
                        description: '用户已被封禁'
                    });
                    return;
                }
                BanUser(record.id).then((data) => {
                    if (data === "success") {
                        notification.success({
                            message: '封禁成功',
                        });
                        updateData();
                    } else {
                        notification.error({
                            message: '封禁失败',
                            description: '请重试'
                        });
                    }
                });
            },
        });
    };

    const handleLift = async (record) => {
        Modal.confirm({
            title: '确认解封',
            content: '确定要解封这个用户吗？',
            okButtonProps: { type: 'default' },
            cancelButtonProps: { type: 'default' },
            onOk: () => {
                if(record.type === "admin"){
                    notification.error({
                        message: '解封失败',
                        description: '不能解封管理员'
                    });
                    return;
                }
                if(record.banned === false){
                    notification.error({
                        message: '解封失败',
                        description: '用户未被封禁'
                    });
                    return;
                }
                LiftBanUser(record.id).then((data) => {
                    if (data === "success") {
                        notification.success({
                            message: '解封成功',
                        });
                        updateData();
                    } else {
                        notification.error({
                            message: '解封失败',
                            description: '请重试'
                        });
                    }
                });
            },
        });
    }


    const columns = [
        {
            title: '用户昵称',
            dataIndex: 'username',
            key: 'username',
            ellipsis: true,
        },
        {
            title: '联系方式',
            dataIndex: 'contact',
            key: 'contact',
            ellipsis: true,
        },
        {
            title: '个人简介',
            dataIndex: 'introduction',
            key: 'introduction',
            ellipsis: true,
        },
        {
            title: '用户类型',
            dataIndex: 'type',
            key: 'type',
            ellipsis: true,
            render: (type) => type ? '管理员' : '普通用户',
        },
        {
            title: '状态',
            dataIndex: 'banned',
            key: 'banned',
            ellipsis: true,
            render: (banned) => banned ? '封禁' : '正常',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a className="text-blue-800" onClick={() => handleBan(record)}>封禁用户</a>
                    <Divider type="vertical" />
                    <a className="text-blue-800" onClick={() => handleLift(record)}>解封用户</a>
                </span>
            ),
        },
    ];

    return (
        <div className="absolute w-full top-24 px-16 bg-gray-100">
            <div className="mt-8 ">
                <div className="flex flex-row justify-between">
                    <h1 className="text-2xl">用户管理</h1>
                </div>
                <div className="h-4"></div>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerColor: '#0c3382',
                                headerSplitColor: '#0c3382',
                                cellFontSize: '16px',
                            },
                        },
                    }}
                >
                    <Table columns={columns} dataSource={user} pagination={paginationConfig}/>
                </ConfigProvider>
            </div>
            <div className="w-full h-20 bg-gray-100"></div>

        </div>
    );
}
