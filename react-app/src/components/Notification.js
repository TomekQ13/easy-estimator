import React, { useContext, useState } from "react";
import { authContext } from "../contexts/Auth";

export default function Notification({ text, type }) {
    const { isDarkMode } = useContext(authContext);

    const className =
        type === "success" ? "notification-success" : "notification-error";
    const classNameText =
        type === "success"
            ? "notification-success-text"
            : "notification-error-text";

    const [isVisible, setIsVisible] = useState("");

    setTimeout(() => {
        setIsVisible(" hide");
    }, 3000);

    return (
        <>
            <div
                className={
                    "notification " + className + isVisible + " " + "text-dark"
                }
            >
                <span className={classNameText}>{text}</span>
            </div>
        </>
    );
}
