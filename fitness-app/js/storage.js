const Storage = (() => {
  const KEYS = {
    logs: 'ff_logs',
    prs: 'ff_prs',
    challenges: 'ff_challenges',
    settings: 'ff_settings'
  };

  const get = key => {
    try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; }
  };
  const set = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  return {
    getLogs: () => get(KEYS.logs) || [],
    setLogs: logs => set(KEYS.logs, logs),
    addLog: entry => {
      const logs = get(KEYS.logs) || [];
      logs.push(entry);
      set(KEYS.logs, logs);
    },
    deleteLog: id => {
      const logs = (get(KEYS.logs) || []).filter(l => l.id !== id);
      set(KEYS.logs, logs);
    },

    getPRs: () => get(KEYS.prs) || {},
    setPR: (exercise, value) => {
      const prs = get(KEYS.prs) || {};
      prs[exercise] = value;
      set(KEYS.prs, prs);
    },
    checkAndSetPR: (exercise, weight) => {
      const prs = get(KEYS.prs) || {};
      const current = prs[exercise] || 0;
      if (weight > current) {
        prs[exercise] = weight;
        set(KEYS.prs, prs);
        return true;
      }
      return false;
    },

    getChallenges: () => get(KEYS.challenges) || {},
    setChallenges: data => set(KEYS.challenges, data),

    getSettings: () => get(KEYS.settings) || { theme: 'dark', mode: 'strength' },
    saveSetting: (key, val) => {
      const s = get(KEYS.settings) || {};
      s[key] = val;
      set(KEYS.settings, s);
    },

    exportAll: () => ({
      logs: get(KEYS.logs) || [],
      prs: get(KEYS.prs) || {},
      challenges: get(KEYS.challenges) || {},
      settings: get(KEYS.settings) || {},
      exportedAt: new Date().toISOString()
    }),

    importAll: data => {
      if (data.logs) set(KEYS.logs, data.logs);
      if (data.prs) set(KEYS.prs, data.prs);
      if (data.challenges) set(KEYS.challenges, data.challenges);
      if (data.settings) set(KEYS.settings, data.settings);
    }
  };
})();
