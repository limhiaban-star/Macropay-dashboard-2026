/**
 * Roadmap View Component - 6 Months Journey Map
 */
import { monthsData } from '../data/monthsData.js';
import { storage } from '../utils/storage.js';
import { speech } from '../utils/speech.js';

export function renderRoadmap(container, navigateTo, params = {}) {
  const userData = storage.get();
  let expandedMonth = params.openMonthId || 1;

  function render() {
    container.innerHTML = `
      <div class="space-y-8 animate-fade-in">
        
        <!-- Header -->
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <i class="fa-solid fa-map"></i> Plan de Estudio Estructurado
          </div>
          <h1 class="text-3xl font-extrabold text-white">Ruta de Aprendizaje en 6 Meses</h1>
          <p class="text-slate-400 text-sm max-w-2xl">
            Cada mes desarrolla una competencia conversacional específica. Haz clic en cualquier mes para explorar sus semanas y lecciones.
          </p>
        </div>

        <!-- Month Navigation Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${monthsData.map(m => `
            <button data-month="${m.id}" class="month-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${m.id === expandedMonth ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'}">
              <span>${m.badge}</span>
              <span class="opacity-80">(${m.level})</span>
            </button>
          `).join('')}
        </div>

        <!-- Selected Month Content Drawer -->
        ${(() => {
          const month = monthsData.find(m => m.id === expandedMonth) || monthsData[0];
          return `
            <div class="card-base p-6 md:p-8 space-y-6 border-indigo-500/30 bg-gradient-to-b from-slate-900 to-slate-950">
              
              <!-- Month Header Info -->
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div class="space-y-1">
                  <span class="px-3 py-1 rounded-full text-xs font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">${month.badge} • ${month.level}</span>
                  <h2 class="text-2xl font-extrabold text-white pt-2">${month.title}</h2>
                  <p class="text-slate-300 text-sm">${month.subtitle}</p>
                  <p class="text-slate-400 text-xs pt-1">${month.description}</p>
                </div>
              </div>

              <!-- Weeks List -->
              <div class="space-y-6">
                ${month.weeks.map(week => `
                  <div class="card-base p-5 bg-slate-900/90 border-slate-800 space-y-4">
                    
                    <!-- Week Title & Goal -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                      <div>
                        <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Semana ${week.weekNumber}</span>
                        <h3 class="text-base font-bold text-white">${week.title}</h3>
                      </div>
                      <span class="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                        <i class="fa-solid fa-graduation-cap text-indigo-400 mr-1"></i> ${week.grammarFocus}
                      </span>
                    </div>

                    <!-- Key Conversational Phrases Preview -->
                    <div class="space-y-2">
                      <span class="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">Frases Clave de la Semana</span>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        ${week.keyPhrases.map(phrase => `
                          <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between gap-2">
                            <div class="text-xs">
                              <span class="block font-semibold text-slate-200">${phrase.en}</span>
                              <span class="block text-[11px] text-slate-400">${phrase.es}</span>
                            </div>
                            <button data-audio="${phrase.audio}" class="play-phrase-btn w-7 h-7 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 flex items-center justify-center text-xs shrink-0 transition-colors">
                              <i class="fa-solid fa-volume-high"></i>
                            </button>
                          </div>
                        `).join('')}
                      </div>
                    </div>

                    <!-- Lessons List in this Week -->
                    <div class="space-y-2 pt-2">
                      <span class="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">Lecciones Prácticas</span>
                      <div class="space-y-2">
                        ${week.lessons.map(lesson => {
                          const isCompleted = userData.completedLessons.includes(lesson.id);
                          return `
                            <div class="p-3.5 rounded-xl bg-slate-950 border ${isCompleted ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'} flex items-center justify-between gap-4">
                              <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full ${isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'} flex items-center justify-center text-sm font-bold shrink-0">
                                  ${isCompleted ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-book-open"></i>'}
                                </div>
                                <div>
                                  <h4 class="text-sm font-bold text-white">${lesson.title}</h4>
                                  <p class="text-xs text-slate-400 line-clamp-1">${lesson.theory.substring(0, 80)}...</p>
                                </div>
                              </div>

                              <button data-lesson-id="${lesson.id}" class="start-lesson-btn px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5">
                                <span>${isCompleted ? 'Repasar' : 'Comenzar'}</span>
                                <i class="fa-solid fa-chevron-right text-[10px]"></i>
                              </button>
                            </div>
                          `;
                        }).join('')}
                      </div>
                    </div>

                  </div>
                `).join('')}
              </div>

            </div>
          `;
        })()}

      </div>
    `;

    // Handlers
    container.querySelectorAll('.month-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        expandedMonth = parseInt(e.currentTarget.getAttribute('data-month'));
        render();
      });
    });

    container.querySelectorAll('.play-phrase-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.currentTarget.getAttribute('data-audio');
        speech.speak(text);
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

        if (foundLesson) {
          navigateTo('lesson', { lessonId, month: foundMonth, week: foundWeek });
        }
      });
    });
  }

  render();
}
