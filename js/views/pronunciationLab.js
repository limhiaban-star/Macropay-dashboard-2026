/**
 * Pronunciation Lab View Component
 */
import { pronunciationRules } from '../data/pronunciation.js';
import { speech } from '../utils/speech.js';

export function renderPronunciationLab(container) {
  let activeRule = pronunciationRules[0];

  function render() {
    container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Taller de Pronunciación & Connected Speech
          </div>
          <h1 class="text-3xl font-extrabold text-white">Domina el Habla Nativa e Inglés Rápido</h1>
          <p class="text-slate-400 text-sm">Entiende las contracciones cotidianas que no enseñan en los libros de texto tradicionales.</p>
        </div>

        <!-- Rules Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${pronunciationRules.map(rule => `
            <div data-id="${rule.id}" class="pron-rule-card card-base p-5 cursor-pointer border ${rule.id === activeRule.id ? 'border-amber-500/60 bg-slate-900 shadow-lg shadow-amber-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-700'} transition-all space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-400">Regla de Fonética</span>
                <i class="fa-solid fa-volume-high text-slate-500"></i>
              </div>
              <h3 class="text-base font-bold text-white">${rule.title}</h3>
              <p class="text-xs text-slate-400 line-clamp-2">${rule.description}</p>
            </div>
          `).join('')}
        </div>

        <!-- Active Rule Focus Inspector -->
        <div class="card-base p-6 md:p-8 space-y-6 border-amber-500/30 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900">
          
          <div class="space-y-2">
            <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">Análisis Fonético Detallado</span>
            <h2 class="text-2xl font-extrabold text-white pt-1">${activeRule.title}</h2>
            <p class="text-slate-300 text-sm">${activeRule.description}</p>
          </div>

          <!-- Comparison Box -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span class="text-[10px] font-bold uppercase text-slate-500">Escrito Tradicional (Formal)</span>
              <p class="text-base font-semibold text-slate-300">"${activeRule.written}"</p>
            </div>

            <div class="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
              <span class="text-[10px] font-bold uppercase text-amber-400">Cómo Suena en la Vida Real (Nativo)</span>
              <p class="text-base font-bold text-amber-200">"${activeRule.spoken}"</p>
            </div>

          </div>

          <!-- Tip Box -->
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3">
            <i class="fa-solid fa-lightbulb text-amber-400 text-lg mt-0.5 shrink-0"></i>
            <div class="space-y-1">
              <span class="text-xs font-bold text-slate-200">Consejo de Pronunciación:</span>
              <p class="text-xs text-slate-400">${activeRule.tips}</p>
            </div>
          </div>

          <!-- Play Native Audio Button -->
          <div class="flex justify-end">
            <button id="play-rule-audio" class="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all transform hover:scale-105">
              <i class="fa-solid fa-volume-high text-sm"></i>
              <span>Escuchar Pronunciación Nativa</span>
            </button>
          </div>

        </div>

      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    container.querySelectorAll('.pron-rule-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const found = pronunciationRules.find(r => r.id === id);
        if (found) {
          activeRule = found;
          render();
        }
      });
    });

    container.querySelector('#play-rule-audio')?.addEventListener('click', () => {
      speech.speak(activeRule.audioText);
    });
  }

  render();
}
