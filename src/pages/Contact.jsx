import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaInstagram, FaFacebook, FaYoutube, FaSpotify, FaPhone, FaEnvelope } from 'react-icons/fa'
import { SiApplemusic } from 'react-icons/si'

const socials = [
  { icon: FaSpotify, href: 'https://open.spotify.com/artist/00ZpGGB5F7Ytw781Qsr1sR', label: 'Spotify', color: '#1DB954' },
  { icon: SiApplemusic, href: 'https://music.apple.com/lk/artist/yuki-navaratne/1472878536', label: 'Apple Music', color: '#fc3c44' },
  { icon: FaInstagram, href: 'https://www.instagram.com/yuki_beatz', label: 'Instagram', color: '#E1306C' },
  { icon: FaFacebook, href: 'https://www.facebook.com/yukinavaratneofficial/', label: 'Facebook', color: '#1877F2' },
  { icon: FaYoutube, href: 'https://www.youtube.com/user/Yukissnet', label: 'YouTube', color: '#FF0000' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 1500)
  }

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
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider text-slate-900 mb-6"
          >
            LET'S <span className="tiffany-gradient">TALK</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm"
          >
            Bookings, collaborations, features, and general enquiries
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 border-t border-tiffany-500/10 section-alt">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <p className="text-tiffany-500 text-xs tracking-[0.4em] uppercase mb-6">Direct Contact</p>
              <div className="space-y-4">
                <a
                  href="mailto:yukissnet@gmail.com"
                  className="flex items-center gap-4 glass rounded-xl p-4 hover:border-tiffany-500/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-tiffany-500/10 flex items-center justify-center group-hover:bg-tiffany-500/20 transition-colors">
                    <FaEnvelope className="text-tiffany-500" size={16} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-widest">Email</p>
                    <p className="text-slate-600 group-hover:text-slate-900 text-sm transition-colors">yukissnet@gmail.com</p>
                  </div>
                </a>
                <a
                  href="tel:+94777779723"
                  className="flex items-center gap-4 glass rounded-xl p-4 hover:border-tiffany-500/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-tiffany-500/10 flex items-center justify-center group-hover:bg-tiffany-500/20 transition-colors">
                    <FaPhone className="text-tiffany-500" size={14} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-widest">Phone</p>
                    <p className="text-slate-600 group-hover:text-slate-900 text-sm transition-colors">+94 777 779 723</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <p className="text-tiffany-500 text-xs tracking-[0.4em] uppercase mb-6">Follow Along</p>
              <div className="space-y-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 glass rounded-xl p-3 hover:border-tiffany-500/20 transition-all duration-300 group hover:scale-[1.02]"
                  >
                    <Icon size={18} style={{ color }} />
                    <span className="text-slate-500 group-hover:text-slate-900 text-sm transition-colors">{label}</span>
                    <span className="ml-auto text-slate-300 text-xs">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-tiffany-500/15 flex items-center justify-center">
                  <span className="text-tiffany-500 text-2xl">✓</span>
                </div>
                <h3 className="font-display text-3xl text-slate-900 tracking-wider">MESSAGE SENT</h3>
                <p className="text-slate-400 text-sm">Thank you for reaching out. We'll be in touch soon.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="text-tiffany-500 hover:text-tiffany-600 text-xs tracking-widest uppercase underline transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                <p className="text-tiffany-500 text-xs tracking-[0.4em] uppercase mb-6">Send a Message</p>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">{label}</label>
                      <input
                        type={type}
                        name={name}
                        required
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 text-sm placeholder-slate-300 focus:outline-none focus:border-tiffany-500/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-tiffany-500/50 transition-colors"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="booking">Booking / Performance</option>
                    <option value="collab">Collaboration</option>
                    <option value="media">Media / Press</option>
                    <option value="general">General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us more..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 text-sm placeholder-slate-300 focus:outline-none focus:border-tiffany-500/50 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary disabled:opacity-60 font-semibold text-sm py-4 rounded-lg tracking-widest uppercase transition-all duration-300 shadow-md"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
