```tsx
"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl);
      setLoading(true);
      setText("");
      setGeneratedText("");

      const result = await Tesseract.recognize(file, "eng");

      const extractedText = result.data.text;

      setText(extractedText);

      // IA SIMULADA GERANDO TEXTO PADRÃO
      const aiText = `
 const aiText = `
🏆 Premier League

⚽ Chelsea vs Manchester City
🕓 11:00 (BR)

🎯 SUGESTÃO DE APOSTA:

✅ Manchester City vence
✅ Mais de 9 escanteios
✅ Jeremy Doku — 1+ chutes

📈 Odd Total: 7.00

💡 Bilhete muito interessante para um jogo grande e intenso, combinando favoritismo do Manchester City com mercados ofensivos.

🔥 Entrada agressiva com excelente potencial de retorno.
`;
      setGeneratedText(aiText);

      setLoading(false);
    }
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
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-zinc-900 rounded-3xl border border-green-500 p-10 shadow-2xl">

        <h1 className="text-5xl font-black text-green-400 text-center mb-4">
          JOGO A JOGO
        </h1>

        <p className="text-center text-zinc-400 text-lg mb-10">
          Upload automático de apostas com OCR + IA
        </p>

        {/* UPLOAD */}
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

        {/* LOADING */}
        {loading && (
          <div className="mt-10 text-center">
            <p className="text-3xl font-black text-green-400">
              🤖 Lendo imagem...
            </p>
          </div>
        )}

        {/* PREVIEW */}
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

        {/* TEXTO OCR */}
        {text && (
          <div className="mt-10 bg-black border border-green-500 rounded-3xl p-6">
            <h2 className="text-2xl font-black text-green-400 mb-4">
              Texto identificado
            </h2>

            <pre className="whitespace-pre-wrap text-zinc-300">
              {text}
            </pre>
          </div>
        )}

        {/* TEXTO IA */}
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
```
