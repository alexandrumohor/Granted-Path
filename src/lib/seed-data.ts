// Mock course data until DB is connected

export interface SeedLesson {
  id: string;
  title: string;
  estimatedMinutes: number;
  content: ContentBlock[];
}

export interface ContentBlock {
  type: "text" | "heading" | "callout" | "code" | "quiz_inline";
  content?: string;
  level?: number;
  variant?: "info" | "warning" | "tip";
  language?: string;
  question?: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
}

export interface SeedModule {
  id: string;
  title: string;
  lessons: SeedLesson[];
}

export interface SeedCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  categoryLabel: string;
  difficulty: string;
  estimatedHours: number;
  language: string;
  rating: number;
  enrollmentCount: number;
  modules: SeedModule[];
}

export const SEED_COURSES: SeedCourse[] = [
  {
    id: "python-fundamentals",
    title: "Python Fundamentals",
    slug: "python-fundamentals",
    description: "Learn Python from scratch — variables, data types, control flow, functions, and OOP basics. Perfect for beginners.",
    category: "IT_PROGRAMMING",
    categoryLabel: "IT & Programming",
    difficulty: "BEGINNER",
    estimatedHours: 12,
    language: "en",
    rating: 4.8,
    enrollmentCount: 2340,
    modules: [
      {
        id: "py-m1",
        title: "Getting Started",
        lessons: [
          {
            id: "py-l1",
            title: "What is Python?",
            estimatedMinutes: 10,
            content: [
              { type: "heading", content: "What is Python?", level: 1 },
              { type: "text", content: "Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It's known for its clean, readable syntax and is one of the most popular languages in the world." },
              { type: "callout", content: "Python is used in web development, data science, AI/ML, automation, game development, and much more.", variant: "info" },
              { type: "heading", content: "Why Learn Python?", level: 2 },
              { type: "text", content: "Python is beginner-friendly, has a massive community, and is in high demand in the job market. Companies like Google, Netflix, Instagram, and Spotify use Python extensively." },
              { type: "code", content: "print(\"Hello, World!\")", language: "python" },
              { type: "quiz_inline", question: "What type of language is Python?", options: ["Compiled", "Interpreted", "Assembly", "Machine code"], correctIndex: 1, explanation: "Python is an interpreted language — code is executed line by line by the Python interpreter." },
            ],
          },
          {
            id: "py-l2",
            title: "Installing Python & Your First Program",
            estimatedMinutes: 15,
            content: [
              { type: "heading", content: "Installing Python", level: 1 },
              { type: "text", content: "Download Python from python.org. Make sure to check 'Add Python to PATH' during installation on Windows." },
              { type: "heading", content: "Your First Program", level: 2 },
              { type: "text", content: "Open a terminal and type `python` to start the interactive interpreter, or create a file called `hello.py`:" },
              { type: "code", content: "# hello.py\nname = input(\"What's your name? \")\nprint(f\"Hello, {name}! Welcome to Python.\")", language: "python" },
              { type: "callout", content: "The f-string (f\"...\") is Python's way of embedding variables inside strings. You'll use this constantly.", variant: "tip" },
            ],
          },
        ],
      },
      {
        id: "py-m2",
        title: "Variables & Data Types",
        lessons: [
          {
            id: "py-l3",
            title: "Variables and Assignment",
            estimatedMinutes: 12,
            content: [
              { type: "heading", content: "Variables in Python", level: 1 },
              { type: "text", content: "A variable is a name that refers to a value. In Python, you don't need to declare the type — Python figures it out automatically." },
              { type: "code", content: "age = 25          # integer\nname = \"Alice\"     # string\nheight = 1.75      # float\nis_student = True  # boolean", language: "python" },
              { type: "callout", content: "Python is dynamically typed. You can reassign a variable to a different type: x = 5 then x = \"hello\" — both are valid.", variant: "info" },
              { type: "quiz_inline", question: "What is the type of: x = 3.14?", options: ["int", "str", "float", "bool"], correctIndex: 2, explanation: "3.14 has a decimal point, so Python treats it as a float." },
            ],
          },
          {
            id: "py-l4",
            title: "Strings, Numbers & Booleans",
            estimatedMinutes: 15,
            content: [
              { type: "heading", content: "Core Data Types", level: 1 },
              { type: "text", content: "Python has several built-in data types. The most common are strings (text), integers (whole numbers), floats (decimal numbers), and booleans (True/False)." },
              { type: "code", content: "# String operations\ngreeting = \"Hello\"\nprint(greeting.upper())    # HELLO\nprint(greeting.lower())    # hello\nprint(len(greeting))       # 5\nprint(greeting[0])         # H\nprint(greeting[1:4])       # ell", language: "python" },
              { type: "code", content: "# Number operations\na = 10\nb = 3\nprint(a + b)   # 13\nprint(a / b)   # 3.333...\nprint(a // b)  # 3 (floor division)\nprint(a % b)   # 1 (remainder)\nprint(a ** b)  # 1000 (power)", language: "python" },
            ],
          },
        ],
      },
      {
        id: "py-m3",
        title: "Control Flow",
        lessons: [
          { id: "py-l5", title: "If, Elif, Else", estimatedMinutes: 12, content: [
            { type: "heading", content: "Conditional Statements", level: 1 },
            { type: "text", content: "Conditionals let your program make decisions based on conditions." },
            { type: "code", content: "age = 18\n\nif age >= 18:\n    print(\"You can vote!\")\nelif age >= 16:\n    print(\"Almost there!\")\nelse:\n    print(\"Too young to vote.\")", language: "python" },
            { type: "callout", content: "Python uses indentation (4 spaces) instead of curly braces to define code blocks. This is not optional!", variant: "warning" },
          ]},
          { id: "py-l6", title: "Loops — For & While", estimatedMinutes: 15, content: [
            { type: "heading", content: "Loops", level: 1 },
            { type: "text", content: "Loops let you repeat code. Python has two types: for loops (iterate over sequences) and while loops (repeat while condition is true)." },
            { type: "code", content: "# For loop\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(fruit)\n\n# While loop\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1", language: "python" },
          ]},
        ],
      },
    ],
  },
  {
    id: "digital-marketing-101",
    title: "Digital Marketing 101",
    slug: "digital-marketing-101",
    description: "Master the fundamentals of digital marketing — SEO, social media, content marketing, email marketing, and paid ads.",
    category: "MARKETING",
    categoryLabel: "Marketing",
    difficulty: "BEGINNER",
    estimatedHours: 8,
    language: "en",
    rating: 4.6,
    enrollmentCount: 1850,
    modules: [
      { id: "dm-m1", title: "What is Digital Marketing?", lessons: [
        { id: "dm-l1", title: "The Digital Marketing Landscape", estimatedMinutes: 10, content: [
          { type: "heading", content: "Digital Marketing Overview", level: 1 },
          { type: "text", content: "Digital marketing is the promotion of products or services using digital channels — search engines, social media, email, websites, and apps." },
          { type: "text", content: "Unlike traditional marketing (TV, print, radio), digital marketing allows precise targeting, real-time analytics, and significantly lower costs." },
          { type: "quiz_inline", question: "Which is NOT a digital marketing channel?", options: ["Google Ads", "Instagram", "Billboard", "Email newsletter"], correctIndex: 2, explanation: "Billboards are traditional (offline) marketing, not digital." },
        ]},
      ]},
      { id: "dm-m2", title: "SEO Fundamentals", lessons: [
        { id: "dm-l2", title: "How Search Engines Work", estimatedMinutes: 12, content: [
          { type: "heading", content: "Search Engine Optimization", level: 1 },
          { type: "text", content: "SEO is the practice of optimizing your website to rank higher in search engine results. Google processes over 8.5 billion searches per day." },
          { type: "callout", content: "SEO is a long-term strategy. It takes 3-6 months to see significant results, but the traffic is free and compounds over time.", variant: "tip" },
          { type: "text", content: "The three pillars of SEO are: On-page (content, keywords, meta tags), Off-page (backlinks, authority), and Technical (speed, mobile, crawlability)." },
        ]},
      ]},
    ],
  },
  {
    id: "english-conversation-b2",
    title: "English Conversation B2",
    slug: "english-conversation-b2",
    description: "Improve your English speaking skills to upper-intermediate level. Practice real conversations, idioms, and fluency techniques.",
    category: "LANGUAGES",
    categoryLabel: "Foreign Languages",
    difficulty: "INTERMEDIATE",
    estimatedHours: 15,
    language: "en",
    rating: 4.7,
    enrollmentCount: 3100,
    modules: [
      { id: "en-m1", title: "Expressing Opinions", lessons: [
        { id: "en-l1", title: "Agreeing & Disagreeing Politely", estimatedMinutes: 12, content: [
          { type: "heading", content: "How to Express Your Opinion", level: 1 },
          { type: "text", content: "In English conversations, it's important to express agreement and disagreement in a polite, nuanced way — especially in professional settings." },
          { type: "callout", content: "Strong agreement: 'Absolutely!', 'I couldn't agree more.'\nMild agreement: 'I see your point.', 'That's a fair point.'\nMild disagreement: 'I see what you mean, but...', 'That's true, however...'\nStrong disagreement: 'I'm afraid I disagree.', 'I don't think that's quite right.'", variant: "info" },
          { type: "quiz_inline", question: "Which phrase expresses MILD disagreement?", options: ["Absolutely!", "I couldn't agree more", "I see what you mean, but...", "You're completely wrong"], correctIndex: 2, explanation: "'I see what you mean, but...' acknowledges the other person's view before presenting your own — that's mild, polite disagreement." },
        ]},
      ]},
    ],
  },
  {
    id: "permis-auto-ro",
    title: "Permis Auto Romania — Legislatie",
    slug: "permis-auto-ro",
    description: "Pregatire completa pentru examenul de legislatie la permisul auto. Intrebari, explicatii si simulari de examen.",
    category: "EXAM_PREP",
    categoryLabel: "Exam Preparation",
    difficulty: "BEGINNER",
    estimatedHours: 10,
    language: "ro",
    rating: 4.9,
    enrollmentCount: 5200,
    modules: [
      { id: "pa-m1", title: "Reguli de circulatie", lessons: [
        { id: "pa-l1", title: "Semnificatia indicatoarelor", estimatedMinutes: 15, content: [
          { type: "heading", content: "Indicatoare rutiere", level: 1 },
          { type: "text", content: "Indicatoarele rutiere sunt semne plasate pe drumurile publice care reglementeaza circulatia. Sunt impartite in mai multe categorii: de avertizare, de reglementare, de orientare si indicatoare aditionale." },
          { type: "callout", content: "Indicatoarele de avertizare au forma triunghiulara cu varf in sus si sunt cu chenar rosu. Ele te previn despre un pericol pe drum.", variant: "info" },
          { type: "quiz_inline", question: "Ce forma au indicatoarele de avertizare?", options: ["Cerc", "Patrat", "Triunghi cu varf in sus", "Octogon"], correctIndex: 2, explanation: "Indicatoarele de avertizare sunt triunghiulare cu varful in sus si chenar rosu." },
        ]},
      ]},
    ],
  },
  {
    id: "project-management",
    title: "Project Management Essentials",
    slug: "project-management",
    description: "Learn how to plan, execute, and deliver projects successfully. Covers Agile, Scrum, Waterfall, and practical tools.",
    category: "BUSINESS_MANAGEMENT",
    categoryLabel: "Business & Management",
    difficulty: "BEGINNER",
    estimatedHours: 10,
    language: "en",
    rating: 4.5,
    enrollmentCount: 1200,
    modules: [
      { id: "pm-m1", title: "Introduction to Project Management", lessons: [
        { id: "pm-l1", title: "What is a Project?", estimatedMinutes: 10, content: [
          { type: "heading", content: "Defining a Project", level: 1 },
          { type: "text", content: "A project is a temporary endeavor with a defined beginning and end, undertaken to create a unique product, service, or result. It's different from operations, which are ongoing." },
          { type: "text", content: "Every project has three constraints known as the 'Iron Triangle': Scope, Time, and Cost. Changing one affects the others." },
          { type: "quiz_inline", question: "What are the three constraints of the Iron Triangle?", options: ["People, Process, Tools", "Scope, Time, Cost", "Plan, Execute, Close", "Quality, Risk, Budget"], correctIndex: 1, explanation: "The Iron Triangle (or Triple Constraint) consists of Scope, Time, and Cost. Balancing these three is the core challenge of project management." },
        ]},
      ]},
    ],
  },
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    slug: "javascript-fundamentals",
    description: "Learn JavaScript from zero — the language of the web. Variables, functions, DOM manipulation, async/await, and modern ES6+ features.",
    category: "IT_PROGRAMMING",
    categoryLabel: "IT & Programming",
    difficulty: "BEGINNER",
    estimatedHours: 14,
    language: "en",
    rating: 4.7,
    enrollmentCount: 2800,
    modules: [
      { id: "js-m1", title: "JavaScript Basics", lessons: [
        { id: "js-l1", title: "Variables: let, const, var", estimatedMinutes: 12, content: [
          { type: "heading", content: "Variables in JavaScript", level: 1 },
          { type: "text", content: "JavaScript has three ways to declare variables: var (old way), let (block-scoped, reassignable), and const (block-scoped, not reassignable)." },
          { type: "code", content: "const name = \"Alice\";  // Cannot be reassigned\nlet age = 25;          // Can be reassigned\nvar old = \"avoid\";     // Function-scoped, avoid using\n\nage = 26;  // OK\n// name = \"Bob\";  // ERROR: Assignment to constant", language: "javascript" },
          { type: "callout", content: "Rule of thumb: Use const by default. Only use let when you need to reassign. Never use var.", variant: "tip" },
        ]},
      ]},
    ],
  },
];

export function getCourse(slug: string): SeedCourse | undefined {
  return SEED_COURSES.find((c) => c.slug === slug);
}

export function getLesson(courseSlug: string, lessonId: string): { course: SeedCourse; lesson: SeedLesson; module: SeedModule } | undefined {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { course, lesson, module: mod };
  }
  return undefined;
}
