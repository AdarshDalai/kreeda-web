interface AvatarProps {
    src?: string | null;
    name?: string | null;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

const sizeMap = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
};

function getInitials(name?: string | null): string {
    if (!name) return "?";
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function Avatar({ src, name, size = "md", className = "" }: AvatarProps) {
    if (src) {
        return (
            <img
                src={src}
                alt={name || "Avatar"}
                className={`${sizeMap[size]} rounded-full object-cover ${className}`}
            />
        );
    }

    return (
        <div
            className={`
        ${sizeMap[size]}
        rounded-full bg-emerald-500/20 text-emerald-400
        flex items-center justify-center font-semibold
        ${className}
      `}
        >
            {getInitials(name)}
        </div>
    );
}
