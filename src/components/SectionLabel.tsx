import { ElementType, ComponentPropsWithoutRef } from "react";

type Props<T extends ElementType = "h2"> = {
    as?: T;
    className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export default function SectionLabel<T extends ElementType = "h2">({
    as,
    className,
    ...props
}: Props<T>) {
    const Tag = (as ?? "h2") as ElementType;
    return (
        <Tag
            className={["text-sm font-semibold text-muted uppercase tracking-wider", className].filter(Boolean).join(" ")}
            {...props}
        />
    );
}
