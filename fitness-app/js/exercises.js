const EXERCISE_LIBRARY = [
  // ── Strength ──
  {
    name: "Barbell Squat",
    category: "strength",
    muscles: ["quads", "glutes", "core"],
    muscleGroup: "legs",
    description: "Stand with the bar across your upper traps, feet shoulder-width apart. Descend until thighs are parallel, keeping chest tall and knees tracking over toes. Drive through your heels to stand."
  },
  {
    name: "Bench Press",
    category: "strength",
    muscles: ["chest", "triceps", "front delts"],
    muscleGroup: "chest",
    description: "Lie flat, grip just outside shoulder width. Lower the bar to your lower chest with control, elbows at ~45°. Press explosively back to start. Keep feet flat and back slightly arched."
  },
  {
    name: "Deadlift",
    category: "strength",
    muscles: ["hamstrings", "glutes", "back", "core"],
    muscleGroup: "back",
    description: "Stand with feet hip-width, bar over mid-foot. Hinge at the hips, grip just outside legs. Keep chest up and back neutral. Drive through the floor, hips and shoulders rise together."
  },
  {
    name: "Overhead Press",
    category: "strength",
    muscles: ["shoulders", "triceps", "upper back"],
    muscleGroup: "shoulders",
    description: "Stand with bar at upper chest, grip shoulder-width. Brace your core and press straight overhead, slightly back at the top. Lower with control. Avoid leaning back excessively."
  },
  {
    name: "Barbell Row",
    category: "strength",
    muscles: ["lats", "rhomboids", "biceps"],
    muscleGroup: "back",
    description: "Hinge to ~45° with a neutral back. Pull the bar to your lower ribcage, elbows traveling back. Squeeze the shoulder blades at the top. Control the descent."
  },
  {
    name: "Romanian Deadlift",
    category: "strength",
    muscles: ["hamstrings", "glutes", "lower back"],
    muscleGroup: "legs",
    description: "Hold bar at hip height, push hips back while lowering the bar along your legs. Feel a deep hamstring stretch, then drive hips forward to stand. Keep back flat throughout."
  },
  {
    name: "Dumbbell Lunges",
    category: "strength",
    muscles: ["quads", "glutes", "hamstrings"],
    muscleGroup: "legs",
    description: "Step forward into a lunge, lower your back knee toward the floor. Keep front shin vertical. Push through the front heel to return. Alternate legs or complete one side at a time."
  },
  {
    name: "Incline Dumbbell Press",
    category: "strength",
    muscles: ["upper chest", "front delts", "triceps"],
    muscleGroup: "chest",
    description: "Set bench to 30–45°. Lower dumbbells to upper chest with elbows slightly below shoulder level. Press up and slightly in, without locking out fully."
  },
  {
    name: "Cable Row",
    category: "strength",
    muscles: ["lats", "mid back", "biceps"],
    muscleGroup: "back",
    description: "Sit tall, slight lean back, pull handle to your navel. Lead with the elbows, squeeze the back at the peak. Return slowly with control, allowing a full stretch."
  },
  {
    name: "Lat Pulldown",
    category: "strength",
    muscles: ["lats", "biceps", "rear delts"],
    muscleGroup: "back",
    description: "Grip wide, lean slightly back. Pull bar to upper chest, driving elbows down and back. Avoid swinging. Stretch fully at the top before each rep."
  },
  {
    name: "Dumbbell Bicep Curl",
    category: "strength",
    muscles: ["biceps", "forearms"],
    muscleGroup: "arms",
    description: "Stand tall, palms facing forward. Curl the weight up keeping elbows pinned to your sides. Squeeze at the top, lower slowly over 2–3 seconds."
  },
  {
    name: "Tricep Pushdown",
    category: "strength",
    muscles: ["triceps"],
    muscleGroup: "arms",
    description: "Use a cable or band. Keep upper arms still, press the handle down until arms are fully extended. Control the return. Avoid flaring elbows outward."
  },
  {
    name: "Leg Press",
    category: "strength",
    muscles: ["quads", "glutes", "hamstrings"],
    muscleGroup: "legs",
    description: "Feet shoulder-width on the platform. Lower the sled until knees are at 90°, then press back up. Don't lock knees at the top. Avoid letting lower back round."
  },
  {
    name: "Hip Thrust",
    category: "strength",
    muscles: ["glutes", "hamstrings"],
    muscleGroup: "legs",
    description: "Upper back on bench, bar across hips. Drive hips up until body is straight. Squeeze glutes hard at the top. Lower with control and repeat."
  },
  {
    name: "Plank",
    category: "strength",
    muscles: ["core", "shoulders"],
    muscleGroup: "core",
    description: "Forearms on floor, body in a straight line. Engage core hard, squeeze glutes. Hold without letting hips sag or rise. Breathe steadily."
  },

  // ── Calisthenics ──
  {
    name: "Push-Up",
    category: "calisthenics",
    muscles: ["chest", "triceps", "front delts", "core"],
    muscleGroup: "chest",
    description: "Hands just outside shoulder-width, body straight. Lower chest to floor with elbows at ~45°. Press back up explosively. Keep the core tight the entire time."
  },
  {
    name: "Pull-Up",
    category: "calisthenics",
    muscles: ["lats", "biceps", "core"],
    muscleGroup: "back",
    description: "Dead hang, palms facing away. Pull until chin clears the bar, driving elbows down. Avoid kipping unless training for it. Lower slowly."
  },
  {
    name: "Chin-Up",
    category: "calisthenics",
    muscles: ["lats", "biceps"],
    muscleGroup: "back",
    description: "Supinated grip (palms facing you), shoulder-width. Pull chest to bar, leading with elbows. The supinated grip gives the biceps a mechanical advantage over pull-ups."
  },
  {
    name: "Dip",
    category: "calisthenics",
    muscles: ["chest", "triceps", "front delts"],
    muscleGroup: "chest",
    description: "On parallel bars, lower until upper arms are parallel to the floor. Lean slightly forward for more chest engagement, stay upright for more triceps. Press back up."
  },
  {
    name: "Bodyweight Squat",
    category: "calisthenics",
    muscles: ["quads", "glutes", "hamstrings"],
    muscleGroup: "legs",
    description: "Feet shoulder-width, toes slightly out. Sit back and down until thighs are parallel. Keep weight in your heels, chest tall, and knees tracking toes."
  },
  {
    name: "Pike Push-Up",
    category: "calisthenics",
    muscles: ["shoulders", "triceps"],
    muscleGroup: "shoulders",
    description: "Start in downward dog position. Bend elbows, lower head toward floor between hands. Push back up. The more vertical your torso, the more deltoid engagement."
  },
  {
    name: "Australian Row",
    category: "calisthenics",
    muscles: ["back", "biceps"],
    muscleGroup: "back",
    description: "Hang under a bar, body straight. Pull chest to the bar, keeping the body rigid. Great horizontal pull substitute when pull-ups are too hard. Lower with control."
  },
  {
    name: "Hollow Body Hold",
    category: "calisthenics",
    muscles: ["core", "hip flexors"],
    muscleGroup: "core",
    description: "Lie on back, press lower back into floor. Raise legs and shoulders slightly. Arms overhead. Hold the position maintaining full-body tension."
  },
  {
    name: "Glute Bridge",
    category: "calisthenics",
    muscles: ["glutes", "hamstrings", "core"],
    muscleGroup: "legs",
    description: "Lie on back, feet flat, hip-width apart. Drive hips up, squeezing glutes at the top. Hold 1–2 seconds. Lower slowly. Can be made harder with single leg or a band."
  },

  // ── Mobility / Yoga ──
  {
    name: "Cat-Cow",
    category: "mobility",
    muscles: ["spine", "core"],
    muscleGroup: "full body",
    description: "On hands and knees. Inhale, drop belly, lift chest and tailbone (cow). Exhale, round spine toward ceiling, tuck chin and pelvis (cat). Flow gently for 8–10 reps."
  },
  {
    name: "World's Greatest Stretch",
    category: "mobility",
    muscles: ["hip flexors", "thoracic spine", "hamstrings"],
    muscleGroup: "full body",
    description: "From a lunge position, place same-side hand inside the foot. Rotate and reach opposite arm to ceiling. Return and repeat. One of the most complete single mobility drills."
  },
  {
    name: "Hip 90/90 Stretch",
    category: "mobility",
    muscles: ["hip rotators", "glutes"],
    muscleGroup: "legs",
    description: "Sit with both knees bent at 90°, one in front and one to the side. Sit tall, hinge forward over the front shin. Hold 30–60 seconds, switch sides."
  },
  {
    name: "Thoracic Rotation",
    category: "mobility",
    muscles: ["thoracic spine", "back"],
    muscleGroup: "back",
    description: "Lying on side, knees at 90°. Keep hips still and rotate your top arm and chest open toward the ceiling. Exhale as you rotate. Great for desk workers."
  },
  {
    name: "Pigeon Pose",
    category: "mobility",
    muscles: ["hip rotators", "glutes", "hip flexors"],
    muscleGroup: "legs",
    description: "From a push-up position, bring one shin across your body and lower your hips. Fold forward for a deeper stretch. Hold 60–90 seconds each side."
  },
  {
    name: "Child's Pose",
    category: "mobility",
    muscles: ["lower back", "lats", "hips"],
    muscleGroup: "full body",
    description: "Kneel and sit back on heels, arms extended forward. Breathe into the stretch. Hold 30–60 seconds. Excellent for recovery and decompressing the spine."
  },
  {
    name: "Doorway Chest Stretch",
    category: "mobility",
    muscles: ["chest", "front delts", "biceps"],
    muscleGroup: "chest",
    description: "Place forearms on doorframe at 90°, step through. Hold 30–60 seconds. Essential for counteracting the forward-shoulder posture from pressing work."
  },
  {
    name: "Standing Hamstring Stretch",
    category: "mobility",
    muscles: ["hamstrings", "lower back"],
    muscleGroup: "legs",
    description: "Hinge forward at the hips with a flat back as far as you can go. Bend knees slightly if needed. Hold. Focus on a posterior pelvic tilt to maximize the stretch."
  }
];
