import { PremiumInteraction, PremiumOption, PremiumPair, PremiumCategory } from "@/types/premium-course";

export function isLikelyEnglish(text: string): boolean {
  if (!text) return false;
  // Simple heuristic: check for Spanish-specific characters
  const spanishChars = /[áéíóúüñ¿¡]/i;
  return !spanishChars.test(text);
}

/** Texto para TTS o heurísticas: `[[en|es]]` → en; `[[word]]` → word. */
export function stripBilingualMarkup(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\[\[([^\]|]+)\|([^\]]*)\]\]/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .trim();
}

/** Extrae el texto en español: `[[en|es]]` → es; `[[word]]` → word. */
export function stripBilingualMarkupEs(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\[\[([^\]|]+)\|([^\]]*)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .trim();
}

export function getSolutionText(interaction: PremiumInteraction): string {
  if (!interaction) return "";

  const prefix = "";

  switch (interaction.type) {
    case 'true_false':
      if (interaction.correct_sentence_en) {
        return `${prefix}${interaction.correct_sentence_en}`;
      }
      if (interaction.options && interaction.correct_answer) {
        const correctOption = interaction.options.find(opt => opt.id === interaction.correct_answer);
        return correctOption ? `${prefix}${correctOption.text}` : "";
      }
      break;

    case 'multiple_choice':
    case 'odd_one_out':
    case 'role_play':
    case 'reading-comprehension':
    case 'writing-analysis':
    case 'listening_image_mc':
    case 'fill-blanks-mc':
    case 'multiple-choice':
    case 'speaking-analysis':
      const q = (interaction.type === 'reading-comprehension' || interaction.type === 'writing-analysis')
        ? ((interaction.options && interaction.options.length > 0) ? interaction : (interaction.content?.questions?.[0] || interaction.content || interaction))
        : interaction;
      
      const options = q.options || interaction.options;
      const correctAnswer = q.correct_answer || q.correctAnswer || interaction.correct_answer || interaction.answer;

      if (options && (correctAnswer !== undefined && correctAnswer !== null)) {
        const correctOption = options.find((opt: any) => 
          (opt.id && String(opt.id) === String(correctAnswer)) || 
          (opt.text && String(opt.text) === String(correctAnswer)) ||
          (String(opt) === String(correctAnswer))
        );
        const rawText = correctOption ? (typeof correctOption === 'string' ? correctOption : correctOption.text) : String(correctAnswer);
        return `${prefix}${stripBilingualMarkup(rawText)}`;
      }
      return stripBilingualMarkup(String(correctAnswer || ""));

    case 'reorder_words':
      if (Array.isArray(interaction.correct_answer) && interaction.options) {
        const solution = interaction.correct_answer
          .map(id => stripBilingualMarkup(interaction.options?.find(opt => opt.id === id)?.text || ''))
          .filter(Boolean)
          .join(" ");
        return `${prefix}${solution}`;
      }
      // Fallback for string correct_answer in reorder_words
      if (typeof interaction.correct_answer === 'string') {
        return `${prefix}${interaction.correct_answer}`;
      }
      break;

    case 'matching':
    case 'vocabulary-match':
    case 'multiple_matching':
      if (interaction.pairs) {
        const solution = interaction.pairs
          .map(pair => `${pair.left} → ${pair.right}`)
          .join(", ");
        return `${prefix}${solution}`;
      }
      if (interaction.correct_answer && typeof interaction.correct_answer === 'object') {
        const solution = Object.entries(interaction.correct_answer)
          .map(([k, v]) => `${k} → ${v}`)
          .join(", ");
        return `${prefix}${solution}`;
      }
      break;

    case 'transformation':
    case 'fill_blanks':
    case 'fill_blank':
    case 'fill-blank':
    case 'fill-blanks':
      const solutionText = interaction.correct_answer || interaction.correctAnswer || interaction.answer || interaction.gap || (Array.isArray(interaction.acceptableAnswers) ? interaction.acceptableAnswers.join(' / ') : interaction.acceptableAnswers);
      if (solutionText) {
        return `${prefix}${Array.isArray(solutionText) ? solutionText.join(' / ') : solutionText}`;
      }
      break;

    case 'categorization':
      if (interaction.categories) {
        const solution = interaction.categories
          .map(cat => `${cat.title || cat.name || 'Categoría'}: ${cat.items.join(", ")}`)
          .join(" | ");
        return `${prefix}${solution}`;
      }
      break;

    case 'short_writing':
    case 'dictation_guided':
      const shortAns = interaction.correct_answer || interaction.correctAnswer || interaction.answer || interaction.correct_answer_es;
      if (shortAns) {
        return `${prefix}${shortAns}`;
      }
      break;

    default:
      const fallbackAns = interaction.correct_answer || interaction.correctAnswer || interaction.answer;
      if (fallbackAns) {
        return `${prefix}${fallbackAns}`;
      }
  }

  return "";
}

/** Evita prefetch TTS de placeholders del banco de reserva (p. ej. option_b, option_c). */
export function shouldSkipTtsPrefetch(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (!t) return true;
  if (/^option_[a-z0-9_]+$/.test(t)) return true;
  return false;
}

export function getEncouragingMessage(isCorrect: boolean, failCount: number): string {
  if (isCorrect) {
    return "¡Excelente!";
  } else {
    if (failCount === 1) {
      return "¡Casi! Inténtalo una vez más.";
    } else if (failCount === 2) {
      return "¡No te rindas! Fíjate bien en los detalles.";
    } else {
      return "No pasa nada, aquí tienes la solución para aprender:";
    }
  }
}
