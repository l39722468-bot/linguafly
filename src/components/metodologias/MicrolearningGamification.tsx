'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Trophy, Star, Flame, Target, Award, Zap, Clock, Brain, ArrowLeft } from 'lucide-react'
import { useMethodologyProgress } from '@/hooks/use-methodology-progress'

interface Exercise {
  id: string
  type: 'mcq' | 'true_false'
  question: string
  options?: string[]
  correctAnswer: string | boolean
}

interface MicroLesson {
  id: string
  title: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  duration: number // en minutos
  category: 'grammar' | 'vocabulary' | 'pronunciation' | 'listening' | 'speaking' | 'methodology'
  difficulty: 1 | 2 | 3 | 4 | 5
  xp: number
  completed: boolean
  unlocked: boolean
  content?: {
    text: string
    keyPoints: string[]
  }
  exercises?: Exercise[]
}

interface UserProgress {
  level: number
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  currentXP: number
  nextLevelXP: number
  streak: number
  totalPoints: number
  badges: Badge[]
}

interface Badge {
  id: string
  name: string
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  description: string
  icon: string
  unlocked: boolean
  date?: string
}

const microLessons: MicroLesson[] = [
  // Nivel A1 - Bloque 1: Primeros Pasos
  { 
    id: 'l1', 
    title: 'Saying Hello & Goodbye', 
    level: 'A1', 
    duration: 4, 
    category: 'vocabulary', 
    difficulty: 1, 
    xp: 50, 
    completed: false, 
    unlocked: true,
    content: {
      text: 'Aprender a saludar y despedirse es el primer paso para comunicarte en inglés. Existen formas formales e informales dependiendo de con quién hables.',
      keyPoints: [
        'Formal: Hello, Good morning/afternoon/evening',
        'Informal: Hi, Hey, What\'s up?',
        'Despedidas: Goodbye, Bye, See you later',
        'Preguntar cómo están: How are you? / How\'s it going?'
      ]
    },
    exercises: [
      {
        id: 'e-l1-1',
        type: 'mcq',
        question: '¿Cuál es una forma formal de saludar por la mañana?',
        options: ['What\'s up?', 'Good morning', 'Hey!', 'Bye'],
        correctAnswer: 'Good morning'
      },
      {
        id: 'e-l1-2',
        type: 'true_false',
        question: '"What\'s up?" es una forma formal de saludar.',
        correctAnswer: false
      }
    ]
  },
  { 
    id: 'l2', 
    title: 'The Verb "To Be": I am, You are', 
    level: 'A1', 
    duration: 6, 
    category: 'grammar', 
    difficulty: 1, 
    xp: 60, 
    completed: false, 
    unlocked: true,
    content: {
      text: 'El verbo "To Be" (ser o estar) es el más importante en inglés. Se usa para nombres, profesiones, estados de ánimo y lugares.',
      keyPoints: [
        'I am (Yo soy/estoy)',
        'You are (Tú eres/estás)',
        'He/She/It is (Él/Ella/Eso es/está)',
        'We/They are (Nosotros/Ellos son/están)'
      ]
    },
    exercises: [
      {
        id: 'e-l2-1',
        type: 'mcq',
        question: 'Completa: "She ____ a student."',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 'is'
      },
      {
        id: 'e-l2-2',
        type: 'mcq',
        question: 'Completa: "We ____ happy."',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 'are'
      }
    ]
  },
  { 
    id: 'l3', 
    title: 'Numbers 1-20 & Spelling', 
    level: 'A1', 
    duration: 5, 
    category: 'vocabulary', 
    difficulty: 1, 
    xp: 50, 
    completed: false, 
    unlocked: false,
    content: {
      text: 'Dominar los números básicos y el abecedario es esencial para dar información personal como tu teléfono o deletrear tu nombre.',
      keyPoints: [
        'Números 1-10: One, Two, Three...',
        'Números 11-20: Eleven, Twelve, Thirteen...',
        'Spelling: ¿Cómo se deletrea? - How do you spell it?',
        'Diferencia clave: 13 (Thirteen) vs 30 (Thirty)'
      ]
    },
    exercises: [
      {
        id: 'e-l3-1',
        type: 'mcq',
        question: '¿Cómo se escribe el número 12 en inglés?',
        options: ['Two', 'Ten', 'Twelve', 'Twenty'],
        correctAnswer: 'Twelve'
      },
      {
        id: 'e-l3-2',
        type: 'true_false',
        question: '13 se escribe "Thirty".',
        correctAnswer: false
      }
    ]
  },
  
  // Nivel A1 - Bloque 2: Mi Mundo
  { 
    id: 'l4', 
    title: 'Introduce Yourself', 
    level: 'A1', 
    duration: 7, 
    category: 'speaking', 
    difficulty: 2, 
    xp: 80, 
    completed: false, 
    unlocked: false,
    content: {
      text: 'Presentarte a ti mismo implica decir tu nombre, edad, de dónde eres y qué haces. Es la base de cualquier conversación inicial.',
      keyPoints: [
        'Name: My name is... / I\'m...',
        'Origin: I am from... (country/city)',
        'Age: I am [number] years old (No se usa "have")',
        'Profession: I am a student / I am an engineer'
      ]
    },
    exercises: [
      {
        id: 'e-l4-1',
        type: 'mcq',
        question: '¿Cuál es la forma correcta de decir tu edad?',
        options: ['I have 20 years', 'I am 20 years old', 'I am 20 years', 'I am 20 old'],
        correctAnswer: 'I am 20 years old'
      },
      {
        id: 'e-l4-2',
        type: 'mcq',
        question: 'Completa: "I ____ from Spain."',
        options: ['is', 'are', 'be', 'am'],
        correctAnswer: 'am'
      }
    ]
  },
  { 
    id: 'l5', 
    title: 'Countries & Nationalities', 
    level: 'A1', 
    duration: 6, 
    category: 'vocabulary', 
    difficulty: 2, 
    xp: 60, 
    completed: false, 
    unlocked: false,
    content: {
      text: 'Aprender los nombres de los países y sus nacionalidades te permite hablar de tus orígenes y conocer a personas de todo el mundo.',
      keyPoints: [
        'Spain -> Spanish',
        'UK (United Kingdom) -> British',
        'USA (United States) -> American',
        'France -> French',
        'Italy -> Italian'
      ]
    },
    exercises: [
      {
        id: 'e-l5-1',
        type: 'mcq',
        question: 'If someone is from France, they are:',
        options: ['French', 'France', 'Franch', 'Frenchan'],
        correctAnswer: 'French'
      }
    ]
  },
  
  // Nivel A1 - Bloque 3: Día a Día
  { 
    id: 'l6', 
    title: 'Family Members', 
    level: 'A1', 
    duration: 5, 
    category: 'vocabulary', 
    difficulty: 2, 
    xp: 70, 
    completed: false, 
    unlocked: false,
    content: {
      text: 'Aprender los nombres de los miembros de la familia te permite hablar sobre tu vida personal y entender las relaciones entre las personas.',
      keyPoints: [
        'Parents: Father (Dad), Mother (Mom)',
        'Siblings: Brother, Sister',
        'Grandparents: Grandfather, Grandmother',
        'Others: Uncle, Aunt, Cousin'
      ]
    },
    exercises: [
      {
        id: 'e-l6-1',
        type: 'mcq',
        question: 'My mother\'s brother is my:',
        options: ['Uncle', 'Aunt', 'Cousin', 'Father'],
        correctAnswer: 'Uncle'
      }
    ]
  },
  { 
    id: 'l7', 
    title: 'Possessive Adjectives (My, Your)', 
    level: 'A1', 
    duration: 7, 
    category: 'grammar', 
    difficulty: 2, 
    xp: 80, 
    completed: false, 
    unlocked: false,
    content: {
      text: 'Los adjetivos posesivos indican a quién pertenece algo. Siempre van acompañados de un sustantivo.',
      keyPoints: [
        'I -> My (Mi)',
        'You -> Your (Tu)',
        'He -> His (Su - de él)',
        'She -> Her (Su - de ella)',
        'It -> Its (Su - de algo)',
        'We -> Our (Nuestro)',
        'They -> Their (Su - de ellos)'
      ]
    },
    exercises: [
      {
        id: 'e-l7-1',
        type: 'mcq',
        question: 'Complete: "She is my sister. ____ name is Maria."',
        options: ['His', 'Her', 'Our', 'My'],
        correctAnswer: 'Her'
      }
    ]
  },
  { 
    id: 'l8', 
    title: 'Can/Can\'t for Abilities', 
    level: 'A1', 
    duration: 8, 
    category: 'grammar', 
    difficulty: 3, 
    xp: 100, 
    completed: false, 
    unlocked: false,
    content: {
      text: 'Usamos "can" para hablar de habilidades (lo que sabemos hacer) y "can\'t" para lo que no sabemos hacer.',
      keyPoints: [
        'Affirmative: I can swim',
        'Negative: I can\'t (cannot) fly',
        'Question: Can you speak English?',
        'No cambia con he/she/it (She can cook, NOT She cans cook)'
      ]
    },
    exercises: [
      {
        id: 'e-l8-1',
        type: 'mcq',
        question: 'Complete: "Fish ____ swim, but they ____ walk."',
        options: ['can / can\'t', 'can\'t / can', 'can / can', 'can\'t / can\'t'],
        correctAnswer: 'can / can\'t'
      }
    ]
  },
  { 
    id: 'l9', 
    title: 'Action Verbs', 
    level: 'A1', 
    duration: 6, 
    category: 'vocabulary', 
    difficulty: 3, 
    xp: 90, 
    completed: false, 
    unlocked: false,
    content: {
      text: 'Los verbos de acción describen cosas que hacemos físicamente. Son la base de las oraciones dinámicas.',
      keyPoints: [
        'Run (Correr)',
        'Eat (Comer)',
        'Sleep (Dormir)',
        'Read (Leer)',
        'Write (Escribir)',
        'Listen (Escuchar)'
      ]
    },
    exercises: [
      {
        id: 'e-l9-1',
        type: 'mcq',
        question: 'You use your eyes to:',
        options: ['Read', 'Listen', 'Eat', 'Run'],
        correctAnswer: 'Read'
      }
    ]
  },
  { 
    id: 'l10', 
    title: 'Daily Routine Challenge', 
    level: 'A1', 
    duration: 10, 
    category: 'speaking', 
    difficulty: 3, 
    xp: 150, 
    completed: false, 
    unlocked: false,
    content: {
      text: 'El desafío final del nivel A1 consiste en combinar todo lo aprendido para describir un día típico en tu vida.',
      keyPoints: [
        'Morning: I wake up at 7:00, I have breakfast',
        'Afternoon: I go to work/school, I have lunch',
        'Evening: I watch TV, I go to bed',
        'Use connectives: First, then, after that, finally'
      ]
    },
    exercises: [
      {
        id: 'e-l10-1',
        type: 'mcq',
        question: 'What is the correct order of a routine?',
        options: [
          'First breakfast, then wake up',
          'First wake up, then breakfast',
          'First sleep, then have lunch',
          'First go to work, then wake up'
        ],
        correctAnswer: 'First wake up, then breakfast'
      }
    ]
  },

  // Nivel A2 - Bloque 1: Experiencias
  { 
    id: 'l11', 
    title: 'Past Simple: Regular Verbs', 
    level: 'A2', 
    duration: 6, 
    category: 'grammar', 
    difficulty: 2, 
    xp: 70, 
    completed: false, 
    unlocked: true,
    content: {
      text: 'El pasado simple se usa para acciones terminadas en el pasado. Los verbos regulares siempre terminan en "-ed".',
      keyPoints: [
        'Regla general: Añadir "-ed" (Walk -> Walked)',
        'Terminados en "e": Añadir "-d" (Like -> Liked)',
        'Negativo: Use "did not" + verb base (I didn\'t walk)',
        'Pregunta: Did + subject + verb base? (Did you walk?)'
      ]
    }
  },
  { 
    id: 'l12', 
    title: 'Travel & Transport', 
    level: 'A2', 
    duration: 5, 
    category: 'vocabulary', 
    difficulty: 2, 
    xp: 60, 
    completed: false, 
    unlocked: true,
    content: {
      text: 'Aprende los medios de transporte y frases útiles para moverte por una ciudad o viajar al extranjero.',
      keyPoints: [
        'By bus, By train, By plane, By car',
        'On foot (Caminando - ¡Excepción!)',
        'Ticket office, Platform, Departure, Arrival',
        'I would like a round-trip ticket to...'
      ]
    }
  },
  { id: 'l13', title: 'The Irregular Verbs List', level: 'A2', duration: 8, category: 'grammar', difficulty: 3, xp: 90, completed: false, unlocked: false },

  // Nivel A2 - Bloque 2: Comparaciones
  { id: 'l14', title: 'Comparatives: Better & Faster', level: 'A2', duration: 7, category: 'grammar', difficulty: 2, xp: 80, completed: false, unlocked: false },
  { id: 'l15', title: 'Shopping & Clothes', level: 'A2', duration: 6, category: 'vocabulary', difficulty: 2, xp: 70, completed: false, unlocked: false },

  // Nivel A2 - Bloque 3: Salud y Cuerpo
  { id: 'l16', title: 'Health & Illnesses', level: 'A2', duration: 6, category: 'vocabulary', difficulty: 3, xp: 80, completed: false, unlocked: false },
  { id: 'l17', title: 'Modal Verbs: Should & Must', level: 'A2', duration: 8, category: 'grammar', difficulty: 3, xp: 100, completed: false, unlocked: false },

  // Nivel A2 - Bloque 4: Futuro
  { id: 'l18', title: 'Future with "Going to"', level: 'A2', duration: 7, category: 'grammar', difficulty: 3, xp: 90, completed: false, unlocked: false },
  { id: 'l19', title: 'Plans & Intentions', level: 'A2', duration: 6, category: 'speaking', difficulty: 3, xp: 100, completed: false, unlocked: false },

  // Nivel A2 - Bloque 5: Consolidación
  { id: 'l20', title: 'Elementary Storyteller', level: 'A2', duration: 12, category: 'speaking', difficulty: 4, xp: 200, completed: false, unlocked: false },

  // Metodologías Innovadoras (Aprende a Aprender)
  { 
    id: 'm1', 
    title: '¿Qué es el Microlearning?', 
    level: 'A1', 
    duration: 3, 
    category: 'methodology', 
    difficulty: 1, 
    xp: 40, 
    completed: false, 
    unlocked: true,
    content: {
      text: 'El Microlearning es una estrategia de aprendizaje que fragmenta el contenido en pequeñas unidades de información llamadas "píldoras de aprendizaje". En Linguafly, cada lección está diseñada para durar entre 5 y 10 minutos.',
      keyPoints: [
        'Unidades pequeñas y enfocadas',
        'Fácil de integrar en el día a día',
        'Mejora la retención de información',
        'Evita la sobrecarga cognitiva'
      ]
    },
    exercises: [
      {
        id: 'e-m1-1',
        type: 'mcq',
        question: '¿Cuál es la duración recomendada de una lección de Microlearning en Linguafly?',
        options: ['30-45 minutos', '5-10 minutos', '1 hora', 'Todo el día'],
        correctAnswer: '5-10 minutos'
      }
    ]
  },
  { 
    id: 'm2', 
    title: 'Beneficios de Lecciones Cortas', 
    level: 'A1', 
    duration: 4, 
    category: 'methodology', 
    difficulty: 1, 
    xp: 40, 
    completed: false, 
    unlocked: true,
    content: {
      text: '¿Por qué 5-10 minutos? La ciencia demuestra que nuestra atención plena es limitada. Las lecciones cortas permiten que el cerebro procese y almacene la información de manera más eficiente antes de pasar a otra tarea.',
      keyPoints: [
        'Mayor frecuencia de estudio',
        'Menor resistencia mental para empezar',
        'Resultados visibles en poco tiempo',
        'Flexibilidad total: estudia en el bus o café'
      ]
    },
    exercises: [
      {
        id: 'e-m2-1',
        type: 'true_false',
        question: 'Las lecciones cortas ayudan al cerebro a procesar la información más eficientemente.',
        correctAnswer: true
      }
    ]
  },
  { 
    id: 'm3', 
    title: 'Gamificación: Aprender Jugando', 
    level: 'A1', 
    duration: 5, 
    category: 'methodology', 
    difficulty: 1, 
    xp: 50, 
    completed: false, 
    unlocked: true,
    content: {
      text: 'La gamificación utiliza elementos de los juegos en contextos educativos. Al ganar puntos, subir de nivel y desbloquear medallas, tu cerebro libera dopamina, lo que te mantiene motivado y comprometido con tu aprendizaje.',
      keyPoints: [
        'Mecánicas de juego (puntos, niveles)',
        'Feedback instantáneo',
        'Sentido de progresión clara',
        'Competición sana y desafíos'
      ]
    },
    exercises: [
      {
        id: 'e-m3-1',
        type: 'mcq',
        question: '¿Qué neurotransmisor se libera al ganar puntos y medallas?',
        options: ['Melatonina', 'Dopamina', 'Cortisol', 'Adrenalina'],
        correctAnswer: 'Dopamina'
      }
    ]
  },
  { 
    id: 'm4', 
    title: 'Sistema de Puntos y XP', 
    level: 'A1', 
    duration: 3, 
    category: 'methodology', 
    difficulty: 1, 
    xp: 40, 
    completed: false, 
    unlocked: true,
    content: {
      text: 'Los XP (Experience Points) miden tu esfuerzo. Cada actividad, escucha o ejercicio te otorga XP. Al acumular suficientes XP, subirás de nivel, demostrando tu dominio creciente del idioma.',
      keyPoints: [
        'Gana XP por cada acierto',
        'Desbloquea nuevos niveles de contenido',
        'Visualiza tu progreso acumulado',
        'Muestra tu nivel a la comunidad'
      ]
    },
    exercises: [
      {
        id: 'e-m4-1',
        type: 'true_false',
        question: 'Los XP sirven para medir el esfuerzo y subir de nivel.',
        correctAnswer: true
      }
    ]
  },
  { 
    id: 'm5', 
    title: 'Manteniendo tu Racha', 
    level: 'A1', 
    duration: 4, 
    category: 'methodology', 
    difficulty: 1, 
    xp: 50, 
    completed: false, 
    unlocked: true,
    content: {
      text: 'La racha (streak) es el número de días consecutivos que has estudiado. Es la herramienta más potente para crear el hábito de aprender inglés. ¡No dejes que el fuego se apague!',
      keyPoints: [
        'Construcción de hábitos sólidos',
        'Recordatorios diarios para estudiar',
        'Medallas especiales por rachas largas',
        'El secreto de la fluidez es la constancia'
      ]
    },
    exercises: [
      {
        id: 'e-m5-1',
        type: 'mcq',
        question: '¿Qué mide la racha (streak)?',
        options: ['La velocidad de lectura', 'Días consecutivos de estudio', 'Número de palabras aprendidas', 'Puntos totales'],
        correctAnswer: 'Días consecutivos de estudio'
      }
    ]
  },
]

const badges: Badge[] = [
  { id: 'b1', name: 'A1 Starter', level: 'A1', description: 'Completa tu primera lección de nivel A1', icon: '🌱', unlocked: false },
  { id: 'b2', name: 'Políglota Novel', level: 'A1', description: 'Aprende 5 países y nacionalidades', icon: '🌍', unlocked: false },
  { id: 'b3', name: 'Comunicador', level: 'A1', description: 'Realiza tu primera presentación personal', icon: '👋', unlocked: false },
  { id: 'b4', name: 'Gramático A1', level: 'A1', description: 'Domina el verbo To Be y los Posesivos', icon: '📖', unlocked: false },
  { id: 'b5', name: 'Superviviente', description: 'Alcanza el nivel 5 de experiencia', icon: '🛡️', unlocked: false },
  { id: 'b6', name: 'Racha Imparable', description: 'Completa lecciones durante 7 días seguidos', icon: '⚡', unlocked: false },
  
  // Medallas A2
  { id: 'b7', name: 'Viajero A2', level: 'A2', description: 'Domina el vocabulario de viajes y transporte', icon: '✈️', unlocked: false },
  { id: 'b8', name: 'Historiador', level: 'A2', description: 'Usa correctamente el pasado simple', icon: '📜', unlocked: false },
  { id: 'b9', name: 'Consejero', level: 'A2', description: 'Da consejos usando modal verbs', icon: '🤝', unlocked: false },
  { id: 'b10', name: 'Futurista', level: 'A2', description: 'Expresa planes futuros con claridad', icon: '🚀', unlocked: false },
  { id: 'b11', name: 'Experto en Metodología', description: 'Completaste todas las lecciones sobre Microlearning y Gamificación', icon: '🎓', unlocked: false },
]

export default function MicrolearningGamification() {
  const router = useRouter()
  const { 
    fetchAllProgress, 
    saveLessonProgress, 
    updateXP, 
    saveBadgeProgress, 
    updateStreak 
  } = useMethodologyProgress()
  const [lessons, setLessons] = useState<MicroLesson[]>(microLessons)
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    cefrLevel: 'A1',
    currentXP: 0,
    nextLevelXP: 500,
    streak: 3,
    totalPoints: 0,
    badges: badges
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProgress() {
      const dbData = await fetchAllProgress()
      if (dbData) {
        if (dbData.lessons) {
          setLessons(prev => {
            // Primero aplicamos el estado de completado desde la DB
            const withCompletion = prev.map(lesson => {
              const saved = dbData.lessons?.find(l => l.lesson_id === lesson.id)
              return saved ? { ...lesson, completed: saved.completed } : lesson
            })
            
            // Luego calculamos el estado de desbloqueo en cadena
            return withCompletion.map((lesson, index) => {
              if (index === 0) return { ...lesson, unlocked: true }
              const previousLesson = withCompletion[index - 1]
              // Una lección está desbloqueada si la anterior está completada 
              // O si ya estaba desbloqueada por defecto (como las de introducción)
              return { 
                ...lesson, 
                unlocked: previousLesson.completed || lesson.unlocked 
              }
            })
          })
        }
        
        // Sincronizar XP, Nivel y Medallas
        const totalXP = dbData.xp?.total_xp || 0
        const currentLevel = dbData.xp?.level || 1
        const nextLevelXP = dbData.xp?.xp_to_next_level ? (totalXP + dbData.xp.xp_to_next_level) : 500
        const currentStreak = dbData.streaks?.current_streak || 0
        
        // Sincronizar medallas locales con las de la DB
        const unlockedBadgeIds = new Set(dbData.badges?.map(b => b.badge_id) || [])
        
        setProgress(prev => ({
          ...prev,
          level: currentLevel,
          currentXP: totalXP % 500, // Ajustar según lógica de niveles
          totalPoints: totalXP,
          nextLevelXP: 500, // O usar el de la DB si es dinámico
          streak: currentStreak,
          badges: prev.badges.map(badge => ({
            ...badge,
            unlocked: unlockedBadgeIds.has(badge.id)
          }))
        }))
      }
      setIsLoading(false)
    }
    loadProgress()
  }, [fetchAllProgress])


  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('A1')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showBadgeModal, setShowBadgeModal] = useState(false)
  const [newBadge, setNewBadge] = useState<Badge | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<MicroLesson | null>(null)
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState<string | boolean | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [viewMode, setViewMode] = useState<'theory' | 'exercise'>('theory')

  const handleLessonAction = (lesson: MicroLesson) => {
    if (!lesson.unlocked) return

    if (lesson.content) {
      setSelectedLesson(lesson)
      setShowLessonModal(true)
      setViewMode('theory')
      setCurrentExerciseIndex(0)
      setUserAnswer(null)
      setShowResult(false)
    } else if (!lesson.completed) {
      completeLesson(lesson.id)
    }
  }

  const handleEvaluateAnswer = () => {
    if (selectedLesson && selectedLesson.exercises) {
      const currentExercise = selectedLesson.exercises[currentExerciseIndex]
      const correct = userAnswer === currentExercise.correctAnswer
      setIsCorrect(correct)
      setShowResult(true)
    }
  }

  const handleNextAction = () => {
    if (selectedLesson && selectedLesson.exercises) {
      if (currentExerciseIndex < selectedLesson.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1)
        setUserAnswer(null)
        setShowResult(false)
      } else {
        if (!selectedLesson.completed) {
          completeLesson(selectedLesson.id)
        }
        setShowLessonModal(false)
      }
    }
  }

  const completeLesson = async (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId)
    if (!lesson || lesson.completed) return

    // 1. Persistir en DB
    await saveLessonProgress(lesson.id, true, lesson.xp)
    await updateXP(lesson.xp, 'lesson', lesson.id)
    await updateStreak()

    // 2. Actualizar estado local de lecciones
    const currentIndex = lessons.findIndex(item => item.id === lessonId)
    const updatedLessons = lessons.map((l, index) => {
      if (l.id === lessonId && !l.completed) {
        return { ...l, completed: true }
      }
      if (index === currentIndex + 1) {
        return { ...l, unlocked: true }
      }
      return l
    })
    setLessons(updatedLessons)

    // 3. Actualizar progreso y medallas
    const newXP = progress.totalPoints + lesson.xp
    const newLevel = Math.floor(newXP / progress.nextLevelXP) + 1
    
    setProgress(prev => ({
      ...prev,
      currentXP: newXP % prev.nextLevelXP,
      level: newLevel,
      totalPoints: newXP
    }))

    // 4. Verificar medallas
    const completedLessonsCount = updatedLessons.filter(item => item.completed).length
    
    if (completedLessonsCount === 1) {
      const starterBadgeId = selectedLevel === 'A1' ? 'b1' : 'b7'
      await unlockBadge(starterBadgeId)
    }
    
    if (completedLessonsCount === 5 && selectedLevel === 'A2') {
      await unlockBadge('b8')
    }

    const completedMethodologyCount = updatedLessons.filter(item => item.category === 'methodology' && item.completed).length
    const totalMethodologyCount = updatedLessons.filter(item => item.category === 'methodology').length
    if (completedMethodologyCount === totalMethodologyCount && totalMethodologyCount > 0) {
      await unlockBadge('b11')
    }
  }

  const unlockBadge = async (badgeId: string) => {
    const badge = progress.badges.find(b => b.id === badgeId)
    if (badge && !badge.unlocked) {
      // Persistir medalla en DB
      await saveBadgeProgress(badgeId, 100)
      
      setNewBadge(badge)
      setShowBadgeModal(true)
      setProgress(prev => ({
        ...prev,
        badges: prev.badges.map(b =>
          b.id === badgeId ? { ...b, unlocked: true, date: new Date().toLocaleDateString() } : b
        )
      }))
    }
  }

  const filteredLessons = lessons.filter(l => {
    const levelMatch = l.level === selectedLevel
    const categoryMatch = selectedCategory === 'all' || l.category === selectedCategory
    return levelMatch && categoryMatch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'grammar': return '📖'
      case 'vocabulary': return '💬'
      case 'pronunciation': return '🗣️'
      case 'listening': return '👂'
      case 'speaking': return '🎤'
      case 'methodology': return '🧠'
      default: return '📚'
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-500'
    if (difficulty <= 3) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const progressPercentage = (progress.currentXP / progress.nextLevelXP) * 100

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button 
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Volver a Metodologías
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
          Microlearning & Gamificación
        </h1>
        <p className="text-gray-600 text-lg">
          Lecciones de 5-10 minutos con sistema de puntos, niveles y recompensas
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Level */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-8 h-8" />
            <span className="text-3xl font-bold">Nivel {progress.level}</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>XP</span>
              <span>{progress.currentXP}/{progress.nextLevelXP}</span>
            </div>
            <div className="w-full h-2 bg-purple-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-8 h-8" />
            <span className="text-3xl font-bold">{progress.streak}</span>
          </div>
          <p className="text-sm opacity-90">Días de racha</p>
          <p className="text-xs mt-1 opacity-75">¡Sigue así!</p>
        </div>

        {/* Total Points */}
        <div className="bg-gradient-to-br from-yellow-400 to-orange-400 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8" />
            <span className="text-3xl font-bold">{progress.totalPoints}</span>
          </div>
          <p className="text-sm opacity-90">Puntos totales</p>
        </div>

        {/* Badges */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8" />
            <span className="text-3xl font-bold">
              {progress.badges.filter(b => b.unlocked).length}/{progress.badges.length}
            </span>
          </div>
          <p className="text-sm opacity-90">Medallas desbloqueadas</p>
        </div>
      </div>

      {/* Level & Category Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* CEFR Level Selector */}
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Nivel MCER:</p>
            <div className="flex gap-2">
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level as any)}
                  className={`w-12 h-12 rounded-xl font-black transition-all ${
                    selectedLevel === level
                      ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg scale-110'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-200" />

          {/* Category Filter */}
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Categoría:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['all', 'grammar', 'vocabulary', 'pronunciation', 'listening', 'speaking', 'methodology'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-gray-800 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? '🎯 Todas' : cat === 'methodology' ? '🧠 Metodología' : `${getCategoryIcon(cat)} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredLessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`relative p-6 rounded-xl border-2 transition-all ${
              lesson.completed
                ? 'bg-green-50 border-green-300'
                : lesson.unlocked
                ? 'bg-white border-gray-200 hover:border-orange-400 hover:shadow-lg cursor-pointer'
                : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
            }`}
            onClick={() => handleLessonAction(lesson)}
          >
            {/* Lesson Number */}
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              {index + 1}
            </div>

            {/* Completed Badge */}
            {lesson.completed && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            )}

            {/* Category Icon */}
            <div className="text-4xl mb-3">{getCategoryIcon(lesson.category)}</div>

            {/* Title */}
            <h3 className={`font-bold text-lg mb-2 ${lesson.completed ? 'text-green-700' : 'text-gray-900'}`}>
              {lesson.title}
            </h3>

            {/* Info */}
            <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-yellow-600">+{lesson.xp} XP</span>
              </div>
            </div>

            {/* Difficulty */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i < lesson.difficulty ? getDifficultyColor(lesson.difficulty) : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Action Button */}
            <button
              className={`w-full py-2 rounded-lg font-bold text-sm transition-all ${
                lesson.completed
                  ? 'bg-green-100 text-green-700'
                  : lesson.unlocked
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {lesson.completed ? '✓ Completada' : lesson.unlocked ? (lesson.content ? 'Ver Lección' : '¡Empezar ahora!') : '🔒 Bloqueada'}
            </button>
          </div>
        ))}
      </div>

      {/* Lesson Content Modal */}
      {showLessonModal && selectedLesson && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-8 text-white relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                    {viewMode === 'theory' ? <Brain className="w-8 h-8" /> : <Target className="w-8 h-8" />}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedLesson.title}</h2>
                    <p className="opacity-90">{viewMode === 'theory' ? 'Teoría' : 'Práctica'} • {selectedLesson.duration} min</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLessonModal(false)}
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all"
                >
                  <ArrowLeft className="w-6 h-6 rotate-90" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex gap-2 mt-6">
                <div className={`h-1.5 flex-1 rounded-full transition-all ${viewMode === 'theory' ? 'bg-white' : 'bg-white/40'}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-all ${viewMode === 'exercise' ? 'bg-white' : 'bg-white/40'}`} />
              </div>
            </div>
            
            <div className="p-8">
              {viewMode === 'theory' ? (
                <>
                  <div className="prose prose-orange max-w-none mb-8">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {selectedLesson.content?.text}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {selectedLesson.content?.keyPoints.map((point, i) => (
                      <div key={i} className="flex items-center gap-3 bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="text-sm font-medium text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (selectedLesson.exercises && selectedLesson.exercises.length > 0) {
                        setViewMode('exercise')
                      } else {
                        if (!selectedLesson.completed) completeLesson(selectedLesson.id)
                        setShowLessonModal(false)
                      }
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    {selectedLesson.exercises && selectedLesson.exercises.length > 0 ? 'Continuar al Ejercicio' : 'Entendido, ¡ganar XP!'}
                  </button>
                </>
              ) : (
                <div className="animate-in slide-in-from-right duration-300">
                  {selectedLesson.exercises && (
                    <>
                      <div className="mb-8">
                        <span className="text-sm font-bold text-orange-500 uppercase tracking-wider">Ejercicio {currentExerciseIndex + 1} de {selectedLesson.exercises.length}</span>
                        <h3 className="text-2xl font-bold text-gray-900 mt-2">
                          {selectedLesson.exercises[currentExerciseIndex].question}
                        </h3>
                      </div>

                      <div className="space-y-3 mb-8">
                        {selectedLesson.exercises[currentExerciseIndex].type === 'mcq' ? (
                          selectedLesson.exercises[currentExerciseIndex].options?.map((option, i) => (
                            <button
                              key={i}
                              onClick={() => !showResult && setUserAnswer(option)}
                              className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 ${
                                userAnswer === option
                                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                                  : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                              } ${showResult && option === selectedLesson.exercises![currentExerciseIndex].correctAnswer ? 'border-green-500 bg-green-50 text-green-700' : ''}
                                ${showResult && userAnswer === option && option !== selectedLesson.exercises![currentExerciseIndex].correctAnswer ? 'border-red-500 bg-red-50 text-red-700' : ''}
                              `}
                              disabled={showResult}
                            >
                              {option}
                            </button>
                          ))
                        ) : (
                          <div className="flex gap-4">
                            {[true, false].map((val) => (
                              <button
                                key={val.toString()}
                                onClick={() => !showResult && setUserAnswer(val)}
                                className={`flex-1 p-6 rounded-xl font-bold text-lg transition-all border-2 ${
                                  userAnswer === val
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                                } ${showResult && val === selectedLesson.exercises![currentExerciseIndex].correctAnswer ? 'border-green-500 bg-green-50 text-green-700' : ''}
                                  ${showResult && userAnswer === val && val !== selectedLesson.exercises![currentExerciseIndex].correctAnswer ? 'border-red-500 bg-red-50 text-red-700' : ''}
                                `}
                                disabled={showResult}
                              >
                                {val ? 'Verdadero' : 'Falso'}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {showResult ? (
                        <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {isCorrect ? <Trophy className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                          <span className="font-bold">{isCorrect ? '¡Excelente! Respuesta correcta.' : 'Casi... intenta fijarte mejor la próxima vez.'}</span>
                        </div>
                      ) : null}

                      {!showResult ? (
                        <button
                          onClick={handleEvaluateAnswer}
                          disabled={userAnswer === null}
                          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                            userAnswer !== null
                              ? 'bg-gray-900 text-white shadow-lg hover:bg-gray-800'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Comprobar
                        </button>
                      ) : (
                        <button
                          onClick={handleNextAction}
                          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                          {currentExerciseIndex < selectedLesson.exercises.length - 1 ? 'Siguiente Ejercicio' : 'Finalizar Lección'}
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Badges Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Award className="w-7 h-7 text-purple-600" />
          Colección de Medallas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {progress.badges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl text-center transition-all ${
                badge.unlocked
                  ? 'bg-white border-2 border-purple-300 shadow-lg'
                  : 'bg-gray-100 border-2 border-gray-200 opacity-40'
              }`}
            >
              <div className="text-5xl mb-2">{badge.icon}</div>
              <h4 className="font-bold text-sm text-gray-900 mb-1">{badge.name}</h4>
              <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
              {badge.unlocked && badge.date && (
                <p className="text-xs text-purple-600 font-semibold">{badge.date}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Badge Unlock Modal */}
      {showBadgeModal && newBadge && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center animate-scaleIn">
            <div className="text-8xl mb-4">{newBadge.icon}</div>
            <h3 className="text-3xl font-bold text-purple-600 mb-2">¡Medalla Desbloqueada!</h3>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">{newBadge.name}</h4>
            <p className="text-gray-600 mb-6">{newBadge.description}</p>
            <button
              onClick={() => setShowBadgeModal(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              ¡Genial!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
