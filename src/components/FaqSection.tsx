import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/galleryData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="preguntas" className="py-24 bg-[#1B140E] border-b border-[#3D2C20]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E8AF50]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Dudas Frecuentes</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F7EFE6] text-balance">
            Preguntas Frecuentes
          </h2>
          <p className="text-sm text-[#C7B5A6]">
            Todo lo que necesitas saber sobre el área máxima de corte de 40 cm, espesor 3 mm, acabados y entregas personales.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#211812] border border-[#3D2C20] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#2A1F17] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#F7EFE6]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#E8AF50] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#C7B5A6] leading-relaxed border-t border-[#33251B]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
