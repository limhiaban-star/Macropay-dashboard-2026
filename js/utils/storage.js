/**
 * Storage Utility for persisting user progress, XP, streak, completed lessons, favorites.
 */

const STORAGE_KEY = 'fluent_in_6_user_data_v1';

const defaultUserData = {
  currentMonth: 1,
  currentWeek: 1,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 120,
  completedLessons: ['m1w1l1'],
  favoritePhrases: ['p1', 'p3'],
  confidenceScore: 25, // 0 to 100 percentage
  theme: 'dark',
  audioRate: 0.95
};

export const storage = {
  get() {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (!item) {
        this.save(defaultUserData);
        return { ...defaultUserData };
      }
      return { ...defaultUserData, ...JSON.parse(item) };
    } catch (e) {
      console.error("Storage error:", e);
      return { ...defaultUserData };
    }
  },

  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save storage:", e);
    }
  },

  addXP(points) {
    const data = this.get();
    data.xp = (data.xp || 0) + points;
    // Calculate new confidence score based on XP and completed lessons
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
      this.updateStreak(data);
      this.save(data);
    }
    return data;
  },

  updateStreak(data) {
    const today = new Date().toISOString().split('T')[0];
    if (data.lastActiveDate !== today) {
      const lastDate = new Date(data.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        data.streakDays = (data.streakDays || 0) + 1;
      } else if (diffDays > 1) {
        data.streakDays = 1;
      }
      data.lastActiveDate = today;
    }
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
