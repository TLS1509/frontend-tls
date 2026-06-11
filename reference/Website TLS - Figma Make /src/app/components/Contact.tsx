import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@thelearningsociety.fr",
      link: "mailto:contact@thelearningsociety.fr",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+33 1 23 45 67 89",
      link: "tel:+33123456789",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "Paris, France",
      link: "https://maps.google.com",
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <h2 style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-6)'
              }}>
                Contactez-nous
              </h2>
              <p style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xl)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--foreground)'
              }}>
                Vous avez des questions ? Vous souhaitez en savoir plus sur nos formations ? 
                N'hésitez pas à nous contacter.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.icon === MapPin ? "_blank" : undefined}
                  rel={info.icon === MapPin ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-4 group transition-all duration-300"
                  style={{ 
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--neutral-50)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div 
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ 
                      backgroundColor: 'var(--primary-50)',
                      borderRadius: 'var(--radius-xl)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-100)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-50)';
                    }}
                  >
                    <info.icon style={{ color: 'var(--primary-500)' }} size={20} />
                  </div>
                  <div>
                    <div 
                      className="text-sm mb-1" 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        color: 'var(--neutral-600)'
                      }}
                    >
                      {info.label}
                    </div>
                    <div style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)'
                    }}>
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form with Glassmorphism */}
          <Card 
            className="relative overflow-hidden"
            style={{ 
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-2xl)',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <CardContent className="p-8 lg:p-10">
              <h3 style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-2)'
              }}>
                Envoyez-nous un message
              </h3>
              <p style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-8)'
              }}>
                Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block mb-2" 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)'
                    }}
                  >
                    Nom complet *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jean Dupont"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email" 
                    className="block mb-2" 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)'
                    }}
                  >
                    Adresse email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="phone" 
                    className="block mb-2" 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)'
                    }}
                  >
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="message" 
                    className="block mb-2" 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)'
                    }}
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Parlez-nous de votre projet, de vos besoins..."
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full group">
                  Envoyer le message
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>

                <p 
                  className="text-sm text-center" 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    color: 'var(--neutral-600)'
                  }}
                >
                  En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}