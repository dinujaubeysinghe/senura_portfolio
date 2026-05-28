import { motion } from 'framer-motion'

export default function Events() {
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
          <p className="text-slate-400 text-sm mb-6 tracking-widest uppercase">Events</p>
          <h1 className="font-display text-6xl mb-6">Live Events & Appearances</h1>
          <p className="text-slate-500">Upcoming performances, MC gigs, and public appearances. Check back for schedules and booking details.</p>
        </div>
      </section>
    </motion.div>
  )
}
