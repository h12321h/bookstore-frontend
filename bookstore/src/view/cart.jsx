import Navbar from "../components/Navbar";
import CartBookList from "../components/CartBookList";
import Countbar from "../components/Countbar";
import {useEffect, useState} from "react";
import coverImageUrl from "../img/bg.jpg";
import {notification, Pagination} from "antd";
import {getCart,updateBookQuantity,deleteBookFromCart,getCartNum} from "../service/cart";
import {addOrder} from "../service/order";
import { Button,Modal,Input } from 'antd';
import {getCookie} from "../service/cookie";

export default function CartPage() {
    const [cartbook, setCartbook] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalNum, setTotalNum] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const size=200;

    const handlePageChange = (page) => {
        setPage(page);
    }
    const showModal = () => {
        if(totalNum===0){
            notification.error({
                message: '购物车为空'
            });
        }else{
            setIsModalOpen(true);
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const initCart = async () => {//从后端抓取购物车数据
        // const num = await getCartNum();
        // setTotal(num);
        // if(num===0){
        //     return;
        // }
        // if(page>Math.ceil(num/size)){
        //     console.log("page--:",page);
        //     setPage(page-1);
        // }
        const data= await getCart(page-1,size);
        console.log(data);
        const updatedData = data.map(item => ({
            ...item,
            checked: false
        }));

        setCartbook(updatedData);
    }

    useEffect(() => {//从后端抓取购物车数据
        initCart();
       // console.log(cartbook);
    },[page]);

    const handleCheck = (id, isChecked) => {//处理勾选框
        const newCartbook = cartbook.map(book =>
            book.id === id ? {...book, checked: isChecked} : book
        );
        setCartbook(newCartbook);
    }
    const handleQuantity = (id, quantity) => {//处理数量
        if(quantity<=0){
            notification.error({
                message: '数量不合法',
                description: '数量必须大于0'
            });
            return;
        }
        updateBookQuantity(id,quantity);
        const newCartbook = cartbook.map(book =>
            book.id === id ? {...book, quantity: quantity} : book
        );
        setCartbook(newCartbook);
    }

    const handleSelectAll = (isSelectAll) => {//处理全选
        const newCartbook = cartbook.map(book => ({
            ...book,
            checked: isSelectAll
        }));
        setCartbook(newCartbook);
    }

    useEffect(() => {//购物车书籍改变
        handleCount();
    }, [cartbook]);

    const handleCount = () => {//处理总数和总价改变
        let totalprice = 0;
        let totalnum = 0;
        cartbook.map(cart => {
            if (cart.checked) {
                totalprice += parseFloat(cart.book.price) * parseInt(cart.quantity);
                totalnum += parseInt(cart.quantity);
            }
        });
        setTotalPrice(totalprice/100);
        setTotalNum(totalnum)
    }

    const handleDelete = (id) => {//处理删除购物车中的书籍
        deleteBookFromCart(id).then(() => {
           initCart();
        });
        const newCartbook = cartbook.filter(book => book.id !== id);
        setCartbook(newCartbook);
    }

    const handleBuy = async () => { // Make the function async
        try {
            const buybook = cartbook.filter(book => book.checked)
                .map(cart => ({
                    bookId: cart.book.id,
                    quantity: cart.quantity,
                    price: cart.book.price
                }));

            console.log(buybook);
            const userId = getCookie();
            const status = await addOrder(userId, name,phone,address,buybook); // Use await to get the actual result

            if (status === "success") {
                cartbook.filter(book => book.checked).map(cart =>{
                    console.log(cart.id);
                    deleteBookFromCart(cart.id);
                });
                setCartbook(cartbook.filter(cart => !buybook.some(buy => buy.bookId === cart.book.id)));
                setName("");
                setPhone("");
                setAddress("");
                setIsModalOpen(false);
                notification.success({
                    message: '订单确认',
                });
                initCart();
            } else if (status === "stockout") {
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
        } catch (error) {
            notification.error({
                message: '订单错误',
                description: '处理订单时发生错误'
            });
        }
    };


    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <CartBookList cartbook={cartbook} handleCheck={handleCheck} handleQuantity={handleQuantity}
                              handleDelete={handleDelete}/>
                {/*<div className="page_change relative h-32 flex flex-row justify-center mb-3 mt-10">*/}
                {/*    <Pagination current={page} pageSize={size} showSizeChanger={false} total={total}*/}
                {/*                onChange={handlePageChange}/>*/}
                {/*</div>*/}
            </div>

            <Countbar handleSelectAll={handleSelectAll} totalNum={totalNum} totalPrice={totalPrice}
                      handleBuy={showModal}/>

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
        </div>
    )
}