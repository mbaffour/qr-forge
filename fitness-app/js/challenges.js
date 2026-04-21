const Challenges = (() => {

  const DEFINITIONS = [
    {
      id: 'week3full',
      title: '3 Full-Body Workouts',
      description: 'Complete 3 workouts this week that each hit at least 3 different muscle groups.',
      target: 3,
      period: 'week',
      check: logs => {
        const week = weekLogs(logs);
        const byDate = groupByDate(week);
        let count = 0;
        for (const entries of Object.values(byDate)) {
          const groups = new Set(entries.map(e => Training.getMuscleGroup(e.exercise)).filter(Boolean));
          if (groups.size >= 3) count++;
        }
        return count;
      }
    },
    {
      id: 'streak5',
      title: '5-Day Streak',
      description: 'Log at least one exercise for 5 consecutive days.',
      target: 5,
      period: 'streak',
      check: () => Training.getStreak()
    },
    {
      id: 'pr3',
      title: 'Set 3 Personal Records',
      description: 'Beat your personal best on 3 different exercises.',
      target: 3,
      period: 'all',
      check: () => Object.keys(Storage.getPRs()).length
    },
    {
      id: 'legs3',
      title: 'Leg Day Consistency',
      description: 'Complete 3 leg workouts this month.',
      target: 3,
      period: 'month',
      check: logs => {
        const month = monthLogs(logs);
        const legDays = new Set(
          month.filter(l => Training.getMuscleGroup(l.exercise) === 'legs').map(l => l.date)
        );
        return legDays.size;
      }
    },
    {
      id: 'mobility5',
      title: 'Mobility Week',
      description: 'Complete 5 mobility or yoga exercises this week.',
      target: 5,
      period: 'week',
      check: logs => {
        const week = weekLogs(logs);
        const ex = week.filter(l => {
          const found = EXERCISE_LIBRARY.find(e => e.name === l.exercise);
          return found && found.category === 'mobility';
        });
        return ex.length;
      }
    },
    {
      id: 'volume50',
      title: 'Volume Beast',
      description: 'Log 50 total sets in a single week.',
      target: 50,
      period: 'week',
      check: logs => weekLogs(logs).reduce((s, l) => s + (parseInt(l.sets) || 0), 0)
    }
  ];

  function weekLogs(logs) {
    const cutoff = Date.now() - 7 * 86400000;
    return logs.filter(l => new Date(l.date).getTime() >= cutoff);
  }

  function monthLogs(logs) {
    const now = new Date();
    return logs.filter(l => {
      const d = new Date(l.date);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });
  }

  function groupByDate(logs) {
    return logs.reduce((acc, l) => {
      (acc[l.date] = acc[l.date] || []).push(l);
      return acc;
    }, {});
  }

  function evaluate() {
    const logs = Storage.getLogs();
    const saved = Storage.getChallenges();
    return DEFINITIONS.map(def => {
      const progress = Math.min(def.check(logs), def.target);
      const complete = progress >= def.target;
      if (complete && !saved[def.id]) {
        saved[def.id] = { completedAt: new Date().toISOString() };
        Storage.setChallenges(saved);
      }
      return { ...def, progress, complete };
    });
  }

  return { DEFINITIONS, evaluate };
})();
