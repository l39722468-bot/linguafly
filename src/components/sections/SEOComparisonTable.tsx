import React from 'react';
import { Check, X, Star } from 'lucide-react';

const comparisonData = [
  {
    name: 'Linguafly',
    focus: 'Domino A1-C2 / Fluidez',
    time: '90 días',
    ia: 'Avanzada (Tutor 24/7)',
    rating: 5,
    highlight: true
  },
  {
    name: 'Duolingo',
    focus: 'Juego / Vocabulario',
    time: 'Indefinido',
    ia: 'Básica',
    rating: 3,
    highlight: false
  },
  {
    name: 'Babbel',
    focus: 'Gramática / General',
    time: 'Medio/Largo',
    ia: 'Media',
    rating: 4,
    highlight: false
  },
  {
    name: 'ELSA Speak',
    focus: 'Pronunciación',
    time: 'Complementario',
    ia: 'Especializada',
    rating: 4.5,
    highlight: false
  }
];

export const SEOComparisonTable = () => {
  return (
    <div className="my-12 overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
        <thead>
          <tr className="bg-slate-50">
            <th className="p-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">Característica</th>
            {comparisonData.map((app) => (
              <th key={app.name} className={`p-4 text-center text-sm font-bold uppercase tracking-wider ${app.highlight ? 'bg-coral-50 text-coral-600' : 'text-slate-900'}`}>
                {app.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr>
            <td className="p-4 font-bold text-slate-700">Enfoque Principal</td>
            {comparisonData.map((app) => (
              <td key={app.name} className={`p-4 text-center text-sm text-slate-600 ${app.highlight ? 'bg-coral-50/30' : ''}`}>
                {app.focus}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-bold text-slate-700">Tiempo de Fluidez</td>
            {comparisonData.map((app) => (
              <td key={app.name} className={`p-4 text-center text-sm text-slate-600 ${app.highlight ? 'bg-coral-50/30' : ''}`}>
                {app.time}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-bold text-slate-700">Inteligencia Artificial</td>
            {comparisonData.map((app) => (
              <td key={app.name} className={`p-4 text-center text-sm text-slate-600 ${app.highlight ? 'bg-coral-50/30' : ''}`}>
                {app.ia}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-bold text-slate-700">Valoración</td>
            {comparisonData.map((app) => (
              <td key={app.name} className={`p-4 text-center ${app.highlight ? 'bg-coral-50/30' : ''}`}>
                <div className="flex justify-center items-center gap-1">
                  <span className="font-bold text-slate-900">{app.rating}</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-bold text-slate-700">Resultado Real</td>
            {comparisonData.map((app) => (
              <td key={app.name} className={`p-4 text-center ${app.highlight ? 'bg-coral-50/30' : ''}`}>
                {app.highlight ? (
                  <div className="flex justify-center"><Check className="text-emerald-500" /></div>
                ) : (
                  <div className="flex justify-center"><X className="text-slate-300" /></div>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
