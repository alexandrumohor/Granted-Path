import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL not set");

const adapter = new PrismaNeon({ connectionString: databaseUrl });
const db = new PrismaClient({ adapter });

async function seedAchievements() {
  const achievements = [
    { name: "First Steps", description: "Complete your first lesson", rarity: "COMMON", condition: { type: "lessons_completed", count: 1 } },
    { name: "Curious Mind", description: "Complete 10 lessons", rarity: "COMMON", condition: { type: "lessons_completed", count: 10 } },
    { name: "Dedicated Learner", description: "Complete 50 lessons", rarity: "UNCOMMON", condition: { type: "lessons_completed", count: 50 } },
    { name: "Course Crusher", description: "Finish your first course", rarity: "UNCOMMON", condition: { type: "courses_completed", count: 1 } },
    { name: "Streak Starter", description: "Maintain a 7-day learning streak", rarity: "COMMON", condition: { type: "streak_days", count: 7 } },
    { name: "Iron Streak", description: "Maintain a 30-day learning streak", rarity: "RARE", condition: { type: "streak_days", count: 30 } },
    { name: "Diamond Streak", description: "Maintain a 100-day learning streak", rarity: "EPIC", condition: { type: "streak_days", count: 100 } },
    { name: "Quiz Champion", description: "Score 100% on 10 quizzes", rarity: "UNCOMMON", condition: { type: "perfect_quizzes", count: 10 } },
    { name: "Exam Ready", description: "Complete a full exam simulation", rarity: "RARE", condition: { type: "exams_completed", count: 1 } },
    { name: "Polyglot", description: "Start courses in 3 different languages", rarity: "RARE", condition: { type: "languages_started", count: 3 } },
    { name: "Helping Hand", description: "Answer 25 questions in study groups", rarity: "UNCOMMON", condition: { type: "group_answers", count: 25 } },
    { name: "Night Owl", description: "Study for 30 minutes after 10 PM", rarity: "COMMON", condition: { type: "late_session", count: 1 } },
    { name: "Early Bird", description: "Study for 30 minutes before 7 AM", rarity: "COMMON", condition: { type: "early_session", count: 1 } },
    { name: "Granted Master", description: "Complete 10 courses with 90%+ average", rarity: "LEGENDARY", condition: { type: "master_courses", count: 10 } },
  ] as const;

  for (const a of achievements) {
    await db.achievement.upsert({
      where: { name: a.name },
      update: { description: a.description, rarity: a.rarity, condition: a.condition },
      create: { name: a.name, description: a.description, rarity: a.rarity, condition: a.condition },
    });
  }
  console.log(`✓ ${achievements.length} achievements seeded`);
}

async function seedCourses() {
  const courses = [
    {
      slug: "python-fundamentals",
      title: "Python Fundamentals",
      description: "Learn Python from zero — variables, control flow, functions, OOP, and your first real project. Designed for complete beginners.",
      category: "IT_PROGRAMMING",
      subcategory: "Programming",
      difficulty: "BEGINNER",
      estimatedHours: 12,
      language: "en",
      modules: [
        { title: "Getting Started with Python", lessons: ["Why Python?", "Installing Python and VS Code", "Your first Python script", "Variables and types"] },
        { title: "Control Flow", lessons: ["if / elif / else", "for and while loops", "Break, continue, pass", "Practical exercises"] },
        { title: "Functions and Modules", lessons: ["Defining functions", "Arguments and return values", "Importing modules", "Standard library tour"] },
        { title: "Object-Oriented Python", lessons: ["Classes and objects", "Inheritance", "Magic methods", "Building a small CLI tool"] },
      ],
    },
    {
      slug: "javascript-essentials",
      title: "JavaScript Essentials",
      description: "Modern JavaScript from the ground up — ES6+, async, DOM, fetch API, and how to build interactive web pages.",
      category: "IT_PROGRAMMING",
      subcategory: "Web Development",
      difficulty: "BEGINNER",
      estimatedHours: 14,
      language: "en",
      modules: [
        { title: "JavaScript Basics", lessons: ["What JavaScript actually does", "Variables: let, const, var", "Types and coercion", "Operators and expressions"] },
        { title: "Functions and Scope", lessons: ["Function declarations vs expressions", "Arrow functions", "Closures explained", "this and bind"] },
        { title: "Asynchronous JavaScript", lessons: ["Callbacks", "Promises", "Async / await", "Fetch API"] },
        { title: "DOM and Events", lessons: ["Selecting elements", "Event listeners", "Modifying the DOM", "Building a todo app"] },
      ],
    },
    {
      slug: "marketing-fundamentals",
      title: "Marketing Fundamentals",
      description: "The principles every marketer should know — positioning, messaging, channels, funnels, and how to measure what matters.",
      category: "MARKETING",
      subcategory: "Strategy",
      difficulty: "BEGINNER",
      estimatedHours: 8,
      language: "en",
      modules: [
        { title: "Marketing Basics", lessons: ["What marketing really is", "Customer vs product focus", "The 4 P's", "Positioning"] },
        { title: "Channels", lessons: ["Organic vs paid", "Content marketing", "Social media", "Email marketing"] },
        { title: "Funnels and Metrics", lessons: ["The funnel concept", "Conversion rates", "CAC and LTV", "Attribution"] },
      ],
    },
    {
      slug: "english-conversation-b2",
      title: "English Conversation — B2",
      description: "Speak English with confidence. Real-world conversations, idioms, pronunciation drills, and AI-powered roleplay.",
      category: "LANGUAGES",
      subcategory: "English",
      difficulty: "INTERMEDIATE",
      estimatedHours: 20,
      language: "en",
      modules: [
        { title: "Everyday Conversation", lessons: ["Greetings and small talk", "Asking for directions", "At the restaurant", "Shopping"] },
        { title: "Work Situations", lessons: ["Job interview basics", "Email etiquette", "Meeting vocabulary", "Negotiation phrases"] },
        { title: "Idioms and Phrasal Verbs", lessons: ["Top 50 idioms", "Phrasal verbs with 'get'", "Phrasal verbs with 'take'", "Common mistakes"] },
      ],
    },
    {
      slug: "permis-auto-categoria-b",
      title: "Permis Auto — Categoria B",
      description: "Pregătire completă pentru examenul auto categoria B în România. Legislație, pericole, întrebări tipice.",
      category: "EXAM_PREP",
      subcategory: "Driving",
      difficulty: "BEGINNER",
      estimatedHours: 15,
      language: "ro",
      modules: [
        { title: "Legislație Rutieră", lessons: ["Definiții esențiale", "Documente obligatorii", "Drepturi și obligații", "Sancțiuni"] },
        { title: "Indicatoare Rutiere", lessons: ["Indicatoare de avertizare", "Indicatoare de interzicere", "Indicatoare de obligare", "Indicatoare de orientare"] },
        { title: "Conducere Defensivă", lessons: ["Distanța de siguranță", "Depășirea", "Intersecții fără semafor", "Condiții meteo dificile"] },
      ],
    },
    {
      slug: "project-management-basics",
      title: "Project Management Basics",
      description: "From kickoff to delivery — scope, timeline, stakeholders, risks, and the soft skills that actually move projects forward.",
      category: "BUSINESS_MANAGEMENT",
      subcategory: "Project Management",
      difficulty: "BEGINNER",
      estimatedHours: 10,
      language: "en",
      modules: [
        { title: "Project Foundations", lessons: ["What is a project?", "Project lifecycle", "Stakeholders", "Scope and constraints"] },
        { title: "Planning", lessons: ["Work breakdown structure", "Estimating effort", "Gantt charts", "Risk identification"] },
        { title: "Execution and Closing", lessons: ["Daily stand-ups", "Status reporting", "Change management", "Lessons learned"] },
      ],
    },
  ] as const;

  for (const c of courses) {
    const existing = await db.course.findUnique({ where: { slug: c.slug } });
    if (existing) {
      console.log(`  - ${c.slug} already exists, skipping`);
      continue;
    }

    await db.course.create({
      data: {
        slug: c.slug,
        title: c.title,
        description: c.description,
        category: c.category,
        subcategory: c.subcategory,
        difficulty: c.difficulty,
        estimatedHours: c.estimatedHours,
        language: c.language,
        isPublished: true,
        modules: {
          create: c.modules.map((m, mi) => ({
            title: m.title,
            order: mi + 1,
            lessons: {
              create: m.lessons.map((title, li) => ({
                title,
                order: li + 1,
                type: "TEXT",
                estimatedMinutes: 8,
                content: [
                  { type: "heading", text: title },
                  { type: "paragraph", text: `Welcome to "${title}". This lesson is part of the course "${c.title}".` },
                  { type: "paragraph", text: "AI tutor content will be generated dynamically when you start this lesson." },
                ],
              })),
            },
          })),
        },
      },
    });
    console.log(`  ✓ ${c.slug}`);
  }
  console.log(`✓ ${courses.length} courses seeded`);
}

async function main() {
  console.log("🌱 Seeding database...\n");
  await seedAchievements();
  await seedCourses();
  console.log("\n✅ Seed complete");
}

main()
  .catch(e => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
