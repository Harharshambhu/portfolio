"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollMagnifier from "@/components/ScrollMagnifier";
import SectionLabel from "@/components/SectionLabel";

const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const primitives = [
    {
        name: "Sinusoidal Oscillation",
        trigger: "Continuous",
        appliedTo: "Torch flames, hanging chains, ceiling moss",
        method: "Composite sine waves at randomised frequency and amplitude per object — prevents synchronisation",
        cost: "Negligible",
        costColor: "var(--accent-neon)",
    },
    {
        name: "Perlin Noise Displacement",
        trigger: "Continuous",
        appliedTo: "Dust drift, puddle ripples, fog density",
        method: "Mathf.PerlinNoise at time-offset coordinates per particle — unique, non-repeating trajectory each frame",
        cost: "Low",
        costColor: "var(--accent-blue)",
    },
    {
        name: "Lerp + Proximity Gating",
        trigger: "User proximity",
        appliedTo: "Key glow, door creak, force-field pulse",
        method: "Lerp with smoothing coefficient 0.05–0.15/frame — prevents state snapping",
        cost: "Low",
        costColor: "var(--accent-blue)",
    },
    {
        name: "Parametric Scaling",
        trigger: "Head position",
        appliedTo: "Light shaft dust motes, volumetric elements",
        method: "Scale and fade based on vertical head delta — simulates disturbance of settled dust",
        cost: "Negligible",
        costColor: "var(--accent-neon)",
    },
];

const participants = [
    { id: "P1", exp: "First-time", onboarding: "Guided", order: "Static → Reactive" },
    { id: "P2", exp: "First-time", onboarding: "Guided", order: "Reactive → Static" },
    { id: "P3", exp: "First-time", onboarding: "Unguided", order: "Static → Reactive" },
    { id: "P4", exp: "First-time", onboarding: "Unguided", order: "Reactive → Static" },
    { id: "P5", exp: "Experienced", onboarding: "Guided", order: "Static → Reactive" },
    { id: "P6", exp: "Experienced", onboarding: "Guided", order: "Reactive → Static" },
    { id: "P7", exp: "Experienced", onboarding: "Unguided", order: "Static → Reactive" },
    { id: "P8", exp: "Experienced", onboarding: "Unguided", order: "Reactive → Static" },
];

const galleryImages = [
    { src: "/projects/xr-proximity-based-presence/webp-m/hallway.webp", alt: "Static Condition — Corridor" },
    { src: "/projects/xr-proximity-based-presence/webp-m/littedjail.webp", alt: "Reactive Condition — Lit Jail Room" },
    { src: "/projects/xr-proximity-based-presence/webp-m/in-between-room.webp", alt: "Central Corridor — Interior View" },
    { src: "/projects/xr-proximity-based-presence/webp-m/walk between jailroom.webp", alt: "Walk Between Jail Rooms" },
    { src: "/projects/xr-proximity-based-presence/webp-m/study-room.webp", alt: "Study Room — Overview" },
    { src: "/projects/xr-proximity-based-presence/webp-m/Chandelier.webp", alt: "Chandelier — Ceiling Anchor" },
];

export default function XRProximityProjectPage() {
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
                    <span className="text-sm font-semibold text-accent-blue uppercase tracking-widest">M.Des. XR Design · IIT Jodhpur · April 2026</span>
                    <h1 className="text-6xl md:text-[100px] font-bold tracking-tighter leading-none">Proximity-Based<br />Presence</h1>
                </div>
                <ScrollMagnifier>
                    <p className="max-w-2xl text-base leading-relaxed text-muted">
                        Procedural environments that respond to user proximity, gaze, and movement — sustaining engagement more effectively than static, high-fidelity alternatives without exceeding standalone VR hardware limits.
                    </p>
                </ScrollMagnifier>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden w-full max-w-2xl mt-2">
                    {[
                        { label: "Role", value: "Solo Researcher" },
                        { label: "Scope", value: "M.Des. Research" },
                        { label: "Platform", value: "Standalone VR" },
                        { label: "Year", value: "2026" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1 p-5 bg-background text-left">
                            <span className="text-xs font-sans text-muted uppercase tracking-wider">{item.label}</span>
                            <span className="text-sm font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            <div className="flex flex-col gap-24 max-w-4xl mx-auto w-full">

            {/* ── AT A GLANCE ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border rounded-xl overflow-hidden"
            >
                {[
                    { label: "Session Duration", value: "+35%", sub: "RC mean 8.4 min vs. SC mean 6.2 min" },
                    { label: "Interaction Events", value: "+77%", sub: "RC mean 15.75 triggers vs. SC mean 8.88" },
                    { label: "Re-visits", value: "3.75×", sub: "Voluntary return visits per session in reactive condition" },
                ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-2 p-8 bg-background">
                        <span className="text-xs font-sans text-muted uppercase tracking-wider">{item.label}</span>
                        <span className="text-[20px] md:text-[25px] font-semibold leading-tight">{item.value}</span>
                        <span className="text-sm text-muted leading-relaxed">{item.sub}</span>
                    </div>
                ))}
            </motion.section>

            {/* ── THE PROBLEM ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>The Problem</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">The Immersion Gap in Standalone VR</h2>
                    <ScrollMagnifier>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            Standalone VR has become affordable — but accessibility has not resolved a fundamental issue. Users report shorter sessions, more cognitive friction, and &ldquo;headset awareness&rdquo; far more frequently than in PC-based environments.
                        </p>
                    </ScrollMagnifier>
                    <ScrollMagnifier>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            A standalone headset must drive <strong className="text-foreground">two independent stereo displays simultaneously at 72–120 FPS</strong> within a combined 220° field of view, all from a mobile chip with strict power and thermal limits.
                        </p>
                    </ScrollMagnifier>
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
                    <Image
                        src="/projects/xr-proximity-based-presence/webp-m/GPUvsMobileSoP.webp"
                        alt="Hardware Architecture — PC vs. Standalone Headset"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-6 rounded-xl border border-border bg-background">
                    <ScrollMagnifier>
                        <p className="text-muted leading-relaxed italic">
                            &ldquo;Low-fidelity PC games like Minecraft and Roblox consistently outperform high-fidelity standalone VR in session duration. If graphical power determined immersion, this would be impossible.&rdquo;
                        </p>
                    </ScrollMagnifier>
                    <span className="text-xs font-sans text-muted mt-3 block">Research premise — informed by Jin (2024) and Slater &amp; Wilbur (1997)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-sans text-muted uppercase tracking-wider">Reference — Silent Hill</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                            <Image
                                src="/projects/xr-proximity-based-presence/webp-m/Silenthill.webp"
                                alt="Reference — Silent Hill"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <ScrollMagnifier>
                            <p className="text-sm text-muted">Engagement via atmosphere, not graphical fidelity.</p>
                        </ScrollMagnifier>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-sans text-muted uppercase tracking-wider">Reference — Minecraft</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                            <Image
                                src="/projects/xr-proximity-based-presence/webp-m/Minecraft.webp"
                                alt="Reference — Minecraft"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <ScrollMagnifier>
                            <p className="text-sm text-muted">World-record engagement on minimum graphical budget.</p>
                        </ScrollMagnifier>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden">
                    {[
                        { num: "220°", label: "Combined horizontal FoV — every animation loop exposed simultaneously" },
                        { num: "72+", label: "FPS required per eye — drop below this and motion sickness begins" },
                        { num: "~7%", label: "Rendering budget remaining after baked GI — headroom for reactivity" },
                        { num: "40 yrs", label: "Of 2D screen animation paradigms inherited by VR without questioning fit" },
                    ].map((s) => (
                        <div key={s.num} className="flex flex-col gap-2 p-6 bg-background">
                            <span className="text-[28px] md:text-[50px] font-extrabold leading-tight">{s.num}</span>
                            <span className="text-xs text-muted leading-relaxed">{s.label}</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── INHERITED PARADIGM ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>The Inherited Paradigm</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Why 2D Animation Logic Fails in VR</h2>
                    <ScrollMagnifier>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            Standalone VR has copied its animation logic from 40 years of 2D screen game development — keyframed loops, repeating cycles, fixed timelines. On monitors, cameras cut and shift before patterns repeat. In VR, there is no controlled camera.
                        </p>
                    </ScrollMagnifier>
                </div>

                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                    <Image
                        src="/projects/xr-proximity-based-presence/webp-m/FoV.webp"
                        alt="Field of View Comparison — 2D Camera vs. VR User"
                        fill
                        className="object-contain"
                    />
                </div>
                <ScrollMagnifier>
                    <p className="text-sm text-muted">Fig. 1.1 — Field of View Comparison: 2D Camera vs. VR User · VR&apos;s expanded peripheral FoV (~220°) exposes keyframed loops that 2D cameras hide</p>
                </ScrollMagnifier>
            </motion.section>

            {/* ── KEY INSIGHTS ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Key Insights</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">What the Problem Analysis Revealed</h2>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        {
                            num: "01",
                            title: "The Hardware Constraint Is Real — But Misattributed",
                            body: "Standalone headsets are genuinely constrained: two stereo displays at 72–120 FPS from a mobile SoC leaves little headroom. However, developers have incorrectly concluded that more graphics power is the solution. Low-fidelity games that consistently outperform high-fidelity VR in session duration prove the constraint is being framed wrong.",
                        },
                        {
                            num: "02",
                            title: "Inherited Animation Paradigms Break in 360° Environments",
                            body: "Keyframed loops designed for 2D cameras are inherently hidden by cuts and framing. VR's ~220° peripheral FoV permanently exposes these loops — the same animation that is invisible on a monitor becomes an obvious, presence-disrupting artefact in VR. This is a design problem, not a hardware problem.",
                        },
                        {
                            num: "03",
                            title: "Presence Is Software-Addressable Without Touching the Render Budget",
                            body: "Slater & Wilbur's distinction is the core insight: immersion is hardware-bound, but presence — the subjective feeling of inhabiting the space — can be improved through environmental responsiveness at negligible computational cost. This reframes the entire design space.",
                        },
                    ].map((finding) => (
                        <div key={finding.num} className="flex gap-6 p-6 rounded-xl border border-border bg-background">
                            <span className="font-sans text-sm text-muted shrink-0 pt-0.5">{finding.num}</span>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold">{finding.title}</span>
                                <ScrollMagnifier>
                                    <p className="text-sm text-muted leading-relaxed">{finding.body}</p>
                                </ScrollMagnifier>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] rounded-xl overflow-hidden border border-border bg-background">
                    <Image
                        src="/projects/xr-proximity-based-presence/webp-m/Priortization.webp"
                        alt="Prioritisation Matrix — comparing problems across user impact, feasibility, and developer control"
                        fill
                        className="object-contain p-4"
                    />
                </div>
                <ScrollMagnifier>
                    <p className="text-sm text-muted">Prioritisation Matrix — comparing problems across user impact, feasibility of intervention, and developer control</p>
                </ScrollMagnifier>
            </motion.section>

            {/* ── RESEARCH DIRECTION ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>Research Direction</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Reframing the Question</h2>
                    <ScrollMagnifier>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            Rather than pursuing graphical fidelity — an arms race standalone hardware cannot win — this research asks whether environments that respond dynamically to user presence can sustain immersion more effectively.
                        </p>
                    </ScrollMagnifier>
                    <ScrollMagnifier>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            Slater and Wilbur (1997) establish the critical distinction: <strong className="text-foreground">immersion</strong> is a technical property — resolution, FoV, tracking latency — but <strong className="text-foreground">presence</strong> is a subjective experience that can be optimised independently of hardware.
                        </p>
                    </ScrollMagnifier>
                </div>

                <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] rounded-xl overflow-hidden border border-border bg-background">
                    <Image
                        src="/projects/xr-proximity-based-presence/webp-m/ImmersionvsPresence.webp"
                        alt="Presence vs. Immersion — Framework Diagram"
                        fill
                        className="object-contain p-4"
                    />
                </div>
                <ScrollMagnifier>
                    <p className="text-sm text-muted">Presence vs. Immersion Framework · Slater &amp; Wilbur (1997); Jin (2024); Kelsey et al. (2023)</p>
                </ScrollMagnifier>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            num: "Objective 01",
                            title: "Build the Pipeline",
                            body: "Design a hardware-efficient procedural animation pipeline for standalone VR, maintaining minimum 72 FPS under all interaction conditions on Meta Quest 2.",
                            color: "var(--accent-blue)",
                        },
                        {
                            num: "Objective 02",
                            title: "Test Empirically",
                            body: "Conduct a controlled A/B study comparing session duration, interaction frequency, and self-reported immersion between static-animation and user-reactive conditions.",
                            color: "var(--accent-neon)",
                        },
                        {
                            num: "Objective 03",
                            title: "Study Onboarding",
                            body: "Measure whether diegetic vs. non-diegetic onboarding affects first-time users' ability to engage with the reactive systems at all.",
                            color: "#a78bfa",
                        },
                    ].map((obj) => (
                        <div key={obj.num} className="flex flex-col gap-4 p-6 rounded-xl border border-border">
                            <span className="text-sm font-medium font-sans" style={{ color: obj.color }}>{obj.num}</span>
                            <span className="font-semibold">{obj.title}</span>
                            <ScrollMagnifier>
                                <p className="text-sm text-muted leading-relaxed">{obj.body}</p>
                            </ScrollMagnifier>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── METHODOLOGY ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Methodology</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Four-Phase Research Process</h2>
                    <ScrollMagnifier>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            The methodology was iterative by necessity. Any technique dropping frame rate below 72 FPS on standalone hardware triggers motion sickness, making the experience unusable as a research instrument.
                        </p>
                    </ScrollMagnifier>
                </div>

                {/* Phase 01 */}
                <div className="flex flex-col gap-6 p-8 rounded-xl border border-border bg-background">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-sans text-muted uppercase tracking-wider">Phase 01 — Exploration &amp; Architectural Pivot</span>
                        <h2 className="text-4xl font-semibold tracking-tight">Audio-Reactive Pipeline: TouchDesigner → Unity</h2>
                    </div>
                    <ScrollMagnifier>
                        <p className="text-muted leading-relaxed text-sm">
                            TouchDesigner was linked to Unity via NDI/Spout/OSC protocols. Live audio was decomposed via FFT into spectral frequency bands driving Unity shader parameters and mesh vertex displacements in real time — bass drove torch flicker intensity, mid-frequencies drove particle emission, highs drove colour modulation.
                        </p>
                    </ScrollMagnifier>
                    <div className="relative w-full max-w-2xl mx-auto aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                        <Image
                            src="/projects/xr-proximity-based-presence/webp-m/Audio-Reactive Pipeline.webp"
                            alt="Phase 1 — Audio-Reactive Pipeline Architecture"
                            fill
                            className="object-contain p-4"
                        />
                    </div>
                    <ScrollMagnifier>
                        <p className="text-xs text-muted">Fig. 4.1 — Audio-Reactive Pipeline Architecture (Abandoned) · TouchDesigner → NDI/Spout/OSC → Unity VR → Meta Quest 2: 15–35 FPS</p>
                    </ScrollMagnifier>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-950/20 border border-red-900/30">
                            <span className="text-red-400 font-sans text-sm shrink-0">✕</span>
                            <ScrollMagnifier>
                                <p className="text-sm text-muted">Abandoned — Meta Quest 2 output: 15–35 FPS. Inter-application GPU texture sharing and audio-driven physics consumed the entire processing budget.</p>
                            </ScrollMagnifier>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                            <span className="text-emerald-400 font-sans text-sm shrink-0">✓</span>
                            <ScrollMagnifier>
                                <p className="text-sm text-muted">Principle retained — Dynamic environmental responsiveness is the correct direction. Scale of computation must be reduced dramatically for standalone deployment.</p>
                            </ScrollMagnifier>
                        </div>
                    </div>
                </div>

                {/* Phase 02 */}
                <div className="flex flex-col gap-6 p-8 rounded-xl border border-border bg-background">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-sans text-muted uppercase tracking-wider">Phase 02 — Environment Design &amp; Render Optimisation</span>
                        <h2 className="text-4xl font-semibold tracking-tight">The Prison Room — Native Unity URP</h2>
                    </div>
                    <ScrollMagnifier>
                        <p className="text-muted leading-relaxed text-sm">
                            A purpose-built test environment — the &ldquo;Prison Room&rdquo; — designed in native Unity URP. Three interconnected zones: entry cell with warm torch lighting, central corridor with arched openings, and interior study room with grabbable props.
                        </p>
                    </ScrollMagnifier>
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                        <Image
                            src="/projects/xr-proximity-based-presence/webp-m/Three-zoneLayout.webp"
                            alt="Prison Room — Three-Zone Floor Plan"
                            fill
                            className="object-contain p-4"
                        />
                    </div>
                    <ScrollMagnifier>
                        <p className="text-xs text-muted">Fig. 4.2 — Prison Room: Three-Zone Floor Plan · Zone 1: Entry Cell · Zone 2: Central Corridor · Zone 3: Study Room</p>
                    </ScrollMagnifier>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                                <Image
                                    src="/projects/xr-proximity-based-presence/webp-m/Entrance-torch.webp"
                                    alt="Entry Zone — Baked Torchlight"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <ScrollMagnifier>
                                <p className="text-xs text-muted">Fig. 4.3 — Entry Zone · Zone 1: Torch intensity responds to player approach</p>
                            </ScrollMagnifier>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                                <Image
                                    src="/projects/xr-proximity-based-presence/webp-m/Study-room.webp"
                                    alt="Study Room — Interaction Hotspot"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <ScrollMagnifier>
                                <p className="text-xs text-muted">Fig. 4.5 — Study Room · Zone 3: Grabbable props trigger proximity effects</p>
                            </ScrollMagnifier>
                        </div>
                    </div>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-background">
                        <Image
                            src="/projects/xr-proximity-based-presence/webp-m/render-optimization.webp"
                            alt="Render Optimisation — Three Nested Layers"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <ScrollMagnifier>
                        <p className="text-xs text-muted">Fig. 4.6 — Render Optimisation: Three Nested Layers · Baked GI (~0%) + Light Probe Network (~2%) + Real-Time Shadows in 0.8m player zone (~5%) = ~7% total overhead</p>
                    </ScrollMagnifier>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                        <span className="text-emerald-400 font-sans text-sm shrink-0">✓</span>
                        <ScrollMagnifier>
                            <p className="text-sm text-muted">Stable 72+ FPS baseline established. Full rendering budget headroom available for procedural animation systems.</p>
                        </ScrollMagnifier>
                    </div>
                </div>

                {/* Phase 03 */}
                <div className="flex flex-col gap-6 p-8 rounded-xl border border-border bg-background">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-sans text-muted uppercase tracking-wider">Phase 03 — Procedural Animation Systems</span>
                        <h2 className="text-4xl font-semibold tracking-tight">Four Primitives. Two Trigger Types.</h2>
                    </div>
                    <ScrollMagnifier>
                        <p className="text-muted leading-relaxed text-sm">
                            Four procedural animation primitives implemented in C# within Unity, each triggered by user <strong className="text-foreground">proximity</strong> (Euclidean distance from head transform drops below threshold) or <strong className="text-foreground">physical interaction</strong> (XR controller collider intersects object trigger).
                        </p>
                    </ScrollMagnifier>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {primitives.map((p) => (
                            <div key={p.name} className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="font-medium text-sm">{p.name}</span>
                                    <span className="text-xs font-mono px-2 py-0.5 rounded-full border" style={{ color: p.costColor, borderColor: p.costColor + "40" }}>{p.cost}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-sans text-muted">Trigger: {p.trigger}</span>
                                    <span className="text-xs text-muted">Applied to: {p.appliedTo}</span>
                                </div>
                                <ScrollMagnifier>
                                    <p className="text-xs text-muted leading-relaxed border-t border-border pt-3">{p.method}</p>
                                </ScrollMagnifier>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                        <span className="text-emerald-400 font-sans text-sm shrink-0">✓</span>
                        <ScrollMagnifier>
                            <p className="text-sm text-muted">All four primitives deployed. Frame rate maintained at 72+ FPS under all interaction conditions on Meta Quest 2.</p>
                        </ScrollMagnifier>
                    </div>
                </div>

                {/* Phase 04 */}
                <div className="flex flex-col gap-6 p-8 rounded-xl border border-border bg-background">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-sans text-muted uppercase tracking-wider">Phase 04 — A/B Testing Framework</span>
                        <h2 className="text-4xl font-semibold tracking-tight">8 Participants · Two Conditions · Two Onboarding Types</h2>
                    </div>
                    <ScrollMagnifier>
                        <p className="text-muted leading-relaxed text-sm">
                            An A/B testing build deployed on Meta Quest 2 hardware. Eight participants recruited from a student population — first-time headset users through frequent VR gamers. Each completed sessions in both conditions, with order counterbalanced.
                        </p>
                    </ScrollMagnifier>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                            <span className="text-xs font-sans uppercase tracking-wider" style={{ color: "var(--accent-blue)" }}>Static Condition (SC)</span>
                            <ScrollMagnifier>
                                <p className="text-sm text-muted leading-relaxed">All animations as pre-rendered keyframe loops. No proximity triggers active.</p>
                            </ScrollMagnifier>
                        </div>
                        <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                            <span className="text-xs font-sans uppercase tracking-wider" style={{ color: "var(--accent-neon)" }}>Reactive Condition (RC)</span>
                            <ScrollMagnifier>
                                <p className="text-sm text-muted leading-relaxed">All four procedural systems fully active, responding to real-time user proximity and controller input.</p>
                            </ScrollMagnifier>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {participants.map((p) => (
                            <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background">
                                <span className="font-sans text-sm text-muted w-6 shrink-0">{p.id}</span>
                                <span className="text-xs text-muted shrink-0">{p.exp}</span>
                                <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-border text-muted shrink-0">{p.onboarding}</span>
                                <span className="text-xs text-muted ml-auto">{p.order}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            </div>

            {/* ── USER STUDY VIDEO ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>User Study Recording</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Task-Driven Session — Did the Environment Feel Alive?</h2>
                    <ScrollMagnifier>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            Participants were given a single objective: <strong className="text-foreground">find the key and escape the cell.</strong> The session captures navigation pattern, zone dwell time, and whether users voluntarily return to areas already visited.
                        </p>
                    </ScrollMagnifier>
                </div>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-foreground">
                    <video
                        controls
                        loop
                        muted
                        preload="none"
                        className="w-full h-full object-cover"
                    >
                        <source src="/projects/xr-proximity-based-presence/webp-m/proxprojvideo.webm" type="video/webm" />
                    </video>
                </div>
            </motion.section>

            <div className="flex flex-col gap-24 max-w-4xl mx-auto w-full">

            {/* ── FINDINGS ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Findings</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">What the Data Shows</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden">
                    {[
                        { num: "+35%", label: "Average session duration — RC mean 8.4 min vs. SC mean 6.2 min" },
                        { num: "+77%", label: "Trigger activation events — RC mean 15.75 vs. SC mean 8.88" },
                        { num: "3.75", label: "Average voluntary re-visits per session in RC — zero in SC" },
                        { num: "≈ 0", label: "Difference in comfort scores — no nausea or performance degradation" },
                    ].map((s) => (
                        <div key={s.num} className="flex flex-col gap-2 p-6 bg-background">
                            <span className="text-[28px] md:text-[50px] font-extrabold leading-tight">{s.num}</span>
                            <span className="text-xs text-muted leading-relaxed">{s.label}</span>
                        </div>
                    ))}
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-background">
                    <Image
                        src="/projects/xr-proximity-based-presence/webp-m/sessionduration.webp"
                        alt="Session Duration by Participant — Static vs. Reactive Condition"
                        fill
                        className="object-contain"
                    />
                </div>
                <ScrollMagnifier>
                    <p className="text-sm text-muted">Fig. 5.1 — Session Duration by Participant: Static vs. Reactive Condition · RC mean 8.4 min vs. SC mean 6.2 min (+35%)</p>
                </ScrollMagnifier>

                <div className="flex flex-col gap-4">
                    {[
                        {
                            num: "01",
                            title: "Re-engagement as the Primary Differentiator",
                            body: "In SC, participants visited each zone once and moved on. In RC, 3.75 return visits per session were logged on average — participants went back to re-trigger proximity effects they had discovered. This voluntary re-engagement was entirely absent in SC and represents the clearest behavioural signal of enhanced presence.",
                        },
                        {
                            num: "02",
                            title: "Reactivity Operates at Two Cognitive Levels",
                            body: "Experienced users consciously identified procedural responsiveness within the first two minutes and intentionally re-explored triggered zones. First-time users did not consciously report noticing these effects — yet they explored more areas, spent longer dwell times, and triggered more events than in the static version.",
                        },
                        {
                            num: "03",
                            title: "Agency, Not Complexity, Activates Presence",
                            body: "Reaching toward the brazier and seeing the torch brighten in response felt categorically different from watching the same torch flicker on a timer. The first feels like the environment noticed you — the second is wallpaper. This supports Beacco's framework: presence is activated by action-reaction coupling, not environmental visual complexity.",
                        },
                    ].map((finding) => (
                        <div key={finding.num} className="flex gap-6 p-6 rounded-xl border border-border bg-background">
                            <span className="font-sans text-sm text-muted shrink-0 pt-0.5">{finding.num}</span>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold">{finding.title}</span>
                                <ScrollMagnifier>
                                    <p className="text-sm text-muted leading-relaxed">{finding.body}</p>
                                </ScrollMagnifier>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── ENVIRONMENT GALLERY ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Environment Gallery</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">The Prison Room in Unity.</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {galleryImages.map((img, i) => (
                        <motion.div
                            key={img.src}
                            initial="hidden"
                            animate="visible"
                            variants={fade}
                            className="relative aspect-video rounded-xl overflow-hidden border border-border"
                        >
                            <Image src={img.src} alt={img.alt} fill className="object-cover" />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── CONCLUSION ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="rounded-2xl border border-border overflow-hidden"
            >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-6 p-10 md:p-12 bg-background">
                        <SectionLabel>Conclusion</SectionLabel>
                        <h2 className="text-5xl font-semibold tracking-tight">Environmental responsiveness over graphical power.</h2>
                        <ScrollMagnifier>
                            <p className="text-muted leading-relaxed">
                                On constrained standalone hardware, environmental responsiveness is a more effective strategy for sustaining immersion than graphical power. The same procedural system operates at two cognitive levels simultaneously — conscious re-exploration in experienced users, and subconscious extended engagement in novices.
                            </p>
                        </ScrollMagnifier>
                        <div className="flex flex-col gap-2 pt-2 border-t border-border">
                            <span className="text-xs font-sans text-muted">Anirudh Singh · M24LDX002</span>
                            <span className="text-xs font-sans text-muted">M.Des. in XR Design · IIT Jodhpur, School of Design</span>
                            <span className="text-xs font-sans text-muted">Under the supervision of Dr. Sajan Pillai</span>
                        </div>
                    </div>
                    <div className="relative min-h-64 md:min-h-0">
                        <Image
                            src="/projects/xr-proximity-based-presence/webp-m/study-room01.webp"
                            alt="Study Room — secondary angle with desk props, bookshelf, and wall paintings"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </motion.section>

            </div>

        </div>
    );
}
