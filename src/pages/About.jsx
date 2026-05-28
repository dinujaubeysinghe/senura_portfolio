import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const numeric = parseFloat(target)
          const steps = 60
          const increment = numeric / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= numeric) {
              setCount(numeric)
              clearInterval(timer)
            } else {
              setCount(parseFloat(current.toFixed(1)))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className="font-display text-6xl tiffany-gradient">
      {count % 1 === 0 ? count.toFixed(0) : count.toFixed(1)}{suffix}
    </span>
  )
}

const achievements = [
  { year: '2022', title: 'Spotify Breakthrough', desc: '5.2M streams · 277.8K listeners · 147 countries' },
  { year: '2023', title: '#1 Sri Lankan Artist', desc: 'Top local Spotify artist for the second consecutive year' },
  { year: '2024', title: 'Global Expansion', desc: '9.3M streams · 398K listeners · 161 countries · 460K hours' },
]

export default function About() {
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
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="text-tiffany-500 text-xs tracking-[0.4em] uppercase mb-4"
          >
            The Story
          </motion.p>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider text-slate-900 mb-6"
          >
            ABOUT <span className="tiffany-gradient">YUKI</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Pannala Gedara Yukthi Prabudika Navaratne — professionally known as YukiBeatz.
            A Sri Lankan music producer, singer, and artist redefining the boundaries of sound.
          </motion.p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 border-t border-tiffany-500/10 section-alt">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-72 mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden glass glow flex items-center justify-center border border-tiffany-500/15">
                <div className="text-center">
                  <p className="font-display text-8xl tiffany-gradient">YK</p>
                  <p className="text-slate-400 text-xs tracking-widest mt-2 uppercase">YukiBeatz</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-2xl border border-tiffany-500/20 border-dashed"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-tiffany-500 text-xs tracking-[0.4em] uppercase mb-3">Background</p>
              <h2 className="font-display text-4xl text-slate-900 tracking-wider mb-4">
                FROM KANDY<br />TO THE WORLD
              </h2>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Growing up in the lush hills of Kandy, Yuki's first artistic journey began through traditional
              Kandyan dance — an ancient Sri Lankan art form that would forever shape his sense of rhythm
              and movement. This deep-rooted cultural foundation became the bedrock upon which he built
              an entirely modern sonic identity.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Relocating to Colombo to pursue music full-time, Yuki began fusing the pulse of hip-hop,
              the warmth of R&B, the intensity of trap, and the textures of electronic music with elements
              of his heritage. The result: a sound recognized across 161 countries.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Beyond performing, Yuki serves as a Visiting Lecturer at Pearlbay Institute — Sri Lanka's
              largest audio engineering education institution — where he mentors 48 students in the art
              of electronic music production.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-px bg-tiffany-500" />
              <p className="text-slate-400 text-xs tracking-widest uppercase">Born May 12, 1990 · Kandy, Sri Lanka</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats counter */}
      <section className="py-20 border-t border-tiffany-500/10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '9.3', suffix: 'M', label: 'Streams · 2024' },
              { value: '398', suffix: 'K', label: 'Monthly Listeners' },
              { value: '161', suffix: '', label: 'Countries Reached' },
              { value: '20', suffix: '+', label: 'Releases' },
            ].map(({ value, suffix, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-dark rounded-xl p-6"
              >
                <CountUp target={value} suffix={suffix} />
                <p className="text-slate-400 text-xs tracking-widest uppercase mt-2">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-t border-tiffany-500/10 section-alt">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-tiffany-500 text-xs tracking-[0.4em] uppercase mb-3">Milestones</p>
            <h2 className="font-display text-5xl text-slate-900 tracking-wider">
              THE <span className="tiffany-gradient">JOURNEY</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-tiffany-500/60 via-tiffany-500/20 to-transparent -translate-x-1/2" />
            {achievements.map(({ year, title, desc }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 glass rounded-xl p-6 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <p className="text-tiffany-500 font-display text-2xl mb-1">{year}</p>
                  <h3 className="text-slate-800 font-semibold mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-tiffany-500 flex-shrink-0 z-10 glow" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching */}
      <section className="py-20 border-t border-tiffany-500/10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-10 md:p-14 text-center glow"
          >
            <p className="text-tiffany-500 text-xs tracking-[0.4em] uppercase mb-4">Education & Mentorship</p>
            <h2 className="font-display text-5xl text-slate-900 tracking-wider mb-6">
              PEARLBAY <span className="tiffany-gradient">INSTITUTE</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8">
              As a Visiting Music Production Lecturer at Sri Lanka's largest audio engineering institution,
              Yuki mentors 48 students in electronic music production — from FL Studio fundamentals
              through advanced mixing and sound design techniques.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['FL Studio', 'Electronic Production', 'Sound Design', 'Music Theory', 'Mixing & Mastering'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-4 py-2 rounded-full border border-tiffany-500/20 text-tiffany-600 tracking-widest uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
