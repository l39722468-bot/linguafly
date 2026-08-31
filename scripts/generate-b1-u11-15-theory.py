#!/usr/bin/env python3
"""Generate B1 theory articles U13–U15 (Module 2), matching U11/U12 frontmatter + assets."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/content/blog/curso-b1"


def write(name: str, content: str) -> None:
    path = OUT / name
    text = content.lstrip("\n")
    if not text.endswith("\n"):
        text += "\n"
    path.write_text(text, encoding="utf-8")
    print(f"Wrote {path.relative_to(ROOT)}")


U13 = r'''---
category: curso-b1
date: '2026-08-31'
updatedDate: '2026-08-31'
author: linguafly-team
title: 'First vs Second Conditional B1 & Entertainment'
description: >-
  Contrasta first y second conditional en inglés B1 y practica vocabulario de
  entretenimiento (cine, series, conciertos). Guía Unidad 13 con audios.
readTime: 15 min
keywords:
  - first vs second conditional B1
  - first or second conditional
  - entertainment vocabulary English
  - condicionales inglés contraste
  - inglés B1 unidad 13
  - real vs hypothetical
  - curso de inglés gratis
  - aprender inglés gratis
  - curso de inglés online gratis
  - curso inglés B1 gratis
canonical: 'https://linguafly.app/blog/curso-b1/unidad-13-first-vs-second-conditional'
image: /blog/curso-b1/unit-13/first-vs-second.png
alt: 'First vs second conditional y entertainment B1'
related_routes:
  - unidad-11-first-conditional-weather
  - unidad-12-second-conditional
  - unidad-14-third-conditional
  - ejercicios-condicionales-ingles
  - cursos-online-ingles-b1
faqs:
  - question: ¿Cuándo uso first y cuándo second?
    answer: >-
      First = situación real o probable en el futuro (If it rains, we'll stay in).
      Second = hipotética o poco probable ahora (If I had wings, I'd fly).
  - question: ¿Puedo mezclar will y would?
    answer: >-
      No en la misma estructura estándar: first lleva will/can/might; second lleva
      would/could/might. Elige según probabilidad, no mezcles por casualidad.
  - question: ¿Qué vocabulario de entertainment practico?
    answer: >-
      Series, episode, streaming, cinema, concert, gig, festival, comedy,
      documentary, binge-watch, spoilers…
  - question: ¿Dónde practico la Unidad 13?
    answer: >-
      En la [Unidad 13 del curso B1](/curso-b1/unit-13) de Linguafly.
excerpt: >-
  Guía de la Unidad 13 del curso B1: first vs second conditional y entertainment.
---
Tras el [Second conditional (U12)](/blog/curso-b1/unidad-12-second-conditional), la **Unidad 13 del curso B1** (*First vs Second Conditional & Entertainment*) te enseña a **elegir** el condicional correcto y a hablar de **planes de ocio**.

> **Practica en el curso:** [Unidad 13 — First vs Second](/curso-b1/unit-13)  
> **Antes:** [U12 — Second conditional](/blog/curso-b1/unidad-12-second-conditional)

---

## Qué aprenderás

- Elegir **first** (real/probable) o **second** (hipotético)
- Evitar mezclas incorrectas de *will* / *would*
- Vocabulario: *series, concert, streaming, spoilers…*

![First vs second](/blog/curso-b1/unit-13/first-vs-second.png)

---

## 1. Contraste rápido

| | First | Second |
| :--- | :--- | :--- |
| Idea | Real / probable | Irreal / hipotético |
| If-clause | Present simple | Past simple |
| Resultado | will / can / might… | would / could / might… |
| Ejemplo | If it **rains**, we**'ll** stay in. | If it **rained**, we**'d** stay in. |

Pregunta clave: *¿Es un plan real o una fantasía?*

---

## 2. Ejemplos lado a lado

> **First:** If you **come** to the party, you **will meet** lots of people.  
> **Second:** If I **had** wings, I **would fly** around the world.  
> **First:** If the film **is** good tonight, I **will recommend** it.  
> **Second:** If I **could** meet any celebrity, I **would choose** a musician.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-13/first-rains.mp3" title="🔊 First: If it rains…"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-13/first-party.mp3" title="🔊 First: party"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-13/second-wings.mp3" title="🔊 Second: wings"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-13/second-celebrity.mp3" title="🔊 Second: celebrity"></audio>

---

## 3. Vocabulario: Entertainment

![Entertainment vocab](/blog/curso-b1/unit-13/entertainment-vocab.png)

| Word | Idea |
| :--- | :--- |
| series / show / episode | serie / programa / episodio |
| streaming / binge-watch | streaming / ver de seguido |
| cinema / movie / soundtrack | cine / película / banda sonora |
| concert / gig / festival | concierto / bolo / festival |
| comedy / documentary | comedia / documental |
| spoilers | spoilers |

---

## 4. Reading

![Cinema or concert](/blog/curso-b1/unit-13/cinema-concert.png)

> If the tickets are still available, we'll go to the comedy show. That's a real plan — first conditional. If we won free VIP tickets, we'd invite the whole class: unlikely fantasy — second conditional. If the series is good, we might binge-watch two episodes tonight. And if concerts were free, everyone would go to more shows!

<audio controls preload="none" src="/audio/blog/curso-b1/unit-13/reading-entertainment.mp3" title="🔊 Reading: entertainment plans"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-13/dialogue-tickets.mp3" title="🔊 Dialogue: tickets"></audio>

> If we leave early, we'll get good seats at the cinema.  
> If we had more money, we'd go to the concert instead.  
> If the soundtrack is amazing, I might buy it after.  
> If I were you, I'd avoid spoilers online!

---

## 6. Practica en voz alta

<audio controls preload="none" src="/audio/blog/curso-b1/unit-13/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

### 1 — First o second
1. If we ___ time tonight, we'll watch a documentary. (*have*)  
2. If I ___ a film director, I'd make a comedy. (*were*)  
3. If the concert ___ at 8, we'll arrive at 7:30. (*starts*)  
4. If we ___ VIP tickets, we'd be so happy. (*won*)

<details><summary>Ver solución</summary>

1. **have** (first) · 2. **were** (second) · 3. **starts** (first) · 4. **won** (second)
</details>

### 2 — will o would
1. If the episode is boring, we ___ change series.  
2. If I had a free evening, I ___ go to a gig.  
3. If tickets are cheap, we ___ book now.  
4. If I were you, I ___ avoid spoilers.

<details><summary>Ver solución</summary>

1. **will / 'll** · 2. **would / 'd** · 3. **will / 'll** · 4. **would / 'd**
</details>

### 3 — Corrige
1. *If it will rain, we stay in.* → If it **rains**, we**'ll** stay…  
2. *If I would have time, I go.* → If I **had** time, I **would** go…  
3. *If concerts are free, everyone would go* (deseo irreal) → If concerts **were** free, everyone **would** go…

### 4 — Vocab
1. Ver muchos episodios seguidos = ___ · 2. Concierto informal = ___ · 3. Revelar el final = ___

<details><summary>Ver solución</summary>

1. **binge-watch** · 2. **gig** · 3. **spoilers**
</details>

---

## Tip del profesor

Si puedes **comprobarlo mañana** (entradas, tiempo, plan real) → **first**. Si es *imaginemos que…* → **second**.

---

## Practica ahora

1. Escribe 2 first + 2 second sobre cine/conciertos.  
2. Practica en la [Unidad 13 del curso B1](/curso-b1/unit-13).

Curso:

- [Unidad 14 — Third conditional](/curso-b1/unit-14)

Guías relacionadas:

- [U11 — First conditional](/blog/curso-b1/unidad-11-first-conditional-weather)
- [U12 — Second conditional](/blog/curso-b1/unidad-12-second-conditional)
- [Ejercicios de condicionales B1–B2](/blog/gramatica/ejercicios-condicionales-ingles-b1-b2)
- [Inglés B1](/blog/metodos/cursos-online-ingles-b1)

---

## Fuentes

- CEFR B1 · Cambridge B1 Preliminary · British Council — Conditionals
'''

U14 = r'''---
category: curso-b1
date: '2026-08-31'
updatedDate: '2026-08-31'
author: linguafly-team
title: 'Third Conditional B1: if + past perfect, would have (regrets)'
description: >-
  Aprende el third conditional en inglés B1 (if + past perfect, would have) para
  arrepentimientos y pasado irreal. Guía Unidad 14 con audios.
readTime: 15 min
keywords:
  - third conditional B1
  - if I had known
  - would have + past participle
  - regrets English
  - inglés B1 unidad 14
  - past unreal conditional
  - curso de inglés gratis
  - aprender inglés gratis
  - curso de inglés online gratis
  - curso inglés B1 gratis
canonical: 'https://linguafly.app/blog/curso-b1/unidad-14-third-conditional'
image: /blog/curso-b1/unit-14/third-conditional.png
alt: 'Third conditional y regrets B1'
related_routes:
  - unidad-12-second-conditional
  - unidad-13-first-vs-second-conditional
  - unidad-15-repaso-11-14
  - ejercicios-condicionales-ingles
  - cursos-online-ingles-b1
faqs:
  - question: ¿Qué es el third conditional?
    answer: >-
      If + past perfect, would have + past participle. Habla de un pasado diferente:
      If I had studied, I would have passed.
  - question: ¿Second o third?
    answer: >-
      Second = ahora/futuro irreal (If I had time, I'd help). Third = pasado irreal
      (If I had had time yesterday, I'd have helped).
  - question: ¿Puedo decir If I would have known…?
    answer: >-
      No en el estándar B1: en la if-clause usa past perfect (*If I had known…*), no
      *would have*.
  - question: ¿Dónde practico?
    answer: >-
      En la [Unidad 14 del curso B1](/curso-b1/unit-14).
excerpt: >-
  Guía de la Unidad 14 del curso B1: third conditional y regrets.
---
Tras el [contraste first vs second (U13)](/blog/curso-b1/unidad-13-first-vs-second-conditional), la **Unidad 14** (*Third Conditional & Regrets*) te lleva al **pasado irreal**: *qué habría pasado si…*

> **Practica:** [Unidad 14](/curso-b1/unit-14) · **Antes:** [U13](/blog/curso-b1/unidad-13-first-vs-second-conditional)

---

## Qué aprenderás

- **If + past perfect, would have + V3**
- Variantes *could have / might have*
- Vocabulario de **regrets** y decisiones

![Third conditional](/blog/curso-b1/unit-14/third-conditional.png)

---

## 1. Forma

| If-clause | Resultado |
| :--- | :--- |
| **If + past perfect** | **would have + past participle** |
| If I **had known**, | I **would have come**. |
| If she **had studied** harder, | she **would have passed**. |
| If we **had left** earlier, | we **would have caught** the train. |

También: *could have* (capacidad) · *might have* (posibilidad).

<audio controls preload="none" src="/audio/blog/curso-b1/unit-14/if-i-had-known.mp3" title="🔊 If I had known…"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-14/if-she-had-studied.mp3" title="🔊 If she had studied…"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-14/if-we-had-left.mp3" title="🔊 If we had left…"></audio>

---

## 2. Second vs Third

| | Second | Third |
| :--- | :--- | :--- |
| Tiempo | Ahora / general | Pasado |
| If | Past simple | Past perfect |
| Result | would + V1 | would have + V3 |
| Ejemplo | If I **had** money, I**'d** travel. | If I **had had** money, I**'d have** travelled. |

---

## 3. Vocabulario: regrets

![Regrets vocab](/blog/curso-b1/unit-14/regrets-vocab.png)

| Word / phrase | Idea |
| :--- | :--- |
| regret / wish I had… | arrepentirse / ojalá hubiera… |
| miss (a chance / train) | perder (oportunidad / tren) |
| on time / late / rush | a tiempo / tarde / con prisas |
| warning / decision | aviso / decisión |
| otherwise | de lo contrario |

<audio controls preload="none" src="/audio/blog/curso-b1/unit-14/wish-i-had.mp3" title="🔊 Wish I had…"></audio>

---

## 4. Reading

![Regrets story](/blog/curso-b1/unit-14/regrets-story.png)

> Sam arrived late at the station. If he had left home earlier, he would have caught the train. If he hadn't checked his phone so many times, he might have been on time. If the warning had been clearer, he could have avoided the mistake. None of this changes the past — but it helps him explain the regret.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-14/reading-regrets.mp3" title="🔊 Reading: regrets"></audio>

---

## 5. Diálogo

<audio controls preload="none" src="/audio/blog/curso-b1/unit-14/dialogue-regrets.mp3" title="🔊 Dialogue: exam regrets"></audio>

> If I had revised more, I would have felt more confident.  
> If we hadn't stayed up so late, we might have slept better.  
> If the teacher had given us another day, we could have finished the project.  
> Next time we'll plan earlier — no more third-conditional regrets!

---

## 6. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-14/practice-four.mp3" title="🔊 Practice"></audio>

---

## 7. Ejercicios

### 1 — Completa (third)
1. If she ___ earlier, she would have arrived on time. (*had left*)  
2. We ___ the train if we had run. (*wouldn't have missed*)  
3. If I had seen the warning, I ___ . (*would have stopped*)  
4. They might have won if they ___ more. (*had practised*)

<details><summary>Ver solución</summary>

1. **had left** · 2. **wouldn't have missed** · 3. **would have stopped** · 4. **had practised**
</details>

### 2 — Second o third
1. If I had more time now, I'd help you. → ___  
2. If I had had more time yesterday, I'd have helped you. → ___  
3. If she studied more, she'd pass. → ___  
4. If she had studied more, she would have passed. → ___

<details><summary>Ver solución</summary>

1. **second** · 2. **third** · 3. **second** · 4. **third**
</details>

### 3 — Corrige
1. *If I would have known…* → If I **had known**…  
2. *I would passed* → I **would have passed**  
3. *If I knew about the party yesterday…* (pasado irreal) → If I **had known**…

### 4 — Traduce
1. Si hubiéramos salido antes, no habríamos perdido el tren.  
2. Si hubiera repasado más, me habría sentido más seguro.

<details><summary>Ver solución</summary>

1. If we **had left** earlier, we **wouldn't have missed** the train.  
2. If I **had revised** more, I **would have felt** more confident.
</details>

---

## Tip

Third = **pasado cerrado**. Si aún puedes cambiarlo hoy, no es third.

---

## Practica ahora

- [Unidad 14 del curso](/curso-b1/unit-14) · Siguiente: [U15 Repaso 11–14](/curso-b1/unit-15)

Guías: [U13](/blog/curso-b1/unidad-13-first-vs-second-conditional) · [Condicionales B1–B2](/blog/gramatica/ejercicios-condicionales-ingles-b1-b2) · [B1](/blog/metodos/cursos-online-ingles-b1)

## Fuentes
- CEFR B1 · Cambridge B1 · British Council Conditionals
'''

U15 = r'''---
category: curso-b1
date: '2026-08-31'
updatedDate: '2026-08-31'
author: linguafly-team
title: 'Repaso Unidades 11–14 B1: first, second y third conditional'
description: >-
  Repasa first, second y third conditional (y future time clauses) del curso B1.
  Guía Unidad 15 con contraste, audios y ejercicios con soluciones.
readTime: 15 min
keywords:
  - repaso condicionales B1
  - first second third conditional
  - conditionals review English
  - inglés B1 unidad 15
  - future time clauses review
  - curso de inglés gratis
  - aprender inglés gratis
  - curso de inglés online gratis
  - curso inglés B1 gratis
canonical: 'https://linguafly.app/blog/curso-b1/unidad-15-repaso-11-14'
image: /blog/curso-b1/unit-15/review-conditionals.png
alt: 'Repaso condicionales B1 Unidades 11–14'
related_routes:
  - unidad-11-first-conditional-weather
  - unidad-12-second-conditional
  - unidad-13-first-vs-second-conditional
  - unidad-14-third-conditional
  - ejercicios-condicionales-ingles
  - cursos-online-ingles-b1
faqs:
  - question: ¿Qué repaso esta unidad?
    answer: >-
      First conditional + time clauses (U11), second (U12), contraste + entertainment
      (U13) y third + regrets (U14).
  - question: ¿Cómo elijo el condicional correcto?
    answer: >-
      ¿Futuro real? → first. ¿Ahora irreal? → second. ¿Pasado irreal / regret? → third.
  - question: ¿Dónde practico el repaso?
    answer: >-
      En la [Unidad 15 del curso B1](/curso-b1/unit-15).
excerpt: >-
  Guía de la Unidad 15 del curso B1: repaso de condicionales 11–14.
---
Antes de seguir el Módulo 2 (pasiva y reported speech), la **Unidad 15** (*Repaso 11–14*) consolida los **tres condicionales** del bloque.

> **Practica:** [Unidad 15](/curso-b1/unit-15) · **Antes:** [U14 — Third](/blog/curso-b1/unidad-14-third-conditional)

---

## Qué aprenderás

- Elegir **first / second / third** según tiempo y realidad
- Revisar weather, entertainment y regrets
- Autoevaluarte con ejercicios mixtos

![Review map](/blog/curso-b1/unit-15/review-conditionals.png)

---

## 1. Mapa de los tres condicionales

| Tipo | If-clause | Result | Uso |
| :--- | :--- | :--- | :--- |
| **First** | Present simple | will / can / might… | Real / futuro probable |
| **Second** | Past simple | would / could / might… | Hipotético presente/futuro |
| **Third** | Past perfect | would have + V3 | Pasado irreal / regrets |

![Review examples](/blog/curso-b1/unit-15/review-examples.png)

<audio controls preload="none" src="/audio/blog/curso-b1/unit-15/review-first.mp3" title="🔊 First review"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-15/review-second.mp3" title="🔊 Second review"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-15/review-third.mp3" title="🔊 Third review"></audio>
<audio controls preload="none" src="/audio/blog/curso-b1/unit-15/review-time.mp3" title="🔊 Time clauses"></audio>

---

## 2. Checklist de autoevaluación

- [ ] First: *If it rains, we'll cancel.*  
- [ ] Time clauses: *When / as soon as / until* + present (no *will*)  
- [ ] Second: *If I won, I'd travel.* / *If I were you…*  
- [ ] Third: *If I had left earlier, I would have arrived.*  
- [ ] No pongo *would* en la if-clause (B1 estándar)

---

## 3. Reading: un fin de semana, tres condicionales

> **Friday (first):** If the weather is good, we'll go to the festival.  
> **Saturday dream (second):** If we had VIP tickets, we'd meet the band.  
> **Sunday regret (third):** If we had booked earlier, we would have got better seats.

Same topic — three different time/reality frames.

<audio controls preload="none" src="/audio/blog/curso-b1/unit-15/reading-mix.mp3" title="🔊 Reading: mix"></audio>

---

## 4. Diálogo de repaso

<audio controls preload="none" src="/audio/blog/curso-b1/unit-15/dialogue-mix.mp3" title="🔊 Dialogue: mix"></audio>

> If it rains tomorrow, we'll watch a series at home.  
> If I were free every evening, I'd learn the guitar.  
> If we had left earlier last week, we wouldn't have missed the concert.  
> Perfect — first, second and third in one chat!

---

## 5. Practica

<audio controls preload="none" src="/audio/blog/curso-b1/unit-15/practice-mix.mp3" title="🔊 Practice mix"></audio>

---

## 6. Ejercicios

### 1 — ¿First, second o third?
1. If she studies, she'll pass.  
2. If she studied, she'd pass.  
3. If she had studied, she would have passed.  
4. If we had more money, we'd go to the festival.  
5. If we leave now, we'll catch the bus.

<details><summary>Ver solución</summary>

1. **first** · 2. **second** · 3. **third** · 4. **second** · 5. **first**
</details>

### 2 — Completa
1. If it ___ sunny tomorrow, we'll walk. (*is*)  
2. If I ___ you, I'd take an umbrella. (*were*)  
3. If they ___ earlier, they would have got seats. (*had booked*)  
4. We ___ out if it doesn't rain. (*will go*)  
5. She ___ if she had known. (*would have called*)

<details><summary>Ver solución</summary>

1. **is** · 2. **were** · 3. **had booked** · 4. **will go / 'll go** · 5. **would have called**
</details>

### 3 — Corrige
1. *If it will rain…* → If it **rains**…  
2. *If I would have time…* → If I **had** time… / If I **had had** time…  
3. *I would passed* → I **would have passed**

### 4 — Traduce
1. Si hace buen tiempo, iremos al festival.  
2. Si tuviera entradas VIP, conocería a la banda.  
3. Si hubiéramos reservado antes, habríamos tenido mejores asientos.

<details><summary>Ver solución</summary>

1. If the weather **is** good, we**'ll** go to the festival.  
2. If I **had** VIP tickets, I**'d** meet the band.  
3. If we **had booked** earlier, we **would have had/got** better seats.
</details>

### 5 — Mini writing
Escribe 3 frases (first + second + third) sobre el mismo tema (viaje, examen o fin de semana).

<details><summary>Modelo</summary>

If I finish work early, I'll go to the cinema.  
If I had more free time, I'd binge-watch a new series.  
If I had bought tickets yesterday, I would have gone to the concert.
</details>

---

## Tip del profesor

En el repaso, **clasifica primero** (¿pasado / ahora / futuro real?) y luego conjugas. El error suele ser de *marco temporal*, no de vocabulario.

---

## Practica ahora

1. Relee los mapas de U11–U14.  
2. Completa la [Unidad 15 del curso B1](/curso-b1/unit-15).  
3. Siguiente bloque del curso: [Unidad 16 — Passive](/curso-b1/unit-16).

Guías del bloque:

- [U11 — First + weather](/blog/curso-b1/unidad-11-first-conditional-weather)
- [U12 — Second](/blog/curso-b1/unidad-12-second-conditional)
- [U13 — First vs Second](/blog/curso-b1/unidad-13-first-vs-second-conditional)
- [U14 — Third](/blog/curso-b1/unidad-14-third-conditional)
- [Condicionales B1–B2](/blog/gramatica/ejercicios-condicionales-ingles-b1-b2)
- [Inglés B1](/blog/metodos/cursos-online-ingles-b1)

---

## Fuentes

- CEFR B1 · Cambridge B1 Preliminary · British Council — Conditionals
'''


def main() -> None:
    write("unidad-13-first-vs-second-conditional.md", U13)
    write("unidad-14-third-conditional.md", U14)
    write("unidad-15-repaso-11-14.md", U15)


if __name__ == "__main__":
    main()
