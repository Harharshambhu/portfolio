import Link from "next/link";

export default function Resume() {
    return (
        <div className="flex flex-col gap-16 items-center w-full">
            <section className="flex flex-col gap-6 items-center text-center w-full">
                <h1 className="text-6xl md:text-[150px] font-medium tracking-tighter leading-none">Resume</h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted">
                    Preview or download my resume below.
                </p>
            </section>

            <section className="flex flex-col items-center w-full max-w-4xl gap-8">
                <div className="w-full aspect-[1/1.4] md:aspect-[1/1.2] bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <iframe
                        src="/Anirudh_Singh_Resume.pdf#toolbar=0"
                        className="w-full h-full border-none"
                        title="Anirudh Singh Resume"
                    />
                </div>

                <a
                    href="/Anirudh_Singh_Resume.pdf"
                    download
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                    Download
                </a>
            </section>
        </div>
    );
}
