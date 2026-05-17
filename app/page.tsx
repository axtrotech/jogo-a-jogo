export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-3xl border border-green-500 shadow-2xl text-center max-w-2xl">
        
        <h1 className="text-5xl font-black text-green-400 mb-6">
          JOGO A JOGO
        </h1>

        <p className="text-zinc-300 text-xl mb-8">
          Plataforma automática para transformar prints de apostas em análises profissionais.
        </p>

        <div className="border-2 border-dashed border-green-500 rounded-3xl p-10 bg-black">
          <p className="text-2xl font-bold text-green-400 mb-4">
            📤 Enviar Imagem
          </p>

          <p className="text-zinc-400">
            Arraste ou clique para enviar seu bilhete.
          </p>
        </div>

        <button className="mt-8 bg-green-500 hover:bg-green-400 transition-all text-black font-black px-10 py-4 rounded-2xl text-xl">
          GERAR TEXTO
        </button>
      </div>
    </div>
  );
}