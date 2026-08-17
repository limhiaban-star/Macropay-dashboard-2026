/**
 * Flashcards & Key Phrases View Component
 */
import { phrasebook } from '../data/phrasebook.js';
import { speech } from '../utils/speech.js';
import { storage } from '../utils/storage.js';

export function renderFlashcards(container) {
  const userData = storage.get();
  let activeCategory = 'all';
  let cardIndex = 0;
  let isFlipped = false;

  // Flatten all phrases or filter by category
  function getFilteredPhrases() {
    let all = [];
    phrasebook.forEach(cat => {
      if (activeCategory === 'all' || activeCategory === cat.category || (activeCategory === 'favorites' && userData.favoritePhrases.includes(p.id))) {
        cat.phrases.forEach(p => all.push({ ...p, categoryName: cat.category }));
      }
    });

    if (activeCategory === 'favorites') {
      all = [];
      phrasebook.forEach(cat => {
        cat.phrases.forEach(p => {
          if (userData.favoritePhrases.includes(p.id)) {
            all.push({ ...p, categoryName: cat.category });
          }
        });
      });
    }

    return all;
  }

  function render() {
    const phrases = getFilteredPhrases();
    if (cardIndex >= phrases.length) cardIndex = 0;
    const currentCard = phrases[cardIndex];

    container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <i class="fa-solid fa-layer-group"></i> Tarjetas de Memorización Flashcards
          </div>
          <h1 class="text-3xl font-extrabold text-white">Frases Indispensables con Audio</h1>
          <p class="text-slate-400 text-sm">Toca la tarjeta para voltearla y escuchar la pronunciación nativa.</p>
        </div>

        <!-- Categories Filter -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button data-cat="all" class="cat-btn flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${activeCategory === 'all' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'}">
            Todas
          </button>
          <button data-cat="favorites" class="cat-btn flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${activeCategory === 'favorites' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-amber-400 border border-slate-800'}">
            <i class="fa-solid fa-star"></i> Favoritas (${userData.favoritePhrases.length})
          </button>
          ${phrasebook.map(cat => `
            <button data-cat="${cat.category}" class="cat-btn flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${activeCategory === cat.category ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'}">
              <i class="fa-solid ${cat.icon}"></i> ${cat.category}
            </button>
          `).join('')}
        </div>

        ${phrases.length === 0 ? `
          <div class="card-base p-12 text-center space-y-3">
            <i class="fa-solid fa-folder-open text-4xl text-slate-600"></i>
            <h3 class="text-lg font-bold text-white">No hay frases en esta categoría</h3>
            <p class="text-xs text-slate-400">Marca tarjetas con la estrella para guardarlas en tus favoritas.</p>
          </div>
        ` : `
          <!-- 3D Flashcard Deck Container -->
          <div class="space-y-6">
            
            <div class="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Tarjeta ${cardIndex + 1} de ${phrases.length}</span>
              <span class="text-purple-400">${currentCard.categoryName}</span>
            </div>

            <!-- Card Element with 3D Flip -->
            <div id="flashcard-container" class="w-full h-80 perspective-1000 cursor-pointer">
              <div id="flashcard-inner" class="flashcard-inner ${isFlipped ? 'flipped' : ''}">
                
                <!-- Front Side (English) -->
                <div class="flashcard-front card-base border-purple-500/30 bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 shadow-2xl relative">
                  <span class="absolute top-4 left-4 text-[10px] uppercase font-bold text-purple-400 tracking-wider">Inglés (Toca para traducir)</span>
                  <button data-id="${currentCard.id}" class="fav-card-btn absolute top-4 right-4 text-lg ${userData.favoritePhrases.includes(currentCard.id) ? 'text-amber-400' : 'text-slate-600 hover:text-amber-400'}">
                    <i class="fa-solid fa-star"></i>
                  </button>

                  <div class="text-center space-y-4 max-w-md">
                    <h2 class="text-2xl md:text-3xl font-extrabold text-white leading-snug">"${currentCard.en}"</h2>
                  </div>

                  <button id="card-speech-btn" class="mt-6 px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                    <i class="fa-solid fa-volume-high"></i> Escuchar Pronunciación
                  </button>
                </div>

                <!-- Back Side (Spanish & Context) -->
                <div class="flashcard-back card-base border-emerald-500/30 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 shadow-2xl relative">
                  <span class="absolute top-4 left-4 text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Traducción al Español</span>
                  
                  <div class="text-center space-y-3 max-w-md">
                    <h2 class="text-2xl md:text-3xl font-extrabold text-emerald-300 leading-snug">"${currentCard.es}"</h2>
                    ${currentCard.context ? `<p class="text-xs text-slate-300 italic">${currentCard.context}</p>` : ''}
                  </div>
                </div>

              </div>
            </div>

            <!-- Controls -->
            <div class="flex items-center justify-between gap-4">
              <button id="prev-card-btn" class="px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors">
                <i class="fa-solid fa-arrow-left"></i> Anterior
              </button>

              <button id="flip-card-btn" class="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition-colors">
                Voltear Tarjeta
              </button>

              <button id="next-card-btn" class="px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors">
                Siguiente <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>

          </div>
        `}

      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    container.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeCategory = e.currentTarget.getAttribute('data-cat');
        cardIndex = 0;
        isFlipped = false;
        render();
      });
    });

    const cardContainer = container.querySelector('#flashcard-container');
    if (cardContainer) {
      cardContainer.addEventListener('click', (e) => {
        if (e.target.closest('#card-speech-btn') || e.target.closest('.fav-card-btn')) return;
        isFlipped = !isFlipped;
        render();
      });
    }

    container.querySelector('#flip-card-btn')?.addEventListener('click', () => {
      isFlipped = !isFlipped;
      render();
    });

    const phrases = getFilteredPhrases();

    container.querySelector('#card-speech-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (phrases[cardIndex]) speech.speak(phrases[cardIndex].en);
    });

    container.querySelector('.fav-card-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.currentTarget.getAttribute('data-id');
      storage.toggleFavoritePhrase(id);
      render();
    });

    container.querySelector('#prev-card-btn')?.addEventListener('click', () => {
      if (cardIndex > 0) cardIndex--;
      else cardIndex = phrases.length - 1;
      isFlipped = false;
      render();
    });

    container.querySelector('#next-card-btn')?.addEventListener('click', () => {
      if (cardIndex < phrases.length - 1) cardIndex++;
      else cardIndex = 0;
      isFlipped = false;
      render();
    });
  }

  render();
}
