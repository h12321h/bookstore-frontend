import BackButton from "./BackButton";
import {addBookToCart} from "../service/cart";
import {Button, Input, Modal, notification} from "antd";
import {addOrder,getOrders,deleteOrder} from "../service/order";
import {useState} from "react";
import{getCookie} from "../service/cookie";

export default function BookDetail({book}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleAdd = async (bookId) => {
        const userId = getCookie();
        const data = await addBookToCart(userId, bookId);
        if (data === "success") {
            notification.success({
                message: '成功',
                description: '成功加入购物车',
                placement: 'topRight'
            });
        }
        if (data === "add") {
            notification.success({
                message: '成功',
                description: '书籍已在购物车中，数量+1',
                placement: 'topRight'
            });
        }
    }

    const handleBuy = async () => {
        let buybook = [{
            bookId: book.id,
            quantity: 1,
            price: book.price
        }];
        const userId = getCookie();
        await addOrder(userId, name, phone, address, buybook).then(data => {
            if (data === "success") {
                setName("");
                setPhone("");
                setAddress("");
                setIsModalOpen(false);
                notification.success({
                    message: '订单确认',
                });
            } else if (data === "stockout") {
                notification.error({
                    message: '库存不足',
                    description: '请重新选择数量'
                });
            } else {
                notification.error({
                    message: '订单处理异常',
                    description: '未能确认订单，请稍后重试'
                });
            }
        })
       // console.log("return ", data);

    }


    //console.log(book);
    return (
        <>
            <div className="flex flex-row mt-28 ">
                <div className="book_picture m-24 ml-40">
                    <img src={book.cover_image} alt="Book Image" className="w-full h-full object-cover"/>
                </div>
                <div className=" m-24 ml-28 flex flex-col justify-start">
                    <h1 className="text-4xl">{book.title}</h1>
                    <div className="text-xl mt-8 ml-2 flex flex-row">
                        <h2 className="text-gray-500">作者：</h2>
                        <h2>{book.author}</h2>
                    </div>
                    <div className="text-xl mt-6 ml-2 flex flex-row">
                        <h2 className="text-gray-500">出版社：</h2>
                        <h2>{book.publisher}</h2>
                    </div>
                    <div className="text-xl mt-6 ml-2 flex flex-row">
                        <h2 className="text-gray-500">isbn：</h2>
                        <h2>{book.isbn}</h2>
                    </div>
                    <div className="text-xl mt-6 ml-2 flex flex-row">
                        <h2 className="text-gray-500">库存：</h2>
                        <h2 className="text-blue-800">{book.stock}</h2>
                    </div>
                    <div id="book_price" className="text-xl mt-6 ml-2 flex flex-row">
                        <h2 className="text-gray-500">价格：</h2>
                        <h2 className="text-blue-800">{"¥" + book.price}</h2>
                    </div>
                    <div className=" mt-6 ml-2">
                        <h2 className="text-gray-500 text-xl">简介：</h2>
                        <p id="book_description" className="text-l mt-4 leading-8">{book.introduction}</p>
                    </div>
                    <div className="flex flex-row mt-16 ">
                        <button
                            className="bg-blue-900 w-40 h-12 rounded-lg text-white hover:bg-blue-950 focus:outline-none"
                            onClick={e => handleAdd(book.id)}>加入购物车
                        </button>
                        <button
                            className="bg-blue-900 w-40 h-12 rounded-lg text-white hover:bg-blue-950 focus:outline-none ml-16"
                            onClick={showModal}>立即购买
                        </button>
                    </div>
                </div>
            </div>
            <Modal title="确定订单信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   footer={[
                       <Button key="取消" onClick={handleCancel}>
                       取消
                       </Button>,
                       <Button key="提交" onClick={handleBuy}>
                           提交
                       </Button>,
                   ]}
            >
                <div className="h-4"></div>
                <p>收货人</p>
                <Input placeholder="Name" value={name} onChange={e => {
                    setName(e.target.value)
                }}/>
                <div className="h-8"></div>
                <p>联系电话</p>
                <Input placeholder="Phone Number" value={phone} onChange={e => {
                    setPhone(e.target.value)
                }}/>
                <div className="h-8"></div>
                <p>收货地址</p>
                <Input placeholder="Address" value={address} onChange={e => {
                    setAddress(e.target.value)
                }}/>
                <div className="h-4"></div>
            </Modal>
        </>
    )
}

