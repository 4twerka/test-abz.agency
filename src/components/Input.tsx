import React from "react";

interface Props {
    type: string;
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type, placeholder, className = "", value, onChange }: Props) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full max-w-[380px] h-[54px] px-4 py-[18px] border border-[#D0CFCF] rounded-[4px] bg-none text-[#7E7E7E] text-[16px] font-nunito outline-none ${className}`}
        />
    );
}

export { Input };