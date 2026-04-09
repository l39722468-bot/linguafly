import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShareButton } from "./ShareButton";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schemas";
import { BlogEnhancements } from "@/components/blog/BlogEnhancements";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { SEOInterlinking } from "@/components/blog/SEOInterlinking";
import { TopicClusterLinks } from "@/components/blog/TopicClusterLinks";
import { getBlogArticles, getArticleBySlug, getRelatedArticles, getRelatedByKeywords, normalizeCategory, slugify } from "@/lib/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { optimizeSEOTitle } from "@/utils/seo-utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Twitter, Award } from "lucide-react";

/** Evita `/_next/image` para URLs absolutas: mejora compatibilidad con rastreadores (p. ej. GSC) y CDN externos. */
function isRemoteImageSrc(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

export async function generateStaticParams() {
  const articles = getBlogArticles();
  return articles.map(article => ({
    category: normalizeCategory(article.category),
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { category: rawCategory, slug } = await params;
  const category = decodeURIComponent(rawCategory);
  const article = getArticleBySlug(slug, category);
  
  if (!article) {
    return {
      title: "Artículo no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Optimized title for SEO
  const seoTitle = optimizeSEOTitle(article.title);

  const ogImage = article.image || "/blog/og-image.jpg";

  return {
    title: seoTitle,
    description: article.excerpt,
    keywords: article.keywords || [],
    authors: [{ name: article.author }],
    openGraph: {
      title: seoTitle,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      section: article.category,
      tags: article.keywords,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `https://www.focus-on-english.com${ogImage}`,
          width: 1200,
          height: 630,
          alt: seoTitle,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: article.excerpt,
      images: [ogImage.startsWith('http') ? ogImage : `https://www.focus-on-english.com${ogImage}`],
    },
    alternates: {
      canonical: article.canonical || `https://www.focus-on-english.com/blog/${normalizeCategory(article.category)}/${slug}`,
    },
  };
}

export default async function BlogArticle({ params }: { params: Promise<{ category: string, slug: string }> }) {
  try {
  const { category: rawCategory, slug } = await params;
  const category = decodeURIComponent(rawCategory);
  const article = getArticleBySlug(slug, category);

  if (!article) {
    notFound();
  }

  // Generate Article Schema for SEO
  const wordCount = (article.content || "").split(/\s+/).length;

  const categoryLabels: Record<string, string> = {
    trabajo: "Inglés para Trabajar",
    viajes: "Inglés para Viajar",
    examenes: "Preparación de Exámenes",
    aprendizaje: "Aprendizaje",
    metodos: "Métodos",
    seo: "Cursos y Guías de Inglés",
  };

  const normalizedCategory = normalizeCategory(article.category);
  const categoryLabel = categoryLabels[normalizedCategory] || article.category;

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.excerpt,
    image: article.image || "/blog/og-image.jpg",
    datePublished: article.date,
    dateModified: article.updatedDate || article.date,
    slug,
    category: normalizedCategory,
    keywords: article.keywords,
    wordCount,
    author: article.authorData ? {
      name: article.authorData.name,
      slug: article.authorData.slug,
      role: article.authorData.role,
      image: article.authorData.image,
    } : undefined,
  });

  // Generate Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: "https://www.focus-on-english.com" },
    { name: "Blog", url: "https://www.focus-on-english.com/blog" },
    { name: categoryLabel, url: `https://www.focus-on-english.com/blog/${normalizedCategory}` },
    { name: article.title, url: `https://www.focus-on-english.com/blog/${normalizedCategory}/${slug}` },
  ]);

  // Generate FAQ Schema if FAQs exist
  const faqSchema = article.faqs && article.faqs.length > 0 
    ? generateFAQSchema(article.faqs)
    : null;

  // Enhanced markdown components for SEO and styling
  const MarkdownComponents = {
    h1: ({ node, ...props }: any) => <h1 className="font-display text-4xl font-black text-slate-900 mt-8 mb-6" {...props} />,
    h2: ({ node, ...props }: any) => {
      // Safely extract text from children
      const getText = (children: any): string => {
        if (!children) return '';
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) return children.map(getText).join('');
        if (children?.props?.children) return getText(children.props.children);
        if (typeof children === 'object' && children !== null) {
          // Handle cases where children might be an object but not a string or have props
          return '';
        }
        return '';
      };
      
      const text = getText(props.children) || '';
      const id = (typeof text === 'string' ? text : '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-') || 'section';
      
      return (
        <h2 
          id={id}
          className="font-display text-3xl font-black text-slate-900 mt-12 mb-6 border-b border-slate-100 pb-4 scroll-mt-24" 
          {...props} 
        />
      );
    },
    h3: ({ node, ...props }: any) => {
      // Safely extract text from children
      const getText = (children: any): string => {
        if (!children) return '';
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) return children.map(getText).join('');
        if (children?.props?.children) return getText(children.props.children);
        if (typeof children === 'object' && children !== null) {
          return '';
        }
        return '';
      };
      
      const text = getText(props.children) || '';
      const id = (typeof text === 'string' ? text : '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-') || 'subsection';
      
      return (
        <h3 
          id={id}
          className="font-display text-2xl font-bold text-slate-900 mt-8 mb-4 scroll-mt-24" 
          {...props} 
        />
      );
    },
    p: ({ node, ...props }: any) => <p className="text-slate-700 leading-relaxed mb-6" {...props} />,
    ul: ({ node, ...props }: any) => <ul className="list-disc ml-6 mb-6 space-y-2 text-slate-700" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-slate-700" {...props} />,
    li: ({ node, ...props }: any) => <li className="pl-2" {...props} />,
    strong: ({ node, ...props }: any) => <strong className="font-bold text-slate-900" {...props} />,
    a: ({ node, ...props }: any) => <a className="text-coral-600 font-bold hover:underline" {...props} />,
    img: ({ node, ...props }: any) => {
      const src = typeof props.src === "string" ? props.src : "";
      return (
        <div className="my-10">
          <Image
            src={src || "/blog/og-image.jpg"}
            alt={props.alt || ""}
            width={1200}
            height={675}
            unoptimized={isRemoteImageSrc(src)}
            className="rounded-2xl shadow-lg w-full object-cover aspect-video"
          />
          {props.alt && (
            <p className="text-center text-sm text-slate-500 mt-3 italic">{props.alt}</p>
          )}
        </div>
      );
    },
    table: ({ node, ...props }: any) => (
      <div className="overflow-x-auto my-8 border border-slate-100 rounded-2xl shadow-sm">
        <table className="min-w-full divide-y divide-slate-100" {...props} />
      </div>
    ),
    thead: ({ node, ...props }: any) => <thead className="bg-slate-50" {...props} />,
    tbody: ({ node, ...props }: any) => <tbody className="divide-y divide-slate-100" {...props} />,
    tr: ({ node, ...props }: any) => <tr className="hover:bg-slate-50/50 transition-colors" {...props} />,
    th: ({ node, ...props }: any) => <th className="py-4 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider" {...props} />,
    td: ({ node, ...props }: any) => <td className="py-4 px-4 text-slate-700" {...props} />,
    blockquote: ({ node, ...props }: any) => (
      <blockquote className="border-l-4 border-coral-500 bg-coral-50/30 p-6 rounded-r-2xl my-8 italic text-slate-700" {...props} />
    ),
    hr: () => <hr className="my-12 border-slate-100" />,
  };

  const categoryColors: Record<string, string> = {
    trabajo: "bg-coral-100 text-coral-800 border-coral-200",
    viajes: "bg-orange-100 text-coral-800 border-orange-200",
    examenes: "bg-amber-100 text-amber-800 border-amber-200",
    aprendizaje: "bg-amber-100 text-amber-800 border-amber-200",
    metodos: "bg-pink-100 text-pink-800 border-pink-200",
    seo: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const categoryColor = categoryColors[normalizedCategory] || "bg-slate-100 text-slate-800";

  const relatedArticles = getRelatedArticles(slug, article.category);
  const clusterArticles = getRelatedByKeywords(slug, article.keywords || [], 3);
  const mainKeyword = article.keywords?.[0];
  const heroImageSrc = article.image || "/blog/og-image.jpg";

    return (
      <>
        {/* SEO Schemas */}
        <JsonLd data={articleSchema} />
        <JsonLd data={breadcrumbSchema} />
        <JsonLd data={faqSchema} />

        <Navigation />
        
        <main className="min-h-screen bg-slate-50 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex mb-8 text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
              <Link href="/" className="hover:text-coral-600 transition-colors">Inicio</Link>
              <span className="mx-2 text-slate-300">/</span>
              <Link href="/blog" className="hover:text-coral-600 transition-colors">Blog</Link>
              <span className="mx-2 text-slate-300">/</span>
              <Link href={`/blog/${normalizedCategory}`} className="hover:text-coral-600 transition-colors capitalize">{categoryLabel}</Link>
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-slate-900 truncate">{article.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-8">
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                  {/* Hero Image */}
                  <div className="relative w-full overflow-hidden bg-slate-200">
                    <div className="aspect-video relative">
                      <Image
                        src={heroImageSrc}
                        alt={article.alt || article.title}
                        fill
                        priority
                        unoptimized={isRemoteImageSrc(heroImageSrc)}
                        className="object-cover transition-opacity duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="absolute top-6 left-6 z-20">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border shadow-md backdrop-blur-md ${categoryColor}`}>
                        {categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Content Header */}
                  <div className="p-8 lg:p-12 border-b border-slate-50">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                      <time dateTime={article.date} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        {new Date(article.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        {article.readTime} de lectura
                      </span>
                      {article.authorData ? (
                        <Link 
                          href={`/blog/autor/${article.authorData.slug}`}
                          className="flex items-center gap-1.5 hover:text-coral-600 transition-colors group"
                        >
                          <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-coral-400" />
                          Por <span className="font-bold">{article.authorData.name}</span>
                        </Link>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          Por {article.author}
                        </span>
                      )}
                    </div>

                    <h1 className="font-display text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-[1.1]">
                      {article.title}
                    </h1>

                    <div className="flex items-center justify-between py-6 border-y border-slate-50">
                      <div className="flex items-center gap-3">
                        {article.authorData ? (
                          <Link href={`/blog/autor/${article.authorData.slug}`} className="flex items-center gap-3 group">
                            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover:border-coral-200 transition-all">
                              <Image 
                                src={article.authorData.image} 
                                alt={article.authorData.name} 
                                fill 
                                unoptimized={isRemoteImageSrc(article.authorData.image)}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 group-hover:text-coral-600 transition-colors">{article.authorData.name}</p>
                              <p className="text-xs text-slate-500">{article.authorData.role}</p>
                            </div>
                          </Link>
                        ) : (
                          <>
                            <div className="w-10 h-10 rounded-full bg-coral-100 flex items-center justify-center text-coral-600">
                              <span className="font-bold">FT</span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{article.author}</p>
                              <p className="text-xs text-slate-500">Focus English Team</p>
                            </div>
                          </>
                        )}
                      </div>
                      <ShareButton title={article.title} description={article.excerpt} />
                    </div>
                  </div>

                  {/* Table of Contents (Mobile) */}
                  <div className="lg:hidden p-8 bg-slate-50/50">
                    <TableOfContents />
                  </div>

                  {/* Article Body */}
                  <div className="p-8 lg:p-12 prose prose-slate prose-xl max-w-none article-content">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={MarkdownComponents}
                    >
                      {article.content}
                    </ReactMarkdown>

                    {/* SEO Interlinking Block */}
                    <SEOInterlinking category={normalizedCategory} />
                    
                    {/* Dynamic Topic Cluster */}
                    <TopicClusterLinks articles={clusterArticles} mainKeyword={mainKeyword} />

                    {/* Author Bio Section (EEAT) */}
                    {article.authorData && (
                      <div className="mt-16 p-8 lg:p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-coral-100 rounded-full -mr-16 -mt-16 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                          <Link href={`/blog/autor/${article.authorData.slug}`} className="shrink-0 group/img">
                            <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg rotate-3 group-hover/img:rotate-0 transition-transform duration-500">
                              <Image 
                                src={article.authorData.image} 
                                alt={article.authorData.name} 
                                fill 
                                unoptimized={isRemoteImageSrc(article.authorData.image)}
                                className="object-cover"
                              />
                            </div>
                          </Link>
                          
                          <div className="text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                              <Link href={`/blog/autor/${article.authorData.slug}`} className="hover:text-coral-600 transition-colors">
                                <h3 className="font-display text-2xl font-black text-slate-900 leading-tight">
                                  Escrito por {article.authorData.name}
                                </h3>
                              </Link>
                              <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white text-coral-600 text-xs font-bold border border-coral-100 shadow-sm self-center md:self-auto">
                                <Award className="w-3.5 h-3.5" />
                                Experto Verificado
                              </div>
                            </div>
                            
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                              {article.authorData.bio}
                            </p>
                            
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
                              <Link 
                                href={`/blog/autor/${article.authorData.slug}`}
                                className="text-coral-600 font-bold text-sm hover:underline flex items-center gap-1.5"
                              >
                                Ver perfil completo y artículos →
                              </Link>
                              
                              <div className="flex items-center gap-3">
                                {article.authorData.social?.twitter && (
                                  <a href={article.authorData.social.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-500 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Post Footer */}
                  <div className="p-8 lg:p-12 bg-slate-50/50 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2 mb-8">
                      {article.keywords?.filter(Boolean).map((keyword, i) => (
                        <Link 
                          key={i} 
                          href={`/blog/temas/${slugify(keyword)}`}
                          className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-coral-300 hover:text-coral-600 transition-all hover:shadow-sm"
                        >
                          #{keyword?.toString().replace(/\s+/g, '')}
                        </Link>
                      ))}
                    </div>
                    
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                      <h3 className="font-display text-xl font-bold text-slate-900 mb-4">¿Te ha gustado esta guía?</h3>
                      <p className="text-slate-600 mb-6">En Focus English ayudamos a profesionales y viajeros a dominar el inglés con IA en tiempo récord.</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                          href="/cuenta/registro"
                          className="inline-flex items-center justify-center bg-coral-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-coral-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Probar Gratis 7 días
                        </Link>
                        <Link 
                          href="/"
                          className="inline-flex items-center justify-center bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:border-coral-200 hover:bg-coral-50/30 transition-all"
                        >
                          Nuestra Metodología
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <section className="mt-16">
                    <h2 className="font-display text-3xl font-black text-slate-900 mb-8">Artículos relacionados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {relatedArticles.map((rel, i) => (
                        <Link 
                          key={i}
                          href={`/blog/${rel.category}/${rel.slug}`}
                          className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                          <div className="relative aspect-video bg-slate-100">
                            <Image 
                              src={rel.image || "/blog/og-image.jpg"} 
                              alt={rel.alt || rel.title} 
                              fill
                              unoptimized={isRemoteImageSrc(rel.image || "")}
                              className="object-cover"
                            />
                          </div>
                          <div className="p-6">
                            <span className="text-xs font-bold text-coral-600 uppercase tracking-wider mb-2 block">{rel.category}</span>
                            <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-coral-600 transition-colors line-clamp-2">
                              {rel.title}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-8">
                <div className="sticky top-32">
                  <TableOfContents />
                  <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      {normalizedCategory === 'examenes' ? (
                        <>
                          <h3 className="font-display text-2xl font-bold mb-4">¿Preparas un examen oficial?</h3>
                          <p className="text-slate-400 mb-6">Practica Speaking con IA, corrige tu Writing y simula exámenes reales de Cambridge, IELTS y TOEFL.</p>
                          <Link
                            href="/cuenta/registro?plan=cambridge"
                            className="block w-full bg-coral-600 text-white text-center py-4 rounded-xl font-bold hover:bg-coral-700 transition-all"
                          >
                            Empezar preparación
                          </Link>
                        </>
                      ) : normalizedCategory === 'trabajo' ? (
                        <>
                          <h3 className="font-display text-2xl font-bold mb-4">¿Inglés para tu carrera?</h3>
                          <p className="text-slate-400 mb-6">Domina el inglés profesional con nuestro plan especializado para entrevistas, reuniones y emails.</p>
                          <Link
                            href="/cuenta/registro?plan=professional"
                            className="block w-full bg-coral-600 text-white text-center py-4 rounded-xl font-bold hover:bg-coral-700 transition-all"
                          >
                            Comenzar ahora
                          </Link>
                        </>
                      ) : normalizedCategory === 'gramatica' ? (
                        <>
                          <h3 className="font-display text-2xl font-bold mb-4">¿Preparas Cambridge o B2?</h3>
                          <p className="text-slate-400 mb-6">Practica gramática avanzada con ejercicios adaptados a tu nivel y corrección instantánea con IA.</p>
                          <Link
                            href="/cuenta/registro?plan=grammar"
                            className="block w-full bg-coral-600 text-white text-center py-4 rounded-xl font-bold hover:bg-coral-700 transition-all"
                          >
                            Practicar gramática gratis
                          </Link>
                        </>
                      ) : normalizedCategory === 'viajes' ? (
                        <>
                          <h3 className="font-display text-2xl font-bold mb-4">¿Viajas pronto?</h3>
                          <p className="text-slate-400 mb-6">Prepárate para tu próximo destino con nuestro curso acelerado de inglés para viajeros.</p>
                          <Link
                            href="/cuenta/registro?plan=survival"
                            className="block w-full bg-coral-600 text-white text-center py-4 rounded-xl font-bold hover:bg-coral-700 transition-all"
                          >
                            Comenzar ahora
                          </Link>
                        </>
                      ) : (
                        <>
                          <h3 className="font-display text-2xl font-bold mb-4">¿Quieres mejorar tu inglés?</h3>
                          <p className="text-slate-400 mb-6">Accede a nuestros cursos personalizados con IA y alcanza el nivel que necesitas.</p>
                          <Link
                            href="/cuenta/registro"
                            className="block w-full bg-coral-600 text-white text-center py-4 rounded-xl font-bold hover:bg-coral-700 transition-all"
                          >
                            Probar gratis 7 días
                          </Link>
                        </>
                      )}
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-coral-600/20 rounded-full blur-3xl" />
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
                  </div>

                  {/* Blog Enhancements (Social proof, stats, etc) */}
                  <div className="mt-8">
                    <BlogEnhancements />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error("Error rendering blog article:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Error al cargar el artículo</h1>
          <p className="text-slate-600 mb-6">Lo sentimos, ha ocurrido un problema al procesar este contenido.</p>
          <pre className="bg-slate-50 p-4 rounded-xl text-xs text-left overflow-auto mb-6 max-h-40">
            {error instanceof Error ? error.message : String(error)}
          </pre>
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center bg-coral-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-700 transition-all w-full"
          >
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }
}
