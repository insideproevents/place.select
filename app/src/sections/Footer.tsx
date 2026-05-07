import { Link } from 'react-router';
import { Instagram, Facebook, Linkedin, Mail, Phone } from 'lucide-react';

const footerLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Calculadora', href: '/#calculadora' },
  { label: 'Contacto', href: '/#contacto' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contacto@placeselect.cl', label: 'Email' },
  { icon: Phone, href: 'tel:+56212345678', label: 'Teléfono' },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/logo.png"
            alt="Place Select"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => {
                if (link.href.startsWith('/#')) {
                  const id = link.href.replace('/#', '');
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-sm font-medium text-[#B0B0B0] hover:text-[#C9A962] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-[#666666] hover:text-[#C9A962] hover:border-[#C9A962]/30 transition-all"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Copyright */}
        <div className="text-center space-y-2">
          <p className="text-xs text-[#666666]">
            © 2026 Place Select. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#666666]">
            Powered by Place Select Inmobiliaria
          </p>
        </div>
      </div>
    </footer>
  );
}
