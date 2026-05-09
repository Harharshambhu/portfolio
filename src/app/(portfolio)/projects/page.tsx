import ProjectsTable from "@/components/ProjectsTable";
import SpotlightHeading from "@/components/SpotlightHeading";
import { projects } from "@/data/projects";

export default function Projects() {
    return (
        <div className="flex flex-col gap-16">
            <section className="flex flex-col gap-6">
                <SpotlightHeading className="font-medium tracking-tighter leading-none" color="var(--accent-neon)" style={{ fontSize: "var(--fs-page-title)" }}>Projects</SpotlightHeading>
            </section>

            <section className="flex flex-col gap-4">
                <ProjectsTable projects={projects} />
            </section>
        </div>
    );
}
