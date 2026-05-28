import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaSpotify, FaPlay, FaEnvelope  } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'
import banner from '../assets/wageesha_backg.png'

const stats = [
  { value: '9.3M', label: 'Streams in 2024' },
  { value: '398K', label: 'Monthly Listeners' },
  { value: '161', label: 'Countries Reached' },
  { value: '3×', label: 'Top Sri Lankan Artist' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
        <section
          ref={containerRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.35), rgba(255,255,255,0.35)), url(${banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(10,186,181,0.18) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(10,186,181,0.12) 0%, transparent 70%)' }}
          />
          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(10,186,181,0.25) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >

          <div className="overflow-hidden mb-2"></div>
          <div className="overflow-hidden mb-8 mt-20">
            <motion.h1
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display text-[clamp(4rem,14vw,11rem)] leading-none tracking-wider tiffany-gradient"
            >
            WAGEESHA
            </motion.h1>
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display text-[clamp(4rem,14vw,11rem)] leading-none tracking-wider text-slate-900"
            >
              DIAZ
            </motion.h1>
          </div>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-white text-sm md:text-base tracking-widest uppercase mb-12"
          >
            Compere · Announcer · Voiceover Artist · Sri Lanka
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/contact"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary font-semibold text-xs px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <FaEnvelope />
              Contact Me
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <HiArrowDown className="text-[#7630d7]" size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section 
      className="relative z-10 py-24 border-y  section-alt"
      style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white p-8 text-center"
              >
                <p className="font-display text-5xl md:text-6xl tiffany-gradient mb-2">{value}</p>
                <p className="text-slate-400 text-xs tracking-widest uppercase">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured section */}
      <section className="relative z-10 py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#7630d7] font-bold text-xs tracking-[0.4em] uppercase mb-4">The Compere</p>
              <h2 className="font-display text-5xl md:text-6xl text-slate-900 tracking-wider mb-6 leading-tight">
                VOICE OF <br />
                <span className="tiffany-gradient">A NEW ERA</span>
              </h2>
              <p className="text-slate-650 leading-relaxed mb-8">
                Born in the hills of Kandy, trained in traditional Kandyan dance, Yuki Navaratne brings
                a rare fusion of Sri Lankan heritage and modern electronic music. Hip-hop, R&B, trap,
                and world sounds — all woven into one distinct voice.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-[#8b3dff] hover:text-[#7630d7] text-sm font-medium tracking-widest uppercase transition-colors duration-300 group"
              >
                Read Full Story
                <span className="w-8 h-px bg-[#8b3dff] group-hover:w-12 transition-all duration-300" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-dark rounded-2xl p-8 glow">
                <p className="text-[#8b3dff] text-xs tracking-widest uppercase mb-6">Latest Releases · 2025</p>
                {['18 Wannam', 'Aathin Mathin', 'Hamadama', 'Hayyo'].map((track, i) => (
                  <motion.div
                    key={track}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-center justify-between py-3 border-b border-tiffany-500/10 last:border-0 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-slate-300 text-xs font-mono w-4">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-slate-600 group-hover:text-slate-900 text-sm transition-colors">{track}</span>
                    </div>
                    <FaPlay size={10} className="text-slate-300 group-hover:text-[#8b3dff] transition-colors" />
                  </motion.div>
                ))}
                <Link
                  to="/events"
                  className="mt-6 block text-center text-xs text-[#8b3dff] hover:text-[#7630d7] tracking-widest uppercase transition-colors"
                >
                  View all Events →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section 
      className="relative z-10 py-20 overflow-hidden section-alt"
      style={{ backgroundColor: 'white' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#8b3dff]/8 via-[#8b3dff]/4 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display text-6xl md:text-8xl tracking-widest text-slate-900 mb-6">
              LET'S <span className="tiffany-gradient">CONNECT</span>
            </p>
            <p className="text-slate-400 text-sm mb-8 tracking-widest">
              Bookings, collaborations, and enquiries
            </p>
            <Link
              to="/contact"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary font-semibold text-xs px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <FaEnvelope />
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
