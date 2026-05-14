import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, i) => (
                <ProjectCard
                    key={project.title}
                    project={project}
                    variant="square"
                    delay={i * 0.1}
                />
            ))}
        </div>
    );
}
