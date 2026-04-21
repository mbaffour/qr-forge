(() => {
  // ── State ──
  let currentView = 'dashboard';
  let currentMode = 'strength';
  let currentTheme = 'dark';
  let selectedExerciseForModal = null;

  // ── Init ──
  function init() {
    const settings = Storage.getSettings();
    currentMode = settings.mode || 'strength';
    currentTheme = settings.theme || 'dark';
    applyTheme(currentTheme);
    setMode(currentMode, false);
    setLogDate();
    populateExerciseDatalist();
    bindNav();
    bindLogForm();
    bindModeSelector();
    bindThemeToggle();
    bindExportImport();
    bindHistoryFilter();
    bindLibrary();
    bindProgressSelect();
    renderView('dashboard');
  }

  // ── Navigation ──
  function bindNav() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderView(btn.dataset.view);
      });
    });
  }

  function renderView(view) {
    currentView = view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const el = document.getElementById(`view-${view}`);
    if (el) el.classList.add('active');

    if (view === 'dashboard') renderDashboard();
    else if (view === 'log') renderLog();
    else if (view === 'library') renderLibrary();
    else if (view === 'progress') renderProgress();
    else if (view === 'challenges') renderChallenges();
  }

  // ── Theme ──
  function applyTheme(theme) {
    document.body.className = `theme-${theme}`;
    document.getElementById('themeToggle').textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function bindThemeToggle() {
    document.getElementById('themeToggle').addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
      Storage.saveSetting('theme', currentTheme);
    });
  }

  // ── Mode ──
  function setMode(mode, save = true) {
    currentMode = mode;
    const info = Training.MODES[mode];
    const bar = document.getElementById('modeInfoBar');
    if (bar) bar.textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)}: ${info.label} · ${info.sets}×${info.reps} reps · Rest ${info.rest}`;
    document.querySelectorAll('.pill').forEach(p => {
      p.classList.toggle('active', p.dataset.mode === mode);
    });
    if (save) Storage.saveSetting('mode', mode);
    updateSuggestion();
  }

  function bindModeSelector() {
    document.querySelectorAll('.pill[data-mode]').forEach(pill => {
      pill.addEventListener('click', () => setMode(pill.dataset.mode));
    });
  }

  // ── Log Form ──
  function setLogDate() {
    const el = document.getElementById('logDate');
    if (el) el.value = new Date().toISOString().slice(0, 10);
  }

  function populateExerciseDatalist() {
    const dl = document.getElementById('exerciseList');
    if (!dl) return;
    dl.innerHTML = EXERCISE_LIBRARY.map(e => `<option value="${e.name}">`).join('');
  }

  function bindLogForm() {
    const form = document.getElementById('logForm');
    const exerciseInput = document.getElementById('logExercise');
    const clearBtn = document.getElementById('clearLog');
    const applySug = document.getElementById('applySuggestion');

    exerciseInput?.addEventListener('input', updateSuggestion);
    applySug?.addEventListener('click', applySuggestionToForm);
    clearBtn?.addEventListener('click', () => { form.reset(); setLogDate(); hideSuggestion(); });

    form?.addEventListener('submit', e => {
      e.preventDefault();
      logEntry();
    });

    document.getElementById('clearAllHistory')?.addEventListener('click', () => {
      if (confirm('Delete ALL workout history? This cannot be undone.')) {
        Storage.setLogs([]);
        Storage.setChallenges({});
        renderLog();
      }
    });
  }

  function updateSuggestion() {
    const name = document.getElementById('logExercise')?.value?.trim();
    if (!name) { hideSuggestion(); return; }
    const sug = Training.getSuggestion(name, currentMode);
    if (!sug) { hideSuggestion(); return; }
    const box = document.getElementById('suggestionBox');
    const text = document.getElementById('suggestionText');
    if (box && text) {
      text.textContent = `${sug.sets} sets × ${sug.reps} reps @ ${sug.weight}kg (last: ${sug.lastWeight}kg on ${sug.lastDate})`;
      box.hidden = false;
    }
  }

  function hideSuggestion() {
    const box = document.getElementById('suggestionBox');
    if (box) box.hidden = true;
  }

  function applySuggestionToForm() {
    const name = document.getElementById('logExercise')?.value?.trim();
    if (!name) return;
    const sug = Training.getSuggestion(name, currentMode);
    if (!sug) return;
    document.getElementById('logSets').value = sug.sets;
    document.getElementById('logReps').value = sug.reps;
    document.getElementById('logWeight').value = sug.weight;
  }

  function logEntry() {
    const date = document.getElementById('logDate').value;
    const exercise = document.getElementById('logExercise').value.trim();
    const sets = parseInt(document.getElementById('logSets').value) || 0;
    const reps = parseInt(document.getElementById('logReps').value) || 0;
    const weight = parseFloat(document.getElementById('logWeight').value) || 0;
    const notes = document.getElementById('logNotes').value.trim();

    if (!date || !exercise || !sets || !reps) return;

    const isPR = weight > 0 ? Storage.checkAndSetPR(exercise, weight) : false;

    Storage.addLog({
      id: Date.now().toString(),
      date, exercise, sets, reps, weight, notes, isPR
    });

    document.getElementById('logExercise').value = '';
    document.getElementById('logSets').value = '';
    document.getElementById('logReps').value = '';
    document.getElementById('logWeight').value = '';
    document.getElementById('logNotes').value = '';
    hideSuggestion();

    renderLog();
    if (isPR) flashPR(exercise, weight);
  }

  function flashPR(exercise, weight) {
    const banner = document.createElement('div');
    banner.style.cssText = `
      position:fixed;top:70px;right:20px;background:#f59e0b;color:#000;
      padding:12px 20px;border-radius:10px;font-weight:700;font-size:15px;
      z-index:999;animation:fadeIn 0.3s ease;box-shadow:0 4px 20px rgba(0,0,0,0.3)
    `;
    banner.textContent = `🏆 New PR! ${exercise} — ${weight}kg`;
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 3500);
  }

  // ── Dashboard ──
  function renderDashboard() {
    const logs = Storage.getLogs();
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekLogs = logs.filter(l => new Date(l.date) >= weekStart);
    const weekDays = new Set(weekLogs.map(l => l.date));

    document.getElementById('statWeekWorkouts').textContent = weekDays.size;
    document.getElementById('statStreak').textContent = Training.getStreak() + '🔥';
    document.getElementById('statTotalSets').textContent = logs.reduce((s, l) => s + (l.sets || 0), 0);

    const prs = Storage.getPRs();
    document.getElementById('statPRCount').textContent = Object.keys(prs).length;

    const hour = now.getHours();
    const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    const day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][now.getDay()];
    document.getElementById('dashGreeting').textContent = `${greet} — ${day}. Let's move.`;

    renderRecommendation();
    renderRecentWorkouts(logs);
    renderDashPRs(prs);
    renderDashChallenge();
  }

  function renderRecommendation() {
    const rec = Training.getDailyRecommendation(currentMode);
    const el = document.getElementById('recommendationContent');
    if (!el) return;
    if (!rec) { el.innerHTML = '<p class="muted">Log a few workouts to get smart recommendations.</p>'; return; }

    const wt = rec.suggestedWeight ? `@ ${rec.suggestedWeight}kg` : '(bodyweight)';
    el.innerHTML = `
      <div class="recommendation-body">
        <div class="rec-exercise">${rec.exercise.name}</div>
        <div class="rec-params">${rec.sets} sets × ${rec.reps} reps ${wt}</div>
        <div style="margin-top:8px;font-size:13px;color:var(--text-muted)">
          <strong>Muscles:</strong> ${rec.exercise.muscles.join(', ')}
        </div>
        <div class="rec-reason" style="margin-top:6px">${rec.reason}</div>
        <button class="btn-primary btn-small" style="margin-top:12px" id="recLogBtn">Log This</button>
      </div>
    `;
    document.getElementById('recLogBtn')?.addEventListener('click', () => {
      document.getElementById('logExercise').value = rec.exercise.name;
      document.getElementById('logSets').value = rec.sets;
      document.getElementById('logReps').value = rec.reps;
      if (rec.suggestedWeight) document.getElementById('logWeight').value = rec.suggestedWeight;
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.nav-btn[data-view="log"]').classList.add('active');
      renderView('log');
      updateSuggestion();
    });
  }

  function renderRecentWorkouts(logs) {
    const el = document.getElementById('recentWorkouts');
    if (!el) return;
    const recent = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
    if (!recent.length) { el.innerHTML = '<p class="muted">No workouts logged yet.</p>'; return; }
    el.innerHTML = recent.map(l => `
      <div class="today-entry">
        <div class="entry-info">
          <div class="entry-name">${l.exercise}${l.isPR ? ' <span class="pr-badge">PR</span>' : ''}</div>
          <div class="entry-detail">${l.sets}×${l.reps}${l.weight ? ` @ ${l.weight}kg` : ''} · ${l.date}</div>
        </div>
      </div>
    `).join('');
  }

  function renderDashPRs(prs) {
    const el = document.getElementById('dashPRs');
    if (!el) return;
    const entries = Object.entries(prs);
    if (!entries.length) { el.innerHTML = '<p class="muted">PRs will appear as you log workouts.</p>'; return; }
    el.innerHTML = entries.slice(0, 5).map(([ex, w]) => `
      <div class="pr-row"><span class="pr-exercise">${ex}</span><span class="pr-value">${w}kg 🏆</span></div>
    `).join('');
  }

  function renderDashChallenge() {
    const el = document.getElementById('dashChallenge');
    if (!el) return;
    const challenges = Challenges.evaluate();
    const active = challenges.find(c => !c.complete);
    if (!active) { el.innerHTML = '<p class="muted">All challenges complete! Visit Challenges for more.</p>'; return; }
    const pct = Math.round((active.progress / active.target) * 100);
    el.innerHTML = `
      <div class="challenge-title">${active.title}</div>
      <div class="challenge-desc">${active.description}</div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <div class="challenge-meta"><span>${active.progress} / ${active.target}</span><span>${pct}%</span></div>
    `;
  }

  // ── Log View ──
  function renderLog() {
    renderTodayLog();
    renderHistory();
    const entries = Storage.getLogs().filter(l => l.date === new Date().toISOString().slice(0, 10));
    const badge = document.getElementById('sessionCount');
    if (badge) badge.textContent = `${entries.length} entr${entries.length === 1 ? 'y' : 'ies'}`;
  }

  function renderTodayLog() {
    const el = document.getElementById('todayLog');
    if (!el) return;
    const today = new Date().toISOString().slice(0, 10);
    const entries = Storage.getLogs().filter(l => l.date === today);
    if (!entries.length) { el.innerHTML = '<p class="muted">Start logging exercises above.</p>'; return; }
    el.innerHTML = entries.map(l => `
      <div class="today-entry">
        <div class="entry-info">
          <div class="entry-name">${l.exercise}${l.isPR ? ' <span class="pr-badge">🏆 PR</span>' : ''}</div>
          <div class="entry-detail">${l.sets} sets × ${l.reps} reps${l.weight ? ` @ ${l.weight}kg` : ''}${l.notes ? ` · ${l.notes}` : ''}</div>
        </div>
        <button class="btn-danger" data-id="${l.id}">✕</button>
      </div>
    `).join('');
    el.querySelectorAll('.btn-danger').forEach(btn => {
      btn.addEventListener('click', () => { Storage.deleteLog(btn.dataset.id); renderLog(); });
    });
  }

  function renderHistory() {
    const el = document.getElementById('workoutHistory');
    if (!el) return;
    const filter = document.getElementById('historyFilter')?.value?.toLowerCase() || '';
    let logs = Storage.getLogs().filter(l =>
      !filter || l.exercise.toLowerCase().includes(filter)
    ).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 100);

    if (!logs.length) { el.innerHTML = '<p class="muted">No history yet.</p>'; return; }
    el.innerHTML = `
      <table class="history-table">
        <thead><tr><th>Date</th><th>Exercise</th><th>Sets</th><th>Reps</th><th>Weight</th><th>Notes</th><th></th></tr></thead>
        <tbody>
          ${logs.map(l => `
            <tr>
              <td>${l.date}</td>
              <td>${l.exercise}${l.isPR ? '<span class="pr-badge"> PR</span>' : ''}</td>
              <td>${l.sets}</td>
              <td>${l.reps}</td>
              <td>${l.weight ? l.weight + 'kg' : '—'}</td>
              <td>${l.notes || '—'}</td>
              <td><button class="btn-danger" data-id="${l.id}">✕</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    el.querySelectorAll('.btn-danger').forEach(btn => {
      btn.addEventListener('click', () => { Storage.deleteLog(btn.dataset.id); renderHistory(); });
    });
  }

  function bindHistoryFilter() {
    document.getElementById('historyFilter')?.addEventListener('input', renderHistory);
  }

  // ── Library ──
  function bindLibrary() {
    document.getElementById('librarySearch')?.addEventListener('input', renderLibrary);
    document.getElementById('libraryCategory')?.addEventListener('change', renderLibrary);
    document.getElementById('libraryMuscle')?.addEventListener('change', renderLibrary);
    document.getElementById('modalClose')?.addEventListener('click', closeModal);
    document.getElementById('exerciseModal')?.addEventListener('click', e => {
      if (e.target.id === 'exerciseModal') closeModal();
    });
    document.getElementById('modalLogBtn')?.addEventListener('click', () => {
      if (!selectedExerciseForModal) return;
      document.getElementById('logExercise').value = selectedExerciseForModal.name;
      closeModal();
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.nav-btn[data-view="log"]').classList.add('active');
      renderView('log');
      updateSuggestion();
    });
  }

  function renderLibrary() {
    const search = document.getElementById('librarySearch')?.value?.toLowerCase() || '';
    const cat = document.getElementById('libraryCategory')?.value || '';
    const muscle = document.getElementById('libraryMuscle')?.value || '';
    const grid = document.getElementById('libraryGrid');
    if (!grid) return;

    const filtered = EXERCISE_LIBRARY.filter(e => {
      const matchSearch = !search || e.name.toLowerCase().includes(search) || e.muscles.some(m => m.includes(search));
      const matchCat = !cat || e.category === cat;
      const matchMuscle = !muscle || e.muscleGroup === muscle || e.muscles.includes(muscle);
      return matchSearch && matchCat && matchMuscle;
    });

    if (!filtered.length) { grid.innerHTML = '<p class="muted">No exercises match your filters.</p>'; return; }

    grid.innerHTML = filtered.map(e => `
      <div class="exercise-card" data-name="${e.name}">
        <div class="ex-name">${e.name}</div>
        <div style="font-size:13px;color:var(--text-muted)">${e.muscles.slice(0, 2).join(', ')}</div>
        <div class="ex-tags">
          <span class="tag cat-${e.category}">${e.category}</span>
          <span class="tag">${e.muscleGroup}</span>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.exercise-card').forEach(card => {
      card.addEventListener('click', () => {
        const ex = EXERCISE_LIBRARY.find(e => e.name === card.dataset.name);
        if (ex) openModal(ex);
      });
    });
  }

  function openModal(ex) {
    selectedExerciseForModal = ex;
    const content = document.getElementById('modalContent');
    if (content) {
      content.innerHTML = `
        <h2>${ex.name}</h2>
        <div class="muscle-list">🎯 ${ex.muscles.join(' · ')}</div>
        <div class="ex-tags" style="margin-bottom:12px">
          <span class="tag cat-${ex.category}">${ex.category}</span>
          <span class="tag">${ex.muscleGroup}</span>
        </div>
        <p class="form-desc">${ex.description}</p>
      `;
    }
    document.getElementById('exerciseModal').hidden = false;
  }

  function closeModal() {
    document.getElementById('exerciseModal').hidden = true;
    selectedExerciseForModal = null;
  }

  // ── Progress ──
  function renderProgress() {
    const logs = Storage.getLogs();
    const exercises = [...new Set(logs.filter(l => l.weight > 0).map(l => l.exercise))].sort();
    const sel = document.getElementById('progressExercise');
    if (sel) {
      const current = sel.value;
      sel.innerHTML = '<option value="">Select exercise…</option>' +
        exercises.map(e => `<option ${e === current ? 'selected' : ''}>${e}</option>`).join('');
      if (current) Charts.buildWeightChart(current);
    }
    Charts.buildWeeklyChart();
    renderAllPRs();
  }

  function bindProgressSelect() {
    document.getElementById('progressExercise')?.addEventListener('change', e => {
      Charts.buildWeightChart(e.target.value);
    });
  }

  function renderAllPRs() {
    const el = document.getElementById('allPRs');
    if (!el) return;
    const prs = Object.entries(Storage.getPRs());
    if (!prs.length) { el.innerHTML = '<p class="muted">No PRs yet.</p>'; return; }
    el.innerHTML = prs.sort((a, b) => b[1] - a[1]).map(([ex, w]) => `
      <div class="pr-row">
        <span class="pr-exercise">${ex}</span>
        <span class="pr-value">${w}kg 🏆</span>
      </div>
    `).join('');
  }

  // ── Challenges ──
  function renderChallenges() {
    const grid = document.getElementById('challengesGrid');
    if (!grid) return;
    const evaluated = Challenges.evaluate();
    grid.innerHTML = evaluated.map(c => {
      const pct = Math.round((c.progress / c.target) * 100);
      const cls = c.complete ? 'complete' : 'active';
      return `
        <div class="challenge-card ${cls}">
          <div class="challenge-title">${c.complete ? '✅ ' : ''}${c.title}</div>
          <div class="challenge-desc">${c.description}</div>
          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
          <div class="challenge-meta">
            <span>${c.progress} / ${c.target}</span>
            <span class="badge">${c.complete ? 'Complete!' : pct + '%'}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // ── Export / Import ──
  function bindExportImport() {
    document.getElementById('exportBtn')?.addEventListener('click', () => {
      const data = Storage.exportAll();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `fitforge-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    });

    document.getElementById('importInput')?.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!confirm(`Import ${data.logs?.length || 0} log entries? Current data will be merged/overwritten.`)) return;
          Storage.importAll(data);
          const settings = Storage.getSettings();
          currentMode = settings.mode || 'strength';
          currentTheme = settings.theme || 'dark';
          applyTheme(currentTheme);
          setMode(currentMode, false);
          renderView(currentView);
          alert('Import successful!');
        } catch { alert('Invalid backup file.'); }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
