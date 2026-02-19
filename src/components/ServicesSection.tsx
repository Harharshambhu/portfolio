"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const services = [
    { id: "01", title: "Product Design" },
    { id: "02", title: "Immersive Design" },
    { id: "03", title: "Graphic Design" },
    { id: "04", title: "Logo & Branding" },
];

export default function ServicesSection() {
    return (
        <section className="flex flex-col gap-8">
            <ScrollReveal>
                <h3 className="text-sm font-mono text-muted uppercase tracking-wider">
                    My Services
                </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                        className="flex flex-col gap-2 p-6 border border-border hover:bg-hover transition-colors rounded-sm cursor-target"
                    >
                        <span className="font-mono text-xs text-muted">
                            {service.id}
                        </span>
                        <span className="text-lg font-medium text-foreground">
                            {service.title}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
