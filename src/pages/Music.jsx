import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaSpotify, FaPlay } from 'react-icons/fa'
import { SiApplemusic } from 'react-icons/si'

const releases = [
  { year: '2025', title: '18 Wannam', feat: 'with Ravi Jay', genre: 'R&B' },
  { year: '2025', title: 'Aathin Mathin', feat: 'with Dinesh & Nisal Gamage', genre: 'Pop' },
  { year: '2025', title: 'Hamadama', feat: '', genre: 'Electronic' },
  { year: '2025', title: 'Hayyo', feat: 'with Joewin Shamalina Chamath Sangeeth', genre: 'Trap' },
  { year: '2024', title: 'Sada Radennam', feat: 'with Isuru Jay & MasterD', genre: 'R&B' },
  { year: '2024', title: 'Pini Bindu', feat: '', genre: 'Electronic' },
  { year: '2024', title: 'Naginam Hele', feat: 'with Dinesh Gamage & Kaizer Kaiz', genre: 'Hip-Hop' },
  { year: '2024', title: 'Nohithunata', feat: 'with Chamath Sangeeth & Yashodha Adhikari', genre: 'Pop' },
  { year: '2024', title: 'Atharaman Wela', feat: 'with Sanka Dineth & Manuranga Wijesekara', genre: 'R&B' },
  { year: '2024', title: 'Ill Mahe Kurullo', feat: 'with Nisala Kavinda & AKIIY', genre: 'Trap' },
  { year: '2023', title: 'Wisithuru Mal', feat: '', genre: 'Electronic' },
  { year: '2023', title: 'Numbata Mathakada', feat: 'with Ravi Jay', genre: 'R&B' },
  { year: '2023', title: 'Lantharum', feat: '', genre: 'Pop' },
  { year: '2022', title: 'Manali', feat: 'with Ravi Jay', genre: 'Hip-Hop' },
  { year: '2018', title: 'Rasthafari', feat: 'with Ravi Jay', genre: 'Reggae-Trap' },
]

const years = ['All', ...new Set(releases.map((r) => r.year))]

export default function Music() {
  const [activeYear, setActiveYear] = useState('All')
  const [hovered, setHovered] = useState(null)

  const filtered = activeYear === 'All' ? releases : releases.filter((r) => r.year === activeYear)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-24"
    >
      {/* Header */}
      <section className="py-20 text-center relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(10,186,181,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-tiffany-500 text-xs tracking-[0.4em] uppercase mb-4"
          >
            Discography
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider text-slate-900 mb-6"
          >
            THE <span className="tiffany-gradient">MUSIC</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm"
          >
            20+ releases spanning 2018–2025
          </motion.p>
        </div>
      </section>

      {/* Streaming links */}
      <section className="py-8 border-y border-tiffany-500/10 section-alt">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-4">
          {[
            { label: 'Spotify', icon: FaSpotify, href: 'https://open.spotify.com/artist/00ZpGGB5F7Ytw781Qsr1sR', color: '#1DB954' },
            { label: 'Apple Music', icon: SiApplemusic, href: 'https://music.apple.com/lk/artist/yuki-navaratne/1472878536', color: '#fc3c44' },
          ].map(({ label, icon: Icon, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 glass-dark rounded-full px-6 py-3 text-sm text-slate-500 hover:text-slate-900 transition-all duration-300 hover:scale-105 btn-outline"
            >
              <Icon size={16} style={{ color }} />
              Listen on {label}
            </a>
          ))}
        </div>
      </section>

      {/* Year filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setActiveYear(year)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-300 ${
                  activeYear === year
                    ? 'btn-primary text-white shadow-md'
                    : 'glass-dark text-slate-500 hover:text-slate-900'
                }`}
              >
                {year}
              </motion.button>
            ))}
          </div>

          {/* Track list */}
          <div className="max-w-4xl mx-auto">
            {filtered.map((track, i) => (
              <motion.div
                key={`${track.year}-${track.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`group flex items-center gap-6 py-5 px-4 border-b border-tiffany-500/8 rounded-lg transition-all duration-300 cursor-pointer ${
                  hovered === i ? 'bg-tiffany-500/4' : ''
                }`}
              >
                <div className="w-8 text-center flex-shrink-0">
                  {hovered === i ? (
                    <FaPlay size={12} className="text-tiffany-500 mx-auto" />
                  ) : (
                    <span className="text-slate-300 text-xs font-mono">{String(i + 1).padStart(2, '0')}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm transition-colors ${hovered === i ? 'text-slate-900' : 'text-slate-700'}`}>
                    {track.title}
                  </p>
                  {track.feat && (
                    <p className="text-slate-400 text-xs mt-0.5">{track.feat}</p>
                  )}
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className={`text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-400 tracking-widest uppercase transition-all ${
                    hovered === i ? 'border-tiffany-500/30 text-tiffany-500' : ''
                  }`}>
                    {track.genre}
                  </span>
                  <span className="text-slate-300 text-xs font-mono">{track.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Streaming stats */}
      <section className="py-20 border-t border-tiffany-500/10 section-alt">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-10 text-center glow"
          >
            <p className="text-tiffany-500 text-xs tracking-[0.4em] uppercase mb-6">Streaming Presence</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { val: '9.3M', label: '2024 Streams' },
                { val: '398K', label: 'Listeners' },
                { val: '161', label: 'Countries' },
                { val: '460K', label: 'Listening Hours' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="font-display text-5xl tiffany-gradient">{val}</p>
                  <p className="text-slate-400 text-xs tracking-widest uppercase mt-2">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
