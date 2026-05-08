import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Calculadora', href: '/#calculadora' },
  { label: 'Contacto', href: '/#contacto' },
];

interface NavbarProps {
  onOpenRegistration?: () => void;
}

export default function Navbar({ onOpenRegistration }: NavbarProps) {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isScrolled = scrollY > 50;

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleRegistrationClick = () => {
    setMobileOpen(false);
    onOpenRegistration?.();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Place Select"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-sm font-medium text-[#B0B0B0] hover:text-[#C9A962] transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C9A962] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              <span className="text-xs text-white">UF: $39.728</span>
              <Link
                to="/#contacto"
                onClick={() => handleNavClick('/#contacto')}
                className="px-5 py-2.5 bg-[#C9A962] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:brightness-110 transition-all duration-200"
              >
                Asesoría
              </Link>
              <button
                onClick={handleRegistrationClick}
                className="px-5 py-2.5 bg-[#C9A962] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:brightness-110 transition-all duration-200 ml-3"
              >
                Ingresar
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl pt-[72px]"
          >
            <div className="flex flex-col items-center gap-8 py-12">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xl font-medium text-[#B0B0B0] hover:text-[#C9A962] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/#contacto"
                onClick={() => handleNavClick('/#contacto')}
                className="mt-4 px-8 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg"
              >
                Asesoría
              </Link>
              <button
                onClick={handleRegistrationClick}
                className="mt-4 px-8 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg"
              >
                Ingresar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}