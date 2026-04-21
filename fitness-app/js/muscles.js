const MuscleMap = (() => {
  const MAP = {
    'chest':           ['f-chest'],
    'upper chest':     ['f-chest'],
    'pecs':            ['f-chest'],
    'shoulders':       ['f-delts', 'b-rear-delts'],
    'front delts':     ['f-delts'],
    'rear delts':      ['b-rear-delts'],
    'biceps':          ['f-biceps'],
    'triceps':         ['b-triceps'],
    'forearms':        ['f-forearms'],
    'core':            ['f-core'],
    'abs':             ['f-core'],
    'hip flexors':     ['f-core'],
    'quads':           ['f-quads'],
    'hamstrings':      ['b-hamstrings'],
    'glutes':          ['b-glutes'],
    'calves':          ['f-calves', 'b-calves'],
    'lats':            ['b-lats'],
    'back':            ['b-lats', 'b-traps'],
    'upper back':      ['b-traps'],
    'mid back':        ['b-traps', 'b-lats'],
    'rhomboids':       ['b-traps'],
    'traps':           ['b-traps'],
    'lower back':      ['b-lower-back'],
    'spine':           ['b-lower-back'],
    'thoracic spine':  ['b-traps', 'b-lower-back'],
    'hip rotators':    ['b-glutes'],
    'full body':       ['f-chest','f-core','f-quads','b-lats','b-glutes','b-hamstrings'],
  };

  function activeIds(muscles) {
    const ids = new Set();
    muscles.forEach(m => (MAP[m.toLowerCase()] || []).forEach(id => ids.add(id)));
    return ids;
  }

  function f(id, active, highlight = '#6366f1', base = '#2e3347') {
    return active.has(id) ? highlight : base;
  }

  function buildSVG(muscles) {
    const active = activeIds(muscles);
    const skin = '#3a3f5c';

    const front = `<svg viewBox="0 0 200 380" xmlns="http://www.w3.org/2000/svg" style="width:140px;height:auto">
      <circle cx="100" cy="32" r="22" fill="${skin}"/>
      <rect x="91" y="52" width="18" height="16" rx="4" fill="${skin}"/>
      <path d="M65,68 Q100,62 135,68 L140,185 Q100,192 60,185 Z" fill="${skin}"/>
      <!-- Shoulders / front delts -->
      <ellipse cx="56" cy="80" rx="20" ry="13" fill="${f('f-delts',active)}" opacity="0.92"/>
      <ellipse cx="144" cy="80" rx="20" ry="13" fill="${f('f-delts',active)}" opacity="0.92"/>
      <!-- Chest -->
      <ellipse cx="85" cy="100" rx="20" ry="18" fill="${f('f-chest',active)}" opacity="0.92"/>
      <ellipse cx="115" cy="100" rx="20" ry="18" fill="${f('f-chest',active)}" opacity="0.92"/>
      <!-- Core -->
      <rect x="82" y="126" width="36" height="52" rx="9" fill="${f('f-core',active)}" opacity="0.92"/>
      <!-- Biceps -->
      <ellipse cx="43" cy="118" rx="12" ry="32" fill="${f('f-biceps',active)}" opacity="0.92"/>
      <ellipse cx="157" cy="118" rx="12" ry="32" fill="${f('f-biceps',active)}" opacity="0.92"/>
      <!-- Forearms -->
      <ellipse cx="38" cy="172" rx="10" ry="26" fill="${f('f-forearms',active)}" opacity="0.92"/>
      <ellipse cx="162" cy="172" rx="10" ry="26" fill="${f('f-forearms',active)}" opacity="0.92"/>
      <!-- Hands -->
      <ellipse cx="36" cy="206" rx="9" ry="12" fill="${skin}"/>
      <ellipse cx="164" cy="206" rx="9" ry="12" fill="${skin}"/>
      <!-- Quads -->
      <ellipse cx="84" cy="248" rx="22" ry="50" fill="${f('f-quads',active)}" opacity="0.92"/>
      <ellipse cx="116" cy="248" rx="22" ry="50" fill="${f('f-quads',active)}" opacity="0.92"/>
      <!-- Calves front -->
      <ellipse cx="83" cy="324" rx="15" ry="33" fill="${f('f-calves',active)}" opacity="0.92"/>
      <ellipse cx="117" cy="324" rx="15" ry="33" fill="${f('f-calves',active)}" opacity="0.92"/>
      <!-- Feet -->
      <ellipse cx="84" cy="362" rx="16" ry="8" fill="${skin}"/>
      <ellipse cx="116" cy="362" rx="16" ry="8" fill="${skin}"/>
    </svg>`;

    const back = `<svg viewBox="0 0 200 380" xmlns="http://www.w3.org/2000/svg" style="width:140px;height:auto">
      <circle cx="100" cy="32" r="22" fill="${skin}"/>
      <rect x="91" y="52" width="18" height="16" rx="4" fill="${skin}"/>
      <path d="M65,68 Q100,62 135,68 L140,185 Q100,192 60,185 Z" fill="${skin}"/>
      <!-- Traps -->
      <path d="M72,68 Q100,60 128,68 L122,97 Q100,103 78,97 Z" fill="${f('b-traps',active)}" opacity="0.92"/>
      <!-- Lats -->
      <path d="M67,82 L78,97 L74,155 L58,140 L55,104 Z" fill="${f('b-lats',active)}" opacity="0.92"/>
      <path d="M133,82 L122,97 L126,155 L142,140 L145,104 Z" fill="${f('b-lats',active)}" opacity="0.92"/>
      <!-- Lower back -->
      <rect x="82" y="140" width="36" height="44" rx="8" fill="${f('b-lower-back',active)}" opacity="0.92"/>
      <!-- Rear delts -->
      <ellipse cx="56" cy="80" rx="20" ry="13" fill="${f('b-rear-delts',active)}" opacity="0.92"/>
      <ellipse cx="144" cy="80" rx="20" ry="13" fill="${f('b-rear-delts',active)}" opacity="0.92"/>
      <!-- Triceps -->
      <ellipse cx="43" cy="118" rx="12" ry="32" fill="${f('b-triceps',active)}" opacity="0.92"/>
      <ellipse cx="157" cy="118" rx="12" ry="32" fill="${f('b-triceps',active)}" opacity="0.92"/>
      <!-- Forearms back -->
      <ellipse cx="38" cy="172" rx="10" ry="26" fill="#2e3347" opacity="0.92"/>
      <ellipse cx="162" cy="172" rx="10" ry="26" fill="#2e3347" opacity="0.92"/>
      <!-- Hands -->
      <ellipse cx="36" cy="206" rx="9" ry="12" fill="${skin}"/>
      <ellipse cx="164" cy="206" rx="9" ry="12" fill="${skin}"/>
      <!-- Glutes -->
      <ellipse cx="86" cy="202" rx="24" ry="22" fill="${f('b-glutes',active)}" opacity="0.92"/>
      <ellipse cx="114" cy="202" rx="24" ry="22" fill="${f('b-glutes',active)}" opacity="0.92"/>
      <!-- Hamstrings -->
      <ellipse cx="84" cy="260" rx="22" ry="44" fill="${f('b-hamstrings',active)}" opacity="0.92"/>
      <ellipse cx="116" cy="260" rx="22" ry="44" fill="${f('b-hamstrings',active)}" opacity="0.92"/>
      <!-- Calves back -->
      <ellipse cx="83" cy="324" rx="15" ry="33" fill="${f('b-calves',active)}" opacity="0.92"/>
      <ellipse cx="117" cy="324" rx="15" ry="33" fill="${f('b-calves',active)}" opacity="0.92"/>
      <!-- Feet -->
      <ellipse cx="84" cy="362" rx="16" ry="8" fill="${skin}"/>
      <ellipse cx="116" cy="362" rx="16" ry="8" fill="${skin}"/>
    </svg>`;

    return { front, back };
  }

  return { buildSVG };
})();
