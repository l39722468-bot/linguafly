# Plan SEO: clúster de IA, exámenes digitales y PAU

Actualizado el 26 de septiembre de 2026. Este plan fija qué URL es dueña de cada intención, cómo se enlazan y qué no debe publicarse en otro sitio del dominio. No incluye volúmenes ni “baja competencia”: eso solo lo diría Keyword Planner u otra fuente de demanda, y aquí no se ha consultado.

## Arquitectura

Los artículos de inglés viven en `/blog/{categoria}/{slug}`. Las categorías de este clúster son `metodos`, `examenes` y `trabajo`. No van a `inteligencia-artificial`: esa vertical es uso práctico de chatbots y la guía editorial pide no mezclarla con cursos de inglés ni canibalizar `aprender-ingles-con-chatgpt`.

`/ingles-selectividad` y `/ingles-selectividad/{comunidad}` no son rutas públicas. El middleware las trataría como página aparcada y las redirigiría. El hub de selectividad es `/blog/examenes/como-preparar-ingles-pau`.

Cada URL cubre un tema y sus variantes en el cuerpo, las FAQ y los enlaces. No se crea una página por cada frase long-tail.

## Quién es dueño de cada búsqueda

| Intención | URL canónica | No competir con |
| --- | --- | --- |
| ¿Merece la pena aprender inglés con IA? | `/blog/metodos/merece-la-pena-aprender-ingles-con-ia` | Pilar del clúster. El resto enlaza aquí. |
| Aprender inglés con ChatGPT (guía general) | `/blog/metodos/aprender-ingles-con-chatgpt` | Ya indexada. No redirigir. |
| Cómo usar ChatGPT sin copiar | `/blog/metodos/como-usar-chatgpt-para-aprender-ingles-sin-hacer-trampas` | Intención distinta: práctica frente a dependencia. |
| IA para corregir writing | `/blog/examenes/ia-corregir-writing-ingles` | Essay CAE e IELTS Task 2 siguen siendo los dueños del examen concreto. |
| PAU / selectividad / EvAU / EBAU (método) | `/blog/examenes/como-preparar-ingles-pau` | No unificar comunidades en un solo modelo. |
| PAU por comunidad | `/blog/examenes/ingles-pau-{madrid,andalucia,cataluna,galicia}` | Cada una solo cita su fuente. |
| Calendario, writing, reading, rephrasing PAU | slugs `calendario-estudio-ingles-pau`, `writing-pau-ingles`, `reading-pau-ingles`, `rephrasing-ingles-pau` | Satélites del hub. |
| Inglés para trabajar en IA | `/blog/trabajo/ingles-para-trabajar-en-inteligencia-artificial` | El CV IT sigue en `cv-ingles-tecnologia-it`. |
| Vocabulario de IA | `/blog/trabajo/vocabulario-inteligencia-artificial-ingles` | Glosario. El artículo de empleo no repite las 60 fichas. |
| Exámenes digitales (genérico) | `/blog/examenes/examenes-de-ingles-digitales` | IELTS ordenador/papel y “IELTS solo ordenador 2026” siguen siendo los dueños del caso IELTS. |
| IA e IELTS Speaking | `/blog/examenes/ia-para-practicar-ielts-speaking` | `ielts-speaking-estrategias` e `ielts-listening-estrategias` no se reescriben. |
| Adultos con jornada completa | `/blog/metodos/aprender-ingles-si-trabajo-todo-el-dia` | `como-estudiar-ingles-sin-tiempo` sigue siendo el dueño de “sin tiempo”. |
| Certificado sanitario | `/blog/trabajo/certificado-ingles-sanidad` | Vocabulario clínico y comunicación hospitalaria siguen en sus URLs. |

## Plantilla on-page

- Un solo H1: el `title` del frontmatter. El markdown no lleva `#`.
- Título entre 30 y 65 caracteres. Description entre 120 y 170.
- La keyword principal aparece en el título o en el primer párrafo, y en una FAQ si encaja sin forzarla.
- Al menos un H3.
- FAQ que responden la variante, no que repiten el título.
- `related_routes` con slugs del clúster y de la página antigua que no debemos canibalizar.
- Enlace contextual al pilar y al siguiente paso práctico (ejercicio, curso o guía ya indexada).
- Canonical absoluto en `https://linguafly.app`, sin `www`, sin barra final y sin parámetros.

## Patrón noticia → recurso

Las piezas de actualidad no se quedan en el gancho:

1. Qué se ha dicho, con la reserva editorial (no es una medición de Linguafly, no es una norma española, no vale para otra comunidad).
2. Explicación práctica.
3. Ejercicio, plantilla, rúbrica de estudio o test.
4. Enlace a la guía evergreen que ya rankea o a la página hermana del clúster.
5. Siguiente paso de curso (A1–C1, pronunciación, inglés profesional) solo cuando el nivel encaja.

Ejemplo: la investigación de IELTS sobre IA conversacional vive en `ia-para-practicar-ielts-speaking`, y la guía permanente de las tres partes sigue en `ielts-speaking-estrategias`. No hay segunda URL “cómo practicar IELTS Speaking solo”: esa variante está en el mismo artículo, para no partir la intención.

## Enlazado interno

Pilar `merece-la-pena-aprender-ingles-con-ia` apunta a ChatGPT sin trampas, writing, vocabulario, empleo en IA y el plan de adultos.

Satélites de PAU apuntan al hub y a madrid / andalucía / cataluña / galicia. Cada comunidad apunta al hub, al calendario y a reading, writing y rephrasing. Andalucía es la única que detalla bloques y puntos, porque hay orientaciones oficiales. Las demás dicen expresamente que ese esquema no es el suyo.

Enlaces añadidos en páginas ya indexadas, una frase, sin cambiar su keyword:

- `aprender-ingles-con-chatgpt` → sin trampas
- `como-estudiar-ingles-sin-tiempo` → jornada completa
- `ielts-speaking-estrategias` → speaking con IA
- `ielts-computer-vs-papel` → exámenes digitales
- `writing-essay-cae` → corregir writing con IA
- `cv-ingles-tecnologia-it` → inglés para trabajar en IA
- `ingles-para-salud` → certificado de sanidad

## Límites editoriales

- No afirmar que el debate escolar de China en septiembre de 2026 describe España.
- El 64 % y el “casi 50 %” se atribuyen a prensa, no a un estudio auditado por Linguafly. No se inventa el nombre del informe.
- México / 25.000 licencias, premios e-Assessment 2026, actualización del British Council para adultos, investigación de IELTS y el reconocimiento de pruebas Cambridge para ciertas categorías de visado sanitario en EE. UU. se cuentan como anuncios o comunicaciones, no como norma universal ni española.
- Sanidad: fecha de actualización, y aviso de que el requisito depende de profesión, empleador, regulador y país.
- PAU: no copiar criterios de una comunidad a otra. Fuentes usadas en los artículos: calendario y acceso de la Comunidad de Madrid; orientaciones de Inglés 2025-2026 y noticia de fechas de la Junta de Andalucía; Canal Universitats (PAU y día de la prueba); CIUG, UDC y DOG de 16 de febrero de 2026 para Galicia.
- La rúbrica B1/B2/C1 de writing y la de speaking son de estudio. No son descriptores oficiales de Cambridge ni bandas IELTS.
- No hay simulador de voz nuevo en estas URLs. El speaking se graba con el móvil y se enlaza la pronunciación y las estrategias ya publicadas.

## Orden de publicación ya cubierto en este cambio

Primero el bloque de conversación vigente: pilar de IA, ChatGPT sin trampas, writing, vocabulario, empleo tecnológico y exámenes digitales, más IELTS Speaking, adultos y sanidad.

A la vez, el hub de PAU y los satélites (calendario, writing, reading, rephrasing y cuatro comunidades), para que el rastreo no espere a la primavera. Las convocatorias ordinarias citadas caen en junio de 2026; Cataluña tiene extraordinaria en septiembre.

## Producción

El markdown de `src/content/blog` es la fuente de autoría. En producción los artículos se leen desde D1. Hay que ejecutar la sincronización (`articles:sync` / `scripts/sync-articles-to-d1.ts`) para que estas URLs salgan en el sitio público. En local, sin producción, el fallback lee el markdown.

Después de añadir ficheros, `scripts/generate-article-canonical-paths.mjs` regenera `src/lib/seo/article-canonical-paths.json`, que es el listado que el worker lleva empaquetado.

Estas URLs nuevas no necesitan entrada en `serp-overrides.ts`: ese mapa solo fuerza títulos ya publicados cuya fila en D1 podía quedar vieja.

## Medición

En Search Console, agrupar por la URL canónica, no por la variante de keyword. Mirar, pasadas unas semanas de indexación:

- impresiones de la query principal y de dos variantes (por ejemplo “rephrasing inglés selectividad” en el satélite, no en el hub);
- que `aprender-ingles-con-chatgpt` no pierda clics a favor de la URL “sin trampas” en la query genérica;
- que las comunidades no se canibalicen entre sí (cada una debe rankear con el nombre del territorio);
- CTR bajo con impresiones altas: reescribir title y description, no publicar otra página del mismo tema.

No se promete posición. El objetivo es que cada intención tenga una URL clara, enlazada y fechada donde el dato es normativo.
