import React from "react";
import Notification from "./Notification";

export default function Notifications({ messages }) {
    return (
        <div calssName="notification-box">
            {messages &&
                messages.map((message) => {
                    return (
                        <Notification text={message.text} type={message.type} />
                    );
                })}
        </div>
    );
}
