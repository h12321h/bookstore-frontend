import React, { useState } from 'react';
import { Button, Space, Table,ConfigProvider } from 'antd';
// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         quantity: 32,
//         price: 100,
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         quantity: 42,
//         price: 100,
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         quantity: 32,
//         price: 100,
//     },
//     {
//         key: '4',
//         name: 'Jim Red',
//         quantity: 32,
//         price:100.1,
//     },
// ];
const App = ({data}) => {
   // const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
       // setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const columns = [
        {
            title: '书籍名称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: '本数',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
            sortOrder: sortedInfo.columnKey === 'quantity' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: '总价',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
            ellipsis: true,
            render: (text, record) => {
                return record.price/100;
            }
        },
    ];
    return (
        <div className="mt-10 mx-8">
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
                <Table columns={columns} dataSource={data} onChange={handleChange} />
            </ConfigProvider>
        </div>
    );
};
export default App;