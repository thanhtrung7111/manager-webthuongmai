import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client, StompSubscription } from "@stomp/stompjs";
import { Frame } from "stompjs";
const NotifycationComponent = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Thiết lập SockJS connection
    const socketUrl = "http://localhost:8080/ws"; // URL tới server WebSocket
    const socket = new SockJS(socketUrl);

    // Tạo một client STOMP
    const stompClient = new Client({
      webSocketFactory: () => socket as WebSocket, // Chuyển đổi SockJS thành WebSocket
      debug: (str: string) => {
        console.log(str);
      },
    });

    // Xử lý khi kết nối thành công
    stompClient.onConnect = (frame: Frame) => {
      console.log("Connected: " + frame);

      // Đăng ký nhận thông báo từ endpoint "/topic/notifications"
      const subscription: StompSubscription = stompClient.subscribe(
        "/topic/notifications/thanhtrung",
        (message) => {
          if (message.body) {
            // Cập nhật thông báo mới vào state
            setNotifications((prev: any) => [
              ...prev,
              { message: JSON.parse(message.body) },
            ]);
          }
        }
      );

      return () => {
        // Hủy đăng ký khi component bị unmount
        subscription.unsubscribe();
      };
    };

    // Kích hoạt STOMP client
    stompClient.activate();

    // Hủy kết nối khi component bị unmount
    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <div>
      <h2>Thông báo</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message?.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotifycationComponent;
