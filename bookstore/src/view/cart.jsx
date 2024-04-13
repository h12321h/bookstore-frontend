import Navbar from "../components/Navbar";
import CartBookList from "../components/CartBookList";
import Countbar from "../components/Countbar";
import {useEffect, useState} from "react";
import coverImageUrl from "../img/bg.jpg";
export default function CartPage({cartbook,setCartbook}) {

    const [totalPrice,setTotalPrice] = useState(0);
    const [totalNum,setTotalNum]=useState(0);
    const handleCheck = (id,isChecked) => {//处理勾选框
        const newCartbook = cartbook.map(book =>
            book.id === id ? { ...book, checked: isChecked } : book
        );
        setCartbook(newCartbook);
    }
    const handleQuantity = (id,quantity) => {//处理数量
        const newCartbook = cartbook.map(book =>
            book.id === id ? { ...book, quantity: quantity } : book
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
        let totalnum=0;
        cartbook.map(book => {
            if (book.checked) {
                totalprice += parseFloat(book.price) * parseInt(book.quantity);
                totalnum+=parseInt(book.quantity);
            }
        });
        setTotalPrice(totalprice);
        setTotalNum(totalnum)
    }

    const handleDelete = (id) => {//处理删除购物车中的书籍
        const newCartbook = cartbook.filter(book => book.id !== id);
        setCartbook(newCartbook);
    }

    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <CartBookList cartbook={cartbook} handleCheck={handleCheck} handleQuantity={handleQuantity} handleDelete={handleDelete}/>//书籍列表
            </div>
            <Countbar handleSelectAll={handleSelectAll} totalNum={totalNum} totalPrice={totalPrice}/>
        </div>
    )
}