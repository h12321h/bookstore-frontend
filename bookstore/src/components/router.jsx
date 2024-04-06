import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/home";
import CartPage from "../page/cart";
import BookDetailPage from "../page/bookdetail";
import { useState } from "react";

export default function AppRouter({book, setBook}) {
    const [cartbook, setCartbook] = useState([]);
    //console.log(book);
    const handleAdd = (addBook) => {
        const isExist = cartbook.some(book => book.id === addBook.id);
        if (isExist) {
            const NewCartbook = cartbook.map(book =>
                book.id === addBook.id ? {...book, quantity: parseInt(book.quantity) + 1} : book
            );
            setCartbook(NewCartbook);
        } else
            setCartbook([...cartbook, addBook]);

    }
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage book={book} setBook={setBook}/>}/>
                <Route path="/cart" element={<CartPage cartbook={cartbook} setCartbook={setCartbook}/>}/>
                <Route path="/book/:id" element={<BookDetailPage books={book} handleAdd={handleAdd}/>}/>
            </Routes>
        </BrowserRouter>
    );
}