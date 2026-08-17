/**
 * Simulator View Component - AI Conversation Roleplay Simulator
 */
import { conversations } from '../data/conversations.js';
import { speech } from '../utils/speech.js';
import { storage } from '../utils/storage.js';

export function renderSimulator(container, navigateTo) {
  let activeConversation = conversations[0];
  let conversationHistory = [];
  let currentStepOptions = [];
  let isRecording = false;
  let recognitionInstance = null;

  function initScenario(scenario) {
    activeConversation = scenario;
    conversationHistory = [
      {
        sender: 'ai',
        name: scenario.characterName,
        avatar: scenario.avatar,
        text: scenario.initialMessage,
        translation: scenario.initialTranslation,
        audio: scenario.audioPrompt
      }
    ];
    currentStepOptions = scenario.options;
    
    // Auto speak initial AI message
    speech.speak(scenario.initialMessage);
  }

  initScenario(conversations[0]);

  function render() {
    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <i class="fa-solid fa-headset"></i> Simulador de Conversación con Voz
            </div>
            <h1 class="text-3xl font-extrabold text-white">Práctica de Rol en Situaciones Reales</h1>
            <p class="text-slate-400 text-sm">Escucha la voz nativa en inglés, selecciona o graba tus respuestas con el micrófono.</p>
          </div>

          <!-- Scenario Selector Dropdown -->
          <div class="shrink-0">
            <select id="scenario-select" class="bg-slate-900 border border-slate-700 text-white font-bold text-xs rounded-xl p-3 focus:outline-none focus:border-indigo-500 cursor-pointer">
              ${conversations.map(c => `
                <option value="${c.id}" ${c.id === activeConversation.id ? 'selected' : ''}>
                  ${c.title} (${c.difficulty})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Main Chat Box Container -->
        <div class="card-base border-indigo-500/30 bg-slate-900/90 overflow-hidden flex flex-col h-[550px]">
          
          <!-- Chat Header Bar -->
          <div class="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <img src="${activeConversation.avatar}" alt="Avatar" class="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow-md">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  ${activeConversation.characterName}
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <span class="text-[11px] text-slate-400">${activeConversation.title}</span>
              </div>
            </div>

            <button id="restart-sim-btn" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5">
              <i class="fa-solid fa-rotate-left text-[10px]"></i> Reiniciar
            </button>
          </div>

          <!-- Messages Stream -->
          <div id="chat-messages" class="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
            ${conversationHistory.map((msg, idx) => `
              <div class="flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-3 animate-fade-in">
                ${msg.sender === 'ai' ? `
                  <img src="${msg.avatar}" class="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0 mt-1">
                ` : ''}

                <div class="max-w-lg space-y-1">
                  <div class="p-4 rounded-2xl ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai text-slate-100'} shadow-md relative group">
                    <p class="text-sm font-medium leading-relaxed">${msg.text}</p>
                    <p class="text-xs text-slate-400/90 pt-1 border-t border-white/10 mt-1.5">${msg.translation}</p>

                    ${msg.audio ? `
                      <button data-msg-audio="${msg.audio}" class="play-msg-audio text-xs text-indigo-300 hover:text-white mt-1.5 inline-flex items-center gap-1 font-bold">
                        <i class="fa-solid fa-volume-high"></i> Escuchar
                      </button>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Interaction Input / Options Panel -->
          <div class="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
            <span class="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">Tu Respuesta (Selecciona o usa el Micrófono)</span>

            ${currentStepOptions && currentStepOptions.length > 0 ? `
              <div class="space-y-2">
                ${currentStepOptions.map((opt, optIdx) => `
                  <button data-opt-idx="${optIdx}" class="sim-option-btn w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500 rounded-xl text-left transition-all group flex items-center justify-between gap-3">
                    <div>
                      <span class="block text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">"${opt.text}"</span>
                      <span class="block text-xs text-slate-400">${opt.translation}</span>
                    </div>
                    <i class="fa-solid fa-chevron-right text-xs text-slate-500 group-hover:text-indigo-400 transition-colors"></i>
                  </button>
                `).join('')}
              </div>
            ` : `
              <div class="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center space-y-2">
                <i class="fa-solid fa-circle-check text-emerald-400 text-2xl"></i>
                <h4 class="text-sm font-bold text-white">¡Excelente conversación completada!</h4>
                <p class="text-xs text-slate-300">+50 Puntos de Experiencia (XP) agregados a tu perfil.</p>
              </div>
            `}

            <!-- Voice Record Mic Button -->
            <div class="flex items-center justify-between pt-1">
              <button id="mic-record-btn" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors">
                <i class="fa-solid fa-microphone ${isRecording ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}"></i>
                <span>${isRecording ? 'Escuchando tu voz...' : 'Practicar Pronunciación con Micrófono'}</span>
              </button>
              <span id="mic-status" class="text-[11px] text-slate-500 italic"></span>
            </div>

          </div>

        </div>

      </div>
    `;

    attachEvents();
    scrollChatBottom();
  }

  function scrollChatBottom() {
    const chatMsgBox = container.querySelector('#chat-messages');
    if (chatMsgBox) chatMsgBox.scrollTop = chatMsgBox.scrollHeight;
  }

  function attachEvents() {
    container.querySelector('#scenario-select')?.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      const found = conversations.find(c => c.id === selectedId);
      if (found) {
        initScenario(found);
        render();
      }
    });

    container.querySelector('#restart-sim-btn')?.addEventListener('click', () => {
      initScenario(activeConversation);
      render();
    });

    container.querySelectorAll('.play-msg-audio').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.currentTarget.getAttribute('data-msg-audio');
        speech.speak(text);
      });
    });

    // Option selections
    container.querySelectorAll('.sim-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const optIdx = parseInt(e.currentTarget.getAttribute('data-opt-idx'));
        const selectedOpt = currentStepOptions[optIdx];

        if (!selectedOpt) return;

        // Push User Message
        conversationHistory.push({
          sender: 'user',
          text: selectedOpt.text,
          translation: selectedOpt.translation,
          audio: selectedOpt.audio
        });

        // Push Next AI Response
        if (selectedOpt.nextResponse) {
          conversationHistory.push({
            sender: 'ai',
            name: activeConversation.characterName,
            avatar: activeConversation.avatar,
            text: selectedOpt.nextResponse,
            translation: selectedOpt.nextTranslation,
            audio: selectedOpt.nextAudio
          });

          speech.speak(selectedOpt.nextAudio);
        }

        currentStepOptions = selectedOpt.options || [];

        if (selectedOpt.isEnd) {
          storage.addXP(selectedOpt.xpReward || 50);
          try {
            confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
          } catch (e) {}
        }

        render();
      });
    });

    // Microphone speech recognition
    container.querySelector('#mic-record-btn')?.addEventListener('click', () => {
      const statusEl = container.querySelector('#mic-status');
      if (isRecording) {
        isRecording = false;
        render();
        return;
      }

      isRecording = true;
      if (statusEl) statusEl.textContent = "Di tu respuesta en inglés...";

      recognitionInstance = speech.startListening(
        (transcript) => {
          isRecording = false;
          if (statusEl) statusEl.textContent = `Escuchado: "${transcript}"`;

          // Match recognized speech to available options if close
          if (currentStepOptions && currentStepOptions.length > 0) {
            const firstOpt = currentStepOptions[0];
            conversationHistory.push({
              sender: 'user',
              text: transcript,
              translation: "(Reconocimiento de voz por micrófono)",
              audio: transcript
            });

            if (firstOpt.nextResponse) {
              conversationHistory.push({
                sender: 'ai',
                name: activeConversation.characterName,
                avatar: activeConversation.avatar,
                text: firstOpt.nextResponse,
                translation: firstOpt.nextTranslation,
                audio: firstOpt.nextAudio
              });
              speech.speak(firstOpt.nextAudio);
            }

            currentStepOptions = firstOpt.options || [];
          }

          render();
        },
        (err) => {
          isRecording = false;
          if (statusEl) statusEl.textContent = err;
        }
      );
    });
  }

  render();
}
