'use client';

export default function FontDemo() {
  const serifFonts = [
    { name: 'Playfair Display', class: 'font-playfair', weight: '700' },
    { name: 'Cinzel', class: 'font-cinzel', weight: '700' },
    { name: 'Cormorant Garamond', class: 'font-cormorant', weight: '700' },
    { name: 'Libre Baskerville', class: 'font-libre-baskerville', weight: '700' },
    { name: 'Merriweather', class: 'font-merriweather', weight: '700' },
    { name: 'Lora', class: 'font-lora', weight: '700' },
    { name: 'EB Garamond', class: 'font-eb-garamond', weight: '700' },
    { name: 'Bodoni Moda', class: 'font-bodoni', weight: '700' },
    { name: 'Abril Fatface', class: 'font-abril', weight: '400' },
    { name: 'Spectral', class: 'font-spectral', weight: '700' },
  ];

  const calligraphyFonts = [
    { name: 'Allura', class: 'font-allura', weight: '400' },
    { name: 'Great Vibes', class: 'font-great-vibes', weight: '400' },
    { name: 'Tangerine', class: 'font-tangerine', weight: '700' },
    { name: 'Parisienne', class: 'font-parisienne', weight: '400' },
    { name: 'Dancing Script', class: 'font-dancing', weight: '700' },
    { name: 'Alex Brush', class: 'font-alex-brush', weight: '400' },
    { name: 'Pinyon Script', class: 'font-pinyon', weight: '400' },
    { name: 'Satisfy', class: 'font-satisfy', weight: '400' },
    { name: 'Italianno', class: 'font-italianno', weight: '400' },
    { name: 'Mrs Saint Delafield', class: 'font-mrs-saint', weight: '400' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-blue-50/30 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Majestic Font Options</h1>
          <p className="text-lg text-gray-700">Exploring elegant fonts for "About Me" title</p>
        </div>

        {/* Serif Fonts Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 uppercase tracking-widest">
            Classic Serif Fonts
          </h2>
          {serifFonts.map((font, index) => (
            <div key={index} className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 md:p-12">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{font.name}</span>
              </div>
              <h2
                className={`${font.class} text-3xl md:text-5xl text-gray-900 tracking-[0.25em] uppercase`}
                style={{ fontWeight: font.weight }}
              >
                About Me
              </h2>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                  I build web apps for everyday use and share my thoughts on living with purpose.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Calligraphy Fonts Section */}
        <div className="space-y-8 mt-16 pt-16 border-t-4 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 uppercase tracking-widest">
            Calligraphy & Script Fonts
          </h2>
          {calligraphyFonts.map((font, index) => (
            <div key={index} className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 md:p-12">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{font.name}</span>
              </div>
              <h2
                className={`${font.class} text-4xl md:text-6xl text-gray-900`}
                style={{ fontWeight: font.weight }}
              >
                About Me
              </h2>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                  I build web apps for everyday use and share my thoughts on living with purpose.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Cinzel:wght@700&family=Cormorant+Garamond:wght@700&family=Libre+Baskerville:wght@700&family=Merriweather:wght@700&family=Lora:wght@700&family=EB+Garamond:wght@700&family=Bodoni+Moda:wght@700&family=Abril+Fatface&family=Spectral:wght@700&family=Allura&family=Great+Vibes&family=Tangerine:wght@700&family=Parisienne&family=Dancing+Script:wght@700&family=Alex+Brush&family=Pinyon+Script&family=Satisfy&family=Italianno&family=Mrs+Saint+Delafield&display=swap');

        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-libre-baskerville { font-family: 'Libre Baskerville', serif; }
        .font-merriweather { font-family: 'Merriweather', serif; }
        .font-lora { font-family: 'Lora', serif; }
        .font-eb-garamond { font-family: 'EB Garamond', serif; }
        .font-bodoni { font-family: 'Bodoni Moda', serif; }
        .font-abril { font-family: 'Abril Fatface', cursive; }
        .font-spectral { font-family: 'Spectral', serif; }

        .font-allura { font-family: 'Allura', cursive; }
        .font-great-vibes { font-family: 'Great Vibes', cursive; }
        .font-tangerine { font-family: 'Tangerine', cursive; }
        .font-parisienne { font-family: 'Parisienne', cursive; }
        .font-dancing { font-family: 'Dancing Script', cursive; }
        .font-alex-brush { font-family: 'Alex Brush', cursive; }
        .font-pinyon { font-family: 'Pinyon Script', cursive; }
        .font-satisfy { font-family: 'Satisfy', cursive; }
        .font-italianno { font-family: 'Italianno', cursive; }
        .font-mrs-saint { font-family: 'Mrs Saint Delafield', cursive; }
      `}</style>
    </div>
  );
}
