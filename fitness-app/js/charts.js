const Charts = (() => {
  let weightChart = null;
  let weeklyChart = null;

  const accent = '#6366f1';
  const success = '#10b981';
  const muted = '#6b7280';

  const baseOpts = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#1a1d27', borderColor: '#2e3347', borderWidth: 1 }
    },
    scales: {
      x: { ticks: { color: muted }, grid: { color: '#2e3347' } },
      y: { ticks: { color: muted }, grid: { color: '#2e3347' } }
    }
  });

  function buildWeightChart(exerciseName) {
    const ctx = document.getElementById('weightChart');
    const empty = document.getElementById('weightChartEmpty');
    if (!exerciseName) { if (empty) empty.hidden = false; return; }

    const logs = Storage.getLogs()
      .filter(l => l.exercise.toLowerCase() === exerciseName.toLowerCase() && l.weight > 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!logs.length) {
      if (empty) { empty.textContent = 'No weight data for this exercise yet.'; empty.hidden = false; }
      if (weightChart) { weightChart.destroy(); weightChart = null; }
      return;
    }

    if (empty) empty.hidden = true;
    if (weightChart) weightChart.destroy();

    weightChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: logs.map(l => l.date),
        datasets: [{
          data: logs.map(l => l.weight),
          borderColor: accent,
          backgroundColor: 'rgba(99,102,241,0.12)',
          tension: 0.3,
          fill: true,
          pointBackgroundColor: accent,
          pointRadius: 4
        }]
      },
      options: { ...baseOpts(), plugins: { ...baseOpts().plugins } }
    });
  }

  function buildWeeklyChart() {
    const ctx = document.getElementById('weeklyChart');
    const logs = Storage.getLogs();
    if (!logs.length) return;

    const weeks = {};
    logs.forEach(l => {
      const d = new Date(l.date);
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const key = weekStart.toISOString().slice(0, 10);
      const dates = (weeks[key] = weeks[key] || new Set());
      dates.add(l.date);
    });

    const sorted = Object.keys(weeks).sort().slice(-8);
    const labels = sorted.map(k => {
      const d = new Date(k);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });
    const data = sorted.map(k => weeks[k].size);

    if (weeklyChart) weeklyChart.destroy();
    weeklyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: 'rgba(16,185,129,0.6)',
          borderColor: success,
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        ...baseOpts(),
        scales: {
          ...baseOpts().scales,
          y: { ...baseOpts().scales.y, ticks: { color: muted, stepSize: 1 } }
        }
      }
    });
  }

  return { buildWeightChart, buildWeeklyChart };
})();
