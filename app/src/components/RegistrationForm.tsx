import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface RegistrationFormProps {
  onSuccess?: () => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically send data to your backend
    console.log('Registration data:', formData);
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
      });
      onSuccess?.();
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {showSuccess ? (
        <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 text-center mb-8">
          <h3 className="text-green-400 font-semibold mb-2">¡Registro exitoso!</h3>
          <p className="text-green-200">Gracias por registrarte. Nos pondremos en contacto contigo pronto.</p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center mb-6">Registro de Clientes</h2>
          <p className="text-center text-[#B0B0B0] mb-8">
            Completa tus datos para recibir información exclusiva sobre nuestros proyectos
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-white mb-1">
                  Nombre completo
                </label>
                <Input
                  id="nombre"
                  type="text"
                  name="nombre"
                  autoComplete="name"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Juan Pérez González"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-white mb-1">
                Teléfono de contacto
              </label>
              <Input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  autoComplete="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+56 9 1234 5678"
                  required
                  disabled={isSubmitting}
                />
              </div>
            
            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-white mb-1">
                Mensaje (opcional)
              </label>
              <Textarea
                  id="mensaje"
                  name="mensaje"
                  autoComplete="off"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="¿En qué tipo de proyecto estás interesado?"
                  rows={4}
                  disabled={isSubmitting}
              />
            </div>
            
            <Button
              type="submit"
              variant="default"
              className="w-full py-3 px-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Registrarse'}
            </Button>
          </form>
        </>
      )}
    </motion.div>
  );
}