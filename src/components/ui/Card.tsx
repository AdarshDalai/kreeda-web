import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`
        bg-zinc-900 rounded-2xl border border-zinc-800
        p-8 shadow-xl
        ${className}
      `}
        >
            {children}
        </div>
    );
}
