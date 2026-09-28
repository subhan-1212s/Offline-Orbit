// streakTracker.js - Dynamic Real-Time Streak Tracking for Offline-Orbit

/**
 * Calculates current active streak in real-time based on actual user activity timestamps.
 * A streak increments only when the user is active on consecutive calendar days.
 * If user is active today, streak counts consecutive days up to today.
 * If user was active yesterday but not yet today, streak is held from yesterday.
 * If user missed more than 1 day, streak resets to 1 upon today's activity.
 */
export const getDynamicStreak = (userId = 'current') => {
  try {
    const key = `orbit_active_dates_${userId}`;
    const raw = localStorage.getItem(key);
    let dates = raw ? JSON.parse(raw) : [];

    // Also pull activity dates from quiz history
    try {
      const quizHistory = JSON.parse(localStorage.getItem('orbit_quiz_history') || '[]');
      quizHistory.forEach(q => {
        if (q.timestamp) {
          const dStr = new Date(q.timestamp).toISOString().split('T')[0];
          if (!dates.includes(dStr)) dates.push(dStr);
        }
      });
    } catch (e) {}

    // Sort descending (latest date first)
    dates = Array.from(new Set(dates)).filter(Boolean).sort().reverse();

    if (dates.length === 0) {
      // First day on platform! Dynamic streak is 1
      return 1;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const mostRecentDate = dates[0];

    // If most recent activity is older than yesterday, streak has reset to 1
    if (mostRecentDate !== todayStr && mostRecentDate !== yesterdayStr) {
      return 1;
    }

    // Count consecutive days backward from the most recent active day
    let streak = 0;
    let expectedDate = new Date(mostRecentDate);
    expectedDate.setHours(0, 0, 0, 0);

    for (const dateStr of dates) {
      const currentDate = new Date(dateStr);
      currentDate.setHours(0, 0, 0, 0);

      const diffDays = Math.round((expectedDate - currentDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        streak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break; // Gap detected in consecutive days
      }
    }

    return Math.max(1, streak);
  } catch (err) {
    console.warn('Error calculating dynamic streak:', err);
    return 1;
  }
};

/**
 * Records an activity for today and returns the updated dynamic streak
 */
export const recordDailyActivity = (userId = 'current') => {
  try {
    const key = `orbit_active_dates_${userId}`;
    const raw = localStorage.getItem(key);
    let dates = raw ? JSON.parse(raw) : [];
    const todayStr = new Date().toISOString().split('T')[0];

    if (!dates.includes(todayStr)) {
      dates.push(todayStr);
      dates.sort().reverse();
      localStorage.setItem(key, JSON.stringify(dates));
    }

    return getDynamicStreak(userId);
  } catch (err) {
    return 1;
  }
};
