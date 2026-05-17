"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  function generateBetText(text: string) {
    const lower = text.toLowerCase();

    let competition = "Competição não identificada";
    let suggestion = "Mercado não identificado";
    let odd = "Não identificada";

    if (lower.includes("premier")) {
      competition = "Premier League";
    }

    if (lower.includes("bundesliga")) {
      competition = "Bundesliga";
    }

    if (lower.includes("ambas marcam")) {
      suggestion = "Ambas Marcam — SIM";
    }

    if (lower.includes("mais 2.5") || lower.includes("mais 2,5")) {
      suggestion = "Mais de 2.5 gols";
    }

    if (lower.includes("visitante")) {
      suggestion = "Vitória do visitante";
    }

    const oddMatch = text.match(/\d+\.\d+/);

    if (oddMatch) {
      odd = oddMatch[0];
    }

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
    setGeneratedText("");

    const result = await Tesseract.recognize(file, "eng");

    const extractedText = result.data.text;

    setOcrText(extractedText);

    const finalText = generateBetText(extractedText);

    setGeneratedText(finalText);

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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-zinc-900 border border-green-500 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-black text-green-400 text-center mb-4">
          JOGO A JOGO
        </h1>

        <p className="text-center text-zinc-400 text-lg mb-10">
          OCR automático + geração de texto
        </p>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-green-500 rounded-3xl p-16 text-center cursor-pointer hover:bg-zinc-800 transition-all"
        >
          <input {...getInputProps()} />

          <p className="text-5xl mb-4">📤</p>

          <p className="text-2xl font-bold text-green-400">
            Clique ou arraste uma imagem
          </p>

          <p className="text-zinc-500 mt-4">
            PNG, JPG ou JPEG
          </p>
        </div>

        {loading && (
          <div className="mt-10 text-center">
            <p className="text-3xl font-black text-green-400">
              🤖 Lendo imagem...
            </p>
          </div>
        )}

        {image && (
          <div className="mt-10">
            <h2 className="text-2xl font-black text-green-400 mb-4">
              Preview da imagem
            </h2>

            <img
              src={image}
              alt="preview"
              className="rounded-3xl border border-green-500"
            />
          </div>
        )}

        {ocrText && (
          <div className="mt-10 bg-black border border-green-500 rounded-3xl p-6">
            <h2 className="text-2xl font-black text-green-400 mb-4">
              Texto identificado
            </h2>

            <pre className="whitespace-pre-wrap text-zinc-300">
              {ocrText}
            </pre>
          </div>
        )}

        {generatedText && (
          <div className="mt-10 bg-black border border-green-500 rounded-3xl p-6">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-green-400">
                Texto Gerado
              </h2>

              <button
                onClick={copyText}
                className="bg-green-500 hover:bg-green-400 text-black font-black px-6 py-3 rounded-2xl"
              >
                COPIAR
              </button>
            </div>

            <pre className="whitespace-pre-wrap text-zinc-300 text-lg">
              {generatedText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

