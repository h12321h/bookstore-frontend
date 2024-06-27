import React, { useEffect, useState } from 'react';
import {Button, Table, ConfigProvider, Modal, Divider, notification, Input} from 'antd';
import {DatePicker,Space,Radio} from "antd";
import {useNavigate} from "react-router-dom";
import {fetchBookStatisticNum,fetchBookStatisticList,fetchUserStatisticNum,fetchUserStatisticList} from "../service/admin";

const { RangePicker } = DatePicker;
export default function AdminStatisticPage() {
    const [type, setType] = useState('book');
    const [dates, setDates] = useState([]);
    const [dateStrings, setDateStrings] = useState(["",""]);

    const handleDateChange = (dates, dateStrings) => {
        setDates(dates);
        setDateStrings(dateStrings);
        console.log("date:",dates);
        console.log("string",dateStrings);
    };


    const handleScreen = () => {
        setPage(1);
        setSearch(true);
        updateData();
    }

    const cancelScreen = () => {
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
            if(type==='book') {
                fetchBookStatisticNum(dateStrings[0], dateStrings[1]).then((data) => {
                    setTotal(parseInt(data));
                    fetchBookStatisticList(dateStrings[0], dateStrings[1], page - 1, 12).then((data) => {
                        setData(data);
                    });
                });
            }else{
                fetchUserStatisticNum(dateStrings[0], dateStrings[1]).then((data) => {
                    setTotal(parseInt(data));
                    fetchUserStatisticList(dateStrings[0], dateStrings[1], page - 1, 12).then((data) => {
                        setData(data);
                    });
                });
            }
        }else{
            if(type==='book'){
                fetchBookStatisticNum("","","").then((data) => {
                    setTotal(parseInt(data));
                    fetchBookStatisticList("","",page-1,12).then((data) => {
                        setData(data);
                    });
                });
            }else {
                fetchUserStatisticNum("", "", "").then((data) => {
                    setTotal(parseInt(data));
                    fetchUserStatisticList("", "", page - 1, 12).then((data) => {
                        setData(data);
                    });
                });
            }
        }
    }

    useEffect(() => {
        updateData();
    }, [page,total,search,type]);


    const bookColumns = [
        {
            title: '排名',
            dataIndex: 'range',
            key: 'range',
            ellipsis: true,
        },
        {
            title: '书籍名称',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
        },
        {
            title: '书籍销量',
            dataIndex: 'quantity',
            key: 'quantity',
            ellipsis: true,
        },
    ];

    const userColumns = [
        {
            title: '排名',
            dataIndex: 'range',
            key: 'range',
            ellipsis: true,
        },
        {
            title: '用户名',
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
            title: '消费金额',
            dataIndex: 'price',
            key: 'price',
            ellipsis: true,
            render: (price) => {
                return '￥'+price/100;
            }
        },
    ];
    return (
        <div className="absolute w-full top-24 px-16 bg-gray-100">
            <div className="mt-8">
                <div className="w-full h-16 bg-gray-100 flex flex-row mt-4 justify-center items-center">
                    <h1 className="text-2xl">榜单统计</h1>
                    <div className="ml-24">
                        <div className="text-l ml-2">时间范围</div>
                        <RangePicker value={dates} onChange={handleDateChange}/>
                    </div>
                    <Radio.Group onChange={(e)=>{setType(e.target.value);setPage(1);}} value={type} className="ml-36">
                        <Radio value="book">书籍销量榜</Radio>
                        <Radio value="user">用户消费榜</Radio>
                    </Radio.Group>
                    <div className="ml-56">
                        <button
                            className="mt-4 bg-blue-900 w-20  h-10 rounded-lg shadow-lg text-white hover:bg-blue-950 ml-4"
                            onClick={cancelScreen}>
                            /清除
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
                            columns={type==='book'?bookColumns:userColumns}
                            dataSource={data}
                            pagination={paginationConfig}
                        />
                    </ConfigProvider>
            </div>
            <div className="w-full h-20 bg-gray-100"></div>
        </div>
    );
}


