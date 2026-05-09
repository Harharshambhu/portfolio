import ContactForm from "@/components/ContactForm";
import BackgroundGrid from "@/components/BackgroundGrid";
import SectionLabel from "@/components/SectionLabel";
import SpotlightHeading from "@/components/SpotlightHeading";

export default function Contact() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col gap-10 items-center w-full px-6 min-h-[50vh] justify-center mb-12 mt-4 md:mt-8">
                <section className="flex flex-col gap-4 items-center text-center w-full">
                    <SpotlightHeading className="font-medium tracking-tighter leading-none" color="var(--spotlight-secondary)" style={{ fontSize: "var(--fs-page-title-contact)" }}>Contact</SpotlightHeading>
                    <p className="max-w-xl text-lg leading-relaxed text-muted">
                        Feel free to reach out for collaborations or just say hi.
                    </p>
                </section>

                <section className="flex flex-col items-center w-full max-w-md">
                    <div className="flex flex-col gap-6 items-center w-full bg-white/5 rounded-2xl py-6 px-8 md:py-8 md:px-12 backdrop-blur-sm border border-white/10">
                        <div className="flex flex-col gap-2 items-center text-center">
                            <SectionLabel as="span" className="mb-2">
                                Email
                            </SectionLabel>
                            <a
                                href="mailto:anirudhsingh1441@gmail.com"
                                className="text-lg text-blue-400 hover:text-blue-300 hover:underline decoration-blue-400/50 underline-offset-4 transition-colors"
                            >
                                anirudhsingh1441@gmail.com
                            </a>
                        </div>

                        <div className="flex flex-col gap-2 items-center text-center">
                            <SectionLabel as="span" className="mb-2">
                                Socials
                            </SectionLabel>
                            <a
                                href="https://linkedin.com/in/anirudhsingh14"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg text-blue-400 hover:text-blue-300 hover:underline decoration-blue-400/50 underline-offset-4 transition-colors"
                            >
                                LinkedIn
                            </a>
                        </div>

                        <div className="flex flex-col gap-2 items-center text-center">
                            <SectionLabel as="span" className="mb-2">
                                Location
                            </SectionLabel>
                            <p className="text-lg">Jodhpur, India</p>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="relative z-0 w-screen ml-[calc(50%-50vw)] mb-[-3rem] md:mb-[-5rem] pt-12 pb-16 border-t border-border mt-12 bg-black text-white overflow-hidden">
                <BackgroundGrid fixed={false} color="transparent" spotlight={true} interaction={false} />

                <div className="max-w-screen-xl mx-auto w-full px-6 flex flex-col gap-12 z-10 relative items-center justify-center">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-center mb-4">
                        Send a Message
                    </h2>
                    <ContactForm />
                </div>
            </footer>
        </div>
    );
}
