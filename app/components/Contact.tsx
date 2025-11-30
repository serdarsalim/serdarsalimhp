'use client';

import IslamicPattern from './IslamicPattern';

export default function Contact() {
  return (
    <section id="contact" className="relative py-16 md:py-32 bg-gradient-to-b from-indigo-100 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -inset-6 bg-gradient-to-tr from-white/70 via-purple-200/60 to-pink-200/50 blur-3xl opacity-70" aria-hidden="true" />
          <div className="relative rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-2xl shadow-[0_50px_120px_rgba(82,63,120,0.35)] px-6 md:px-12 py-8 md:py-12 flex flex-col gap-8 md:gap-10 text-slate-900">
            <div className="text-center space-y-3">
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow text-xs uppercase tracking-[0.35em] text-slate-500">
                Connect
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">Let's Connect</h2>
              <p className="text-sm md:text-base text-slate-600 max-w-md mx-auto">
                I reply fastest on these channels
              </p>
            </div>
            <div className="relative flex flex-col md:grid md:grid-cols-3 gap-5 md:gap-8">
              {/* Email */}
              <a
                href="mailto:contact@serdarsalim.com"
                  className="flex items-center justify-center md:justify-center gap-3 px-4 py-4 rounded-2xl bg-white text-slate-900 border border-white/80 shadow-[0_25px_45px_rgba(80,61,120,0.2)] hover:border-purple-200 transition-colors"
              >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-sm md:text-base break-all">contact@serdarsalim.com</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/domurcuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white text-slate-900 border border-white/80 shadow-[0_25px_45px_rgba(80,61,120,0.2)] hover:border-purple-200 transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="font-medium text-sm md:text-base">LinkedIn</span>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com/@salimspoke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center md:justify-center gap-3 px-4 py-4 rounded-2xl bg-white text-slate-900 border border-white/80 shadow-[0_25px_45px_rgba(80,61,120,0.2)] hover:border-purple-200 transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="font-medium text-sm md:text-base">TikTok</span>
                </a>
              </div>
            <div className="relative pt-6 border-t border-white/70 text-center text-slate-600 text-xs md:text-sm space-y-1">
              <p>© {new Date().getFullYear()} Serdar Salim Domurcuk</p>
              <p>All rights reserved, some lefts unreserved.</p>
            </div>
          </div>
        </div>
      </div>
      <IslamicPattern position="bottom" variant={1} />
    </section>
  );
}
