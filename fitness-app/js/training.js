const Training = (() => {

  const MODES = {
    strength:    { sets: 5, reps: 5,  rest: '3–5 min', label: 'Heavy & low rep — build raw strength' },
    hypertrophy: { sets: 4, reps: 10, rest: '60–90 s',  label: 'Moderate weight, higher volume — build muscle' },
    endurance:   { sets: 3, reps: 20, rest: '30–45 s',  label: 'Light weight, high reps — muscular endurance' },
    recovery:    { sets: 2, reps: 15, rest: '45–60 s',  label: 'Easy effort — active recovery & mobility' }
  };

  const MUSCLE_GROUPS = {
    "Barbell Squat": "legs", "Bodyweight Squat": "legs", "Leg Press": "legs",
    "Romanian Deadlift": "legs", "Dumbbell Lunges": "legs", "Hip Thrust": "legs",
    "Glute Bridge": "legs", "Pigeon Pose": "legs", "Standing Hamstring Stretch": "legs",
    "Hip 90/90 Stretch": "legs",
    "Bench Press": "chest", "Incline Dumbbell Press": "chest", "Push-Up": "chest",
    "Dip": "chest", "Doorway Chest Stretch": "chest",
    "Deadlift": "back", "Barbell Row": "back", "Cable Row": "back",
    "Lat Pulldown": "back", "Pull-Up": "back", "Chin-Up": "back",
    "Australian Row": "back", "Thoracic Rotation": "back",
    "Overhead Press": "shoulders", "Pike Push-Up": "shoulders",
    "Dumbbell Bicep Curl": "arms", "Tricep Pushdown": "arms",
    "Plank": "core", "Hollow Body Hold": "core",
    "Cat-Cow": "full body", "World's Greatest Stretch": "full body",
    "Child's Pose": "full body"
  };

  function getMuscleGroup(exerciseName) {
    if (MUSCLE_GROUPS[exerciseName]) return MUSCLE_GROUPS[exerciseName];
    const ex = EXERCISE_LIBRARY.find(e => e.name.toLowerCase() === exerciseName.toLowerCase());
    return ex ? ex.muscleGroup : null;
  }

  function getLogsLast7Days() {
    const cutoff = Date.now() - 7 * 86400000;
    return Storage.getLogs().filter(l => new Date(l.date).getTime() >= cutoff);
  }

  function groupedByDate(logs) {
    return logs.reduce((acc, l) => {
      (acc[l.date] = acc[l.date] || []).push(l);
      return acc;
    }, {});
  }

  function recentMuscleGroups() {
    const recent = getLogsLast7Days();
    const byDate = groupedByDate(recent);
    const result = {};
    Object.keys(byDate).sort().slice(-2).forEach(date => {
      byDate[date].forEach(l => {
        const mg = getMuscleGroup(l.exercise);
        if (mg) result[mg] = date;
      });
    });
    return result;
  }

  function getSuggestion(exerciseName, mode) {
    const logs = Storage.getLogs().filter(l =>
      l.exercise.toLowerCase() === exerciseName.toLowerCase() && l.weight > 0
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    const params = MODES[mode] || MODES.strength;
    if (!logs.length) return null;

    const last = logs[0];
    const increment = last.weight >= 60 ? 2.5 : 1.25;
    const suggestedWeight = +(last.weight + increment).toFixed(2);

    return {
      sets: params.sets,
      reps: params.reps,
      weight: suggestedWeight,
      lastWeight: last.weight,
      lastDate: last.date
    };
  }

  function getDailyRecommendation(mode) {
    const recentGroups = recentMuscleGroups();
    const allGroups = ['chest', 'back', 'shoulders', 'legs', 'arms', 'core'];
    const rested = allGroups.filter(g => !recentGroups[g]);
    const targetGroup = rested.length > 0
      ? rested[Math.floor(Math.random() * rested.length)]
      : allGroups[new Date().getDay() % allGroups.length];

    const candidates = EXERCISE_LIBRARY.filter(e => {
      if (mode === 'recovery') return e.category === 'mobility';
      return e.muscleGroup === targetGroup && e.category !== 'mobility';
    });

    if (!candidates.length) return null;

    const logs = Storage.getLogs();
    const loggedToday = new Set(
      logs.filter(l => l.date === new Date().toISOString().slice(0, 10)).map(l => l.exercise)
    );

    const fresh = candidates.filter(e => !loggedToday.has(e.name));
    const pick = fresh.length ? fresh[Math.floor(Math.random() * fresh.length)] : candidates[0];
    const params = MODES[mode] || MODES.strength;
    const suggestion = getSuggestion(pick.name, mode);

    return {
      exercise: pick,
      sets: params.sets,
      reps: params.reps,
      suggestedWeight: suggestion ? suggestion.weight : null,
      reason: rested.includes(targetGroup)
        ? `${targetGroup} hasn't been trained in the last 2 days — good time to hit it.`
        : `Rotating through all muscle groups for balanced development.`
    };
  }

  function getStreak() {
    const logs = Storage.getLogs();
    if (!logs.length) return 0;
    const dates = [...new Set(logs.map(l => l.date))].sort().reverse();
    let streak = 0;
    let cur = new Date();
    cur.setHours(0, 0, 0, 0);
    for (const d of dates) {
      const day = new Date(d);
      day.setHours(0, 0, 0, 0);
      const diff = (cur - day) / 86400000;
      if (diff <= 1) { streak++; cur = day; }
      else break;
    }
    return streak;
  }

  return { MODES, getSuggestion, getDailyRecommendation, getStreak, getMuscleGroup };
})();
