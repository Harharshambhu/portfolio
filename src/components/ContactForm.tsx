"use client";

import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';

export default function ContactForm() {
    const [state, handleSubmit] = useForm("mzdaawdy");
    const [isHovered, setIsHovered] = useState(false);

    if (state.succeeded) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-green-500/10 border border-green-500/20 rounded-xl text-center w-full h-full min-h-[300px]">
                <h3 className="text-2xl font-medium text-green-400 mb-3">Message Sent!</h3>
                <p className="text-muted">Thanks for reaching out. I'll get back to you soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <div className="flex flex-col gap-2 text-center items-center">
                <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="flex h-14 w-full md:w-[80%] rounded-md px-6 py-2 text-base text-black bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-colors placeholder:text-gray-500"
                    placeholder="Your Email Address"
                />
                <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-1"
                />
            </div>

            <div className="flex flex-col gap-2 text-center items-center">
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="flex w-full md:w-[80%] rounded-md px-6 py-4 text-base text-black bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-colors resize-none placeholder:text-gray-500"
                    placeholder="Your Message"
                />
                <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-1"
                />
            </div>

            <div className="flex justify-center w-full mt-4 pb-4">
                <div className="flex justify-center w-full md:w-[80%] z-10">
                    <motion.button
                        type="submit"
                        disabled={state.submitting}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onFocus={() => setIsHovered(true)}
                        onBlur={() => setIsHovered(false)}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "linear" }}
                        className="relative inline-flex items-center justify-center px-9 py-4 text-xl font-mono overflow-hidden disabled:opacity-50 disabled:pointer-events-none"
                        style={{ minWidth: "260px" }}
                        variants={{
                            initial: {
                                flexGrow: 0,
                                borderRadius: "4px",
                                backgroundColor: "#ffffff",
                                color: "#000000",
                            },
                            hover: {
                                flexGrow: 1,
                                borderRadius: "1px",
                                backgroundColor: "#39FF14",
                                color: "#000000",
                            },
                        }}
                        initial="initial"
                        animate={isHovered ? "hover" : "initial"}
                    >
                        <motion.div layout className="flex w-full justify-center whitespace-nowrap px-4 tracking-tighter font-bold uppercase">
                            {state.submitting ? "Sending..." : "Send Message"}
                        </motion.div>
                    </motion.button>
                </div>
            </div>
        </form>
    );
}
