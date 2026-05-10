"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SectionLabel from "@/components/SectionLabel";

const PROTOTYPE_URL = "https://harharshambhu.github.io/Event-Ease/";

const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const ecosystemStakeholders = [
    { role: "Host", desc: "Corporate clients, government bodies, and institutions that commission the event and set the strategic brief." },
    { role: "Organiser", desc: "The event management agency — the central information router for the entire temporary multi-org network." },
    { role: "Manager", desc: "Specialised agency leads across production, creative, client servicing, logistics, budget, and security." },
    { role: "Sponsor", desc: "Brands funding or co-presenting the event in exchange for visibility, data, or activation rights." },
    { role: "Team", desc: "On-ground crew and internal staff executing the run-of-show across all departments simultaneously." },
    { role: "Vendors", desc: "AV, décor, catering, transport, and technical service providers — each engaged per event, not permanently." },
    { role: "Session", desc: "Speakers, performers, and facilitators delivering the content of the event. Often externally coordinated." },
    { role: "Attendees", desc: "Delegates, guests, and public participants — the primary audience for whom the event is produced." },
    { role: "Exhibitor", desc: "Brands with a physical or digital presence at the event; managed separately from sponsors." },
];

const structuralFailures = [
    {
        title: "Conflicting Briefings",
        body: "Vendors receive conflicting information because the briefing lives in multiple places — one version in email, another in WhatsApp, a third in the spreadsheet. No single source of truth.",
    },
    {
        title: "Decisions That Disappear",
        body: "A decision made in a WhatsApp conversation at 11pm is not findable the following morning. There is no record layer, so institutional memory lives in individual phones.",
    },
    {
        title: "Structural Double-Entry",
        body: "The same information is entered twice — by two people, in two places — with two opportunities for versions to diverge. This is a design problem, not a behaviour problem.",
    },
    {
        title: "The Global Platform Gap",
        body: "Cvent is built for North American corporate buyers — too expensive, too generic. Indian platforms focus on ticketing. Nothing exists for internal Indian agency operations.",
    },
];

const architecturalPrinciples = [
    {
        num: "01",
        title: "The Channel is the Atomic Unit",
        body: "Everything belongs to a channel. A task, a form, a document, a vendor relationship — all are scoped to and accessed from a channel. The channel is not a conversation container. It is the operational unit.",
    },
    {
        num: "02",
        title: "Event-Scoped by Default",
        body: "Every channel, form, task, and conversation belongs to a specific event. An Infosys Summit conversation cannot bleed into a Wipro Retreat conversation. Scope is structural, not a setting.",
    },
    {
        num: "03",
        title: "One Record, Role-Specific Views",
        body: "No double-entry. A vendor fills in a form and the agency sees the output. Both look at different views of the same underlying object. The data model is shared; the interface is not.",
    },
    {
        num: "04",
        title: "The Tunnelled View as a Design Principle",
        body: "A vendor's experience should feel complete and purposeful for their needs — not restricted. A portal that communicates 'limited access' is a failure. The tunnelled view feels like its own product.",
    },
    {
        num: "05",
        title: "WhatsApp as an Architectural Layer",
        body: "Indian vendors are on WhatsApp. This is not a problem to solve — it is a constraint to accommodate by making WhatsApp a structured broadcast fallback within the architecture.",
    },
];

const channelZones = [
    {
        zone: "Company Layer",
        type: "Permanent",
        color: "var(--accent-blue)",
        channels: ["#company-general (locked)", "#company-wins", "#company-random", "#dept-operations", "#dept-production", "#dept-marketing", "#dept-finance (locked)", "#dept-logistics"],
        desc: "Mandatory and department channels that form the workspace backbone. These never archive. Role-gated — dept-finance is locked to Finance only.",
    },
    {
        zone: "Event Layer",
        type: "Temporary",
        color: "#ea580c",
        channels: ["#[event]-general", "#[event]-ops", "#[event]-production", "#[event]-marketing", "#[event]-finance (locked)", "#[event]-logistics", "#[event]-vendor-[name]", "△ [event]-alerts"],
        desc: "A dedicated channel cluster per event, archived T+14 days after closure. Contains internal channels plus external-facing channels for each vendor, sponsor, client, and venue.",
    },
    {
        zone: "Personal Layer",
        type: "Private",
        color: "#7c3aed",
        channels: ["DMs (1:1)", "Group DMs", "Saved items"],
        desc: "Direct messages and saved content. Individual and private — belongs to the person, not the project. Context-tagged by role, company, and event to solve the Slack identity problem.",
    },
];

const lifecycleStages = [
    { label: "Lead", color: "#737373", desc: "Event is a potential brief — no commitment" },
    { label: "Confirmed", color: "var(--accent-blue)", desc: "Client signed off — planning can begin" },
    { label: "Planning", color: "#ca8a04", desc: "Active production — vendors onboarding" },
    { label: "Build-Up", color: "#ea580c", desc: "On-site setup underway" },
    { label: "Live", color: "#dc2626", desc: "Event is live — all-hands on deck" },
    { label: "Wrap-Up", color: "#7c3aed", desc: "Post-event breakdown and reporting" },
    { label: "Closed", color: "#16a34a", desc: "Event archived — channels preserved T+14" },
];

const platformEngines = [
    { name: "Communication", desc: "Real-time channels, DMs, broadcast — the primary layer all other modules surface through." },
    { name: "Forms", desc: "Multi-stage form pipelines with parent-child hierarchy and automatic stage mapping." },
    { name: "Task", desc: "List, Kanban, Gantt, and Analytics views — all derived from the same task record." },
    { name: "Permission", desc: "Role-access matrix governing who can see, post in, and manage each channel type." },
    { name: "Data Sync", desc: "The mechanism that connects vendor child form completion to agency parent form stage updates." },
    { name: "Notification", desc: "Three-tier delivery system: immediate push, batched in-app, and passive on-visit." },
    { name: "Analytics", desc: "Status distribution, workload per assignee, form linkage, velocity, and burndown — computed from live task state." },
];

const roleMatrix = [
    { channel: "#company-general", admin: "Full", eventMgr: "Full", opsCoord: "Full", vendor: "None", client: "None" },
    { channel: "#dept-[name]", admin: "Full", eventMgr: "Own dept", opsCoord: "Own dept", vendor: "None", client: "None" },
    { channel: "#[event]-general", admin: "Full", eventMgr: "Full", opsCoord: "Full", vendor: "None", client: "None" },
    { channel: "#[event]-ops", admin: "Full", eventMgr: "Full", opsCoord: "Full", vendor: "None", client: "None" },
    { channel: "#[event]-vendor-[x]", admin: "Full", eventMgr: "Full", opsCoord: "Full", vendor: "Own only", client: "None" },
    { channel: "#[event]-client-[x]", admin: "Full", eventMgr: "Full", opsCoord: "View", vendor: "None", client: "Own only" },
    { channel: "DMs", admin: "Open", eventMgr: "Open", opsCoord: "Open", vendor: "Agency only", client: "Agency only" },
];

const modules = [
    {
        id: "credentials",
        title: "Credentials",
        tagline: "Configuration to on-site issuance.",
        desc: "Manages the full credential lifecycle — from tier definition through on-site pickup — in one place. Credential tiers (Gold, Silver, Classic) are configured once and referenced across distribution, monitoring, and fulfilment.",
        tabs: [
            { name: "Configuration", detail: "Define credential tiers with associated perks, colour codes, and access permissions. The configuration step is deliberately separated — changes here propagate to all downstream tabs without re-entry." },
            { name: "Collection & Distribution", detail: "Staff and vendor credential distribution table. Each row shows name, role, tier, channel, and pickup status. Bulk actions available at the distribution stage." },
            { name: "Monitoring", detail: "Live pickup tracking against issued count. Waitlist management — guests can be promoted from waitlist to confirmed tier if a slot opens." },
            { name: "Fulfilment & Sync", detail: "Sync status log and fulfilment confirmation. Shows gaps between what was issued and what was collected, with timestamp records." },
        ],
    },
    {
        id: "guestlists",
        title: "Guest Lists",
        tagline: "RSVP to check-in in one module.",
        desc: "Tracks every attendee from invitation through on-day arrival. The guest table is the single record — RSVP status, dietary requirements, tier assignment, and check-in confirmation all live here, updated by the relevant team at each stage.",
        tabs: [
            { name: "RSVP & Confirmation", detail: "Full guest table with tier badges, dietary flags, and RSVP status. Sortable and filterable. A guest's record is created once and updated as the event approaches." },
            { name: "Waitlist", detail: "Waitlisted guests with position number and a one-action promotion flow. When a confirmed guest cancels, the next waitlisted guest is promoted and notified." },
            { name: "Check-in", detail: "On-day scanner interface. QR-based or manual search. Marks guests as arrived in real time — visible to all team members with module access." },
            { name: "Export", detail: "Download final guest list as CSV or PDF for venue ops, security, and catering final-count reconciliation." },
        ],
    },
    {
        id: "catering",
        title: "Catering",
        tagline: "Menu to final count.",
        desc: "The catering module exists to solve the final-count problem — the recurring failure where a catering vendor receives a headcount that does not match actual attendance. Configuration and final count are deliberately separate steps with a locking mechanism.",
        tabs: [
            { name: "Catering Setup", detail: "Menu builder with dietary configuration (veg, non-veg, vegan, Jain, allergen flags) and session-to-meal mapping. One session can have multiple meal configurations for different guest tiers." },
            { name: "Final Count", detail: "Lock screen that converts the live guest count into a confirmed catering order. The lock action creates a permanent record and sends an automatic update to the catering channel. Cannot be edited after lock without a manual override with timestamp." },
        ],
    },
    {
        id: "assets",
        title: "Assets & Equipment",
        tagline: "Load-in to bill-back.",
        desc: "Tracks every physical asset across the event — from AV rigs to badge printers — with load-in and load-out schedules, vendor assignment, and status lifecycle. The load-in schedule view surfaces the asset timeline at a glance, preventing the common failure of assets arriving without a receiving point.",
        tabs: [
            { name: "Asset Setup", detail: "Tracker view with stat cards (Total / Confirmed / Pending / Draft). Each asset has a category, zone, vendor, load-in time, load-out time, and a status pill that cycles through Draft → Pending → Confirmed on click. A timeline view groups assets by load-in slot." },
            { name: "Distribution & Billback", detail: "Distribution assignment and post-event bill-back reporting. Maps each asset to its usage zone and responsible team for reconciliation against vendor invoices." },
        ],
    },
    {
        id: "forms",
        title: "Forms & Tasks",
        tagline: "Eliminating double-entry.",
        desc: "The most complex module — the one that makes MmE fundamentally different from all existing platforms. Forms are not data collection tools bolted onto a project management core. They are the connective tissue between vendor internal work and agency milestone tracking.",
        tabs: [
            { name: "Forms & Pipelines", detail: "Pipeline list showing all active forms per event (Vendor Onboarding, Stage Tech Brief, etc.). Each pipeline shows stage count, last activity, and status. Clicking a pipeline opens the stage rail: Draft → Sent → Submitted → Reviewed → Approved. Submitting a stage auto-creates a linked Task." },
            { name: "Tasks — List", detail: "Task rows with title, assignee, priority, due date, status, and tags. Full create/edit drawer with linked form field, description, and activity log." },
            { name: "Tasks — Kanban", detail: "Five columns: To Do · In Progress · In Review · Done · Blocked. Draggable cards with priority colour coding. Kanban state reflects form pipeline submissions in real time." },
            { name: "Tasks — Gantt", detail: "Timeline bars per task, grouped by assignee. Shows overlap, slack, and critical path at a glance without configuration." },
            { name: "Tasks — Analytics", detail: "Live computed views: status distribution bar chart, workload per assignee (assigned vs done), form linkage grouping, velocity, and burndown." },
        ],
    },
    {
        id: "comms",
        title: "Communications",
        tagline: "The channel is the product.",
        desc: "Not a module added to the platform — the layer everything else surfaces through. Every operational object (task, form, document) is accessed from within a channel. Communication is not a feature of MmE. MmE is a communication platform with operational depth.",
        tabs: [
            { name: "Channel Chat", detail: "Three-column layout: sidebar, chat, right panel. Right panel tabs: Overview, Members, Pinned Docs, Forms, Tasks. Messages support rich text, file attachments, poll cards, and system notices. Channels are event-scoped — there is no global feed." },
            { name: "Broadcast", detail: "One-to-many announcements with optional acknowledgement requirement. Sent tab shows real-time ack status per recipient. Unacknowledged after 30 min: Tier 1 reminder to recipient. After 60 min: sender notified of non-acknowledgers by name. On event day: thresholds compress to 10/20 min." },
            { name: "Direct Messages", detail: "Filterable by Internal / External / Clients / Vendors. Every contact row shows role, company, and event — solving the Slack identity problem where DMs from unfamiliar names have no context." },
        ],
    },
];

const notificationTiers = [
    { tier: "Tier 1 — Immediate", trigger: "@mention, broadcast requiring ack, task stage update, URGENT-flagged message", delivery: "Push notification + in-app badge + sound", override: "Do Not Disturb mode only" },
    { tier: "Tier 2 — Batched", trigger: "New message in accessible channel, new DM, broadcast not requiring ack", delivery: "In-app only — digest every 30 minutes", override: "Yes, per-channel setting" },
    { tier: "Tier 3 — Passive", trigger: "Resolved thread reopened, file shared, system messages", delivery: "Seen on next visit — no active delivery", override: "N/A" },
];

const competitors = [
    { name: "Cvent", verdict: "Database product. Communication is a notification layer on top of a project management core. Built for North American corporate buyers." },
    { name: "Lennd", verdict: "Closest competitor — describes itself as 'a communications tool at its core.' But portal-based (each vendor gets a website), not channel-based real-time coordination." },
    { name: "Bizzabo", verdict: "Attendee experience platform. No internal agency coordination layer exists." },
    { name: "Samaaro", verdict: "WhatsApp integration as outbound broadcast only — attendee notifications, not structured vendor coordination." },
    { name: "Zoho Backstage", verdict: "Indian-market ticketing and attendee registration. No operational or vendor layer." },
    { name: "Eventdex", verdict: "Badge and registration focus. Communication entirely absent from the product." },
    { name: "Dreamcast", verdict: "Streaming and ticketing. Built for the public-facing event experience, not internal production operations." },
];

const originalContributions = [
    {
        num: "01",
        title: "The Communication-First Architecture Inversion",
        body: "Existing platforms treat communication as a notification layer on top of a project management core. MmE inverts this — making the channel the primary unit from which all operational objects derive their context.",
    },
    {
        num: "02",
        title: "Event-Scoped Ephemeral Channels as Operational Memory",
        body: "Structured temporary communication environments that automatically archive at the end of their lifecycle, preserving institutional memory while preventing channel pollution across events. Not implemented in any existing event management product.",
    },
    {
        num: "03",
        title: "Double-Entry Elimination via Parent-Child Form Hierarchy",
        body: "The parent-child form system with automatic stage mapping eliminates a structural coordination failure. The vendor does one thing in one place. Both parties are updated. This mechanism is absent from all existing platforms.",
    },
    {
        num: "04",
        title: "The Tunnelled View as a Design Principle",
        body: "A secondary user's experience designed as purposefully complete rather than permission-restricted. The vendor portal feels like its own product — not a restricted version of the agency portal.",
    },
    {
        num: "05",
        title: "The Indian B2B Agency Market as an Underserved Design Context",
        body: "Indian event management software grows at 17.9% CAGR. No purpose-built platform exists for agency-side operations. Every existing tool is either a global enterprise product designed for Western buyers or an Indian attendee-facing ticketing platform.",
    },
];

export default function EventEaseProjectPage() {
    const protoContainerRef = useRef<HTMLDivElement>(null);
    const [protoScale, setProtoScale] = useState<number | null>(null);

    useEffect(() => {
        const el = protoContainerRef.current;
        if (!el) return;
        const measure = () => setProtoScale(el.offsetWidth / 1920);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <div className="flex flex-col gap-24 pb-24">

            {/* ── COVER ── */}
            <motion.section initial="hidden" animate="visible" variants={fade} className="flex flex-col gap-6 items-center text-center">
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
                        UX &amp; Product Design · B2B SaaS · 2024–2026
                    </span>
                    <h1 className="text-6xl md:text-[100px] font-bold tracking-tighter leading-none">EventEase</h1>
                    <p className="text-2xl md:text-3xl font-medium tracking-tight text-muted">Event Management Platform</p>
                </div>
                <p className="max-w-2xl text-xl leading-relaxed text-muted">
                    Communication as the Operating System of Event Management.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden mt-4 w-full max-w-2xl">
                    {[
                        { label: "Role", value: "UX & Product Designer" },
                        { label: "Scope", value: "Solo" },
                        { label: "Platform", value: "B2B SaaS — Web & Mobile" },
                        { label: "Year", value: "2026" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1 p-5 bg-background">
                            <span className="text-xs font-sans text-muted uppercase tracking-wider">{item.label}</span>
                            <span className="text-sm font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── THE PROBLEM ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>The Problem</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">The operational backbone of India's event industry is WhatsApp.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        India's MICE sector generated <span className="text-foreground font-medium">₹4,16,217 crore in 2024</span> and is projected to reach ₹8,73,559 crore by 2030. Yet most Indian event agencies coordinate through WhatsApp groups, email chains, and spreadsheets — with no purpose-built operational software.
                    </p>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        The specific gap is not a missing feature in existing tools. It is a missing category: no platform treats communication as the operational core. Every existing tool is a database product with a messaging layer added on top. Teams use the software for record-keeping and return to WhatsApp for actual coordination.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {structuralFailures.map((f) => (
                        <div key={f.title} className="flex flex-col gap-2 p-6 rounded-xl border border-border bg-background">
                            <span className="font-semibold text-sm" style={{ color: "var(--accent-blue)" }}>{f.title}</span>
                            <p className="text-sm text-muted leading-relaxed">{f.body}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── RESEARCH: STAKEHOLDER MAP ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Research — Stakeholder Map</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Nine primary categories. Twelve agency roles.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        Nine primary stakeholder categories were identified across the Indian event ecosystem. Within the agency team alone, twelve distinct management roles were mapped — Event Manager, Performance Coordinator, Security Manager, Budget Manager, Client Servicing Lead, Logistics Manager, and more. The insight: the agency is not a service provider. It is the <span className="text-foreground font-medium">information router</span> for an entire temporary multi-organisational network.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {ecosystemStakeholders.map((s) => (
                        <div key={s.role} className="flex flex-col gap-2 p-5 rounded-xl border border-border bg-background">
                            <span className="font-semibold text-sm" style={{ color: "var(--accent-blue)" }}>{s.role}</span>
                            <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── RESEARCH: ECOSYSTEM MAPPING ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Research — Ecosystem Mapping</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Twelve simultaneous information flows.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        A full ecosystem map traced four types of flows — goods, services, information, and monetary — between the event management agency and its surrounding network. Twelve distinct simultaneous information flows were identified. When information flow breaks, the failure is always a communication breakdown — not a process failure, not a people failure.
                    </p>
                </div>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                    <Image src="/projects/EventEase/EcosystemMapping.png" alt="Ecosystem map — four flow types across all stakeholder relationships" fill className="object-contain p-4" />
                </div>
            </motion.section>

            {/* ── RESEARCH: EVENT PROCESS MAP ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Research — Event Process Map</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Five parallel workstreams. One WhatsApp group.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        A detailed process map traced the full event lifecycle across parallel swim lanes: corporate client, agency teams (Client Servicing, Concept, Creative, Production, Operations), sponsors, vendors, technology platforms, government bodies, and the venue. An event agency manages at minimum five distinct parallel workstreams simultaneously — with no structural way to know which messages require action, which are informational, and which are resolved.
                    </p>
                </div>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                    <Image src="/projects/EventEase/Event-Process-Map.png" alt="Event process map — full lifecycle across all parallel stakeholder swim lanes" fill className="object-contain p-3" />
                </div>
            </motion.section>

            {/* ── RESEARCH: COMPETITIVE ANALYSIS ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Research — Competitive Analysis</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">No platform inverts the model.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        Seven existing platforms were analysed. Lennd is the closest competitor, describing itself as "a communications tool at its core," but its model is portal-based — each vendor gets a website, not a channel. No existing platform makes communication the primary unit of organisation.
                    </p>
                </div>
                <div className="flex flex-col gap-px border border-border rounded-xl overflow-hidden">
                    {competitors.map((c, i) => (
                        <div key={c.name} className={`grid grid-cols-[130px_1fr] gap-6 p-5 bg-background ${i !== competitors.length - 1 ? "border-b border-border" : ""}`}>
                            <span className="font-semibold text-sm pt-0.5">{c.name}</span>
                            <p className="text-sm text-muted leading-relaxed">{c.verdict}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── RESEARCH: GAP CLOSURE STRATEGY ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Research — Gap Closure Strategy</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Nine market failures. Nine design responses.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        Nine structural failures in the current market were each matched with a corresponding platform design response. The gap closure map was the direct input into the design thesis — every platform decision traces back to one of these nine gaps.
                    </p>
                </div>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                    <Image src="/projects/EventEase/GapClosure-Strategy-Map.png" alt="Gap closure strategy — nine market failures and platform responses" fill className="object-contain p-3" />
                </div>
            </motion.section>

            {/* ── DESIGN THESIS ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Design Thesis</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Communication is the operating system.</h2>
                </div>
                <div className="p-8 md:p-12 rounded-2xl border border-border bg-background">
                    <p className="text-xl md:text-2xl font-semibold tracking-tight leading-snug">
                        &ldquo;Communication is the operating system of event management. Every other tool — forms, tasks, approvals, documents, budgets — is a{" "}
                        <em className="font-normal not-italic" style={{ color: "var(--accent-blue)" }}>layer on top of communication, not the other way around.</em>&rdquo;
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-xs font-sans text-muted uppercase tracking-wider mb-1">Five Architectural Principles</span>
                    {architecturalPrinciples.map((p) => (
                        <div key={p.num} className="flex gap-6 p-6 rounded-xl border border-border bg-background">
                            <span className="font-sans text-sm text-muted shrink-0 pt-0.5">{p.num}</span>
                            <div className="flex flex-col gap-1.5">
                                <span className="font-semibold text-sm">{p.title}</span>
                                <p className="text-sm text-muted leading-relaxed">{p.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── INFORMATION ARCHITECTURE ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Information Architecture</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Three layers. One coherent system.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        The platform's IA is designed in three layers: global navigation (Overview · Events · DMs), workspace organisation (channels in three structural zones), and the module layer (operational modules accessed through the Event Dashboard). Each layer maps exactly to one zone of the channel hierarchy — learnable, exhaustive, non-overlapping.
                    </p>
                </div>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                    <Image src="/projects/EventEase/Information-architecture.png" alt="MmE — full platform information architecture" fill className="object-contain p-4" />
                </div>

                {/* Channel Zones */}
                <div className="flex flex-col gap-4">
                    <span className="text-xs font-sans text-muted uppercase tracking-wider">The Three Channel Zones</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {channelZones.map((z) => (
                            <div key={z.zone} className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-background">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-sm" style={{ color: z.color }}>{z.zone}</span>
                                    <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-border text-muted">{z.type}</span>
                                </div>
                                <p className="text-xs text-muted leading-relaxed">{z.desc}</p>
                                <ul className="flex flex-col gap-1">
                                    {z.channels.map((ch) => (
                                        <li key={ch} className="flex items-center gap-2 text-xs font-sans text-muted">
                                            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: z.color }} />
                                            {ch}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lifecycle Stages */}
                <div className="flex flex-col gap-4">
                    <span className="text-xs font-sans text-muted uppercase tracking-wider">Seven-Stage Lifecycle Colour System</span>
                    <p className="text-sm text-muted leading-relaxed max-w-2xl">
                        Each event lifecycle stage has a distinct colour that appears consistently across the sidebar, Events tab, Overview diagram, and channel headers. Stage is communicated through colour throughout — anyone can read the status of every event from the colour indicator alone.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {lifecycleStages.map((s) => (
                            <div key={s.label} className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-background">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                                <span className="text-sm font-medium w-20 shrink-0">{s.label}</span>
                                <span className="text-xs text-muted">{s.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ── ROLE-ACCESS MATRIX ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Role-Access Matrix</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">The tunnelled view in numbers.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        The access matrix is the governance layer that makes the tunnelled vendor view possible. A vendor can see their own channel fully, post freely, and access all their forms and tasks — while having no visibility into the agency's internal coordination. The experience feels complete, not restricted.
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left p-4 font-mono text-xs text-muted uppercase tracking-wider bg-background">Channel Type</th>
                                {["Org Admin", "Event Mgr", "Ops Coord", "Vendor", "Client"].map(h => (
                                    <th key={h} className="text-left p-4 font-mono text-xs text-muted uppercase tracking-wider bg-background">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {roleMatrix.map((row, i) => (
                                <tr key={row.channel} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-hover/30"}`}>
                                    <td className="p-4 font-mono text-xs text-muted">{row.channel}</td>
                                    {[row.admin, row.eventMgr, row.opsCoord, row.vendor, row.client].map((v, j) => (
                                        <td key={j} className={`p-4 text-xs font-medium ${v === "None" ? "text-muted" : v === "Full" || v === "Open" ? "text-foreground" : "text-amber-600"}`}>{v}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.section>

            {/* ── MODULE ARCHITECTURE ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Module Architecture</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">284 tools. Seven engines. 47 components.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        An initial brainstorm produced 284 tools across 17 modules and 6 clusters: Planner, Registration &amp; Badges, Marketing, Logistics, Agenda &amp; Speaker, Exhibitor, Sponsor, Security, Comms, and System Modules. These were reduced to 47 buildable components by identifying the seven platform engines that power most of them — everything else is a configuration of an engine applied to a specific operational domain.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {platformEngines.map((e) => (
                        <div key={e.name} className="flex gap-4 p-5 rounded-xl border border-border bg-background">
                            <span className="w-2 h-2 mt-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--accent-blue)" }} />
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm">{e.name}</span>
                                <p className="text-xs text-muted leading-relaxed">{e.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {[
                        { src: "/projects/EventEase/Module-Brainstorm-Mapping1.webp", label: "Module Brainstorm — Session 1" },
                        { src: "/projects/EventEase/Module-Brainstorm-Mapping2.webp", label: "Module Brainstorm — Session 2" },
                        { src: "/projects/EventEase/Module-Brainstorm-Mapping3.webp", label: "Module Brainstorm — Session 3" },
                    ].map((img) => (
                        <div key={img.src} className="flex flex-col gap-2">
                            <span className="text-xs font-sans text-muted uppercase tracking-wider">{img.label}</span>
                            <div className="relative w-full rounded-xl overflow-hidden border border-border">
                                <Image src={img.src} alt={img.label} width={0} height={0} sizes="100vw" className="w-full h-auto" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-sans text-muted uppercase tracking-wider">Module Mapping</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-background">
                            <Image src="/projects/EventEase/ModuleMapping.png" alt="Module mapping — dependencies, outputs, features, and permissions per module" fill className="object-contain p-3" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-sans text-muted uppercase tracking-wider">Dashboard Module Map</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-background">
                            <Image src="/projects/EventEase/Dashboard-Module-Map.png" alt="Dashboard module map — widget layout and module connections" fill className="object-contain p-3" />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ── MODULE DEEP DIVES ── */}
            {modules.map((mod) => (
                <motion.section key={mod.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <SectionLabel>Module — {mod.title}</SectionLabel>
                        <h2 className="text-4xl font-semibold tracking-tight">{mod.tagline}</h2>
                        <p className="max-w-2xl text-muted leading-relaxed">{mod.desc}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {mod.tabs.map((tab, i) => (
                            <div key={tab.name} className="flex gap-5 p-5 rounded-xl border border-border bg-background">
                                <span className="font-sans text-xs text-muted shrink-0 pt-0.5 w-5">{String(i + 1).padStart(2, "0")}</span>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-sm">{tab.name}</span>
                                    <p className="text-sm text-muted leading-relaxed">{tab.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>
            ))}

            {/* ── FORMS: PARENT-CHILD HIERARCHY ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Forms System — The Core Mechanism</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">One action. One place. Both parties updated.</h2>
                </div>

                <div className="p-8 rounded-2xl border border-border bg-background">
                    <span className="text-xs font-sans text-muted uppercase tracking-wider">The Problem, Precisely Stated</span>
                    <p className="mt-4 text-lg leading-relaxed max-w-2xl">
                        A vendor completes internal work, reaches a decision, and then has to separately inform the agency of that decision. Two updates. Two places. Two opportunities for versions to diverge. This is a <span className="font-semibold">structural design problem, not a behaviour problem.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "var(--accent-blue)" }} />
                            <span className="font-semibold text-sm">Agency — Parent Form</span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">Stages: A → B → C → D. Published to the vendor's event channel. The agency sees which stages are complete, when, and by whom. This form is never manually updated by the agency.</p>
                    </div>
                    <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#16a34a" }} />
                            <span className="font-semibold text-sm">Vendor — Child Form</span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">Stages: 1 → 2 → 3 → 4. Lives in the vendor's internal channel. Stage 4 is mapped to Stage B on the parent form. The agency cannot see the child form's content — only that the trigger fired and when.</p>
                    </div>
                    <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "var(--accent-neon)" }} />
                            <span className="font-semibold text-sm">The Trigger Chain</span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">Vendor completes Stage 4 → system fires Stage B on parent form → agency notification → Gantt chart updates → system message in shared channel. The vendor did nothing extra.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                    <span className="text-xs font-sans text-muted uppercase tracking-wider">Stage Mapping Rules</span>
                    <div className="flex flex-col gap-2 mt-2">
                        {[
                            "One-to-one mapping only: a child form stage can only map to one parent stage. Prevents ambiguity about what triggered what.",
                            "Mapping is optional: vendors can keep their internal form completely unmapped and manually mark parent stages. Both modes produce the same output on the parent form.",
                            "Agency can see the mapping exists but cannot see the child form's internal content — only that the trigger fired and when.",
                            "The same mechanism works for Dashboard Forms — published simultaneously to multiple vendor channels, creating one parent record with multiple vendor child forms feeding into it.",
                        ].map((rule, i) => (
                            <div key={i} className="flex gap-3 text-sm text-muted">
                                <span className="font-sans text-xs shrink-0 pt-0.5 text-muted">{String(i + 1).padStart(2, "0")}</span>
                                <p className="leading-relaxed">{rule}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ── NOTIFICATION SYSTEM ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Notification System</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Three tiers. Designed against overload.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        Notification overload is the failure mode of all communication platforms. The notification system is designed around three tiers with different delivery mechanisms and different urgency signals. On event day (Live stage), Tier 1 acknowledgement thresholds compress from 30/60 minutes to 10/20 minutes.
                    </p>
                </div>
                <div className="flex flex-col gap-px border border-border rounded-xl overflow-hidden">
                    {notificationTiers.map((t, i) => (
                        <div key={t.tier} className={`grid grid-cols-1 md:grid-cols-[200px_1fr_1fr_120px] gap-4 p-5 bg-background ${i !== notificationTiers.length - 1 ? "border-b border-border" : ""}`}>
                            <span className="font-semibold text-sm">{t.tier}</span>
                            <p className="text-xs text-muted leading-relaxed"><span className="font-medium text-foreground block mb-1">Trigger</span>{t.trigger}</p>
                            <p className="text-xs text-muted leading-relaxed"><span className="font-medium text-foreground block mb-1">Delivery</span>{t.delivery}</p>
                            <p className="text-xs text-muted leading-relaxed"><span className="font-medium text-foreground block mb-1">Override</span>{t.override}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── PROTOTYPE EMBED ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <SectionLabel>Working Prototype</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">The full agency-side IA, implemented.</h2>
                    <p className="text-muted leading-relaxed max-w-2xl">
                        Built in React with a dark-mode design system. Navigate the full workspace — Overview, Events, Channel Chat, DMs, Broadcast, and all six operational modules with live data.
                    </p>
                </div>

                {/* Outer frame — 16:9, measures width to compute scale */}
                <div
                    ref={protoContainerRef}
                    className="relative w-full rounded-2xl overflow-hidden border-2 border-border"
                    style={{ aspectRatio: "16/9" }}
                >
                    {/* Iframe only renders once scale is known — no unscaled flash */}
                    {protoScale !== null && (
                        <iframe
                            src={PROTOTYPE_URL}
                            title="EventEase Prototype"
                            sandbox="allow-scripts allow-same-origin allow-forms"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: 1920,
                                height: 1080,
                                border: 0,
                                transformOrigin: "top left",
                                transform: `scale(${protoScale})`,
                            }}
                        />
                    )}
                </div>
            </motion.section>

            {/* ── ORIGINAL CONTRIBUTIONS ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Original Contributions</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Five defensible claims.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">Each claim is defensible against the current market and the academic literature on event technology.</p>
                </div>
                <div className="flex flex-col gap-3">
                    {originalContributions.map((c) => (
                        <div key={c.num} className="flex gap-6 p-6 rounded-xl border border-border bg-background">
                            <span className="font-sans text-sm text-muted shrink-0 pt-0.5">{c.num}</span>
                            <div className="flex flex-col gap-1.5">
                                <span className="font-semibold text-sm">{c.title}</span>
                                <p className="text-sm text-muted leading-relaxed">{c.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── REFLECTION ── */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="rounded-2xl border border-border overflow-hidden">
                <div className="flex flex-col gap-8 p-10 md:p-14 bg-background">
                    <SectionLabel>Reflection</SectionLabel>
                    <p className="text-xl md:text-2xl font-semibold tracking-tight leading-snug max-w-3xl">
                        &ldquo;The right response to a communication problem is not to build better communication tools. It is to build the operational structure that makes communication purposeful.&rdquo;
                    </p>
                    <div className="flex flex-col gap-4 border-t border-border pt-6 max-w-2xl">
                        <p className="text-sm text-muted leading-relaxed">
                            A channel without context is just another WhatsApp group. A channel that is event-scoped, role-gated, connected to a task list and a form record and a pinned document set, and archived automatically at the end of its lifecycle — that is an operational instrument. The difference between those two things is the difference between a platform that teams use and a platform they abandon for WhatsApp.
                        </p>
                        <p className="text-sm text-muted leading-relaxed">
                            The most significant design insight from this project is also the simplest: the platform works when it works because it makes the structured version of communication the path of least resistance. That is harder to design than it sounds.
                        </p>
                    </div>
                </div>
            </motion.section>

        </div>
    );
}
