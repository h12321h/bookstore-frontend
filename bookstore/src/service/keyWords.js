import {PREFIX_SPARK} from "./config";

export async function getCountKeywords(id) {
    return fetch(`${PREFIX_SPARK}/count-keywords`, {
        credentials: 'include'  // 确保请求中包含 Cookie
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching book:', error));
}
