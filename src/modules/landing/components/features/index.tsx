import { motion } from "framer-motion";
import { Activity, BarChart3, Users } from "lucide-react"; // Importe os ícones que fazem sentido

export function Features() {
  const featuresList = [
    {
      icon: <Activity size={32} className="text-emerald-500" />,
      title: "Treinos Personalizados",
      desc: "Monte suas fichas adaptadas ao seu objetivo, com separação avançada de músculos.",
    },
    {
      icon: <BarChart3 size={32} className="text-emerald-500" />,
      title: "Acompanhamento Real",
      desc: "Monitore cargas, séries, repetições e seu IMC em tempo real em um único lugar.",
    },
    {
      icon: <Users size={32} className="text-emerald-500" />,
      title: "Comunidade",
      desc: "Conecte-se com outros usuários, compartilhe rotinas e busque o próximo nível de motivação.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950 relative border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto">

        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ferramentas de <span className="text-emerald-500">Alto Rendimento</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Tudo o que você precisa para extrair 100% do seu potencial na academia, sem distrações.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {featuresList.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-emerald-500/50 hover:bg-zinc-900 transition-colors group relative overflow-hidden"
            >
              {/* Ícone de marca d'água no fundo (aparece sutilmente no hover) */}
              <div className="absolute -top-4 -right-4 p-8 opacity-0 group-hover:opacity-5 transition-opacity scale-150">
                {item.icon}
              </div>

              {/* Ícone Principal */}
              <div className="bg-zinc-950 w-14 h-14 rounded-xl flex items-center justify-center border border-zinc-800 mb-6 group-hover:border-emerald-500/30 group-hover:scale-110 transition-all shadow-lg">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-zinc-100 mb-3">
                {item.title}
              </h3>

              <p className="text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}