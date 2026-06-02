import { motion } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'
import cover1 from '../assets/wageesha_backg.png'
import cover2 from '../assets/wageesha_abouts.png'
import cover3 from '../assets/wageesha_logo.png'
import event1 from '../assets/events/wevent1.jpeg'
import event2 from '../assets/events/wageesha_ourdoor.jpeg'
import event3 from '../assets/events/wevent3.jpeg'
import event4 from '../assets/events/wevent4.jpeg'
import event5 from '../assets/events/wevent5.jpeg'
import event6 from '../assets/events/wevent6.jpeg'
import event7 from '../assets/events/wevent7.jpeg'

const sampleEvents = [
  { title: 'Cricket Commentary',  place: 'Galle International Cricket Stadium',   img: event1, url: 'https://youtube.com/shorts/Iz-BwRwS3fw' },
  { title: 'Brand Promotion',     place: 'Piyara Fashion Moratuwa',  img: event2, url: 'https://youtube.com/shorts/HbPShN3djAA' },
  { title: 'Concert Announcing',    place: 'De Soyza Stadium Moratuwa',        img: event3, url: 'https://youtube.com/shorts/zw1Iq19TPFU?feature=share' },
  { title: 'Awurudu Uthsawa',    place: 'Danketiya Public Ground', img: event4, url: 'https://youtube.com/shorts/UVM5Rx5P8No?feature=share' },
  { title: 'Indoor Function',          place: 'French Villa Katukurunda',      img: event5, url: 'https://youtube.com/shorts/nhgDu6ZRgBA?feature=share' },
  { title: 'Wedding Compere',       place: 'Sea Gate Katukurunda',       img: event6, url: 'https://youtu.be/309OCmJV3_M' },
  { title: 'Outdoor Events',       place: 'Lotus Tower',       img: event7, url: 'https://youtu.be/w9yLiLnYMNM' },
]

function EventCard({ ev }) {
  return (
    <motion.article
      key={ev.title}
      className="relative rounded-2xl overflow-hidden group cursor-pointer block"
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      whileHover={{ scale: 1.03, y: -4 }}
      style={{ aspectRatio: '9 / 16' }}
    >
      <img
        src={ev.img}
        alt={ev.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)', opacity: 0.78 }}
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(139,61,255,0.85)', backdropFilter: 'blur(4px)' }}>
          <FaPlay size={14} className="text-white ml-1" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-xs font-semibold tracking-widest uppercase">{ev.title}</p>
        <p className="text-slate-200 text-[11px] mt-2 tracking-wide">{ev.date} · {ev.place}</p>
      </div>

      <motion.a
        href={ev.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        aria-label={`Open ${ev.title}`}
        onClick={e => e.stopPropagation()}
      />
    </motion.article>
  )
}

export default function Events() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-24"
    >
      <section className="py-24 bg-white border-t border-[#eae4fe]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#8b3dff] font-bold text-xs tracking-[0.4em] uppercase text-center mb-5"
          >
            Events
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-6xl text-slate-900 tracking-wider text-center mb-4"
          >
            THE <span className="tiffany-gradient">EXPERIENCE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-slate-500 text-sm md:text-base text-center max-w-2xl mx-auto mb-12"
          >
            A curated look at the live events, stage moments, and appearances that shape the energy of every booking.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {sampleEvents.map((ev) => (
              <EventCard key={ev.title} ev={ev} />
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}