// ============================================
// SOFT LEARN — Core Type Definitions
// ============================================

export type UserRole = "USER" | "TEACHER" | "MANAGER" | "ORG_ADMIN" | "SUPER_ADMIN";
export type SubscriptionTier = "FREE" | "STARTER" | "PRO" | "MASTER";
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "PAST_DUE" | "TRIALING";
export type OrgType = "SCHOOL" | "HIGH_SCHOOL" | "UNIVERSITY" | "BUSINESS";
export type OrgPlan = "SCHOOL" | "HIGH_SCHOOL" | "UNIVERSITY" | "TEAM" | "BUSINESS" | "ENTERPRISE" | "CORPORATION";
export type OrgMemberRole = "ORG_ADMIN" | "TEACHER" | "STUDENT" | "PARENT" | "MANAGER" | "EMPLOYEE";

export type LearningStyle = "VISUAL" | "READING" | "HANDS_ON" | "AUDITORY" | "CONVERSATIONAL";
export type PacePreference = "SLOW" | "NORMAL" | "FAST";
export type MotivationType = "GOAL" | "CURIOSITY" | "CAREER" | "EXAM";
export type ToughLoveLevel = "GENTLE" | "BALANCED" | "STRICT";

export interface LearnerProfile {
  learningStyleScores: Record<LearningStyle, number>;
  pacePreference: PacePreference;
  motivationType: MotivationType;
  toughLoveLevel: ToughLoveLevel;
  avgSessionMinutes: number;
  bestStudyHours: number[];
  retentionRate: number;
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastStudiedAt: Date | null;
}

export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type LessonType = "TEXT" | "INTERACTIVE" | "VIDEO" | "PRACTICE";
export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "PAUSED" | "ABANDONED";
export type LessonStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type CourseCategory =
  | "IT_PROGRAMMING" | "BUSINESS_MANAGEMENT" | "MARKETING" | "LANGUAGES"
  | "EXAM_PREP" | "SCIENCES" | "DESIGN_CREATIVITY" | "FINANCE_ACCOUNTING"
  | "LAW_LEGISLATION" | "HEALTH_MEDICINE" | "SOFT_SKILLS" | "CUSTOM";

export type LessonContentBlock =
  | { type: "text"; content: string }
  | { type: "heading"; content: string; level: 1 | 2 | 3 }
  | { type: "callout"; content: string; variant: "info" | "warning" | "tip" }
  | { type: "code"; content: string; language: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quiz_inline"; question: string; options: string[]; correctIndex: number; explanation: string }
  | { type: "flashcard_inline"; front: string; back: string };

export type ExerciseType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK" | "OPEN_ENDED" | "CODE" | "MATCHING" | "ORDERING";
export type GoalType = "EXAM" | "SKILL" | "CAREER" | "CURIOSITY" | "CUSTOM";
export type GoalStatus = "ACTIVE" | "COMPLETED" | "ABANDONED";
export type MasteryStatus = "NOT_STARTED" | "LEARNING" | "REVIEWING" | "MASTERED";
export type AIConversationType = "STUDY_BUDDY" | "LESSON" | "ASSESSMENT" | "EXAM_PREP";
export type ConvictionLevel = 1 | 2 | 3 | 4 | 5;
export type CertificateType = "COMPLETION" | "PROFICIENCY" | "MASTERY";
export type NotificationType = "STUDY_REMINDER" | "STREAK_WARNING" | "STREAK_CELEBRATE" | "GOAL_DEADLINE" | "REVIEW_DUE" | "ACHIEVEMENT_UNLOCKED" | "WEEKLY_REPORT" | "EXAM_APPROACHING" | "INACTIVITY" | "AI_INSIGHT";
export type NotificationChannel = "IN_APP" | "EMAIL" | "PUSH";

export type LearningEventType =
  | "SESSION_START" | "SESSION_END" | "LESSON_OPEN" | "LESSON_COMPLETE"
  | "LESSON_ABANDON" | "EXERCISE_ANSWER" | "QUIZ_START" | "QUIZ_COMPLETE"
  | "HINT_REQUEST" | "AI_CHAT_MESSAGE" | "FLASHCARD_REVIEW"
  | "IDLE_DETECTED" | "TAB_SWITCH" | "GOAL_CREATED" | "GOAL_COMPLETED" | "ACHIEVEMENT_UNLOCKED";

export interface ConvictionState {
  claimId: string;
  aiPosition: string;
  confidenceLevel: number;
  escalationLevel: ConvictionLevel;
  resolved: boolean;
}

export interface PlanLimits {
  activeCourses: number;
  aiMessagesPerDay: number;
  exercisesPerDay: number;
  examSimsPerWeek: number;
  flashcardsPerDay: number;
  offlineCourses: number;
  studyGroups: number;
  hasAds: boolean;
  hasCertificates: boolean;
  hasVoiceMode: boolean;
  hasPanicMode: boolean;
  hasAdvancedAI: boolean;
  analyticsHistoryDays: number;
}
