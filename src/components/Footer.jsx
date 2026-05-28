import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok} from 'react-icons/fa'
import { SiApplemusic } from 'react-icons/si'
import { Link } from 'react-router-dom'

const socials = [
  { icon: FaInstagram, href: 'https://www.instagram.com/__sew__sh___?igsh=MTNkbmtxbXJkbTJwZQ%3D%3D&utm_source=qr', label: 'Instagram' },
  { icon: FaFacebook, href: 'https://www.facebook.com/share/1DoDxnTtTZ/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: FaWhatsapp, href: 'https://wa.me/94702077889', label: 'WhatsApp' },
  { icon: FaTiktok, href: 'https://www.tiktok.com/@voice_arts?_r=1&_t=ZS-96jKMzNPFx6', label: 'TikTok' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-tiffany-500/10 bg-light-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl tracking-widest tiffany-gradient">Wageesha Diaz</p>
            <p className="text-slate-400 text-xs tracking-widest mt-1 uppercase">Official Portfolio</p>
          </div>

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
            © {new Date().getFullYear()} Wageesha Diaz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
