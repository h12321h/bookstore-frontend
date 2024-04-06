import coverImageUrl from "../img/bg.jpg";
import CartBook from "./CartBook";
import {useState,useEffect} from "react";


export default function CartBookList({cartbook,handleCheck,handleQuantity,handleDelete}){

    return(
        <div>
            <div className="booklist flex flex-col gap-4">
                {cartbook.map(book => (
                    <CartBook
                        key={book.id}
                        id={book.id}
                        coverImageUrl={book.coverImageUrl}
                        title={book.title}
                        author={book.author}
                        price={book.price}
                        checked={book.checked}
                        onCheck={handleCheck}
                        quantity={book.quantity}
                        onQuantity={handleQuantity}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <div className="w-full h-20 bg-gray-100"></div>
        </div>

    )
}