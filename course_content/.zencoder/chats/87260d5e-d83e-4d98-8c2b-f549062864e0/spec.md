# Technical Specification - Simplify Unit 30 Sentence Building Exercises

## Technical Context
- **Language**: TypeScript
- **File**: `src/lib/course/b1/unit-30.ts`
- **Goal**: Ensure exercises `b1-u30-e26` to `b1-u30-e30` have 8-10 words.

## Implementation Approach
I will modify the existing `sentence-building` exercises at the end of the `UNIT_30_EXERCISES` array.

### Proposed Simplifications

#### 1. Exercise `b1-u30-e26`
- **Current**: "Ancient civilizations developed unique writing systems to record their laws and religious beliefs for future generations." (16 words)
- **New**: "[[Ancient|Las antiguas]] [[civilizations|civilizaciones]] [[developed|desarrollaron]] [[unique|sistemas]] [[writing|de escritura]] [[systems|únicos]] [[to|para]] [[record|registrar]] [[laws|leyes]]." (9 words)
- **Transcript**: "Ancient civilizations developed unique writing systems to record laws."

#### 2. Exercise `b1-u30-e27`
- **Current**: "The construction of the great pyramids required a massive workforce and advanced engineering skills from that time." (17 words)
- **New**: "[[Building|Construir]] [[the|las]] [[great|grandes]] [[pyramids|pirámides]] [[required|requirió]] [[advanced|habilidades de]] [[engineering|ingeniería]] [[skills|avanzadas]] [[today|hoy]]." (9 words) -> *Wait, "today" is weak.*
- **Alternative**: "[[The|La]] [[construction|construcción]] [[of|de]] [[pyramids|pirámides]] [[required|requirió]] [[massive|una masiva]] [[workforce|fuerza laboral]] [[and|y]] [[skills|habilidades]]." (8 words)
- **Transcript**: "The construction of pyramids required massive workforce and skills."

#### 3. Exercise `b1-u30-e28`
- **Current**: "Historians use primary sources such as letters and diaries to gain a better understanding of historical events." (17 words)
- **New**: "[[Historians|Los historiadores]] [[use|usan]] [[primary|fuentes]] [[sources|primarias]] [[to|para]] [[understand|entender]] [[important|eventos]] [[historical|históricos]] [[events|importantes]]." (9 words)
- **Transcript**: "Historians use primary sources to understand important historical events."

#### 4. Exercise `b1-u30-e29`
- **New**: "[[Roman|Los ingenieros]] [[engineers|romanos]] [[built|construyeron]] [[long|largos]] [[aqueducts|acueductos]] [[to|para]] [[transport|transportar]] [[fresh|agua]] [[water|fresca]]." (9 words)
- **Transcript**: "Roman engineers built long aqueducts to transport fresh water."

#### 5. Exercise `b1-u30-e30`
- **New**: "[[The|La]] [[Silk|Ruta]] [[Road|de la Seda]] [[connected|conectó]] [[different|diferentes]] [[cultures|culturas]] [[through|a través del]] [[trade|comercio]] [[and|y]] [[travel|viajes]]." (9 words)
- **Transcript**: "The Silk Road connected different cultures through trade and travel."

## Verification Plan
1. **Word Count Check**: Confirm each modified exercise has 8-10 words.
2. **App Verification**: Check `/debug/b1-preview/unit-30` to ensure exercises load and work.
