type MetaItem = { label: string; value: string };

export default function ProjectMeta({ meta, category, year }: {
    meta?: MetaItem[];
    category?: string;
    year?: string;
}) {
    if (meta) {
        return (
            <div className="flex flex-wrap gap-6 text-muted font-sans font-medium text-sm">
                {meta.map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                        <span className="uppercase tracking-widest text-xs text-muted/50">{label}</span>
                        <span>{value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div className="flex gap-4 text-muted font-sans font-medium text-sm">
            <span>{category}</span>
            <span>•</span>
            <span>{year}</span>
        </div>
    );
}
