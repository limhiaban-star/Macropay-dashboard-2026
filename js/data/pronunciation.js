/**
 * Pronunciation Lab & Connected Speech Rules
 */

export const pronunciationRules = [
  {
    id: "pr1",
    title: "Connected Speech: Reducción de 'Going to' -> 'Gonna'",
    description: "En el inglés hablado rápido, 'going to' antes de un verbo casi siempre suena como 'gonna'.",
    written: "I am going to call you later.",
    spoken: "I'm gonna call ya later.",
    audioText: "I'm gonna call you later.",
    tips: "Escucha cómo la 't' desaparece y 'you' se reduce suavemente a 'ya'."
  },
  {
    id: "pr2",
    title: "Connected Speech: 'Want to' -> 'Wanna'",
    description: "'Want to' se une para sonar como 'wanna'. Nota: Solo ocurre cuando 'to' es un infinitivo (e.g. want to eat), no antes de sustantivos (e.g. I want coffee).",
    written: "Do you want to grab a coffee?",
    spoken: "D'ya wanna grab a coffee?",
    audioText: "Do you wanna grab a coffee?",
    tips: "'Do you' a menudo se contrae a 'D'ya'."
  },
  {
    id: "pr3",
    title: "La 'T' Intervocálica (Flap T en Inglés Americano)",
    description: "Cuando la letra 'T' queda entre dos sonidos vocálicos, en inglés americano suena como una 'R' suave en español (como en 'caro').",
    written: "Water, Butter, Better, City",
    spoken: "Wah-rer, Buh-rer, Beh-rer, See-ree",
    audioText: "Water, butter, better, city.",
    tips: "Toca ligeramente el paladar con la punta de la lengua para lograr el sonido 'Flap T'."
  },
  {
    id: "pr4",
    title: "Vowel Linking (Unión de Vocales entre palabras)",
    description: "Cuando una palabra termina en sonido vocal (ej. 'go') y la siguiente empieza en vocal (ej. 'out'), se inserta un sonido suave de 'w' o 'y'.",
    written: "Go out / See it",
    spoken: "Go-(w)-out / See-(y)-it",
    audioText: "Go out and see it.",
    tips: "Evita cortar la voz entre palabras. Fluye directamente."
  }
];
