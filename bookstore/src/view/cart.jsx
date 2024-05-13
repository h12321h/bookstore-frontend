import Navbar from "../components/Navbar";
import CartBookList from "../components/CartBookList";
import Countbar from "../components/Countbar";
import {useEffect, useState} from "react";
import coverImageUrl from "../img/bg.jpg";
import {notification} from "antd";
import {getCart,updateBookQuantity,deleteBookFromCart} from "../service/cart";
import {addOrder} from "../service/order";

export default function CartPage() {
    const [cartbook, setCartbook] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalNum, setTotalNum] = useState(0);

    const initCart = async () => {//从后端抓取购物车数据
        const data= await getCart(1);
        console.log(data);
        const updatedData = data.map(item => ({
            ...item,
            checked: false
        }));
        setCartbook(updatedData);
    }

    useEffect(() => {//从后端抓取购物车数据
        initCart();
        console.log(cartbook);
    },[]);

    const handleCheck = (id, isChecked) => {//处理勾选框
        const newCartbook = cartbook.map(book =>
            book.id === id ? {...book, checked: isChecked} : book
        );
        setCartbook(newCartbook);
    }
    const handleQuantity = (id, quantity) => {//处理数量
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
        setTotalPrice(totalprice);
        setTotalNum(totalnum)
    }

    const handleDelete = (id) => {//处理删除购物车中的书籍
        deleteBookFromCart(id);
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
            const userId = 1;
            const status = await addOrder(userId, buybook); // Use await to get the actual result

            if (status === "订单确认") {
                cartbook.filter(book => book.checked).map(cart =>{
                    console.log(cart.id);
                    deleteBookFromCart(cart.id);
                });
                setCartbook(cartbook.filter(cart => !buybook.some(buy => buy.bookId === cart.book.id)));
                notification.success({
                    message: '订单确认',
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
            </div>
            <Countbar handleSelectAll={handleSelectAll} totalNum={totalNum} totalPrice={totalPrice}
                      handleBuy={handleBuy}/>
        </div>
    )
}