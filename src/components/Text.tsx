import type { PropsWithChildren } from "react";

interface Props {
    className?: string;
    variant: "heading" | "label";
}

function Text({children, className, variant = 'heading'} : PropsWithChildren<Props>) {
    const classNames = variant === 'heading' ? 'text-bigFont my-[3rem] font-nunito' : 'text-black text-nunito';
    return (
        <span className={`${classNames} ${className}`}>
            {children}
        </span>
    );
}

export { Text }