/**
 * Data architecture for the 6-Month Conversational English Curriculum
 * Designed specifically for native Spanish speakers aiming for conversation fluency.
 */

export const monthsData = [
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
    description: "Amps tu vocabulario para conectar con otras personas a un nivel más personal. Aprende a proponer planes, hablar de lo que te gusta e invitar a amigos.",
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
