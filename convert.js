const fs = require('fs');
const htmlPath = '/home/anirudh/Programs/Casestudy/vr-casestudy01.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 1. Extract CSS
const cssMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
let css = cssMatch ? cssMatch[1] : '';
css = css.replace(/body\s*\{/g, '.casestudyWrapper {');
fs.writeFileSync('src/app/projects/xr-proximity-based-presence/casestudy.css', css);

// 2. Extract Body HTML
const bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
let bodyHtml = bodyMatch ? bodyMatch[1] : '';

// 3. Convert to JSX
bodyHtml = bodyHtml.replace(/class=/g, 'className=');
bodyHtml = bodyHtml.replace(/<br>/g, '<br />');
bodyHtml = bodyHtml.replace(/<img([^>]*[^\/])>/g, '<img$1 />');

// HTML comments to JSX comments
bodyHtml = bodyHtml.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Fix specific styles
bodyHtml = bodyHtml.replace(/style="border-top:none; padding-top:6px;"/g, "style={{ borderTop: 'none', paddingTop: '6px' }}");
bodyHtml = bodyHtml.replace(/style="margin:0;"/g, "style={{ margin: 0 }}");
bodyHtml = bodyHtml.replace(/style="margin-top:28px;"/g, "style={{ marginTop: '28px' }}");
bodyHtml = bodyHtml.replace(/style="margin-top:20px;"/g, "style={{ marginTop: '20px' }}");
bodyHtml = bodyHtml.replace(/style="margin-bottom:0;"/g, "style={{ marginBottom: 0 }}");
bodyHtml = bodyHtml.replace(/style="color:var\(--ink\);"/g, "style={{ color: 'var(--ink)' }}");

// Fix image paths
bodyHtml = bodyHtml.replace(/src="([^"]+)"/g, (match, p1) => {
    if (!p1.startsWith('/') && !p1.startsWith('http')) {
        return `src="/xr-proximity-based-presence/${p1}"`;
    }
    return match;
});

// Construct the page component
const pageTsx = `import './casestudy.css';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function XRProximityCaseStudy() {
    return (
        <div className="casestudyWrapper pb-24">
            <div className="max-w-[880px] mx-auto px-[64px] pt-12 pb-4 max-sm:px-[24px]">
                <Link 
                    href="/projects" 
                    className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Projects</span>
                </Link>
            </div>
            ${bodyHtml}
        </div>
    );
}
`;

fs.writeFileSync('src/app/projects/xr-proximity-based-presence/page.tsx', pageTsx);
console.log('Conversion successful.');
