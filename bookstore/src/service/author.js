import {PREFIX_AUTHOR} from "./config";

export async function getAuthorByTitle(title) {
    return fetch(`${PREFIX_AUTHOR}/getAuthorsByTitle?title=${encodeURIComponent(title)}`, {
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => console.error('Error fetching authors:', error));
}
