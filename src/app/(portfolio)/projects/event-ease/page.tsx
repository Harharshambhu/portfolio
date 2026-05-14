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

const operatorTypes = [
    {
        role: "Platform Manager",
        desc: "Sets up every event, builds channel clusters, invites vendors, creates parent forms, reviews dashboards, and sends broadcasts. Sees everything across all events simultaneously.",
        tag: "Global Access",
        tagColor: "var(--accent-blue)"
    },
    {
        role: "Event Manager",
        desc: "Owns a specific event end-to-end. Creates channels, assigns tasks, manages vendors, and tracks every stage of the run-of-show for their events.",
        tag: "Event Owner",
        tagColor: "#10b981"
    },
    {
        role: "Event Worker",
        desc: "Executes in their designated area. Sees the channels and tasks relevant to their role — without the noise of the wider organisation or other events.",
        tag: "Operational",
        tagColor: "#f59e0b"
    },
    {
        role: "Executive",
        desc: "Sees event portfolio status and key flags — without access to operational detail. A read-only view calibrated for oversight, not execution.",
        tag: "ReadOnly",
        tagColor: "#6366f1"
    },
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

const stakeholderVoices = [
    {
        quote: "We run three events a month. Everything lives in my WhatsApp. When I leave the agency, the entire operational history of the last five years leaves with me.",
        role: "Head of Operations",
    },
    {
        quote: "I send the same update to the AV vendor on WhatsApp, then paste it into the ops sheet, then email the client. Three times. Every time something changes.",
        role: "Event Manager",
    },
    {
        quote: "On event day I am in 40 WhatsApp groups. I have no way to know which ones need a response right now and which ones are just noise.",
        role: "Senior Operations Coordinator",
    },
    {
        quote: "The vendor confirmed the load-in time with me on call. I updated my sheet. Nobody told the site manager. The truck arrived and there was nobody to receive it.",
        role: "Logistics Manager",
    },
];

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

const structuralGaps = [
    "No single source of truth for event briefs — conflicting versions live across email, WhatsApp, and spreadsheets simultaneously.",
    "Institutional memory is tied to individuals, not the organisation — when a team member leaves, operational history leaves with them.",
    "Structural double-entry between vendor-side and agency-side records — the same information entered twice, in two places, by two people.",
    "No event-scoped channel separation — conversations from different events collide in a single shared workspace.",
    "No purpose-built vendor coordination layer — external parties managed entirely outside any structured system.",
    "Communication is architecturally separated from operations — teams use one tool for records, WhatsApp for actual coordination.",
    "Notification collapse on event day — all messages arrive with equal urgency, making critical ones impossible to distinguish.",
    "No tunnelled view design — vendor portals communicate restriction, not purposeful and complete access.",
    "No purpose-built platform for the Indian B2B agency market — global tools are built for Western buyers, Indian tools cover only ticketing.",
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

const accessRules = [
    { label: "CHANNELS", isHeader: true },
    { area: "#company-general", access: "Platform Mgr · Event Mgr · Event Worker — Full  ·  Executive — View  ·  Vendor, Client — None" },
    { area: "#dept-[name]", access: "Platform Mgr — All depts  ·  Event Mgr, Event Worker — Own dept  ·  Executive, Vendor, Client — None" },
    { area: "#[event]-general / ops", access: "Platform Mgr · Event Mgr — Full  ·  Event Worker — Assigned  ·  Executive, Vendor, Client — None" },
    { area: "#[event]-vendor-[x]", access: "Platform Mgr · Event Mgr · Event Worker — Full  ·  Vendor — Own channel only  ·  Executive, Client — None" },
    { area: "#[event]-client-[x]", access: "Platform Mgr · Event Mgr · Event Worker — Full  ·  Client — Own channel only  ·  Executive, Vendor — None" },
    { label: "MODULES", isHeader: true },
    { area: "Guest lists", access: "Platform Mgr · Event Mgr — Full  ·  Event Worker — View  ·  Executive — Summary  ·  Vendor, Client — None" },
    { area: "Credentials", access: "Platform Mgr · Event Mgr · Event Worker — Full  ·  Executive, Vendor, Client — None" },
    { area: "Assets", access: "Platform Mgr · Event Mgr · Event Worker — Full  ·  Vendor — Assigned assets  ·  Executive, Client — None" },
    { area: "Forms + Tasks", access: "Platform Mgr · Event Mgr — Create + manage  ·  Event Worker · Vendor — Fill assigned  ·  Executive — Review only  ·  Client — None" },
    { area: "Financials", access: "Platform Mgr — Full  ·  Event Mgr — View  ·  Executive — Summary  ·  Event Worker, Vendor, Client — None" },
    { area: "Dashboard / portfolio", access: "Platform Mgr — All events  ·  Event Mgr · Event Worker — Own events  ·  Executive — Summary  ·  Vendor, Client — None" },
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
            { name: "Export", detail: "Download final guest list as CSV or PDF for venue ops, security, and administrative reconciliation." },
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
        desc: "The most complex module — and the one that makes EventEase fundamentally different from all existing platforms. Forms are not data collection tools bolted onto a project management core. They are the connective tissue between vendor internal work and agency milestone tracking. A vendor completes their child form stage; the system automatically fires the corresponding parent form stage on the agency side. One action. One place. Both parties updated.",
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
        desc: "Not a module added to the platform — the layer everything else surfaces through. Every operational object (task, form, document) is accessed from within a channel. Communication is not a feature of EventEase. EventEase is a communication platform with operational depth.",
        tabs: [
            { name: "Channel Chat", detail: "Three-column layout: sidebar, chat, right panel. Right panel tabs: Overview, Members, Pinned Docs, Forms, Tasks. Messages support rich text, file attachments, poll cards, and system notices. Channels are event-scoped — there is no global feed." },
            { name: "Broadcast", detail: "One-to-many announcements with optional acknowledgement requirement. Sent tab shows real-time ack status per recipient. Unacknowledged after 30 min: Tier 1 reminder to recipient. After 60 min: sender notified of non-acknowledgers by name. On event day: thresholds compress to 10/20 min." },
            { name: "Direct Messages", detail: "Filterable by Internal / External / Clients / Vendors. Every contact row shows role, company, and event — solving the Slack identity problem where DMs from unfamiliar names have no context." },
        ],
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

            {/* 01 — HERO */}
            <motion.section initial="hidden" animate="visible" variants={fade} className="flex flex-col gap-6 items-center text-center">
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
                        UX &amp; Product Design · B2B SaaS · 2024–2026
                    </span>
                    <h1 className="text-6xl md:text-[100px] font-bold tracking-tighter leading-none">EventEase</h1>
                    <p className="text-lg text-muted max-w-xl">A communication-first operations platform for Indian event agencies.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden mt-4 w-full max-w-2xl">
                    {[
                        { label: "Role", value: "UX & Product Designer" },
                        { label: "Scope", value: "Solo" },
                        { label: "Platform", value: "B2B SaaS — Web-based" },
                        { label: "Year", value: "2024–2026" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1 p-5 bg-background">
                            <span className="text-xs font-sans text-muted uppercase tracking-wider">{item.label}</span>
                            <span className="text-sm font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* HERO VIDEO */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full rounded-2xl border-4 bg-background p-1.1 -mt-12 -mb-12"
                style={{ borderColor: "#1d1d1d" }}
            >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-foreground">
                    <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover">
                        <source src="/projects/EventEase/EE.webm" type="video/webm" />
                    </video>
                </div>
            </motion.div>

            {/* 02 — WHAT IS EVENTEASE? */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-4">
                <h2 className="text-5xl font-semibold tracking-tight">What is EventEase?</h2>
                <p className="max-w-2xl text-muted leading-relaxed">
                    EventEase is an operational platform built for Indian event management agencies. It replaces the WhatsApp groups, email chains, and spreadsheets that currently hold a live event&apos;s information — with one communication-first workspace where everything is event-scoped, role-gated, and permanently findable. It is not a database you report into after coordination happens. It is the place coordination happens.
                </p>
            </motion.section>

            {/* 03 — WHO USES IT? */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <SectionLabel>Who uses it?</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Four operator types. One platform.</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {operatorTypes.map((op) => (
                        <div key={op.role} className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-background">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm">{op.role}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full font-medium border border-border" style={{ color: op.tagColor }}>{op.tag}</span>
                            </div>
                            <p className="text-sm text-muted leading-relaxed">{op.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* 04 — THE PROBLEM */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>The Problem</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">The operational backbone of India&apos;s event industry is WhatsApp.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        India&apos;s MICE sector generated <span className="text-foreground font-medium">₹4,16,217 crore in 2024</span> and is projected to reach ₹8,73,559 crore by 2030. Yet most Indian event agencies coordinate through WhatsApp groups, email chains, and spreadsheets — with no purpose-built operational software. The failures are not edge cases. They happen at the moments that matter most.
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

            {/* 05 — STAKEHOLDER VOICES */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <SectionLabel>Stakeholder Interviews</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Four people. Four different insights.</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stakeholderVoices.map((v, i) => (
                        <div key={i} className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-background">
                            <p className="text-sm leading-relaxed font-medium">&ldquo;{v.quote}&rdquo;</p>
                            <div className="border-t border-border pt-4">
                                <span className="text-xs font-semibold text-foreground">{v.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* 06 — RESEARCH */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-16">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Research</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Four methods. One conclusion.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        Research followed four methods in deliberate sequence. Stakeholder mapping established who was in the network and what each party needed. Ecosystem mapping traced how information actually moved between them. A process map revealed where coordination failures occurred in practice. Competitive analysis confirmed no existing platform had addressed these failures. The gap closure strategy translated every structural failure into a direct design response.
                    </p>
                </div>

                {/* Stakeholder Map */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <SectionLabel>Stakeholder Map</SectionLabel>
                        <h2 className="text-5xl font-semibold tracking-tight">Nine primary categories. Twelve agency roles.</h2>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            Nine primary stakeholder categories were identified across the Indian event ecosystem. Within the agency team alone, twelve distinct management roles were mapped. The insight: the agency is not a service provider. It is the <span className="text-foreground font-medium">information router</span> for an entire temporary multi-organisational network.
                        </p>
                    </div>
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                        <Image src="/projects/EventEase/STakeholderMap.png" alt="Stakeholder map — all primary actors and management roles in the Indian event agency ecosystem" fill className="object-contain p-4" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {ecosystemStakeholders.map((s) => (
                            <div key={s.role} className="flex flex-col gap-2 p-5 rounded-xl border border-border bg-background">
                                <span className="font-semibold text-sm" style={{ color: "var(--accent-blue)" }}>{s.role}</span>
                                <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ecosystem Mapping */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <SectionLabel>Ecosystem Mapping</SectionLabel>
                        <h2 className="text-5xl font-semibold tracking-tight">Twelve simultaneous information flows.</h2>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            A full ecosystem map traced four types of flows — goods, services, information, and monetary — between the event management agency and its surrounding network. Twelve distinct simultaneous information flows were identified. When information flow breaks, the failure is always a communication breakdown — not a process failure, not a people failure.
                        </p>
                    </div>
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                        <Image src="/projects/EventEase/EcosystemMapping.png" alt="Ecosystem map — four flow types across all stakeholder relationships" fill className="object-contain p-4" />
                    </div>
                </div>

                {/* Event Process Map */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <SectionLabel>Event Process Map</SectionLabel>
                        <h2 className="text-5xl font-semibold tracking-tight">Five parallel workstreams. One WhatsApp group.</h2>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            A detailed process map traced the full event lifecycle across parallel swim lanes: corporate client, agency teams (Client Servicing, Concept, Creative, Production, Operations), sponsors, vendors, technology platforms, government bodies, and the venue. An event agency manages at minimum five distinct parallel workstreams simultaneously — with no structural way to know which messages require action, which are informational, and which are resolved.
                        </p>
                    </div>
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                        <Image src="/projects/EventEase/Event-Process-Map.png" alt="Event process map — full lifecycle across all parallel stakeholder swim lanes" fill className="object-contain p-3" />
                    </div>
                </div>

                {/* Competitive Analysis */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <SectionLabel>Competitive Analysis</SectionLabel>
                        <h2 className="text-5xl font-semibold tracking-tight">No platform inverts the model.</h2>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            Seven existing platforms were analysed. Lennd is the closest competitor, describing itself as &ldquo;a communications tool at its core,&rdquo; but its model is portal-based — each vendor gets a website, not a channel. No existing platform makes communication the primary unit of organisation.
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
                </div>

                {/* Gap Closure Strategy */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <SectionLabel>Gap Closure Strategy</SectionLabel>
                        <h2 className="text-5xl font-semibold tracking-tight">Nine market failures. Nine design responses.</h2>
                        <p className="max-w-2xl text-muted leading-relaxed">
                            Nine structural failures in the current market were each matched with a corresponding platform design response. Every EventEase design decision traces back to one of these nine gaps.
                        </p>
                    </div>

                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                        <Image src="/projects/EventEase/GapClosure-Strategy-Map.png" alt="Gap closure strategy — nine market failures and platform responses" fill className="object-contain p-3" />
                    </div>
                </div>
            </motion.section>
            {/* 11 — PROTOTYPE */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Working Prototype</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">The full agency-side IA, implemented.</h2>
                    <p className="text-muted leading-relaxed max-w-2xl">
                        Built in React with a dark-mode design system. The prototype implements the complete agency-side information architecture — six operational modules with live mock data, the full channel workspace (Overview, Events, Channel Chat, DMs, Broadcast), and all role-specific views. Navigate the full system: create an event, open its dashboard, enter a channel, assign a task, submit a form stage.
                    </p>

                </div>

                <div
                    ref={protoContainerRef}
                    className="relative w-full rounded-2xl overflow-hidden border-2 border-border"
                    style={{ aspectRatio: "16/9" }}
                >
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

            {/* 07 — DESIGN THESIS */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Design Thesis</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Communication is the operating system.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        The solution is a communication-first event management platform — one where every operational object (task, form, document, approval) is accessed from within a channel, not the other way around. The research produced a single clear principle that governed every subsequent design decision: if a team member has to leave the platform to coordinate, the platform has failed.
                    </p>
                </div>
                <div className="p-8 md:p-6 rounded-2xl border border-border bg-background">
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

            {/* 08 — INFORMATION ARCHITECTURE */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Information Architecture</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Three layers. One coherent system.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        The platform&apos;s IA is organised in three layers. Global navigation gives access to three destinations: <span className="text-foreground font-medium">Overview</span> (all active events and activity feed), <span className="text-foreground font-medium">Events</span> (the full event directory and individual event dashboards), and <span className="text-foreground font-medium">DMs</span> (direct messages and group conversations). Within each event, workspace channels are organised in three structural zones. Operational modules are accessed from the Event Dashboard. Each layer maps to exactly one zone of the channel hierarchy — learnable, exhaustive, non-overlapping.
                    </p>
                </div>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background">
                    <Image src="/projects/EventEase/Information-architecture.png" alt="EventEase — full platform information architecture" fill className="object-contain p-4" />
                </div>

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
            </motion.section>

            {/* 09 — SYSTEM ARCHITECTURE */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <SectionLabel>System Architecture</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Who can see what. Precisely.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        A vendor scanned top-to-bottom sees exactly what they experience — their own channel, their assigned assets, and the forms they need to fill. Everything else is not visible. This is the tunnelled view made concrete.
                    </p>
                </div>



                <div className="flex flex-col gap-4 mt-2">
                    <span className="text-xs font-sans text-muted uppercase tracking-wider">Module Brainstorm Session</span>
                    <p className="text-sm text-muted leading-relaxed max-w-2xl">
                        An initial brainstorm produced 200 tools across 17 modules and 6 clusters. These were reduced to 47 buildable components by identifying seven platform engines powering the majority: Communication, Forms, Task, Permission, Data Sync, Notification, and Analytics. Everything else is a configuration of an engine applied to a specific operational domain.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                <Image src="/projects/EventEase/ModuleMapping.png" alt="Module mapping" fill className="object-contain p-3" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-sans text-muted uppercase tracking-wider">Dashboard Module Map</span>
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-background">
                                <Image src="/projects/EventEase/Dashboard-Module-Map.png" alt="Dashboard module map" fill className="object-contain p-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* 10 — MODULE DEEP DIVES */}
            {modules.map((mod) => (
                <motion.section key={mod.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <SectionLabel>Module — {mod.title}</SectionLabel>
                        <h2 className="text-4xl font-semibold tracking-tight">{mod.tagline}</h2>
                        <p className="max-w-2xl text-muted leading-relaxed">{mod.desc}</p>
                    </div>

                    {mod.id === "credentials" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
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
                            <div className="flex items-center">
                                <Image
                                    src="/projects/EventEase/screenshots/CredentialModuleWidget.png"
                                    alt="Credential Module Widget"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    ) : mod.id === "guestlists" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="flex items-center order-2 md:order-1">
                                <Image
                                    src="/projects/EventEase/screenshots/Guestslist.png"
                                    alt="Guest List Module"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="flex flex-col gap-3 order-1 md:order-2">
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
                        </div>
                    ) : mod.id === "assets" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
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
                            <div className="flex items-center">
                                <Image
                                    src="/projects/EventEase/screenshots/Assets.png"
                                    alt="Assets Module"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    ) : mod.id === "forms" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="flex flex-col gap-4 order-2 md:order-1">
                                <Image
                                    src="/projects/EventEase/screenshots/TAsksProgress.png"
                                    alt="Tasks Progress"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto"
                                />
                                <Image
                                    src="/projects/EventEase/screenshots/Form&taskModulewidget.png"
                                    alt="Forms & Tasks Module Widget"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="flex flex-col gap-3 order-1 md:order-2">
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
                        </div>
                    ) : mod.id === "comms" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
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
                            <div className="flex flex-col gap-4">
                                <Image
                                    src="/projects/EventEase/screenshots/Communication.png"
                                    alt="Communication Module"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    ) : (
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
                    )}
                </motion.section>
            ))}


            {/* 12 — CLOSING QUOTE */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="px-2">
                <p className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug max-w-2xl text-muted">
                    &ldquo;A channel without context is just another WhatsApp group.&rdquo;
                </p>
            </motion.div>

        </div>
    );
}
