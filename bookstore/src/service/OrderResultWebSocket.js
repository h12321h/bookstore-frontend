import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { notification } from 'antd';
import {PREFIX} from "./config";

let stompClient = null;

export const connectWebSocket = (userId,setOrderResult) => {
    // 建立SockJS连接
    const socket = new SockJS(`${PREFIX}/ws-orders`);
    stompClient = Stomp.over(socket);

    // 连接WebSocket服务器
    stompClient.connect({}, () => {
        console.log('Connected to WebSocket');

        // 动态订阅用户特定的订单结果通道
        stompClient.subscribe(`/topic/orderResult/${userId}`, (message) => {
            const result = message.body;
            console.log("收到的订单处理结果: ", result);

            // 设置收到的订单处理
            setOrderResult(result);
        });
    }, (error) => {
        console.log('WebSocket连接出错: ', error);
    });
};
