import React, { type PropsWithChildren } from "react";

interface Props {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

function Button({
    children,
    onClick,
    className = "",
    type = "button",
    disabled = false,
}: PropsWithChildren<Props>) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`font-nunito text-base rounded-[5rem] text-black ${
                disabled ? "bg-[#B4B4B4] cursor-not-allowed" : "bg-buttonYellow"
            } ${className}`}
        >
            {children}
        </button>
    );
}

export { Button };