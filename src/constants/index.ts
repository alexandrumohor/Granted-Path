import type { PlanLimits } from "@/types";

export const APP_NAME = "Granted Path";
export const COMPANY_NAME = "Granted Training Enterprise SRL";

export const PLAN_LIMITS = {
  FREE: { activeCourses: 2, aiMessagesPerDay: 20, exercisesPerDay: 10, examSimsPerWeek: 1, flashcardsPerDay: 5, offlineCourses: 0, studyGroups: 0, hasAds: true, hasCertificates: false, hasVoiceMode: false, hasPanicMode: false, hasAdvancedAI: false, analyticsHistoryDays: 7 } satisfies PlanLimits,
  STARTER: { activeCourses: 5, aiMessagesPerDay: 100, exercisesPerDay: 50, examSimsPerWeek: 5, flashcardsPerDay: 30, offlineCourses: 3, studyGroups: 3, hasAds: false, hasCertificates: true, hasVoiceMode: true, hasPanicMode: false, hasAdvancedAI: false, analyticsHistoryDays: 30 } satisfies PlanLimits,
  PRO: { activeCourses: -1, aiMessagesPerDay: -1, exercisesPerDay: -1, examSimsPerWeek: -1, flashcardsPerDay: -1, offlineCourses: -1, studyGroups: -1, hasAds: false, hasCertificates: true, hasVoiceMode: true, hasPanicMode: true, hasAdvancedAI: true, analyticsHistoryDays: -1 } satisfies PlanLimits,
  MASTER: { activeCourses: -1, aiMessagesPerDay: -1, exercisesPerDay: -1, examSimsPerWeek: -1, flashcardsPerDay: -1, offlineCourses: -1, studyGroups: -1, hasAds: false, hasCertificates: true, hasVoiceMode: true, hasPanicMode: true, hasAdvancedAI: true, analyticsHistoryDays: -1 } satisfies PlanLimits,
} as const;

export const XP_REWARDS = {
  LESSON_COMPLETE: 30, EXERCISE_CORRECT: 10, EXERCISE_CORRECT_HARD: 20,
  QUIZ_COMPLETE_BASE: 50, QUIZ_PERFECT: 200, FLASHCARD_REVIEW: 2,
  DAILY_LOGIN: 10, STREAK_BONUS_MULTIPLIER: 5, MODULE_COMPLETE: 100, COURSE_COMPLETE: 500,
} as const;

export const COURSE_CATEGORIES = [
  { id: "IT_PROGRAMMING", label: "IT & Programming", icon: "code" },
  { id: "BUSINESS_MANAGEMENT", label: "Business & Management", icon: "briefcase" },
  { id: "MARKETING", label: "Marketing", icon: "megaphone" },
  { id: "LANGUAGES", label: "Foreign Languages", icon: "globe" },
  { id: "EXAM_PREP", label: "Exam Preparation", icon: "graduation-cap" },
  { id: "SCIENCES", label: "Sciences", icon: "flask-conical" },
  { id: "DESIGN_CREATIVITY", label: "Design & Creativity", icon: "palette" },
  { id: "FINANCE_ACCOUNTING", label: "Finance & Accounting", icon: "calculator" },
  { id: "LAW_LEGISLATION", label: "Law & Legislation", icon: "scale" },
  { id: "HEALTH_MEDICINE", label: "Health & Medicine", icon: "heart-pulse" },
  { id: "SOFT_SKILLS", label: "Soft Skills", icon: "users" },
  { id: "CUSTOM", label: "Custom", icon: "sparkles" },
] as const;

export const ESCALATION_RESPONSES = [
  "Not quite. Here's why:",
  "I understand why you might think that, but here's the difference:",
  "Let's verify this together with a concrete example:",
  "I've explained this multiple times. I'm confident in this answer. Shall we move on?",
  "Ok, we'll each keep our perspective. But remember what I said \u2014 we'll revisit this.",
] as const;
