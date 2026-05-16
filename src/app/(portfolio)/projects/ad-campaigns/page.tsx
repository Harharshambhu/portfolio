"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import ScrollMagnifier from "@/components/ScrollMagnifier";

const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const blinkitPanels = [
    { src: "/projects/AdCapaigns/BlinkitAdComic1.png", alt: "Panel 1 — ketchup bottle spill, dramatic action cuts" },
    { src: "/projects/AdCapaigns/BlinkitAdComic2.png", alt: "Panel 2 — character opens Blinkit app to reorder" },
    { src: "/projects/AdCapaigns/BlinkitAdComic3.png", alt: "Panel 3 — doorbell rings, DING DONG!!!" },
    { src: "/projects/AdCapaigns/BlinkitAdComic4.png", alt: "Panel 4 — Blinkit delivery arrives, YAY!!!" },
];

const blinkitDraftsV1 = [
    "/projects/AdCapaigns/Blinit-draft1.png",
    "/projects/AdCapaigns/Blinit-draft2.png",
    "/projects/AdCapaigns/Blinit-draft3.png",
    "/projects/AdCapaigns/Blinit-draft4.png",
    "/projects/AdCapaigns/Blinit-draft5.png",
    "/projects/AdCapaigns/Blinit-draft6.png",
    "/projects/AdCapaigns/Blinit-draft7.png",
    "/projects/AdCapaigns/Blinit-draft8.png",
];

const blinkitDraftsV2 = [
    "/projects/AdCapaigns/Blinit-draftv2-1.png",
    "/projects/AdCapaigns/Blinit-draftv2-2.png",
    "/projects/AdCapaigns/Blinit-draftv2-3.png",
    "/projects/AdCapaigns/Blinit-draftv2-4.png",
    "/projects/AdCapaigns/Blinit-draftv2-5.png",
    "/projects/AdCapaigns/Blinit-draftv2-6.png",
];

const hubblePosts = [
    { src: "/projects/AdCapaigns/hubble-post2.jpg", alt: "Mat-laay — Tere upar nahi jachega (Myntra parody, landscape)" },
    { src: "/projects/AdCapaigns/hubble-post3.jpg", alt: "Bus Kar King — 100% you will save, Save karle phone ke liye (Burger King parody)" },
    { src: "/projects/AdCapaigns/hubble-post4.png", alt: "Hubble social post — view 4" },
];

const cricketLogos = [
    "/projects/AdCapaigns/logo-for-cricetteams-1.png",
    "/projects/AdCapaigns/logo-for-cricetteams-1-1.png",
    "/projects/AdCapaigns/logo-for-cricetteams-1-2.png",
    "/projects/AdCapaigns/logo-for-cricetteams-2.png",
    "/projects/AdCapaigns/logo-for-cricetteams-3.png",
    "/projects/AdCapaigns/logo-for-cricetteams-4.png",
    "/projects/AdCapaigns/logo-for-cricetteams-5.png",
    "/projects/AdCapaigns/logo-for-cricetteams-6.png",
    "/projects/AdCapaigns/logo-for-cricetteams-7.png",
    "/projects/AdCapaigns/logo-for-cricetteams-9.png",
];

const tshirtRenders = [
    "/projects/AdCapaigns/logo-tshirt-render1.webp",
    "/projects/AdCapaigns/logo-tshirt-render2.webp",
    "/projects/AdCapaigns/logo-tshirt-render3.webp",
    "/projects/AdCapaigns/logo-tshirt-render4.webp",
    "/projects/AdCapaigns/logo-tshirt-render5.webp",
];

export default function AdCampaignsPage() {
    return (
        <div className="flex flex-col gap-24 pb-24">

            {/* ── COVER ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-6 items-center text-center"
            >
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-sm font-semibold text-accent-blue uppercase tracking-widest">Ad Design · Social · Print · 2022–2024</span>
                    <h1 className="text-6xl md:text-[90px] font-bold tracking-tighter leading-none">Ad Campaigns</h1>
                </div>
                <ScrollMagnifier>
                    <p className="max-w-2xl text-base leading-relaxed text-muted">
                        Commercial work across three clients — a webtoon-format comic ad for Blinkit, satirical social and print campaigns for Hubble, and aggressive character-driven logo design for cricket teams. Different briefs, different registers, same principle: if the ad is forgettable, it failed.
                    </p>
                </ScrollMagnifier>
                <div className="grid grid-cols-3 gap-px border border-border rounded-xl overflow-hidden w-full max-w-2xl mt-2">
                    {[
                        { label: "Blinkit", value: "Comic Ad · 2022" },
                        { label: "Hubble", value: "Social & Print · 2022" },
                        { label: "Home-Akraft", value: "Logo Design · 2024" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1 p-5 bg-background text-left">
                            <span className="text-xs font-sans text-muted uppercase tracking-wider">{item.label}</span>
                            <span className="text-sm font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ══ SECTION 01: BLINKIT ══ */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>01 / Blinkit</SectionLabel>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">A Comic Ad in Webtoon Format</h2>
                    <p className="text-xs font-sans text-muted uppercase tracking-widest">Bedlam Studio · 2022</p>
                    <ScrollMagnifier>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            The brief was to capture Blinkit's 10-minute delivery in a format people would actually stop scrolling for. The answer was a webtoon — a vertical, panel-driven comic strip built for mobile feeds. The story is mundane by design: someone spills ketchup while watching TV, panics, opens Blinkit, and the delivery is at the door before the mess is even cleaned up. Bold outlines, high-contrast colour panels, and onomatopoeia text — stitched together to move like a comic strip and land like a brand promise.
                        </p>
                    </ScrollMagnifier>
                </div>

                {/* Comic strip — portrait panels in a row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {blinkitPanels.map((panel) => (
                        <motion.div
                            key={panel.src}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fade}
                            className="relative aspect-[9/16] rounded-xl overflow-hidden border border-border"
                        >
                            <Image src={panel.src} alt={panel.alt} fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 25vw" />
                        </motion.div>
                    ))}
                </div>

                {/* Process — V1 rough sketches */}
                <div className="flex flex-col gap-4">
                    <p className="text-xs font-sans text-muted uppercase tracking-widest">Draft V1 — Rough Storyboard</p>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                        {blinkitDraftsV1.map((src, i) => (
                            <motion.div
                                key={src}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className="relative aspect-[9/16] rounded-lg overflow-hidden border border-border bg-background"
                            >
                                <Image src={src} alt={`Rough storyboard draft ${i + 1}`} fill className="object-cover object-top" sizes="15vw" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Process — V2 clean line art */}
                <div className="flex flex-col gap-4">
                    <p className="text-xs font-sans text-muted uppercase tracking-widest">Draft V2 — Clean Line Art</p>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {blinkitDraftsV2.map((src, i) => (
                            <motion.div
                                key={src}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className="relative aspect-[9/16] rounded-lg overflow-hidden border border-border bg-background"
                            >
                                <Image src={src} alt={`Clean line art draft ${i + 1}`} fill className="object-cover object-top" sizes="20vw" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <div className="border-t border-border" />

            {/* ══ SECTION 02: HUBBLE ══ */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>02 / Hubble</SectionLabel>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Parody Ads That Sell by Comparison</h2>
                    <p className="text-xs font-sans text-muted uppercase tracking-widest">Hubble · Social Media & Print · 2022</p>
                    <ScrollMagnifier>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            Rather than running a standard financial savings ad, this campaign made fake ads for well-known brands — then turned them into the joke. "Mat-laay" (Don't buy) parodies Myntra's sale season with "100% loss" copy. "Bus Kar King" riffs on Burger King to say the same money could go toward something worth saving for. Each post sets up a brand the audience already knows, exaggerates its worst pitch, and lets Hubble's saving promise land by contrast. The campaign also included a Hubble × Croma illustrated newspaper spread for Indore — a city-specific print piece mapping local landmarks against earning rewards.
                        </p>
                    </ScrollMagnifier>
                </div>

                {/* Newspaper print — full width */}
                <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-xl overflow-hidden border border-border">
                    <Image
                        src="/projects/AdCapaigns/hubble-newsppr-print.png"
                        alt="Hubble x Croma newspaper print ad — illustrated map of Indore with 10% rewards"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 80vw"
                    />
                </div>

                {/* Social posts — first full width, then 2 col */}
                <div className="flex flex-col gap-3">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
                        <Image
                            src={hubblePosts[0].src}
                            alt={hubblePosts[0].alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 80vw"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {hubblePosts.slice(1).map((post) => (
                            <motion.div
                                key={post.src}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className="relative aspect-video rounded-xl overflow-hidden border border-border"
                            >
                                <Image src={post.src} alt={post.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <div className="border-t border-border" />

            {/* ══ SECTION 03: HOME-AKRAFT CRICKET LOGOS ══ */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>03 / Home-Akraft</SectionLabel>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Aggressive Character Logos for Cricket Teams</h2>
                    <p className="text-xs font-sans text-muted uppercase tracking-widest">Home-Akraft · Logo Design · 2024</p>
                    <ScrollMagnifier>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            A series of high-energy sports logos built around reptilian characters — Python, Mamba, Chameleon — each designed to carry a team's identity at any scale, from jersey to scoreboard. The brief called for logos that feel dangerous and memorable, built in Photoshop with the kind of character illustration weight that holds up on merchandise. T-shirt renders were produced to validate how each mark carries on fabric.
                        </p>
                    </ScrollMagnifier>
                </div>

                {/* Logo grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {cricketLogos.map((src, i) => (
                        <motion.div
                            key={src}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fade}
                            className="relative aspect-square rounded-xl overflow-hidden border border-border bg-white"
                        >
                            <Image src={src} alt={`Cricket team logo ${i + 1}`} fill className="object-contain p-3" sizes="(max-width: 768px) 50vw, 20vw" />
                        </motion.div>
                    ))}
                </div>

                {/* T-shirt renders — first full width, rest 2 col */}
                <div className="flex flex-col gap-3">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
                        <Image
                            src={tshirtRenders[0]}
                            alt="Cricket logo on 3D t-shirt render — mannequin jumping"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 80vw"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {tshirtRenders.slice(1).map((src, i) => (
                            <motion.div
                                key={src}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fade}
                                className="relative aspect-video rounded-xl overflow-hidden border border-border"
                            >
                                <Image src={src} alt={`T-shirt render ${i + 2}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 40vw" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

        </div>
    );
}
