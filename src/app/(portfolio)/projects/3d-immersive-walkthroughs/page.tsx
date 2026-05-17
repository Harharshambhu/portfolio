"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import ScrollMagnifier from "@/components/ScrollMagnifier";

const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const environments = [
    {
        id: "01",
        title: "Demon Gate",
        label: "Eldritch Horror · Creature Architecture",
        description: "The gate isn't built. It's grown. Two columns of intertwined creature limbs frame a staircase cut into a hillside, with a blinding portal at the threshold. The approach is flanked by demonic flame-like tendrils rising from the ground. In the fully textured render, the surrounding landscape becomes an ecosystem: ground cover made of eye-stalked flora, vine-like organic sprawl, and a soil texture that reads more like skin than earth. The top-down camera angle was a deliberate choice. You never fully see the gate from the front, only descend into it.",
        hero: "/projects/3D-Immersive-Walkthroughs/DemonGate3.webp",
        heroAlt: "Grey-box — side perspective of staircase and creature gate with demonic tendrils",
        draftLabel: "Grey-box Blockout",
        drafts: [
            { src: "/projects/3D-Immersive-Walkthroughs/DemonGate.webp", alt: "Top-down render of the Demon Gate — a creature-formed arch surrounded by eldritch eyeball flora" },
            { src: "/projects/3D-Immersive-Walkthroughs/DemongateDraftLayout.webp", alt: "Grey-box — ground-level view of stairs leading up to the creature arch gate" },
        ],
        gallery: [
            { src: "/projects/3D-Immersive-Walkthroughs/Demon%20Gate2.webp", alt: "Demon Gate render — view 2" },
            { src: "/projects/3D-Immersive-Walkthroughs/DemonGate1.webp", alt: "Demon Gate render — view 3" },
            { src: "/projects/3D-Immersive-Walkthroughs/Demongate4.webp", alt: "Demon Gate render — view 4" },
            { src: "/projects/3D-Immersive-Walkthroughs/Demongate5.webp", alt: "Demon Gate render — view 5" },
            { src: "/projects/3D-Immersive-Walkthroughs/Demongate6.webp", alt: "Demon Gate render — view 6" },
        ],
    },
    {
        id: "02",
        title: "Enchanted Forest",
        label: "Nature · Ancient Architecture · Photorealism",
        description: "An ornate stone shrine sits at the centre of a sun-drenched forest clearing. The building is a compact temple facade with carved decorative panels, round rose windows, and layered cornice work, flanked by freestanding columns that have partially separated from the structure over time. A bronze dancer statue stands at the entrance, catching afternoon light through the canopy. The grey-box blockout shows the architectural planning: the building's proportions, column placement, and stepped base. The final render grounds it in a naturalistic setting with deep grass, mature trees, and a sky that feels like early afternoon.",
        hero: "/projects/3D-Immersive-Walkthroughs/EnchantedForest1.webp",
        heroAlt: "Full render of the Enchanted Forest shrine — stone temple building with dancer statue in sunlit forest clearing",
        draftLabel: "Blockout & Draft Views",
        drafts: [
            { src: "/projects/3D-Immersive-Walkthroughs/EnchantedForest4-draftt.webp", alt: "Grey-box blockout of the shrine building — column placement and facade proportions" },
            { src: "/projects/3D-Immersive-Walkthroughs/EnchantedForest7-DraftView02.webp", alt: "Draft view 02 — alternate camera angle" },
        ],
        gallery: [
            { src: "/projects/3D-Immersive-Walkthroughs/EnchantedForesr2-potrait.webp", alt: "Enchanted Forest — portrait format render" },
            { src: "/projects/3D-Immersive-Walkthroughs/EnchantedForest3-view2.webp", alt: "Enchanted Forest — second camera position" },
            { src: "/projects/3D-Immersive-Walkthroughs/EnchantedForest6-draft.webp", alt: "Enchanted Forest — draft lighting test" },
        ],
    },
    {
        id: "03",
        title: "Gas Station",
        label: "Retrofuturism · Prop Design · PBR Materials",
        description: "A mid-century roadside station called 'Granny Art Petrol', left standing while the world moved on and quietly upgraded itself. The canopy and signage belong to a different era: hand-painted octagonal lettering, rusted hoardings, flat prairie horizon. The props tell a different story. A blue electric charging unit with exposed cabling sits where a petrol pump once stood. A yellow plug-in charger with a connector thick with machined detail is mounted to the side. Hoverboard display racks line the forecourt. Each prop was built as an independent model with full PBR material work before being placed into the scene, treating them as products first and environment pieces second.",
        hero: "/projects/3D-Immersive-Walkthroughs/GasStationHoverBoard-zoomedout.webp",
        heroAlt: "Wide shot of the Granny Art Gas Station — vintage signage, weathered canopy, empty forecourt",
        draftLabel: "Props & Blockout",
        drafts: [
            { src: "/projects/3D-Immersive-Walkthroughs/GasStation-Draft.webp", alt: "Gas Station — scene blockout without materials" },
            { src: "/projects/3D-Immersive-Walkthroughs/GasStation-Draft-withmaterials.webp", alt: "Gas Station — blockout with early material pass applied" },
        ],
        gallery: [
            { src: "/projects/3D-Immersive-Walkthroughs/GasStation-Board.webp", alt: "Granny Art Petrol signage — octagonal vintage board close-up" },
            { src: "/projects/3D-Immersive-Walkthroughs/GasStation-Pump.webp", alt: "Sci-fi electric pump prop — blue metallic unit with cable rigging" },
            { src: "/projects/3D-Immersive-Walkthroughs/GasStation-electriccharger-piluggedin.webp", alt: "Yellow electric charger — plugged-in connector detail, machined mechanical design" },
            { src: "/projects/3D-Immersive-Walkthroughs/GasStation-electriccharger-view2.webp", alt: "Electric charger — alternate angle" },
            { src: "/projects/3D-Immersive-Walkthroughs/GasStation-scifielectriccharger-prop.webp", alt: "Sci-fi electric charger prop — isolated product render" },
            { src: "/projects/3D-Immersive-Walkthroughs/GasStationHpverboard-diaplay.webp", alt: "Hoverboard display rack — forecourt prop" },
        ],
    },
    {
        id: "04",
        title: "Temple",
        label: "Classical Architecture · Geometry Study · White Render",
        description: "A classical temple interior rendered entirely in white, no textures, no colour, no material differentiation. The decision was deliberate: stripping everything back forces all the weight to fall on geometry and proportion. Rows of Corinthian columns line a processional nave of considerable depth. Above them, an ornate carved ceiling panel carries heraldic medallions and decorative borders in high relief. The close-up detail of the plinth reveals something different underneath: dense, organic, almost coral-like stonework with tentacular forms that work against the classical exterior above. The building knows what it looks like on the surface. The base tells a different story.",
        hero: "/projects/3D-Immersive-Walkthroughs/Temple-1.webp",
        heroAlt: "White render of temple interior — long colonnade with Corinthian columns and carved ceiling",
        draftLabel: "Detail Studies",
        drafts: [
            { src: "/projects/3D-Immersive-Walkthroughs/Temple-2.webp", alt: "Temple — carved ceiling panel close-up with heraldic medallion detail" },
            { src: "/projects/3D-Immersive-Walkthroughs/Temple-dome.webp", alt: "Temple — plinth detail showing dense organic tentacular carved stonework beneath the classical exterior" },
        ],
        gallery: [],
    },
    {
        id: "05",
        title: "Old Buried",
        label: "Atmospheric · Prop Study · Cinematic Lighting",
        description: "A single stone face, colossal in scale, half-submerged in a still dark pool and consumed by vegetation. The proportions suggest a buried deity or monument, something that was once vertical and prominent, now horizontal and forgotten. The environment study focused on the material intersection of stone and organic matter: wet rock catching light differently from dry, ferns and broad-leaf foliage pushing in from every side, and the flat black water surface providing an undisturbed reflection plane. The layout view shows the asset scatter setup, with the face, water plane, and foliage instances arranged in the editor before final lighting.",
        hero: "/projects/3D-Immersive-Walkthroughs/OldBuried-1.webp",
        heroAlt: "Stone deity face half-submerged in dark water, surrounded by dense moss and fern vegetation",
        draftLabel: "Scene Layout",
        drafts: [
            { src: "/projects/3D-Immersive-Walkthroughs/OldBuried-4-grasslayout.webp", alt: "Editor view — foliage scatter layout with face model and grass instance arrangement visible" },
        ],
        gallery: [
            { src: "/projects/3D-Immersive-Walkthroughs/OldBuried-2.webp", alt: "Old Buried — alternate angle" },
            { src: "/projects/3D-Immersive-Walkthroughs/OldBuried-3.webp", alt: "Old Buried — close detail" },
        ],
    },
];

export default function ImmersiveWalkthroughsPage() {
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
                    <span className="text-sm font-semibold text-accent-blue uppercase tracking-widest">3D Design · Environment Art · 2021–2022</span>
                    <h1 className="text-6xl md:text-[90px] font-bold tracking-tighter leading-none">3D Immersive<br />Walkthroughs</h1>
                </div>
                <ScrollMagnifier>
                    <p className="max-w-2xl text-base leading-relaxed text-muted">
                        Five environments built as walkthrough scenes, each exploring a different visual language: horror and creature anatomy, sunlit classical ruin, retrofuturistic prop design, pure white architectural geometry, atmospheric buried mythology. No shared brief. Just the question of what a space can make you feel.
                    </p>
                </ScrollMagnifier>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden w-full max-w-2xl mt-2">
                    {[
                        { label: "Environments", value: "5 Scenes" },
                        { label: "Approach", value: "Walkthrough" },
                        { label: "Focus", value: "Atmosphere & Props" },
                        { label: "Year", value: "2021–2022" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1 p-5 bg-background text-left">
                            <span className="text-xs font-sans text-muted uppercase tracking-wider">{item.label}</span>
                            <span className="text-sm font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── ENVIRONMENT SECTIONS ── */}
            {environments.map((env, envIdx) => (
                <motion.section
                    key={env.id}
                    initial="hidden"
                    animate="visible"
                    variants={fade}
                    className="flex flex-col gap-8"
                >
                    {/* Header */}
                    <div className="flex flex-col gap-4">
                        <SectionLabel>{env.id} / {env.title}</SectionLabel>
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{env.title}</h2>
                        <p className="text-xs font-sans text-muted uppercase tracking-widest">{env.label}</p>
                        <ScrollMagnifier>
                            <p className="max-w-2xl text-muted leading-relaxed">{env.description}</p>
                        </ScrollMagnifier>
                    </div>

                    {/* Hero image */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
                        <Image
                            src={env.hero}
                            alt={env.heroAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 80vw"
                        />
                    </div>

                    {/* Drafts / Blockout */}
                    {env.drafts.length > 0 && (
                        <div className={`grid gap-3 ${env.drafts.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                            {env.drafts.map((img) => (
                                <div key={img.src} className="relative aspect-video rounded-xl overflow-hidden border border-border bg-background">
                                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Gallery — 2 images: side by side; 3+: first full width, rest in 2 columns */}
                    {env.gallery.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {env.gallery.length === 2 ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {env.gallery.map((img) => (
                                        <motion.div
                                            key={img.src}
                                            initial="hidden"
                                            animate="visible"
                                            variants={fade}
                                            className="relative aspect-video rounded-xl overflow-hidden border border-border"
                                        >
                                            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 40vw" />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={fade}
                                        className="relative w-full aspect-video rounded-xl overflow-hidden border border-border"
                                    >
                                        <Image src={env.gallery[0].src} alt={env.gallery[0].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" />
                                    </motion.div>
                                    {env.gallery.length > 1 && (
                                        <div className="grid grid-cols-2 gap-3">
                                            {env.gallery.slice(1).map((img) => (
                                                <motion.div
                                                    key={img.src}
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={fade}
                                                    className="relative aspect-video rounded-xl overflow-hidden border border-border"
                                                >
                                                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 40vw" />
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* Divider between sections (not after last) */}
                    {envIdx < environments.length - 1 && (
                        <div className="border-t border-border mt-4" />
                    )}
                </motion.section>
            ))}

            {/* ── CLOSING NOTE ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="rounded-2xl border border-border overflow-hidden"
            >
                <div className="flex flex-col gap-6 p-10 md:p-12 bg-background">
                    <SectionLabel>About This Collection</SectionLabel>
                    <h2 className="text-4xl font-semibold tracking-tight">Early work. Different rules.</h2>
                    <ScrollMagnifier>
                        <p className="text-muted leading-relaxed max-w-2xl">
                            These environments were built without a brief, a client, or a defined end-use. Each one started from a single visual idea (a creature gate, a buried face, a vintage sign) and the question became: how far can this go before it stops being interesting? The work is from early in my practice, but the instinct behind it hasn&apos;t changed: spaces should feel inhabited, not decorated.
                        </p>
                    </ScrollMagnifier>
                    <div className="flex flex-col gap-1 pt-2 border-t border-border">
                        <span className="text-xs font-sans text-muted">Anirudh Singh</span>
                        <span className="text-xs font-sans text-muted">Personal 3D practice · 2021–2022</span>
                    </div>
                </div>
            </motion.section>

        </div>
    );
}
