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
    className="relative z-10 overflow-hidden"
    style={{
      background: '#f0f1f5',
      color: '#2b2640'
    }}>
      <div aria-hidden style={{ position: 'absolute', left: '-80px', top: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(18px)' }} />
      <div aria-hidden style={{ position: 'absolute', right: '-90px', bottom: '-90px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,61,255,0.14) 0%, rgba(139,61,255,0) 70%)', filter: 'blur(22px)' }} />
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="flex flex-col md:flex-row items-stretch gap-8">
          {/* Left: Large title */}
          <div className="flex-1 flex items-center justify-center">
            <h2 className="font-display text-[#7a3cff] leading-tight" style={{ fontSize: 'clamp(3rem,8vw,7rem)', margin: 0, fontWeight: 800, letterSpacing: '0.04em', textShadow: '0 10px 28px rgba(122,60,255,0.14)', display: 'inline-block', transform: 'scaleX(1.08)' }}>
              Wageesha Diaz
            </h2>
          </div>

          {/* Divider */}
          <div className="hidden md:flex items-center">
            <div style={{ width: 1, height: '62%', background: 'linear-gradient(to bottom, rgba(122,60,255,0.22), rgba(122,60,255,0.05))' }} />
          </div>

          {/* Right: stacked info */}
          <div className="w-full md:w-72 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-3 justify-center w-full">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/45 backdrop-blur-sm flex items-center justify-center text-[#7a3cff] hover:bg-white hover:text-[#6a2ed9] transition-all duration-200 border border-white/40"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <div className="text-xs text-slate-600/90 text-center w-full">
              © {new Date().getFullYear()} Wageesha Diaz.All rights reserved. 
            </div>
            <div className="text-[10px] text-slate-600/90 text-center w-full">
              Made by
              <span > </span> 
              <span className="font-semibold underline hover:text-[#7a3cff] hover:scale-105 transition-transform"><a href="https://wa.me/94766154657" target="_blank" rel="noopener noreferrer">Dinuja</a></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
