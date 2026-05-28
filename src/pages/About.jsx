import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import aboutWage from '../assets/wageesha_abouts.png'

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
      <section
        className="relative overflow-hidden bg-white h-screen flex items-end justify-center pb-20 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.55)), url(${aboutWage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
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
            className="text-[#8b3dff] font-bold text-xs tracking-[0.4em] uppercase mb-4"
          >
            The Story
          </motion.p>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider text-slate-900 mb-6"
          >
            ABOUT <span className="tiffany-gradient">Diaz</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-slate-650 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Patti Vidanalage Senura Wageesha Dias — professionally known as Wageesha Diaz.
            A Sri Lankan compere and announcer known for creating powerful audience connections through voice, presence, and performance.
          </motion.p>
        </div>
      </section>

      {/* Bio */}
        <section
          className="py-4 border-t border-[#eae4fe] section-alt"
          style={{
      background: 'linear-gradient(180deg, rgba(224,217,251,0.95) 0%, rgba(240,236,254,0.98) 100%)',
      color: '#2b2640'
    }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-[#8b3dff] text-xs font-bold tracking-[0.4em] uppercase my-5">Background</p>
              <h2 className="font-display text-4xl text-slate-900 tracking-wider mb-4">
                BEHIND THE MIC<br />BEYOND THE CROWD
              </h2>
            </div>
            <p className="text-slate-650 leading-relaxed text-md">
             Born in Bentota, my passion for communication and stage performance began during my school years. My journey started as a young announcer, confidently hosting school events and developing a strong connection with audiences through my voice and stage presence.
            </p>
            <p className="text-slate-650 leading-relaxed text-md">
             During my time at Kalutara Vidyalaya, I proudly served as the Debate Captain for four consecutive years, which helped me strengthen my leadership, confidence, and public speaking skills. I also worked as the Radio Director of the school media club, where I further explored my creativity and passion for broadcasting.
            </p>
            <p className="text-slate-650 leading-relaxed text-md">
              Driven by my love for media and professional announcing, I later completed my training at Athula Ransirilal's Lanka Television and Radio Academy (LTRA). Today, I am a TVEC-approved and registered announcer, actively working in wedding compering, cricket commentary, brand promotions, and a wide variety of indoor and outdoor events. 
            </p>
            <p className="text-slate-650 leading-relaxed text-md">
              Through every stage, event, and audience, I continue to bring energy, professionalism, and memorable experiences to every performance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-px bg-[#8b3dff] " />
              <p className="text-slate-600 text-xs tracking-widest ">SENURA WAGEESHA DIAS, SRI LANKA</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats counter */}
      <section className="py-20 border-t border-[#eae4fe] bg-white">
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
      <section className="py-20 border-t border-[#eae4fe] section-alt">
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
      <section className="py-20 border-t border-[#eae4fe] bg-white">
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
