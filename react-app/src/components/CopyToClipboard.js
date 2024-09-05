import React from "react";
import { FiCopy } from "react-icons/fi";

export default function CopyToClipboard() {
    const handleCopyClick = () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
                alert("URL copied to clipboard!");
            })
            .catch(() => {
                alert("Failed to copy the URL");
            });
    };
    return (
        <button
            onClick={handleCopyClick}
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
            }}
        >
            <FiCopy size={24} color="#0d6efd" />
        </button>
    );
}
