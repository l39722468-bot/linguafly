---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "No pegar secretos ni el .env"
description: >-
  No pegar secretos en ChatGPT: si pegaste una API key o el .env, rota
  la clave ahora. Redacta tokens del log y pide ayuda con el texto limpio.
readTime: 11 min
keywords:
  - no pegar secretos en chatgpt
  - api keys y chatbots
  - anonimizar un error de autenticación
  - ia y variables de entorno
  - rotar una clave si la pegaste
  - .env en un prompt
  - redactar tokens de un log
excerpt: >-
  Si pegaste una clave, un token o el .env, rota ya. El prompt se redacta
  sin secretos: el chat no es tu gestor de credenciales.
canonical: 'https://linguafly.app/blog/inteligencia-artificial/no-pegar-secretos-ni-el-env'
related_routes:
  - privacidad-al-usar-ia-que-no-pegar-nunca
  - pedir-que-te-expliquen-un-error-de-codigo
  - dni-nie-y-documentos-de-identidad
  - chat-temporal-o-modo-que-no-guarda
  - contratos-de-clientes-fuera-del-chat-de-consumidor
faqs:
  - question: ¿Qué hago si ya pegué una API key en ChatGPT?
    answer: "Rotas la clave en el panel del proveedor. No esperes a ‘borrar el hilo’. El envío ya salió. Revocas o regeneras. Actualizas el .env local y el secreto en el servidor. Luego redactas el prompt y pides ayuda sin el valor."
  - question: ¿Puedo pegar el .env si quito las contraseñas y dejo los nombres?
    answer: "Los nombres de variable suelen ser inocuos (OPENAI_API_KEY, DATABASE_URL). Los valores no. Si el archivo mezcla comentarios con un token a medias, no lo pegas. Describe el stack en una línea: ‘Python, una clave de API en variable de entorno, 401 al llamar a /v1/widgets’. Eso basta."
  - question: ¿El chat temporal lava una clave pegada?
    answer: "No. El texto sale igual de tu máquina. El modo que no guarda el hilo en la barra no deshace el envío ni rota la clave. Temporal no es un gestor de secretos. Si ya pegaste, rotas. El detalle del modo está en el artículo de chat temporal."
  - question: ¿Puedo pegar un log de 401 si lleva Authorization?
    answer: "No con la cabecera. Redactas: quitas Bearer, cookies, JWT, request_id si apunta a un cliente, y cualquier sk- o token. Dejas el código HTTP, el endpoint recortado y lo que ya probaste. Anonimizar un error de autenticación es eso: el fallo, no la llave."
  - question: ¿Esto es lo mismo que no pegar un DNI o datos personales?
    answer: "No. El pilar de privacidad cubre personas, salud, menores y secretos de un cliente. Esta página es credenciales: API keys, .env, tokens de un log. Un DNI no se pega tampoco; es otro satélite. Aquí el trabajo es rotar y redactar, no anonimizar un nombre."
---

**No pegar secretos en ChatGPT** no es un consejo de higiene vaga. Es una regla de credenciales: una API key, un token, un `.env` o una cabecera `Authorization` **no entran** en un chatbot de consumo. Si ya los pegaste, **rotar una clave si la pegaste** es el primer gesto. El segundo es redactar. El chat no revoca nada por ti.

Esta página no es el pilar de [privacidad al usar IA: qué no pegar nunca](/blog/inteligencia-artificial/privacidad-al-usar-ia-que-no-pegar-nunca). Allí van DNI, salud, menores y textos que identifican a alguien. Tampoco es el satélite de [DNI, NIE y documentos de identidad](/blog/inteligencia-artificial/dni-nie-y-documentos-de-identidad). Aquí el objeto es otro: **API keys y chatbots**, **IA y variables de entorno**, tokens en un log. Personas aparte. Llaves aparte.

## Qué cuenta como secreto (y qué no)

Un secreto, en este artículo, es un valor que abre un sistema si lo tienes. No es un nombre de función. No es un traceback de Python recortado. Es la llave.

Entra en la lista, y no se pega:

- **Claves de API.** `OPENAI_API_KEY`, tokens de Stripe, GitHub, AWS, un webhook, un `sk-` de cualquier proveedor. Aunque el chat “prometa” no guardarlo.
- **El archivo `.env`.** Entero. Aunque “solo quiero que me digas si está bien formado”. La forma se describe: `CLAVE=valor` en local, no se envía.
- **Tokens de sesión y JWT.** Cookies de admin, `Bearer`, refresh tokens, `x-api-key`.
- **Cadenas de conexión.** Usuario y contraseña de una base, un Redis, un S3. Aunque el host sea “de pruebas”.
- **Secretos de CI.** `GITHUB_TOKEN`, claves de despliegue, certificados en claro, `id_rsa`.
- **Capturas.** Pantallazo del panel de un proveedor con la key visible. El clip es el mismo envío que Ctrl+V.

No es secreto, y a menudo sí se puede pegar recortado:

- El **nombre** de la variable (`OPENAI_API_KEY`), sin valor.
- El código HTTP (`401`, `403`, `429`).
- El **path** del endpoint (`POST /v1/widgets`), sin query con tokens.
- El lenguaje y la librería (`Python 3.12`, `httpx`, una línea de tu código **sin** el header).
- Lo que ya probaste: “he regenerado la key en el panel y sigue 401” (sin pegar la key nueva).

Si dudas entre las dos listas, es secreto. No pegas. Describes.

**IA y variables de entorno:** el modelo no necesita ver el valor para decirte que un 401 suele ser clave mal copiada, entorno equivocado o cabecera mal armada. Necesita el síntoma. El valor no aporta diagnóstico. Aporta superficie.

## API keys y chatbots: la regla antes de Ctrl+V

**API keys y chatbots** fallan el martes de la misma forma. Marta tiene un 401. El panel del proveedor muestra `sk-…`. El log local muestra `Authorization: Bearer sk-…`. El atajo es pegar “todo el error” en ChatGPT, Gemini, Claude o el Copilot de consumo. El atajo es el incidente.

Antes de pegar, tres preguntas. Si una falla, no pegas.

1. **¿Este texto contiene un valor que abre algo?** Si sí, fuera. Aunque sea “de desarrollo”. Aunque “caduca en una hora”. Aunque “es un proyecto personal”.
2. **¿Puedo decir el fallo en una frase sin el valor?** “401 al POST /v1/widgets con httpx, la key está en os.environ, acabo de rotarla.” Si sí, esa frase es el prompt.
3. **¿Lo pegaría en un issue público de GitHub?** Si la respuesta es no, el chat tampoco. El chat no es privado por ser una caja en tu pantalla.

Cuentas. La cuenta personal del chatbot no es el almacén de secretos de la empresa. Un modelo no es un gestor de secretos. Un modelo predice texto.

Vale para ChatGPT, Gemini, Claude, Copilot de consumo y el chat del editor. El nombre de la marca no te salva. El interruptor de “no entrenar con mis chats” no rota la clave. Reduce un uso. El texto igual viaja.

`.env` en un prompt. El archivo existe para no meter secretos en el código. Pegarlo al chat deshace esa separación en un segundo. No pidas “revisa si me falta alguna variable”. Lista los **nombres** que tienes, en un mensaje tuyo, sin valores:

```
Tengo estas variables (solo nombres): OPENAI_API_KEY, DATABASE_URL, APP_ENV.
APP_ENV=development lo puedo decir; los valores de las otras dos no.
Síntoma: 401 en POST /v1/widgets.
Qué ya hice: leí que la key está cargada (len > 0), no imprimo el valor.
No pegues ejemplos con claves reales. Usa sk-REDACTED.
```

Eso es **`.env` en un prompt** bien hecho: nombres, síntoma, lo que ya miraste. Cero valores.

## Anonimizar un error de autenticación (ejemplo de Marta)

**Anonimizar un error de autenticación** no es poner “por favor, ignora la key”. El modelo no tiene un contrato. Es **redactar tokens de un log** con las manos, antes de Ctrl+V.

El caso. Marta llama a un API de widgets desde un script. Recibe 401. El log, tal cual sale de la librería, parece útil. No lo es para un chat. Lleva la llave.

Mal (no se pega, no se reenvía, no se “corrige” pegando otra vez):

```
ERROR 401 Unauthorized
POST https://api.ejemplo.com/v1/widgets?user=marta
Authorization: Bearer sk-REDACTED
Cookie: session=REDACTED
X-Request-Id: 8f3a… (id de un cliente)
Body: {"email": "marta@empresa.com", "cuenta": "ACME-991"}
```

Bien. Lo que sí pega Marta, después de un minuto con el bloc:

```
Lenguaje: Python 3.12, httpx.
Síntoma: 401 en POST /v1/widgets. El cuerpo de error dice "invalid_api_key".
Cabecera: Authorization Bearer (el valor no va).
La key se carga de OPENAI_API_KEY (nombre). len(key) > 0. No la imprimo.
APP_ENV: development. No hay proxy corporativo que yo sepa.
Ya probé: nueva terminal para recargar el .env; no mezclé comillas en el valor.
Pide: tres causas frecuentes de 401 invalid_api_key en este setup.
Prohibido: pedirme la key, inventar un panel, generar un sk- de ejemplo realista.
```

Compruebas el pegado, línea a línea, no “de oído”:

1. Cero `sk-`, cero `Bearer` con token, cero cookies.
2. Cero email, cero cuenta de cliente, cero request_id que apunte a un expediente.
3. El endpoint es un path, no una URL con query de sesión.
4. El síntoma está: 401, `invalid_api_key`.
5. Lo ya probado está. El modelo no tiene que adivinar si recargó el entorno.

Si el log es un stack trace de treinta líneas, recorta. El fallo de autenticación rara vez necesita el interior de `site-packages`. Tres líneas tuyas más el mensaje de la API. El resto, para [pedir que te expliquen un error de código](/blog/inteligencia-artificial/pedir-que-te-expliquen-un-error-de-codigo): el traceback **ya redactado**, el lenguaje, lo que ya probaste. Ese artículo es el oficio del error. Este es el filtro de secretos **antes**.

Intento vago de Marta: “te pego el .env y el log, dime qué pasa.” Eso no se envía. Intento útil: el bloque de arriba. Salida típica que sí puedes usar: “estás leyendo otra variable; el entorno no se recargó; la key es de otro proyecto del panel.” Ninguna de esas hipótesis pide el valor.

Un extra que parece limpio y no lo es: pegar una URL de base con host y usuario “porque la contraseña ya dice REDACTED”. Si identifica un servidor de cliente, sigue siendo de más. Di: “Postgres en local, la URL no va.” Punto.

## Rotar una clave si la pegaste

**Rotar una clave si la pegaste** no espera a borrar el hilo. Borrar en la interfaz es un gesto. No es una revocación en el proveedor. El orden es el del daño, no el de la vergüenza.

Haces esto, hoy, en este orden:

1. **Dejas de usar esa clave.** No la “corrijas” en el mismo chat. No pidas “bórrala de tu memoria”. El modelo no es el panel.
2. **Entras en el panel del proveedor** (OpenAI, Stripe, GitHub, el cloud que sea). Revocas o regeneras. El nombre del botón cambia. El trabajo no: esa cadena deja de abrir.
3. **Actualizas todos los sitios donde vivía.** `.env` local. Secretos del servidor. CI. El gestor de secretos de la empresa, si lo hay. Un compañero a quien se la reenviaste por Slack: también.
4. **Mirar si hubo uso raro.** Algunos paneles listan últimas llamadas. Si no sabes leerlo, avisas a quien toque (seguridad, IT, la persona dueña del proyecto). No al chatbot.
5. **Redactas el prompt** y, si aún necesitas ayuda, abres un hilo **nuevo** con el texto ya limpio. El hilo sucio no se “arregla” pegando un “olvida lo anterior”.

Qué no haces:

- Pegar la **clave nueva** “para que compruebes que ahora está bien”. El 401 que desaparece en tu script es la prueba.
- Confiar en el **chat temporal**. El texto sale igual. El modo no rota.
- Dejar la clave vieja “por si un cron aún la usa”. Rotar es revocar. Si un cron se rompe, lo arreglas con la nueva.
- Mandar el hilo por un **enlace de compartir**. El enlace es el documento.

Proyecto personal frente a trabajo. En personal: rotas tú, actualizas tu `.env`, no reutilizas la key en un repo público. En trabajo: además, avisas por el canal de la org. Un chatbot personal no es ese canal. Aunque el repo sea interno, la key no viaja al chat de consumo.

Si no recuerdas si el valor era de producción o de pruebas: tratas como producción. Rotas. Las de pruebas también abren algo.

## Cómo redactar tokens de un log (pasos)

**Redactar tokens de un log** es un trabajo de bloc, no de fe. Copias el log a un archivo local que no vas a commitear. Tacha. Luego pegas lo tachado. Nunca al revés.

Pasos, siempre en este orden:

1. **Copia a un buffer tuyo.** Editor local. No al chat “un momento, luego borro”.
2. **Busca patrones de llave.** `sk-`, `Bearer `, `eyJ` (un JWT empieza así), `AKIA`, `ghp_`, `xox`, `-----BEGIN`, `password=`, `api_key=`. No hace falta una lista infinita: si parece una cadena larga aleatoria junto a autenticación, fuera.
3. **Sustituye por un marcador.** `sk-REDACTED`. `YOUR_KEY`. `Bearer REDACTED`. No inventes un `sk-` que parezca real. No dejes las cuatro últimas letras “para que se sepa cuál era”.
4. **Quita identidad de más.** Emails, cuentas de cliente, IDs de factura, paths de casa (`/Users/marta/...`). El error de auth no los necesita.
5. **Quita el .env** si estaba debajo del log. Nombres de variable, si hacen falta, los escribes tú en una lista corta.
6. **Relee en voz alta.** Si podrías abrir un sistema con lo que queda, no queda redactado.
7. **Pega solo el recorte.** Tarea, síntoma, formato de respuesta. Una tarea. No “explica y además genera un .env de ejemplo con valores”.

Plantilla mínima, la que Marta acaba guardando:

```
Tarea: causas frecuentes de este 401.
Contexto: Python, httpx, key en variable de entorno (valor no va).
Síntoma: 401 invalid_api_key en POST /v1/widgets.
Ya probé: recargar entorno; len(key) > 0.
Formato: máximo 5 viñetas. Sin tutorial de cuentas.
Prohibido: pedir la key; ejemplos con secretos; inventar un proveedor.
```

Si el modelo te pide “pega la key para verificar el formato”: no. El formato se verifica en el panel y en la documentación del proveedor. Un `sk-` inventado no te dice si el tuyo está bien. Te dice que has vuelto a mover un secreto.

Un log enorme no se sube. Extraes diez líneas. Un zip del proyecto “para que veas la config” es el `.env` con otro nombre. No. Si un compañero te pega la key por Slack, no la reenvías al chat. Les dices que roten.

## Errores habituales (para aquí)

**Pegar el .env “un segundo”.** El segundo basta. El archivo entero no entra. Para aquí: nombres de variable y el síntoma.

**Rotar en el chat y no en el panel.** El modelo no revoca. El panel sí. Para aquí: paso 2 del apartado de rotar, antes de cualquier prompt nuevo.

**Dejar un `sk-` a medias** (“sk-abc…xyz”) “para contexto”. Las colas y las cabezas siguen siendo material de un secreto. `sk-REDACTED` o nada.

**Confundir este job con privacidad de personas.** Anonimizar a Marta no basta si el Bearer sigue ahí. Anonimizar el Bearer no basta si pegas el DNI. Son dos filtros. Los dos, antes de enviar.

**Confundir con el DNI.** Extraer campos de un documento de identidad no es este artículo. No se pega. Ni “para ver el formato de un token”. Un DNI no es una API key. Sigue fuera.

**Usar el hilo sucio para “seguir depurando”.** Cada mensaje reexpone el contexto. Hilo nuevo, texto limpio.

**Pedir un .env de ejemplo con valores.** El modelo rellenará patrones que parecen claves. No los copies a un repo. Pide solo la **lista de nombres** y dónde se leen en el código.

**Pegar la captura del dashboard.** La key recién creada sale en grande. El pantallazo es el valor. Para aquí: cierras la captura. Copias a tu gestor. El chat no la ve.

**Reenviar el chat a un compañero** para que “lo vea”. El compañero acaba de recibir la key. Rotas. El canal interno de secretos, si existe, no es un export de ChatGPT. La key de “desarrollo” también se rota: abre algo.

Para aquí, en positivo:

1. Valor de secreto: nunca.
2. Nombre de variable y síntoma: sí, si hace falta.
3. Si pegaste: rotas en el panel. Luego redactas.
4. Log: buscar, sustituir, releer, pegar el recorte.
5. Personas y documentos de identidad: el pilar y el satélite de DNI, no esta página.

## Cierre

**No pegar secretos en ChatGPT** se reduce a esto:

1. **API keys y chatbots:** el valor no viaja. El `.env` no viaja. El Bearer no viaja.
2. **Anonimizar un error de autenticación:** síntoma, path, lenguaje, lo ya probado. Cero llaves.
3. **Rotar una clave si la pegaste:** panel primero. Hilo sucio, cerrado.
4. **Redactar tokens de un log:** en local, con marcadores `sk-REDACTED` o `YOUR_KEY`. Luego pides ayuda.

El chatbot sigue siendo rápido con un 401 descrito. Eso es usarlo. Lo otro es mandar las llaves y llamar a eso depurar.
