import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      question: "O GymNotes é totalmente gratuito?",
      answer: "Sim! Nossa missão é democratizar o acesso a treinos organizados e eficientes. Todas as funcionalidades principais são 100% gratuitas.",
    },
    {
      question: "Posso acessar pelo celular enquanto treino?",
      answer: "Com certeza. A interface foi projetada para ser rápida e adaptável a qualquer tela. Basta acessar pelo navegador do seu celular durante o treino para marcar suas séries.",
    },
    {
      question: "Consigo compartilhar meu treino com meus amigos?",
      answer: "Atualmente, você já consegue visualizar os perfis de outros usuários cadastrados na plataforma. A funcionalidade de compartilhamento direto de fichas já está no nosso radar de desenvolvimento!",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-zinc-950 relative border-t border-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Perguntas <span className="text-emerald-500">Frequentes</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Ainda tem dúvidas? Respondemos as principais perguntas da comunidade.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-zinc-100">{faq.question}</span>
                <ChevronDown
                  className={`text-emerald-500 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                    }`}
                  size={20}
                />
              </button>

              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-0 text-zinc-400 leading-relaxed border-t border-zinc-800/50 mx-6 mt-2 pt-4">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
