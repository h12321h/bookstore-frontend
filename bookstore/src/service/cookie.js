import Cookies from 'js-cookie';

export function setCookie(userId) {
    // 设置一个cookie，名为'userToken'，值为'12345'，有效期为1天
    console.log(userId);
    Cookies.set('userId', userId, { expires: 1, path: '/'});
}

export function getCookie() {
    // 获取名为'userToken'的cookie
    return Cookies.get('userId');
}

export function removeCookie() {
    // 删除名为'userToken'的cookie
    Cookies.remove('userId');
}