/**
 * Interactive Lesson Runner View Component
 */
import { storage } from '../utils/storage.js';
import { speech } from '../utils/speech.js';
import { monthsData } from '../data/monthsData.js';

export function renderLesson(container, navigateTo, params = {}) {
  const { lessonId, month, week } = params;

  let currentLesson = null;
  let currentMonth = month || monthsData[0];
  let currentWeek = week || monthsData[0].weeks[0];

  if (lessonId) {
    monthsData.forEach(m => {
      m.weeks.forEach(w => {
        w.lessons.forEach(l => {
          if (l.id === lessonId) {
            currentLesson = l;
            currentMonth = m;
            currentWeek = w;
          }
        });
      });
    });
  }

  if (!currentLesson) {
    currentLesson = monthsData[0].weeks[0].lessons[0];
  }

  let stepIndex = 0; // 0: Theory, 1..N: Exercises, N+1: Summary
  const exercises = currentLesson.exercises || [];
  let userAnswers = {};
  let isGraded = false;
  let score = 0;

  function render() {
    container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 animate-fade-in">
        
        <!-- Top Back Bar & Progress -->
        <div class="flex items-center justify-between gap-4">
          <button id="lesson-back-btn" class="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
            <i class="fa-solid fa-arrow-left"></i> Volver a la Ruta
          </button>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              ${currentMonth.badge} • Semana ${currentWeek.weekNumber}
            </span>
          </div>
        </div>

        <!-- Step Indicator -->
        <div class="flex items-center gap-1.5">
          <div class="h-2 flex-1 rounded-full ${stepIndex >= 0 ? 'bg-indigo-500' : 'bg-slate-800'} transition-all"></div>
          ${exercises.map((_, idx) => `
            <div class="h-2 flex-1 rounded-full ${stepIndex > idx ? 'bg-indigo-500' : stepIndex === idx + 1 ? 'bg-indigo-400' : 'bg-slate-800'} transition-all"></div>
          `).join('')}
          <div class="h-2 flex-1 rounded-full ${stepIndex === exercises.length + 1 ? 'bg-emerald-500' : 'bg-slate-800'} transition-all"></div>
        </div>

        <!-- Card Container -->
        <div class="card-base p-6 md:p-8 space-y-6 border-indigo-500/30 bg-slate-900/90">
          
          ${stepIndex === 0 ? renderTheoryStep() : stepIndex <= exercises.length ? renderExerciseStep(exercises[stepIndex - 1], stepIndex - 1) : renderSummaryStep()}

        </div>

      </div>
    `;

    attachEvents();
  }

  function renderTheoryStep() {
    return `
      <div class="space-y-6 animate-fade-in">
        <div class="space-y-2">
          <span class="text-xs font-bold uppercase text-emerald-400 tracking-wider">Paso 1: Concepto Conversacional</span>
          <h2 class="text-2xl font-extrabold text-white">${currentLesson.title}</h2>
        </div>

        <!-- Theory Text -->
        <div class="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 space-y-4">
          <p class="text-slate-200 text-sm md:text-base leading-relaxed">${currentLesson.theory}</p>
          
          ${currentLesson.audioExample ? `
            <div class="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between gap-3">
              <div>
                <span class="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block">Escucha la Pronunciación Nativa</span>
                <span class="text-sm font-semibold text-white">"${currentLesson.audioExample}"</span>
              </div>
              <button id="play-theory-audio" class="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-indigo-600/30 shrink-0 transition-transform hover:scale-105">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          ` : ''}
        </div>

        <!-- Action Button -->
        <div class="pt-4 flex justify-end">
          <button id="next-step-btn" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all">
            <span>Comenzar Práctica Interactiva</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }

  function renderExerciseStep(exercise, index) {
    const isAnswered = userAnswers[index] !== undefined;

    return `
      <div class="space-y-6 animate-fade-in">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase text-indigo-400 tracking-wider">Ejercicio ${index + 1} de ${exercises.length}</span>
          <span class="text-xs text-slate-400">Práctica Conversacional</span>
        </div>

        <h3 class="text-lg font-bold text-white">${exercise.question}</h3>

        <!-- Exercise Types -->
        ${exercise.type === 'multiple-choice' ? renderMultipleChoice(exercise, index) : ''}
        ${exercise.type === 'sentence-builder' ? renderSentenceBuilder(exercise, index) : ''}
        ${exercise.type === 'fill-blank' ? renderFillBlank(exercise, index) : ''}

        <!-- Feedback Banner -->
        ${isGraded ? `
          <div class="p-4 rounded-xl border ${userAnswers[index].isCorrect ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/40 border-rose-500/50 text-rose-300'} space-y-1">
            <div class="flex items-center gap-2 font-bold text-sm">
              <i class="fa-solid ${userAnswers[index].isCorrect ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-rose-400'}"></i>
              <span>${userAnswers[index].isCorrect ? '¡Excelente respuesta!' : 'Respuesta incorrecta'}</span>
            </div>
            <p class="text-xs opacity-90">${exercise.explanation || ''}</p>
          </div>
        ` : ''}

        <!-- Controls -->
        <div class="pt-4 flex items-center justify-between">
          <button id="prev-step-btn" class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors">
            Anterior
          </button>

          ${!isGraded ? `
            <button id="check-answer-btn" ${!isAnswered ? 'disabled' : ''} class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all">
              Comprobar Respuesta
            </button>
          ` : `
            <button id="next-step-btn" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all">
              <span>Continuar</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          `}
        </div>
      </div>
    `;
  }

  function renderMultipleChoice(exercise, index) {
    const selected = userAnswers[index]?.answer;
    return `
      <div class="space-y-2">
        ${exercise.options.map((opt, optionIdx) => `
          <button data-opt-idx="${optionIdx}" class="option-btn w-full p-4 rounded-xl border ${selected === optionIdx ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'} text-left text-sm font-semibold transition-all flex items-center justify-between">
            <span>${opt}</span>
            <div class="w-5 h-5 rounded-full border ${selected === optionIdx ? 'border-indigo-400 bg-indigo-500' : 'border-slate-700'} flex items-center justify-center text-[10px]">
              ${selected === optionIdx ? '<i class="fa-solid fa-check text-white"></i>' : ''}
            </div>
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderSentenceBuilder(exercise, index) {
    const selectedWords = userAnswers[index]?.answerWords || [];
    const availableWords = exercise.words.filter((_, idx) => !selectedWords.includes(idx));

    return `
      <div class="space-y-4">
        <!-- Target Construction Area -->
        <div class="min-h-[60px] p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center gap-2">
          ${selectedWords.length === 0 ? '<span class="text-xs text-slate-500 italic">Toca las palabras abajo para armar la frase en orden...</span>' : ''}
          ${selectedWords.map((wordIdx, pos) => `
            <button data-remove-pos="${pos}" class="remove-word-btn px-3 py-1.5 bg-indigo-600 text-white font-semibold text-xs rounded-lg shadow-sm hover:bg-rose-600 transition-colors flex items-center gap-1.5">
              <span>${exercise.words[wordIdx]}</span>
              <i class="fa-solid fa-xmark text-[10px]"></i>
            </button>
          `).join('')}
        </div>

        <!-- Available Words Pool -->
        <div class="flex flex-wrap items-center gap-2 pt-2">
          ${exercise.words.map((word, wordIdx) => {
            const isUsed = selectedWords.includes(wordIdx);
            return `
              <button data-word-idx="${wordIdx}" ${isUsed ? 'disabled class="opacity-20 cursor-not-allowed bg-slate-800 px-3 py-1.5 text-xs rounded-lg"' : 'class="add-word-btn px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl shadow-sm transition-transform active:scale-95"'}>
                ${word}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderFillBlank(exercise, index) {
    const selected = userAnswers[index]?.answer;
    return `
      <div class="space-y-4">
        <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-base font-semibold text-slate-200">
          "${exercise.sentence.replace('___', selected ? `<strong class="text-indigo-400 underline decoration-indigo-500">${selected}</strong>` : '_______')}"
        </div>
        <div class="grid grid-cols-2 gap-3">
          ${exercise.options.map(opt => `
            <button data-blank-opt="${opt}" class="fill-opt-btn p-3 rounded-xl border ${selected === opt ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'} text-xs font-bold transition-all">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderSummaryStep() {
    let correctCount = 0;
    Object.values(userAnswers).forEach(ans => {
      if (ans.isCorrect) correctCount++;
    });

    const isPassed = correctCount >= Math.ceil(exercises.length * 0.6);
    if (isPassed) {
      storage.completeLesson(currentLesson.id, 40);
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }

    return `
      <div class="text-center space-y-6 animate-fade-in py-4">
        <div class="w-20 h-20 mx-auto rounded-3xl ${isPassed ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-amber-500/20 border border-amber-500/40 text-amber-400'} flex items-center justify-center text-4xl shadow-2xl">
          <i class="fa-solid ${isPassed ? 'fa-award animate-bounce' : 'fa-rotate-right'}"></i>
        </div>

        <div class="space-y-2 max-w-md mx-auto">
          <h2 class="text-2xl font-extrabold text-white">${isPassed ? '¡Lección Completada con Éxito!' : '¡Buen Intento! Completa la lección de nuevo'}</h2>
          <p class="text-slate-300 text-sm">
            Acertaste <strong>${correctCount}</strong> de <strong>${exercises.length}</strong> ejercicios.
          </p>
          <p class="text-xs text-indigo-400 font-bold">+40 Puntos de Experiencia (XP) Ganados</p>
        </div>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button id="retry-lesson-btn" class="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors">
            Repetir Lección
          </button>
          <button id="finish-lesson-btn" class="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-colors">
            Volver a la Ruta
          </button>
        </div>
      </div>
    `;
  }

  function attachEvents() {
    container.querySelector('#lesson-back-btn')?.addEventListener('click', () => navigateTo('roadmap'));

    // Theory audio
    container.querySelector('#play-theory-audio')?.addEventListener('click', () => {
      if (currentLesson.audioExample) speech.speak(currentLesson.audioExample);
    });

    // Navigation
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

    // Multiple Choice options
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const optIdx = parseInt(e.currentTarget.getAttribute('data-opt-idx'));
        userAnswers[stepIndex - 1] = { answer: optIdx };
        render();
      });
    });

    // Sentence builder add/remove
    container.querySelectorAll('.add-word-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const wordIdx = parseInt(e.currentTarget.getAttribute('data-word-idx'));
        const currentAns = userAnswers[stepIndex - 1]?.answerWords || [];
        userAnswers[stepIndex - 1] = { answerWords: [...currentAns, wordIdx] };
        render();
      });
    });

    container.querySelectorAll('.remove-word-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pos = parseInt(e.currentTarget.getAttribute('data-remove-pos'));
        const currentAns = userAnswers[stepIndex - 1]?.answerWords || [];
        currentAns.splice(pos, 1);
        userAnswers[stepIndex - 1] = { answerWords: currentAns };
        render();
      });
    });

    // Fill Blank options
    container.querySelectorAll('.fill-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = e.currentTarget.getAttribute('data-blank-opt');
        userAnswers[stepIndex - 1] = { answer: val };
        render();
      });
    });

    // Check Answer
    container.querySelector('#check-answer-btn')?.addEventListener('click', () => {
      const exercise = exercises[stepIndex - 1];
      let isCorrect = false;

      if (exercise.type === 'multiple-choice') {
        isCorrect = userAnswers[stepIndex - 1]?.answer === exercise.correct;
      } else if (exercise.type === 'sentence-builder') {
        const userWords = (userAnswers[stepIndex - 1]?.answerWords || []).map(i => exercise.words[i]);
        isCorrect = JSON.stringify(userWords) === JSON.stringify(exercise.correctOrder);
      } else if (exercise.type === 'fill-blank') {
        isCorrect = userAnswers[stepIndex - 1]?.answer === exercise.correct;
      }

      userAnswers[stepIndex - 1].isCorrect = isCorrect;
      isGraded = true;

      speech.playAudioFeedback(isCorrect ? 'success' : 'error');
      render();
    });

    // Summary buttons
    container.querySelector('#retry-lesson-btn')?.addEventListener('click', () => {
      stepIndex = 0;
      userAnswers = {};
      isGraded = false;
      render();
    });

    container.querySelector('#finish-lesson-btn')?.addEventListener('click', () => {
      navigateTo('roadmap');
    });
  }

  render();
}
