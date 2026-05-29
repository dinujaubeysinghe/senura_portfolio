import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import aboutWage from '../assets/wageesha_abouts.png'

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

// ─── CountUp component ────────────────────────────────────────────────────────
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

// ─── Timeline item component (scroll-reactive, reverses on scroll up) ─────────
function TimelineItem({ i, tag, title, desc, detail }) {
  const [open, setOpen] = useState(false)
  const isLeft = i % 2 === 0
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'start 30%'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  })

  const x = useTransform(
    smoothProgress,
    [0, 1],
    [isLeft ? -60 : 60, 0]
  )
  const opacity = useTransform(smoothProgress, [0, 0.4], [0, 1])
  const scale = useTransform(smoothProgress, [0, 1], [0.92, 1])

  const dotScale = useTransform(smoothProgress, [0.3, 0.8], [0, 1])
  const dotOpacity = useTransform(smoothProgress, [0.3, 0.8], [0, 1])

  return (
    <motion.div
      ref={ref}
      className="relative grid items-center mb-14"
      style={{ gridTemplateColumns: '1fr 40px 1fr' }}
    >
      {/* Card */}
      <div
        className={`${isLeft ? 'col-start-1 text-right' : 'col-start-3 text-left'} cursor-pointer`}
        onClick={() => setOpen(o => !o)}
      >
        <motion.div
          style={{
            x,
            opacity,
            scale,
            border: open ? '1.5px solid rgba(139,61,255,0.4)' : '1px solid #eae4fe',
            boxShadow: open ? '0 8px 32px rgba(139,61,255,0.12)' : '0 2px 12px rgba(139,61,255,0.04)',
            transition: 'border 0.3s, box-shadow 0.3s',
          }}
          whileHover={{ scale: 1.025, y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="bg-white rounded-2xl p-5 relative overflow-hidden"
        >

          {/* Gradient shimmer on hover */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(139,61,255,0.05), rgba(10,186,181,0.04))' }}
          />

          {/* Tag pill */}
          <span
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
            style={{
              border: '0.5px solid rgba(139,61,255,0.3)',
              color: '#8b3dff',
              background: 'rgba(139,61,255,0.06)',
            }}
          >
            {tag}
          </span>

          {/* Title */}
          <h3 className="text-slate-800 font-semibold mb-2 text-sm tracking-wide">{title}</h3>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>

          {/* Expandable detail */}
          <motion.div
            initial={false}
            animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-slate-500 text-xs leading-relaxed mt-3 pt-3 border-t border-[#eae4fe]">
              {detail}
            </p>
          </motion.div>

          {/* Expand arrow */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 text-[#8b3dff] text-xs opacity-50"
            style={isLeft ? { left: 20 } : { right: 20 }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="col-start-2 flex items-center justify-center z-10">
        <motion.div
          style={{
            scale: dotScale,
            opacity: dotOpacity,
            background: 'linear-gradient(135deg, #8b3dff, #0abab5)',
            boxShadow: '0 0 0 5px rgba(139,61,255,0.12), 0 0 16px rgba(139,61,255,0.2)',
          }}
          whileHover={{ scale: 1.5 }}
          className="w-3.5 h-3.5 rounded-full flex-shrink-0 cursor-pointer"
        />
      </div>

      {/* Empty opposite column */}
      <div className={isLeft ? 'col-start-3' : 'col-start-1'} />
    </motion.div>
  )
}

// ─── Timeline data ─────────────────────────────────────────────────────────────
const timelineData = [
  {
    tag: 'Beginnings',
    title: 'School Stage Debut',
    desc: 'Began hosting school events in Bentota, discovering a natural gift for connecting with audiences through voice and presence.',
    detail: 'Served as Debate Captain at Kalutara Vidyalaya for four consecutive years, building the leadership and public speaking foundations that define his style today.',
  },
  {
    tag: 'Broadcasting',
    title: 'Radio Director',
    desc: 'Led the school media club as Radio Director, sharpening creative instincts and his passion for live broadcasting.',
    detail: 'Deepened expertise in pacing, voice modulation, and audience engagement — core skills that distinguish every performance.',
  },
  {
    tag: 'Training',
    title: 'LTRA Certification',
    desc: "Completed professional training at Athula Ransirilal's Lanka Television and Radio Academy (LTRA).",
    detail: "Became a TVEC-approved and registered announcer, meeting Sri Lanka's national standard for broadcasting and live event compering.",
  },
  {
    tag: 'Events',
    title: 'Wedding & Events Career',
    desc: 'Established a strong presence in wedding compering, cricket commentary, brand promotions, and both indoor and outdoor events.',
    detail: 'Built a reputation for energy, professionalism, and creating unforgettable audience experiences right across Sri Lanka.',
  },
  {
    tag: 'Recognition',
    title: 'National Recognition',
    desc: "Recognised as one of Sri Lanka's leading comperes and announcers, bringing a distinct voice to every stage and broadcast.",
    detail: 'Continuing to grow a brand built on professionalism, warmth, and the ability to command any room — from intimate weddings to national-scale events.',
  },
]

// ─── Scroll-reactive spine ────────────────────────────────────────────────────
function TimelineSpine() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const scaleY = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
      style={{
        scaleY,
        background: 'linear-gradient(to bottom, #8b3dff 0%, #0abab5 70%, transparent 100%)',
      }}
    />
  )
}

// ─── Main About component ─────────────────────────────────────────────────────
export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-24"
    >

      {/* ── Hero Header ─────────────────────────────────────────────────────── */}
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
            A Sri Lankan compere and announcer known for creating powerful audience connections
            through voice, presence, and performance.
          </motion.p>
        </div>
      </section>

      {/* ── Bio ─────────────────────────────────────────────────────────────── */}
      <section
        className="py-4 border-t border-[#eae4fe]"
        style={{
          background: 'linear-gradient(90deg, #bff7f0 0%, #dbe9ff 35%, #eddcff 70%, #8b3dff 100%)',
          color: '#2b2640',
        }}
      >
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
              Born in Bentota, my passion for communication and stage performance began during my school years.
              My journey started as a young announcer, confidently hosting school events and developing a
              strong connection with audiences through my voice and stage presence.
            </p>
            <p className="text-slate-650 leading-relaxed text-md">
              During my time at Kalutara Vidyalaya, I proudly served as the Debate Captain for four
              consecutive years, which helped me strengthen my leadership, confidence, and public speaking
              skills. I also worked as the Radio Director of the school media club, where I further explored
              my creativity and passion for broadcasting.
            </p>
            <p className="text-slate-650 leading-relaxed text-md">
              Driven by my love for media and professional announcing, I later completed my training at
              Athula Ransirilal's Lanka Television and Radio Academy (LTRA). Today, I am a TVEC-approved
              and registered announcer, actively working in wedding compering, cricket commentary, brand
              promotions, and a wide variety of indoor and outdoor events.
            </p>
            <p className="text-slate-650 leading-relaxed text-md">
              Through every stage, event, and audience, I continue to bring energy, professionalism, and
              memorable experiences to every performance.
            </p>
            <div className="flex items-center gap-3 pt-2 pb-6">
              <div className="w-8 h-px bg-[#8b3dff]" />
              <p className="text-slate-600 text-xs tracking-widest">SENURA WAGEESHA DIAS, SRI LANKA</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Counter ────────────────────────────────────────────────────── */}
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

      {/* ── Timeline ─────────────────────────────────────────────────────────── */}
      <section
        className="py-20 border-t border-[#eae4fe] relative overflow-hidden"
        style={{ background: 'white' }}
      >
        {/* Ambient floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const colors = [
              'rgba(139,61,255,0.35)',
              'rgba(10,186,181,0.35)',
              'rgba(191,247,240,0.5)',
              'rgba(221,190,255,0.4)',
            ]
            const size = 3 + (i % 5)
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: `${8 + (i * 4.5) % 84}%`,
                  top: `${5 + (i * 7) % 90}%`,
                  background: colors[i % colors.length],
                }}
                animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 4 + (i % 4),
                  delay: (i * 0.4) % 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#8b3dff] font-bold text-xs tracking-[0.4em] uppercase mb-3">Milestones</p>
            <h2 className="font-display text-5xl text-slate-900 tracking-wider">
              THE <span className="tiffany-gradient">JOURNEY</span>
            </h2>
            <p className="text-slate-400 text-xs tracking-widest mt-4">TAP ANY CARD TO REVEAL MORE</p>
          </motion.div>

          {/* Spine + items */}
          <div className="relative">
            <TimelineSpine />
            {timelineData.map((item, i) => (
              <TimelineItem key={item.title} i={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Teaching / Pearlbay ─────────────────────────────────────────────── */}
      <section className="py-20 border-t border-[#eae4fe] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-10 md:p-14 text-center glow"
          >
            <p className="text-tiffany-500 text-xs tracking-[0.4em] uppercase mb-4">Education</p>
            <h2 className="font-display text-5xl text-slate-900 tracking-wider mb-6">
              PEARLBAY <span className="tiffany-gradient">INSTITUTE</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8">
              As a Visiting Music Production Lecturer at Sri Lanka's largest audio engineering institution,
              Wageesha mentors students in electronic music production — from FL Studio fundamentals
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