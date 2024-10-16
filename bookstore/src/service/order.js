import {PREFIX} from "./config";

export async function getOrders(startDate,endDate,bookName,page,size) {
    return fetch(`${PREFIX}/orders`, {
        method: 'POST', // 使用 POST 方法
        headers: {
            'Content-Type': 'application/json', // 指定内容类型为 JSON
        },
        body: JSON.stringify({ startDate, endDate, bookName ,page,size}), // 将参数转换为 JSON 字符串
        credentials: 'include'  // 在这里添加
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
}

export async function getOrdersNum(startDate,endDate,bookName) {
    return fetch(`${PREFIX}/orders/num`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 指定内容类型为 JSON
        },
        body: JSON.stringify({ startDate, endDate, bookName }), // 将参数转换为 JSON 字符串
        credentials: 'include'  // 在这里添加
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
}

export async function addOrder(userId,name,phone,address,items){
    const response = await fetch(`${PREFIX}/order/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, name, phone, address, items })
    });

    const result = await response.text(); // 确保返回解析后的文本
    console.log("result:",result);
    return result; // 返回解析后的结果，以便在调用时处理
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

export async function getStatisticOrders(startDate,endDate){
    return fetch(`${PREFIX}/order/statistic`, {
        method: 'POST', // 使用 POST 方法
        headers: {
            'Content-Type': 'application/json', // 指定内容类型为 JSON
        },
        body: JSON.stringify({ startDate, endDate }), // 将参数转换为 JSON 字符串
        credentials: 'include'  // 在这里添加
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
}

export async function getStatisticBooksNum(startDate,endDate){
    return fetch(`${PREFIX}/order/statistic/num`, {
        method: 'POST', // 使用 POST 方法
        headers: {
            'Content-Type': 'application/json', // 指定内容类型为 JSON
        },
        body: JSON.stringify({ startDate, endDate }), // 将参数转换为 JSON 字符串
        credentials: 'include'  // 在这里添加
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
}

export async function getStatisticPrice(startDate,endDate){
    return fetch(`${PREFIX}/order/statistic/price`, {
        method: 'POST', // 使用 POST 方法
        headers: {
            'Content-Type': 'application/json', // 指定内容类型为 JSON
        },
        body: JSON.stringify({ startDate, endDate }), // 将参数转换为 JSON 字符串
        credentials: 'include'  // 在这里添加
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
}