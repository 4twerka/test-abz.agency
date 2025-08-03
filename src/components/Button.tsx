import React, { type PropsWithChildren } from "react";

interface Props {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: "button" | "submit" | "reset";
}

function Button({
    children,
    onClick,
    className = "",
    type = "button",
}: PropsWithChildren<Props>) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-buttonYellow font-nunito text-base rounded-[5rem] text-black ${className}`}
        >
            {children}
        </button>
    );
}

export { Button };