import coverImageUrl from "../img/bg.jpg";
import CartBook from "./CartBook";
import {useState,useEffect} from "react";

export default function CartBookList({cartbook,handleCheck,handleQuantity,handleDelete}){

    return(
        <div>
            <div className="booklist flex flex-col gap-4">
                {cartbook.map(cart => (
                    <CartBook
                        key={cart.id}
                        id={cart.id}
                        coverImageUrl={cart.book.cover_image}
                        title={cart.book.title}
                        price={cart.book.price}
                        checked={cart.checked}
                        onCheck={handleCheck}
                        quantity={cart.quantity}
                        onQuantity={handleQuantity}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <div className="w-full h-20 bg-gray-100"></div>
        </div>

    )
}