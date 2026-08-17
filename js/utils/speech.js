/**
 * Speech Engine & Sound Effects Utility
 * Handles Web Speech API (Text-to-Speech & Speech Recognition)
 */

class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.selectedVoice = null;
    this.rate = 0.95; // Slightly slower for clear English learning
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
    
    // Prefer US or UK native English voices
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
    if (found) {
      this.selectedVoice = found;
    }
  }

  setRate(rateVal) {
    this.rate = parseFloat(rateVal);
  }

  speak(text, onEndCallback = null) {
    if (!this.isSupported) {
      console.warn("Web Speech API not supported in this browser.");
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    if (!text || text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.lang = 'en-US';
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    if (onEndCallback) {
      utterance.onend = onEndCallback;
    }

    this.synth.speak(utterance);
  }

  stop() {
    if (this.isSupported) {
      this.synth.cancel();
    }
  }

  // Synthesize pleasant Web Audio API feedback sounds
  playAudioFeedback(type = 'success') {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'success') {
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
        osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35); // C6

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.5);
      } else if (type === 'error') {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.linearRampToValueAtTime(150, now + 0.2);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {
      console.log("Audio synthesis notice:", e);
    }
  }

  // Web Speech Recognition for mic input
  startListening(onResult, onError) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (onError) onError("El reconocimiento de voz no está soportado en este navegador. Usa Google Chrome o Edge.");
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

export const speech = new SpeechEngine();
