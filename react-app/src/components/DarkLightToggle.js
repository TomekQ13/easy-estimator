import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { authContext } from "../contexts/Auth";

function DarkLightToggle() {
    const { isDarkMode, setIsDarkMode } = useContext(authContext);

    // Use effect listening for the change is in Auth context
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Effect to update the class on the body element when theme changes

    return (
        <Button variant={isDarkMode ? "light" : "dark"} onClick={toggleTheme}>
            Switch to {isDarkMode ? "Light" : "Dark"} Mode
        </Button>
    );
}

export default DarkLightToggle;
