'use client';

import { useState } from 'react';
import { LevelCurriculum, CurriculumModule } from '@/lib/curriculum-data';

interface CurriculumSectionProps {
  curriculum: LevelCurriculum;
}

export default function CurriculumSection({ curriculum }: CurriculumSectionProps) {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 text-coral-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Nivel {curriculum.level} - {curriculum.cefr}
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            📚 Currículum Completo
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {curriculum.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
              <span className="font-semibold text-slate-700">Duración:</span>{' '}
              <span className="text-coral-600">{curriculum.duration}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
              <span className="font-semibold text-slate-700">Módulos:</span>{' '}
              <span className="text-coral-600">{curriculum.modules.length}</span>
            </div>
            {curriculum.examFormat && (
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                <span className="font-semibold text-slate-700">Examen:</span>{' '}
                <span className="text-coral-600">{curriculum.examFormat.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Exam Format (if available) */}
        {curriculum.examFormat && (
          <div className="mb-12 bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              🎓 Formato del Examen Oficial
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-semibold text-amber-800 mb-2">
                  {curriculum.examFormat.name}
                </p>
                <p className="text-amber-700">
                  Duración total: <span className="font-bold">{curriculum.examFormat.duration}</span>
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-2">Partes del Examen:</p>
                <ul className="space-y-1">
                  {curriculum.examFormat.parts.map((part, idx) => (
                    <li key={idx} className="text-amber-700 flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      {part}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Modules */}
        <div className="space-y-6">
          {curriculum.modules.map((module, index) => (
            <ModuleCard
              key={index}
              module={module}
              index={index}
              isExpanded={expandedModule === index}
              onToggle={() => toggleModule(index)}
            />
          ))}
        </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <a
          href={
            curriculum.level === 'A1' && curriculum.cefr === 'Principiante Premium'
              ? '/aula/a1_premium'
              : `/curso-${curriculum.level.toLowerCase()}`
          }
          className="inline-block bg-gradient-to-r from-coral-600 to-peach-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-coral-700 hover:to-peach-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          {curriculum.cefr === 'Principiante Premium' ? "Comenzar el Curso Premium Ahora →" : `Comenzar Nivel ${curriculum.level} Ahora →`}
        </a>
          <p className="mt-4 text-slate-600">
            Acceso ilimitado por <span className="font-bold text-coral-600">€6.99/mes</span> o{' '}
            <span className="font-bold text-peach-600">€14.99/mes</span> (Premium sin anuncios)
          </p>
        </div>
      </div>
    </section>
  );
}

interface ModuleCardProps {
  module: CurriculumModule;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ModuleCard({ module, index, isExpanded, onToggle }: ModuleCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border-2 border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Module Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="bg-coral-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
            {index + 1}
          </div>
          <h3 className="text-xl font-bold text-slate-900 text-left">{module.title}</h3>
        </div>
        <div className="text-slate-400">
          {isExpanded ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </button>

      {/* Module Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-slate-200">
          {/* Topics */}
          <ContentBlock
            title="📖 Temas y Contenidos"
            icon="📖"
            items={module.topics}
            color="blue"
          />

          {/* Grammar */}
          <ContentBlock
            title="📝 Gramática"
            icon="📝"
            items={module.grammar}
            color="green"
          />

          {/* Vocabulary */}
          <ContentBlock
            title="💬 Vocabulario"
            icon="💬"
            items={module.vocabulary}
            color="purple"
          />

          {/* Skills */}
          <div className="pt-4">
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              🎯 Habilidades Desarrolladas
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <SkillCard title="Reading (Lectura)" items={module.skills.reading} color="blue" />
              <SkillCard title="Writing (Escritura)" items={module.skills.writing} color="green" />
              <SkillCard title="Listening (Comprensión Oral)" items={module.skills.listening} color="amber" />
              <SkillCard title="Speaking (Expresión Oral)" items={module.skills.speaking} color="purple" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ContentBlockProps {
  title: string;
  icon: string;
  items: string[];
  color: 'blue' | 'green' | 'purple' | 'amber';
}

function ContentBlock({ title, icon, items, color }: ContentBlockProps) {
  const colorClasses = {
    blue: 'bg-orange-50 text-coral-900 border-orange-200',
    green: 'bg-amber-50 text-amber-900 border-amber-200',
    purple: 'bg-peach-50 text-peach-900 border-peach-200',
    amber: 'bg-amber-50 text-amber-900 border-amber-200'
  };

  const bulletColors = {
    blue: 'text-orange-500',
    green: 'text-amber-500',
    purple: 'text-peach-500',
    amber: 'text-amber-500'
  };

  return (
    <div className={`mt-4 p-4 rounded-lg border ${colorClasses[color]}`}>
      <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
        {icon} {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <span className={`mt-1 ${bulletColors[color]}`}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SkillCardProps {
  title: string;
  items: string[];
  color: 'blue' | 'green' | 'purple' | 'amber';
}

function SkillCard({ title, items, color }: SkillCardProps) {
  const borderColors = {
    blue: 'border-orange-200',
    green: 'border-amber-200',
    purple: 'border-peach-200',
    amber: 'border-amber-200'
  };

  const textColors = {
    blue: 'text-coral-700',
    green: 'text-amber-700',
    purple: 'text-peach-700',
    amber: 'text-amber-700'
  };

  return (
    <div className={`bg-white p-4 rounded-lg border-2 ${borderColors[color]}`}>
      <h5 className={`font-semibold mb-2 ${textColors[color]}`}>{title}</h5>
      <ul className="space-y-1 text-sm text-slate-700">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-slate-400">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
