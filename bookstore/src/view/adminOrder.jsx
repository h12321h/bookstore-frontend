import React, { useEffect, useState } from 'react';
import {Button, Table, ConfigProvider, Modal, Divider, notification, Input} from 'antd';
import {DatePicker,Space,Radio} from "antd";
import {useNavigate} from "react-router-dom";
import {fetchOrderList,fetchOrderNum} from "../service/admin";

const { RangePicker } = DatePicker;
export default function AdminOrderPage() {
    const [dates, setDates] = useState([]);
    const [dateStrings, setDateStrings] = useState(["",""]);

    const handleDateChange = (dates, dateStrings) => {
        setDates(dates);
        setDateStrings(dateStrings);
        console.log("date:",dates);
        console.log("string",dateStrings);
    };

    const [bookName, setBookName] = useState("");
    const handleBookNameChange = (e) => {
        const value = e.target.value;
        setBookName(value);
    }


    const handleScreen = () => {
        setPage(1);
        setSearch(true);
    }

    const cancelScreen = () => {
        setBookName("");
        setDates([]);
        setDateStrings(["",""]);
        setPage(1);
        setSearch(false);
    }

    const [data, setData] = useState([]);
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

    const [search, setSearch] = useState(false);

    const updateData = async () => {
        if(search){
            fetchOrderNum(dateStrings[0],dateStrings[1],bookName).then((data) => {
                setTotal(parseInt(data));
                fetchOrderList(dateStrings[0],dateStrings[1],bookName,page-1,12).then((data) => {
                    setData(data);
                });
            });
        }else{
            fetchOrderNum("","","").then((data) => {
                setTotal(parseInt(data));
                fetchOrderList("","","",page-1,12).then((data) => {
                    setData(data);
                });
            });
        }
    }

    useEffect(() => {
        updateData();
    }, [page,total,search]);


    const columns = [
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            ellipsis: true,
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
        },
        {
            title: '总价格',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            ellipsis: true,
            render: (price) => `¥${price.toFixed(2)}`,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            ellipsis: true,
        },
    ];
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const handleExpand = (expanded, record) => {
        const keys = expanded ? [...expandedRowKeys, record.id] : expandedRowKeys.filter(key => key !== record.id);
        setExpandedRowKeys(keys);
    };
    const expandedRowRender = (record) => {
        const itemColumns = [
            { title: '书籍名称', dataIndex: 'title', key: 'title' },
            { title: '本数', dataIndex: 'quantity', key: 'quantity' },
            { title: '总价', dataIndex: 'price', key: 'price', render: (price) => `¥${price.toFixed(2)}` },
        ];
        return(
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerColor: 'gray',
                            headerBorderBottomColor: 'transparent',
                            headerSplitColor: '#ffffff',
                            cellFontSize: '14px',
                        },
                    },
                }}
            >
                <Table
                    columns={itemColumns}
                    dataSource={record.items}
                    pagination={false}
                    showHeader
                    style={{
                        backgroundColor: '#a2b7d3', // 设置背景颜色
                        border: '1px solid #e8e8e8', // 设置边框
                        margin: '10px 0', // 增加外边距
                        padding: '10px', // 增加内边距
                        fontSize: '14px', // 调整字体大小
                    }}
                />
            </ConfigProvider>
        );
    };
    return (
        <div className="absolute w-full top-24 px-16 bg-gray-100">
            <div className="mt-8">
                <div className="w-full h-16 bg-gray-100 flex flex-row mt-4 justify-center items-center">
                    <h1 className="text-2xl">订单管理</h1>
                    <div className="ml-24">
                        <div className="text-l ml-2">时间范围</div>
                        <RangePicker value={dates} onChange={handleDateChange}/>
                    </div>
                    <div className="ml-36">
                        <div className="text-l ml-2">书籍名称</div>
                        <Input value={bookName}
                               onChange={handleBookNameChange}
                               placeholder="BookName"
                               style={{width: '300px'}}/>
                    </div>
                    <div className="ml-56">
                        <button
                            className="mt-4 bg-blue-900 w-20  h-10 rounded-lg shadow-lg text-white hover:bg-blue-950 ml-4"
                            onClick={cancelScreen}>
                            清除
                        </button>
                    </div>
                    <div className="ml-2">
                        <button
                            className="mt-4 bg-blue-900 w-20  h-10 rounded-lg shadow-lg text-white hover:bg-blue-950 ml-4"
                            onClick={handleScreen}>
                            筛选
                        </button>
                    </div>
                </div>
                <div className="h-8"></div>
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
                    <Table
                        columns={columns}
                        dataSource={data.map(item => ({ ...item, key: item.id }))}
                        pagination={paginationConfig}
                        expandable={{
                            expandedRowRender,
                            rowExpandable: record => record.items && record.items.length > 0,
                            expandedRowKeys: expandedRowKeys,
                            onExpand: handleExpand,
                        }}
                    />
                </ConfigProvider>
            </div>
            <div className="w-full h-20 bg-gray-100"></div>
        </div>
    );
}