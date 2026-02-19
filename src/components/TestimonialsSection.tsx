"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
    {
        text: "Anirudh was instrumental in building the visual universe for Takes Are Real over two years. From designing character cards for multiple races to developing weapon and support props, his ability to deliver high-quality assets across complex project cycles made him an invaluable asset to our team.",
        author: "Richard Heinrich",
        image: "https://framerusercontent.com/images/uFknaDfYVUUAoUhvxiaFg4rFhus.png?width=208&height=231",
    },
    {
        text: "Anirudh is exceptionally hardworking and consistently delivered great results across diverse projects—from corporate ads to unique creative themes. He is a versatile collaborator who handles complex deliveries with ease and successfully adapts to any team or challenge.",
        author: "Shikhant Sablania",
        image: "https://framerusercontent.com/images/VQ19ZZTydGI4M3L8QpsQRjWGJ9c.jpeg?width=800&height=800",
    },
    {
        text: "This portfolio website turned out even better than I imagined! Its sleek, modern design highlights my work beautifully, and the seamless animations give it a unique edge. I've gotten tons of positive feedback from clients and recruiters.",
        author: "William",
        image: "https://framerusercontent.com/images/ykax52rsbkgYur5jZqaKxWGRLM.jpg?width=3246&height=4058",
    },
];

// Duplicate testimonials to create a seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsSection() {
    return (
        <section className="flex flex-col gap-8 overflow-hidden">
            <h3 className="text-sm font-mono text-muted uppercase tracking-wider">
                Testimonials
            </h3>

            <div className="relative w-full overflow-hidden mask-fade">
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10" />

                <motion.div
                    className="flex gap-8 w-max"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                >
                    {duplicatedTestimonials.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-6 w-[400px] md:w-[500px] flex-shrink-0 p-6 border border-border rounded-sm bg-background/50 backdrop-blur-sm"
                        >
                            <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-full border border-border">
                                <Image
                                    src={item.image}
                                    alt={item.author}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <p className="text-base leading-relaxed text-foreground">
                                    &ldquo;{item.text}&rdquo;
                                </p>
                                <footer className="text-sm font-mono text-muted">
                                    — {item.author}
                                </footer>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
