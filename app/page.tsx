"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-zinc-900 border border-green-500 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-black text-green-400 text-center mb-4">
          JOGO A JOGO
        </h1>

        <p className="text-center text-zinc-400 mb-10 text-lg">
          Envie uma imagem e gere análises automáticas.
        </p>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-green-500 rounded-3xl p-16 text-center cursor-pointer hover:bg-zinc-800 transition-all"
        >
          <input {...getInputProps()} />

          <p className="text-3xl mb-4">📤</p>

          <p className="text-2xl font-bold text-green-400">
            Clique ou arraste uma imagem
          </p>

          <p className="text-zinc-500 mt-4">
            PNG, JPG ou JPEG
          </p>
        </div>

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
      </div>
    </div>
  );
}