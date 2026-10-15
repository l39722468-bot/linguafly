"use client";

import Link from "next/link";
import { useState } from "react";
import { savePracticeAttempt } from "@/lib/practice/actions";
import { getBand, questionSets } from "@/lib/practice/question-bank";

type ExplanationLanguage = "es" | "ca" | "en" | "fr" | "pt" | "de" | "it";
const persistenceCopy: Record<ExplanationLanguage, {
  saving: string;
  saved: string;
  error: string;
  retry: string;
}> = {
  es: { saving: "Guardando resultado…", saved: "Resultado guardado en tu historial.", error: "No se ha podido guardar el resultado. Comprueba la conexión e inténtalo de nuevo.", retry: "Guardar resultado de nuevo" },
  ca: { saving: "Desant el resultat…", saved: "Resultat desat a l'historial.", error: "No s'ha pogut desar el resultat. Comprova la connexió i torna-ho a provar.", retry: "Torna a desar el resultat" },
  en: { saving: "Saving result…", saved: "Result saved to your history.", error: "The result could not be saved. Check your connection and try again.", retry: "Save result again" },
  fr: { saving: "Enregistrement du résultat…", saved: "Résultat enregistré dans votre historique.", error: "Le résultat n'a pas pu être enregistré. Vérifiez la connexion et réessayez.", retry: "Enregistrer à nouveau" },
  pt: { saving: "A guardar o resultado…", saved: "Resultado guardado no histórico.", error: "Não foi possível guardar o resultado. Verifica a ligação e tenta novamente.", retry: "Guardar novamente" },
  de: { saving: "Ergebnis wird gespeichert…", saved: "Ergebnis im Verlauf gespeichert.", error: "Das Ergebnis konnte nicht gespeichert werden. Prüfe die Verbindung und versuche es erneut.", retry: "Ergebnis erneut speichern" },
  it: { saving: "Salvataggio del risultato…", saved: "Risultato salvato nella cronologia.", error: "Non è stato possibile salvare il risultato. Controlla la connessione e riprova.", retry: "Salva di nuovo il risultato" },
};

const explanations: Record<string, Record<ExplanationLanguage, string>> = {
  presentSimple: {
    es: "En presente simple, he, she e it llevan normalmente -s: he goes.",
    ca: "En present simple, he, she i it normalment porten -s: he goes.",
    en: "In the present simple, he, she and it usually take -s: he goes.",
    fr: "Au présent simple, he, she et it prennent généralement -s : he goes.",
    pt: "No present simple, he, she e it normalmente recebem -s: he goes.",
    de: "Im Simple Present erhalten he, she und it normalerweise ein -s: he goes.",
    it: "Nel present simple, he, she e it prendono normalmente -s: he goes.",
  },
  presentContinuous: {
    es: "Para algo que ocurre ahora usamos am/is/are + verbo en -ing.",
    ca: "Per a una acció que passa ara fem servir am/is/are + verb en -ing.",
    en: "For an action happening now, use am/is/are + verb-ing.",
    fr: "Pour une action en cours, utilisez am/is/are + verbe en -ing.",
    pt: "Para uma ação a decorrer agora, usamos am/is/are + verbo em -ing.",
    de: "Für eine Handlung, die gerade passiert, nutzt man am/is/are + Verb-ing.",
    it: "Per un'azione in corso, usiamo am/is/are + verbo in -ing.",
  },
  pastSimple: {
    es: "Yesterday indica un momento pasado terminado; see pasa a saw.",
    ca: "Yesterday indica un moment passat acabat; see passa a saw.",
    en: "Yesterday refers to a finished past time; see changes to saw.",
    fr: "Yesterday indique un moment passé terminé ; see devient saw.",
    pt: "Yesterday indica um momento passado e concluído; see passa a saw.",
    de: "Yesterday bezeichnet einen abgeschlossenen Zeitpunkt in der Vergangenheit; see wird zu saw.",
    it: "Yesterday indica un momento passato concluso; see diventa saw.",
  },
  much: {
    es: "Milk es incontable; en frases negativas usamos much, no many.",
    ca: "Milk és incomptable; en frases negatives fem servir much, no many.",
    en: "Milk is uncountable; in negative sentences use much, not many.",
    fr: "Milk est indénombrable ; dans une phrase négative, utilisez much et non many.",
    pt: "Milk é incontável; em frases negativas usamos much, não many.",
    de: "Milk ist nicht zählbar; in verneinten Sätzen verwendet man much, nicht many.",
    it: "Milk è non numerabile; nelle frasi negative usiamo much, non many.",
  },
  politeRequest: {
    es: "Después de could, usamos el verbo en su forma base: open.",
    ca: "Després de could, fem servir el verb en forma base: open.",
    en: "After could, use the base form of the verb: open.",
    fr: "Après could, utilisez la base verbale : open.",
    pt: "Depois de could, usamos a forma base do verbo: open.",
    de: "Nach could steht die Grundform des Verbs: open.",
    it: "Dopo could, si usa la forma base del verbo: open.",
  },
  presentPerfectSince: {
    es: "Usamos present perfect con since para una situación que empezó en el pasado y continúa.",
    ca: "Fem servir el present perfect amb since per a una situació que va començar en el passat i continua.",
    en: "Use the present perfect with since for a situation that began in the past and continues.",
    fr: "Utilisez le present perfect avec since pour une situation commencée dans le passé et qui continue.",
    pt: "Usamos o present perfect com since para algo que começou no passado e continua.",
    de: "Mit since verwendet man das Present Perfect für etwas, das in der Vergangenheit begann und andauert.",
    it: "Usiamo il present perfect con since per una situazione iniziata nel passato e ancora in corso.",
  },
  secondConditional: {
    es: "El second conditional usa if + past simple para una situación hipotética: If I had…, I'd…",
    ca: "El second conditional fa servir if + past simple per a una situació hipotètica: If I had…, I'd…",
    en: "The second conditional uses if + past simple for a hypothetical situation: If I had…, I'd…",
    fr: "Le second conditional utilise if + past simple pour une hypothèse : If I had…, I'd…",
    pt: "O second conditional usa if + past simple para uma situação hipotética: If I had…, I'd…",
    de: "Der Second Conditional nutzt if + Simple Past für eine hypothetische Situation: If I had…, I'd…",
    it: "Il second conditional usa if + past simple per un'ipotesi: If I had…, I'd…",
  },
  usedTo: {
    es: "Be used to significa estar acostumbrado a algo; después de to usamos un sustantivo o -ing.",
    ca: "Be used to vol dir estar acostumat a una cosa; després de to fem servir un nom o -ing.",
    en: "Be used to means being accustomed to something; after to, use a noun or -ing.",
    fr: "Be used to signifie être habitué à quelque chose ; après to, utilisez un nom ou -ing.",
    pt: "Be used to significa estar habituado; depois de to, usamos um nome ou -ing.",
    de: "Be used to bedeutet an etwas gewöhnt sein; danach folgt ein Nomen oder die -ing-Form.",
    it: "Be used to significa essere abituati; dopo to usiamo un nome o la forma in -ing.",
  },
  causativeHave: {
    es: "Have something done indica que otra persona realiza el trabajo por nosotros: had the report finished.",
    ca: "Have something done indica que una altra persona fa la feina per nosaltres: had the report finished.",
    en: "Have something done means someone else does the work for us: had the report finished.",
    fr: "Have something done signifie que quelqu'un d'autre effectue le travail pour nous.",
    pt: "Have something done indica que outra pessoa faz o trabalho por nós.",
    de: "Have something done bedeutet, dass jemand anderes die Arbeit für uns erledigt.",
    it: "Have something done indica che qualcun altro svolge il lavoro per noi.",
  },
  despiteIng: {
    es: "Despite va seguido de un sustantivo o de un verbo en -ing, no de una oración con was.",
    ca: "Després de despite fem servir un nom o un verb en -ing, no una oració amb was.",
    en: "Despite is followed by a noun or an -ing form, not a clause with was.",
    fr: "Despite est suivi d'un nom ou d'un verbe en -ing, pas d'une proposition avec was.",
    pt: "Depois de despite usamos um nome ou verbo em -ing, não uma oração com was.",
    de: "Auf despite folgt ein Nomen oder eine -ing-Form, kein Satzteil mit was.",
    it: "Dopo despite si usa un nome o un verbo in -ing, non una frase con was.",
  },
  hardly: {
    es: "Hardly al principio provoca inversión: Hardly had + sujeto + participio… when…",
    ca: "Hardly al principi provoca inversió: Hardly had + subjecte + participi… when…",
    en: "Hardly at the beginning triggers inversion: Hardly had + subject + past participle… when…",
    fr: "Hardly en début de phrase entraîne l'inversion : Hardly had + sujet + participe passé… when…",
    pt: "Hardly no início provoca inversão: Hardly had + sujeito + particípio passado… when…",
    de: "Hardly am Satzanfang löst eine Inversion aus: Hardly had + Subjekt + Partizip… when…",
    it: "Hardly all'inizio della frase richiede l'inversione: Hardly had + soggetto + participio… when…",
  },
  whichClause: {
    es: "Which puede referirse a toda la idea anterior en una oración relativa explicativa.",
    ca: "Which pot referir-se a tota la idea anterior en una oració de relatiu explicativa.",
    en: "Which can refer to the whole preceding idea in a non-defining relative clause.",
    fr: "Which peut reprendre toute l'idée précédente dans une relative explicative.",
    pt: "Which pode retomar toda a ideia anterior numa oração relativa explicativa.",
    de: "Which kann sich in einem nicht einschränkenden Relativsatz auf die ganze vorherige Aussage beziehen.",
    it: "Which può riferirsi all'intera idea precedente in una relativa esplicativa.",
  },
  wouldRather: {
    es: "Después de would rather + sujeto, usamos past simple para expresar una preferencia sobre el presente o futuro.",
    ca: "Després de would rather + subjecte, fem servir past simple per expressar una preferència sobre el present o futur.",
    en: "After would rather + subject, use the past simple to express a present or future preference.",
    fr: "Après would rather + sujet, utilisez le past simple pour exprimer une préférence présente ou future.",
    pt: "Depois de would rather + sujeito, usamos past simple para uma preferência presente ou futura.",
    de: "Nach would rather + Subjekt verwendet man das Simple Past für eine gegenwärtige oder zukünftige Präferenz.",
    it: "Dopo would rather + soggetto, si usa il past simple per una preferenza presente o futura.",
  },
  compelling: {
    es: "Compelling significa convincente o persuasivo; compelled describe a una persona obligada a hacer algo.",
    ca: "Compelling vol dir convincent o persuasiu; compelled descriu algú obligat a fer alguna cosa.",
    en: "Compelling means persuasive; compelled describes someone who was forced or driven to act.",
    fr: "Compelling signifie convaincant ; compelled décrit quelqu'un contraint d'agir.",
    pt: "Compelling significa convincente; compelled descreve alguém que foi levado ou obrigado a agir.",
    de: "Compelling bedeutet überzeugend; compelled beschreibt jemanden, der zum Handeln gedrängt wurde.",
    it: "Compelling significa convincente; compelled descrive qualcuno spinto o costretto ad agire.",
  },
  thirdConditional: {
    es: "Were it not for introduce una condición hipotética; para el pasado usamos would have + participio.",
    ca: "Were it not for introdueix una condició hipotètica; per al passat fem servir would have + participi.",
    en: "Were it not for introduces a hypothetical condition; for the past, use would have + past participle.",
    fr: "Were it not for introduit une hypothèse ; pour le passé, utilisez would have + participe passé.",
    pt: "Were it not for introduz uma condição hipotética; para o passado, usamos would have + particípio.",
    de: "Were it not for leitet eine hypothetische Bedingung ein; für die Vergangenheit nutzt man would have + Partizip.",
    it: "Were it not for introduce una condizione ipotetica; per il passato si usa would have + participio.",
  },
};

const copy: Record<ExplanationLanguage, {
  eyebrow: string;
  title: string;
  intro: string;
  question: string;
  check: string;
  next: string;
  finish: string;
  correct: string;
  incorrect: string;
  explanation: string;
  result: string;
  score: string;
  perfect: string;
  good: string;
  retry: string;
  dashboard: string;
}> = {
  es: { eyebrow: "PRÁCTICA GUIADA", title: "Tu primera práctica", intro: "Cinco preguntas adaptadas a tu nivel. Elige una respuesta y compruébala para ver una explicación.", question: "Pregunta", check: "Comprobar respuesta", next: "Siguiente pregunta", finish: "Ver resultado", correct: "¡Correcto!", incorrect: "Todavía no.", explanation: "Explicación", result: "Práctica terminada", score: "Tu resultado", perfect: "¡Excelente! Has acertado todas las preguntas.", good: "Buen trabajo. Sigue practicando para afianzar lo aprendido.", retry: "Repetir práctica", dashboard: "Volver a mi perfil" },
  ca: { eyebrow: "PRÀCTICA GUIADA", title: "La teva primera pràctica", intro: "Cinc preguntes adaptades al teu nivell. Tria una resposta i comprova-la per veure'n l'explicació.", question: "Pregunta", check: "Comprova la resposta", next: "Pregunta següent", finish: "Veure resultat", correct: "Correcte!", incorrect: "Encara no.", explanation: "Explicació", result: "Pràctica acabada", score: "El teu resultat", perfect: "Excel·lent! Has encertat totes les preguntes.", good: "Bon treball. Continua practicant per consolidar el que has après.", retry: "Repetir pràctica", dashboard: "Tornar al perfil" },
  en: { eyebrow: "GUIDED PRACTICE", title: "Your first practice", intro: "Five questions matched to your level. Choose an answer and check it to see an explanation.", question: "Question", check: "Check answer", next: "Next question", finish: "See result", correct: "Correct!", incorrect: "Not quite.", explanation: "Explanation", result: "Practice complete", score: "Your score", perfect: "Excellent! You got every question right.", good: "Good work. Keep practising to consolidate what you learned.", retry: "Try again", dashboard: "Back to my profile" },
  fr: { eyebrow: "PRATIQUE GUIDÉE", title: "Votre première séance", intro: "Cinq questions adaptées à votre niveau. Choisissez une réponse et vérifiez-la pour voir l'explication.", question: "Question", check: "Vérifier la réponse", next: "Question suivante", finish: "Voir le résultat", correct: "Correct !", incorrect: "Pas tout à fait.", explanation: "Explication", result: "Séance terminée", score: "Votre résultat", perfect: "Excellent ! Toutes vos réponses sont correctes.", good: "Bon travail. Continuez à pratiquer pour consolider vos acquis.", retry: "Recommencer", dashboard: "Retour à mon profil" },
  pt: { eyebrow: "PRÁTICA GUIADA", title: "A tua primeira prática", intro: "Cinco perguntas adaptadas ao teu nível. Escolhe uma resposta e confirma-a para veres a explicação.", question: "Pergunta", check: "Verificar resposta", next: "Pergunta seguinte", finish: "Ver resultado", correct: "Correto!", incorrect: "Ainda não.", explanation: "Explicação", result: "Prática concluída", score: "O teu resultado", perfect: "Excelente! Acertaste em todas as perguntas.", good: "Bom trabalho. Continua a praticar para consolidar o que aprendeste.", retry: "Repetir prática", dashboard: "Voltar ao perfil" },
  de: { eyebrow: "GEFÜHRTE ÜBUNG", title: "Deine erste Übung", intro: "Fünf Fragen passend zu deinem Niveau. Wähle eine Antwort und prüfe sie, um eine Erklärung zu sehen.", question: "Frage", check: "Antwort prüfen", next: "Nächste Frage", finish: "Ergebnis anzeigen", correct: "Richtig!", incorrect: "Noch nicht ganz.", explanation: "Erklärung", result: "Übung abgeschlossen", score: "Dein Ergebnis", perfect: "Ausgezeichnet! Alle Antworten sind richtig.", good: "Gut gemacht. Übe weiter, um das Gelernte zu festigen.", retry: "Noch einmal üben", dashboard: "Zurück zu meinem Profil" },
  it: { eyebrow: "ESERCIZIO GUIDATO", title: "La tua prima pratica", intro: "Cinque domande adatte al tuo livello. Scegli una risposta e controllala per vedere la spiegazione.", question: "Domanda", check: "Verifica la risposta", next: "Domanda successiva", finish: "Vedi il risultato", correct: "Corretto!", incorrect: "Non proprio.", explanation: "Spiegazione", result: "Pratica completata", score: "Il tuo risultato", perfect: "Ottimo! Hai risposto correttamente a tutte le domande.", good: "Bel lavoro. Continua a esercitarti per consolidare ciò che hai imparato.", retry: "Ripeti la pratica", dashboard: "Torna al profilo" },
};

export function PracticeSession({
  cefrLevel,
  explanationLanguage,
}: {
  cefrLevel: string | null;
  explanationLanguage: string;
}) {
  const locale: ExplanationLanguage = explanationLanguage in copy
    ? explanationLanguage as ExplanationLanguage
    : "es";
  const t = copy[locale];
  const level = cefrLevel ?? "A1";
  const questions = questionSets[getBand(level)];
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [completedScore, setCompletedScore] = useState<number | null>(null);
  const [completedAnswers, setCompletedAnswers] = useState<Array<{ questionId: string; selectedIndex: number }> | null>(null);
  const saveMessages = persistenceCopy[locale];
  const question = questions[questionIndex];
  function checkAnswer() {
    if (selected === null) return;
    setChecked(true);
    setAnswers((previous) => {
      const next = [...previous];
      next[questionIndex] = selected;
      return next;
    });
  }

  async function persistResult(
    submittedAnswers: Array<{ questionId: string; selectedIndex: number }>,
  ) {
    setSaveState("saving");
    try {
      const result = await savePracticeAttempt(submittedAnswers);
      setSaveState(result.status);
      if (result.status === "success") setCompletedScore(result.score);
    } catch {
      setSaveState("error");
    }
  }

  async function goNext() {
    if (questionIndex === questions.length - 1) {
      const submittedAnswers = questions.map((item, index) => ({
        questionId: item.id,
        selectedIndex: answers[index] ?? -1,
      }));
      const score = answers.reduce(
        (total, answer, index) => total + (answer === questions[index]?.correctIndex ? 1 : 0),
        0,
      );
      setCompletedScore(score);
      setCompletedAnswers(submittedAnswers);
      setFinished(true);
      await persistResult(submittedAnswers);
      return;
    }
    setQuestionIndex((index) => index + 1);
    setSelected(null);
    setChecked(false);
  }

  function restart() {
    setQuestionIndex(0);
    setSelected(null);
    setChecked(false);
    setAnswers([]);
    setFinished(false);
    setSaveState("idle");
    setCompletedScore(null);
    setCompletedAnswers(null);
  }

  if (finished) {
    const finalScore = completedScore ?? answers.reduce(
      (total, answer, index) => total + (answer === questions[index]?.correctIndex ? 1 : 0),
      0,
    );
    return (
      <main className="mx-auto min-h-screen w-full max-w-2xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-wide text-stone-500">{t.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t.result}</h1>
        <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-medium text-stone-500">{t.score}</p>
          <p className="mt-2 text-5xl font-semibold tracking-tight tabular-nums">{finalScore}/5</p>
          <p className="mt-4 text-stone-700">
            {finalScore === 5 ? t.perfect : t.good}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={restart}
              className="rounded-lg bg-stone-900 px-5 py-3 text-base font-medium text-white hover:bg-stone-800"
            >
              {t.retry}
            </button>
            <Link
              href="/app"
              className="rounded-lg border border-stone-300 bg-white px-5 py-3 text-center text-base font-medium text-stone-900 hover:bg-stone-100"
            >
              {t.dashboard}
            </Link>
          </div>
          {saveState !== "idle" ? (
            <div className="mt-5 space-y-3">
              <p
                role={saveState === "error" ? "alert" : "status"}
                className={`text-sm leading-6 ${saveState === "error" ? "text-red-700" : "text-stone-600"}`}
              >
                {saveState === "saving" ? saveMessages.saving :
                 saveState === "success" ? saveMessages.saved : saveMessages.error}
              </p>
              {saveState === "error" ? (
                <button
                  type="button"
                  onClick={() => {
                    if (completedAnswers !== null) void persistResult(completedAnswers);
                  }}
                  className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  {saveMessages.retry}
                </button>
              ) : null}
            </div>
          ) : null}
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-6 py-16">
      <Link href="/app" className="text-sm font-medium text-stone-600 underline underline-offset-4 hover:text-stone-900">
        ← {t.dashboard}
      </Link>
      <p className="mt-8 text-sm font-medium uppercase tracking-wide text-stone-500">{t.eyebrow} · {level}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t.title}</h1>
      <p className="mt-3 leading-7 text-stone-600">{t.intro}</p>

      <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-stone-500">
            {t.question} {questionIndex + 1} / {questions.length}
          </p>
          <div className="h-2 w-28 overflow-hidden rounded-full bg-stone-100" aria-label={`${questionIndex + 1} of ${questions.length}`}>
            <div className="h-full rounded-full bg-stone-800 transition-all" style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <h2 className="mt-6 text-xl font-semibold leading-8">{question.prompt}</h2>
        <div className="mt-5 grid gap-3">
          {question.options.map((option, index) => {
            const isCorrectOption = checked && index === question.correctIndex;
            const isWrongSelection = checked && selected === index && index !== question.correctIndex;
            return (
              <button
                key={option}
                type="button"
                onClick={() => { if (!checked) setSelected(index); }}
                disabled={checked}
                aria-pressed={selected === index}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-base transition ${isCorrectOption ? "border-emerald-600 bg-emerald-50 text-emerald-900" : isWrongSelection ? "border-red-500 bg-red-50 text-red-900" : selected === index ? "border-stone-900 bg-stone-100" : "border-stone-200 hover:border-stone-400"} `}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {checked ? (
          <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-4" role="status">
            <p className="font-semibold">{selected === question.correctIndex ? t.correct : t.incorrect}</p>
            <p className="mt-2 text-sm font-semibold text-stone-600">{t.explanation}</p>
            <p className="mt-1 text-sm leading-6 text-stone-700">{explanations[question.explanationKey][locale]}</p>
          </div>
        ) : null}

        <div className="mt-6">
          {!checked ? (
            <button
              type="button"
              onClick={checkAnswer}
              disabled={selected === null}
              className="w-full rounded-lg bg-stone-900 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.check}
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="w-full rounded-lg bg-stone-900 px-5 py-3 font-medium text-white hover:bg-stone-800"
            >
              {questionIndex === questions.length - 1 ? t.finish : t.next}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
