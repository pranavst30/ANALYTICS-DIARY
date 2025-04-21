export const MOODS = {
  SCORE_10: {
    id: "score_10",
    label: "Super Productive",
    emoji: "🚀",
    score: 10,
    color: "green",
    prompt: "What amazing things did you accomplish?",
  },
  SCORE_9: {
    id: "score_9",
    label: "Very Productive",
    emoji: "💼",
    score: 9,
    color: "lime",
    prompt: "What big goals did you hit?",
  },
  SCORE_8: {
    id: "score_8",
    label: "Quite Productive",
    emoji: "✅",
    score: 8,
    color: "emerald",
    prompt: "What major tasks did you finish?",
  },
  SCORE_7: {
    id: "score_7",
    label: "Productive",
    emoji: "📈",
    score: 7,
    color: "teal",
    prompt: "What helped you stay focused?",
  },
  SCORE_6: {
    id: "score_6",
    label: "Somewhat Productive",
    emoji: "📝",
    score: 6,
    color: "blue",
    prompt: "What did you manage to complete today?",
  },
  SCORE_5: {
    id: "score_5",
    label: "Neutral",
    emoji: "😐",
    score: 5,
    color: "gray",
    prompt: "Did you feel in control of your day?",
  },
  SCORE_4: {
    id: "score_4",
    label: "Low Productivity",
    emoji: "😴",
    score: 4,
    color: "yellow",
    prompt: "What distractions did you face?",
  },
  SCORE_3: {
    id: "score_3",
    label: "Unfocused",
    emoji: "📉",
    score: 3,
    color: "orange",
    prompt: "What made it hard to concentrate?",
  },
  SCORE_2: {
    id: "score_2",
    label: "Very Unproductive",
    emoji: "🛌",
    score: 2,
    color: "rose",
    prompt: "Why was it hard to get anything done?",
  },
  SCORE_1: {
    id: "score_1",
    label: "Not Productive At All",
    emoji: "😩",
    score: 1,
    color: "red",
    prompt: "What completely blocked your productivity today?",
  },
};


export const getMoodTrend  = (averageScore) => {
  if (averageScore >= 8) return "You've been extremely productive!";
  if (averageScore >= 6) return "You're staying quite productive.";
  if (averageScore >= 4) return "You've had some ups and downs.";
  if (averageScore >= 2) return "Productivity's been a bit low lately.";
  return "You've been really struggling to stay productive.";
};

export const getMoodById = (moodId) => {
  return MOODS[moodId?.toUpperCase()];
};
