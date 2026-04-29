export default function ProjectMeta({ category, year }: { category: string; year: string }) {
    return (
        <div className="flex gap-4 text-muted font-mono text-sm">
            <span>{category}</span>
            <span>•</span>
            <span>{year}</span>
        </div>
    );
}
