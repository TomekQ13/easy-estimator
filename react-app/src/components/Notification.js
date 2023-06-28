import React, { useState } from "react";

export default function Notification({ text, type }) {
    const className =
        type === "success" ? "notification-success" : "notification-error";
    const classNameText =
        type === "success"
            ? "notification-success-text"
            : "notification-error-text";

    const [isVisible, setIsVisible] = useState("");

    // setTimeout(() => {
    //     setIsVisible(" hide");
    // }, 3000);

    return (
        <>
            <div className={"notification " + className + isVisible}>
                <span className={classNameText}>{text}</span>
            </div>
        </>
    );
}
