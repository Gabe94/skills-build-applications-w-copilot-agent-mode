import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    fitnessLevel: { type: String, required: true },
    favoriteActivities: [{ type: String }],
    joinedTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
)

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
)

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    period: { type: String, required: true },
  },
  { timestamps: true },
)

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, required: true },
    estimatedMinutes: { type: Number, required: true },
    exercises: [{ type: String }],
  },
  { timestamps: true },
)

export const User = model('User', userSchema)
export const Team = model('Team', teamSchema)
export const Activity = model('Activity', activitySchema)
export const Leaderboard = model('Leaderboard', leaderboardSchema)
export const Workout = model('Workout', workoutSchema)