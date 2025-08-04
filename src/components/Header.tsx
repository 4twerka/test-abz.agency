import { Button } from "./Button";
import Logo from "../assets/Logo.svg";

function Header() {
    return (
        <header className="flex justify-between items-center py-4 px-5">
            <div>
                <a href="#top">
                    <img src={Logo} alt="Logo" className="cursor-pointer" />
                </a>
            </div>
            <div className="flex gap-2">
                <a href="#contacts">
                    <Button className="px-4 sm:px-6 md:px-8 py-2 text-sm">
                        Users
                    </Button>
                </a>
                <a href="#register">
                    <Button className="px-4 sm:px-6 md:px-8 py-2 text-sm">
                        Sign up
                    </Button>
                </a>
            </div>
        </header>
    );
}

export { Header };