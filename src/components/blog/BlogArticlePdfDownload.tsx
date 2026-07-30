'use client';

import { Download } from 'lucide-react';

type BlogArticlePdfDownloadProps = {
  label?: string;
  fileName?: string;
};

export function BlogArticlePdfDownload({
  label = 'Descargar ejercicios en PDF',
  fileName = 'ejercicios',
}: BlogArticlePdfDownloadProps) {
  const handleDownload = () => {
    const previousTitle = document.title;
    document.title = fileName;
    window.print();
    document.title = previousTitle;
  };

  return (
    <div className="not-prose my-8 print-hidden">
      <button
        type="button"
        onClick={handleDownload}
        className="inline-flex items-center gap-2 rounded-xl bg-coral-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-coral-700"
      >
        <Download className="h-4 w-4" aria-hidden />
        {label}
      </button>
      <p className="mt-2 text-sm text-slate-500">
        Se abrirá el diálogo de impresión de tu navegador. Elige «Guardar como PDF» para descargar el mismo contenido del artículo.
      </p>
    </div>
  );
}
