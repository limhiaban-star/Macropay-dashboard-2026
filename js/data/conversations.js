/**
 * Real-world Conversation Roleplay Scenarios for the Interactive Simulator
 */

export const conversations = [
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
