"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "What Service do you offer?",
        answer: "I specialize in Product Design, Immersive Design (XR), Graphic Design, and Logo & Branding.",
    },
    {
        question: "Do you use code in your projects?",
        answer: "Yes, I bridge the gap between design and development, often using tools like Framer and Next.js to bring designs to life.",
    },
    {
        question: "Can you design for AR/VR platforms?",
        answer: "Absolutely. I have a background in XR Design and immersive media, working with spatial computing concepts.",
    },
    {
        question: "How long does a typical project take?",
        answer: "Timelines vary by project scope, but generally range from 2-4 weeks for branding to 1-3 months for comprehensive product design.",
    },
    {
        question: "Can you collaborate with existing development teams?",
        answer: "Yes, I am experienced in working alongside developers and stakeholders to ensure seamless design handoffs.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="flex flex-col gap-8">
            <h3 className="text-sm font-mono text-muted uppercase tracking-wider">
                Common Questions
            </h3>
            <div className="flex flex-col border-t border-border">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-border">
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="flex items-center justify-between w-full py-4 text-left hover:bg-hover transition-colors px-2 -mx-2 rounded-sm group cursor-pointer"
                        >
                            <span className="text-lg font-medium text-foreground">
                                {faq.question}
                            </span>
                            <Plus
                                className={`w-5 h-5 text-muted transition-transform duration-200 ${openIndex === index ? "rotate-45" : ""
                                    }`}
                            />
                        </button>
                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <p className="pb-4 text-muted max-w-2xl">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
