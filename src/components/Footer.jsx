import { FaInstagram, FaFacebook, FaYoutube, FaSpotify } from 'react-icons/fa'
import { SiApplemusic } from 'react-icons/si'
import { Link } from 'react-router-dom'

const socials = [
  { icon: FaSpotify, href: 'https://open.spotify.com/artist/00ZpGGB5F7Ytw781Qsr1sR', label: 'Spotify' },
  { icon: SiApplemusic, href: 'https://music.apple.com/lk/artist/yuki-navaratne/1472878536', label: 'Apple Music' },
  { icon: FaInstagram, href: 'https://www.instagram.com/yuki_beatz', label: 'Instagram' },
  { icon: FaFacebook, href: 'https://www.facebook.com/yukinavaratneofficial/', label: 'Facebook' },
  { icon: FaYoutube, href: 'https://www.youtube.com/user/Yukissnet', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-tiffany-500/10 bg-light-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl tracking-widest tiffany-gradient">YUKI NAVARATNE</p>
            <p className="text-slate-400 text-xs tracking-widest mt-1 uppercase">Official Website</p>
          </div>

          <nav className="flex gap-4">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/music', label: 'Music' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-slate-400 hover:text-tiffany-500 text-xs tracking-widest uppercase transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full glass-dark flex items-center justify-center text-slate-400 hover:text-tiffany-500 hover:border-tiffany-500/30 transition-all duration-300 hover:scale-110"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-tiffany-500/10 text-center">
          <p className="text-slate-300 text-xs tracking-widest">
            © {new Date().getFullYear()} Yuki Navaratne. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
