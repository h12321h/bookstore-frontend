import { PREFIX } from './config';

export async function login(username, password) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    return fetch(`${PREFIX}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
    })
        .then(response=>response.text())
        .catch(error => console.error('Error logging in:', error));
}