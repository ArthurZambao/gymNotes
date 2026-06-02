import { motion } from "framer-motion";
import { ClipboardList, Target, TrendingUp } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Target size={32} className="text-emerald-500" />,
      title: "1. Configure seu Perfil",
      desc: "Crie sua conta gratuitamente, insira suas medidas iniciais, peso e defina seu biotipo e objetivo principal.",
    },
    {
      icon: <ClipboardList size={32} className="text-emerald-500" />,
      title: "2. Crie suas Fichas",
      desc: "Monte seus treinos dividindo por músculos. Escolha os exercícios, defina o número de séries e carga inicial.",
    },
    {
      icon: <TrendingUp size={32} className="text-emerald-500" />,
      title: "3. Treine e Evolua",
      desc: "Acompanhe tudo pelo celular na academia. Marque o que já fez, visualize o histórico e quebre seus próprios recordes.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950 relative border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Como o <span className="text-emerald-500">GymNotes</span> funciona?
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Três passos simples separam você de treinos mais eficientes e focados.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 relative">
          {/* Linha conectora apenas no Desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 -z-0"></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.05)] relative">
                {step.icon}
                <div className="absolute inset-0 rounded-full border border-emerald-500/30 scale-110 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-3">{step.title}</h3>
              <p className="text-zinc-400 leading-relaxed max-w-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
