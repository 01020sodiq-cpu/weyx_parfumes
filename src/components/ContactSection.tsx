import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("Iltimos, barcha zaruriy maydonlarni to'ldiring.");
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-[#121414] border-t border-outline-variant/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Story/Information half */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <span className="text-primary font-label-sm text-xs uppercase tracking-[0.2em] font-medium">BOG'LANISH CHIZIG'I</span>
            <h2 className="font-headline-lg text-[40px] md:text-[48px] text-primary tracking-tight leading-tight">
              Sizga mos iforni birgalikda topamiz.
            </h2>
          </div>
          
          <p className="font-body-md text-on-surface-variant leading-relaxed text-base md:text-lg">
            Sizda maxsus ifor yaratish g'oyasi bormi yoki mos mahsulot tanlashda qiynalyapsizmi? 
            Bizning yetakchi kutyure-parfumerlarimiz sizga professional shaxsiy maslahat berishga va savollaringizga javob berishga tayyor.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-xl">location_on</span>
              <span>Toshkent sh., Sergeli tumani, Bon Mangal Restorani</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-xl">call</span>
              <a href="tel:+998935335268" className="hover:text-primary transition-colors font-semibold text-primary">+998 (93) 533-52-68</a>
            </div>
            <div className="flex items-center gap-4 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-xl">mail</span>
              <a href="mailto:info@weyx.uz" className="hover:text-primary transition-colors">info@weyx.uz</a>
            </div>
          </div>
        </div>

        {/* Form half */}
        <div className="glass-card p-8 md:p-12 border border-outline-variant/20 rounded-sm relative overflow-hidden flex flex-col justify-center min-h-[480px]">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display-lg text-2xl text-primary mb-2">Maslahat so'rash</h3>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    Ismingiz va telefon raqamingizni qoldiring, biz sizga tez fursatda qo'ng'iroq qilamiz.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#9a8f80] font-semibold">Ismingiz *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Misol: Shodiyor"
                      className="bg-transparent border-b border-outline/30 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#9a8f80] font-semibold font-mono">Telefon raqamingiz *</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+998 (93) 533-52-68"
                      className="bg-transparent border-b border-outline/30 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#9a8f80] font-semibold">Qiziqtirgan savolingiz yoki xabaringiz *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Qanday turdagi iforlarni yoqtirishingiz yoki qorishmalar haqida qisqacha yozing..."
                      rows={3}
                      className="bg-transparent border-b border-outline/30 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-[#412d00] font-label-sm text-xs uppercase tracking-widest hover:bg-primary-container transition-all font-semibold mt-4 cursor-pointer"
                  >
                    Maslahat olish uchun yuborish
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="submitted-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-6 py-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-primary/30 bg-[#121414] animate-bounce">
                  <span className="material-symbols-outlined text-primary text-4xl">send_and_archive</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display-lg text-2xl text-primary">Xabaringiz Qabul Qilindi!</h3>
                  <p className="font-body-md text-sm text-on-surface-variant max-w-sm mx-auto">
                    Hurmatli <strong className="text-on-surface font-semibold">{formData.name}</strong>, WEYX parfyumeriya uyi bilan bog'langaningiz uchun rahmat. Shaxsiy parfyumer-konsultantimiz siz bilan tez orada bog'lanadi.
                  </p>
                </div>

                <p className="font-body-md text-xs text-on-surface-variant italic max-w-sm mx-auto">
                  Siz bilan bog'lanish uchun ko'rsatilgan telefonga qo'ng'iroq qilamiz. Maslahat mutlaqo bepul.
                </p>

                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all font-label-sm text-xs uppercase tracking-widest cursor-pointer"
                >
                  Yangi so'rov qoldirish
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
