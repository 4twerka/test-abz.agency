import React from "react";
import { Button } from "./Button";
import Logo from "../assets/Logo.svg";

function Header() {
    return (
        <header className="flex justify-between items-center py-4 px-2">
            <div>
                <img src={Logo} alt="Logo" className="cursor-pointer"/>
            </div>
            <div className="flex gap-2">
                <Button className="px-8 py-2">Users</Button>
                <Button className="px-8 py-2">Sign up</Button>
            </div>
        </header>
    );
}

export { Header }