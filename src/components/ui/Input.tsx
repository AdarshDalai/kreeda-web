"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | null;
    hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, className = "", id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="space-y-1">
                {label && (
                    <label htmlFor={inputId} className="block text-sm text-zinc-400">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`
            w-full bg-zinc-800 border rounded-lg px-4 py-3
            text-white placeholder-zinc-500
            focus:outline-none focus:ring-2 focus:border-transparent
            transition-colors
            ${error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-zinc-700 focus:ring-emerald-500"
                        }
            ${className}
          `}
                    {...props}
                />
                {error && <p className="text-red-400 text-xs">{error}</p>}
                {hint && !error && <p className="text-zinc-500 text-xs">{hint}</p>}
            </div>
        );
    },
);

Input.displayName = "Input";
