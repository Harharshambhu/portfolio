export interface Project {
    title: string;
    category: string;
    year: string;
    href?: string;
    description?: string;
    thumbnail?: string;
    circularThumbnail?: string;
    circularThumbnailOffsetX?: number;
    circularThumbnailOffsetY?: number;
}

export const projects: (Project | null)[] = [
    {
        title: "Event Ease",
        category: "UX Design",
        year: "2026",
        description: "B2B SaaS platform that replaces WhatsApp-and-spreadsheet event coordination with a communication-first architecture, where channels, forms, tasks, and vendor access are all event-scoped by design.",
        href: "/projects/event-ease",
        thumbnail: "/projects/EventEase/thumbnail.webp",
        circularThumbnail: "/projects/EventEase/circularthumbnail.webp",
        circularThumbnailOffsetX: -35,
        circularThumbnailOffsetY: -30,
    },
    {
        title: "VR Proximity-Based Presence",
        category: "UX Research",
        year: "2026",
        description: "M.Des. research project proving that procedural animations triggered by user proximity sustain VR engagement more effectively than static high-fidelity environments, without exceeding standalone headset hardware limits.",
        href: "/projects/xr-proximity-based-presence",
        thumbnail: "/projects/xr-proximity-based-presence/thumbnail.webp",
        circularThumbnail: "/projects/xr-proximity-based-presence/circular thumnail.webp",
    },
    {
        title: "Comfort Aid",
        category: "Product Design",
        year: "2024",
        description: "A slide-mattress system for Indian public hospitals that eliminates the bedsheet lifting method for patient transfers, enabling a single caregiver to complete a safe transfer in five steps.",
        href: "/projects/comfort-aid",
        thumbnail: "/projects/Comfort Aid/thumbnail.webp",
        circularThumbnail: "/projects/Comfort Aid/circular thumnail.webp",
    },
    {
        title: "Echo Tiles",
        category: "Game Design",
        year: "2025",
        description: "Minesweeper reimagined as a VR spatial puzzle where the player stands inside a hollow 3D cube and navigates mine locations through audio beats instead of visual numbers.",
        href: "/projects/echo-tiles",
        thumbnail: "/projects/Echo-tiles/thumbnail.webp",
        circularThumbnail: "/projects/Echo-tiles/circularthumbnail.webp",
        circularThumbnailOffsetY: -25,
    },
    {
        title: "From Discovery to Transaction",
        category: "UX Research",
        year: "2025",
        description: "UX research into Instagram's Top-of-Funnel leakage in the Indian D2C market, proposing a statutory Shop Tag verification system to bridge the trust gap between passive browsing and purchase.",
        href: "/projects/from-discovery-to-transaction",
        thumbnail: "/projects/discovery-to-transaction/thumbnail.webp",
        circularThumbnail: "/projects/discovery-to-transaction/CircularThumbnail.webp",
    },
    {
        title: "Chabad House",
        category: "Narrative Design",
        year: "2023",
        href: "/projects/chabad-house",
        description: " We wanted to find a way to tell Tragic story of Chabad House, preserving the weight of what happened while keeping it accessible as a narrative. Every panel was illustrated and sequenced digitally, designed to be read as an interactive flipbook.",
        thumbnail: "/projects/chabad-house/01.webp",
        circularThumbnail: "/projects/chabad-house/circularthumbnail.webp",
    },
    {
        title: "Artworks",
        category: "Illustration",
        year: "",
        description: "Personal illustration work: character concept, creature design, digital painting, and line art. No client, no brief. Each piece started from an idea that needed to exist somewhere.",
        href: "/projects/artworks",
        thumbnail: "/projects/ArtWorks/beside-a-river0002.webp",
    },
    {
        title: "3D Immersive Walkthroughs",
        category: "3D Design",
        year: "2022",
        description: "Five distinct 3D environments, from an eldritch creature gate to a retrofuturistic roadside station, each built as a walkthrough scene exploring different visual languages, atmospheres, and prop design.",
        href: "/projects/3d-immersive-walkthroughs",
        thumbnail: "/projects/3D-Immersive-Walkthroughs/DemonGate.webp",
    },
    {
        title: "Ad Campaigns",
        category: "Ad Design",
        year: "2022",
        description: "Commercial work across three clients: a webtoon comic ad for Blinkit, satirical social and print campaigns for Hubble, and character-driven logo design for cricket teams.",
        href: "/projects/ad-campaigns",
        thumbnail: "/projects/AdCapaigns/BlinkitAdComic3.webp",
    },
];
