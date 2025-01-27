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

export async function register(username, password, email) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);

    return fetch(`${PREFIX}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
    })
        .then(response => response.text())
        .catch(error => console.error('Error registering:', error));

}

export async function logout() {
    return fetch(`${PREFIX}/logout`, {
        method: 'POST',
        credentials: 'include'
    })
        .then(response => response.text())
        .catch(error => console.error('Error logging out:', error));
}

export async function checkIdentity() {
    return fetch(`${PREFIX}/check_identity`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .catch(error => console.error('Error checking identity:', error));
}

export async function checkLogin() {
    return fetch(`${PREFIX}/check_login`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .catch(error => console.error('Error checking login:', error));
}