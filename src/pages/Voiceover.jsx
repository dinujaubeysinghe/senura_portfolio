import { motion } from 'framer-motion'
import voice1 from '../assets/voice/wv1.png'
import voice2 from '../assets/voice/wv2.png'
import voice3 from '../assets/voice/wv3.png'
import voice4 from '../assets/voice/wv4.png'

const reels = [
  { title: 'Facebook Voiceover', img: voice1 },
  { title: 'TikTok Voiceover', img: voice2 },
  { title: 'YouTube Voiceover', img: voice3 },
  { title: 'Commercial Voiceover', img: voice4 },
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
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#8b3dff] font-bold text-xs mb-6 tracking-widest uppercase">Voiceover</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-5xl mb-8">Voiceover & Announcer</motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-slate-500 max-w-2xl mx-auto mb-8">Professional voiceover reels, narration, and on-stage announcing services. Contact for bookings and demos.</motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {reels.map((r) => (
              <motion.article
                key={r.title}
                className="mx-auto w-full max-w-[360px] rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-200"
                variants={{ hidden: { opacity: 0, y: 18, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } } }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-full h-56 sm:h-44 bg-slate-800 flex items-center justify-center">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 bg-transparent text-left">
                  <h3 className="font-medium text-sm text-slate-900">{r.title}</h3>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
