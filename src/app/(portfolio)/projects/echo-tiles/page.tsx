"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";

const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const storyboards = [
    "/projects/Echo-tiles/storyboarding/Black Neon Green Neon Pink Trendy Illustrative Creative Presentation (1) 1.webp",
    "/projects/Echo-tiles/storyboarding/Black Neon Green Neon Pink Trendy Illustrative Creative Presentation (1) 2.webp",
    "/projects/Echo-tiles/storyboarding/Black Neon Green Neon Pink Trendy Illustrative Creative Presentation (2)-1.webp",
    "/projects/Echo-tiles/storyboarding/Black Neon Green Neon Pink Trendy Illustrative Creative Presentation (2)-2.webp",
    "/projects/Echo-tiles/storyboarding/Black Neon Green Neon Pink Trendy Illustrative Creative Presentation (2)-3.webp",
    "/projects/Echo-tiles/storyboarding/Black Neon Green Neon Pink Trendy Illustrative Creative Presentation (2)-4.webp",
];

export default function EchoTilesProjectPage() {
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
                    <span className="text-sm font-semibold text-accent-blue uppercase tracking-widest">Game Design · Unity VR · 2025</span>
                    <h1 className="text-6xl md:text-[120px] font-bold tracking-tighter leading-none">Echo Tiles</h1>
                </div>
                <p className="max-w-2xl text-xl leading-relaxed text-muted">
                    Minesweeper reimagined as a spatial puzzle you stand inside — where numbers become sound, and the grid becomes a room.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden w-full max-w-2xl mt-2">
                    {[
                        { label: "Role", value: "Game Designer" },
                        { label: "Scope", value: "Solo" },
                        { label: "Platform", value: "Unity VR" },
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
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border"
            >
                <Image
                    src="/projects/Echo-tiles/image.webp"
                    alt="Player silhouette standing inside Echo Tiles' 3D hollow cube environment"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* ── AT A GLANCE ── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border rounded-xl overflow-hidden"
            >
                {[
                    { label: "Environment", value: "3D Hollow Cube", sub: "Tiles cover all inner faces — floor, walls, ceiling" },
                    { label: "Audio System", value: "Beat-Driven Clues", sub: "Mine count replaced by rhythmic audio pulses" },
                    { label: "Interaction", value: "VR Hand Gesture", sub: "Custom sensor gun + proximity reveal logic" },
                ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-2 p-8 bg-background">
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">{item.label}</span>
                        <span className="text-2xl font-semibold tracking-tight">{item.value}</span>
                        <span className="text-sm text-muted leading-relaxed">{item.sub}</span>
                    </div>
                ))}
            </motion.section>

            {/* ── THE CONCEPT ── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col gap-12"
            >
                <div className="flex flex-col gap-4">
                    <SectionLabel>The Concept</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">From flat grid to inhabited space.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        Classic Minesweeper is a 2D grid on a monitor. Echo Tiles asks a different question — what if you were <em>inside</em> the grid? The flat plane becomes a hollow 9×9×9 cube. Tiles line every inner surface. You stand at the centre, surrounded on all sides.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">Original — Minesweeper (1989)</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-foreground">
                            <Image
                                src="/projects/Echo-tiles/minesweeperss.webp"
                                alt="Classic Minesweeper game screenshot"
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                        <p className="text-sm text-muted">A flat 2D grid. Numbers tell you how many mines are adjacent. Safe cells are clicked one by one.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">Reimagined — Echo Tiles (2025)</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                            <Image
                                src="/projects/Echo-tiles/Gameenvironment/image 4.webp"
                                alt="Inside the Echo Tiles cube environment"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-sm text-muted">A 3D hollow cube. Tiles surround you on every face. Numbers are gone — audio beats replace them.</p>
                    </div>
                </div>
            </motion.section>

            {/* ── WIN / LOSE ── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div className="flex flex-col gap-4 p-8 rounded-xl border border-border bg-background">
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--accent-neon)" }}>Win Condition</span>
                    <p className="text-2xl font-semibold tracking-tight">Reveal all non-mine tiles.</p>
                    <p className="text-muted leading-relaxed text-sm">Use audio clues to map the mine locations. Systematically reveal every safe tile without triggering a single mine.</p>
                </div>
                <div className="flex flex-col gap-4 p-8 rounded-xl border border-border bg-background">
                    <span className="text-xs font-mono uppercase tracking-wider text-red-400">Lose Condition</span>
                    <p className="text-2xl font-semibold tracking-tight">Reveal a mine tile.</p>
                    <p className="text-muted leading-relaxed text-sm">One wrong press ends the game. In a space where tiles surround you on all sides, every decision carries weight.</p>
                </div>
            </motion.section>

            {/* ── MDA FRAMEWORK ── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Design Framework</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Mechanics, Dynamics, Aesthetics</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            label: "Mechanics",
                            color: "var(--accent-blue)",
                            items: [
                                "Tile reveal via VR sensor gun",
                                "Proximity-based audio beat system",
                                "Recursive safe-tile cascade on empty reveal",
                                "Mine assignment via randomised seeding",
                            ],
                        },
                        {
                            label: "Dynamics",
                            color: "var(--accent-neon)",
                            items: [
                                "Spatial reasoning in 360° environment",
                                "Listening and counting as primary skill",
                                "Risk/reward tension on each press",
                                "Gradual mapping of the space over time",
                            ],
                        },
                        {
                            label: "Aesthetics",
                            color: "#a78bfa",
                            items: [
                                "Immersion — surrounded by the puzzle",
                                "Tension — no safety of a monitor's distance",
                                "Discovery — each revealed tile reshapes space",
                                "Surprise — audio feedback is unexpected and playful",
                            ],
                        },
                    ].map((col) => (
                        <div key={col.label} className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-background">
                            <span className="text-sm font-medium font-mono" style={{ color: col.color }}>{col.label}</span>
                            <ul className="flex flex-col gap-2">
                                {col.items.map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-muted leading-relaxed">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-border shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── PLAYER MECHANICS ── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Player Mechanics</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">The sensor gun.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        The player holds a custom-designed VR sensor gun in their right hand. Hovering over a tile activates its audio feedback — revealing the beat count of adjacent mines. Pressing the trigger reveals the tile.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-border bg-[#8a8a8a]">
                        <Image
                            src="/projects/Echo-tiles/gameimages/gun.webp"
                            alt="Echo Tiles VR sensor gun render"
                            fill
                            className="object-contain p-8"
                        />
                    </div>
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-border">
                        <Image
                            src="/projects/Echo-tiles/gameimages/echopad.webp"
                            alt="Sensor gun aimed at tile wall"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-border">
                        <Image
                            src="/projects/Echo-tiles/gameimages/image 9.webp"
                            alt="VR controller pressing a tile"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { step: "01", action: "Hover", desc: "Hold the sensor gun near a tile. Audio beats play indicating adjacent mine count." },
                        { step: "02", action: "Assess", desc: "Count the beats, triangulate with neighbouring tiles to build a mental mine map." },
                        { step: "03", action: "Reveal", desc: "Press the trigger. Safe tile cascades open. Mine tile ends the game." },
                    ].map((s) => (
                        <div key={s.step} className="flex flex-col gap-2 p-6 rounded-xl border border-border bg-background">
                            <span className="text-xs font-mono text-muted">{s.step}</span>
                            <span className="font-semibold">{s.action}</span>
                            <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── GAME ENVIRONMENT ── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Game Environment</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">The 3D grid in Unity.</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { src: "/projects/Echo-tiles/Gameenvironment/image 3.webp", alt: "Top-down view of hollow cube room" },
                        { src: "/projects/Echo-tiles/Gameenvironment/image 4.webp", alt: "First-person view of tile walls from inside" },
                        { src: "/projects/Echo-tiles/Gameenvironment/image 5.webp", alt: "Exterior view of the hollow cube" },
                        { src: "/projects/Echo-tiles/Gameenvironment/image 6.webp", alt: "Wireframe exterior of the cube structure" },
                    ].map((img, i) => (
                        <motion.div
                            key={img.src}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fade}
                            className="relative aspect-square rounded-xl overflow-hidden border border-border"
                        >
                            <Image src={img.src} alt={img.alt} fill className="object-cover" />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── TILE STATES & REVEAL LOGIC ── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Tile States & Reveal Logic</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">How tiles behave.</h2>
                </div>

                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden border border-border bg-background">
                    <Image
                        src="/projects/Echo-tiles/wireframes/game_Wireframes (1) 1.webp"
                        alt="Detailed wireframe diagram of tile states and reveal mechanics"
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { state: "Hidden", color: "var(--accent-blue)", desc: "Default state. Tile is unrevealed. No information visible or audible." },
                        { state: "Safe", color: "var(--accent-neon)", desc: "Revealed with no adjacent mines. Automatically cascades to reveal neighbouring safe tiles." },
                        { state: "Numbered", color: "#f59e0b", desc: "Revealed with adjacent mines. Emits audio beats equal to the mine count instead of showing a number." },
                        { state: "Mine", color: "#ef4444", desc: "Triggered tile. Ends the game immediately. Visual explosion effect plays." },
                    ].map((t) => (
                        <div key={t.state} className="flex flex-col gap-2 p-5 rounded-xl border border-border bg-background">
                            <span className="text-sm font-medium" style={{ color: t.color }}>{t.state}</span>
                            <p className="text-sm text-muted leading-relaxed">{t.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── AUDIO FEEDBACK SYSTEM ── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="rounded-2xl border border-border overflow-hidden"
            >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-6 p-10 md:p-12 bg-background">
                        <SectionLabel>Audio Feedback System</SectionLabel>
                        <h2 className="text-3xl font-semibold tracking-tight">Numbers become rhythm.</h2>
                        <p className="text-muted leading-relaxed">
                            Visual number clues are replaced entirely by spatial audio. When a player hovers over a revealed tile, it emits a rhythmic beat pattern — one beat per adjacent mine.
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                { beats: "No sound", meaning: "Safe tile — no adjacent mines" },
                                { beats: "1 beat", meaning: "One adjacent mine" },
                                { beats: "2 beats", meaning: "Two adjacent mines" },
                                { beats: "3+ beats", meaning: "High-risk zone — proceed carefully" },
                            ].map((row) => (
                                <div key={row.beats} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                                    <span className="font-mono text-sm text-accent-blue w-20 shrink-0">{row.beats}</span>
                                    <span className="text-sm text-muted">{row.meaning}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative min-h-64 md:min-h-0 bg-foreground">
                        <Image
                            src="/projects/Echo-tiles/gameimages/echopadblibk.webp"
                            alt="Close-up of the sensor gun near a tile"
                            fill
                            className="object-cover opacity-80"
                        />
                    </div>
                </div>
            </motion.section>

            {/* ── STORYBOARDING ── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Storyboarding / Flow</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Designing the experience arc.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        Early storyboards mapped the player journey — from loading screen to first reveal, through the audio system, to win and loss states.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {storyboards.map((src, i) => (
                        <motion.div
                            key={src}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fade}
                            className="relative aspect-video rounded-xl overflow-hidden border border-border bg-background"
                        >
                            <Image
                                src={src}
                                alt={`Storyboard frame ${i + 1}`}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── GAME ARCHITECTURE ── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-2">
                    <SectionLabel>Game Architecture</SectionLabel>
                    <h2 className="text-5xl font-semibold tracking-tight">Four scripts. One system.</h2>
                    <p className="max-w-2xl text-muted leading-relaxed">
                        The game logic is split across four C# scripts in Unity, each with a single clear responsibility.
                    </p>
                </div>

                <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden border border-border bg-white">
                    <Image
                        src="/projects/Echo-tiles/script-arch.webp"
                        alt="Script architecture diagram showing data flow between four C# scripts"
                        fill
                        className="object-contain p-6 md:p-10"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        {
                            num: "01",
                            name: "ShapeCreator.cs",
                            desc: "Procedurally builds the hollow 3D grid. Places tiles only on inner cube faces, avoiding edges and corners. Grid size is editable per level.",
                        },
                        {
                            num: "02",
                            name: "TileData.cs",
                            desc: "Attached to each tile. Holds the tile's current state — Hidden, Safe, Numbered, or Mine — and exposes it to the game manager.",
                        },
                        {
                            num: "03",
                            name: "MinesweeperGame.cs",
                            desc: "Core logic manager. Seeds mine placement, calculates adjacent mine counts, handles the recursive cascade reveal, and evaluates win/loss.",
                        },
                        {
                            num: "04",
                            name: "OneClickButton.cs",
                            desc: "VR interaction handler. Receives input from the sensor gun, triggers tile reveal actions, and communicates assigned tile properties back to TileData.",
                        },
                    ].map((s) => (
                        <div key={s.num} className="flex gap-5 p-6 rounded-xl border border-border bg-background hover:bg-hover transition-colors">
                            <span className="font-mono text-sm text-muted shrink-0 pt-0.5">{s.num}</span>
                            <div className="flex flex-col gap-1">
                                <span className="font-medium font-mono text-sm" style={{ color: "var(--accent-blue)" }}>{s.name}</span>
                                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

        </div>
    );
}
