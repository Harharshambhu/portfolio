import ProjectMeta from "@/components/ProjectMeta";

export default function GasStationProjectPage() {
    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-6">
                <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-none">Gas Station</h1>
                <ProjectMeta category="3D Design" year="2022" />
                <p className="max-w-2xl text-lg leading-relaxed mt-4">
                    Cinematic environment design for Core Games. This is a placeholder for the project case study.
                </p>
            </section>

            <section className="min-h-[40vh] border border-dashed border-border rounded-lg flex items-center justify-center">
                <p className="text-muted">Case study content goes here.</p>
            </section>
        </div>
    );
}
