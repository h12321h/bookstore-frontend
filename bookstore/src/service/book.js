import {PREFIX} from "./config";

export async function getBooks() {
    return fetch(`${PREFIX}/books`)
        .then(response => response.json())
        .catch(error => console.error('Error fetching books:', error));
}

export async function getBookById(id) {
    return fetch(`${PREFIX}/book/${id}`)
        .then(response => response.json())
        .catch(error => console.error('Error fetching book:', error));
}