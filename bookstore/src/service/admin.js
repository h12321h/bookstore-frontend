import {PREFIX} from "./config";

export async function getUserList(page,pageSize) {
    const response = await fetch(`${PREFIX}/admin/users?page=${page}&size=${pageSize}`, {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}

export async function getUserNum() {
const response = await fetch(`${PREFIX}/admin/users/num`, {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}

export async function BanUser(id) {
    const response = await fetch(`${PREFIX}/admin/ban/${id}`, {
        method: 'PUT',
        credentials: 'include'

    });
    return await response.text();
}

export async function LiftBanUser(id) {
    const response = await fetch(`${PREFIX}/admin/lift/${id}`, {
        method: 'PUT',
        credentials: 'include'
    });
    return await response.text();
}

export async function fetchOrderList(startDate,endDate,bookName,page,size) {//Post
    const response = await fetch(`${PREFIX}/admin/orders?page=${page}&size=${size}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({startDate,endDate,bookName}),
        credentials: 'include'
    });
    return await response.json();
}

export async function fetchOrderNum(startDate,endDate,bookName) {//Post
    const response = await fetch(`${PREFIX}/admin/orders/num`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({startDate,endDate,bookName}),
        credentials: 'include'
    });
    return await response.text();
}

export async function fetchBookStatisticList(startDate,endDate,page,size) {
    if(startDate===""||endDate===""){
        startDate="1970-01-01";
        endDate="2100-01-01";
    }
    const response = await fetch(`${PREFIX}/admin/statistic/book?page=${page}&size=${size}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({startDate,endDate}),
        credentials: 'include'
    });
    return await response.json();
}

export async function fetchBookStatisticNum(startDate,endDate) {
    if(startDate===""||endDate===""){
        startDate="1970-01-01";
        endDate="2100-01-01";
    }
    const response = await fetch(`${PREFIX}/admin/statistic/book/num`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({startDate,endDate}),
        credentials: 'include'
    });
    return await response.text();
}

export async function fetchUserStatisticList(startDate,endDate,page,size) {
    if(startDate===""||endDate===""){
        startDate="1970-01-01";
        endDate="2100-01-01";
    }
    const response = await fetch(`${PREFIX}/admin/statistic/user?page=${page}&size=${size}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({startDate,endDate}),
        credentials: 'include'
    });
    return await response.json();
}

export async function fetchUserStatisticNum(startDate,endDate) {
    if(startDate===""||endDate===""){
        startDate="1970-01-01";
        endDate="2100-01-01";
    }
    const response = await fetch(`${PREFIX}/admin/statistic/user/num`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({startDate,endDate}),
        credentials: 'include'
    });
    return await response.text();
}
