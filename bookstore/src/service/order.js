import {PREFIX} from "./config";

export async function getOrders(userId) {
    return fetch(`${PREFIX}/orders`, {
        method: 'POST', // 使用 POST 方法
        headers: {
            'Content-Type': 'application/json', // 指定内容类型为 JSON
        },
        body:userId // 将数据转换为 JSON 字符串
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
}

export async function addOrder(userId,items){
    return fetch(`${PREFIX}/order/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, items})
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
        body: id
    })
        .then(response => response.text())
        .catch(error => console.error('Error deleting order:', error));
}