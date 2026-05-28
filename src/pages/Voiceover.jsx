import { motion } from 'framer-motion'
import demo1 from '../assets/wageesha_backg.png'
import demo2 from '../assets/wageesha_abouts.png'
import demo3 from '../assets/wageesha_logo.png'

const reels = [
  { title: 'Commercial Reel', length: '0:45', img: demo1 },
  { title: 'Narration Demo', length: '1:20', img: demo2 },
  { title: 'Promos & Trailers', length: '0:55', img: demo3 },
  { title: 'Event Announcing', length: '0:40', img: demo1 },
]

export default function Voiceover() {
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
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#8b3dff] font-bold text-sm mb-6 tracking-widest uppercase">Voiceover</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-5xl mb-8">Voiceover & Announcer</motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-slate-500 max-w-2xl mx-auto mb-8">Professional voiceover reels, narration, and on-stage announcing services. Contact for bookings and demos.</motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {reels.map((r) => (
              <motion.article
                key={r.title}
                className="rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-200"
                variants={{ hidden: { opacity: 0, y: 18, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } } }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-full h-44 bg-slate-800 flex items-center justify-center">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 bg-transparent text-left">
                  <h3 className="font-medium text-sm text-slate-100">{r.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Length: {r.length}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
