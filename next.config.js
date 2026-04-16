/** @type {import('next').NextConfig} */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  compress: true,
  transpilePackages: ['framer-motion'],
  turbopack: {
    resolveAlias: {
      '@emotion/react/jsx-runtime': 'react/jsx-runtime',
    },
  },
  experimental: {
    inlineCss: true,
    optimizePackageImports: [],
  },
  // Fix Vercel build: use project root for file tracing (avoids multi-lockfile inference)
  outputFileTracingRoot: path.join(__dirname),
  // Incluir contenido de cursos en el bundle (fs.readFileSync no se traza automáticamente)
  outputFileTracingIncludes: {
    '/curso-a1': ['src/content/cursos/ingles-a1/**/*.json'],
    '/curso-a1/outline': ['src/content/cursos/ingles-a1/**/*.json'],
    '/curso-a2': ['src/content/cursos/ingles-a2/**/*.json'],
    '/curso-a2/outline': ['src/content/cursos/ingles-a2/**/*.json'],
    '/curso-b1': ['src/content/cursos/ingles-b1/**/*.json', 'src/lib/course/b1/**/*.ts'],
    '/curso-b1/outline': ['src/content/cursos/ingles-b1/**/*.json'],
    // API B1: módulos TypeScript para dynamic import en loader
    '/api/course/b1/[unitId]': ['src/lib/course/b1/**/*.ts'],
  },
  // Vercel deployment - native Next.js support
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // ==========================================
  // REDIRECTS 301 - Reestructuración Fase 1
  // ==========================================
  trailingSlash: false,
  async redirects() {
    return [
      // Sitio orientado a blog: desactivar rutas de cursos/membresías públicas
      { source: '/curso/:path*', destination: '/blog', permanent: true },
      { source: '/curso-:slug/:path*', destination: '/blog', permanent: true },
      { source: '/planes', destination: '/blog', permanent: true },

      // Fix: categorías con mayúsculas/acentos indexadas por Google - redirigir a URL canónica en minúsculas
      // 348 impresiones perdidas en top 10 con CTR 0% por URLs encoded (%C3%A1) visibles en SERPs
      // Versión Unicode (á literal) - el percent-encoded ya está cubierto más abajo en este archivo
      { source: '/blog/Gram\u00E1tica/:slug*', destination: '/blog/gramatica/:slug*', permanent: true },

      // Hubs duplicados: la versión canónica vive en /blog/temas/:slug (FAQ, migas, temas relacionados)
      { source: '/hubs/:slug', destination: '/blog/temas/:slug', permanent: true },

      // Fix: URL rota de apps que apuntaba a página general del blog
      { source: '/blog/temas/aplicaciones-para-aprender-ingles-efectivas', destination: '/aplicaciones-para-aprender-ingles', permanent: true },

      // Fix: metodos→examenes (artículo indexado por Google en categoría incorrecta)
      { source: '/blog/metodos/mejores-certificados-ingles-2026', destination: '/blog/examenes/mejores-certificados-ingles-2026', permanent: true },

      // Fix: Redirects metodos→gramatica (commit 54bf002e movió 15 artículos, 9941f816 eliminó redirects sin añadir los inversos)
      { source: '/blog/metodos/condicionales-ingles-guia-completa', destination: '/blog/gramatica/condicionales-ingles-guia-completa', permanent: true },
      { source: '/blog/metodos/gramatica-ingles-b1-guia', destination: '/blog/gramatica/gramatica-ingles-b1-guia', permanent: true },
      { source: '/blog/metodos/guia-maestra-reported-speech', destination: '/blog/gramatica/guia-maestra-reported-speech', permanent: true },
      { source: '/blog/metodos/passive-reporting-verbs-guia-avanzada', destination: '/blog/gramatica/passive-reporting-verbs-guia-avanzada', permanent: true },
      { source: '/blog/metodos/phrasal-verbs-guia-b2', destination: '/blog/gramatica/phrasal-verbs-guia-b2', permanent: true },
      { source: '/blog/metodos/preposiciones-movimiento-ingles', destination: '/blog/gramatica/preposiciones-movimiento-ingles', permanent: true },
      { source: '/blog/metodos/present-perfect-vs-past-simple', destination: '/blog/gramatica/present-perfect-vs-past-simple', permanent: true },
      { source: '/blog/metodos/relative-clauses-guia-definitiva', destination: '/blog/gramatica/relative-clauses-guia-definitiva', permanent: true },
      { source: '/blog/metodos/reported-speech-ejercicios-pdf', destination: '/blog/gramatica/reported-speech-ejercicios-pdf', permanent: true },
      { source: '/blog/metodos/reported-speech-guia-uso', destination: '/blog/gramatica/reported-speech-guia-uso', permanent: true },
      { source: '/blog/metodos/reported-speech-questions-commands', destination: '/blog/gramatica/reported-speech-questions-commands', permanent: true },
      { source: '/blog/metodos/reporting-verbs-patterns-list', destination: '/blog/gramatica/reporting-verbs-patterns-list', permanent: true },
      { source: '/blog/metodos/verbos-modales-ingles-guia', destination: '/blog/gramatica/verbos-modales-ingles-guia', permanent: true },
      { source: '/blog/metodos/voz-pasiva-avanzada-guia', destination: '/blog/gramatica/voz-pasiva-avanzada-guia', permanent: true },
      { source: '/blog/metodos/voz-pasiva-ingles-guia', destination: '/blog/gramatica/voz-pasiva-ingles-guia', permanent: true },

      // SEO - Redirecciones de Cluster a Blog
      {
        source: '/precios',
        destination: '/planes',
        statusCode: 301,
      },
      {
        source: '/registro',
        destination: '/cuenta/registro',
        statusCode: 301,
      },
      {
        source: '/rutas/certificaciones-ingles',
        destination: '/certificaciones-ingles-oficiales',
        statusCode: 301,
      },
      {
        source: '/rutas/ingles-para-trabajo',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/rutas/ingles-para-hosteleria',
        destination: '/blog/trabajo/ingles-para-camareros-y-hosteleria',
        statusCode: 301,
      },
      {
        source: '/rutas/ingles-para-atencion-al-cliente',
        destination: '/blog/trabajo/ingles-para-atencion-al-cliente',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-aprender-ingles',
        destination: '/aprender-ingles',
        statusCode: 301,
      },
      {
        source: '/certificaciones-ingles',
        destination: '/certificaciones-ingles-oficiales',
        statusCode: 301,
      },
      {
        source: '/ingles-para-el-trabajo',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-trabajo',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-viajar',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-para-trabajo',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-para-viajar',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-a1',
        destination: '/blog/metodos/ingles-a1',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-a2',
        destination: '/blog/metodos/ingles-a2',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-b1',
        destination: '/blog/metodos/cursos-online-ingles-b1',
        statusCode: 301,
      },
      {
        source: '/cursos-online-ingles-b1',
        destination: '/blog/metodos/cursos-online-ingles-b1',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-b2',
        destination: '/blog/metodos/ingles-b2',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-c1',
        destination: '/blog/metodos/ingles-c1',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-c2',
        destination: '/blog/metodos/ingles-c2',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-preparacion-examen-b1-cambridge',
        destination: '/blog/examenes/preparacion-examen-b1-cambridge',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-gramatica-ingles-b1-guia',
        destination: '/blog/gramatica/gramatica-ingles-b1-guia',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-vocabulario-b1-ingles-trabajo',
        destination: '/blog/trabajo/vocabulario-b1-ingles-trabajo',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-para-hosteleria',
        destination: '/blog/trabajo/ingles-para-camareros-y-hosteleria',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-para-atencion-al-cliente',
        destination: '/blog/trabajo/ingles-para-atencion-al-cliente',
        statusCode: 301,
      },
      {
        source: '/curso-ingles-para-salud',
        destination: '/blog/trabajo/ingles-para-salud',
        statusCode: 301,
      },

      {
        source: '/blog/vocabulario',
        destination: '/blog/metodos',
        statusCode: 301,
      },
      {
        source: '/blog/vocabulario/:slug*',
        destination: '/blog/metodos/:slug*',
        statusCode: 301,
      },
      {
        source: '/blog/habilidades',
        destination: '/blog/metodos',
        statusCode: 301,
      },
      {
        source: '/blog/habilidades/:slug*',
        destination: '/blog/metodos/:slug*',
        statusCode: 301,
      },
      // SEO - Redirecciones específicas de antiguos artículos en /blog/seo/
      {
        source: '/blog/seo/ingles-para-viajar',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/seo/ingles-para-trabajo',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/blog/seo/ingles-a1',
        destination: '/blog/metodos/ingles-a1',
        statusCode: 301,
      },
      {
        source: '/blog/seo/ingles-a2',
        destination: '/blog/metodos/ingles-a2',
        statusCode: 301,
      },
      {
        source: '/blog/seo/cursos-online-ingles-b1',
        destination: '/blog/metodos/cursos-online-ingles-b1',
        statusCode: 301,
      },
      {
        source: '/blog/seo/ingles-b2',
        destination: '/blog/metodos/ingles-b2',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/guia-definitiva-viajes',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/business-english-emails',
        destination: '/blog/trabajo/plantillas-emails-profesionales-ingles',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/entrevistas-trabajo-ingles-guia',
        destination: '/blog/trabajo/preparar-entrevista-trabajo-ingles',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/ingles-derecho-legal-guia',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/ingles-aeropuertos-checklist',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/ingles-emergencias-viaje',
        destination: '/blog/viajes/frases-ingles-emergencias-viajes',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/ingles-hoteles-guia',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/ingles-finanzas-economia-guia',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/ingles-marketing-ventas-guia',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/ingles-trabajar-extranjero-guia',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/entrevista-trabajo-exito',
        destination: '/blog/trabajo/preparar-entrevista-trabajo-ingles',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/vocabulario-negocios-ingles-esencial',
        destination: '/blog/trabajo/vocabulario-negocios-ingles-profesional',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/cv-ingles-guia',
        destination: '/blog/trabajo/cv-ingles',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/guia-definitiva-curso-ingles-profesional',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/ingles-entrevistas-remotas-exito',
        destination: '/blog/trabajo/preparar-entrevista-trabajo-ingles',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/negociaciones-ingles-guia',
        destination: '/blog/trabajo/negociacion-ingles-tecnicas-clave',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/reuniones-ingles-guia',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/ingles-nomadas-digitales-mochileros',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/ingles-para-viajar-guia',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/ingles-restaurantes-guia',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/como-preparar-ingles-viaje-largo',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/cultura-y-etiqueta-paises-anglosajones',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/guia-maestra-curso-ingles-viajeros',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/inmigracion-ingles-guia',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/supervivencia-ingles-transporte-publico',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/examenes/guia-examen-aptis',
        destination: '/certificaciones-ingles-oficiales',
        statusCode: 301,
      },
      {
        source: '/blog/examenes/ielts-vs-toefl-diferencias',
        destination: '/certificaciones-ingles-oficiales',
        statusCode: 301,
      },
      {
        source: '/blog/examenes/guia-precios-cambridge-2026',
        destination: '/certificaciones-ingles-oficiales',
        statusCode: 301,
      },
      // /blog/seo/ → /blog/examenes/
      { source: '/blog/seo/precios-examenes-cambridge', destination: '/blog/examenes/precios-examenes-cambridge', statusCode: 301 },
      { source: '/blog/seo/cambridge-b2-first-guia', destination: '/blog/examenes/cambridge-b2-first-estrategias-aprobar', statusCode: 301 },
      { source: '/blog/seo/cambridge-c1-advanced-guia', destination: '/blog/examenes/cambridge-c1-advanced-guia', statusCode: 301 },
      { source: '/blog/seo/cambridge-c2-proficiency-guia', destination: '/blog/examenes/cambridge-c2-proficiency-guia', statusCode: 301 },
      { source: '/blog/seo/guia-examen-aptis', destination: '/certificaciones-ingles-oficiales', statusCode: 301 },
      { source: '/blog/seo/ielts-vs-toefl-diferencias', destination: '/certificaciones-ingles-oficiales', statusCode: 301 },
      { source: '/blog/seo/linguaskill-cambridge-guia', destination: '/blog/examenes/guia-linguaskill-cambridge', statusCode: 301 },
      { source: '/blog/seo/mejores-certificados-ingles-2026', destination: '/blog/examenes/mejores-certificados-ingles-2026', statusCode: 301 },
      { source: '/blog/seo/preparacion-examen-b1-cambridge', destination: '/blog/examenes/preparacion-examen-b1-cambridge', statusCode: 301 },
      { source: '/blog/seo/reported-speech-cambridge-exams', destination: '/blog/examenes/reported-speech-cambridge-exams', statusCode: 301 },
      // /blog/seo/ → /blog/trabajo/
      { source: '/blog/seo/business-english-emails', destination: '/blog/trabajo/plantillas-emails-profesionales-ingles', statusCode: 301 },
      { source: '/blog/seo/entrevistas-trabajo-ingles-guia', destination: '/blog/trabajo/preparar-entrevista-trabajo-ingles', statusCode: 301 },
      { source: '/blog/seo/ingles-derecho-legal-guia', destination: '/blog/trabajo/ingles-para-trabajo', statusCode: 301 },
      { source: '/blog/seo/ingles-finanzas-economia-guia', destination: '/blog/trabajo/ingles-para-trabajo', statusCode: 301 },
      { source: '/blog/seo/ingles-marketing-ventas-guia', destination: '/blog/trabajo/ingles-para-trabajo', statusCode: 301 },
      { source: '/blog/seo/ingles-para-atencion-al-cliente', destination: '/blog/trabajo/ingles-para-atencion-al-cliente', statusCode: 301 },
      { source: '/blog/seo/ingles-para-hosteleria', destination: '/blog/trabajo/ingles-para-camareros-y-hosteleria', statusCode: 301 },
      { source: '/blog/seo/ingles-para-ingenieros', destination: '/blog/trabajo/ingles-para-ingenieros', statusCode: 301 },
      { source: '/blog/seo/ingles-para-salud', destination: '/blog/trabajo/ingles-para-salud', statusCode: 301 },
      { source: '/blog/seo/ingles-trabajar-extranjero-guia', destination: '/blog/trabajo/ingles-para-trabajo', statusCode: 301 },
      { source: '/blog/seo/vocabulario-b1-ingles-trabajo', destination: '/blog/trabajo/vocabulario-b1-ingles-trabajo', statusCode: 301 },
      // /blog/seo/ → /blog/viajes/
      { source: '/blog/seo/ingles-emergencias-viaje', destination: '/blog/viajes/frases-ingles-emergencias-viajes', statusCode: 301 },
      { source: '/blog/seo/ingles-nomadas-digitales-mochileros', destination: '/blog/viajes/ingles-para-viajar', statusCode: 301 },
      // wildcard: resto de /blog/seo/ → /blog/metodos/
      {
        source: '/blog/seo/:slug*',
        destination: '/blog/metodos/:slug*',
        statusCode: 301,
      },
      
      // AUTENTICACIÓN - Unificar rutas duplicadas
      {
        source: '/signin',
        destination: '/cuenta/login',
        statusCode: 301,
      },
      {
        source: '/login',
        destination: '/cuenta/login',
        statusCode: 301,
      },
      {
        source: '/register',
        destination: '/cuenta/registro',
        statusCode: 301,
      },
      {
        source: '/signup',
        destination: '/cuenta/registro',
        statusCode: 301,
      },
      {
        source: '/forgot-password',
        destination: '/cuenta/recuperar',
        statusCode: 301,
      },
      
      // RENOMBRAR PÁGINAS PRINCIPALES
      {
        source: '/contact',
        destination: '/contacto',
        statusCode: 301,
      },
      
      // ÁREA DE ESTUDIANTE
      // Dashboard ahora está directamente en /dashboard
      {
        source: '/estudiante/dashboard',
        destination: '/dashboard',
        statusCode: 301,
      },
      
      // ELIMINACIÓN DE RUTAS /curso/ingles-*
      {
        source: '/curso/ingles-a2',
        destination: '/curso-a2',
        statusCode: 301,
      },
      {
        source: '/curso/ingles-b2',
        destination: '/planes',
        statusCode: 301,
      },

      // ELIMINACIÓN DE PÁGINAS Y RUTAS (SEO 301 a Home)
      {
        source: '/metodologia',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/cursos/:path*',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/cursos',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/diagnostico',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/cursos-especializados',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/certificaciones',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/trabajo/:nivel',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/viajes/:nivel',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/examenes/:nivel',
        destination: '/',
        statusCode: 301,
      },

      // PÁGINAS FALTANTES
      {
        source: '/proximamente',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/about',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/apple-app-site-association',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/.well-known/apple-app-site-association',
        destination: '/',
        statusCode: 301,
      },

      // BLOG - Artículos eliminados o renombrados
      {
        source: '/blog/pronunciacion',
        destination: '/blog',
        statusCode: 301,
      },
      {
        source: '/blog/Gram%C3%A1tica',
        destination: '/blog/gramatica',
        statusCode: 301,
      },
      {
        source: '/blog/Gram%C3%A1tica/:slug*',
        destination: '/blog/gramatica/:slug*',
        statusCode: 301,
      },
      {
        source: '/blog/Vocabulario',
        destination: '/blog/metodos',
        statusCode: 301,
      },
      {
        source: '/blog/Vocabulario/:slug*',
        destination: '/blog/metodos/:slug*',
        statusCode: 301,
      },
      {
        source: '/blog/Habilidades',
        destination: '/blog/metodos',
        statusCode: 301,
      },
      {
        source: '/blog/Habilidades/:slug*',
        destination: '/blog/metodos/:slug*',
        statusCode: 301,
      },

      {
        source: '/blog/ingles-profesional-sectores',
        destination: '/blog/trabajo/ingles-para-trabajo',
        statusCode: 301,
      },
      {
        source: '/blog/preparar-examenes-oficiales',
        destination: '/certificaciones-ingles-oficiales',
        statusCode: 301,
      },
      {
        source: '/blog/ingles-esencial-viajar',
        destination: '/blog/viajes/ingles-para-viajar',
        statusCode: 301,
      },
      {
        source: '/blog/tiempos-verbales-ingles-a1-presente',
        destination: '/blog/metodos/ingles-a1',
        statusCode: 301,
      },
      {
        source: '/blog/vocabulario-esencial-ingles-a1-principiantes',
        destination: '/blog/metodos/ingles-a1',
        statusCode: 301,
      },
      {
        source: '/blog/gramatica-basica-ingles-a1-principiantes',
        destination: '/blog/metodos/ingles-a1',
        statusCode: 301,
      },

      // ANTI-CANIBALIZACIÓN - Artículos duplicados fusionados
      {
        source: '/blog/examenes/cambridge-c2-proficiency-guia-preparacion',
        destination: '/blog/examenes/cambridge-c2-proficiency-guia',
        statusCode: 301,
      },
      {
        source: '/blog/gramatica/diptongos-ingles-lista-guia',
        destination: '/blog/gramatica/diptongos-ingles-lista-completa',
        statusCode: 301,
      },
      {
        source: '/blog/gramatica/schwa-ingles-sonido-clave',
        destination: '/blog/gramatica/schwa-ingles-el-sonido-mas-importante',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/ingles-presentaciones-impacto',
        destination: '/blog/trabajo/como-hacer-presentaciones-en-ingles',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/presentaciones-ingles-guia',
        destination: '/blog/trabajo/como-hacer-presentaciones-en-ingles',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/emails-profesionales-ingles',
        destination: '/blog/trabajo/plantillas-emails-profesionales-ingles',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/redaccion-emails-profesionales-ingles',
        destination: '/blog/trabajo/plantillas-emails-profesionales-ingles',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/entrevista-trabajo-ingles-frases',
        destination: '/blog/trabajo/preparar-entrevista-trabajo-ingles',
        statusCode: 301,
      },
      {
        source: '/blog/examenes/cambridge-b2-first-guia',
        destination: '/blog/examenes/cambridge-b2-first-estrategias-aprobar',
        statusCode: 301,
      },
      {
        source: '/blog/examenes/guia-b2-first-fce',
        destination: '/blog/examenes/cambridge-b2-first-estrategias-aprobar',
        statusCode: 301,
      },
      {
        source: '/blog/examenes/linguaskill-cambridge-guia',
        destination: '/blog/examenes/guia-linguaskill-cambridge',
        statusCode: 301,
      },
      {
        source: '/blog/trabajo/ingles-para-hosteleria',
        destination: '/blog/trabajo/ingles-para-camareros-y-hosteleria',
        statusCode: 301,
      },
      {
        source: '/blog/viajes/ingles-para-camareros-guia',
        destination: '/blog/trabajo/ingles-para-camareros-y-hosteleria',
        statusCode: 301,
      },

      // FAVICON Y LOGO
      {
        source: '/favicon.ico',
        destination: '/icon.svg',
        statusCode: 301,
      },
      {
        source: '/logo.png',
        destination: '/',
        statusCode: 301,
      },
    ];
  },
  async rewrites() {
    return [
      // Evita bucles de redirección con reglas legacy externas para esta URL.
      {
        source: '/curso-ingles-para-ingenieros',
        destination: '/blog/trabajo/ingles-para-ingenieros',
      },
    ];
  },
  
  images: {
    domains: ['images.pexels.com', 'placehold.co'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  reactStrictMode: true,
  // Cabeceras de seguridad y compresión
  async headers() {
    const supabaseHost = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nprqtjljoekoirlrjxlh.supabase.co').replace(/^https?:\/\//, '');
    const csp = [
      "default-src 'self'",
      [
        "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
        "https://static.cloudflareinsights.com",
        "https://consent.cookiebot.com",
        "https://consentcdn.cookiebot.com",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://js.stripe.com",
        // Google AdSense (pagead / tags / SODAR calidad de tráfico)
        "https://pagead2.googlesyndication.com",
        "https://www.googletagservices.com",
        "https://www.google.com",
        "https://www.gstatic.com",
        "https://ep1.adtrafficquality.google",
        "https://ep2.adtrafficquality.google",
        "https://partner.googleadservices.com",
        // Funding Choices (mensajes de consentimiento / AdSense)
        "https://fundingchoicesmessages.google.com",
        // Monetag
        "https://quge5.com",
        "https://5gvci.com",
        "https://p0p.com",
        "https://6p0p.com",
        "https://6opo.com",
        "https://auqot.com",
        "https://jmosl.com",
        "https://094kk.com",
        "https://tzegilo.com",
        "https://*.p0p.com",
        "https://*.6p0p.com",
        "https://*.6opo.com",
        "https://*.auqot.com",
        "https://*.jmosl.com",
        "https://*.094kk.com",
        "https://*.tzegilo.com",
      ].join(' '),
      [
        "connect-src 'self'",
        `https://${supabaseHost}`,
        `wss://${supabaseHost}`,
        "https://consentcdn.cookiebot.com",
        "https://consent.cookiebot.com",
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
        "https://vitals.vercel-insights.com",
        "https://static.cloudflareinsights.com",
        "https://api.stripe.com",
        // AdSense / anuncios (beacons, bidding, métricas)
        "https://pagead2.googlesyndication.com",
        "https://googleads.g.doubleclick.net",
        "https://stats.g.doubleclick.net",
        "https://www.google.com",
        "https://ep1.adtrafficquality.google",
        "https://ep2.adtrafficquality.google",
        "https://fundingchoicesmessages.google.com",
        // Monetag
        "https://quge5.com",
        "https://5gvci.com",
        "https://p0p.com",
        "https://6p0p.com",
        "https://6opo.com",
        "https://auqot.com",
        "https://jmosl.com",
        "https://094kk.com",
        "https://zdzhk.com",
        "https://dawac.com",
        "https://bobapsoabauns.com",
        "https://my.rtmark.net",
        "https://*.p0p.com",
        "https://*.6p0p.com",
        "https://*.6opo.com",
        "https://*.auqot.com",
        "https://*.jmosl.com",
        "https://*.094kk.com",
        "https://*.zdzhk.com",
        "https://*.dawac.com",
        "https://*.bobapsoabauns.com",
        "https://*.rtmark.net",
      ].join(' '),
      [
        "img-src 'self' data: blob:",
        "https://images.pexels.com",
        "https://placehold.co",
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
        "https://pagead2.googlesyndication.com",
        "https://googleads.g.doubleclick.net",
        "https://tpc.googlesyndication.com",
        "https://www.google.com",
        "https://www.gstatic.com",
        // Monetag
        "https://p0p.com",
        "https://6p0p.com",
        "https://6opo.com",
        "https://bobapsoabauns.com",
        "https://*.p0p.com",
        "https://*.6p0p.com",
        "https://*.6opo.com",
        "https://*.bobapsoabauns.com",
      ].join(' '),
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data: https://fonts.gstatic.com",
      [
        "frame-src",
        "https://consentcdn.cookiebot.com",
        "https://js.stripe.com",
        "https://hooks.stripe.com",
        "https://googleads.g.doubleclick.net",
        "https://tpc.googlesyndication.com",
        "https://pagead2.googlesyndication.com",
        "https://www.google.com",
        // SODAR (AdSense) iframes en ep*.adtrafficquality.google
        "https://ep1.adtrafficquality.google",
        "https://ep2.adtrafficquality.google",
        "https://fundingchoicesmessages.google.com",
        // Monetag
        "https://p0p.com",
        "https://6p0p.com",
        "https://6opo.com",
        "https://*.p0p.com",
        "https://*.6p0p.com",
        "https://*.6opo.com",
      ].join(' '),
      "media-src 'self' blob:",
      [
        "worker-src 'self' blob:",
        "https://www.google.com",
        "https://pagead2.googlesyndication.com",
        "https://5gvci.com",
        // Monetag (runtime dinámico)
        "https://p0p.com",
        "https://6p0p.com",
        "https://6opo.com",
        "https://*.p0p.com",
        "https://*.6p0p.com",
        "https://*.6opo.com",
      ].join(' '),
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      // Recursos estáticos (CSS, JS chunks): caché 1 año
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ];
  },
  // Deshabilitar styled-jsx completamente
  compiler: {
    styledComponents: false,
    // Deshabilitar la transformación de styled-jsx
    emotion: false,
  },
  // Paquetes externos que deben ejecutarse en el servidor
  serverExternalPackages: ['resend'],

  // Webpack: sin alias React - ExerciseRenderer ya no usa framer-motion en ruta crítica
  webpack: (config) => config,
}

module.exports = withBundleAnalyzer(nextConfig)
