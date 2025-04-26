const mockUserData = {
  name: "Jay",
  categoryProgress: {
    0: { level: 5, score: 150 }, // personal
    1: { level: 2, score: 40 }, // social
    2: { level: 3, score: 90 }, // learning
    3: { level: 1, score: 20 }, // food
    4: { level: 4, score: 120 }, // travel
    5: { level: 2, score: 50 }, // physical activity
  },
  tasks: [
    { name: "task 1", category: 0, completed: false, xp: 10 },
    { name: "task 2", category: 0, completed: false, xp: 20 },
    { name: "task 1", category: 1, completed: true, xp: 15 },
    { name: "task 2", category: 1, completed: false, xp: 25 },
  ],
};

export default mockUserData;
