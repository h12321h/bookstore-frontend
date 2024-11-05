import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { notification } from 'antd';
import {PREFIX_WS} from "./config";

let stompClient = null;

export const connectWebSocket = (userId,setOrderResult) => {
    // 建立 SockJS 连接
    const socket = new WebSocket(`${PREFIX_WS}/ws-orders`);

    // 监听连接打开事件
    socket.onopen = () => {
        console.log('WebSocket连接已建立');
    };

    // 监听消息接收事件
    socket.onmessage = (event) => {
        const result = event.data; // 获取消息体
        console.log("收到的消息: ", result);

        // 设置收到的消息
        setOrderResult(result);
    };

    // 监听连接关闭事件
    socket.onclose = () => {
        console.log('WebSocket连接已关闭');
    };

    // 监听连接错误事件
    socket.onerror = (error) => {
        console.error('WebSocket连接出错: ', error);
        notification.error({
            message: 'WebSocket 错误',
            description: '无法连接到 WebSocket 服务器，请稍后再试。'
        });
    };

    // 发送消息函数
    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ userId, message }));
            console.log('已发送消息:', message);
        } else {
            console.error('WebSocket未连接，无法发送消息');
        }
    };

    // 返回一个清理函数，在组件卸载时断开连接
    return () => {
        if (socket) {
            socket.close();
            console.log('已断开 WebSocket 连接');
        }
    };

};
