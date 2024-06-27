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
                        book={cart.book}
                        checked={cart.checked}
                        onCheck={handleCheck}
                        quantity={cart.quantity}
                        onQuantity={handleQuantity}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <div className="w-full h-24 bg-gray-100"></div>
        </div>

    )
}