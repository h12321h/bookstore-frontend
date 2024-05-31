import { PREFIX } from './config';

export async function getUser(id){
    console.log("id",id);
    return fetch(`${PREFIX}/user`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: id,
        credentials: 'include',  // 在这里添加
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching user:', error));
}

export async function updateUser(user) {
    console.log("update",user);
    return fetch(`${PREFIX}/update_user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: 'include',  // 保留 credentials 以包括 cookie
    })
        .then(response => response.text())  // 将 response.json() 改为 response.text()
        .catch(error => console.error('Error updating user:', error));
}
