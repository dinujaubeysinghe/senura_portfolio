import { AnimatePresence, motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlay, FaEnvelope, FaMicrophone, FaRing, FaBroadcastTower, FaTrophy } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'
import banner from '../assets/wageesha_backg.png'
import event1 from '../assets/wageesha_ourdoor.jpeg'
import event2 from '../assets/events/wevent1.jpeg'
import event3 from '../assets/events/wevent3.jpeg'
import event4 from '../assets/events/wevent5.jpeg'

// ─── Fade up variant ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

// ─── CTA words ────────────────────────────────────────────────────────────────
const ctaWords = ['CONNECT', 'CONVERSE','CELEBRATE']

// ─── Experience data ──────────────────────────────────────────────────────────
const experiences = [
  {
    id: '01',
    image: event1,   // replace with your actual image path
    title: 'Outdoor Event',
    videoUrl: 'https://youtube.com/shorts/HbPShN3djAA',
  },
  {
    id: '02',
    image: event2,
    title: 'Cricket Commentary',
    videoUrl: 'https://youtube.com/shorts/Iz-BwRwS3fw',
  },
  {
    id: '03',
    image: event3,
    title: 'Concert Announcing',
    videoUrl: 'https://youtube.com/shorts/zw1Iq19TPFU?feature=share',
  },
  {
    id: '04',
    image: event4,
    title: 'Indoor Function',
    videoUrl: 'https://youtube.com/shorts/nhgDu6ZRgBA?feature=share',
  },
]

// ─── Rotating CTA word ────────────────────────────────────────────────────────
const wordStateStyles = {
  enter:  { transform: 'perspective(600px) rotateX(-90deg) translateY(60%)',  opacity: 0, transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s cubic-bezier(0.4,0,0.2,1)' },
  active: { transform: 'perspective(600px) rotateX(0deg)   translateY(0%)',   opacity: 1, transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s cubic-bezier(0.4,0,0.2,1)' },
  exit:   { transform: 'perspective(600px) rotateX(90deg)  translateY(-60%)', opacity: 0, transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s cubic-bezier(0.4,0,0.2,1)' },
}

function RotatingWord({ currentIndex }) {
  const [states, setStates] = useState(ctaWords.map((_, i) => (i === 0 ? 'active' : 'enter')))
  const prevIndex = useRef(0)
  const animating = useRef(false)

  useEffect(() => {
    if (currentIndex === prevIndex.current || animating.current) return
    animating.current = true
    const prev = prevIndex.current
    const next = currentIndex
    prevIndex.current = next
    setStates(s => s.map((_, i) => { if (i === prev) return 'exit'; if (i === next) return 'enter'; return s[i] }))
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setStates(s => s.map((state, i) => (i === next ? 'active' : state)))
    }))
    setTimeout(() => {
      setStates(s => s.map((state, i) => (i === prev ? 'enter' : state)))
      animating.current = false
    }, 600)
  }, [currentIndex])

  return (
    <div style={{ overflow: 'hidden', height: 'clamp(4rem, 12vw, 9rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '600px' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {ctaWords.map((word, i) => (
          <span key={word} className="tiffany-gradient font-display whitespace-nowrap"
            style={{ position: 'absolute', fontSize: 'clamp(3.5rem, 11vw, 8rem)', fontWeight: 500, letterSpacing: '0.1em', transformOrigin: 'center bottom', ...wordStateStyles[states[i]] }}
          >{word}</span>
        ))}
      </div>
    </div>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const num = parseFloat(value)
    const steps = 50
    let step = 0
    const timer = setInterval(() => {
      step++
      setDisplay(Math.round((num * step) / steps))
      if (step >= steps) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [isInView, value])

  return <span ref={ref}>{display}{suffix}</span>
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])
  const [ctaIndex, setCtaIndex] = useState(0)
  const timerRef = useRef(null)

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCtaIndex(i => (i + 1) % ctaWords.length), 3000)
  }

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current) }, [])

  // Scroll-driven heading for Experience section
  const expRef = useRef(null)
  const { scrollYProgress: expScroll } = useScroll({ target: expRef, offset: ['start end', 'start 30%'] })
  const headingX = useTransform(expScroll, [0, 1], [-60, 0])
  const headingOpacity = useTransform(expScroll, [0, 0.5], [0, 1])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.35), rgba(255,255,255,0.35)), url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(10,186,181,0.18) 0%, transparent 70%)' }} />
          <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(10,186,181,0.12) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(10,186,181,0.25) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
          <div className="overflow-hidden mb-8 mt-20">
            <motion.h1 custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="font-display text-[clamp(4rem,14vw,11rem)] leading-none tracking-wider tiffany-gradient">WAGEESHA</motion.h1>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="font-display text-[clamp(4rem,14vw,11rem)] leading-none tracking-wider text-slate-900">DIAZ</motion.h1>
          </div>
          <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="text-white text-sm md:text-base tracking-widest uppercase mb-12">
            Compere · Announcer · Voiceover Artist · Sri Lanka
          </motion.p>
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 btn-primary font-semibold text-xs px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <FaEnvelope /> Contact Me
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <HiArrowDown className="text-[#7630d7]" size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-[#7630d7] font-bold text-xs tracking-[0.4em] uppercase mb-4">The Compere</p>
              <h2 className="font-display text-5xl md:text-6xl text-slate-900 tracking-wider mb-6 leading-tight">
                VOICE OF <br /><span className="tiffany-gradient">A NEW ERA</span>
              </h2>
              <p className="text-slate-650 leading-relaxed mb-4">Step into a New Era of Sinhala Announcing!</p>
              <p className="text-slate-650 leading-relaxed mb-8">
                Bringing you unmatched energy, charisma, and professionalism, Wageesha Diaz is here to transform your special moments into unforgettable memories. Whether it's a wedding, corporate event, party, or celebration, the voice that elevates the atmosphere and connects with the crowd like no other.
              </p>
              <Link to="/about" className="inline-flex items-center gap-3 text-[#8b3dff] hover:text-[#7630d7] text-sm font-medium tracking-widest uppercase transition-colors duration-300 group">
                Read Full Story
                <span className="w-8 h-px bg-[#8b3dff] group-hover:w-12 transition-all duration-300" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
              <div className="glass-dark rounded-2xl p-8 glow">
                <p className="text-[#8b3dff] text-xs tracking-widest uppercase mb-6">Top Categories</p>
                {['Wedding Compere', 'Outdoor Event', 'Indoor Event', 'Commentary'].map((track, i) => (
                  <motion.div key={track} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-center justify-between py-3 border-b border-tiffany-500/10 last:border-0 group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-300 text-xs font-mono w-4">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-slate-600 group-hover:text-slate-900 text-sm transition-colors">{track}</span>
                    </div>
                    <FaPlay size={10} className="text-slate-300 group-hover:text-[#8b3dff] transition-colors" />
                  </motion.div>
                ))}
                <Link to="/events" className="mt-6 block text-center text-xs text-[#8b3dff] hover:text-[#7630d7] tracking-widest uppercase transition-colors">
                  View all Events →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE SECTION ══════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-t border-[#eae4fe]">
  <div className="max-w-7xl mx-auto px-6">

    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
      <h2 className="font-display text-5xl text-slate-900 tracking-wider">
        THE <span className="tiffany-gradient">EXPERIENCE</span>
      </h2>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {experiences.map((item, i) => (
        <motion.a
          key={item.id}
          href={item.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -4 }}
          className="relative rounded-2xl overflow-hidden group cursor-pointer block"
          style={{ aspectRatio: '9/16' }}
        >
          {/* Photo */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)', opacity: 0.7 }}
          />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(139,61,255,0.85)', backdropFilter: 'blur(4px)' }}>
              <FaPlay size={14} className="text-white ml-1" />
            </div>
          </div>

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-xs font-semibold tracking-widest uppercase">{item.title}</p>
          </div>
        </motion.a>
      ))}
    </div>
    <div className=" mt-12">
       <Link to="/events" className="inline-flex items-center gap-3 text-[#8b3dff] hover:text-[#7630d7] text-sm font-medium tracking-widest uppercase transition-colors duration-300 group">
                View All
                <span className="w-8 h-px bg-[#8b3dff] group-hover:w-12 transition-all duration-300" />
              </Link>
    </div>

  </div>
</section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 overflow-hidden" style={{ backgroundColor: 'white' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b3dff]/6 via-transparent to-[#0abab5]/6 pointer-events-none" />
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(139,61,255,0.12) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <motion.div animate={{ y: [-12, 12, -12], x: [-6, 6, -6] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-[10%] w-32 h-32 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,61,255,0.12), transparent 70%)' }} />
        <motion.div animate={{ y: [10, -10, 10], x: [6, -6, 6] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-10 right-[10%] w-40 h-40 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(10,186,181,0.12), transparent 70%)' }} />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[#8b3dff] font-bold text-xs tracking-[0.4em] uppercase mb-6">Ready when you are</motion.p>
            <p className="font-display text-[clamp(3.5rem,11vw,8rem)] tracking-widest text-slate-900 leading-none mb-1">LET&apos;S</p>
            <RotatingWord currentIndex={ctaIndex} />
            <div className="flex items-center justify-center gap-2 mt-5 mb-8">
              {ctaWords.map((_, i) => (
                <motion.button key={i} onClick={() => { setCtaIndex(i); startTimer() }}
                  animate={{ width: i === ctaIndex ? 24 : 6, background: i === ctaIndex ? '#8b3dff' : '#e2d9f3' }}
                  transition={{ duration: 0.3 }}
                  className="h-1.5 rounded-full cursor-pointer border-0 outline-none" style={{ minWidth: 6 }} />
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
              className="text-slate-400 text-sm mb-10 tracking-widest">Bookings, collaborations, and enquiries</motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }}>
              <Link to="/contact" className="inline-flex items-center gap-2 btn-primary font-semibold text-xs px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <FaEnvelope /> Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}