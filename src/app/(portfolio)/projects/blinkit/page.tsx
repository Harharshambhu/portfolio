export default function BlinkitProjectPage() {
    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-6 items-center text-center">
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
                        Ad Campaign · 2022
                    </span>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-none text-center">Blinkit</h1>
                </div>
                <p className="max-w-2xl text-lg leading-relaxed text-muted">
                    A comprehensive ad campaign focusing on rapid delivery services.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden w-full mt-2">
                    {[
                        { label: "Role", value: "Art Director" },
                        { label: "Scope", value: "Solo" },
                        { label: "Category", value: "Ad Campaign" },
                        { label: "Year", value: "2022" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1 p-5 bg-background text-left">
                            <span className="text-xs font-mono text-muted uppercase tracking-wider">{item.label}</span>
                            <span className="text-sm font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="min-h-[40vh] border border-dashed border-border rounded-lg flex items-center justify-center">
                <p className="text-muted">Case study content goes here.</p>
            </section>
        </div>
    );
}
