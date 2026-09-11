---
published: true
category: inteligencia-artificial
date: '2026-09-08'
updatedDate: '2026-09-08'
author: linguafly-team
title: "Prompt para pasar notas a lista de tareas"
description: >-
  Prompt para pasar notas a lista de tareas: verbo, dueño y fecha si
  aparecen en el texto, y dejar fuera lo que no es una acción real del acta.
readTime: 11 min
keywords:
  - prompt notas a lista de tareas
  - convertir un acta en tareas
  - ia extrae action items
  - chatgpt lista de próximos pasos
  - tareas con dueño y fecha
  - de reunión a checklist
  - prompt action items en español
excerpt: >-
  El acta no es un plan de proyecto. Extrae el verbo, el responsable y el
  plazo solo si están escritos. El resto, "no aparece".
canonical: 'https://linguafly.app/blog/inteligencia-artificial/prompt-para-pasar-notas-a-lista-de-tareas'
alt: Notas desordenadas convertidas en una lista de tareas con IA
related_routes:
  - como-escribir-un-prompt-que-sirva
  - prompt-few-shot-dar-dos-ejemplos-y-parar
  - guardar-un-prompt-que-te-funciono
  - conversacion-nueva-o-seguir-el-mismo-hilo
  - acta-de-reunion-a-partir-de-notas-o-transcripcion
faqs:
  - question: ¿Cómo pasar notas de una reunión a una lista de tareas con ChatGPT?
    answer: "Pega las notas, pide una tabla con tarea, responsable y plazo, y ordena que solo extraiga acciones que estén escritas. Si no hay dueño o fecha, la celda es ‘no aparece’. No pidas un plan de proyecto. Lee la tabla contra el original."
  - question: ¿La IA puede inventar el responsable de una tarea?
    answer: "Sí, y es el fallo más caro. Si Marta habló del precio, el modelo la pone de dueña de todo. Di en el prompt que el responsable solo se rellena si el texto asigna esa acción a alguien. Si no, ‘no aparece’. Luego comprueba cada fila."
  - question: ¿Qué pongo en el plazo si el acta no dice fecha?
    answer: "Escribe ‘no aparece’. No pongas ‘esta semana’ ni ‘ASAP’ ni el día de la reunión. Esas son interpretaciones. Si el texto dice ‘antes de octubre’, copia esa expresión; no la conviertas en el día 1 si nadie lo cerró."
  - question: ¿Sirve este prompt para un acta larga de una hora?
    answer: "Sirve por trozos. Pega una sección (un tema, diez minutos). Extrae. Comprueba. Luego otra sección en el mismo hilo o en uno nuevo si el modelo empieza a mezclar. No le eches seis páginas y un ‘saca todo’."
  - question: ¿Puedo dar ejemplos de filas para que copie el formato?
    answer: "Sí. Dos filas juguete (una con dueño y fecha, otra con ‘no aparece’) anclan la tabla. Eso es few-shot corto, no un prompt de cuatro páginas. El artículo de dos ejemplos cubre el gesto; aquí el trabajo es no inventar acciones."
---

Un **prompt de notas a lista de tareas** no pide un plan. Pide extraer lo que el acta ya comprometió: un verbo, un dueño si aparece, una fecha si aparece. El resto se queda fuera. El modelo, si le das cuerda, inventa “analizar el mercado” y pone a quien más habló como responsable de todo. Tú cortas esa cuerda en el prompt y otra vez al comprobar.

La estructura general (tarea, texto, formato, límite) está en [cómo escribir un prompt que sirva](/blog/inteligencia-artificial/como-escribir-un-prompt-que-sirva). Aquí el oficio es **convertir un acta en tareas** sin convertirla en ficción. Si quieres anclar columnas con muestras, dos pares bastan: [prompt few-shot, dar dos ejemplos y parar](/blog/inteligencia-artificial/prompt-few-shot-dar-dos-ejemplos-y-parar).

## Qué cuenta como tarea (y qué no)

**IA extrae action items** solo si tú defines “action item” como acción *escrita*, no como buena práctica. En español de reunión, una tarea es una frase que se puede hacer: avisar, enviar, revisar, cerrar un número, convocar. Lleva verbo. Idealmente lleva alguien. A veces lleva cuándo.

No es una tarea:

- Un dato. “El precio sube un 8 % en octubre.” Es un hecho. Puede *generar* la tarea “avisar a compras del 8 %”, pero solo si alguien lo dijo como encargo. Si solo se constató, es hecho. Va a otra columna o a ninguna.
- Una queja. “El PDF está en el Drive y nadie lo encuentra.” Sin “hay que…” y sin dueño, es ruido. No la conviertas en “reorganizar el Drive”.
- Un deseo. “Habría que alinearnos más.” Cero verbo ejecutable. Fuera.
- Lo que “se suele hacer después de estas reuniones”. El modelo tiene estadística de internet. Tú tienes un acta. Gana el acta.
- Decisiones ya cerradas sin siguiente paso. “Se aprueba el proveedor X.” Eso es decisión. Si nadie dijo “Marta envía el pedido el viernes”, no inventes la fila.

Sí es una tarea, aunque esté mal escrita:

- “Hay que avisar a compras.” Verbo. Dueño: no aparece. Plazo: no aparece. Igual entra.
- “Luis manda el anexo antes del jueves.” Verbo, dueño, plazo. Entra completa.
- “Lo vemos en presupuesto” dicho como encargo a finanzas, no como muletilla. Si el texto no asigna, dueño = no aparece.

**De reunión a checklist** es un filtro, no un brainstorming. El checklist fiel puede quedar corto. Eso es señal de reunión floja, no de prompt flojo. No le pidas al modelo que “complete lo que faltó”. Faltó en la sala. Se completa en la siguiente reunión, no en el chat.

### El prompt: verbo, dueño y fecha

**Prompt action items en español**, para copiar y pegar. Cambia solo el bloque de notas.

```
Convierte las notas en una tabla markdown con columnas:
tarea | responsable | plazo
Cada fila es una acción que esté escrita en las notas.
La tarea empieza por un verbo en infinitivo (avisar, enviar, revisar…).
Responsable: el nombre solo si el texto asigna ESA acción a esa persona.
Plazo: la fecha, el día de la semana o la expresión temporal SOLO si aparece
(“el jueves”, “antes de octubre”). Si no hay, escribe exactamente: no aparece
No añadas tareas de buenas prácticas ni de “siguiente paso lógico”.
No uses a quien más habló como dueño por defecto.
No conviertas hechos (precios, datos, quejas) en tareas salvo que alguien
encargara una acción sobre ese hecho.
Al final, una línea: decisiones cerradas (cita) o “no se cerró decisión”.

NOTAS:
"""
(aquí el fragmento)
"""
```

Por qué cada línea está:

- **Tabla, no ensayo.** El ensayo mezcla hechos y encargos. La tabla te obliga a mirar celdas.
- **Infinitivo.** Unifica. “Hay que avisar” y “Luis avisa” acaban en “Avisar a compras”. Comprobación más fácil.
- **Responsable acotado.** Esta es la línea que evita el error de Marta. El modelo ama un dueño. Tú le quitas el premio si no está.
- **Plazo literal.** “Antes de octubre” no es “1 de octubre”. Copiar la expresión evita un plazo inventado con cara de fecha.
- **Prohibición de buenas prácticas.** Mata “definir KPIs”, “hacer seguimiento”, “reunión de alineamiento”.
- **Decisiones aparte.** Para no colar una decisión en la columna tarea.

**Tareas con dueño y fecha** no significa que *todas* las filas los lleven. Significa que esas dos columnas existen y se rellenan con evidencia o con “no aparece”. Una tabla llena de nombres es sospechosa. Una tabla con huecos es más honesta.

Si el modelo ignora la tabla: última línea del mensaje, en claro: “SOLO TABLA. SIN PROSA ANTES.” Si mezcla idiomas: “Español de España. ‘ordenador’, no ‘computadora’. Tuteo en las tareas.”

Opcional, no obligatorio: dos filas juguete encima del bloque NOTAS (una completa, una con “no aparece”). Eso es few-shot de formato. No sustituye la prohibición de inventar. No pongas un tercer ejemplo raro.

### Ejemplo trabajado: notas feas a tabla

Notas reales de una reunión corta, desordenadas a propósito. Así llegan. Así las pegas, después de quitar apellidos de más, teléfonos y cualquier cifra que no haga falta.

```
martes, sala 3. el del proveedor. Marta dijo que el precio sube 8% en octubre.
yo dije que lo vemos en presupuesto. nadie cerró fecha de respuesta al
proveedor. hay que avisar a compras. Luis dijo que manda el anexo el jueves
si IT lo suelta. el pdf del contrato está en el drive pero no lo pego.
Carmen: “el jueves a las 10 seguimos, anexo o no”. nadie asignó quién avisa
a compras. queja de que el drive es un caos. se aprueba seguir con el
proveedor actual este trimestre. Pablo no vino.
```

**Intento 1 (vago):** “Ayúdame con esto.”  
Salida típica: párrafo sobre proveedores, un plan de negociación, un 8 % en otro mes, Pablo como riesgo de “alineamiento”. Inútil.

**Intento 2 (mejor verbo, sin límite):** “Pasa estas notas a una lista de tareas.”  
Salida típica, compactada:

| tarea | responsable | plazo |
|---|---|---|
| Negociar el 8 % | Marta | octubre |
| Analizar presupuesto | tú | no aparece |
| Avisar a compras | Marta | urgente |
| Enviar anexo | Luis | jueves |
| Reorganizar el Drive | Carmen | no aparece |
| Hacer seguimiento con Pablo | no aparece | no aparece |
| Reunión de alineamiento | Carmen | jueves 10:00 |

Ahí hay al menos cinco mentiras. Marta no se ofreció a negociar ni a avisar. “Urgente” no está. Reorganizar el Drive es la queja convertida en proyecto. Pablo no vino: no es una tarea. El jueves a las 10 es una reunión, no un checklist de Carmen. El modelo ha escrito la reunión que *habría* querido, no la que hubo.

**Intento 3 (el prompt de arriba).** Salida que debes poder comprobar:

| tarea | responsable | plazo |
|---|---|---|
| Ver el 8 % en presupuesto | no aparece | no aparece |
| Avisar a compras | no aparece | no aparece |
| Enviar el anexo | Luis | el jueves (si IT lo suelta) |
| Seguir el jueves a las 10 (anexo o no) | no aparece | jueves 10:00 |

Decisiones cerradas: seguir con el proveedor actual este trimestre.

Compruebas, línea a línea, con el original al lado:

- El 8 % y octubre están como *hecho* en las notas. La acción escrita es “lo vemos en presupuesto”, sin dueño. Si el modelo pone “Negociar con el proveedor” o “Marta gestiona el 8 %”, fuera.
- Avisar a compras: está el encargo, no el nombre. Celda responsable = no aparece. Aunque te parezca obvio que lo haga Marta, **no aparece**.
- Luis + anexo + jueves + condición de IT: sí. No borres la condición. No la conviertas en “jueves seguro”.
- PDF en el Drive: mención, no encargo. No hay fila “resumir el contrato”. El contrato no está pegado.
- Drive es un caos: queja. Sin fila.
- Carmen anuncia la reunión del jueves. Eso puede ser una fila de “seguir el jueves…” si lo lees como recado para todos, o una decisión de calendario. Dueño: no aparece (Carmen informó; no se asignó organizador).
- Pablo no vino: hecho. Cero fila.
- Proveedor este trimestre: decisión, no tarea, salvo que alguien tuviera que enviarle un mail. En el texto, no.

Si el modelo ha puesto a Marta en “avisar a compras”, un turno, no un prompt nuevo:

“Marta solo aparece en el dato del 8 %. No le asignes otras filas. Rehaz la tabla. Responsable = no aparece salvo asignación explícita.”

Eso es **ChatGPT lista de próximos pasos** cuando ChatGPT se comporta. El nombre del chat da igual. El original al lado, no.

### Celdas vacías: “no aparece” y nada más

La marca **no aparece** es parte del formato. No dejes la celda en blanco: el modelo o tú la rellenaréis luego de memoria. No pongas un guion, un “TBD”, un “por definir”, un “ASAP”. Esas etiquetas parecen profesionales y son invención suave.

Qué copiar del texto, sin traducir a calendario:

- “el jueves” → el jueves
- “antes de octubre” → antes de octubre
- “esta semana” (si alguien lo dijo) → esta semana
- “si IT lo suelta” → déjalo en la tarea o en el plazo, visible
- silencio → no aparece

Qué no fabricar:

- El día 1 del mes porque dijeron el mes.
- El nombre de quien suele hacer esa faena en tu equipo.
- “Urgente” porque el tono de las notas era agitado.
- Un responsable “el equipo” cuando el texto no lo dice. “El equipo” es un cubo. O hay un nombre o no aparece.

Dueños: solo personas (o cargos) *citados como encargados de esa acción*. “Marta dijo que el precio sube” no es “Marta es responsable de avisar”. Hablar ≠ dueño. Ausentes: Pablo no vino no lo convierte en dueño ni en tarea.

Si una fila no tiene verbo de acción al leerla en voz alta, no es fila. “8 % en octubre” no se hace. Se informa o se presupuesta; eso tiene que estar dicho.

### Cómo comprobar y cuándo cortar el hilo

La tabla no se usa hasta que la has leído contra las notas. Cinco minutos. Método:

1. **Cuenta encargos en el original.** Marca con un lápiz o un subrayado cada “hay que”, cada “manda”, cada “avisar”, cada “el jueves seguimos” si es recado. Esos son los candidatos. La tabla no puede tener muchas más filas que subrayados. Si tiene el doble, hay invención.
2. **Cada fila, una cita.** ¿Puedes señalar la frase de las notas que justifica el verbo, el nombre y el plazo? Si el nombre no tiene frase, a “no aparece”. Si el plazo no tiene frase, igual.
3. **Hechos aparte.** Precio, asistencia, quejas, PDFs no pegados: no son filas. Si el modelo las coló, bórralas en el siguiente mensaje: “Quita la fila del Drive y la de Pablo. No eran encargos.”
4. **Decisiones.** La línea final debe citar lo aprobado, no un “se decidió mejorar la comunicación”.

Acta larga: no pegues la hora entera. Un tema, una tabla. Luego el siguiente tema. Si el hilo empieza a mezclar el proveedor con el anexo de otra reunión, [conversación nueva o el mismo hilo](/blog/inteligencia-artificial/conversacion-nueva-o-seguir-el-mismo-hilo): nuevo chat, fragmento limpio, el mismo prompt. El prompt bueno, a tu nota: [guardar un prompt que te funcionó](/blog/inteligencia-artificial/guardar-un-prompt-que-te-funciono).

Cuándo parar el chat:

- Llevas tres correcciones y sigue asignando dueños. Cambia la tarea: “No hagas tabla de tareas. Extrae citas textuales entre comillas que sean encargos, máximo seis.” Más tonto, más fiel.
- Te pide “el PDF del contrato para completar”. No lo pegas. El prompt ya decía que no está. Completar sería inventar.
- Empieza a proponerte un cronograma de proyecto. Eso ya no es extracción. Cierra.

## Errores habituales (para aquí)

**Pedir “próximos pasos” sin definir.** Próximos pasos, para el modelo, es un taller de consultora. Di tabla, tres columnas, solo lo escrito.

**Rellenar huecos porque “en mi equipo se sabe”.** El chat no es tu equipo. Lo que se sabe, lo escribes tú después, fuera, en tu gestor de tareas. El entregable del modelo es el acta fiel. Tú, si quieres, añades dueños en tu herramienta *con tu criterio*, no con una alucinación que luego parece documentada.

**Pegar el acta con nombres de clientes, salarios, salud, menores.** Anonimiza: persona A, importe N, “el proveedor”. La lista de lo que no se pega no cambia porque el prompt sea de tareas.

**Un solo pegado de seis páginas.** El modelo compacta y rellena. Trozos.

**Mezclar extracción y redacción.** “Saca tareas y redáctame el email a compras.” Dos mensajes. Primero la tabla comprobada. Luego, si acaso, un email *sobre una fila que hayas aceptado*, con hechos fijos.

**Creer que más ejemplos arreglan un acta ambigua.** El acta ambigua produce tabla con huecos. Eso es correcto. El tercer ejemplo few-shot no cierra lo que la sala no cerró.

**Usar la tabla sin mirar.** Copiar al Trello las filas inventadas. Entonces el modelo no se equivocó él solo: tú documentaste la ficción.

Para aquí: si no puedes señalar en las notas el verbo de cada fila, esa fila no entra. Si el responsable no está, no aparece. Punto.

## Cierre

**Prompt para pasar notas a lista de tareas** se reduce a esto:

1. Pega el fragmento, no la vida laboral.
2. Tabla: tarea (verbo), responsable, plazo.
3. Solo lo escrito. Hueco = no aparece.
4. Hechos, quejas y ausentes, fuera.
5. Comprueba cada celda contra el original.
6. Guarda el prompt que aguantó la prueba.

Sin plan de proyecto. Sin dueño de relleno. El modelo completa patrones. Tú pones el filtro de lo que fue un encargo de verdad.
