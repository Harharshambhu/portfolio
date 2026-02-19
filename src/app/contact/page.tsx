export default function Contact() {
    return (
        <div className="flex flex-col gap-16 items-center text-center w-full">
            <section className="flex flex-col gap-6 items-center w-full">
                <h1 className="text-6xl md:text-[150px] font-medium tracking-tighter leading-none">Contact</h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted">
                    Feel free to reach out for collaborations or just say hi.
                </p>
            </section>

            <section className="flex flex-col items-center w-full max-w-md">
                <div className="flex flex-col gap-10 items-center w-full bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/10">
                    <div className="flex flex-col gap-2 items-center">
                        <span className="text-sm font-mono text-muted uppercase tracking-wider mb-2">
                            Email
                        </span>
                        <a
                            href="mailto:anirudhsingh1441@gmail.com"
                            className="text-lg text-blue-400 hover:text-blue-300 hover:underline decoration-blue-400/50 underline-offset-4 transition-colors"
                        >
                            anirudhsingh1441@gmail.com
                        </a>
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        <span className="text-sm font-mono text-muted uppercase tracking-wider mb-2">
                            Socials
                        </span>
                        <a
                            href="https://linkedin.com/in/anirudhsingh14"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-blue-400 hover:text-blue-300 hover:underline decoration-blue-400/50 underline-offset-4 transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        <span className="text-sm font-mono text-muted uppercase tracking-wider mb-2">
                            Location
                        </span>
                        <p className="text-lg">Jodhpur, India</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
