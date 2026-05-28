import { motion } from 'framer-motion'
import cover1 from '../assets/wageesha_backg.png'
import cover2 from '../assets/wageesha_abouts.png'
import cover3 from '../assets/wageesha_logo.png'

const sampleEvents = [
  { title: 'City Gala 2026', date: 'Jun 12, 2026', place: 'Colombo City Hall', img: cover1 },
  { title: 'Corporate Awards', date: 'Jul 03, 2026', place: 'Galle Face', img: cover2 },
  { title: 'Wedding MC – Silva', date: 'Aug 21, 2026', place: 'Bentota Beach', img: cover3 },
  { title: 'Cricket Commentary', date: 'Sep 05, 2026', place: 'R Premadasa Stadium', img: cover1 },
  { title: 'Brand Launch', date: 'Oct 11, 2026', place: 'Cinnamon Grand', img: cover2 },
  { title: 'Festival Stage', date: 'Nov 19, 2026', place: 'Kandy Grounds', img: cover3 },
]

export default function Events() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-24"
    >
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#8b3dff] font-bold text-sm mb-6 tracking-widest uppercase">Events</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-5xl mb-8">Live Events & Appearances</motion.h1>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {sampleEvents.map((ev) => (
              <motion.article
                key={ev.title}
                className="rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-200"
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
                }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-full h-56 bg-slate-800">
                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 bg-transparent text-left">
                  <h3 className="font-medium text-sm text-slate-100">{ev.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{ev.date} · {ev.place}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
