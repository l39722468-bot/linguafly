'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, Zap, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';
import { UnitMetadata } from '@/types/premium-course';
import { trackUnitCardClick } from '@/lib/analytics';
import { bilingualTitleEnglishPrimary, bilingualTitleForSearch } from '@/lib/utils/bilingual-title';
import { TranslatedText } from '@/components/course/exercises/TranslatedText';
import { isFreeUnitId } from '@/lib/access/unit-access';
import { isFreeAccessMode } from '@/lib/product-config';
import { appendArticleReturnParam, getArticleReturnPath } from '@/lib/blog-article-return';

interface UnitCardProps {
  unit: UnitMetadata;
  coursePath?: string;
  /** Si false, las unidades distintas de la 1 muestran candado y CTA de suscripción. */
  hasFullAccess?: boolean;
}

const MODULE_THEMES = [
  {
    gradient: 'from-orange-400 to-rose-500',
    badge:    'bg-orange-500',
    chip:     'bg-orange-100 text-orange-700 border-orange-200',
    text:     'text-orange-600',
    glow:     'hover:shadow-orange-200',
    light:    'bg-orange-50',
    border:   'border-orange-200',
  },
  {
    gradient: 'from-blue-400 to-indigo-500',
    badge:    'bg-blue-500',
    chip:     'bg-blue-100 text-blue-700 border-blue-200',
    text:     'text-blue-600',
    glow:     'hover:shadow-blue-200',
    light:    'bg-blue-50',
    border:   'border-blue-200',
  },
  {
    gradient: 'from-emerald-400 to-teal-500',
    badge:    'bg-emerald-500',
    chip:     'bg-emerald-100 text-emerald-700 border-emerald-200',
    text:     'text-emerald-600',
    glow:     'hover:shadow-emerald-200',
    light:    'bg-emerald-50',
    border:   'border-emerald-200',
  },
  {
    gradient: 'from-purple-400 to-violet-500',
    badge:    'bg-purple-500',
    chip:     'bg-purple-100 text-purple-700 border-purple-200',
    text:     'text-purple-600',
    glow:     'hover:shadow-purple-200',
    light:    'bg-purple-50',
    border:   'border-purple-200',
  },
  {
    gradient: 'from-rose-400 to-pink-500',
    badge:    'bg-rose-500',
    chip:     'bg-rose-100 text-rose-700 border-rose-200',
    text:     'text-rose-600',
    glow:     'hover:shadow-rose-200',
    light:    'bg-rose-50',
    border:   'border-rose-200',
  },
];

function getTheme(unitNumber: number) {
  return MODULE_THEMES[Math.floor((Math.max(1, unitNumber) - 1) / 5) % MODULE_THEMES.length];
}

const TOPIC_EMOJIS: Record<string, string> = {
  greetings: '👋', hello: '👋', goodbye: '👋',
  numbers: '🔢', counting: '🔢',
  colors: '🎨', colour: '🎨',
  family: '👨‍👩‍👧', relatives: '👨‍👩‍👧',
  food: '🍽️', eating: '🍽️', restaurant: '🍽️', drinks: '🍽️',
  work: '💼', job: '💼', office: '💼', business: '💼', career: '💼',
  time: '⏰', days: '⏰', calendar: '📅', week: '📅',
  travel: '✈️', transport: '🚌', places: '🗺️', city: '🏙️',
  shopping: '🛒', money: '💰', prices: '💰',
  weather: '☀️', seasons: '🌤️',
  body: '💪', health: '🏥',
  home: '🏠', house: '🏡', rooms: '🏠',
  animals: '🐾', pets: '🐶',
  communication: '💬', talking: '💬',
  reading: '📚', writing: '✍️',
  listening: '🎧', audio: '🎧',
  speaking: '🗣️', pronunciation: '🗣️',
  grammar: '📝', verbs: '📝', vocabulary: '📖',
  sports: '⚽', hobbies: '🎸',
  emotions: '😊', feelings: '😊',
  technology: '💻', phone: '📱',
  school: '🎓', education: '📐',
  clothes: '👕', fashion: '👗',
  directions: '🧭', map: '🗺️',
};

function getUnitEmoji(unit: UnitMetadata): string {
  const search = [bilingualTitleForSearch(unit.title), ...(unit.topics || [])].join(' ').toLowerCase();
  for (const [key, emoji] of Object.entries(TOPIC_EMOJIS)) {
    if (search.includes(key)) return emoji;
  }
  const defaults = ['📖', '🌟', '💡', '🎯', '🚀', '✨', '🔑', '🌈'];
  return defaults[(unit.unitNumber - 1) % defaults.length];
}

export function UnitCard({ unit, coursePath = '/curso-a1', hasFullAccess = false }: UnitCardProps) {
  return (
    <Suspense fallback={null}>
      <UnitCardInner unit={unit} coursePath={coursePath} hasFullAccess={hasFullAccess} />
    </Suspense>
  );
}

function UnitCardInner({ unit, coursePath = '/curso-a1', hasFullAccess = false }: UnitCardProps) {
  const searchParams = useSearchParams();
  const articleReturnPath = getArticleReturnPath(searchParams);
  const theme = getTheme(unit.unitNumber);
  const emoji = getUnitEmoji(unit);
  const isLocked = !isFreeAccessMode() && !hasFullAccess && !isFreeUnitId(unit.unitId) && unit.unitNumber !== 1;
  const baseHref = `${coursePath}/${unit.unitId}`;
  const unitHref = articleReturnPath
    ? appendArticleReturnParam(baseHref, articleReturnPath)
    : baseHref;
  const ctaHref = isLocked
    ? `/planes?reason=premium_required&next=${encodeURIComponent(unitHref)}`
    : unitHref;

  const handleCardClick = () => {
    trackUnitCardClick(unit.unitId, unit.unitNumber);
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group bg-white rounded-3xl border-2 border-slate-100 shadow-md hover:shadow-xl hover:shadow-slate-200/80 ${theme.glow} transition-all duration-300 relative overflow-hidden focus-within:ring-2 focus-within:ring-offset-2 flex flex-col ${isLocked ? 'opacity-95' : ''}`}
    >
      {/* ── GRADIENT TOP STRIP ──────────────────────────────── */}
      <div className={`bg-gradient-to-r ${theme.gradient} px-5 pt-5 pb-4 relative overflow-hidden`}>
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />

        <div className="relative flex items-start justify-between">
          {/* Big emoji anchor */}
          <span className="text-4xl leading-none drop-shadow-sm select-none" role="img" aria-hidden>
            {emoji}
          </span>

          <div className="flex flex-col items-end gap-1.5">
            {isLocked ? (
              <span className="inline-flex items-center gap-1 rounded-lg bg-slate-900/35 backdrop-blur-sm border border-white/30 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                <Lock className="w-3 h-3" />
                Suscripción
              </span>
            ) : unit.unitNumber === 1 ? (
              <span className="inline-flex items-center rounded-lg bg-emerald-500/90 border border-white/30 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                Gratis
              </span>
            ) : null}
            {/* Unit number badge */}
            <div className="bg-white/25 backdrop-blur-sm border border-white/40 text-white rounded-xl px-2.5 py-1">
              <span className="text-[10px] font-black tracking-widest uppercase leading-none">Unidad</span>
              <p className="font-display text-lg font-extrabold text-white leading-none text-center">{unit.unitNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARD BODY ────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 pt-4">
        {/* Title */}
        <h3 className={`font-display text-base font-bold text-slate-900 leading-snug tracking-tight group-hover:${theme.text} transition-colors line-clamp-2 mb-3`}>
          <TranslatedText text={unit.title} />
        </h3>

        {/* Topic chips */}
        {unit.topics && unit.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {unit.topics.slice(0, 3).map((topic, i) => (
              <span
                key={`${topic}-${i}`}
                className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-lg border ${theme.chip}`}
              >
                {topic}
              </span>
            ))}
            {unit.topics.length > 3 && (
              <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-lg border ${theme.chip} opacity-60`}>
                +{unit.topics.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Metadata row */}
        <div className="flex items-center gap-4 mt-auto mb-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">{unit.estimatedDuration} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">{unit.exerciseCount} ejercicios</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={ctaHref}
          prefetch={!isLocked}
          onClick={handleCardClick}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm border-2 transition-all duration-200 ${theme.chip} group-hover:bg-gradient-to-r group-hover:${theme.gradient} group-hover:text-white group-hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2`}
          aria-label={
            isLocked
              ? `Desbloquear ${bilingualTitleEnglishPrimary(unit.title)} con la suscripción`
              : `Practicar ${bilingualTitleEnglishPrimary(unit.title)}`
          }
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4" />
              <span>Desbloquear</span>
            </>
          ) : (
            <>
              <span>Practicar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Link>
      </div>
    </motion.div>
  );
}
