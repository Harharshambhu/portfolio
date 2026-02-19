import ProjectsTable from "@/components/ProjectsTable";
import { projects } from "@/data/projects";

export default function Projects() {
    return (
        <div className="flex flex-col gap-16">
            <section className="flex flex-col gap-6">
                <h1 className="text-6xl md:text-[150px] font-medium tracking-tighter leading-none">Projects</h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted">
                    A selection of my work in Product Support, XR, and Service Design.
                </p>
            </section>

            <section className="flex flex-col gap-4">
                <ProjectsTable projects={projects} />
            </section>
        </div>
    );
}
