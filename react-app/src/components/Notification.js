import React from "react";

export default function Notification({ text, type }) {
    const className = type === "ok" ? "notification-ok" : "notification-error";
    const classNameText =
        type === "ok" ? "notification-ok-text" : "notification-error-text";
    return (
        <div className={className}>
            <span className={classNameText}>{text}</span>
        </div>
    );
}
