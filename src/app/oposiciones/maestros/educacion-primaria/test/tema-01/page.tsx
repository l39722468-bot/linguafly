"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questions: Question[] = [
  { question: "¿Cuál describe mejor el desarrollo psicoevolutivo durante la Educación Primaria?", options: ["Un proceso idéntico en todo el alumnado y determinado solo por la edad.", "Un proceso dinámico con dimensiones relacionadas y ritmos individuales.", "Un proceso que afecta únicamente al pensamiento.", "Un conjunto de cambios que finaliza al comenzar Primaria."], answer: 1, explanation: "El desarrollo es dinámico y multidimensional. Las edades orientan, pero no describen de forma rígida a cada niño o niña." },
  { question: "¿Qué conjunto recoge las cuatro dimensiones principales tratadas en el tema?", options: ["Académica, económica, clínica y laboral.", "Cognitiva, motriz, afectiva y social.", "Lingüística, matemática, artística y digital.", "Biológica, administrativa, familiar y jurídica."], answer: 1, explanation: "El tema organiza el desarrollo en dimensiones cognitiva, motriz, afectiva-personal y social, que interactúan entre sí." },
  { question: "¿Cómo conviene utilizar las edades de referencia del desarrollo?", options: ["Como criterios inflexibles para agrupar por capacidad.", "Como una garantía de que todo el alumnado alcanzará el mismo hito.", "Como orientaciones que deben interpretarse junto al contexto y las diferencias individuales.", "Como sustituto de la observación educativa."], answer: 2, explanation: "Las referencias evolutivas ayudan a planificar, pero deben combinarse con la observación, el contexto y la evaluación del progreso individual." },
  { question: "¿Qué práctica favorece el desarrollo de estrategias de memoria y organización?", options: ["Pedir que se memorice todo sin organizarlo.", "Evitar que el alumnado planifique por sí mismo.", "Usar mapas conceptuales, listas de comprobación y recuperación activa.", "Cambiar de consigna constantemente."], answer: 2, explanation: "Las herramientas de organización y las estrategias explícitas hacen visible cómo planificar, relacionar y recuperar información." },
  { question: "Según las propuestas clásicas de Piaget, ¿qué tendencia se asocia a buena parte de la etapa de Primaria?", options: ["La desaparición de toda influencia del contexto.", "El progreso del razonamiento lógico aplicado a situaciones concretas.", "La imposibilidad de clasificar objetos.", "El dominio universal del razonamiento formal desde los seis años."], answer: 1, explanation: "Las teorías clásicas describen avances en operaciones lógicas aplicadas a situaciones concretas, pero no deben convertirse en etiquetas rígidas de cada estudiante." },
  { question: "¿Cuál es un ejemplo de andamiaje educativo?", options: ["Retirar toda ayuda desde el primer intento.", "Dar la respuesta para que el alumno no piense.", "Ofrecer un ejemplo y preguntas guía, retirando apoyos progresivamente.", "Mantener siempre el mismo nivel de ayuda, independientemente del progreso."], answer: 2, explanation: "El andamiaje es un apoyo temporal que permite realizar tareas y se ajusta o retira cuando el alumnado gana autonomía." },
  { question: "¿Qué decisión didáctica tiene en cuenta los conocimientos previos?", options: ["Introducir conceptos sin explorar lo que el alumnado sabe.", "Comenzar con una actividad diagnóstica o conversación inicial.", "Evaluar solo al terminar la unidad.", "Usar únicamente definiciones abstractas."], answer: 1, explanation: "Explorar las ideas iniciales permite conectar los contenidos nuevos con lo que el alumnado ya comprende e identificar concepciones previas." },
  { question: "¿Cuál es una implicación educativa razonable del desarrollo motriz?", options: ["Comparar públicamente la velocidad de todo el alumnado.", "Eliminar actividades manuales para evitar diferencias.", "Proporcionar experiencias variadas, seguras y graduadas.", "Suponer que la coordinación es idéntica en todos los estudiantes."], answer: 2, explanation: "Las experiencias variadas y graduadas favorecen la coordinación y la participación, sin convertir las diferencias en motivo de exclusión." },
  { question: "¿Qué tipo de feedback suele resultar más útil para aprender?", options: ["Una etiqueta global sobre la inteligencia del alumno.", "Comentarios vagos sin indicar qué revisar.", "Información concreta sobre la estrategia usada y el siguiente paso.", "Únicamente una nota al final del trimestre."], answer: 2, explanation: "El feedback específico y orientado al proceso ayuda a comprender qué se ha logrado y cómo mejorar." },
  { question: "¿Qué afirmación sobre el autoconcepto es más adecuada?", options: ["No se ve afectado por las experiencias escolares.", "Puede construirse también mediante experiencias de éxito, feedback y relaciones.", "Es inmutable desde el nacimiento.", "Depende únicamente de la calificación numérica."], answer: 1, explanation: "El autoconcepto se construye a través de múltiples experiencias y relaciones; el clima del aula y el feedback del docente pueden influir." },
  { question: "¿Qué práctica apoya la regulación emocional en el aula?", options: ["Ridiculizar los errores para que no se repitan.", "Evitar hablar de emociones.", "Modelar estrategias, poner nombre a las emociones y practicar formas de pedir ayuda.", "Esperar que todo el alumnado se autorregule sin enseñanza explícita."], answer: 2, explanation: "La regulación puede enseñarse y practicarse con modelos, lenguaje emocional, rutinas y estrategias de afrontamiento." },
  { question: "¿Qué condición puede mejorar una actividad cooperativa?", options: ["Que una sola persona decida por todo el equipo.", "Que no haya roles ni objetivos comunes.", "Que se definan responsabilidades, normas y momentos de reflexión.", "Que la evaluación ignore la participación."], answer: 2, explanation: "La cooperación requiere estructura: objetivos compartidos, responsabilidad individual, normas y seguimiento del proceso." },
  { question: "¿Cuál es una forma educativa de trabajar el desarrollo moral y la convivencia?", options: ["Aplicar normas sin explicarlas nunca.", "Utilizar dilemas apropiados, acuerdos de aula y reparación del daño.", "Evitar que el alumnado dialogue sobre conflictos.", "Premiar siempre a quien habla más alto."], answer: 1, explanation: "Los dilemas y acuerdos permiten considerar perspectivas, analizar consecuencias y practicar formas respetuosas de resolver conflictos." },
  { question: "¿Qué debe evitarse al interpretar el comportamiento de un alumno?", options: ["Observar la conducta en distintos contextos.", "Considerar experiencias y circunstancias.", "Convertir un episodio aislado en una etiqueta fija de personalidad.", "Hablar con el equipo educativo cuando proceda."], answer: 2, explanation: "Una conducta aislada no permite concluir que exista un rasgo permanente. Hay que observar, contextualizar y actuar con prudencia." },
  { question: "¿Cómo se relacionan las dimensiones del desarrollo?", options: ["Son independientes y nunca se influyen.", "Interactúan; una tarea puede implicar pensamiento, emoción, movimiento y cooperación.", "Solo se relacionan fuera del colegio.", "La dimensión social sustituye a las demás."], answer: 1, explanation: "Las dimensiones se distinguen para estudiar el desarrollo, pero en situaciones reales de aprendizaje están conectadas." },
  { question: "¿Qué caracteriza a la evaluación formativa?", options: ["Se realiza únicamente cuando termina el curso.", "Recoge evidencias durante el proceso para orientar los siguientes pasos.", "Solo clasifica al alumnado.", "No ofrece información para mejorar."], answer: 1, explanation: "La evaluación formativa informa sobre el aprendizaje mientras sucede y permite ajustar la enseñanza y las estrategias del alumnado." },
  { question: "En una tarea inclusiva, ¿qué significa ofrecer apoyos diversos?", options: ["Reducir automáticamente las expectativas para todos.", "Permitir diferentes formas de acceder a la información o demostrar el aprendizaje.", "Hacer una actividad completamente distinta para cada alumno sin objetivos comunes.", "Evaluar solo el producto final."], answer: 1, explanation: "La accesibilidad puede requerir distintas vías, apoyos o formatos mientras se mantienen claros los objetivos y criterios de aprendizaje." },
  { question: "¿Por qué conviene normalizar el error en el aula?", options: ["Porque el resultado nunca importa.", "Porque sustituye la evaluación.", "Porque permite revisar estrategias y aprender a mejorar.", "Porque el docente no debe corregir."], answer: 2, explanation: "El error puede servir como evidencia para ajustar estrategias y aprender, dentro de un clima seguro y con feedback útil." },
  { question: "En el ejemplo de cuidado del agua, ¿qué hace que la tarea sea multidimensional?", options: ["Solo se copia una definición.", "Se integran observación, razonamiento, registro, coordinación y cooperación.", "No requiere interacción.", "Solo cuenta la velocidad al escribir."], answer: 1, explanation: "Una tarea contextualizada puede movilizar simultáneamente habilidades cognitivas, lingüísticas, motrices, afectivas y sociales." },
  { question: "¿Cuál es la mejor actitud al usar teorías evolutivas para planificar?", options: ["Aplicar una teoría como receta universal.", "Ignorar la evidencia observada en el aula.", "Utilizarlas como marco orientativo y adaptar la intervención a las necesidades y evidencias del grupo.", "Asumir que la edad predice por completo el rendimiento."], answer: 2, explanation: "Las teorías ayudan a formular hipótesis para enseñar, pero la planificación debe tener en cuenta el contexto, la observación y el progreso real." },
];

export default function TemaUnoTestPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0), [answers]);
  const answeredCount = Object.keys(answers).length;

  function reset() {
    setAnswers({});
    setSubmitted(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
          <nav aria-label="Migas de pan" className="mb-5 text-sm text-slate-500">
            <Link href="/oposiciones/maestros/educacion-primaria/" className="underline underline-offset-4">Oposiciones</Link><span className="mx-2">/</span><Link href="/oposiciones/maestros/educacion-primaria/temario/tema-01/" className="underline underline-offset-4">Tema 1</Link><span className="mx-2">/</span><span>Test</span>
          </nav>
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-indigo-700">Test gratuito · 20 preguntas</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Test del tema 1: desarrollo de 6 a 12 años</h1>
          <p className="mt-4 leading-7 text-slate-600">Selecciona una respuesta por pregunta. Al corregir, verás tu puntuación y las explicaciones para revisar cada respuesta. No necesitas registrarte.</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 font-semibold text-indigo-800">{answeredCount} de {questions.length} respondidas</span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">Sin penalización por error</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" aria-label={`Progreso: ${answeredCount} de ${questions.length}`}>
            <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        {submitted && (
          <section aria-live="polite" className="mb-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-indigo-800">Resultado orientativo</p>
            <p className="mt-2 text-3xl font-extrabold">{score} / {questions.length} <span className="text-lg font-semibold text-slate-600">({Math.round((score / questions.length) * 100)}%)</span></p>
            <p className="mt-2 leading-7 text-slate-700">{score >= 17 ? "Muy buen resultado. Repasa las explicaciones para consolidar los matices." : score >= 13 ? "Buen trabajo. Revisa las respuestas incorrectas y vuelve a intentarlo." : "Utiliza el resultado para identificar qué apartados conviene volver a estudiar."}</p>
            {answeredCount < questions.length && <p className="mt-2 text-sm text-slate-600">Has dejado {questions.length - answeredCount} preguntas sin contestar; se contabilizan como incorrectas.</p>}
          </section>
        )}

        <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <div className="space-y-5">
            {questions.map((q, i) => {
              const selected = answers[i];
              const isCorrect = selected === q.answer;
              return (
                <fieldset key={q.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <legend className="w-full text-base font-bold leading-7"><span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-sm">{i + 1}</span>{q.question}</legend>
                  <div className="mt-4 space-y-2">
                    {q.options.map((option, j) => {
                      const chosen = selected === j;
                      const correctOption = submitted && q.answer === j;
                      const wrongChoice = submitted && chosen && !isCorrect;
                      return (
                        <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${correctOption ? "border-emerald-300 bg-emerald-50" : wrongChoice ? "border-rose-300 bg-rose-50" : chosen ? "border-indigo-300 bg-indigo-50" : "border-slate-200 hover:border-slate-300"} ${submitted ? "cursor-default" : ""}`}>
                          <input type="radio" name={`q-${i}`} value={j} checked={chosen} disabled={submitted} onChange={() => setAnswers((prev) => ({ ...prev, [i]: j }))} className="mt-1 h-4 w-4 accent-indigo-700" />
                          <span className="flex-1 leading-6">{option}</span>
                          {correctOption && <span className="text-xs font-bold text-emerald-800">Correcta</span>}
                        </label>
                      );
                    })}
                  </div>
                  {submitted && <div className="mt-4 rounded-xl bg-slate-50 p-4"><p className={`text-sm font-bold ${isCorrect ? "text-emerald-800" : "text-rose-800"}`}>{selected === undefined ? "Sin responder" : isCorrect ? "Respuesta correcta" : "Respuesta incorrecta"}</p><p className="mt-1 leading-7 text-slate-700">{q.explanation}</p></div>}
                </fieldset>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {!submitted ? (
              <button type="submit" className="rounded-xl bg-indigo-700 px-6 py-3 font-semibold text-white hover:bg-indigo-800">Corregir test</button>
            ) : (
              <button type="button" onClick={reset} className="rounded-xl bg-indigo-700 px-6 py-3 font-semibold text-white hover:bg-indigo-800">Repetir test</button>
            )}
            <Link href="/oposiciones/maestros/educacion-primaria/temario/tema-01/" className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:border-indigo-300">Volver al tema</Link>
          </div>
        </form>

        <p className="mt-8 text-sm leading-6 text-slate-500">Preguntas originales de autoevaluación para repasar conceptos generales. Este test no es oficial ni reproduce preguntas de una convocatoria concreta. Contrasta el temario con la <a className="font-semibold text-indigo-700 underline underline-offset-4" href="https://boe.es/buscar/doc.php?id=BOE-A-2007-5478" target="_blank" rel="noreferrer">Orden ECI/592/2007</a> y consulta la normativa curricular y las aclaraciones de tu convocatoria autonómica.</p>
      </div>
    </main>
  );
}
