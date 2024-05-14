import {PREFIX} from "./config";

export async function getOrders(userId) {
    return fetch(`${PREFIX}/orders`, {
        method: 'POST', // 使用 POST 方法
        headers: {
            'Content-Type': 'application/json', // 指定内容类型为 JSON
        },
        body:userId ,
        credentials: 'include'  // 在这里添加
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
}

export async function addOrder(userId,name,phone,address,items){
    return fetch(`${PREFIX}/order/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId,name,phone,address,items})
        })
        .then(response => response.text())
        .catch(error => console.error('Error adding order:', error));
}

export async function deleteOrder(id){
    return fetch(`${PREFIX}/order/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: id,
        credentials: 'include'  // 在这里添加
    })
        .then(response => response.text())
        .catch(error => console.error('Error deleting order:', error));
}