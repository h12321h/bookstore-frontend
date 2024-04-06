import Navbar from "../components/Navbar";
import CartBookList from "../components/CartBookList";
import Countbar from "../components/Countbar";
import {useEffect, useState} from "react";
import coverImageUrl from "../img/bg.jpg";
export default function CartPage({cartbook,setCartbook}) {

    const [totalPrice,setTotalPrice] = useState(0);
    const [totalNum,setTotalNum]=useState(0);
    const handleCheck = (id,isChecked) => {
        const newCartbook = cartbook.map(book =>
            book.id === id ? { ...book, checked: isChecked } : book
        );
        setCartbook(newCartbook);
    }
    const handleQuantity = (id,quantity) => {
        const newCartbook = cartbook.map(book =>
            book.id === id ? { ...book, quantity: quantity } : book
        );
        setCartbook(newCartbook);
    }

    const handleSelectAll = (isSelectAll) => {
        const newCartbook = cartbook.map(book => ({
            ...book,
            checked: isSelectAll
        }));
        setCartbook(newCartbook);
    }

    useEffect(() => {
        // 这个函数会在cartbook状态更新后调用
        handleCount();
    }, [cartbook]); // 依赖数组里面包含了cartbook，意味着cartbook变化时会触发这个effect

    const handleCount = () => {
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

    const handleDelete = (id) => {
        const newCartbook = cartbook.filter(book => book.id !== id);
        setCartbook(newCartbook);
    }

    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <CartBookList cartbook={cartbook} handleCheck={handleCheck} handleQuantity={handleQuantity} handleDelete={handleDelete}/>
            </div>
            <Navbar/>
            <Countbar handleSelectAll={handleSelectAll} totalNum={totalNum} totalPrice={totalPrice}/>
        </div>
    )
}