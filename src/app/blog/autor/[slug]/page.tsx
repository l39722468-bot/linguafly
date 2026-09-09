import { Navigation } from "@/components/sections/Navigation";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { authors } from "@/lib/authors";
import { listPublishedArticles } from "@/lib/content/articles";
import { Metadata } from "next";
import { Twitter, BookOpen, Award, CheckCircle } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAbsoluteUrl, getSiteUrl, SITE_BRAND_NAME } from "@/lib/site-brand";
import { DEFAULT_OG_IMAGE_PATH } from "@/lib/seo/og-images";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return Object.keys(authors).map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = authors[slug];
  
  if (!author) return { title: "Autor no encontrado" };

  const ogImage = author.image?.startsWith("http")
    ? author.image
    : getAbsoluteUrl(author.image || DEFAULT_OG_IMAGE_PATH);

  return {
    title: `${author.name} | Experto en Inglés - ${SITE_BRAND_NAME}`,
    description: author.bio,
    alternates: {
      canonical: getAbsoluteUrl(`/blog/autor/${slug}`),
    },
    openGraph: {
      title: `${author.name} | Experto en Inglés`,
      description: author.bio,
      type: "profile",
      url: getAbsoluteUrl(`/blog/autor/${slug}`),
      images: [{ url: ogImage, width: 1200, height: 630, alt: author.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${author.name} | Experto en Inglés`,
      description: author.bio,
      images: [ogImage],
    },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = authors[slug];
  
  if (!author) notFound();

  const { articles } = await listPublishedArticles({
    author: slug,
    page: 1,
    limit: 24,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: getSiteUrl() },
    { name: "Blog", url: getAbsoluteUrl("/blog") },
    { name: "Autores", url: getAbsoluteUrl("/blog/autores") },
    { name: author.name },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <main className="min-h-screen bg-slate-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <nav className="mb-8" aria-label="breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-slate-600 transition-colors">Inicio</Link></li>
              <li>›</li>
              <li><Link href="/blog" className="hover:text-slate-600 transition-colors">Blog</Link></li>
              <li>›</li>
              <li><Link href="/blog/autores" className="hover:text-slate-600 transition-colors">Autores</Link></li>
              <li>›</li>
              <li className="font-semibold text-slate-600">{author.name}</li>
            </ol>
          </nav>

          {/* Author Profile Header */}
          <section className="bg-white rounded-[3rem] p-8 lg:p-16 border border-slate-100 shadow-sm mb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-coral-50 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 relative z-10">
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 shrink-0">
                <div className="absolute inset-0 bg-coral-100 rounded-[2.5rem] rotate-6"></div>
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
                  <Image 
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral-50 text-coral-600 text-sm font-bold mb-6 uppercase tracking-wider border border-coral-100">
                  <Award className="w-4 h-4" />
                  Autor Verificado
                </div>
                
                <h1 className="font-display text-4xl lg:text-6xl font-black text-slate-900 mb-4 leading-tight">
                  {author.name}
                </h1>
                
                <p className="text-xl font-bold text-coral-600 mb-6">{author.role}</p>
                
                <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
                  {author.bio}
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {author.social?.twitter && (
                    <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-all">
                      <Twitter className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-12 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Especialidad</h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {author.expertise.map(exp => (
                    <span key={exp} className="px-3 py-1 bg-slate-100 rounded-lg text-slate-700 text-sm font-medium flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-coral-500" />
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Contribuciones</h3>
                <p className="text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
                  <BookOpen className="w-8 h-8 text-coral-500" />
                  {articles.length} Artículos
                </p>
              </div>
            </div>
          </section>

          {/* Author's Articles */}
          <section>
            <h2 className="font-display text-3xl font-black text-slate-900 mb-10 text-center md:text-left">
              Artículos publicados por <span className="text-coral-600">{author.name}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link 
                  key={article.slug}
                  href={`/blog/${article.category}/${article.slug}`}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {article.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.image}
                        alt={article.alt || article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-coral-600 transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="text-coral-600 font-bold text-sm flex items-center gap-1">
                      <span>Leer artículo</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
