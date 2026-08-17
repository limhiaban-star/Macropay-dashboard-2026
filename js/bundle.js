/**
 * Standalone Bundle for FluentIn6
 * Works 100% seamlessly on local file:// protocol and web servers without CORS restrictions.
 */

(function() {
  'use strict';

  // 1. DATA: monthsData
  const monthsData = [
    {
      id: 1,
      level: "Nivel A1.1",
      badge: "Mes 1",
      title: "Supervivencia e Identidad",
      subtitle: "Rompe el hielo, preséntate y mantén tus primeras interacciones cotidianas.",
      description: "En este primer mes desarrollarás la confianza para saludar, hablar de ti mismo, hacer preguntas básicas y desenvolverte en lugares comunes como cafeterías o tiendas.",
      accentColor: "from-emerald-500 to-teal-600",
      weeks: [
        {
          weekNumber: 1,
          title: "Saludos & Presentaciones (Greetings & Introductions)",
          goal: "Saludar formal e informalmente y presentarte con seguridad.",
          grammarFocus: "Verbo To Be + Pronombres Personales (I am, You are, He/She is)",
          keyPhrases: [
            { en: "Hi, I'm Alex. Nice to meet you!", es: "Hola, soy Alex. ¡Gusto en conocerte!", audio: "Hi, I'm Alex. Nice to meet you!" },
            { en: "How's it going?", es: "¿Cómo te va?", audio: "How's it going?" },
            { en: "Where are you from?", es: "¿De dónde eres?", audio: "Where are you from?" },
            { en: "I'm from Mexico, but I live in Madrid.", es: "Soy de México, pero vivo en Madrid.", audio: "I'm from Mexico, but I live in Madrid." }
          ],
          lessons: [
            {
              id: "m1w1l1",
              title: "Lección 1: Primeros Saludos e Intercambios",
              theory: "En inglés hablado, las personas rara vez dicen sólo 'Hello'. Usan expresiones como 'How's it going?' o 'What's up?'. Para responder a 'How are you?', una respuesta natural y común es 'I'm doing well, thanks! And you?'.",
              audioExample: "How's it going? I'm doing well, thanks!",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Cuál es la respuesta más natural cuando alguien te dice: 'Nice to meet you!'?",
                  options: ["Nice to meet you too!", "Yes, I am Alex.", "Thank you very much.", "I'm fine, and you?"],
                  correct: 0,
                  explanation: "'Nice to meet you too!' significa 'Gusto en conocerte también'."
                },
                {
                  type: "sentence-builder",
                  question: "Ordena la oración para decir: 'De dónde eres?'",
                  words: ["are", "Where", "from?", "you"],
                  correctOrder: ["Where", "are", "you", "from?"],
                  translation: "¿De dónde eres?"
                },
                {
                  type: "fill-blank",
                  sentence: "Hi, ___ name is Maria. I am from Spain.",
                  options: ["my", "your", "his", "her"],
                  correct: "my",
                  translation: "Hola, mi nombre es Maria. Soy de España."
                }
              ]
            },
            {
              id: "m1w1l2",
              title: "Lección 2: Decir tu Profesión y Edad",
              theory: "A diferencia del español (donde decimos 'tengo 25 años'), en inglés se usa el verbo 'to be' para la edad: 'I am 25 years old'. Para las profesiones usas 'a' o 'an': 'I am an engineer', 'I am a designer'.",
              audioExample: "I am an engineer and I am 28 years old.",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Cómo dices correctamente: 'Tengo 30 años'?",
                  options: ["I have 30 years.", "I am 30 years old.", "I stand 30 years.", "My age is 30 years."],
                  correct: 1,
                  explanation: "En inglés la edad se *es* (I am), no se *tiene* (I have)."
                },
                {
                  type: "sentence-builder",
                  question: "Arma la frase: 'Soy un diseñador de software'",
                  words: ["a", "I", "software", "designer", "am"],
                  correctOrder: ["I", "am", "a", "software", "designer"],
                  translation: "Soy un diseñador de software"
                }
              ]
            }
          ]
        },
        {
          weekNumber: 2,
          title: "Pedir Comida & Bebidas (Ordering Food & Drinks)",
          goal: "Ordenar en un café o restaurante de forma fluida y educada.",
          grammarFocus: "Can I have...? / I'd like... (Solicitudes de cortesía)",
          keyPhrases: [
            { en: "Can I get an iced coffee, please?", es: "¿Me da un café helado, por favor?", audio: "Can I get an iced coffee, please?" },
            { en: "I'd like a table for two.", es: "Me gustaría una mesa para dos.", audio: "I'd like a table for two." },
            { en: "Could we get the check, please?", es: "¿Nos podría traer la cuenta, por favor?", audio: "Could we get the check, please?" }
          ],
          lessons: [
            {
              id: "m1w2l1",
              title: "Lección 1: Cómo Pedir en un Café como un Nativo",
              theory: "Decir 'I want' suena brusco e imperativo. La manera estándar y educada de pedir algo es 'Can I get...?' o 'I'd like...'. Por ejemplo: 'Can I get a latte with oat milk?'.",
              audioExample: "Can I get a large latte with oat milk, please?",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Cómo pides un vaso de agua de manera educada?",
                  options: ["Give me water.", "I want water now.", "Can I get a glass of water, please?", "Water for me!"],
                  correct: 2,
                  explanation: "'Can I get...' es la fórmula más común y cortés."
                },
                {
                  type: "sentence-builder",
                  question: "Ordena la frase: 'Me gustaría pedir la cuenta'",
                  words: ["check,", "the", "get", "Could", "we", "please?"],
                  correctOrder: ["Could", "we", "get", "the", "check,", "please?"],
                  translation: "¿Podríamos pedir la cuenta, por favor?"
                }
              ]
            }
          ]
        },
        {
          weekNumber: 3,
          title: "Números, Precios y Horarios (Numbers, Prices & Time)",
          goal: "Preguntar precios, entender horas y manejar transacciones en tiendas.",
          grammarFocus: "How much is / How much are...? / Telling the time",
          keyPhrases: [
            { en: "How much is this shirt?", es: "¿Cuánto cuesta esta camisa?", audio: "How much is this shirt?" },
            { en: "Do you accept credit cards?", es: "¿Aceptan tarjetas de crédito?", audio: "Do you accept credit cards?" },
            { en: "What time does the store open?", es: "¿A qué hora abre la tienda?", audio: "What time does the store open?" }
          ],
          lessons: [
            {
              id: "m1w3l1",
              title: "Lección 1: Compras y Precios",
              theory: "Usa 'How much is this?' para objetos singulares y 'How much are these?' para objetos en plural (pantalones, zapatos).",
              audioExample: "How much is this jacket?",
              exercises: [
                {
                  type: "fill-blank",
                  sentence: "How much ___ these shoes?",
                  options: ["are", "is", "be", "do"],
                  correct: "are",
                  translation: "¿Cuánto cuestan estos zapatos?"
                }
              ]
            }
          ]
        },
        {
          weekNumber: 4,
          title: "Rutina Diaria (Daily Routine)",
          goal: "Describir tus hábitos diarios y horarios habituales.",
          grammarFocus: "Presente Simple (I wake up, I work, I exercise)",
          keyPhrases: [
            { en: "I usually wake up at 7 AM.", es: "Por lo general me despierto a las 7 AM.", audio: "I usually wake up at 7 AM." },
            { en: "I take a break at noon.", es: "Tomo un descanso al mediodía.", audio: "I take a break at noon." }
          ],
          lessons: [
            {
              id: "m1w4l1",
              title: "Lección 1: Tu Día a Día",
              theory: "Para hablar de hábitos diarios usa los verbos en su forma base con 'I' o 'You'. Para indicar la hora de eventos usas la preposición 'at' (at 8 AM, at night).",
              audioExample: "I start working at 9 AM every day.",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Cuál preposición usas antes de una hora específica?",
                  options: ["at", "in", "on", "by"],
                  correct: 0,
                  explanation: "Se usa 'at' para horas exactas: at 7 AM, at 3:30 PM."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      level: "Nivel A1.2",
      badge: "Mes 2",
      title: "Vida Cotidiana y Entorno Social",
      subtitle: "Habla de tu familia, pasatiempos, trabajo y haz planes de fin de semana.",
      description: "Amplía tu vocabulario para conectar con otras personas a un nivel más personal. Aprende a proponer planes, hablar de lo que te gusta e invitar a amigos.",
      accentColor: "from-indigo-500 to-purple-600",
      weeks: [
        {
          weekNumber: 1,
          title: "Familia y Relaciones (Family & Friends)",
          goal: "Describir a tu familia y amigos cercanos.",
          grammarFocus: "Adjetivos Posesivos (my, your, his, her, our, their)",
          keyPhrases: [
            { en: "I have a brother and two sisters.", es: "Tengo un hermano y dos hermanas.", audio: "I have a brother and two sisters." },
            { en: "My brother lives in Canada.", es: "Mi hermano vive en Canadá.", audio: "My brother lives in Canada." }
          ],
          lessons: [
            {
              id: "m2w1l1",
              title: "Lección 1: Describir a tus Seres Queridos",
              theory: "Cuando hablas de la tercera persona singular (he/she/it) en presente simple, añade una 's' al verbo: 'My sister works as a doctor' (no 'work').",
              audioExample: "My sister works at a hospital and lives in New York.",
              exercises: [
                {
                  type: "fill-blank",
                  sentence: "My father ___ tennis every Saturday.",
                  options: ["plays", "play", "playing", "played"],
                  correct: "plays",
                  translation: "Mi padre juega al tenis todos los sábados."
                }
              ]
            }
          ]
        },
        {
          weekNumber: 2,
          title: "Pasatiempos e Intereses (Hobbies & Free Time)",
          goal: "Expresar tus actividades favoritas y gustos personales.",
          grammarFocus: "Like / Enjoy / Love + Verb-ing",
          keyPhrases: [
            { en: "In my free time, I love playing basketball.", es: "En mi tiempo libre me encanta jugar al baloncesto.", audio: "In my free time, I love playing basketball." },
            { en: "What do you like to do on weekends?", es: "¿Qué te gusta hacer los fines de semana?", audio: "What do you like to do on weekends?" }
          ],
          lessons: [
            {
              id: "m2w2l1",
              title: "Lección 1: Compartir Gustos e Intereses",
              theory: "Después de verbos de gusto como 'enjoy', 'like' o 'love', puedes usar el verbo en gerundio (-ing): 'I enjoy reading books' o 'I like watching movies'.",
              audioExample: "I enjoy watching movies and listening to music.",
              exercises: [
                {
                  type: "sentence-builder",
                  question: "Arma la oración: 'Me gusta escuchar música'",
                  words: ["listening", "music", "I", "like", "to"],
                  correctOrder: ["I", "like", "listening", "to", "music"],
                  translation: "Me gusta escuchar música"
                }
              ]
            }
          ]
        },
        {
          weekNumber: 3,
          title: "Hacer Planes e Invitaciones (Making Plans)",
          goal: "Invitar a alguien a tomar un café, ver una película o salir.",
          grammarFocus: "Would you like to...? / Do you want to...?",
          keyPhrases: [
            { en: "Would you like to grab a coffee this afternoon?", es: "¿Te gustaría tomar un café esta tarde?", audio: "Would you like to grab a coffee this afternoon?" },
            { en: "Are you free this Saturday?", es: "¿Estás libre este sábado?", audio: "Are you free this Saturday?" }
          ],
          lessons: [
            {
              id: "m2w3l1",
              title: "Lección 1: Invitar y Aceptar Planes",
              theory: "'Grab a coffee' o 'grab dinner' es la expresión informal nativa para decir 'ir a tomar/comer algo'.",
              audioExample: "Would you like to grab a bite to eat?",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Qué expresión significa 'ir a comer algo rápido'?",
                  options: ["Grab a bite", "Catch a food", "Take a dish", "Eat a break"],
                  correct: 0,
                  explanation: "'Grab a bite' es un modismo muy común para ir a comer algo."
                }
              ]
            }
          ]
        },
        {
          weekNumber: 4,
          title: "Ubicaciones y Direcciones (Directions & Places)",
          goal: "Orientarte en una ciudad y pedir o dar direcciones.",
          grammarFocus: "Preposiciones de lugar (next to, opposite, near, behind)",
          keyPhrases: [
            { en: "Excuse me, where is the nearest subway station?", es: "Disculpe, ¿dónde está la estación de metro más cercana?", audio: "Excuse me, where is the nearest subway station?" },
            { en: "Turn left at the next corner.", es: "Gira a la izquierda en la siguiente esquina.", audio: "Turn left at the next corner." }
          ],
          lessons: [
            {
              id: "m2w4l1",
              title: "Lección 1: Cómo no Perderte en una Ciudad",
              theory: "Para preguntar por lugares cercanos usa 'nearest': 'Where is the nearest pharmacy?'. Para dar instrucciones usa imperativos directos: 'Go straight', 'Turn right'.",
              audioExample: "Go straight for two blocks and turn left.",
              exercises: [
                {
                  type: "sentence-builder",
                  question: "Arma la oración: 'Sigue recto por dos calles'",
                  words: ["straight", "Go", "two", "blocks", "for"],
                  correctOrder: ["Go", "straight", "for", "two", "blocks"],
                  translation: "Sigue recto por dos calles"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      level: "Nivel A2.1",
      badge: "Mes 3",
      title: "Historias y Experiencias Pasadas",
      subtitle: "Aprende a narrar eventos pasados, viajes y anécdotas de tu vida.",
      description: "Da el salto a contar historias. Domina el tiempo pasado para hablar de tus últimas vacaciones, qué hiciste el fin de semana pasado y resolver problemas al viajar.",
      accentColor: "from-blue-500 to-indigo-600",
      weeks: [
        {
          weekNumber: 1,
          title: "Tu Último Fin de Semana (Simple Past Basics)",
          goal: "Relatar lo que hiciste en días recientes usando verbos regulares e irregulares.",
          grammarFocus: "Pasado Simple (Worked, Went, Saw, Ate)",
          keyPhrases: [
            { en: "What did you do last weekend?", es: "¿Qué hiciste el fin de semana pasado?", audio: "What did you do last weekend?" },
            { en: "I went to a concert with my friends.", es: "Fui a un concierto con mis amigos.", audio: "I went to a concert with my friends." },
            { en: "I stayed home and relaxed.", es: "Me quedé en casa y me relajé.", audio: "I stayed home and relaxed." }
          ],
          lessons: [
            {
              id: "m3w1l1",
              title: "Lección 1: Contar lo que Hiciste Ayer",
              theory: "Los verbos irregulares cambian en pasado: Go -> Went, Eat -> Ate, See -> Saw, Have -> Had. Para preguntas en pasado usa el auxiliar 'Did': 'What did you do?'.",
              audioExample: "I went to the beach and ate delicious seafood.",
              exercises: [
                {
                  type: "fill-blank",
                  sentence: "Yesterday I ___ a great movie at the cinema.",
                  options: ["saw", "see", "seen", "seeing"],
                  correct: "saw",
                  translation: "Ayer vi una gran película en el cine."
                }
              ]
            }
          ]
        },
        {
          weekNumber: 2,
          title: "Experiencias de Viaje (Travel Stories)",
          goal: "Describir viajes, aeropuertos y hoteles.",
          grammarFocus: "Used to / Past Simple for Travel",
          keyPhrases: [
            { en: "I traveled to Japan two years ago.", es: "Viajé a Japón hace dos años.", audio: "I traveled to Japan two years ago." },
            { en: "The flight was long, but the view was amazing.", es: "El vuelo fue largo, pero la vista fue increíble.", audio: "The flight was long, but the view was amazing." }
          ],
          lessons: [
            {
              id: "m3w2l1",
              title: "Lección 1: Narrar tus Vacaciones",
              theory: "Usa 'ago' para decir 'hace [X tiempo]': 'two weeks ago' (hace dos semanas), 'three years ago' (hace tres años).",
              audioExample: "I visited London three years ago.",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Cómo dices: 'Viajé a Nueva York hace un mes'?",
                  options: ["I traveled to New York one month ago.", "I travel to New York ago one month.", "I traveled to New York makes one month.", "I went New York one month before."],
                  correct: 0,
                  explanation: "'[Tiempo] + ago' expresa 'hace [tiempo]' en inglés."
                }
              ]
            }
          ]
        },
        {
          weekNumber: 3,
          title: "Resolución de Problemas (Handling Issues)",
          goal: "Expresar quejas o resolver inconvenientes en hoteles o tiendas.",
          grammarFocus: "There was / There were / Modal Should",
          keyPhrases: [
            { en: "There's an issue with the air conditioning in my room.", es: "Hay un problema con el aire acondicionado en mi habitación.", audio: "There's an issue with the air conditioning in my room." },
            { en: "My flight was delayed by two hours.", es: "Mi vuelo se retrasó dos horas.", audio: "My flight was delayed by two hours." }
          ],
          lessons: [
            {
              id: "m3w3l1",
              title: "Lección 1: Cómo Hacer una Reclamación Amable",
              theory: "Para quejarte en inglés sin sonar agresivo, inicia con 'I'm sorry to bother you, but...' o 'There seems to be a problem with...'.",
              audioExample: "I'm sorry to bother you, but the Wi-Fi isn't working.",
              exercises: [
                {
                  type: "sentence-builder",
                  question: "Ordena la frase: 'Parece haber un problema con mi llave'",
                  words: ["problem", "seems", "to", "There", "be", "a", "with my key"],
                  correctOrder: ["There", "seems", "to", "be", "a", "problem", "with my key"],
                  translation: "Parece haber un problema con mi llave"
                }
              ]
            }
          ]
        },
        {
          weekNumber: 4,
          title: "Comparaciones y Preferencias (Comparing Experiences)",
          goal: "Comparar lugares, comida o experiencias.",
          grammarFocus: "Comparativos y Superlativos (better than, more interesting)",
          keyPhrases: [
            { en: "This hotel is much better than the previous one.", es: "Este hotel es mucho mejor que el anterior.", audio: "This hotel is much better than the previous one." },
            { en: "It's the most beautiful city I've ever visited.", es: "Es la ciudad más hermosa que he visitado jamás.", audio: "It's the most beautiful city I've ever visited." }
          ],
          lessons: [
            {
              id: "m3w4l1",
              title: "Lección 1: Comparar Opciones",
              theory: "Para adjetivos cortos usa '-er than' (cheaper than). Para adjetivos largos usa 'more [adjetivo] than' (more expensive than). Irregulares clave: Good -> Better, Bad -> Worse.",
              audioExample: "Italian food is good, but Mexican food is better!",
              exercises: [
                {
                  type: "fill-blank",
                  sentence: "This car is more ___ than mine.",
                  options: ["expensive", "cheaper", "expensiver", "cost"],
                  correct: "expensive",
                  translation: "Este auto es más costoso que el mío."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 4,
      level: "Nivel A2.2",
      badge: "Mes 4",
      title: "Opiniones y Metas Futuras",
      subtitle: "Expresa lo que piensas, acierta acuerdos y habla de tus planes al futuro.",
      description: "Desarrolla el pensamiento crítico en inglés. Aprende a dar tu opinión en conversaciones de grupo, estar de acuerdo o en desacuerdo educadamente y estructurar planes a futuro.",
      accentColor: "from-purple-500 to-pink-600",
      weeks: [
        {
          weekNumber: 1,
          title: "Dar Opiniones (Expressing Opinions)",
          goal: "Dar tu punto de vista en debates o charlas casuales.",
          grammarFocus: "In my opinion / I think that / From my point of view",
          keyPhrases: [
            { en: "In my opinion, learning English opens many doors.", es: "En mi opinión, aprender inglés abre muchas puertas.", audio: "In my opinion, learning English opens many doors." },
            { en: "I agree with you 100%.", es: "Estoy de acuerdo contigo al 100%.", audio: "I agree with you 100%." },
            { en: "I see your point, but I think differently.", es: "Entiendo tu punto, pero pienso diferente.", audio: "I see your point, but I think differently." }
          ],
          lessons: [
            {
              id: "m4w1l1",
              title: "Lección 1: Cómo Opinar sin Sonar Tajante",
              theory: "Los nativos suelen suavizar sus opiniones usando 'I feel like...', 'It seems to me that...' o 'Personally, I think...'. Evita decir 'I disagree' de golpe; es mejor 'I see what you mean, but...'.",
              audioExample: "I see your point, but I feel like we need more time.",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Cuál es la forma más diplomática de mostrar desacuerdo?",
                  options: ["You are completely wrong!", "I see your point, but I think differently.", "No way, that's stupid.", "I don't listen to you."],
                  correct: 1,
                  explanation: "Muestra empatía primero ('I see your point') antes de dar tu contraparte."
                }
              ]
            }
          ]
        },
        {
          weekNumber: 2,
          title: "Planes a Futuro (Future Plans & Goals)",
          goal: "Hablar de tus intenciones y metas a corto y largo plazo.",
          grammarFocus: "Going to (Intenciones) vs. Will (Decisiones espontáneas)",
          keyPhrases: [
            { en: "I'm going to start a new project next month.", es: "Voy a comenzar un nuevo proyecto el próximo mes.", audio: "I'm going to start a new project next month." },
            { en: "I'll call you later tonight.", es: "Te llamaré más tarde esta noche.", audio: "I'll call you later tonight." }
          ],
          lessons: [
            {
              id: "m4w2l1",
              title: "Lección 1: Going to vs. Will",
              theory: "Usa 'be going to' cuando ya has planeado algo con anterioridad. Usa 'will' para promesas o decisiones inmediatas tomadas en el momento.",
              audioExample: "I'm going to study in Canada next summer.",
              exercises: [
                {
                  type: "fill-blank",
                  sentence: "Look at those clouds! It is ___ rain.",
                  options: ["going to", "will to", "shall", "would"],
                  correct: "going to",
                  translation: "¡Mira esas nubes! Va a llover."
                }
              ]
            }
          ]
        },
        {
          weekNumber: 3,
          title: "Condicionales Simples (Hypotheticals)",
          goal: "Expresar posibilidades y qué pasaría en ciertas circunstancias.",
          grammarFocus: "Primer Condicional (If + Present, Will + Verb)",
          keyPhrases: [
            { en: "If I pass the exam, I will celebrate.", es: "Si apruebo el examen, celebraré.", audio: "If I pass the exam, I will celebrate." },
            { en: "If it rains tomorrow, we'll stay home.", es: "Si llueve mañana, nos quedaremos en casa.", audio: "If it rains tomorrow, we'll stay home." }
          ],
          lessons: [
            {
              id: "m4w3l1",
              title: "Lección 1: El Primer Condicional",
              theory: "Se estructura con 'If' + presente simple para la condición, y 'will' + verbo para el resultado futuro.",
              audioExample: "If you practice every day, you will speak fluently.",
              exercises: [
                {
                  type: "sentence-builder",
                  question: "Arma la oración: 'Si practicas, mejorarás'",
                  words: ["improve", "you", "practice,", "If", "will", "you"],
                  correctOrder: ["If", "you", "practice,", "you", "will", "improve"],
                  translation: "Si practicas, mejorarás"
                }
              ]
            }
          ]
        },
        {
          weekNumber: 4,
          title: "Sugerencias y Consejos (Giving Advice)",
          goal: "Aconsejar a amigos o colegas sobre decisiones cotidianas.",
          grammarFocus: "Should / Why don't you...? / You could...",
          keyPhrases: [
            { en: "You should try learning 5 new words a day.", es: "Deberías intentar aprender 5 palabras nuevas al día.", audio: "You should try learning 5 new words a day." },
            { en: "Why don't we take a short break?", es: "¿Por qué no tomamos un breve descanso?", audio: "Why don't we take a short break?" }
          ],
          lessons: [
            {
              id: "m4w4l1",
              title: "Lección 1: Sugerencias Naturales",
              theory: "'Why don't you...?' es una forma sumamente común y amigable de sugerir algo a alguien.",
              audioExample: "Why don't you download an English podcast?",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Cuál opción es ideal para sugerir ir a cenar?",
                  options: ["Why don't we get some dinner?", "You must eat dinner now.", "Order dinner for me.", "Dinner is mandatory."],
                  correct: 0,
                  explanation: "'Why don't we...?' invita amablemente a realizar una acción en grupo."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 5,
      level: "Nivel B1.1",
      badge: "Mes 5",
      title: "Entorno Profesional y Social Avanzado",
      subtitle: "Domina reuniones de trabajo, entrevistas, llamadas y modismos (Idioms).",
      description: "Lleva tu inglés al mundo laboral y social fluido. Aprende el lenguaje de oficina, cómo responder en entrevistas de trabajo y cómo usar modismos reales que usan los nativos.",
      accentColor: "from-amber-500 to-orange-600",
      weeks: [
        {
          weekNumber: 1,
          title: "Small Talk Profesional (Networking & Work)",
          goal: "Iniciar conversaciones casuales en entornos de trabajo o eventos.",
          grammarFocus: "Present Perfect for Experience (Have you ever...?)",
          keyPhrases: [
            { en: "Have you ever worked on a remote team?", es: "¿Alguna vez has trabajado en un equipo remoto?", audio: "Have you ever worked on a remote team?" },
            { en: "What department do you work in?", es: "¿En qué departamento trabajas?", audio: "What department do you work in?" },
            { en: "It was a pleasure talking to you!", es: "Fue un placer hablar contigo.", audio: "It was a pleasure talking to you!" }
          ],
          lessons: [
            {
              id: "m5w1l1",
              title: "Lección 1: El Arte del Small Talk",
              theory: "En el mundo laboral angloparlante, romper el hielo antes de una reunión es fundamental. Preguntas comunes: 'How was your weekend?', 'How's your week going?'.",
              audioExample: "How's your week going so far?",
              exercises: [
                {
                  type: "fill-blank",
                  sentence: "Have you ever ___ to a business conference?",
                  options: ["been", "went", "be", "go"],
                  correct: "been",
                  translation: "¿Alguna vez has ido a una conferencia de negocios?"
                }
              ]
            }
          ]
        },
        {
          weekNumber: 2,
          title: "Entrevistas de Trabajo (Job Interview Mastery)",
          goal: "Responder preguntas clave de entrevista con confianza.",
          grammarFocus: "STAR Method (Situation, Task, Action, Result)",
          keyPhrases: [
            { en: "Tell me a little about yourself.", es: "Cuéntame un poco sobre ti.", audio: "Tell me a little about yourself." },
            { en: "My main strength is problem-solving under pressure.", es: "Mi principal fortaleza es la resolución de problemas bajo presión.", audio: "My main strength is problem-solving under pressure." }
          ],
          lessons: [
            {
              id: "m5w2l1",
              title: "Lección 1: Cómo Estructurar tus Respuestas en Entrevistas",
              theory: "Para destacar en entrevistas en inglés, usa verbos de acción fuertes en pasado: 'I managed...', 'I led...', 'I created...', 'I improved...'.",
              audioExample: "I led a team of five people and improved efficiency by 20%.",
              exercises: [
                {
                  type: "sentence-builder",
                  question: "Arma la frase: 'Lideré un equipo de tres personas'",
                  words: ["of", "three", "led", "team", "I", "a", "people"],
                  correctOrder: ["I", "led", "a", "team", "of", "three", "people"],
                  translation: "Lideré un equipo de tres personas"
                }
              ]
            }
          ]
        },
        {
          weekNumber: 3,
          title: "Llamadas Telefónicas y Videoconferencias",
          goal: "Manejar problemas de conexión, pedir aclaraciones y resumir acuerdos.",
          grammarFocus: "Phrasal verbs de comunicación (speak up, break up, hold on)",
          keyPhrases: [
            { en: "Could you speak up a little? You're breaking up.", es: "¿Podrías hablar más alto? Te estás cortando (la llamada).", audio: "Could you speak up a little? You're breaking up." },
            { en: "Can you see my screen?", es: "¿Pueden ver mi pantalla?", audio: "Can you see my screen?" },
            { en: "Sorry, I was on mute.", es: "Lo siento, estaba en silencio (mute).", audio: "Sorry, I was on mute." }
          ],
          lessons: [
            {
              id: "m5w3l1",
              title: "Lección 1: Frases Indispensables para Zoom / Teams",
              theory: "'You are muted' o 'I was on mute' es la frase más usada en videollamadas. Para pedir repetición: 'Could you repeat that last part?'.",
              audioExample: "Sorry about that, I was on mute. Can you hear me now?",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Qué dices cuando el audio de la otra persona se interrumpe constantemente?",
                  options: ["You are breaking up.", "Your voice is broken.", "You break the phone.", "The audio is destroyed."],
                  correct: 0,
                  explanation: "'You're breaking up' significa que el audio o la señal de llamada se corta."
                }
              ]
            }
          ]
        },
        {
          weekNumber: 4,
          title: "Modismos de Trabajo y Vida Real (Idioms & Slang)",
          goal: "Entender expresiones que usan los nativos diariamente.",
          grammarFocus: "Common Idioms (Hit the nail on the head, Piece of cake)",
          keyPhrases: [
            { en: "That exam was a piece of cake!", es: "¡Ese examen fue pan comido!", audio: "That exam was a piece of cake!" },
            { en: "Let's call it a day.", es: "Demos el día por terminado.", audio: "Let's call it a day." },
            { en: "We are on the same page.", es: "Estamos en la misma sintonía.", audio: "We are on the same page." }
          ],
          lessons: [
            {
              id: "m5w4l1",
              title: "Lección 1: Modismos Esenciales",
              theory: "'Call it a day' significa terminar de trabajar por hoy. 'On the same page' significa estar de acuerdo en el plan.",
              audioExample: "We've worked hard today. Let me call it a day!",
              exercises: [
                {
                  type: "fill-blank",
                  sentence: "Great meeting! I think we are all on the same ___.",
                  options: ["page", "book", "paper", "line"],
                  correct: "page",
                  translation: "¡Gran reunión! Creo que todos estamos en la misma sintonía."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 6,
      level: "Nivel B1.2",
      badge: "Mes 6",
      title: "Fluidez, Espontaneidad y Confianza Total",
      subtitle: "Debates avanzados, narración ágil y soltura espontánea sin traducir en la mente.",
      description: "¡Llegaste a la cima! En este último mes de consolidación eliminarás la necesidad de traducir mentalmente antes de hablar, dominarás el 'Connected Speech' rápido y entablarás pláticas continuas con naturalidad.",
      accentColor: "from-rose-500 to-red-600",
      weeks: [
        {
          weekNumber: 1,
          title: "Pensar en Inglés sin Traducir",
          goal: "Desarrollar reflejos rápidos de respuesta sin pausar a traducir.",
          grammarFocus: "Connected speech & Fillers (Well, You know, Like, Honestly)",
          keyPhrases: [
            { en: "Well, honestly speaking, I haven't thought about that yet.", es: "Bueno, honestamente hablando, aún no he pensado en eso.", audio: "Well, honestly speaking, I haven't thought about that yet." },
            { en: "To be fair, both options have pros and cons.", es: "Para ser justos, ambas opciones tienen pros y contras.", audio: "To be fair, both options have pros and cons." }
          ],
          lessons: [
            {
              id: "m6w1l1",
              title: "Lección 1: Usar 'Fillers' como un Nativo",
              theory: "Los nativos ganan tiempo para pensar usando palabras muletilla como 'Well...', 'You see...', 'Honestly...', 'To be honest...'. Esto elimina silencios incómodos.",
              audioExample: "Well, to be honest with you, that's a great question.",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Cuál muletilla es perfecta para ganar un par de segundos de reflexión?",
                  options: ["Well, to be honest...", "Stop talking now...", "I translated that...", "Wait one minute..."],
                  correct: 0,
                  explanation: "'Well, to be honest...' suena muy natural y te da tiempo para formular la idea."
                }
              ]
            }
          ]
        },
        {
          weekNumber: 2,
          title: "Debates y Argumentación Compleja",
          goal: "Defender posturas, matizar puntos y responder a objeciones.",
          grammarFocus: "Even though / Although / On the other hand",
          keyPhrases: [
            { en: "Although it's expensive, the quality is outstanding.", es: "Aunque es costoso, la calidad es excepcional.", audio: "Although it's expensive, the quality is outstanding." },
            { en: "On the other hand, we must consider the timeline.", es: "Por otro lado, debemos considerar el cronograma.", audio: "On the other hand, we must consider the timeline." }
          ],
          lessons: [
            {
              id: "m6w2l1",
              title: "Lección 1: Conectores de Contraste",
              theory: "'On the one hand... On the other hand...' sirve para sopesar dos caras de un argumento de forma elegante.",
              audioExample: "On the one hand it's fast, but on the other hand it's costly.",
              exercises: [
                {
                  type: "sentence-builder",
                  question: "Arma la oración: 'Por otro lado debemos considerar los costos'",
                  words: ["consider", "On the other hand,", "we must", "the costs"],
                  correctOrder: ["On the other hand,", "we must", "consider", "the costs"],
                  translation: "Por otro lado debemos considerar los costos"
                }
              ]
            }
          ]
        },
        {
          weekNumber: 3,
          title: "Narración de Historias Complejas (Storytelling)",
          goal: "Contar experiencias de forma envolvente con giros y emociones.",
          grammarFocus: "Past Continuous + Past Simple (I was walking when...)",
          keyPhrases: [
            { en: "I was walking home when suddenly I met an old friend.", es: "Estaba caminando a casa cuando de repente me encontré con un viejo amigo.", audio: "I was walking home when suddenly I met an old friend." },
            { en: "Out of nowhere, it started raining heavily.", es: "De la nada, empezó a llover fuertemente.", audio: "Out of nowhere, it started raining heavily." }
          ],
          lessons: [
            {
              id: "m6w3l1",
              title: "Lección 1: Estructura de Historias",
              theory: "Combina el Pasado Continuo (I was doing...) con el Pasado Simple (when [X] happened) para dar dramatismo y contexto a tus relatos.",
              audioExample: "I was sleeping when the alarm went off.",
              exercises: [
                {
                  type: "fill-blank",
                  sentence: "I was driving to work when suddenly my phone ___.",
                  options: ["rang", "rings", "ringed", "was ringing"],
                  correct: "rang",
                  translation: "Estaba conduciendo al trabajo cuando de repente mi teléfono sonó."
                }
              ]
            }
          ]
        },
        {
          weekNumber: 4,
          title: "Examen Final de Conversación & Graduación",
          goal: "Consolidar 6 meses de aprendizaje en una prueba conversacional integral.",
          grammarFocus: "Integración Total de Tiempos y Modismos",
          keyPhrases: [
            { en: "I can now express my thoughts confidently in English!", es: "Ahora puedo expresar mis pensamientos con confianza en inglés.", audio: "I can now express my thoughts confidently in English!" },
            { en: "Practice makes perfect!", es: "La práctica hace al maestro.", audio: "Practice makes perfect!" }
          ],
          lessons: [
            {
              id: "m6w4l1",
              title: "Lección Final: Evaluación de Confianza Conversacional",
              theory: "¡Felicidades! Has completado el programa de 6 meses. Ahora posees las bases sólidas para entablar conversaciones en inglés en cualquier contexto cotidiano, laboral o de viaje.",
              audioExample: "Congratulations on completing your 6-month English journey!",
              exercises: [
                {
                  type: "multiple-choice",
                  question: "¿Cuál es la clave para mantener y seguir mejorando tu inglés conversacional a partir de hoy?",
                  options: ["Hablar y escuchar inglés todos los días sin miedo a cometer errores.", "Memorizar el diccionario completo.", "Estudiar reglas gramaticales en silencio.", "No volver a practicar."],
                  correct: 0,
                  explanation: "La clave definitiva de la fluidez es la práctica constante y activa."
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  // 2. DATA: conversations
  const conversations = [
    {
      id: "cafe-order",
      title: "Ordenar en una Cafetería de Nueva York",
      category: "Supervivencia",
      difficulty: "Principiante (Mes 1)",
      icon: "fa-mug-hot",
      characterName: "Sarah (Barista)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      initialMessage: "Hi there! Welcome to Green Bean Coffee. What can I get started for you today?",
      initialTranslation: "¡Hola! Bienvenido a Green Bean Coffee. ¿Qué puedo prepararte hoy?",
      audioPrompt: "Hi there! Welcome to Green Bean Coffee. What can I get started for you today?",
      options: [
        {
          text: "Hi! Can I get an iced Americano with oat milk, please?",
          translation: "¡Hola! ¿Me da un Americano helado con leche de avena, por favor?",
          audio: "Hi! Can I get an iced Americano with oat milk, please?",
          nextResponse: "Sure thing! What size would you like for that iced Americano? Small, medium, or large?",
          nextTranslation: "¡Claro que sí! ¿De qué tamaño te gustaría el Americano helado? ¿Chico, mediano o grande?",
          nextAudio: "Sure thing! What size would you like for that iced Americano? Small, medium, or large?",
          options: [
            {
              text: "A medium, please. And could I also get a blueberry muffin?",
              translation: "Mediano, por favor. ¿Y también me podría dar un muffin de arándano?",
              audio: "A medium, please. And could I also get a blueberry muffin?",
              nextResponse: "You got it! A medium iced Americano and a blueberry muffin. Will that be for here or to go?",
              nextTranslation: "¡Entendido! Un Americano helado mediano y un muffin de arándano. ¿Será para comer aquí o para llevar?",
              nextAudio: "You got it! A medium iced Americano and a blueberry muffin. Will that be for here or to go?",
              options: [
                {
                  text: "To go, please. How much is the total?",
                  translation: "Para llevar, por favor. ¿Cuánto es el total?",
                  audio: "To go, please. How much is the total?",
                  nextResponse: "That comes out to $8.50. You can tap your card right on the terminal when you're ready!",
                  nextTranslation: "En total son $8.50. ¡Puedes aproximar tu tarjeta en la terminal cuando gustes!",
                  nextAudio: "That comes out to $8.50. You can tap your card right on the terminal when you're ready!",
                  isEnd: true,
                  xpReward: 50
                }
              ]
            }
          ]
        },
        {
          text: "Hello, I want coffee.",
          translation: "Hola, quiero café.",
          audio: "Hello, I want coffee.",
          nextResponse: "Sure! What kind of coffee would you like? We have espresso, cappuccino, and cold brew.",
          nextTranslation: "¡Seguro! ¿Qué tipo de café te gustaría? Tenemos espresso, capuchino y cold brew.",
          nextAudio: "Sure! What kind of coffee would you like? We have espresso, cappuccino, and cold brew.",
          options: [
            {
              text: "I'd like a cappuccino with almond milk, please.",
              translation: "Me gustaría un capuchino con leche de almendra, por favor.",
              audio: "I'd like a cappuccino with almond milk, please.",
              nextResponse: "Great choice! For here or to go?",
              nextTranslation: "¡Excelente elección! ¿Para aquí o para llevar?",
              nextAudio: "Great choice! For here or to go?",
              isEnd: true,
              xpReward: 35
            }
          ]
        }
      ]
    },
    {
      id: "job-interview",
      title: "Entrevista de Trabajo: Presentación Inicial",
      category: "Profesional",
      difficulty: "Intermedio (Mes 5)",
      icon: "fa-briefcase",
      characterName: "David (Hiring Manager)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      initialMessage: "Good morning! Thanks for joining us today. To start off, could you tell me a little bit about yourself?",
      initialTranslation: "¡Buenos días! Gracias por acompañarnos hoy. Para comenzar, ¿podrías contarme un poco sobre ti?",
      audioPrompt: "Good morning! Thanks for joining us today. To start off, could you tell me a little bit about yourself?",
      options: [
        {
          text: "Good morning, David! Sure. I have over four years of experience in project management. I specialize in leading cross-functional teams and driving product growth.",
          translation: "¡Buenos días, David! Claro. Tengo más de cuatro años de experiencia en gestión de proyectos. Me especializo en liderar equipos multidisciplinarios y promover el crecimiento de productos.",
          audio: "Good morning, David! Sure. I have over four years of experience in project management. I specialize in leading cross-functional teams and driving product growth.",
          nextResponse: "That sounds impressive! What would you say is your greatest professional achievement so far?",
          nextTranslation: "¡Eso suena impresionante! ¿Cuál dirías que es tu mayor logro profesional hasta ahora?",
          nextAudio: "That sounds impressive! What would you say is your greatest professional achievement so far?",
          options: [
            {
              text: "In my last role, I led a digital transformation initiative that increased team productivity by 30% while reducing costs.",
              translation: "En mi último puesto, lideré una iniciativa de transformación digital que aumentó la productividad del equipo un 30% mientras redujo costos.",
              audio: "In my last role, I led a digital transformation initiative that increased team productivity by 30% while reducing costs.",
              nextResponse: "Fantastic! That matches exactly what we are looking for in this role. When would you be available to start?",
              nextTranslation: "¡Fantástico! Eso coincide exactamente con lo que buscamos en este puesto. ¿Cuándo estarías disponible para comenzar?",
              nextAudio: "Fantastic! That matches exactly what we are looking for in this role. When would you be available to start?",
              isEnd: true,
              xpReward: 100
            }
          ]
        }
      ]
    },
    {
      id: "hotel-checkin",
      title: "Check-in en el Hotel & Resolver un Inconveniente",
      category: "Viajes",
      difficulty: "Elemental (Mes 3)",
      icon: "fa-hotel",
      characterName: "Elena (Recepcionista)",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      initialMessage: "Welcome to Grand Plaza Hotel! How can I assist you today?",
      initialTranslation: "¡Bienvenido a Grand Plaza Hotel! ¿Cómo puedo ayudarle hoy?",
      audioPrompt: "Welcome to Grand Plaza Hotel! How can I assist you today?",
      options: [
        {
          text: "Hi! I have a reservation under the name Carlos Garcia for three nights.",
          translation: "¡Hola! Tengo una reservación a nombre de Carlos García por tres noches.",
          audio: "Hi! I have a reservation under the name Carlos Garcia for three nights.",
          nextResponse: "Ah, yes! I see your reservation right here. May I please have your ID and a credit card for incidental charges?",
          nextTranslation: "¡Ah, sí! Veo su reservación aquí mismo. ¿Me permite su identificación y una tarjeta de crédito para cargos imprevistos?",
          nextAudio: "Ah, yes! I see your reservation right here. May I please have your ID and a credit card for incidental charges?",
          options: [
            {
              text: "Here you go. Also, could I request a quiet room on a high floor?",
              translation: "Aquí tiene. Además, ¿podría solicitar una habitación tranquila en un piso alto?",
              audio: "Here you go. Also, could I request a quiet room on a high floor?",
              nextResponse: "Certainly! I've assigned you Room 812 on the 8th floor. Here are your key cards. Enjoy your stay!",
              nextTranslation: "¡Con gusto! Le he asignado la habitación 812 en el 8º piso. Aquí están sus llaves. ¡Disfrute su estancia!",
              nextAudio: "Certainly! I've assigned you Room 812 on the 8th floor. Here are your key cards. Enjoy your stay!",
              isEnd: true,
              xpReward: 60
            }
          ]
        }
      ]
    }
  ];

  // 3. DATA: phrasebook
  const phrasebook = [
    {
      category: "Small Talk & Socializar",
      icon: "fa-comments",
      phrases: [
        { id: "p1", en: "How's your day going?", es: "¿Cómo va tu día?", context: "Pregunta casual ideal para abrir conversación.", audio: "How's your day going?" },
        { id: "p2", en: "What have you been up to lately?", es: "¿Qué has estado haciendo últimamente?", audio: "What have you been up to lately?" },
        { id: "p3", en: "That makes total sense!", es: "Eso tiene total sentido.", audio: "That makes total sense!" },
        { id: "p4", en: "No way! Are you serious?", es: "¡No puede ser! ¿Hablas en serio?", audio: "No way! Are you serious?" },
        { id: "p5", en: "I see what you mean.", es: "Entiendo a qué te refieres.", audio: "I see what you mean." },
        { id: "p6", en: "Long time no see!", es: "¡Tanto tiempo sin verte!", audio: "Long time no see!" }
      ]
    },
    {
      category: "Restaurantes & Cafés",
      icon: "fa-utensils",
      phrases: [
        { id: "p7", en: "Can I get a table for two, please?", es: "¿Me da una mesa para dos, por favor?", audio: "Can I get a table for two, please?" },
        { id: "p8", en: "What do you recommend?", es: "¿Qué me recomiendas?", audio: "What do you recommend?" },
        { id: "p9", en: "I'll have the same thing.", es: "Pediré lo mismo.", audio: "I'll have the same thing." },
        { id: "p10", en: "Could we get the check, please?", es: "¿Nos podría traer la cuenta, por favor?", audio: "Could we get the check, please?" },
        { id: "p11", en: "Is dressing included on the side?", es: "¿El aderezo viene aparte?", audio: "Is dressing included on the side?" }
      ]
    },
    {
      category: "Viajes & Orientación",
      icon: "fa-plane-departure",
      phrases: [
        { id: "p12", en: "Excuse me, where is the nearest gate?", es: "Disculpe, ¿dónde está la puerta de embarque más cercana?", audio: "Excuse me, where is the nearest gate?" },
        { id: "p13", en: "How long does it take to get there?", es: "¿Cuánto tiempo toma llegar allí?", audio: "How long does it take to get there?" },
        { id: "p14", en: "Is this seat taken?", es: "¿Está ocupado este asiento?", audio: "Is this seat taken?" },
        { id: "p15", en: "Could you take a quick photo of us?", es: "¿Nos podrías tomar una foto rápida?", audio: "Could you take a quick photo of us?" }
      ]
    },
    {
      category: "Trabajo & Negocios",
      icon: "fa-briefcase",
      phrases: [
        { id: "p16", en: "Let's touch base on Monday.", es: "Poniémonos en contacto / coordinemos el lunes.", audio: "Let's touch base on Monday." },
        { id: "p17", en: "I'll follow up with an email.", es: "Daré seguimiento con un correo electrónico.", audio: "I'll follow up with an email." },
        { id: "p18", en: "Sorry, I didn't quite catch that.", es: "Lo siento, no alcancé a escuchar bien eso.", audio: "Sorry, I didn't quite catch that." },
        { id: "p19", en: "Could you elaborate on that point?", es: "¿Podrías detallar más ese punto?", audio: "Could you elaborate on that point?" }
      ]
    }
  ];

  // 4. DATA: pronunciationRules
  const pronunciationRules = [
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

  // 5. UTILS: Speech Engine
  class SpeechEngine {
    constructor() {
      this.synth = window.speechSynthesis;
      this.selectedVoice = null;
      this.rate = 0.95;
      this.pitch = 1.0;
      this.voices = [];
      this.isSupported = 'speechSynthesis' in window;

      if (this.isSupported) {
        this.initVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = () => this.initVoices();
        }
      }
    }

    initVoices() {
      if (!this.isSupported) return;
      this.voices = this.synth.getVoices().filter(v => v.lang.startsWith('en'));
      
      const preferredVoice = this.voices.find(v => 
        v.lang.includes('en-US') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Jenny'))
      ) || this.voices.find(v => v.lang.includes('en-US')) || this.voices[0];

      if (preferredVoice && !this.selectedVoice) {
        this.selectedVoice = preferredVoice;
      }
    }

    getEnglishVoices() {
      return this.voices;
    }

    setVoice(voiceName) {
      const found = this.voices.find(v => v.name === voiceName);
      if (found) this.selectedVoice = found;
    }

    setRate(rateVal) {
      this.rate = parseFloat(rateVal);
    }

    speak(text, onEndCallback = null) {
      if (!this.isSupported) return;
      this.synth.cancel();
      if (!text || text.trim() === '') return;

      const utterance = new SpeechSynthesisUtterance(text);
      if (this.selectedVoice) utterance.voice = this.selectedVoice;
      utterance.lang = 'en-US';
      utterance.rate = this.rate;
      utterance.pitch = this.pitch;

      if (onEndCallback) utterance.onend = onEndCallback;
      this.synth.speak(utterance);
    }

    playAudioFeedback(type = 'success') {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        if (type === 'success') {
          const now = ctx.currentTime;
          const osc1 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(523.25, now);
          osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.2);

          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

          osc1.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc1.stop(now + 0.4);
        }
      } catch (e) {}
    }

    startListening(onResult, onError) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (onError) onError("Reconocimiento de voz no disponible en este navegador. Usa Chrome o Edge.");
        return null;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onResult) onResult(transcript);
      };

      recognition.onerror = (event) => {
        if (onError) onError(`Error de micrófono: ${event.error}`);
      };

      recognition.start();
      return recognition;
    }
  }

  const speech = new SpeechEngine();

  // 6. UTILS: Storage
  const STORAGE_KEY = 'fluent_in_6_user_data_v1';
  const defaultUserData = {
    currentMonth: 1,
    currentWeek: 1,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    xp: 120,
    completedLessons: ['m1w1l1'],
    favoritePhrases: ['p1', 'p3'],
    confidenceScore: 25,
    theme: 'dark',
    audioRate: 0.95
  };

  const storage = {
    get() {
      try {
        const item = localStorage.getItem(STORAGE_KEY);
        if (!item) {
          this.save(defaultUserData);
          return { ...defaultUserData };
        }
        return { ...defaultUserData, ...JSON.parse(item) };
      } catch (e) {
        return { ...defaultUserData };
      }
    },

    save(data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {}
    },

    addXP(points) {
      const data = this.get();
      data.xp = (data.xp || 0) + points;
      data.confidenceScore = Math.min(100, Math.round(15 + (data.completedLessons.length * 3.5) + (data.xp * 0.05)));
      this.save(data);
      return data;
    },

    completeLesson(lessonId, rewardXP = 30) {
      const data = this.get();
      if (!data.completedLessons.includes(lessonId)) {
        data.completedLessons.push(lessonId);
        data.xp = (data.xp || 0) + rewardXP;
        data.confidenceScore = Math.min(100, Math.round(15 + (data.completedLessons.length * 3.5) + (data.xp * 0.05)));
        this.save(data);
      }
      return data;
    },

    toggleFavoritePhrase(phraseId) {
      const data = this.get();
      if (!data.favoritePhrases) data.favoritePhrases = [];
      const index = data.favoritePhrases.indexOf(phraseId);
      if (index > -1) {
        data.favoritePhrases.splice(index, 1);
      } else {
        data.favoritePhrases.push(phraseId);
      }
      this.save(data);
      return data.favoritePhrases;
    },

    resetProgress() {
      this.save(defaultUserData);
      return { ...defaultUserData };
    }
  };

  // 7. VIEWS: Dashboard
  function renderDashboard(container, navigateTo) {
    const userData = storage.get();
    let totalLessons = 0;
    monthsData.forEach(m => m.weeks.forEach(w => totalLessons += w.lessons.length));
    const completedCount = userData.completedLessons.length;
    const overallPercentage = Math.round((completedCount / totalLessons) * 100);

    let nextLesson = monthsData[0].weeks[0].lessons[0];
    let nextMonth = monthsData[0];
    let nextWeek = monthsData[0].weeks[0];

    for (const month of monthsData) {
      for (const week of month.weeks) {
        for (const lesson of week.lessons) {
          if (!userData.completedLessons.includes(lesson.id)) {
            nextLesson = lesson;
            nextMonth = month;
            nextWeek = week;
            break;
          }
        }
        if (nextLesson && !userData.completedLessons.includes(nextLesson.id)) break;
      }
      if (nextLesson && !userData.completedLessons.includes(nextLesson.id)) break;
    }

    container.innerHTML = `
      <div class="space-y-8 animate-fade-in">
        <div class="relative overflow-hidden card-base p-6 md:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-indigo-500/30">
          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-2 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <i class="fa-solid fa-bullseye"></i> Método Conversacional de 6 Meses
              </div>
              <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                ¡Tu camino a la fluidez en inglés!
              </h1>
              <p class="text-slate-300 text-sm md:text-base leading-relaxed">
                Practica 10 minutos al día para entablar conversaciones reales con soltura sin pausar a traducir en tu mente.
              </p>
            </div>

            <button id="dashboard-start-lesson-btn" class="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 text-white font-bold rounded-2xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
              <i class="fa-solid fa-play text-base"></i>
              <div class="text-left">
                <span class="block text-xs text-indigo-100 font-normal">Siguiente Lección Recomendada</span>
                <span class="block text-sm font-extrabold">${nextLesson.title}</span>
              </div>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="card-base p-6 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Índice de Confianza</span>
              <div class="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <i class="fa-solid fa-gauge-high"></i>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-baseline justify-between">
                <span class="text-3xl font-extrabold text-white">${userData.confidenceScore}%</span>
                <span class="text-xs font-semibold text-emerald-400">Conversacional</span>
              </div>
              <div class="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" style="width: ${userData.confidenceScore}%"></div>
              </div>
            </div>
          </div>

          <div class="card-base p-6 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Progreso Global</span>
              <div class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <i class="fa-solid fa-route"></i>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-baseline justify-between">
                <span class="text-3xl font-extrabold text-white">${overallPercentage}%</span>
                <span class="text-xs font-semibold text-slate-400">${completedCount} de ${totalLessons} Lecciones</span>
              </div>
              <div class="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style="width: ${overallPercentage}%"></div>
              </div>
            </div>
          </div>

          <div class="card-base p-6 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Racha Diaria</span>
              <div class="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <i class="fa-solid fa-fire text-amber-500"></i>
              </div>
            </div>
            <div class="space-y-2">
              <span class="text-3xl font-extrabold text-white">${userData.streakDays} Días</span>
              <p class="text-xs text-slate-400">Practica hoy para mantener tu racha activa.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-bold text-white mb-4">Herramientas Principales</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div id="quick-sim-card" class="card-base card-hover p-5 cursor-pointer">
              <div class="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-lg mb-3">
                <i class="fa-solid fa-headset"></i>
              </div>
              <h3 class="text-base font-bold text-white mb-1">Simulador IA</h3>
              <p class="text-xs text-slate-400">Práctica de conversación con voz nativa.</p>
            </div>

            <div id="quick-roadmap-card" class="card-base card-hover p-5 cursor-pointer">
              <div class="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-lg mb-3">
                <i class="fa-solid fa-map-location-dot"></i>
              </div>
              <h3 class="text-base font-bold text-white mb-1">Ruta 6 Meses</h3>
              <p class="text-xs text-slate-400">Plan de lecciones mes por mes.</p>
            </div>

            <div id="quick-flashcards-card" class="card-base card-hover p-5 cursor-pointer">
              <div class="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-lg mb-3">
                <i class="fa-solid fa-layer-group"></i>
              </div>
              <h3 class="text-base font-bold text-white mb-1">Frases & Tarjetas</h3>
              <p class="text-xs text-slate-400">Frases indispensables con audio.</p>
            </div>

            <div id="quick-pron-card" class="card-base card-hover p-5 cursor-pointer">
              <div class="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center text-lg mb-3">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <h3 class="text-base font-bold text-white mb-1">Pronunciación</h3>
              <p class="text-xs text-slate-400">Taller de Connected Speech.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-bold text-white mb-4">Programa de 6 Meses</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${monthsData.map(month => `
              <div class="card-base p-5 border-slate-800 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-1 rounded text-[10px] font-bold bg-slate-800 text-indigo-300">${month.badge}</span>
                  <span class="text-xs text-slate-400">${month.level}</span>
                </div>
                <h3 class="text-base font-bold text-white">${month.title}</h3>
                <p class="text-xs text-slate-400 line-clamp-2">${month.subtitle}</p>
                <button data-month-id="${month.id}" class="open-month-btn w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl">
                  Ver Mes ${month.id}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    container.querySelector('#dashboard-start-lesson-btn')?.addEventListener('click', () => {
      navigateTo('lesson', { lessonId: nextLesson.id, month: nextMonth, week: nextWeek });
    });

    container.querySelector('#quick-sim-card')?.addEventListener('click', () => navigateTo('simulator'));
    container.querySelector('#quick-roadmap-card')?.addEventListener('click', () => navigateTo('roadmap'));
    container.querySelector('#quick-flashcards-card')?.addEventListener('click', () => navigateTo('flashcards'));
    container.querySelector('#quick-pron-card')?.addEventListener('click', () => navigateTo('pronunciation'));

    container.querySelectorAll('.open-month-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const monthId = parseInt(e.currentTarget.getAttribute('data-month-id'));
        navigateTo('roadmap', { openMonthId: monthId });
      });
    });
  }

  // 8. VIEWS: Roadmap
  function renderRoadmap(container, navigateTo, params = {}) {
    const userData = storage.get();
    let expandedMonth = params.openMonthId || 1;

    function render() {
      const month = monthsData.find(m => m.id === expandedMonth) || monthsData[0];
      container.innerHTML = `
        <div class="space-y-6 animate-fade-in">
          <div>
            <h1 class="text-3xl font-extrabold text-white">Ruta de 6 Meses</h1>
            <p class="text-slate-400 text-sm">Selecciona un mes para ver las lecciones semanales.</p>
          </div>

          <div class="flex items-center gap-2 overflow-x-auto pb-2">
            ${monthsData.map(m => `
              <button data-month="${m.id}" class="month-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap ${m.id === expandedMonth ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'}">
                ${m.badge} (${m.level})
              </button>
            `).join('')}
          </div>

          <div class="card-base p-6 space-y-6 border-indigo-500/30">
            <h2 class="text-2xl font-extrabold text-white">${month.title}</h2>
            <p class="text-slate-300 text-sm">${month.description}</p>

            <div class="space-y-6">
              ${month.weeks.map(week => `
                <div class="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h3 class="text-base font-bold text-white">Semana ${week.weekNumber}: ${week.title}</h3>
                    <span class="text-xs text-indigo-400 font-semibold">${week.grammarFocus}</span>
                  </div>

                  <div class="space-y-2">
                    ${week.lessons.map(lesson => {
                      const isCompleted = userData.completedLessons.includes(lesson.id);
                      return `
                        <div class="p-3.5 rounded-xl bg-slate-900 border ${isCompleted ? 'border-emerald-500/40' : 'border-slate-800'} flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <div class="w-7 h-7 rounded-full ${isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'} flex items-center justify-center text-xs font-bold">
                              ${isCompleted ? '✓' : '1'}
                            </div>
                            <span class="text-sm font-bold text-white">${lesson.title}</span>
                          </div>
                          <button data-lesson-id="${lesson.id}" class="start-lesson-btn px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl">
                            ${isCompleted ? 'Repasar' : 'Comenzar'}
                          </button>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      container.querySelectorAll('.month-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          expandedMonth = parseInt(e.currentTarget.getAttribute('data-month'));
          render();
        });
      });

      container.querySelectorAll('.start-lesson-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const lessonId = e.currentTarget.getAttribute('data-lesson-id');
          let foundLesson = null, foundMonth = null, foundWeek = null;
          monthsData.forEach(m => {
            m.weeks.forEach(w => {
              w.lessons.forEach(l => {
                if (l.id === lessonId) {
                  foundLesson = l;
                  foundMonth = m;
                  foundWeek = w;
                }
              });
            });
          });
          if (foundLesson) navigateTo('lesson', { lessonId, month: foundMonth, week: foundWeek });
        });
      });
    }

    render();
  }

  // 9. VIEWS: Lesson
  function renderLesson(container, navigateTo, params = {}) {
    const { lessonId } = params;
    let currentLesson = monthsData[0].weeks[0].lessons[0];

    monthsData.forEach(m => {
      m.weeks.forEach(w => {
        w.lessons.forEach(l => {
          if (l.id === lessonId) currentLesson = l;
        });
      });
    });

    let stepIndex = 0;
    const exercises = currentLesson.exercises || [];
    let userAnswers = {};
    let isGraded = false;

    function render() {
      container.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <button id="lesson-back-btn" class="text-xs font-bold text-slate-400 hover:text-white">
            ← Volver a la Ruta
          </button>

          <div class="card-base p-6 md:p-8 space-y-6 border-indigo-500/30">
            ${stepIndex === 0 ? `
              <div class="space-y-4">
                <h2 class="text-2xl font-extrabold text-white">${currentLesson.title}</h2>
                <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-sm leading-relaxed">
                  ${currentLesson.theory}
                </div>
                ${currentLesson.audioExample ? `
                  <button id="play-theory-audio" class="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl">
                    🔊 Escuchar Pronunciación
                  </button>
                ` : ''}
                <div class="pt-4 flex justify-end">
                  <button id="next-step-btn" class="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl">
                    Comenzar Práctica
                  </button>
                </div>
              </div>
            ` : stepIndex <= exercises.length ? `
              <div class="space-y-4">
                <span class="text-xs font-bold text-indigo-400 uppercase">Ejercicio ${stepIndex} de ${exercises.length}</span>
                <h3 class="text-lg font-bold text-white">${exercises[stepIndex - 1].question}</h3>

                ${exercises[stepIndex - 1].type === 'multiple-choice' ? `
                  <div class="space-y-2">
                    ${exercises[stepIndex - 1].options.map((opt, optIdx) => `
                      <button data-opt-idx="${optIdx}" class="option-btn w-full p-3.5 rounded-xl border ${userAnswers[stepIndex - 1]?.answer === optIdx ? 'bg-indigo-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'} text-left text-sm font-semibold">
                        ${opt}
                      </button>
                    `).join('')}
                  </div>
                ` : ''}

                ${isGraded ? `
                  <div class="p-4 rounded-xl border ${userAnswers[stepIndex - 1]?.isCorrect ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/40 border-rose-500/50 text-rose-300'} text-xs font-bold">
                    ${userAnswers[stepIndex - 1]?.isCorrect ? '¡Excelente respuesta!' : 'Respuesta incorrecta.'}
                  </div>
                ` : ''}

                <div class="pt-4 flex justify-between">
                  <button id="prev-step-btn" class="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">Anterior</button>
                  ${!isGraded ? `
                    <button id="check-answer-btn" class="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">Comprobar</button>
                  ` : `
                    <button id="next-step-btn" class="px-6 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl">Continuar</button>
                  `}
                </div>
              </div>
            ` : `
              <div class="text-center space-y-4 py-6">
                <h2 class="text-2xl font-extrabold text-white">¡Lección Completada!</h2>
                <p class="text-xs text-indigo-400 font-bold">+40 Puntos de Experiencia (XP) Ganados</p>
                <button id="finish-lesson-btn" class="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl">
                  Volver a la Ruta
                </button>
              </div>
            `}
          </div>
        </div>
      `;

      container.querySelector('#lesson-back-btn')?.addEventListener('click', () => navigateTo('roadmap'));
      container.querySelector('#play-theory-audio')?.addEventListener('click', () => speech.speak(currentLesson.audioExample));

      container.querySelector('#next-step-btn')?.addEventListener('click', () => {
        stepIndex++;
        isGraded = false;
        render();
      });

      container.querySelector('#prev-step-btn')?.addEventListener('click', () => {
        if (stepIndex > 0) stepIndex--;
        isGraded = false;
        render();
      });

      container.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const optIdx = parseInt(e.currentTarget.getAttribute('data-opt-idx'));
          userAnswers[stepIndex - 1] = { answer: optIdx };
          render();
        });
      });

      container.querySelector('#check-answer-btn')?.addEventListener('click', () => {
        const exercise = exercises[stepIndex - 1];
        const isCorrect = userAnswers[stepIndex - 1]?.answer === exercise.correct;
        userAnswers[stepIndex - 1].isCorrect = isCorrect;
        isGraded = true;
        if (stepIndex === exercises.length && isCorrect) {
          storage.completeLesson(currentLesson.id);
        }
        speech.playAudioFeedback(isCorrect ? 'success' : 'error');
        render();
      });

      container.querySelector('#finish-lesson-btn')?.addEventListener('click', () => navigateTo('roadmap'));
    }

    render();
  }

  // 10. VIEWS: Simulator
  function renderSimulator(container, navigateTo) {
    let activeConversation = conversations[0];
    let conversationHistory = [
      {
        sender: 'ai',
        name: activeConversation.characterName,
        avatar: activeConversation.avatar,
        text: activeConversation.initialMessage,
        translation: activeConversation.initialTranslation,
        audio: activeConversation.audioPrompt
      }
    ];
    let currentStepOptions = activeConversation.options;

    speech.speak(activeConversation.initialMessage);

    function render() {
      container.innerHTML = `
        <div class="space-y-6 animate-fade-in">
          <div>
            <h1 class="text-3xl font-extrabold text-white">Simulador de Conversación con Voz</h1>
            <p class="text-slate-400 text-sm">Escucha la voz nativa y responde para practicar el diálogo.</p>
          </div>

          <div class="card-base border-indigo-500/30 overflow-hidden flex flex-col h-[520px]">
            <div class="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img src="${activeConversation.avatar}" class="w-8 h-8 rounded-full object-cover">
                <h3 class="text-sm font-bold text-white">${activeConversation.characterName}</h3>
              </div>
            </div>

            <div id="chat-messages" class="flex-1 p-4 overflow-y-auto space-y-4">
              ${conversationHistory.map(msg => `
                <div class="flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2">
                  <div class="p-3.5 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-100'} max-w-md">
                    <p class="text-sm font-semibold">${msg.text}</p>
                    <p class="text-xs opacity-75 pt-1">${msg.translation}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="p-4 bg-slate-950 border-t border-slate-800 space-y-2">
              ${currentStepOptions.map((opt, idx) => `
                <button data-opt-idx="${idx}" class="sim-opt-btn w-full p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-left text-xs font-bold text-white">
                  "${opt.text}" (${opt.translation})
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      container.querySelectorAll('.sim-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-opt-idx'));
          const opt = currentStepOptions[idx];
          if (!opt) return;

          conversationHistory.push({ sender: 'user', text: opt.text, translation: opt.translation });
          if (opt.nextResponse) {
            conversationHistory.push({ sender: 'ai', text: opt.nextResponse, translation: opt.nextTranslation });
            speech.speak(opt.nextAudio);
          }
          currentStepOptions = opt.options || [];
          render();
        });
      });
    }

    render();
  }

  // 11. VIEWS: Flashcards
  function renderFlashcards(container) {
    const userData = storage.get();
    let cardIndex = 0;
    let isFlipped = false;
    let phrases = phrasebook[0].phrases;

    function render() {
      const card = phrases[cardIndex];
      container.innerHTML = `
        <div class="max-w-xl mx-auto space-y-6 animate-fade-in text-center">
          <h1 class="text-3xl font-extrabold text-white">Frases Indispensables</h1>

          <div id="flashcard" class="card-base p-10 min-h-[220px] flex flex-col items-center justify-center cursor-pointer border-purple-500/30">
            <h2 class="text-2xl font-extrabold text-white">${isFlipped ? card.es : card.en}</h2>
            <p class="text-xs text-slate-400 mt-2">${isFlipped ? 'Español' : 'Inglés (Toca para voltear)'}</p>
          </div>

          <div class="flex justify-center gap-3">
            <button id="card-speech-btn" class="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl">🔊 Escuchar</button>
            <button id="next-card-btn" class="px-6 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl">Siguiente →</button>
          </div>
        </div>
      `;

      container.querySelector('#flashcard')?.addEventListener('click', () => {
        isFlipped = !isFlipped;
        render();
      });

      container.querySelector('#card-speech-btn')?.addEventListener('click', () => speech.speak(card.en));
      container.querySelector('#next-card-btn')?.addEventListener('click', () => {
        cardIndex = (cardIndex + 1) % phrases.length;
        isFlipped = false;
        render();
      });
    }

    render();
  }

  // 12. VIEWS: PronunciationLab
  function renderPronunciationLab(container) {
    let activeRule = pronunciationRules[0];

    function render() {
      container.innerHTML = `
        <div class="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <h1 class="text-3xl font-extrabold text-white">Taller de Pronunciación</h1>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${pronunciationRules.map(rule => `
              <div data-id="${rule.id}" class="rule-card card-base p-4 cursor-pointer border-slate-800">
                <h3 class="text-sm font-bold text-white">${rule.title}</h3>
              </div>
            `).join('')}
          </div>

          <div class="card-base p-6 border-amber-500/30 space-y-4">
            <h2 class="text-xl font-bold text-white">${activeRule.title}</h2>
            <p class="text-xs text-slate-300">${activeRule.description}</p>
            <div class="p-3 bg-slate-950 rounded-xl text-amber-300 text-sm font-bold">
              Escrito: "${activeRule.written}" ➔ Hablado: "${activeRule.spoken}"
            </div>
            <button id="play-rule-audio" class="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">🔊 Escuchar Pronunciación</button>
          </div>
        </div>
      `;

      container.querySelectorAll('.rule-card').forEach(card => {
        card.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          activeRule = pronunciationRules.find(r => r.id === id) || pronunciationRules[0];
          render();
        });
      });

      container.querySelector('#play-rule-audio')?.addEventListener('click', () => speech.speak(activeRule.audioText));
    }

    render();
  }

  // 13. APP CONTROLLER
  class AppController {
    constructor() {
      this.viewContainer = document.getElementById('view-container');
      this.init();
    }

    init() {
      this.setupNav();
      this.navigateTo('dashboard');
    }

    setupNav() {
      document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.currentTarget.getAttribute('data-target');
          this.navigateTo(target);
        });
      });

      document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
        document.getElementById('mobile-drawer')?.classList.toggle('hidden');
      });
    }

    navigateTo(viewName, params = {}) {
      document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
        if (btn.getAttribute('data-target') === viewName) btn.classList.add('active');
        else btn.classList.remove('active');
      });

      switch (viewName) {
        case 'dashboard': renderDashboard(this.viewContainer, this.navigateTo.bind(this)); break;
        case 'roadmap': renderRoadmap(this.viewContainer, this.navigateTo.bind(this), params); break;
        case 'lesson': renderLesson(this.viewContainer, this.navigateTo.bind(this), params); break;
        case 'simulator': renderSimulator(this.viewContainer, this.navigateTo.bind(this)); break;
        case 'flashcards': renderFlashcards(this.viewContainer); break;
        case 'pronunciation': renderPronunciationLab(this.viewContainer); break;
        default: renderDashboard(this.viewContainer, this.navigateTo.bind(this));
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppController();
  });

})();
