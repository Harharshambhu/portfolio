"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import ScrollMagnifier from "@/components/ScrollMagnifier";

const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const insights = [
    {
        title: "The Trust Gap",
        body: 'Because the purchase happened in a "lower cognitive state," the user didn\'t do the research before buying. After the purchase, they snap to logical thinking. They think, "Wait, Is this purchase legit? Will they actually ship this? Will the quality be as good as advertised?".',
    },
    {
        title: "Transparency",
        body: 'Users find value in negative comments. They look for "Product was a bit small" (Legit) vs. "I never got my money back" (Danger). This is a vital UX insight: Transparency builds more trust than perfection.',
    },
    {
        title: "Search Engine",
        body: 'Instagram\'s failure here is that it acts as the "Dealer" but not the "Insurance". Since the user left the app to buy, they feel "orphaned" by Instagram the moment something goes wrong.',
    },
    {
        title: "The Dopamine Drop",
        body: 'Once the "Buy" button is pressed, the dopamine levels drop. If the brand website doesn\'t provide an immediate "Order Tracked" or "Safe Purchase" reassurance, the user replaces that dopamine with cortisol (stress).',
    },
    {
        title: '"CPA" Blindspot',
        body: "Attributing conversions to Instagram ads becomes challenging when the user journey moves off-platform during the search process.",
    },
    {
        title: "The Re-verification",
        body: "The Re-verification of products from other sources, Screenshot of product and product ads in Instagram, represents a moment where the app's internal search goes wrong.",
    },
];

const buckets = [
    {
        label: "Bucket I",
        title: "Legitimacy",
        body: '"Is this a scam?" Users lack a statutory signal to distinguish legitimate D2C brands from temporary social accounts.',
    },
    {
        label: "Bucket II",
        title: "Customer Service",
        body: '"Will anyone help me?" Fear of "Institutional Abandonment." Users don\'t know if Instagram or the seller handles returns/refunds.',
    },
    {
        label: "Bucket III",
        title: "Browsing",
        body: '"Where is the data?" The app doesn\'t allow for price comparison or deep vetting, leading to the "Screenshot Failure Metric."',
    },
];

const northStarFocus = [
    {
        title: "Legitimacy",
        sub: '(The "Is this a Scam?" Filter)',
        body: 'Solving the 95% drop-off at the profile visit by providing an immediate, visual "Green Flag" of verification.',
    },
    {
        title: "Customer Service",
        sub: '(The "Exit Prevention")',
        body: 'Eliminating/Reducing the need for "Cross-Platform Audits" where users leave to verify brands on Amazon or Google.',
    },
    {
        title: "Browsing",
        sub: '(The "RTO" Shield)',
        body: 'Reducing the "Cognitive Snap-back" and pre-delivery cancellations by anchoring the purchase in a legally accountable framework.',
    },
];

export default function DiscoveryToTransactionPage() {
    return (
        <div className="flex flex-col gap-20">

            {/* ── Cover ── */}
            <section className="flex flex-col gap-6 items-center text-center">
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
                        UX Research · 2024
                    </span>
                    <h1 className="text-6xl md:text-[100px] font-black tracking-tighter leading-none text-center">
                        From Discovery to Transaction
                    </h1>
                    <p className="text-lg text-muted mt-1">
                        Redesigning Instagram&apos;s Trust Architecture for the{" "}
                        <span className="italic" style={{ color: "var(--accent-blue)" }}>Indian D2C Ecosystem</span>
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden w-full max-w-2xl mt-2">
                    {[
                        { label: "Role", value: "UX Researcher" },
                        { label: "Scope", value: "Solo" },
                        { label: "Category", value: "UX Research" },
                        { label: "Year", value: "2024" },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1 p-6 bg-background text-left">
                            <span className="text-xs font-sans text-muted uppercase tracking-wider">{item.label}</span>
                            <span className="text-sm font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Overview ── */}
            <motion.section className="flex flex-col gap-18" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <div className="flex justify-center">
                    <Image
                        src="/projects/discovery-to-transaction/instagram-logo.png"
                        alt="Instagram"
                        width={140} height={140}
                        className="w-40 h-40 object-contain"
                    />
                </div>
                <ScrollMagnifier>
                    <p className="text-base leading-relaxed">
                        <span className="italic font-semibold" style={{ color: "var(--accent-blue)" }}>Instagram</span>{" "}
                        excels at awareness but falters at conversion, creating a massive drop-off for first-time visitors. In the Indian market, the platform suffers from a{" "}
                        <strong>99.6% total leakage rate</strong> at the Top-of-Funnel. While users are highly engaged with visual storytelling, a massive{" "}
                        <strong>&quot;Trust Ceiling&quot;</strong> prevents them from transitioning from a passive, dopamine-seeking state to an active purchase state.
                    </p>
                </ScrollMagnifier>
                <div className="flex flex-col gap-3 border-l-2 pl-5" style={{ borderColor: "var(--accent-blue)" }}>
                    <h3 className="text-[20px] md:text-[25px] font-semibold leading-tight italic">Hypothesis</h3>
                    <ScrollMagnifier>
                        <p className="text-base leading-relaxed font-semibold">
                            &quot;If we institutionalize{" "}
                            <span className="italic" style={{ color: "var(--accent-blue)" }}>a robust verification process</span>{" "}
                            for businesses and provide an instant visual indicator of their status, then we can{" "}
                            <em>collapse</em> the distance between passive discovery and secure checkout.
                        </p>
                    </ScrollMagnifier>
                    <ScrollMagnifier>
                        <p className="text-base leading-relaxed font-semibold">
                            This visual indicator acts as a psychological{" "}
                            <span>&apos;Green Flag,&apos;</span> satisfying the user&apos;s immediate need for legitimacy, converting passive browsers into confident,{" "}
                            <span className="italic" style={{ color: "var(--accent-blue)" }}>first-time purchasers</span>.&quot;
                        </p>
                    </ScrollMagnifier>
                </div>
            </motion.section>

            {/* ── Market Research ── */}
            <motion.section className="flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <SectionLabel>Market Research</SectionLabel>
                <h2 className="text-[28px] md:text-[50px] font-extrabold leading-tight">User Psychology</h2>

                {/* Dopamine vs Intent */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-[20px] md:text-[25px] font-semibold leading-tight">
                        <span style={{ color: "var(--accent-blue)" }}>Dopamine</span> vs. Intent
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <ul className="flex flex-col gap-3 text-base leading-relaxed flex-1">
                            <ScrollMagnifier>
                                <li>
                                    <strong>Instagram Usage <em>(System 1)</em>:</strong>{" "}
                                    Users seek micro-rewards through scrolling and visual discovery in an emotional, passive state.
                                </li>
                            </ScrollMagnifier>
                            <ScrollMagnifier>
                                <li>
                                    <strong>Shopping Activity <em>(System 2)</em>:</strong>{" "}
                                    Purchasing requires a shift to logical, skeptical thinking.
                                </li>
                            </ScrollMagnifier>
                            <ScrollMagnifier>
                                <li>
                                    <strong>The Friction:</strong> Moving from a &quot;System-1&quot; to{" "}
                                    <strong>&quot;System-2&quot;</strong>, causes cognitive snap-back, leading to immediate abandonment.
                                </li>
                            </ScrollMagnifier>
                        </ul>
                        <div className="flex-shrink-0 md:w-64">
                            <Image
                                src="/projects/discovery-to-transaction/system1-vs-system2.png"
                                alt="System 1 (Dopamine, Emotional Passive Discovery) vs System 2 (Intent, Logical Skeptical Shopping)"
                                width={0} height={0} sizes="(max-width: 768px) 100vw, 256px"
                                className="w-full h-auto rounded-lg border border-border"
                            />
                        </div>
                    </div>
                </div>

                {/* The Trust Deficit */}
                <div className="flex flex-col gap-3 mt-4">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0 md:w-48">
                            <Image
                                src="/projects/discovery-to-transaction/post-purchase-anxiety.png"
                                alt="Post-purchase anxiety"
                                width={0} height={0} sizes="(max-width: 768px) 100vw, 192px"
                                className="w-full h-auto rounded-lg border border-border"
                            />
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                            <h3 className="text-[20px] md:text-[25px] font-semibold leading-tight text-right">
                                The <span style={{ color: "var(--accent-blue)" }}>Trust</span> Deficit
                            </h3>
                            <ul className="flex flex-col gap-3 text-base leading-relaxed">
                                <ScrollMagnifier>
                                    <li>
                                        <strong>Pervasive <em>Skepticism</em>:</strong> Indian buyers treat new brands as{" "}
                                        <em>potential scams</em> until proven otherwise, especially in{" "}
                                        <span className="italic" style={{ color: "var(--accent-blue)" }}>unorganized retail</span>.
                                    </li>
                                </ScrollMagnifier>
                                <ScrollMagnifier>
                                    <li>
                                        <strong>The Pre-paid Paradox:</strong> Legitimate small shops often prefer UPI-only payments, but this behavior mimics common fraudulent tactics, triggering &quot;red flags&quot; for users.
                                    </li>
                                </ScrollMagnifier>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ── Data & Funnel Analysis ── */}
            <motion.section className="flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <SectionLabel>Data &amp; Funnel Analysis</SectionLabel>
                <ScrollMagnifier>
                    <p className="text-base leading-relaxed">
                        To justify a strategic pivot, we must look at the hard numbers. The data confirms that Instagram in India, is a high-friction environment for commerce, especially for small businesses.{" "}
                        <span className="font-semibold" style={{ color: "var(--accent-blue)" }}>&quot;Trust&quot;</span> is the biggest factor.
                    </p>
                </ScrollMagnifier>

                <h3 className="text-[20px] md:text-[25px] font-semibold leading-tight">The Top-of-Funnel</h3>
                <ScrollMagnifier>
                    <p className="text-base leading-relaxed">
                        Analysis of industry-standard funnels for{" "}
                        <span className="italic" style={{ color: "var(--accent-blue)" }}>~1,000 initial</span>{" "}
                        <em>first-time comers</em>, reveals <strong>99.6% leakage</strong>. Conversion rate is fundamental broken at 2 specific junctions.
                    </p>
                </ScrollMagnifier>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 border border-border rounded-xl text-base leading-relaxed">
                        <ScrollMagnifier>
                            <strong>The Discovery-to-Profile Gap:</strong> A <strong>95% drop-off</strong> occurs almost immediately, as quick scrolls dominate and users fail to see a reason to stop.
                        </ScrollMagnifier>
                    </div>
                    <div className="p-5 border border-border rounded-xl text-base leading-relaxed">
                        <ScrollMagnifier>
                            <strong>The Checkout-to-Purchase Gap:</strong> An <strong>85% abandonment rate</strong> at the final stage, where the lack of institutional assurance stops a transaction cold.
                        </ScrollMagnifier>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Image
                        src="/projects/discovery-to-transaction/drop-off-funnel.png"
                        alt="Drop-off funnel showing ~95% Discovery-to-Profile Gap down to 0.5–0.3% Successful Sales, with 25-40% post-purchase RTO"
                        width={0} height={0} sizes="(max-width: 768px) 100vw, 520px"
                        className="w-full max-w-lg h-auto rounded-xl border border-border"
                    />
                </div>

                <h3 className="text-[20px] md:text-[25px] font-semibold leading-tight text-center mt-4">
                    Trust Dividend: <em style={{ color: "var(--accent-blue)" }}>India v/s USA</em>
                </h3>
                <div className="grid md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-4 flex flex-col gap-8">
                        <ScrollMagnifier>
                            <p className="text-base leading-relaxed">
                                The following data justifies why a <strong>Global</strong> verification strategy—which works efficiently in the US—<em>fails</em> to capture the full potential of the Indian market.
                            </p>
                        </ScrollMagnifier>
                        <ScrollMagnifier>
                            <p className="text-base leading-relaxed">
                                While a blue badge lifts US conversion to <strong>3.4%</strong>, it only pushes Indian conversion to <strong>0.4-1.0%</strong>. This suggests that Indian users require a better &quot;tier&quot; of proof to make purchase to feel as safe as a US consumer.
                            </p>
                        </ScrollMagnifier>
                    </div>
                    <div className="md:col-span-6">
                        <Image
                            src="/projects/discovery-to-transaction/us-india-comparison.png"
                            alt="US vs India verified drop-off comparison: Bio Click 75-82% vs 82-88%, Browse 35-45% vs 45-55%, Add-to-Cart 40-50% vs 45-55%, Purchase 65-75% vs 75-85%, Remaining 2.0-3.4% vs 0.4-1.5%"
                            width={1200} height={800} sizes="(max-width: 768px) 100vw, 800px"
                            className="w-full h-auto rounded-xl border border-border"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <ScrollMagnifier>
                            <p className="text-base italic" style={{ color: "var(--accent-blue)" }}>
                                USA business has <strong>2-3 X</strong> Conversion %, than Indian business.
                            </p>
                        </ScrollMagnifier>
                    </div>
                </div>
            </motion.section>

            {/* ── User Personas ── */}
            <motion.section className="flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <SectionLabel>User Personas</SectionLabel>
                <ScrollMagnifier>
                    <p className="text-base leading-relaxed">
                        To bridge the <strong>Trust Gap</strong>, we must understand the specific psychological blockers of our three core users.
                    </p>
                </ScrollMagnifier>

                {/* Impulsive Buyer */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[20px] md:text-[25px] font-semibold leading-tight">The Impulsive Buyer</h3>
                    <ScrollMagnifier>
                        <p className="text-base italic text-muted">&quot;I wasn&apos;t looking for this, but I need it to make my day better.&quot;</p>
                    </ScrollMagnifier>
                    <div className="grid md:grid-cols-2 gap-4 text-base leading-relaxed">
                        <div className="p-4 border border-border rounded-xl">
                            <ScrollMagnifier>
                                <strong>Operating State: Low-Cognitive (System 1).</strong> Driven by <em>&quot;Dead Time&quot;</em> (commuting/boredom) and emotional triggers.
                            </ScrollMagnifier>
                        </div>
                        <div className="p-4 border border-border rounded-xl">
                            <ScrollMagnifier>
                                Operates on speed; needs <strong>Instant Accountability</strong> to prevent post-purchase <span className="italic" style={{ color: "var(--accent-blue)" }}>&quot;Risk-Anxiety&quot;</span> and cancellations.
                            </ScrollMagnifier>
                        </div>
                    </div>
                    <Image
                        src="/projects/discovery-to-transaction/persona-reyansh.png"
                        alt="Reyansh persona card — Impulsive Buyer, Age 22, with goals and frustrations"
                        width={0} height={0} sizes="100vw"
                        className="w-full max-w-2xl mx-auto h-auto rounded-xl border border-border"
                    />
                </div>

                {/* Exploratory Buyer */}
                <div className="flex flex-col gap-4 mt-4">
                    <h3 className="text-[20px] md:text-[25px] font-semibold leading-tight">The Exploratory Buyer</h3>
                    <ScrollMagnifier>
                        <p className="text-base italic text-muted">&quot;I love hidden gems, but I refuse to be a victim of a scam.&quot;</p>
                    </ScrollMagnifier>
                    <div className="grid md:grid-cols-2 gap-4 text-base leading-relaxed">
                        <div className="p-4 border border-border rounded-xl">
                            <ScrollMagnifier>
                                <strong>Operating State:</strong> Actively seeks out niche, authentic brands and values transparency over polished marketing.
                            </ScrollMagnifier>
                        </div>
                        <div className="p-4 border border-border rounded-xl">
                            <ScrollMagnifier>
                                Struggles to validate the legitimacy of unknown merchants without independent, external trust signals.
                            </ScrollMagnifier>
                        </div>
                    </div>
                    <Image
                        src="/projects/discovery-to-transaction/persona-aarav.png"
                        alt="Aarav persona card — Passionate Explorer, Age 28, with goals and frustrations"
                        width={0} height={0} sizes="100vw"
                        className="w-full max-w-2xl mx-auto h-auto rounded-xl border border-border"
                    />
                </div>

                {/* Planned Buyer */}
                <div className="flex flex-col gap-4 mt-4">
                    <h3 className="text-[20px] md:text-[25px] font-semibold leading-tight">The Planned Buyer</h3>
                    <ScrollMagnifier>
                        <p className="text-base italic text-muted">&quot;I use Instagram as visual search engine for new products, but I buy where I&apos;m protected.&quot;</p>
                    </ScrollMagnifier>
                    <div className="grid md:grid-cols-2 gap-4 text-base leading-relaxed">
                        <div className="p-4 border border-border rounded-xl">
                            <ScrollMagnifier>
                                <strong>Operating State:</strong> Enters the app with specific intent and performs <strong>&quot;Cross-Platform Audits&quot;</strong> to compare prices and policies.
                            </ScrollMagnifier>
                        </div>
                        <div className="p-4 border border-border rounded-xl">
                            <ScrollMagnifier>
                                Frequently exits the app via <strong>&quot;Screenshots&quot;</strong> to find the same product on high-trust marketplaces like Amazon.
                            </ScrollMagnifier>
                        </div>
                    </div>
                    <Image
                        src="/projects/discovery-to-transaction/persona-arjun.png"
                        alt="Arjun Mehta persona card — Planned Shopper, Age 31, with goals and frustrations"
                        width={0} height={0} sizes="100vw"
                        className="w-full max-w-2xl mx-auto h-auto rounded-xl border border-border"
                    />
                </div>
            </motion.section>

            {/* ── Journey Map ── */}
            <motion.section className="flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <SectionLabel>Personas&apos; Journey Map</SectionLabel>
                <div className="overflow-x-auto rounded-xl border border-border">
                    <Image
                        src="/projects/discovery-to-transaction/journey-mapping.png"
                        alt="Full journey map across Impulsive Buyer, Passionate Explorer, and Planned Shopper personas from START to END"
                        width={1800} height={800}
                        className="h-auto min-w-[720px] w-full"
                    />
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-base leading-relaxed">
                    <div className="p-4 border border-border rounded-xl">
                        <ScrollMagnifier>
                            <strong>The Emotional Peak (Discovery):</strong> All personas begin in a high-dopamine, &quot;System 1&quot; state during initial discovery, where emotional engagement is at its maximum.
                        </ScrollMagnifier>
                    </div>
                    <div className="p-4 border border-border rounded-xl">
                        <ScrollMagnifier>
                            <strong>The Validation Loop:</strong> Planned Shoppers and Exploratory Buyers frequently exit platform, and go to web, shows where Instagram fails to browse products within the app.
                        </ScrollMagnifier>
                    </div>
                    <div className="p-4 border border-border rounded-xl">
                        <ScrollMagnifier>
                            <strong>Post-Purchase Anxiety:</strong> For the Impulsive Buyer, after &quot;Cognitive-snap-back&quot;, user falls in second guessing decision, and might end up canceling their order.
                        </ScrollMagnifier>
                    </div>
                </div>
            </motion.section>

            {/* ── Key Insights ── */}
            <motion.section className="flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <SectionLabel>
                    Key <span style={{ color: "var(--accent-blue)" }}>Insights</span> from{" "}
                    <span style={{ color: "var(--accent-blue)" }}>Personas</span>&apos;
                </SectionLabel>
                <div className="grid md:grid-cols-3 gap-4">
                    {insights.map((ins) => (
                        <div
                            key={ins.title}
                            className="flex flex-col gap-2 p-5 rounded-xl text-base leading-relaxed"
                            style={{ backgroundColor: "#fef9c3", color: "#1a1a1a" }}
                        >
                            <ScrollMagnifier>
                                <span className="font-bold text-base block">{ins.title}</span>
                                <p className="mt-2">{ins.body}</p>
                            </ScrollMagnifier>
                            <span className="text-xs mt-auto pt-3" style={{ color: "#888" }}>Anirudh</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── Analyzing the Problem ── */}
            <motion.section className="flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <SectionLabel>Analyzing the Problem</SectionLabel>
                <div className="flex justify-center">
                    <Image
                        src="/projects/discovery-to-transaction/problem-tree.png"
                        alt="Problem tree: 99.6% ToFu Leakage, Cognitive State Mismatch, Trust Ceiling, High-Context Market Skepticism"
                        width={0} height={0} sizes="(max-width: 768px) 100vw, 640px"
                        className="w-full max-w-xl h-auto"
                    />
                </div>
                <ScrollMagnifier>
                    <p className="text-base leading-relaxed">
                        To move from identifying &quot;leaks&quot; to building &quot;plumbing,&quot; we must categorize the friction points into actionable problem buckets. This ensures our solutions address specific user anxieties rather than just aesthetic gaps.
                    </p>
                </ScrollMagnifier>
                <div className="grid md:grid-cols-3 gap-4">
                    {buckets.map((b) => (
                        <div
                            key={b.label}
                            className="flex flex-col gap-2 p-5 rounded-xl text-base leading-relaxed"
                            style={{ backgroundColor: "#fef9c3", color: "#1a1a1a" }}
                        >
                            <ScrollMagnifier>
                                <span className="font-black text-base block">{b.label}</span>
                                <span className="font-bold block mt-1">{b.title}</span>
                                <p className="mt-2">{b.body}</p>
                            </ScrollMagnifier>
                            <span className="text-xs mt-auto pt-3" style={{ color: "#888" }}>Anirudh</span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── The North Star ── */}
            <motion.section className="flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <SectionLabel>
                    The <span style={{ color: "var(--accent-blue)" }}>North</span> Star
                </SectionLabel>
                <ScrollMagnifier>
                    <blockquote className="text-base leading-relaxed italic border-l-2 pl-5" style={{ borderColor: "var(--accent-blue)" }}>
                        &quot;How might we <strong>institutionalize <em>statutory accountability</em></strong> for Instagram businesses in India to{" "}
                        <strong>bridge the &apos;Trust Gap,&apos;</strong> thereby assuring the user and collapsing the distance between{" "}
                        <strong>passive discovery and secure transaction</strong>—while preventing users from exiting the app to <strong>verify</strong> brands elsewhere?&quot;
                    </blockquote>
                </ScrollMagnifier>
                <div className="grid md:grid-cols-3 gap-4 text-base leading-relaxed">
                    {northStarFocus.map((f) => (
                        <div key={f.title} className="flex flex-col gap-1 p-5 border border-border rounded-xl">
                            <ScrollMagnifier>
                                <span className="font-semibold text-base block">{f.title}</span>
                                <span className="text-muted text-xs block">{f.sub}</span>
                                <p className="mt-2"><strong>Focus:</strong> {f.body}</p>
                            </ScrollMagnifier>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── Proposed Solution ── */}
            <motion.section className="flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <SectionLabel>Proposed Solution</SectionLabel>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex flex-col gap-4 flex-1 text-base leading-relaxed">
                        <ScrollMagnifier>
                            <p>
                                The current <em>&quot;Universal Blue Tag&quot;</em> creates a <strong>Categorization Failure</strong>. By grouping influencers, independent sellers, and established businesses under one badge, users apply a single, skeptical approach to all.
                            </p>
                        </ScrollMagnifier>
                        <ScrollMagnifier>
                            <p>
                                We introduce a distinct <strong>Shop Tag</strong> that is functionally separate from the influencer <em>Blue Tick</em>. This immediately signals a shift from &quot;Social Popularity&quot; to &quot;Professional Accountability&quot;.
                            </p>
                        </ScrollMagnifier>
                    </div>
                    <div className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto">
                        <Image
                            src="/projects/discovery-to-transaction/solution-badge.png"
                            alt="Shop Tag — verified seller badge"
                            width={120} height={120}
                            className="w-24 h-24 object-contain"
                        />
                    </div>
                </div>

                {/* Mockups */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-border rounded-xl overflow-hidden">
                        <Image
                            src="/projects/discovery-to-transaction/mockup-post.png"
                            alt="Instagram feed post with helloWORLD verified brand"
                            width={0} height={0} sizes="(max-width: 768px) 100vw, 50vw"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="border border-border rounded-xl overflow-hidden">
                        <Image
                            src="/projects/discovery-to-transaction/mockup-profile.png"
                            alt="Instagram brand profile with HW verified Shop Tag badge"
                            width={0} height={0} sizes="(max-width: 768px) 100vw, 50vw"
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                <ScrollMagnifier>
                    <p className="text-base leading-relaxed">
                        The current verification system is insufficient for the trust-heavy Indian e-commerce market. We propose an enhanced verification workflow that incorporates:
                    </p>
                </ScrollMagnifier>
                <ul className="flex flex-col gap-4 text-base leading-relaxed">
                    <ScrollMagnifier>
                        <li>
                            <strong>Regulatory Compliance:</strong> Mandatory <strong>Udyam</strong> (<em>MSME</em>) <strong>registration</strong>, Shop &amp; Establishment licenses, GSTIN certification<em>(if)</em>, and FSSAI{" "}
                            <span style={{ color: "var(--accent-blue)" }}>(for food &amp; health category)</span>.
                        </li>
                    </ScrollMagnifier>
                    <ScrollMagnifier>
                        <li>
                            <strong>Financial &amp; Legal Proof:</strong> Business PAN and 3–6 months of bank statement history<em>(Similar to Tiktok Shop)</em>.
                        </li>
                    </ScrollMagnifier>
                    <ScrollMagnifier>
                        <li>
                            <strong>Social Trust Signals:</strong> Implementation of &apos;Response Time Badges&apos;, similar to Facebook, to quantify brand engagement and provide high-visibility social proof to prospective buyers.
                        </li>
                    </ScrollMagnifier>
                </ul>
            </motion.section>

            {/* ── Success Metrics ── */}
            <motion.section className="flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <SectionLabel>Success Metrics</SectionLabel>

                <h3 className="text-[20px] md:text-[25px] font-semibold leading-tight">North Star Metric</h3>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 md:w-48">
                        <Image
                            src="/projects/discovery-to-transaction/conversion-funnel.png"
                            alt="Conversion funnel showing improved throughput"
                            width={0} height={0} sizes="(max-width: 768px) 100vw, 192px"
                            className="w-full h-auto rounded-xl border border-border"
                        />
                    </div>
                    <div className="flex flex-col gap-2 flex-1 text-base leading-relaxed">
                        <ScrollMagnifier>
                            <p>
                                <strong>Checkout Conversion Rate (CVR):</strong> The percentage of users who progress from <strong>Profile Visit</strong> to <strong>Successful Transaction</strong>. Success is defined by bridging the <strong>2.4% gap</strong> between the US and Indian conversion benchmarks.
                            </p>
                        </ScrollMagnifier>
                    </div>
                </div>

                <h3 className="text-[20px] md:text-[25px] font-semibold leading-tight italic">Secondary Performance Metrics</h3>
                <div className="grid md:grid-cols-2 gap-4 text-base leading-relaxed">
                    <div className="p-5 border border-border rounded-xl">
                        <ScrollMagnifier>
                            <strong>In-App Retention Rate:</strong> A decrease in the <strong>&quot;Screenshot Exit&quot;</strong> behavior, where users leave the platform to perform external audits on marketplaces like Amazon or Google.
                        </ScrollMagnifier>
                    </div>
                    <div className="p-5 border border-border rounded-xl">
                        <ScrollMagnifier>
                            <strong>Return to Origin (RTO) Rate:</strong> A reduction in pre-delivery cancellations. Statutory accountability reduces <strong>Post-Purchase Anxiety</strong>, leading to higher commitment to the order.
                        </ScrollMagnifier>
                    </div>
                </div>
            </motion.section>

            {/* ── Trade-Offs ── */}
            <motion.section className="flex flex-col gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
                <SectionLabel>Trade-Offs</SectionLabel>
                <ScrollMagnifier>
                    <p className="text-base leading-relaxed italic">
                        This case study provided an invaluable opportunity to explore the complex intersection of consumer psychology, conversion optimization, and the critical role of trust in the Indian social commerce landscape.
                    </p>
                </ScrollMagnifier>
                <p className="text-base text-muted">
                    <strong>Case Study By:</strong>{" "}
                    <span style={{ color: "var(--accent-blue)" }}>Anirudh Singh</span>
                </p>
            </motion.section>

        </div>
    );
}
