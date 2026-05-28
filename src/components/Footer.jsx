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
    <footer 
    className="relative z-10"
    style={{
      background: 'linear-gradient(180deg, rgba(224,217,251,0.95) 0%, rgba(240,236,254,0.98) 100%)',
      color: '#2b2640'
    }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          {/* Left: Large title */}
          <div className="flex-1 flex items-center">
            <h2 className="font-display text-[#8b3dff] leading-tight" style={{ fontSize: 'clamp(3rem,8vw,6.5rem)', margin: 0, fontWeight: 700, letterSpacing: '0.06em' }}>
              Wageesha Diaz
            </h2>
          </div>

          {/* Divider */}
          <div className="hidden md:flex items-center">
            <div style={{ width: 1, height: '64%', background: 'linear-gradient(to bottom, rgba(139,61,255,0.25), rgba(118,48,215,0.15))' }} />
          </div>

          {/* Right: stacked info */}
          <div className="w-full md:w-72 flex flex-col items-start md:items-end justify-center gap-4">
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-[#8b3dff] hover:bg-[#8b3dff] hover:text-white transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <div className="text-xs text-slate-600">© {new Date().getFullYear()} Wageesha Diaz</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
