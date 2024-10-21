import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { notification } from 'antd';
import {PREFIX} from "./config";

let stompClient = null;

export const connectWebSocket = (userId,setOrderResult) => {
    // 建立SockJS连接
    const socket = new SockJS(`${PREFIX}/ws-orders`);
    //stompClient = Stomp.over(socket);

    // // 连接WebSocket服务器
    // stompClient.connect({}, () => {
    //     console.log('Connected to WebSocket');
    //
    //     // 动态订阅用户特定的订单结果通道
    //     stompClient.subscribe(`/topic/orderResult/${userId}`, (message) => {
    //         const result = message.body;
    //         console.log("收到的订单处理结果: ", result);
    //
    //         // 设置收到的订单处理
    //         setOrderResult(result);
    //     });
    // }, (error) => {
    //     console.log('WebSocket连接出错: ', error);
    // });

    // 注册消息接收事件
    socket.onmessage = (event) => {
        const result = event.data; // 获取消息体
        console.log("收到的消息: ", result);

        // 设置收到的消息
        setOrderResult(result);
    };

    // 注册连接事件
    socket.onopen = () => {
        console.log('WebSocket连接已建立');
    };

    // 注册错误事件
    socket.onerror = (error) => {
        console.error('WebSocket连接出错: ', error);
        notification.error({
            message: 'WebSocket 错误',
            description: '无法连接到 WebSocket 服务器，请稍后再试。'
        });
    };

    // 注册关闭事件
    socket.onclose = () => {
        console.log('WebSocket连接已关闭');
    };

    // 清理函数，在组件卸载时断开连接
    return () => {
        if (socket) {
            socket.close();
            console.log('已断开 WebSocket 连接');
        }
    };

};
