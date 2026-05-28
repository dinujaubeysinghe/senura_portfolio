import { motion } from 'framer-motion'

export default function Voiceover() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-24"
    >
      <section className="py-20 text-center bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-slate-400 text-sm mb-6 tracking-widest uppercase">Voiceover</p>
          <h1 className="font-display text-6xl mb-6">Voiceover & Announcer</h1>
          <p className="text-slate-500">Professional voiceover reels, narration, and on-stage announcing services. Contact for bookings and demos.</p>
        </div>
      </section>
    </motion.div>
  )
}
