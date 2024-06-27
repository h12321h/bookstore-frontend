import {PREFIX} from "./config";

export async function getCart(page,size) {
    return fetch(`${PREFIX}/cart?page=${page}&size=${size}`, {
        method: 'POST', // 使用 POST 方法
        credentials: 'include', // 确保请求中包含 Cookie
        headers: {
            'Content-Type': 'application/json', // 指定内容类型为 JSON
        },
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
}

export async function getCartNum() {
    return fetch(`${PREFIX}/cart/num`, {
        method: 'GET',
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
}

export async function addBookToCart(userId,bookId){
    return fetch(`${PREFIX}/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, bookId})
        })
        .then(response => response.text())
        .catch(error => console.error('Error adding book to cart:', error));
}

export async function updateBookQuantity(id,quantity){
    return fetch(`${PREFIX}/cart/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, quantity })
    })
        .then(response => response.text())
        .catch(error => console.error('Error updating book quantity:', error));
}

export async function deleteBookFromCart(id){
    return fetch(`${PREFIX}/cart/delete`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: id
    })
        .then(response => response.text())
        .catch(error => console.error('Error deleting book from cart:', error));
}