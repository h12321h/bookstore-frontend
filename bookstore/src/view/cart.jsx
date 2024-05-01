import Navbar from "../components/Navbar";
import CartBookList from "../components/CartBookList";
import Countbar from "../components/Countbar";
import {useEffect, useState} from "react";
import coverImageUrl from "../img/bg.jpg";
import {notification} from "antd";

export default function CartPage({cartbook, setCartbook}) {

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalNum, setTotalNum] = useState(0);
    const handleCheck = (id, isChecked) => {//处理勾选框
        const newCartbook = cartbook.map(book =>
            book.id === id ? {...book, checked: isChecked} : book
        );
        setCartbook(newCartbook);
    }
    const handleQuantity = (id, quantity) => {//处理数量
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
        cartbook.map(book => {
            if (book.checked) {
                totalprice += parseFloat(book.price) * parseInt(book.quantity);
                totalnum += parseInt(book.quantity);
            }
        });
        setTotalPrice(totalprice);
        setTotalNum(totalnum)
    }

    const handleDelete = (id) => {//处理删除购物车中的书籍
        const newCartbook = cartbook.filter(book => book.id !== id);
        setCartbook(newCartbook);
    }

    const handleBuy = () => {//处理购买
        const buybook = [];
        cartbook.map(book => {
            if (book.checked)
                buybook.push({id: book.id, quantity: book.quantity});
        });
        console.log(buybook);
        fetch('http://localhost:8080/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buybook)
        })
            .then(response => response.text())
            .then(data => {
                if (data === "订单确认") {
                    setCartbook(cartbook.filter(book => !buybook.some(buy => buy.id === book.id)));
                    notification.success({
                        message: '订单确认',
                    });
                }
            })
            .catch(error => console.error('Error fetching orders:', error));
    }

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