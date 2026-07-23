'use client';

import { useState } from 'react';
import { ChevronDown, Clock, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleMetadata } from '@/types/premium-course';
import { UnitCard } from './UnitCard';

interface ModuleGroupProps {
  module: ModuleMetadata;
  isInitiallyExpanded?: boolean;
  coursePath?: string;
  hasFullAccess?: boolean;
}

const MODULE_THEMES = [
  { gradient: 'from-orange-400 to-rose-500',   light: 'bg-orange-50',   border: 'border-orange-200', text: 'text-orange-700', accent: 'bg-orange-500', ring: 'focus:ring-orange-300' },
  { gradient: 'from-blue-400 to-indigo-500',   light: 'bg-blue-50',     border: 'border-blue-200',   text: 'text-blue-700',   accent: 'bg-blue-500',   ring: 'focus:ring-blue-300' },
  { gradient: 'from-emerald-400 to-teal-500',  light: 'bg-emerald-50',  border: 'border-emerald-200',text: 'text-emerald-700',accent: 'bg-emerald-500',ring: 'focus:ring-emerald-300' },
  { gradient: 'from-purple-400 to-violet-500', light: 'bg-purple-50',   border: 'border-purple-200', text: 'text-purple-700', accent: 'bg-purple-500', ring: 'focus:ring-purple-300' },
  { gradient: 'from-rose-400 to-pink-500',     light: 'bg-rose-50',     border: 'border-rose-200',   text: 'text-rose-700',   accent: 'bg-rose-500',   ring: 'focus:ring-rose-300' },
];

const MODULE_EMOJIS = ['🗣️', '🌅', '💼', '💬', '🏆'];

export function ModuleGroup({ module, isInitiallyExpanded = false, coursePath = '/curso-a1', hasFullAccess = false }: ModuleGroupProps) {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
  const theme = MODULE_THEMES[(module.moduleNumber - 1) % MODULE_THEMES.length];
  const emoji = MODULE_EMOJIS[(module.moduleNumber - 1) % MODULE_EMOJIS.length];

  return (
    <div className={`bg-white rounded-3xl border-2 overflow-hidden shadow-sm transition-all duration-300 ${
      isExpanded ? `${theme.border} shadow-md` : 'border-slate-100 hover:border-slate-200 hover:shadow-md'
    }`}>

      {/* ── MODULE HEADER ──────────────────────────────────────────── */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full min-h-[80px] flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors focus:outline-none ${theme.ring} focus:ring-2 focus:ring-offset-2 focus:ring-inset`}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Colapsar' : 'Expandir'} módulo ${module.moduleNumber}`}
      >
        {/* Left accent bar */}
        <div className={`self-stretch w-1.5 flex-shrink-0 bg-gradient-to-b ${theme.gradient} rounded-r-full`} />

        {/* Module icon + number */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} text-white flex flex-col items-center justify-center shadow-md flex-shrink-0`}>
          <span className="text-xl leading-none" role="img" aria-hidden>{emoji}</span>
          <span className="text-[10px] font-black tracking-widest mt-0.5">{module.moduleNumber}</span>
        </div>

        {/* Text */}
        <div className="flex-1 text-left py-4 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] font-black tracking-widest uppercase ${theme.text}`}>
              Módulo {module.moduleNumber}
            </span>
          </div>
          <h2 className="font-display text-lg font-bold tracking-tight text-slate-900 leading-snug">
            {module.title}
          </h2>
          {module.description && (
            <p className="text-sm font-medium text-slate-500 mt-0.5 line-clamp-1">{module.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-slate-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{module.unitCount} unidad{module.unitCount !== 1 ? 'es' : ''}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{module.totalDuration} min</span>
            </div>
          </div>
        </div>

        {/* Chevron */}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 mr-5 flex-shrink-0 ${
          isExpanded
            ? `bg-gradient-to-br ${theme.gradient} text-white shadow-md`
            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
        }`}>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* ── EXPANDED CONTENT ───────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={`px-6 pb-6 pt-5 ${theme.light} border-t ${theme.border}`}>
              {/* Section label */}
              <p className={`text-[10px] font-black tracking-widest uppercase ${theme.text} mb-4`}>
                {module.unitCount} unidades · selecciona una para practicar
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {module.units.map((unit) => (
                  <UnitCard key={unit.unitId} unit={unit} coursePath={coursePath} hasFullAccess={hasFullAccess} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
