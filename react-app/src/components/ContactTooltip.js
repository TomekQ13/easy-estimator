import React from "react";
import { Tooltip } from "react-tooltip";

export default function TooltipContact() {
    return (
        <>
            <a
                data-tooltip-id="tooltip-contact"
                data-tooltip-content="Email: contact.agilepoker@gmail.com"
                data-tooltip-place="top"
                href="mailto:[contact.agilepoker@gmail.com]"
                className="text-decoration-none text-white"
            >
                Contact
            </a>

            <Tooltip id="tooltip-contact" />
        </>
    );
}
