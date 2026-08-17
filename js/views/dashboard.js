/**
 * Dashboard View Component
 */
import { storage } from '../utils/storage.js';
import { monthsData } from '../data/monthsData.js';
import { speech } from '../utils/speech.js';

export function renderDashboard(container, navigateTo) {
  const userData = storage.get();
  
  // Calculate total completed lessons
  let totalLessons = 0;
  monthsData.forEach(m => m.weeks.forEach(w => totalLessons += w.lessons.length));
  const completedCount = userData.completedLessons.length;
  const overallPercentage = Math.round((completedCount / totalLessons) * 100);

  // Find next recommended lesson
  let nextLesson = null;
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
      if (nextLesson) break;
    }
    if (nextLesson) break;
  }

  if (!nextLesson) {
    nextLesson = monthsData[0].weeks[0].lessons[0];
  }

  container.innerHTML = `
    <div class="space-y-8 animate-fade-in">
      
      <!-- Hero Banner & Welcome -->
      <div class="relative overflow-hidden card-base p-6 md:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-indigo-500/30">
        <div class="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
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

          <!-- Quick Launch Next Lesson Button -->
          <button id="dashboard-start-lesson-btn" class="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
            <i class="fa-solid fa-play text-base"></i>
            <div class="text-left">
              <span class="block text-xs text-indigo-100 font-normal">Siguiente Lección Recomendada</span>
              <span class="block text-sm font-extrabold">${nextLesson.title}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Key Metrics & Confidence Gauge Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <!-- Metric 1: Conversational Confidence Index -->
        <div class="card-base p-6 flex flex-col justify-between relative overflow-hidden group">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Índice de Confianza</span>
            <div class="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <i class="fa-solid fa-gauge-high"></i>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-baseline justify-between">
              <span class="text-3xl font-extrabold text-white">${userData.confidenceScore}%</span>
              <span class="text-xs font-semibold ${userData.confidenceScore > 50 ? 'text-emerald-400' : 'text-amber-400'}">
                ${userData.confidenceScore < 30 ? 'Iniciando A1' : userData.confidenceScore < 60 ? 'Fluidez A2' : 'Fluidez B1 Intermedia'}
              </span>
            </div>
            <!-- Progress Bar -->
            <div class="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div class="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-1000" style="width: ${userData.confidenceScore}%"></div>
            </div>
            <p class="text-xs text-slate-400">Calculado por tu precisión y lecciones completadas.</p>
          </div>
        </div>

        <!-- Metric 2: 6-Month Roadmap Overall Progress -->
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
            <div class="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000" style="width: ${overallPercentage}%"></div>
            </div>
            <p class="text-xs text-slate-400">Puntos acumulados: <strong class="text-indigo-400">${userData.xp} XP</strong></p>
          </div>
        </div>

        <!-- Metric 3: Active Streak -->
        <div class="card-base p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Racha Diaria</span>
            <div class="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <i class="fa-solid fa-fire text-amber-500 animate-pulse"></i>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-white">${userData.streakDays}</span>
              <span class="text-sm font-bold text-amber-400">Días Consecutivos</span>
            </div>
            <p class="text-xs text-slate-400">Practica hoy para mantener tu racha activa y subir de nivel.</p>
          </div>
        </div>

      </div>

      <!-- Quick Action Modules -->
      <div>
        <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i class="fa-solid fa-bolt text-indigo-400"></i> Herramientas Principales
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Card 1: Simulator -->
          <div id="quick-sim-card" class="card-base card-hover p-5 cursor-pointer border-indigo-500/20 group">
            <div class="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-headset"></i>
            </div>
            <h3 class="text-base font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Simulador IA de Voz</h3>
            <p class="text-xs text-slate-400">Practica pláticas reales con diálogos de audio e interactivos.</p>
          </div>

          <!-- Card 2: Roadmap -->
          <div id="quick-roadmap-card" class="card-base card-hover p-5 cursor-pointer border-emerald-500/20 group">
            <div class="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-map-location-dot"></i>
            </div>
            <h3 class="text-base font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">Plan de 6 Meses</h3>
            <p class="text-xs text-slate-400">Explora la hoja de ruta mes a mes del nivel A1 a B1.</p>
          </div>

          <!-- Card 3: Flashcards -->
          <div id="quick-flashcards-card" class="card-base card-hover p-5 cursor-pointer border-purple-500/20 group">
            <div class="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-layer-group"></i>
            </div>
            <h3 class="text-base font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">Frases Indispensables</h3>
            <p class="text-xs text-slate-400">Tarjetas de memorización con audio para restaurant, trabajo y viajes.</p>
          </div>

          <!-- Card 4: Pronunciation -->
          <div id="quick-pron-card" class="card-base card-hover p-5 cursor-pointer border-amber-500/20 group">
            <div class="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <h3 class="text-base font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">Pronunciación Lab</h3>
            <p class="text-xs text-slate-400">Aprende 'Connected Speech' y cómo sonar como un nativo.</p>
          </div>

        </div>
      </div>

      <!-- 6-Month Roadmap Overview Cards -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-calendar-days text-emerald-400"></i> Tu Estructura de 6 Meses
          </h2>
          <button id="view-all-months-btn" class="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
            Ver Ruta Completa <i class="fa-solid fa-arrow-right ml-1"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${monthsData.map(month => {
            const completedInMonth = month.weeks.flatMap(w => w.lessons).filter(l => userData.completedLessons.includes(l.id)).length;
            const totalInMonth = month.weeks.flatMap(w => w.lessons).length;
            const pct = Math.round((completedInMonth / totalInMonth) * 100);

            return `
              <div class="card-base card-hover p-5 border-slate-800 flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-slate-800 text-indigo-300 border border-slate-700">${month.badge} • ${month.level}</span>
                    <span class="text-xs font-bold ${pct === 100 ? 'text-emerald-400' : 'text-slate-400'}">${pct}% Completado</span>
                  </div>
                  <h3 class="text-lg font-bold text-white">${month.title}</h3>
                  <p class="text-xs text-slate-400 line-clamp-2">${month.subtitle}</p>
                </div>

                <div class="space-y-2 pt-2 border-t border-slate-800/80">
                  <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r ${month.accentColor} transition-all duration-500" style="width: ${pct}%"></div>
                  </div>
                  <button data-month-id="${month.id}" class="open-month-btn w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl transition-colors">
                    Ver Lecciones del Mes ${month.id}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

    </div>
  `;

  // Attach Event Handlers
  container.querySelector('#dashboard-start-lesson-btn')?.addEventListener('click', () => {
    navigateTo('lesson', { lessonId: nextLesson.id, month: nextMonth, week: nextWeek });
  });

  container.querySelector('#quick-sim-card')?.addEventListener('click', () => navigateTo('simulator'));
  container.querySelector('#quick-roadmap-card')?.addEventListener('click', () => navigateTo('roadmap'));
  container.querySelector('#quick-flashcards-card')?.addEventListener('click', () => navigateTo('flashcards'));
  container.querySelector('#quick-pron-card')?.addEventListener('click', () => navigateTo('pronunciation'));
  container.querySelector('#view-all-months-btn')?.addEventListener('click', () => navigateTo('roadmap'));

  container.querySelectorAll('.open-month-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const monthId = parseInt(e.currentTarget.getAttribute('data-month-id'));
      navigateTo('roadmap', { openMonthId: monthId });
    });
  });
}
