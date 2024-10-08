import React from "react";
import { Tooltip } from "react-tooltip";

export default function TooltipContact({ Element }) {
    return (
        <>
            <a
                data-tooltip-id="tooltip-contact"
                data-tooltip-content="Email: contact.agilepoker@gmail.com"
                data-tooltip-place="top"
            >
                Contact
            </a>

            <Tooltip id="tooltip-contact" />
        </>
    );
}
