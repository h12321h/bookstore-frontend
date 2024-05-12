import {PREFIX} from "./config";

export async function getCart(userId) {
    return fetch(`${PREFIX}/cart`, {
        method: 'POST', // 使用 POST 方法
        headers: {
            'Content-Type': 'application/json', // 指定内容类型为 JSON
        },
        body:userId // 将数据转换为 JSON 字符串
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
}

export async function addBookToCart(userId,bookId){
    return fetch(`${PREFIX}/cart/add`, {
        method: 'POST',
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: id
    })
        .then(response => response.text())
        .catch(error => console.error('Error deleting book from cart:', error));
}