import Link from "next/link";
import Image from "next/image";
import { BlogPost, getCanonicalTopicPath } from "@/lib/blog";
import { Layers, ArrowRight, Bookmark, LayoutGrid } from "lucide-react";

interface TopicClusterLinksProps {
  articles: BlogPost[];
  mainKeyword?: string;
}

export function TopicClusterLinks({ articles, mainKeyword }: TopicClusterLinksProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="my-16 border-y border-slate-100 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-black text-slate-900 leading-tight">
              Temas relacionados con: {mainKeyword || 'Temas Relacionados'}
            </h2>
            <p className="text-slate-500 font-medium">
              Profundiza en {mainKeyword || 'esta categoría'} con nuestras guías expertas
            </p>
          </div>
        </div>
        
        <Link 
          href="/aprender-ingles"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-md group"
        >
          <LayoutGrid className="w-4 h-4 text-coral-400" />
          <span>Hub Maestro: Aprender Inglés</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className={`grid grid-cols-1 gap-8 ${articles.length === 1 ? 'md:grid-cols-1 max-w-sm' : articles.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {articles.map((article) => (
          <Link 
            key={article.slug}
            href={`/blog/${article.category}/${article.slug}`}
            className="group flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            {article.image && (
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.alt || article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-900">
                    {article.category}
                  </span>
                </div>
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-display font-bold text-slate-900 text-lg group-hover:text-coral-600 transition-colors line-clamp-2 mb-4 leading-snug">
                {article.title}
              </h3>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{article.readTime || '5 min'}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-coral-50 group-hover:text-coral-600 transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {mainKeyword && (
        <div className="mt-12 p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-indigo-900 font-bold text-lg mb-1">¿Quieres saber todo sobre {mainKeyword}?</p>
            <p className="text-indigo-600/80 text-sm">Explora nuestra biblioteca completa de recursos especializados.</p>
          </div>
          <Link 
            href={getCanonicalTopicPath(mainKeyword)}
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold text-sm border-2 border-indigo-100 hover:border-indigo-600 transition-all shadow-sm"
          >
            <span>Ver todo sobre {mainKeyword}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
