"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
    primary:
        "bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-emerald-500/50",
    secondary:
        "bg-zinc-700 hover:bg-zinc-600 text-white disabled:bg-zinc-700/50",
    outline:
        "bg-transparent border border-zinc-700 hover:bg-zinc-800 text-white disabled:opacity-50",
    ghost:
        "bg-transparent hover:bg-zinc-800 text-zinc-300 disabled:opacity-50",
    danger:
        "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-600/50",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", loading, children, className = "", disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={`
          w-full font-semibold py-3 px-4 rounded-lg transition-colors
          flex items-center justify-center gap-2
          ${variantStyles[variant]}
          ${className}
        `}
                {...props}
            >
                {loading && (
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";
