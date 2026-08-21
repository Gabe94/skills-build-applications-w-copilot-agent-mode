import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [trailblazers, kettlebells] = await Team.create([
      {
        name: 'Trailblazers',
        mascot: 'Octopus',
        city: 'San Francisco',
        members: [],
      },
      {
        name: 'Kettlebells',
        mascot: 'Barbell',
        city: 'Austin',
        members: [],
      },
    ]);

    const [mona, devon, priya] = await User.create([
      {
        username: 'mona-fit',
        email: 'mona@example.com',
        displayName: 'Mona Lovelace',
        fitnessLevel: 'intermediate',
        favoriteActivities: ['running', 'cycling'],
        joinedTeam: trailblazers._id,
      },
      {
        username: 'devon-lifts',
        email: 'devon@example.com',
        displayName: 'Devon Hayes',
        fitnessLevel: 'advanced',
        favoriteActivities: ['strength training', 'rowing'],
        joinedTeam: kettlebells._id,
      },
      {
        username: 'priya-yoga',
        email: 'priya@example.com',
        displayName: 'Priya Shah',
        fitnessLevel: 'beginner',
        favoriteActivities: ['yoga', 'walking'],
        joinedTeam: trailblazers._id,
      },
    ]);

    await Promise.all([
      Team.updateOne({ _id: trailblazers._id }, { members: [mona._id, priya._id] }),
      Team.updateOne({ _id: kettlebells._id }, { members: [devon._id] }),
    ]);

    await Activity.create([
      {
        user: mona._id,
        team: trailblazers._id,
        type: 'running',
        durationMinutes: 42,
        caloriesBurned: 420,
        completedAt: new Date('2026-08-18T14:30:00Z'),
      },
      {
        user: devon._id,
        team: kettlebells._id,
        type: 'strength training',
        durationMinutes: 55,
        caloriesBurned: 510,
        completedAt: new Date('2026-08-19T12:00:00Z'),
      },
      {
        user: priya._id,
        team: trailblazers._id,
        type: 'yoga',
        durationMinutes: 30,
        caloriesBurned: 160,
        completedAt: new Date('2026-08-20T09:15:00Z'),
      },
    ]);

    await Leaderboard.create([
      {
        user: devon._id,
        team: kettlebells._id,
        rank: 1,
        points: 1840,
        period: 'weekly',
      },
      {
        user: mona._id,
        team: trailblazers._id,
        rank: 2,
        points: 1715,
        period: 'weekly',
      },
      {
        user: priya._id,
        team: trailblazers._id,
        rank: 3,
        points: 980,
        period: 'weekly',
      },
    ]);

    await Workout.create([
      {
        title: 'Morning Mobility Reset',
        focus: 'mobility',
        difficulty: 'beginner',
        estimatedMinutes: 20,
        exercises: ['cat-cow stretch', 'world greatest stretch', 'hip airplanes'],
      },
      {
        title: 'Lunchtime Power Circuit',
        focus: 'strength',
        difficulty: 'intermediate',
        estimatedMinutes: 35,
        exercises: ['goblet squats', 'push-ups', 'kettlebell swings', 'plank holds'],
      },
      {
        title: 'Endurance Builder Run',
        focus: 'cardio',
        difficulty: 'advanced',
        estimatedMinutes: 45,
        exercises: ['easy warmup jog', 'tempo intervals', 'cooldown walk'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
