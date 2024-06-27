import React, { useEffect, useState } from 'react';
import {Button, Table, ConfigProvider, Modal, Divider, notification, Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Bookstatistic from "../components/Bookstatistic";
import {deleteBook, getBookByTitle, getBookNum, getBooks, getNumByTitle, saveBook} from "../service/book";
import EditBookModal from '../components/EditBookModal'; // 引入新的组件
import AddBookModal from '../components/AddBookModal'; // 引入新的组件

export default function AdminBookPage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState();
    const [tempImage, setTempImage] = useState('');
    const [book, setBook] = useState([]);
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

    const fetchData = async (status) => {
        try {
            let data=0;
            if(status||search){
                data= await getNumByTitle(bookName);
            }else
                data = await getBookNum();
            fetchBook(page > Math.ceil(parseInt(data) / 12) ? Math.ceil(parseInt(data) / 12) : page);
            const num = parseInt(data);
            setTotal(num);
        } catch (error) {
            console.error('Error fetching book number:', error);
        }
    };

    const [search,setSearch]=useState(false);
    const fetchBook = async (tempPage ,status) => {
        let data= [];
        if(status||search){
            data= await getBookByTitle(bookName,tempPage ? tempPage - 1 : page - 1, 12);
            //book的price/100
            data.forEach((item) => {
                item.price = (item.price / 100).toFixed(2);
            });
            setBook(data);
        }else{
            data = await getBooks(tempPage ? tempPage - 1 : page - 1, 12);
            data.forEach((item) => {
                item.price = (item.price / 100).toFixed(2);
            });
            setBook(data);
        }

    };

    const updateData = async (tempPage,status) => {
        if(status||search){
            if(bookName===""){
                notification.error({
                    message: '筛选失败',
                    description: '书名不能为空'
                });
                return;
            }
            fetchData(true).then(() => {
                if (page > Math.ceil(total / 12)) {
                    setPage(Math.ceil(total / 12));
                    fetchBook(Math.ceil(total / 12),true);
                }else{
                    fetchBook(tempPage?tempPage:page,true);
                }
            });
        }else{
            fetchData().then(() => {
                if (page > Math.ceil(total / 12)) {
                    setPage(Math.ceil(total / 12));
                    fetchBook(Math.ceil(total / 12));
                }else{
                    fetchBook(tempPage?tempPage:page);
                }
            });
        }

    };

    useEffect(() => {
        updateData();
    }, [page, search]);

    const handleAdd = () => {
        setTempImage('');

        setIsAddModalVisible(true);
    }

    const handleEdit = (record) => {
        if (!record) {
            setTempImage('');
            setCurrentRecord(null);
        } else {
            setTempImage(record.cover_image);
            setCurrentRecord(record);
        }
        setIsEditModalVisible(true);
    };

    const handleDelete = async (record) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除这本书吗？',
            okButtonProps: { type: 'default' },
            cancelButtonProps: { type: 'default' },
            onOk: () => {
                deleteBook(record.id).then((data) => {
                    if (data === "success") {
                        notification.success({
                            message: '删除成功',
                        });
                        updateData();
                    } else {
                        notification.error({
                            message: '删除失败',
                            description: '请重试'
                        });
                    }
                });
            },
        });
    };

    const handleEditOk = (form) => {
        form.validateFields().then(values => {
            const newValues = { ...currentRecord, ...values };
            //newValue的price*100
            newValues.price = parseFloat(newValues.price) * 100;
            newValues.cover_image = tempImage;
            saveBook(newValues).then((data) => {
                if (data === "success") {
                    notification.success({
                        message: '保存成功',
                    });
                    updateData();
                    setIsEditModalVisible(false);
                } else {
                    notification.error({
                        message: '保存失败',
                        description: '请重试'
                    });
                }
            });
        });
    };

    const handleAddOk = (form) => {
        form.validateFields().then(values => {
            const newValues = { ...values };
            newValues.price = parseFloat(newValues.price) * 100;
            newValues.cover_image = tempImage;
            saveBook(newValues).then((data) => {
                if (data === "success") {
                    notification.success({
                        message: '保存成功',
                    });
                    updateData();
                    //将表单重置
                    form.resetFields();
                    setIsAddModalVisible(false);
                } else {
                    notification.error({
                        message: '保存失败',
                        description: '请重试'
                    });
                }
            });
        });
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleAddCancel = () => {
        setIsAddModalVisible(false);
    };

    const showModal = (image) => {
        setModalImage(image);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleImageChange = ({ file }) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            setTempImage(base64Image);
        };
        reader.readAsDataURL(file);
        return false;
    };

    const [bookName, setBookName] = useState("");
    const handleBookNameChange = (e) => {
        const value = e.target.value;
        setBookName(value);
    }

    const cancelScreen = () => {
        setSearch(false);
        setBookName("");
        setPage(1);
        //updateData(1,false)
    }

    const handleScreen = () => {
        setSearch(true);
        setPage(1);
        //updateData(1,true);
    }

    const columns = [
        {
            title: '书籍封面',
            dataIndex: 'cover_image',
            key: 'cover_image',
            render: (text, record) => (
                <img
                    src={record.cover_image}
                    alt="cover_image"
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                    onClick={() => showModal(record.cover_image)}
                />
            ),
        },
        {
            title: '书籍名称',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            ellipsis: true,
        },
        {
            title: '出版社',
            dataIndex: 'publisher',
            key: 'publisher',
            ellipsis: true,
        },
        {
            title: 'ISBN 编号',
            dataIndex: 'isbn',
            key: 'isbn',
            ellipsis: true,
        },
        {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
            ellipsis: true,
        },
        {
            title: '价钱',
            dataIndex: 'price',
            key: 'price',
            ellipsis: true,
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a className="text-blue-800" onClick={() => handleEdit(record)}>Edit</a>
                    <Divider type="vertical" />
                    <a className="text-blue-800" onClick={() => handleDelete(record)}>Delete</a>
                </span>
            ),
        },
    ];

    return (
        <div className="absolute w-full top-24 bg-gray-100">
            <div className="mt-8 mx-6">
                <div className="flex flex-row mb-3 items-center">
                    <Button
                        type="default"
                        className="bg-blue-900 w-20 h-10 rounded-lg shadow-lg text-white hover:bg-blue-950 ml-4"
                        onClick={() => handleAdd()}
                    >
                        Add
                    </Button>

                    <div className="ml-auto">
                        <div className="text-l ml-2">书籍名称</div>
                        <Input value={bookName}
                               onChange={handleBookNameChange}
                               placeholder="BookName"
                               style={{width: '300px'}}/>
                    </div>
                    <div className="ml-24">
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
                <div className="h-4"></div>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerColor: '#0c3382',
                                headerSplitColor: '#0c3382',
                                cellFontSize: '12px',
                            },
                        },
                    }}
                >
                    <Table columns={columns} dataSource={book} pagination={paginationConfig}/>
                </ConfigProvider>
            </div>
            <div className="w-full h-20 bg-gray-100"></div>

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <img src={modalImage} alt="book cover" style={{width: '90%'}}/>
            </Modal>

            <EditBookModal
                isVisible={isEditModalVisible}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
                record={currentRecord}
                handleImageChange={handleImageChange}
                tempImage={tempImage}
                showModal={showModal}
            />

            <AddBookModal
                isVisible={isAddModalVisible}
                onOk={handleAddOk}
                onCancel={handleAddCancel}
                handleImageChange={handleImageChange}
                tempImage={tempImage}
                showModal={showModal}
            />
        </div>
    );
}
