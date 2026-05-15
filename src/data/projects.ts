export interface Project {
    title: string;
    category: string;
    year: string;
    href?: string;
    description?: string;
    thumbnail?: string;
    circularThumbnail?: string;
}

export const projects: Project[] = [
    {
        title: "Event Ease",
        category: "UX Design",
        year: "2026",
        description: "B2B SaaS platform that replaces WhatsApp-and-spreadsheet event coordination with a communication-first architecture, where channels, forms, tasks, and vendor access are all event-scoped by design.",
        href: "/projects/event-ease",
        thumbnail: "/projects/EventEase/thumbnail.png",
        circularThumbnail: "/projects/EventEase/circularthumbnail.png",
    },
    {
        title: "XR Proximity-Based Presence",
        category: "XR Design",
        year: "2026",
        description: "M.Des. research project proving that procedural animations triggered by user proximity sustain VR engagement more effectively than static high-fidelity environments, without exceeding standalone headset hardware limits.",
        href: "/projects/xr-proximity-based-presence",
        thumbnail: "/projects/xr-proximity-based-presence/thumbnail.jpg",
        circularThumbnail: "/projects/xr-proximity-based-presence/circular thumnail.png",
    },
    {
        title: "Comfort Aid",
        category: "Product Design",
        year: "2024",
        description: "A slide-mattress system for Indian public hospitals that eliminates the bedsheet lifting method for patient transfers, enabling a single caregiver to complete a safe transfer in five steps.",
        href: "/projects/comfort-aid",
        thumbnail: "/projects/Comfort Aid/thumbnail.jpeg",
        circularThumbnail: "/projects/Comfort Aid/circular thumnail.png",
    },
    {
        title: "Echo Tiles",
        category: "Game Design",
        year: "2025",
        description: "Minesweeper reimagined as a VR spatial puzzle where the player stands inside a hollow 3D cube and navigates mine locations through audio beats instead of visual numbers.",
        href: "/projects/echo-tiles",
        thumbnail: "/projects/Echo-tiles/thumbnail.webp",
        circularThumbnail: "/projects/Echo-tiles/circularthumbnail.png",
    },
    {
        title: "From Discovery to Transaction",
        category: "UX Research",
        year: "2025",
        description: "UX research into Instagram's Top-of-Funnel leakage in the Indian D2C market, proposing a statutory Shop Tag verification system to bridge the trust gap between passive browsing and purchase.",
        href: "/projects/from-discovery-to-transaction",
        thumbnail: "/projects/discovery-to-transaction/thumbnail.png",
        circularThumbnail: "/projects/discovery-to-transaction/CircularThumbnail.png",
    },
    {
        title: "Chabad House",
        category: "Narrative Design",
        year: "2023",
        description: " We wanted to find a way to tell Tragic story of Chabad House, preserving the weight of what happened while keeping it accessible as a narrative. Every panel was illustrated and sequenced digitally, designed to be read as an interactive flipbook.",
        thumbnail: "/projects/chabad-house/01.png",
        circularThumbnail: "/projects/chabad-house/circularthumbnail.png",
    },
];
