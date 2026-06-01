import { motion, useAnimationFrame } from 'framer-motion'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaPhone, FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from 'react-icons/fa'

// ─── Data ─────────────────────────────────────────────────────────────────────
const socials = [
  { icon: FaInstagram, href: 'https://www.instagram.com/__sew__sh___?igsh=MTNkbmtxbXJkbTJwZQ%3D%3D&utm_source=qr', label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,0.08)' },
  { icon: FaFacebook,  href: 'https://www.facebook.com/share/1DoDxnTtTZ/?mibextid=wwXIfr',                       label: 'Facebook',  color: '#1877F2', bg: 'rgba(24,119,242,0.08)' },
  { icon: FaWhatsapp,  href: 'https://wa.me/94702077889',                                                         label: 'WhatsApp', color: '#25D366', bg: 'rgba(37,211,102,0.08)' },
  { icon: FaTiktok,    href: 'https://www.tiktok.com/@voice_arts?_r=1&_t=ZS-96jKMzNPFx6',                        label: 'TikTok',   color: '#555',    bg: 'rgba(0,0,0,0.06)'    },
]

const marqueeText = 'BOOKINGS · COLLABORATIONS · EVENTS · VOICEOVER · COMMENTARY · '

// ─── Marquee strip ────────────────────────────────────────────────────────────
function Marquee() {
  const trackRef = useRef(null)
  const xRef     = useRef(0)
  const SPEED    = 0.6

  useAnimationFrame(() => {
    const el = trackRef.current
    if (!el) return
    xRef.current -= SPEED
    const half = el.scrollWidth / 2
    if (Math.abs(xRef.current) >= half) xRef.current = 0
    el.style.transform = `translateX(${xRef.current}px)`
  })

  const repeated = marqueeText.repeat(8)

  return (
    <div
      className="relative overflow-hidden py-4 border-y border-[#8b3dff]/10"
      style={{ background: 'linear-gradient(90deg, rgba(139,61,255,0.03) 0%, rgba(10,186,181,0.03) 100%)' }}
    >
      {/* fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, white, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, white, transparent)' }} />

      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {[repeated, repeated].map((t, i) => (
          <span key={i} className="text-[10px] font-bold tracking-[0.35em] text-[#8b3dff]/40 mr-0">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Floating label input ─────────────────────────────────────────────────────
function FloatingInput({ label, name, type = 'text', placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <label
        className="absolute left-4 transition-all duration-200 pointer-events-none z-10"
        style={{
          top:      active ? '6px'   : '50%',
          transform: active ? 'translateY(0) scale(0.75)' : 'translateY(-50%) scale(1)',
          transformOrigin: 'left',
          fontSize:  '12px',
          color:     focused ? '#8b3dff' : '#94a3b8',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ''}
        className="w-full rounded-xl px-4 text-slate-700 text-sm transition-all duration-200 outline-none"
        style={{
          paddingTop:    active ? '22px' : '14px',
          paddingBottom: '10px',
          background:    'white',
          border:        focused ? '1.5px solid #8b3dff' : '1px solid #eae4fe',
          boxShadow:     focused ? '0 0 0 3px rgba(139,61,255,0.08), inset 3px 0 0 #8b3dff' : 'inset 3px 0 0 #eae4fe',
        }}
      />
    </div>
  )
}

// ─── Floating label textarea ──────────────────────────────────────────────────
function FloatingTextarea({ label, name, placeholder, value, onChange, required, rows = 5 }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <label
        className="absolute left-4 transition-all duration-200 pointer-events-none z-10"
        style={{
          top:       active ? '8px'  : '16px',
          fontSize:  '12px',
          color:     focused ? '#8b3dff' : '#94a3b8',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          transform: active ? 'scale(0.75)' : 'scale(1)',
          transformOrigin: 'left',
        }}
      >
        {label}
      </label>
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={rows}
        placeholder={focused ? placeholder : ''}
        className="w-full rounded-xl px-4 text-slate-700 text-sm transition-all duration-200 outline-none resize-none"
        style={{
          paddingTop:    active ? '24px' : '16px',
          paddingBottom: '12px',
          background:    'white',
          border:        focused ? '1.5px solid #8b3dff' : '1px solid #eae4fe',
          boxShadow:     focused ? '0 0 0 3px rgba(139,61,255,0.08), inset 3px 0 0 #8b3dff' : 'inset 3px 0 0 #eae4fe',
        }}
      />
    </div>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
    />
  )
}

// ─── Hero letter animation ────────────────────────────────────────────────────
const letterVariants = {
  hidden:  { opacity: 0, y: 60,  rotateX: -40 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function AnimatedWord({ text, className }) {
  return (
    <span className={`inline-flex ${className}`} style={{ perspective: '600px' }}>
      {text.split('').map((ch, i) => (
        <motion.span key={i} custom={i} variants={letterVariants} initial="hidden" animate="visible"
          className="inline-block" style={{ transformOrigin: 'bottom' }}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </motion.span>
      ))}
    </span>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' })
  const [sent,    setSent]    = useState(false)
  const [sending, setSending] = useState(false)
  const [error,   setError]   = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setSending(false)
      setError('Email form is not configured yet. Add your EmailJS keys in .env and try again.')
      return
    }

    try {
      await emailjs.send(serviceId, templateId, {
        to_email:   'diaz.wageesha@gmail.com',
        from_name:  form.name,
        from_email: form.email,
        reply_to:   form.email,
        subject:    form.subject,
        message:    form.message,
      }, { publicKey })

      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError('Something went wrong while sending the message. Please try again.')
      console.error('EmailJS submit failed:', err)
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-24"
    >

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative py-28 text-center overflow-hidden bg-white">

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(10,186,181,0.22) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Animated orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,61,255,0.14) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(10,186,181,0.14) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,61,255,0.06) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#8b3dff] font-bold text-xs tracking-[0.4em] uppercase mb-5"
          >
            Get In Touch
          </motion.p>

          {/* Cinematic staggered heading (single-line) */}
          <div className="overflow-hidden mb-3">
            <motion.h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider">
              <motion.span
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-block mr-5 text-slate-900"
              >
                LET'S
              </motion.span>
              <motion.span
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-block tiffany-gradient"
              >
                TALK
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-slate-400 text-sm tracking-widest mt-6"
          >
            Bookings, collaborations, features, and general enquiries
          </motion.p>
        </div>
      </section>

      {/* ── Marquee strip ─────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-12">

          {/* ── Left: contact info ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-10"
          >
            {/* Direct contact */}
            <div>
              <p className="text-[#8b3dff] font-bold text-xs tracking-[0.4em] uppercase mb-5">Direct Contact</p>
              <div className="space-y-3">
                {[
                  { icon: FaEnvelope, href: 'mailto:support.diaz@gmail.com', label: 'Email',  value: 'support.diaz@gmail.com', size: 16 },
                  { icon: FaPhone,    href: 'tel:+94702077889',                label: 'Phone',  value: '+94 70 207 7889',         size: 14 },
                ].map(({ icon: Icon, href, label, value, size }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex items-center gap-4 rounded-xl p-4 group transition-all duration-300"
                    style={{ border: '1px solid #eae4fe', background: 'white' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(139,61,255,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#eae4fe'}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0"
                      style={{ background: 'rgba(139,61,255,0.08)' }}
                    >
                      <Icon className="text-[#8b3dff]" size={size} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="text-slate-700 text-sm group-hover:text-slate-900 transition-colors">{value}</p>
                    </div>
                    <span className="ml-auto text-[#8b3dff]/40 group-hover:text-[#8b3dff] transition-colors text-xs">↗</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Socials grid */}
            <div>
              <p className="text-[#8b3dff] font-bold text-xs tracking-[0.4em] uppercase mb-5">Follow Along</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, href, label, color, bg }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl py-5 px-3 text-center group transition-all duration-300 cursor-pointer"
                    style={{ border: '1px solid #eae4fe', background: 'white' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = color + '44'
                      e.currentTarget.style.background   = bg
                      e.currentTarget.style.boxShadow   = `0 8px 24px ${color}18`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#eae4fe'
                      e.currentTarget.style.background   = 'white'
                      e.currentTarget.style.boxShadow   = 'none'
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ background: bg }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <span className="text-slate-500 group-hover:text-slate-900 text-xs font-medium tracking-wide transition-colors">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-5"
              style={{ background: 'linear-gradient(135deg, rgba(139,61,255,0.06), rgba(10,186,181,0.06))', border: '1px solid rgba(139,61,255,0.12)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-600 text-xs font-bold tracking-widest uppercase">Available for Bookings</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Weddings · Corporate Events · Cricket Commentary · Brand Promotions
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: form ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-14 text-center h-full flex flex-col items-center justify-center gap-6"
                style={{ border: '1px solid #eae4fe', background: 'white', boxShadow: '0 20px 60px rgba(139,61,255,0.07)' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(139,61,255,0.12), rgba(10,186,181,0.1))' }}
                >
                  <motion.span
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="text-[#8b3dff] text-3xl"
                  >✓</motion.span>
                </motion.div>
                <div>
                  <h3 className="font-display text-3xl text-slate-900 tracking-wider mb-3">MESSAGE SENT</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Thank you for reaching out.<br />We'll be in touch soon.</p>
                </div>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="text-[#8b3dff] hover:text-[#7a3cff] text-xs tracking-widest uppercase underline transition-colors mt-2"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 space-y-5"
                style={{ border: '1px solid #eae4fe', background: 'white', boxShadow: '0 20px 60px rgba(139,61,255,0.05)' }}
              >
                <div className="mb-7">
                  <p className="text-[#8b3dff] font-bold text-xs tracking-[0.4em] uppercase mb-1">Send a Message</p>
                  <p className="text-slate-400 text-xs">Fill in the details below and I'll get back to you.</p>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <FloatingInput label="Your Name"     name="name"  placeholder="Senura Wageesha"      value={form.name}  onChange={handleChange} required />
                  <FloatingInput label="Email Address" name="email" placeholder="senura@example.com" type="email" value={form.email} onChange={handleChange} required />
                </div>

                <FloatingInput label="Subject" name="subject" placeholder="e.g. Booking, Collaboration" value={form.subject} onChange={handleChange} required />

                <FloatingTextarea label="Message" name="message" placeholder="Tell us more about your event or enquiry..." value={form.message} onChange={handleChange} required rows={6} />

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={sending ? {} : { scale: 1.02, backgroundColor: '#7630d7' }}
                  whileTap={sending ? {} : { scale: 0.98 }}
                  className="w-full font-semibold text-sm py-4 rounded-xl tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 text-white"
                  style={{
                    background: sending ? 'rgba(139,61,255,0.5)' : '#8b3dff',
                    boxShadow: sending ? 'none' : '0 4px 20px rgba(139,61,255,0.25)',
                    cursor: sending ? 'not-allowed' : 'pointer',
                  }}
                >
                  {sending ? (
                    <><Spinner /> Sending...</>
                  ) : (
                    <>Send Message <span className="text-white/70">↗</span></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}