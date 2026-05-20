import ProjectsExpandGrid from "@/components/ProjectsExpandGrid";
import SpotlightHeading from "@/components/SpotlightHeading";
import { projects } from "@/data/projects";

export default function Projects() {
    return (
        <div className="flex flex-col gap-16">
            <section className="flex flex-col gap-6">
                <SpotlightHeading className="font-medium tracking-tighter leading-none" color="var(--spotlight-primary)" style={{ fontSize: "var(--fs-page-title)" }}>Projects</SpotlightHeading>
            </section>

            <section>
                <ProjectsExpandGrid projects={projects} />
            </section>
        </div>
    );
}
