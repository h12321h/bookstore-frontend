import {PREFIX} from "./config";

export async function getBooks(page, size) {
    if(page<0) page=0;
    return fetch(`${PREFIX}/books?page=${page}&size=${size}`, {
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => console.error('Error fetching books:', error));
}

export async function getBookById(id) {
    return fetch(`${PREFIX}/book/${id}`, {
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching book:', error));
}

export async function getBookByTitle(title,page, size) {
    if(page<0) page=0;
    return fetch(`${PREFIX}/search/title/${title}?page=${page}&size=${size}`, {
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching book:', error));
}

export async function getNumByTitle(title) {
    return fetch(`${PREFIX}/num/${title}`, {
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching book:', error));
}

export async function getBookByAuthor(author) {
    return fetch(`${PREFIX}/search/author/${author}`, {
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching book:', error));
}

export async function getBookByPublisher(publisher) {
    return fetch(`${PREFIX}/search/publisher/${publisher}`, {
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching book:', error));
}

export async function getBookNum() {
    return fetch(`${PREFIX}/books/num`, {
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching book:', error));
}

export async function deleteBook(id) {
    return fetch(`${PREFIX}/book/${id}`, {
        method: 'DELETE',
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => response.text())
        .catch(error => console.error('Error deleting book:', error));
}

export async function saveBook(book) {
    return fetch(`${PREFIX}/book/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book),
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => response.text())
        .catch(error => console.error('Error adding book:', error));
}
