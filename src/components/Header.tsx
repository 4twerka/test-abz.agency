import { Button } from "./Button";
import Logo from "../assets/Logo.svg";

interface HeaderProps {
    onUsersClick: () => void;
    onSignUpClick: () => void;
}

function Header({ onUsersClick, onSignUpClick }: HeaderProps) {
    return (
        <header className="flex justify-between items-center py-4 px-5">
            <div>
                <img src={Logo} alt="Logo" className="cursor-pointer" />
            </div>
            <div className="flex gap-2">
                <Button
                    className="px-4 sm:px-6 md:px-8 py-2 text-sm"
                    onClick={onUsersClick}
                >
                    Users
                </Button>
                <Button
                    className="px-4 sm:px-6 md:px-8 py-2 text-sm"
                    onClick={onSignUpClick}
                >
                    Sign up
                </Button>
            </div>
        </header>
    );
}

export { Header };
