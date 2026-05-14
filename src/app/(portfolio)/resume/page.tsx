import { Download } from "lucide-react";

export default function Resume() {
    return (
        <div className="flex flex-col gap-16 items-center w-full">
            <section className="flex flex-col gap-6 items-center text-center w-full">
                <h1 className="text-6xl md:text-[150px] font-medium tracking-tighter leading-none">Resume</h1>
            </section>

            <section className="flex flex-col items-center w-full max-w-3xl gap-6" style={{ isolation: "isolate", zIndex: 1, position: "relative" }}>
                {/* PDF iframe — native text layer allows copy-paste */}
                <iframe
                    src="/Anirudh_Singh_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                    className="w-full border-0"
                    style={{
                        height: "calc(100svh - 160px)",
                        minHeight: 1050,
                        boxShadow: "0 4px 40px rgba(0,0,0,0.12), 0 1px 6px rgba(0,0,0,0.06)",
                    }}
                    title="Anirudh Singh Resume"
                />

                <a
                    href="/Anirudh_Singh_Resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium border border-foreground bg-background text-foreground hover:bg-foreground hover:text-background active:bg-foreground active:text-background transition-colors"
                >
                    <Download size={14} />
                    Download PDF
                </a>
            </section>
        </div>
    );
}
