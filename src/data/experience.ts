export interface Entry {
    year: string;
    role: string;
    company: string;
    desc: string;
}

export const experiences: Entry[] = [
    {
        year: "July 2024–May 2026",
        role: "Teaching Assistant",
        company: "Indian Institute of Technology Jodhpur",
        desc: "I assisted with course in\nthe Design lab and ran user testing sessions and building test environ-\n-ments for my own thesis research, looking at how small environmental reactions to user proximity can make standalone VR feel more engaging without adding \nhardware cost.",
    },
    {
        year: "June 2025–July 2025",
        role: "Immersive Media Intern",
        company: "Mintlabs Events (Mumbai)",
        desc: "A short stint at a Mumbai \nevents company where I worked \nin a team of two to build interact-\n-ive installations for live events. I made a pose-detection game for kiosk displays that used computer vision to track yoga poses, along with an AR experience for guests arriving to the event.",
    },
    {
        year: "April 2025–May 2025",
        role: "Product Strategy Intern",
        company: "Indian Roars (Mumbai)",
        desc: "Our team of five \nresearched on how India's event industry actually operates. By talking to organizers from places like Marriott and Johnson & Johnson, understanding how registration, ticketing, and vendor coordination happens when there's no real tool built for it.",
    },
    {
        year: "Feb 2024–May 2024",
        role: "Storyboard Artist",
        company: "Dashtoon (Delhi)",
        desc: "Created dynamic visual narratives and storyboards for digital comics, bridging the gap between script and final production assets.",
    },
    {
        year: "Aug 2020–Dec 2023",
        role: "Visual Designer",
        company: "Freelance",
        desc: "I took on freelance work \nthroughout my bachelor's. \nBuilding 3D VR walkthroughs \nand environments for fashion and commercial events, and corporate clients. For me it started as a way to learn 3D tools outside the fashion curriculum but became steady ongoing work. ",
    },
];

export const education: Entry[] = [
    {
        year: "2024–Present",
        role: "M.Des (XR Design)",
        company: "IIT Jodhpur",
        desc: "Specializing in spatial computing and human-computer interaction, with a focus on reactive systems and user retention in VR.",
    },
    {
        year: "2019–2023",
        role: "B.Des (Fashion Design)",
        company: "FDDI Noida",
        desc: "Explored the intersection of physical aesthetics and operational design, leading to a deep interest in backstage systems and spatial UX.",
    },
];
