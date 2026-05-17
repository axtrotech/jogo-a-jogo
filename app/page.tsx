"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";

export default function JogoAJogoApp() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  function generateBetText(text: string) {
    const lower = text.toLowerCase();

    let competition = "Competição não identificada";
    let suggestion = "Mercado não identificado";
    let odd = "Não identificada";

    if (lower.includes("premier")) competition = "Premier League";
    if (lower.includes("bundesliga")) competition = "Bundesliga";
    if (lower.includes("ambas marcam")) suggestion = "Ambas Marcam — SIM";
    if (lower.includes("mais 2.5") || lower.includes("mais 2,5")) suggestion = "Mais de 2.5 gols";
    if (lower.includes("visitante")) suggestion = "Vitória do visitante";

    const oddMatch = text.match(/[0-9]+\.[0-9]+/);

    if (oddMatch) odd = oddMatch[0];

    return `🏆 ${competition}

🎯 SUGESTÃO DE APOSTA:

✅ ${suggestion}

📈 Odd: ${odd}

💡 Entrada gerada automaticamente através da imagem enviada.

🔥 Excelente opção para múltiplas e apostas conservadoras.`;
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setLoading(true);

    const result = await Tesseract.recognize(file, "eng");

    const extractedText = result.data.text;

    setOcrText(extractedText);
    setGeneratedText(generateBetText(extractedText));
    setLoading(false);
  }, []);

  const copyText = async () => {
    await navigator.clipboard.writeText(generatedText);
    alert("Texto copiado com sucesso!");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="border-b border-green-500 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-black border-4 border-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
              <span className="text-3xl font-black text-green-500">J</span>
            </div>

            <div>
              <h1 className="text-3xl font-black text-green-400 tracking-wide">
                JOGO A JOGO
              </h1>
              <p className="text-zinc-400 text-sm">
                Transforme imagens em análises automáticas
              </p>
            </div>
          </div>

          <button className="bg-green-500 hover:bg-green-400 transition-all px-6 py-3 rounded-2xl text-black font-black shadow-lg">
            ENVIAR BILHETE
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="bg-green-500/10 text-green-400 border border-green-500 px-4 py-2 rounded-full text-sm font-bold">
            LEITOR AUTOMÁTICO DE APOSTAS
          </span>

          <h2 className="text-5xl font-black leading-tight mt-6">
            Envie a imagem do jogo e gere textos profissionais automaticamente.
          </h2>

          <p className="text-zinc-400 text-lg mt-6 leading-relaxed">
            Sistema desenvolvido para transformar prints de apostas em textos prontos para Instagram, Telegram e grupos de apostas seguindo seu padrão profissional.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            <button className="bg-green-500 hover:bg-green-400 transition-all text-black font-black px-8 py-4 rounded-2xl shadow-xl">
              COMEÇAR AGORA
            </button>

            <button className="border border-zinc-700 hover:border-green-500 transition-all px-8 py-4 rounded-2xl font-bold">
              VER DEMONSTRAÇÃO
            </button>
          </div>
        </div>

        {/* UPLOAD CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="border-2 border-dashed border-green-500 rounded-3xl p-14 text-center bg-black hover:bg-zinc-950 transition-all cursor-pointer">
            <div className="w-24 h-24 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500">
              <span className="text-5xl">📤</span>
            </div>

            <h3 className="text-3xl font-black text-green-400 mb-4">
              Enviar Imagem
            </h3>

            <p className="text-zinc-400 text-lg">
              Arraste a imagem da aposta ou clique para selecionar.
            </p>
          </div>
        </div>
      </section>

      {/* PASSO A PASSO */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-green-400">
            COMO FUNCIONA
          </h2>
          <p className="text-zinc-400 mt-4 text-lg">
            Processo simples e automático em poucos segundos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-500 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-green-500 text-black font-black text-2xl flex items-center justify-center mb-6">
              1
            </div>

            <h3 className="text-2xl font-black mb-4 text-green-400">
              Envie o Print
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Faça upload da imagem do jogo, bilhete ou aposta diretamente no sistema.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-500 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-green-500 text-black font-black text-2xl flex items-center justify-center mb-6">
              2
            </div>

            <h3 className="text-2xl font-black mb-4 text-green-400">
              IA Analisa
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              O sistema identifica automaticamente odds, mercados, horário e confrontos.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-500 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-green-500 text-black font-black text-2xl flex items-center justify-center mb-6">
              3
            </div>

            <h3 className="text-2xl font-black mb-4 text-green-400">
              Texto Pronto
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Receba automaticamente a análise pronta no padrão profissional para postar.
            </p>
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-4xl font-black text-green-400">
                PREVIEW DO RESULTADO
              </h2>
              <p className="text-zinc-400 mt-2">
                Exemplo de texto gerado automaticamente.
              </p>
            </div>

            <button className="bg-green-500 hover:bg-green-400 transition-all px-6 py-3 rounded-2xl text-black font-black">
              COPIAR TEXTO
            </button>
          </div>

          <div className="bg-black rounded-3xl border border-green-500 p-8 space-y-6 text-lg">
            <div>
              <p className="text-zinc-500">🏆 Premier League</p>
            </div>

            <div>
              <p className="text-3xl font-black">
                ⚽ Chelsea vs Manchester City
              </p>
              <p className="text-zinc-400 mt-2">🕓 11:00 (BR)</p>
            </div>

            <div>
              <p className="text-green-400 font-black text-2xl mb-4">
                🎯 SUGESTÃO DE APOSTA:
              </p>

              <div className="space-y-3 text-xl">
                <p>✅ Manchester City vence</p>
                <p>✅ Mais de 9 escanteios</p>
                <p>✅ Jeremy Doku — 1+ chutes</p>
                <p>✅ Pedro Neto — 1+ chutes</p>
              </div>
            </div>

            <div>
              <p className="text-zinc-500 mb-2">📈 Odd Total</p>
              <p className="text-5xl font-black text-green-400">7.00</p>
            </div>

            <div className="bg-green-500/10 border border-green-500 rounded-2xl p-6">
              <p className="text-zinc-300 leading-relaxed">
                💡 Entrada agressiva com excelente potencial de retorno, utilizando mercados ofensivos e favoritismo técnico do Manchester City.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
