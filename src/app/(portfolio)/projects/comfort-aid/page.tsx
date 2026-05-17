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
        body: "The number of lifts in a single shift is what makes it dangerous. No individual lift is the problem. It's the cumulative load across hundreds of shifts, over an entire career.",
    },
    {
        num: "02",
        title: "Mishandling of Vulnerable Patients",
        body: "Pregnant women, post-surgical patients, and trauma cases carry the most risk. The bedsheet method doesn't adjust for any of that. A stable patient and a critically vulnerable one get handled the same way.",
    },
    {
        num: "03",
        title: "Insufficient Protocol Implementation",
        body: "Safe transfer protocols do exist. They just aren't followed in practice. The correct procedure takes more time and more staff than most public wards can realistically spare.",
    },
    {
        num: "04",
        title: "Equipment Design Gaps",
        body: "The stretchers we observed weren't designed with the full transfer process in mind. There's nowhere to put IV lines, oxygen cylinders, or monitoring equipment, so staff attention is constantly split.",
    },
    {
        num: "05",
        title: "Absent Immobilisation Procedures",
        body: "There's no standard method for keeping specific body parts still during a lateral transfer. The spine, neck, and injured limbs are all at risk when the only mechanism is a bedsheet.",
    },
];

const scamperItems = [
    {
        letter: "S",
        label: "Substitute",
        body: "Replace manual lifting entirely with a lateral sliding mechanism. This ended up being the core principle behind the final concept.",
        color: "var(--accent-blue)",
    },
    {
        letter: "C",
        label: "Combine",
        body: "Add snap-fit alignment feedback so the bed and stretcher are correctly positioned before the transfer even begins.",
        color: "var(--accent-neon)",
    },
    {
        letter: "E",
        label: "Eliminate",
        body: "Get rid of the vertical lift completely. If the mattress moves from the bed to the stretcher, there's nothing left to lift.",
        color: "#a78bfa",
    },
    {
        letter: "A",
        label: "Adapt",
        body: "Adjust the mattress profile for different body types and vary the sliding resistance based on patient weight to keep the motion controlled.",
        color: "#f59e0b",
    },
];

const protocolSteps = [
    {
        step: "01",
        title: "Prepare the Bed",
        desc: "Flatten the bed and lower the side railings. The swinging mechanism handles the mattress angle automatically, so there's no manual adjustment needed.",
    },
    {
        step: "02",
        title: "Connect the Stretcher",
        desc: "Line up the stretcher with the telescopic rail and extend it until the snap-fit joint locks into place. You'll hear it click.",
    },
    {
        step: "03",
        title: "Slide the Mattress",
        desc: "Apply a steady lateral push. The low-friction base and the rail are designed to work together, so a single caregiver can manage this. The patient stays on the same surface throughout.",
    },
    {
        step: "04",
        title: "Secure the Edges",
        desc: "Use the one-finger tap-and-release to raise the side edges. This creates a lateral barrier to keep the patient from rolling during transport.",
    },
    {
        step: "05",
        title: "Verify and Release",
        desc: "Physically verify all safety key locks. Detach the stretcher from the rail. The rail slides back to its stored position. Transfer done.",
    },
];

const reflections = [
    {
        title: "The Cultural Problem Precedes the Physical One",
        body: "The staff we spoke to weren't uninformed about the risks. Unsafe transfer has become the default simply because it's the fastest option available. A solution only holds up here if it makes the safe option easier than the current one.",
    },
    {
        title: "Context Specificity is Non-Negotiable",
        body: "Every existing transfer solution we found was built for a different context. The Indian public hospital has its own constraints: high patient volume, limited staff, tight budgets, and unpredictable infrastructure. It's not a lesser version of the Western hospital. It's a genuinely different operating environment, and the design needs to come from inside that context.",
    },
    {
        title: "Simplicity Requires More Work Than Complexity",
        body: "Getting to a five-step manual protocol honestly took more work than generating automated alternatives. A manual system that's reliably faster, needs no external power, and fails safely is harder to design than it sounds. Every decision had to account for the constraints.",
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
                    A patient transfer system for Indian public hospitals that gets rid of the risks that come with manual bed-to-stretcher transfers. No lifting, no improvised bedsheet methods, and ideally just one caregiver needed.
                </p>
                <p className="max-w-2xl text-base leading-relaxed text-muted">
                    Developed through immersive field research at AIIMS New Delhi, following the Design Thinking process: Empathise → Define → Ideate → Prototype → Test.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden w-full max-w-2xl mt-2">
                    {[
                        { label: "Role", value: "UX Designer" },
                        { label: "Scope", value: "Group · 6 Members" },
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
                    alt="ComfortAid final design poster showing the hybrid mattress system, 5-step protocol, and key statistics"
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
                        The most common method is lifting a patient using bedsheets, with two to four staff coordinating the move. This came about out of necessity in under-resourced settings and stuck around because no better option was accessible or affordable.
                    </p>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        In high-pressure wards like emergency and trauma departments, the number of transfers per shift makes it almost impossible for nurses to be careful every time. Even the ones who know the right technique don't always have the time to use it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">Field Context</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                            <Image
                                src="/projects/Comfort Aid/Introduction.webp"
                                alt="Introduction context of patient transfer in Indian hospitals"
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
                        We spent two days on immersive field observation and structured interviews across Emergency, Trauma, Oncology, Neurology, NICU, and Pediatrics. Covering multiple departments was intentional. Transfer challenges look quite different depending on the patient type and ward.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                        { src: "/projects/Comfort Aid/AIIMs-visit.webp", alt: "AIIMS New Delhi field visit" },
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
                        After the visit, we transcribed everything and ran an affinity mapping session across twelve categories: Stretcher, Bed, Wheelchair, Patient, Problems, Threats, Procedure, Protocols, Suggestions, Manual Lifting, General, and Miscellaneous.
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
                <p className="text-sm text-muted text-center">Key Insight-to-Action Priority Matrix, translating research findings into design requirements</p>
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
                            alt="Rajni user persona for ComfortAid"
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
                            Rajni sits at the intersection of the three highest-risk factors we identified: clinical vulnerability from her high-risk pregnancy, the constraints of an under-resourced public hospital, and limited health literacy that makes it hard for her to push back on how she's being handled, even when something feels wrong.
                        </p>
                        <div className="flex flex-col gap-2 border-t border-border pt-4">
                            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Design Constraint</span>
                            <p className="text-sm text-muted leading-relaxed">
                                A solution that keeps Rajni safe without requiring her to ask for better care, or her caregivers to spend extra time, is one that actually fits the constraints of the system. That&apos;s the kind of design that holds up in practice.
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
                        &ldquo;How might we design a system that&apos;s easier on both staff and patients, reduces the physical load, allows for some customisation around patient stabilisation, and is actually the option that hospital staff want to use in <em className="font-normal not-italic" style={{ color: "var(--accent-blue)" }}>Indian public healthcare settings?</em>&rdquo;
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
                        Three of our SCAMPER directions kept pointing toward the same idea: a mattress that slides along a rail between the bed and the stretcher. The patient stays on the mattress throughout. The mattress is the transfer mechanism.
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
                            alt="Creativity exercise, design team at work"
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
                        ComfortAid is a hybrid slide-mattress on a telescopic rail system. The patient never moves relative to the mattress. The mattress itself slides from the bed to the stretcher, carrying the patient with it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: "Hybrid Mattress", desc: "The mattress works as both the patient support surface and the moving element of the transfer. Four layers make it work: memory e-fibre, an e-spring core, EVA foam, and a low-friction base." },
                        { label: "Telescopic Rail", desc: "A retractable rail that connects the bed to the stretcher. The snap-fit joint gives a physical lock and an audible click to confirm correct alignment before the transfer starts." },
                        { label: "Side-Fold Mechanism", desc: "The lateral edges raise with a one-finger tap and release. In raised position, they create containment to stop the patient from rolling during transport." },
                        { label: "Safety Key Locks", desc: "A keyed lock at each rail joint. You have to physically verify these before the transfer begins. It's a deliberate mandatory step, not an optional one." },
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
                                alt="ComfortAid physical prototype, scale model with wooden mannequin"
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
                        For this to actually be used, one trained caregiver needs to complete it faster than two people doing the bedsheet method. That was the benchmark from day one.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {protocolSteps.map((s) => (
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
