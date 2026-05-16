"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";

const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const problemClusters = [
    {
        num: "01",
        title: "Constant Manual Lifting",
        body: "The sheer frequency of manual lifts within a typical shift constitutes a structural hazard. The problem is not any single lift — it is the aggregate of hundreds of lifts over a career.",
    },
    {
        num: "02",
        title: "Mishandling of Vulnerable Patients",
        body: "Pregnant women, post-surgical cases, and trauma patients face disproportionate risk. The improvised bedsheet method provides no differentiation between a stable patient and a critically vulnerable one.",
    },
    {
        num: "03",
        title: "Insufficient Protocol Implementation",
        body: "Protocols for safe patient transfer exist. Their implementation does not. The gap is structural: correct procedure requires more time and more people than public ward operations allow.",
    },
    {
        num: "04",
        title: "Equipment Design Gaps",
        body: "Existing stretchers were designed without adequate consideration of the full transfer workflow. IV lines, oxygen cylinders, and monitoring equipment have no dedicated housing, forcing divided attention during transfer.",
    },
    {
        num: "05",
        title: "Absent Immobilisation Procedures",
        body: "No standardised method exists for immobilising specific body parts during lateral transfer. The spine, neck, and injured limbs are all vulnerable during bedsheet-based transfers.",
    },
];

const scamperItems = [
    {
        letter: "S",
        label: "Substitute",
        body: "Replace manual lifting entirely with a lateral sliding mechanism — the foundational principle of the final concept.",
        color: "var(--accent-blue)",
    },
    {
        letter: "C",
        label: "Combine",
        body: "Integrate snap-fit alignment feedback so bed and stretcher are correctly positioned before transfer begins.",
        color: "var(--accent-neon)",
    },
    {
        letter: "E",
        label: "Eliminate",
        body: "Eliminate the vertical lift entirely. If the mattress itself travels from bed to stretcher, the lift is structurally absent from the process.",
        color: "#a78bfa",
    },
    {
        letter: "A",
        label: "Adapt",
        body: "Customise the mattress profile for different body types. Adapt sliding resistance based on patient weight to prevent uncontrolled motion.",
        color: "#f59e0b",
    },
];

const protocolSteps = [
    {
        step: "01",
        title: "Prepare the Bed",
        desc: "Straighten to flat horizontal and lower side railings. The swinging mechanism self-corrects the mattress angle — no manual adjustment required.",
    },
    {
        step: "02",
        title: "Connect the Stretcher",
        desc: "Align the stretcher to the telescopic rail. Extend until the snap-fit joint engages — confirmed by audible click and locking resistance.",
    },
    {
        step: "03",
        title: "Slide the Mattress",
        desc: "Apply controlled lateral force. The low-friction base layer and rail work together for single-caregiver motion. Patient stays on the same surface throughout.",
    },
    {
        step: "04",
        title: "Secure the Edges",
        desc: "Activate the rotating side-fold mechanism using the one-finger tap-and-release function. Creates lateral containment for stretcher transport.",
    },
    {
        step: "05",
        title: "Verify and Release",
        desc: "Physically check all safety key locks. Disengage the stretcher from the rail. The rail retracts to stored position. Transfer complete.",
    },
];

const reflections = [
    {
        title: "The Cultural Problem Precedes the Physical One",
        body: "Unsafe transfer practice is maintained not by ignorance but by institutional normalisation. Staff know the risks. A hardware intervention that makes the safe behaviour the easiest behaviour is the only approach robust enough to survive contact with real conditions.",
    },
    {
        title: "Context Specificity is Non-Negotiable",
        body: "Every existing solution was designed for a different context. The Indian public hospital — high volume, limited staff, restricted budget, unreliable infrastructure — is not a degraded version of the Western hospital. It is a distinct operating environment that requires solutions designed from the inside.",
    },
    {
        title: "Simplicity Requires More Work Than Complexity",
        body: "Arriving at a five-step manual protocol was harder than generating automated alternatives. A manual protocol that is reliably faster, requires no external power, and fails safely — that requires sustained constraint thinking at every design decision.",
    },
];

export default function ComfortAidProjectPage() {
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
                    <span className="text-sm font-semibold text-accent-blue uppercase tracking-widest">Healthcare Product Design · IIT Jodhpur · 2025</span>
                    <h1 className="text-6xl md:text-[100px] font-bold tracking-tighter leading-none">Comfort Aid</h1>
                </div>
                <p className="max-w-2xl text-xl leading-relaxed text-muted">
                    A patient transfer system designed to eliminate the physical and clinical risks of manual bed-to-stretcher transfers in Indian public hospitals — without lifting, without improvised bedsheet methods, and without requiring more than one caregiver.
                </p>
                <p className="max-w-2xl text-base leading-relaxed text-muted">
                    Developed through immersive field research at AIIMS New Delhi, following the Design Thinking process: Empathise → Define → Ideate → Prototype → Test.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden w-full max-w-2xl mt-2">
                    {[
                        { label: "Role", value: "UX Designer" },
                        { label: "Scope", value: "Group — 6 Members" },
                        { label: "Context", value: "IIT Jodhpur" },
                        { label: "Year", value: "2025" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1 p-5 bg-background text-left">
                            <span className="text-xs font-mono text-muted uppercase tracking-wider">{item.label}</span>
                            <span className="text-sm font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── HERO IMAGE ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full rounded-2xl overflow-hidden border border-border bg-background"
            >
                <Image
                    src="/projects/Comfort Aid/Finalposter-ComfortAid.webp"
                    alt="ComfortAid — Final design poster showing the hybrid mattress system, 5-step protocol, and key statistics"
                    width={1600}
                    height={1130}
                    className="w-full h-auto"
                    priority
                />
            </motion.div>

            <div className="flex flex-col gap-24 max-w-4xl mx-auto w-full">

            {/* ── AT A GLANCE ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border rounded-xl overflow-hidden"
            >
                {[
                    { label: "Nurse Injuries", value: "35%", sub: "of nurses in Indian hospitals report musculoskeletal injuries from manual patient transfers" },
                    { label: "Patient Pain", value: "20%", sub: "of patients report increased pain levels immediately following a manual bed-to-stretcher transfer" },
                    { label: "Caregiver Impact", value: "45%", sub: "of caregivers develop chronic back pain directly linked to repeated lifting over their careers" },
                ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-2 p-8 bg-background">
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">{item.label}</span>
                        <span className="text-2xl font-semibold tracking-tight">{item.value}</span>
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
                    <h2 className="text-5xl font-semibold tracking-tight">Manual transfer was never designed.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        The predominant method — lifting a patient using bedsheets, with two to four staff members coordinating — emerged out of necessity in under-resourced settings and became embedded in institutional practice because no better alternative was accessible or affordable.
                    </p>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        In high-pressure environments like emergency departments and trauma wards, the volume of transfers required each shift makes it structurally impossible for nurses to apply careful technique to every transfer — even when they know better.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">Field Context</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                            <Image
                                src="/projects/Comfort Aid/Introduction.webp"
                                alt="Introduction — context of patient transfer in Indian hospitals"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">Root Causes</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-background">
                            <Image
                                src="/projects/Comfort Aid/Cause-Natureof problem.webp"
                                alt="Cause and nature of the patient transfer problem"
                                fill
                                className="object-contain p-3"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                        <span className="text-xs font-mono uppercase tracking-wider text-red-400">For Patients</span>
                        <ul className="flex flex-col gap-2">
                            {[
                                "Physical pain during transfer, particularly for post-surgical and trauma cases",
                                "Risk of further injury to spine, limbs, and open wounds",
                                "Psychological distress from undignified handling",
                            ].map((item) => (
                                <li key={item} className="flex gap-2 text-sm text-muted leading-relaxed">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-border shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                        <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--accent-blue)" }}>For Caregivers</span>
                        <ul className="flex flex-col gap-2">
                            {[
                                "Acute spinal loading from coordinated vertical lifts",
                                "Cumulative musculoskeletal injury over months of daily transfers",
                                "Mental burden from complex coordination under time pressure",
                            ].map((item) => (
                                <li key={item} className="flex gap-2 text-sm text-muted leading-relaxed">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-border shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.section>

            {/* ── FIELD RESEARCH ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>Field Research</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Two days at AIIMS New Delhi.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        Immersive field observation and structured interviews across Emergency, Trauma, Oncology, Neurology, NICU, and Pediatrics. The multi-department scope was intentional — transfer challenges manifest differently across patient profiles and ward contexts.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                        { src: "/projects/Comfort Aid/AIIMs-visit.webp", alt: "AIIMS New Delhi — field visit" },
                        { src: "/projects/Comfort Aid/Aiims jodhpur photos.webp", alt: "AIIMS field research photographs" },
                        { src: "/projects/Comfort Aid/Group Discussing.webp", alt: "Team discussing research findings" },
                    ].map((img) => (
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

                <div className="flex flex-col gap-4">
                    {[
                        {
                            quote: "Where do we find the time to carefully transfer a single patient when there are five others waiting for immediate attention? In a place like the trauma center, with such a heavy workload, it is hard to keep everything straight in your head.",
                            name: "Bharat",
                            role: "Trauma Centre, AIIMS New Delhi",
                        },
                        {
                            quote: "Here, we usually have two or three people available to assist with patient transfers, but this is AIIMS. The real challenges are in rural hospitals, where it is often the relatives who are instructed by the staff themselves to move patients — and that is where most accidents occur.",
                            name: "Pramod Kumar",
                            role: "Oncology Department, AIIMS New Delhi",
                        },
                    ].map((q) => (
                        <div key={q.name} className="p-6 rounded-xl border border-border bg-background">
                            <p className="text-muted leading-relaxed italic">&ldquo;{q.quote}&rdquo;</p>
                            <div className="mt-4 flex gap-2 text-xs font-mono text-muted">
                                <span className="font-semibold text-foreground">{q.name}</span>
                                <span>·</span>
                                <span>{q.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── RESEARCH SYNTHESIS ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>Research Synthesis</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Affinity Mapping.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        All collected data was transcribed and organised through affinity mapping across twelve categories — Stretcher, Bed, Wheelchair, Patient, Problems, Threats, Procedure, Protocols, Suggestions, Manual Lifting, General, Miscellaneous.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                    {[
                        { src: "/projects/Comfort Aid/Group Affinity Mapping.webp", alt: "Group affinity mapping session" },
                        { src: "/projects/Comfort Aid/Close-shot-of group-affinity-mapping.webp", alt: "Close shot of affinity mapping board" },
                        { src: "/projects/Comfort Aid/Affinity Mapping Board.webp", alt: "Affinity mapping board with all categories" },
                        { src: "/projects/Comfort Aid/Key-Insights-of-affinity-matrix.webp", alt: "Key insights extracted from affinity matrix" },
                    ].map((img) => (
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

                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl font-semibold tracking-tight">Five Problem Clusters</h2>
                    {problemClusters.map((p) => (
                        <div key={p.num} className="flex gap-6 p-6 rounded-xl border border-border bg-background">
                            <span className="font-mono text-sm text-muted shrink-0 pt-0.5">{p.num}</span>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold">{p.title}</span>
                                <p className="text-sm text-muted leading-relaxed">{p.body}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] rounded-xl overflow-hidden border border-border bg-background">
                    <Image
                        src="/projects/Comfort Aid/Action-priortity-matrix.webp"
                        alt="Key Insight-to-Action Priority Matrix"
                        fill
                        className="object-contain p-4"
                    />
                </div>
                <p className="text-sm text-muted text-center">Key Insight-to-Action Priority Matrix — translating research findings into design requirements</p>
            </motion.section>

            {/* ── USER PERSONA ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="rounded-2xl border border-border overflow-hidden"
            >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative min-h-64 md:min-h-0">
                        <Image
                            src="/projects/Comfort Aid/Raani-persona.webp"
                            alt="Rajni — User persona for ComfortAid"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-6 p-10 md:p-12 bg-background">
                        <SectionLabel>User Persona</SectionLabel>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-5xl font-semibold tracking-tight">Rajni, 26</h2>
                            <p className="text-sm text-muted font-mono">Construction labourer · Tier-2 city, Northern India · 4 months pregnant</p>
                        </div>
                        <p className="text-muted leading-relaxed text-sm">
                            Rajni represents the intersection of the three highest-risk factors in the patient transfer problem: clinical vulnerability (high-risk pregnancy), institutional context (under-resourced public hospital), and advocacy deficit (limited health literacy means she cannot challenge unsafe handling even if she perceives it as risky).
                        </p>
                        <div className="flex flex-col gap-2 border-t border-border pt-4">
                            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Design Constraint</span>
                            <p className="text-sm text-muted leading-relaxed">
                                A solution designed to protect Rajni&apos;s safety during transfer — without requiring her to request better treatment or her carers to invest additional time — is a solution that works within the real constraints of the system rather than against them.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ── HOW MIGHT WE ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-6"
            >
                <h2 className="text-5xl font-semibold tracking-tight">How Might We</h2>
                <div className="p-8 md:p-12 rounded-2xl border border-border bg-background">
                    <p className="text-xl md:text-2xl font-semibold tracking-tight leading-snug">
                        &ldquo;How might we create a human-centred system with improved weight management and balanced ergonomics, ensuring minimal effort and time for staff — incorporating customisable immobilisation — enhancing patient stability, and making it the <em className="font-normal not-italic" style={{ color: "var(--accent-blue)" }}>preferred choice for hospital staff in Indian public healthcare settings?</em>&rdquo;
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
                        {[
                            "Minimal effort for staff",
                            "Minimal time consumption",
                            "Ergonomic load reduction",
                            "Customisable immobilisation",
                            "Retrofit to existing infrastructure",
                            "Non-specialist operable",
                        ].map((c) => (
                            <div key={c} className="flex items-center gap-2 text-sm text-muted">
                                <span className="w-1 h-1 rounded-full bg-border shrink-0" />
                                {c}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ── IDEATION ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>Ideation</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">SCAMPER to concept.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        Three SCAMPER threads converged on a single concept: a mattress that slides along a rail connecting bed to stretcher. The patient remains on the mattress throughout — the mattress is the mechanism.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scamperItems.map((s) => (
                        <div key={s.letter} className="flex gap-5 p-6 rounded-xl border border-border bg-background">
                            <span className="text-2xl font-bold shrink-0" style={{ color: s.color }}>{s.letter}</span>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm">{s.label}</span>
                                <p className="text-sm text-muted leading-relaxed">{s.body}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">Brainstorming Session</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                            <Image
                                src="/projects/Comfort Aid/Brainstorming solutions.webp"
                                alt="Brainstorming solutions session"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">Concept Sketches</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-background">
                            <Image
                                src="/projects/Comfort Aid/solutio'sfinal-diagrams.webp"
                                alt="ComfortAid concept sketches and final diagrams"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                        <Image
                            src="/projects/Comfort Aid/creativity-exercisiing.webp"
                            alt="Creativity exercise — design team at work"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </motion.section>

            {/* ── THE SOLUTION ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>The Solution</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">A hybrid slide-mattress system.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        ComfortAid is a detachable hybrid slide-mattress mounted on a telescopic rail system. The patient does not move relative to the mattress at any point — the mattress, carrying the patient, slides from bed to stretcher.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: "Hybrid Mattress", desc: "A composite mattress that functions simultaneously as a patient support surface and as the moving element of the transfer mechanism. Four layers: memory e-fibre, e-spring core, EVA foam, and low-friction base." },
                        { label: "Telescopic Rail", desc: "Retractable rail infrastructure connecting bed to stretcher. Snap-fit joint provides physical connection and audible confirmation of correct alignment before transfer begins." },
                        { label: "Side-Fold Mechanism", desc: "Lateral edges raise via one-finger tap-and-release. In raised position, creates containment to prevent patient rolling during transfer and stretcher transport." },
                        { label: "Safety Key Locks", desc: "Keyed locking mechanism at each rail joint. Forced physical verification as the final action before initiating the slide — functions as a mandatory error-prevention checkpoint." },
                    ].map((c) => (
                        <div key={c.label} className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                            <span className="font-semibold" style={{ color: "var(--accent-blue)" }}>{c.label}</span>
                            <p className="text-sm text-muted leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">Physical Prototype</span>
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
                            <Image
                                src="/projects/Comfort Aid/Base-prototyping.webp"
                                alt="ComfortAid physical prototype — scale model with wooden mannequin"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ── TRANSFER PROTOCOL ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Transfer Protocol</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Five steps. One caregiver.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        The protocol must be completable by a single trained caregiver in less time than the current bedsheet method with two caregivers. This performance requirement is the threshold for adoption.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {protocolSteps.map((s, i) => (
                        <div key={s.step} className="flex gap-6 p-6 rounded-xl border border-border bg-background">
                            <span className="font-mono text-sm text-muted shrink-0 pt-0.5">{s.step}</span>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">{s.title}</span>
                                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── REFLECTIONS ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="rounded-2xl border border-border overflow-hidden"
            >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-6 p-10 md:p-12 bg-background">
                        <SectionLabel>Reflections</SectionLabel>
                        <h2 className="text-5xl font-semibold tracking-tight">What the project taught us.</h2>
                        <div className="flex flex-col gap-4">
                            {reflections.map((r) => (
                                <div key={r.title} className="flex flex-col gap-2 border-t border-border pt-4 first:border-0 first:pt-0">
                                    <span className="font-semibold text-sm">{r.title}</span>
                                    <p className="text-sm text-muted leading-relaxed">{r.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative min-h-64 md:min-h-0">
                        <Image
                            src="/projects/Comfort Aid/Reflection.webp"
                            alt="Team reflection session"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </motion.section>

            {/* ── TEAM ── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fade}
                className="flex flex-col gap-4 p-8 rounded-xl border border-border bg-background"
            >
                <h2 className="text-5xl font-semibold tracking-tight">Team</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                        { id: "M24LDX002", name: "Anirudh Singh" },
                        { id: "M24LDX004", name: "Arushi" },
                        { id: "M24LDX006", name: "Bhoomika" },
                        { id: "M24LDX014", name: "Mariya" },
                        { id: "M24LDX023", name: "Ritwik" },
                        { id: "M24LDX027", name: "Swaraj" },
                    ].map((m) => (
                        <div key={m.id} className="flex flex-col gap-0.5">
                            <span className="font-semibold text-sm">{m.name}</span>
                            <span className="font-mono text-xs text-muted">{m.id}</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-muted font-mono mt-2">Group 4 · Design Thinking Studio · IIT Jodhpur · 2025</p>
            </motion.section>

            </div>

        </div>
    );
}
