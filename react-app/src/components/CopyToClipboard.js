import React from "react";
import { FiCopy } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

export default function CopyToClipboard() {
    const handleCopyClick = () => {
        navigator.clipboard.writeText(window.location.href).catch(() => {
            alert("Failed to copy the URL");
        });
    };
    return (
        <>
            <button
                onClick={handleCopyClick}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                <a
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Copy session URL"
                    data-tooltip-place="top"
                >
                    <FiCopy size={24} color="#0d6efd" />
                </a>
            </button>

            <Tooltip id="my-tooltip" />
        </>
    );
}
