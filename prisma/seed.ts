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
    { name: "Primii Pasi", description: "Completeaza prima ta lectie", rarity: "COMMON", condition: { type: "lessons_completed", count: 1 } },
    { name: "Minte Curioasa", description: "Completeaza 10 lectii", rarity: "COMMON", condition: { type: "lessons_completed", count: 10 } },
    { name: "Cursant Dedicat", description: "Completeaza 50 de lectii", rarity: "UNCOMMON", condition: { type: "lessons_completed", count: 50 } },
    { name: "Demolator de Cursuri", description: "Termina primul tau curs", rarity: "UNCOMMON", condition: { type: "courses_completed", count: 1 } },
    { name: "Seria Incepe", description: "Mentine o serie de invatare de 7 zile", rarity: "COMMON", condition: { type: "streak_days", count: 7 } },
    { name: "Serie de Fier", description: "Mentine o serie de invatare de 30 de zile", rarity: "RARE", condition: { type: "streak_days", count: 30 } },
    { name: "Serie de Diamant", description: "Mentine o serie de invatare de 100 de zile", rarity: "EPIC", condition: { type: "streak_days", count: 100 } },
    { name: "Campion la Quiz", description: "Obtine 100% la 10 quiz-uri", rarity: "UNCOMMON", condition: { type: "perfect_quizzes", count: 10 } },
    { name: "Pregatit de Examen", description: "Completeaza o simulare de examen completa", rarity: "RARE", condition: { type: "exams_completed", count: 1 } },
    { name: "Poliglot", description: "Incepe cursuri in 3 limbi diferite", rarity: "RARE", condition: { type: "languages_started", count: 3 } },
    { name: "Mana de Ajutor", description: "Raspunde la 25 de intrebari in grupuri de studiu", rarity: "UNCOMMON", condition: { type: "group_answers", count: 25 } },
    { name: "Bufnita de Noapte", description: "Studiaza 30 de minute dupa ora 22", rarity: "COMMON", condition: { type: "late_session", count: 1 } },
    { name: "Pasare Matinala", description: "Studiaza 30 de minute inainte de ora 7", rarity: "COMMON", condition: { type: "early_session", count: 1 } },
    { name: "Maestru Granted", description: "Completeaza 10 cursuri cu media 90%+", rarity: "LEGENDARY", condition: { type: "master_courses", count: 10 } },
  ] as const;

  // Delete old achievements first
  await db.achievement.deleteMany({});

  for (const a of achievements) {
    await db.achievement.create({
      data: { name: a.name, description: a.description, rarity: a.rarity, condition: a.condition },
    });
  }
  console.log(`✓ ${achievements.length} realizari adaugate`);
}

async function seedCourses() {
  // Delete old courses (cascades to modules + lessons)
  await db.lesson.deleteMany({});
  await db.module.deleteMany({});
  await db.course.deleteMany({});

  const courses = [
    {
      slug: "fundamentele-python",
      title: "Fundamentele Python",
      description: "Invata Python de la zero — variabile, flux de control, functii, OOP si primul tau proiect real. Creat pentru incepatori completi.",
      category: "IT_PROGRAMMING",
      subcategory: "Programare",
      difficulty: "BEGINNER",
      estimatedHours: 12,
      language: "ro",
      sources: [
        { name: "Documentatia Oficiala Python", url: "https://docs.python.org/3/tutorial/" },
        { name: "Python Language Reference", url: "https://docs.python.org/3/reference/" },
        { name: "PEP 8 — Style Guide", url: "https://peps.python.org/pep-0008/" },
      ],
      modules: [
        { title: "Primii Pasi cu Python", lessons: ["De ce Python?", "Instalarea Python si VS Code", "Primul tau script Python", "Variabile si tipuri"] },
        { title: "Flux de Control", lessons: ["if / elif / else", "Bucle for si while", "Break, continue, pass", "Exercitii practice"] },
        { title: "Functii si Module", lessons: ["Definirea functiilor", "Argumente si valori returnate", "Importarea modulelor", "Tur al bibliotecii standard"] },
        { title: "Python Orientat pe Obiecte", lessons: ["Clase si obiecte", "Mostenire", "Metode magice", "Construirea unui mic tool CLI"] },
      ],
    },
    {
      slug: "esentialele-javascript",
      title: "Esentialele JavaScript",
      description: "JavaScript modern de la baza — ES6+, async, DOM, fetch API si cum sa construiesti pagini web interactive.",
      category: "IT_PROGRAMMING",
      subcategory: "Dezvoltare Web",
      difficulty: "BEGINNER",
      estimatedHours: 14,
      language: "ro",
      sources: [
        { name: "MDN Web Docs — JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
        { name: "ECMAScript Specification", url: "https://tc39.es/ecma262/" },
        { name: "JavaScript.info", url: "https://javascript.info/" },
      ],
      modules: [
        { title: "Bazele JavaScript", lessons: ["Ce face de fapt JavaScript", "Variabile: let, const, var", "Tipuri si conversie", "Operatori si expresii"] },
        { title: "Functii si Scope", lessons: ["Declaratii vs expresii de functii", "Arrow functions", "Closures explicat", "this si bind"] },
        { title: "JavaScript Asincron", lessons: ["Callback-uri", "Promises", "Async / await", "Fetch API"] },
        { title: "DOM si Evenimente", lessons: ["Selectarea elementelor", "Event listeners", "Modificarea DOM-ului", "Construirea unei aplicatii todo"] },
      ],
    },
    {
      slug: "fundamentele-marketingului",
      title: "Fundamentele Marketingului",
      description: "Principiile pe care orice marketer ar trebui sa le stie — pozitionare, mesaje, canale, funnels si cum sa masori ce conteaza.",
      category: "MARKETING",
      subcategory: "Strategie",
      difficulty: "BEGINNER",
      estimatedHours: 8,
      language: "ro",
      sources: [
        { name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage" },
        { name: "HubSpot Academy — Marketing", url: "https://academy.hubspot.com/courses/inbound-marketing" },
        { name: "Philip Kotler — Marketing Management", url: "https://www.pearson.com/en-us/subject-catalog/p/marketing-management/P200000005765" },
      ],
      modules: [
        { title: "Bazele Marketingului", lessons: ["Ce este de fapt marketingul", "Focus pe client vs produs", "Cei 4 P", "Pozitionarea"] },
        { title: "Canale", lessons: ["Organic vs platit", "Marketing de continut", "Social media", "Email marketing"] },
        { title: "Funnel-uri si Metrici", lessons: ["Conceptul de funnel", "Rate de conversie", "CAC si LTV", "Atribuire"] },
      ],
    },
    {
      slug: "conversatie-engleza-b2",
      title: "Conversatie Engleza — B2",
      description: "Vorbeste engleza cu incredere. Conversatii din viata reala, expresii, exercitii de pronuntie si roleplay cu AI.",
      category: "LANGUAGES",
      subcategory: "Engleza",
      difficulty: "INTERMEDIATE",
      estimatedHours: 20,
      language: "ro",
      sources: [
        { name: "Cambridge B2 First — Handbook", url: "https://www.cambridgeenglish.org/exams-and-tests/first/" },
        { name: "CEFR — Common European Framework", url: "https://www.coe.int/en/web/common-european-framework-reference-languages" },
        { name: "British Council — B2 Resources", url: "https://learnenglish.britishcouncil.org/english-levels/b2-english-level" },
      ],
      modules: [
        { title: "Conversatie Zilnica", lessons: ["Saluturi si small talk", "Intrebari de directie", "La restaurant", "Cumparaturi"] },
        { title: "Situatii de Munca", lessons: ["Bazele interviului de angajare", "Eticheta email", "Vocabular de sedinta", "Fraze de negociere"] },
        { title: "Expresii si Phrasal Verbs", lessons: ["Top 50 expresii", "Phrasal verbs cu 'get'", "Phrasal verbs cu 'take'", "Greseli comune"] },
      ],
    },
    {
      slug: "permis-auto-categoria-b",
      title: "Permis Auto — Categoria B",
      description: "Pregatire completa pentru examenul auto categoria B in Romania. Legislatie, pericole, intrebari tipice.",
      category: "EXAM_PREP",
      subcategory: "Sofat",
      difficulty: "BEGINNER",
      estimatedHours: 15,
      language: "ro",
      sources: [
        { name: "Codul Rutier — OUG 195/2002", url: "https://legislatie.just.ro/Public/DetaliiDocument/40732" },
        { name: "Regulamentul de aplicare — HG 1391/2006", url: "https://legislatie.just.ro/Public/DetaliiDocument/77297" },
        { name: "DRPCIV — Informatii examen", url: "https://www.drpciv.ro/" },
      ],
      modules: [
        { title: "Legislatie Rutiera", lessons: ["Definitii esentiale", "Documente obligatorii", "Drepturi si obligatii", "Sanctiuni"] },
        { title: "Indicatoare Rutiere", lessons: ["Indicatoare de avertizare", "Indicatoare de interzicere", "Indicatoare de obligare", "Indicatoare de orientare"] },
        { title: "Conducere Defensiva", lessons: ["Distanta de siguranta", "Depasirea", "Intersectii fara semafor", "Conditii meteo dificile"] },
      ],
    },
    {
      slug: "bazele-managementului-de-proiect",
      title: "Bazele Managementului de Proiect",
      description: "De la kickoff la livrare — scop, timeline, stakeholderi, riscuri si abilitatile soft care chiar misca proiectele inainte.",
      category: "BUSINESS_MANAGEMENT",
      subcategory: "Management de Proiect",
      difficulty: "BEGINNER",
      estimatedHours: 10,
      language: "ro",
      sources: [
        { name: "PMBOK Guide — PMI", url: "https://www.pmi.org/pmbok-guide-standards/foundational/pmbok" },
        { name: "Scrum Guide", url: "https://scrumguides.org/" },
        { name: "Google Project Management Certificate", url: "https://grow.google/certificates/project-management/" },
      ],
      modules: [
        { title: "Fundamente de Proiect", lessons: ["Ce este un proiect?", "Ciclul de viata al proiectului", "Stakeholderi", "Scop si constrangeri"] },
        { title: "Planificare", lessons: ["Structura de defalcare a muncii", "Estimarea efortului", "Diagrame Gantt", "Identificarea riscurilor"] },
        { title: "Executie si Inchidere", lessons: ["Daily stand-ups", "Raportarea statusului", "Managementul schimbarii", "Lectii invatate"] },
      ],
    },
    // ────── IT & PROGRAMMING ──────
    {
      slug: "sql-si-baze-de-date",
      title: "SQL si Baze de Date",
      description: "Invata SQL de la zero — SELECT, JOIN, GROUP BY, subqueries si design de baze de date relationale.",
      category: "IT_PROGRAMMING",
      subcategory: "Baze de Date",
      difficulty: "BEGINNER",
      estimatedHours: 10,
      language: "ro",
      sources: [
        { name: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/current/tutorial.html" },
        { name: "W3Schools SQL Tutorial", url: "https://www.w3schools.com/sql/" },
        { name: "SQLBolt — Interactive Lessons", url: "https://sqlbolt.com/" },
      ],
      modules: [
        { title: "Primii Pasi SQL", lessons: ["Ce sunt bazele de date?", "Instalare si configurare", "CREATE TABLE", "INSERT, UPDATE, DELETE"] },
        { title: "Interogari", lessons: ["SELECT si WHERE", "ORDER BY si LIMIT", "Functii de agregare", "GROUP BY si HAVING"] },
        { title: "Relatii si JOIN-uri", lessons: ["Primary Key si Foreign Key", "INNER JOIN", "LEFT si RIGHT JOIN", "Subqueries"] },
      ],
    },
    {
      slug: "html-css-responsive",
      title: "HTML, CSS si Design Responsiv",
      description: "Construieste site-uri web moderne de la zero cu HTML5, CSS3, Flexbox, Grid si design mobile-first.",
      category: "IT_PROGRAMMING",
      subcategory: "Dezvoltare Web",
      difficulty: "BEGINNER",
      estimatedHours: 12,
      language: "ro",
      sources: [
        { name: "MDN — HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "MDN — CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "CSS Tricks — Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
      ],
      modules: [
        { title: "HTML5 Fundamente", lessons: ["Structura unui document HTML", "Tag-uri semantice", "Formulare si validare", "Imagini si multimedia"] },
        { title: "CSS3 Modern", lessons: ["Selectori si specificitate", "Box model", "Flexbox", "CSS Grid"] },
        { title: "Design Responsiv", lessons: ["Media queries", "Mobile-first approach", "Unitati relative (rem, vw, vh)", "Construirea unui portofoliu"] },
      ],
    },
    {
      slug: "react-de-la-zero",
      title: "React de la Zero",
      description: "Framework-ul Nr. 1 pentru interfete web — componente, state, hooks, routing si construirea unei aplicatii reale.",
      category: "IT_PROGRAMMING",
      subcategory: "Dezvoltare Web",
      difficulty: "INTERMEDIATE",
      estimatedHours: 18,
      language: "ro",
      sources: [
        { name: "React — Documentatia Oficiala", url: "https://react.dev/learn" },
        { name: "React API Reference", url: "https://react.dev/reference/react" },
      ],
      modules: [
        { title: "Bazele React", lessons: ["Ce este React si de ce?", "JSX si componente", "Props si copii", "Primul proiect React"] },
        { title: "State si Hooks", lessons: ["useState", "useEffect", "Custom hooks", "Formulare controlate"] },
        { title: "Routing si API", lessons: ["React Router", "Fetch si afisare date", "Loading si erori", "Construirea unei aplicatii CRUD"] },
        { title: "Patterns Avansate", lessons: ["Context API", "useReducer", "Performanta si memoizare", "Testare cu Jest"] },
      ],
    },
    {
      slug: "git-si-github",
      title: "Git si GitHub pentru Incepatori",
      description: "Controlul versiunilor practic — commit, branch, merge, pull request si colaborare in echipa.",
      category: "IT_PROGRAMMING",
      subcategory: "Instrumente",
      difficulty: "BEGINNER",
      estimatedHours: 6,
      language: "ro",
      sources: [
        { name: "Git — Documentatia Oficiala", url: "https://git-scm.com/doc" },
        { name: "Pro Git Book", url: "https://git-scm.com/book/en/v2" },
        { name: "GitHub Docs", url: "https://docs.github.com/en" },
      ],
      modules: [
        { title: "Bazele Git", lessons: ["Ce este Git?", "git init, add, commit", "Vizualizarea istoricului", "Undo si reset"] },
        { title: "Branch-uri", lessons: ["Crearea branch-urilor", "Merge si rezolvarea conflictelor", "Git flow simplificat", "Rebase vs merge"] },
        { title: "GitHub si Colaborare", lessons: ["Push, pull, clone", "Pull requests", "Code review", "GitHub Actions — intro"] },
      ],
    },
    // ────── IT — MORE LANGUAGES ──────
    {
      slug: "java-complet",
      title: "Java — De la Zero la Aplicatii",
      description: "Limbajul enterprise nr. 1 — OOP, collections, streams, exceptii, I/O si construirea de aplicatii reale cu Java.",
      category: "IT_PROGRAMMING",
      subcategory: "Programare",
      difficulty: "BEGINNER",
      estimatedHours: 20,
      language: "ro",
      sources: [
        { name: "Oracle Java Tutorials", url: "https://docs.oracle.com/javase/tutorial/" },
        { name: "Oracle Java SE Documentation", url: "https://docs.oracle.com/en/java/javase/21/" },
        { name: "Oracle Java Language Specification", url: "https://docs.oracle.com/javase/specs/jls/se21/html/index.html" },
      ],
      modules: [
        { title: "Bazele Java", lessons: ["Ce este Java si JVM", "Instalare JDK si IntelliJ", "Primul program: Hello World", "Variabile si tipuri primitive", "Operatori si expresii"] },
        { title: "Flux de Control", lessons: ["if / else / switch", "Bucle for, while, do-while", "Break si continue", "Citirea de la tastatura (Scanner)"] },
        { title: "OOP in Java", lessons: ["Clase si obiecte", "Constructori si this", "Mostenire si super", "Interfete si clase abstracte", "Polimorfism"] },
        { title: "Collections si Generics", lessons: ["ArrayList si LinkedList", "HashMap si TreeMap", "Generics — de ce si cum", "Iteratoare si for-each", "Comparable si Comparator"] },
        { title: "Java Avansat", lessons: ["Exceptii si try-catch", "I/O si fisiere", "Streams si Lambda", "Optionals", "Introducere in Spring Boot"] },
      ],
    },
    {
      slug: "csharp-dotnet",
      title: "C# si .NET — Ghid Complet",
      description: "C# modern cu .NET — de la sintaxa de baza la LINQ, async/await, Entity Framework si ASP.NET Core.",
      category: "IT_PROGRAMMING",
      subcategory: "Programare",
      difficulty: "BEGINNER",
      estimatedHours: 18,
      language: "ro",
      sources: [
        { name: "Microsoft C# Documentation", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
        { name: "Microsoft .NET Documentation", url: "https://learn.microsoft.com/en-us/dotnet/" },
        { name: "C# Language Reference", url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/" },
      ],
      modules: [
        { title: "Bazele C#", lessons: ["Ce este C# si .NET", "Instalare Visual Studio", "Hello World si structura", "Variabile si tipuri", "Operatori si conversii"] },
        { title: "Flux de Control", lessons: ["if / else / switch", "Bucle for, foreach, while", "Metode si parametri", "Exceptii si try-catch-finally"] },
        { title: "OOP in C#", lessons: ["Clase si obiecte", "Proprietati si encapsulare", "Mostenire si polimorfism", "Interfete", "Classes vs Structs vs Records"] },
        { title: "C# Modern", lessons: ["LINQ — interogari pe colectii", "Async / await", "Generics", "Pattern matching", "Nullable reference types"] },
      ],
    },
    {
      slug: "typescript-complet",
      title: "TypeScript — JavaScript cu Superputeri",
      description: "Adauga tipuri la JavaScript — generics, interfaces, enums, utility types si configurare tsconfig pentru proiecte reale.",
      category: "IT_PROGRAMMING",
      subcategory: "Dezvoltare Web",
      difficulty: "INTERMEDIATE",
      estimatedHours: 12,
      language: "ro",
      sources: [
        { name: "TypeScript Handbook — Official", url: "https://www.typescriptlang.org/docs/handbook/" },
        { name: "TypeScript Playground", url: "https://www.typescriptlang.org/play" },
        { name: "TypeScript GitHub", url: "https://github.com/microsoft/TypeScript" },
      ],
      modules: [
        { title: "Bazele TypeScript", lessons: ["De ce TypeScript?", "Instalare si tsconfig", "Tipuri primitive si type annotations", "Arrays si tuples", "Enums"] },
        { title: "Tipuri Avansate", lessons: ["Interfaces vs Types", "Union si intersection types", "Literal types si narrowing", "Type guards", "Generics"] },
        { title: "TypeScript in Practica", lessons: ["Utility types (Partial, Pick, Omit)", "Mapped types", "Conditional types", "Decorators", "TypeScript cu React"] },
      ],
    },
    {
      slug: "php-si-laravel",
      title: "PHP si Laravel — Dezvoltare Web Backend",
      description: "PHP modern 8.x si framework-ul Laravel — routing, Eloquent ORM, Blade templates, auth si API-uri REST.",
      category: "IT_PROGRAMMING",
      subcategory: "Dezvoltare Web",
      difficulty: "BEGINNER",
      estimatedHours: 16,
      language: "ro",
      sources: [
        { name: "PHP Manual — Official", url: "https://www.php.net/manual/en/" },
        { name: "Laravel Documentation", url: "https://laravel.com/docs" },
        { name: "PHP: The Right Way", url: "https://phptherightway.com/" },
      ],
      modules: [
        { title: "Bazele PHP", lessons: ["Ce este PHP si unde ruleaza", "Variabile si tipuri", "Operatori si flux de control", "Functii si arrays", "Superglobale ($_GET, $_POST)"] },
        { title: "PHP OOP", lessons: ["Clase si obiecte", "Mostenire si interfete", "Traits", "Namespaces si autoloading", "Composer — dependency manager"] },
        { title: "Laravel Fundamente", lessons: ["Instalarea Laravel", "Routing si Controllers", "Blade Templates", "Eloquent ORM", "Migrations si Seeders"] },
        { title: "Laravel Avansat", lessons: ["Autentificare si autorizare", "Middleware", "API Resources", "Validare", "Deploy pe un server"] },
      ],
    },
    {
      slug: "go-golang",
      title: "Go (Golang) — Limbajul Simplu si Rapid",
      description: "Limbajul creat de Google — concurenta cu goroutines, tipuri statice, compilare rapida si microservicii.",
      category: "IT_PROGRAMMING",
      subcategory: "Programare",
      difficulty: "INTERMEDIATE",
      estimatedHours: 14,
      language: "ro",
      sources: [
        { name: "Go Documentation — Official", url: "https://go.dev/doc/" },
        { name: "A Tour of Go", url: "https://go.dev/tour/" },
        { name: "Effective Go", url: "https://go.dev/doc/effective_go" },
        { name: "Go by Example", url: "https://gobyexample.com/" },
      ],
      modules: [
        { title: "Bazele Go", lessons: ["De ce Go?", "Instalare si primul program", "Variabile si tipuri", "Functii si return multiplu", "Pointeri"] },
        { title: "Structuri de Date", lessons: ["Arrays si slices", "Maps", "Structs", "Interfaces", "Type embedding"] },
        { title: "Concurenta", lessons: ["Goroutines", "Channels", "Select statement", "WaitGroups si Mutex", "Patterns de concurenta"] },
        { title: "Go in Practica", lessons: ["Pachete si module", "Error handling idimatic", "HTTP server cu net/http", "JSON encoding/decoding", "Testare in Go"] },
      ],
    },
    {
      slug: "rust-programare-sigura",
      title: "Rust — Programare de Sistem Sigura",
      description: "Limbajul fara garbage collector — ownership, borrowing, lifetimes, pattern matching si performanta la nivel de C.",
      category: "IT_PROGRAMMING",
      subcategory: "Programare de Sistem",
      difficulty: "ADVANCED",
      estimatedHours: 22,
      language: "ro",
      sources: [
        { name: "The Rust Programming Language (The Book)", url: "https://doc.rust-lang.org/book/" },
        { name: "Rust by Example", url: "https://doc.rust-lang.org/rust-by-example/" },
        { name: "Rust Standard Library Docs", url: "https://doc.rust-lang.org/std/" },
        { name: "Rustlings — Exercises", url: "https://github.com/rust-lang/rustlings" },
      ],
      modules: [
        { title: "Bazele Rust", lessons: ["De ce Rust?", "Instalare cu rustup", "Hello World si cargo", "Variabile si mutabilitate", "Tipuri de date si functii"] },
        { title: "Ownership si Borrowing", lessons: ["Ce este ownership", "Move semantics", "References si borrowing", "Lifetimes — baza", "Slice type"] },
        { title: "Structuri si Enums", lessons: ["Structs si metode", "Enums si pattern matching", "Option si Result", "Error handling cu ?", "Generics"] },
        { title: "Rust Avansat", lessons: ["Traits si implementari", "Closures si iteratoare", "Smart pointers (Box, Rc, Arc)", "Concurenta sigura", "Cargo si crates.io"] },
      ],
    },
    {
      slug: "cpp-modern",
      title: "C++ Modern (C++17/20)",
      description: "C++ de la baza la avansat — pointeri, OOP, STL, smart pointers, move semantics si templates.",
      category: "IT_PROGRAMMING",
      subcategory: "Programare de Sistem",
      difficulty: "INTERMEDIATE",
      estimatedHours: 20,
      language: "ro",
      sources: [
        { name: "cppreference.com", url: "https://en.cppreference.com/w/" },
        { name: "ISO C++ — Get Started", url: "https://isocpp.org/get-started" },
        { name: "Learn C++ (learncpp.com)", url: "https://www.learncpp.com/" },
        { name: "C++ Core Guidelines", url: "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines" },
      ],
      modules: [
        { title: "Bazele C++", lessons: ["Ce este C++ si de ce conteaza", "Compilare si executie", "Variabile si tipuri", "Input/Output cu cin/cout", "Operatori si expresii"] },
        { title: "Flux de Control si Functii", lessons: ["if / else / switch", "Bucle for, while, do-while", "Functii si overloading", "Referinte si pointeri", "Managementul memoriei (new/delete)"] },
        { title: "OOP in C++", lessons: ["Clase si obiecte", "Constructori si destructori", "Mostenire si virtual", "Polimorfism", "Operator overloading"] },
        { title: "C++ Modern", lessons: ["STL: vector, map, set", "Iteratoare si algoritmi", "Smart pointers (unique_ptr, shared_ptr)", "Lambda expressions", "Move semantics si rvalue references"] },
      ],
    },
    {
      slug: "kotlin-android",
      title: "Kotlin — De la Baza la Android",
      description: "Limbajul modern al JVM — null safety, extension functions, coroutines si dezvoltare Android cu Jetpack Compose.",
      category: "IT_PROGRAMMING",
      subcategory: "Dezvoltare Mobile",
      difficulty: "INTERMEDIATE",
      estimatedHours: 16,
      language: "ro",
      sources: [
        { name: "Kotlin Documentation — Official", url: "https://kotlinlang.org/docs/home.html" },
        { name: "Kotlin by Example", url: "https://play.kotlinlang.org/byExample/overview" },
        { name: "Android Developers — Kotlin", url: "https://developer.android.com/kotlin" },
      ],
      modules: [
        { title: "Bazele Kotlin", lessons: ["De ce Kotlin?", "Variabile: val vs var", "Tipuri si null safety", "Functii si parametri default", "String templates"] },
        { title: "OOP si Functional", lessons: ["Clase si data classes", "Sealed classes si enums", "Extension functions", "Higher-order functions si lambdas", "Collections si operatii functinonale"] },
        { title: "Kotlin Avansat", lessons: ["Coroutines — bazele", "Flow si async", "Generics si variance", "Delegation", "DSL-uri in Kotlin"] },
        { title: "Android cu Kotlin", lessons: ["Jetpack Compose intro", "State si recomposition", "Navigation", "ViewModel si LiveData", "Prima aplicatie Android"] },
      ],
    },
    {
      slug: "swift-ios",
      title: "Swift — Dezvoltare iOS de la Zero",
      description: "Limbajul Apple — optionals, protocols, closures, SwiftUI si construirea de aplicatii iOS moderne.",
      category: "IT_PROGRAMMING",
      subcategory: "Dezvoltare Mobile",
      difficulty: "INTERMEDIATE",
      estimatedHours: 16,
      language: "ro",
      sources: [
        { name: "Swift Documentation — Apple", url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/" },
        { name: "Apple Developer — SwiftUI", url: "https://developer.apple.com/documentation/swiftui" },
        { name: "Swift.org", url: "https://www.swift.org/documentation/" },
      ],
      modules: [
        { title: "Bazele Swift", lessons: ["Ce este Swift", "Variabile si constante", "Tipuri: String, Int, Double, Bool", "Optionals si unwrapping", "Collections: Array, Set, Dictionary"] },
        { title: "Flux de Control si Functii", lessons: ["if / guard / switch", "Bucle for-in si while", "Functii si closures", "Enums cu associated values", "Error handling cu do-try-catch"] },
        { title: "OOP si Protocols", lessons: ["Structs vs Classes", "Properties si methods", "Protocols si extensions", "Generics", "ARC si memory management"] },
        { title: "SwiftUI", lessons: ["Primul View in SwiftUI", "State si Binding", "Lists si Navigation", "Networking cu URLSession", "Prima aplicatie iOS completa"] },
      ],
    },
    {
      slug: "ruby-on-rails",
      title: "Ruby si Ruby on Rails",
      description: "Ruby elegant si productiv — apoi Rails: MVC, Active Record, migrations, autentificare si deploy.",
      category: "IT_PROGRAMMING",
      subcategory: "Dezvoltare Web",
      difficulty: "BEGINNER",
      estimatedHours: 14,
      language: "ro",
      sources: [
        { name: "Ruby Documentation — Official", url: "https://www.ruby-lang.org/en/documentation/" },
        { name: "Ruby on Rails Guides", url: "https://guides.rubyonrails.org/" },
        { name: "The Odin Project — Ruby", url: "https://www.theodinproject.com/paths/full-stack-ruby-on-rails" },
      ],
      modules: [
        { title: "Bazele Ruby", lessons: ["Ce este Ruby", "IRB si primul script", "Variabile si tipuri", "Conditionale si bucle", "Metode si blocuri"] },
        { title: "Ruby OOP", lessons: ["Clase si obiecte", "Mostenire si mixins", "Modules si include/extend", "Blocks, Procs si Lambdas", "Symbols si hashes"] },
        { title: "Rails Fundamente", lessons: ["Ce este Rails si MVC", "Generatoare si scaffold", "Routing", "Active Record si migrations", "Views cu ERB"] },
        { title: "Rails in Practica", lessons: ["Devise — autentificare", "Validari si asocieri", "API mode", "Background jobs cu Sidekiq", "Deploy pe Heroku/Render"] },
      ],
    },
    {
      slug: "nodejs-backend",
      title: "Node.js — Backend JavaScript",
      description: "JavaScript pe server — Express, middleware, REST API, autentificare JWT, baze de date si deploy.",
      category: "IT_PROGRAMMING",
      subcategory: "Dezvoltare Web",
      difficulty: "INTERMEDIATE",
      estimatedHours: 14,
      language: "ro",
      sources: [
        { name: "Node.js Documentation — Official", url: "https://nodejs.org/en/docs/" },
        { name: "Express.js Guide", url: "https://expressjs.com/en/guide/routing.html" },
        { name: "MDN — Server-side Node", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs" },
      ],
      modules: [
        { title: "Bazele Node.js", lessons: ["Ce este Node.js si event loop", "Modules si require/import", "File system (fs)", "npm si package.json", "Debugging"] },
        { title: "Express.js", lessons: ["Primul server Express", "Routing si parametri", "Middleware", "Servirea fisierelor statice", "Error handling"] },
        { title: "API REST", lessons: ["Design-ul unui REST API", "CRUD operations", "Validare cu Joi/Zod", "Autentificare JWT", "Upload fisiere cu Multer"] },
        { title: "Baze de Date", lessons: ["MongoDB cu Mongoose", "PostgreSQL cu Prisma", "Relatii si queries", "Migrations", "Deploy pe Railway/Vercel"] },
      ],
    },
    {
      slug: "nextjs-fullstack",
      title: "Next.js — Framework Fullstack React",
      description: "Cel mai popular framework React — SSR, SSG, App Router, Server Components, API routes si deploy pe Vercel.",
      category: "IT_PROGRAMMING",
      subcategory: "Dezvoltare Web",
      difficulty: "INTERMEDIATE",
      estimatedHours: 16,
      language: "ro",
      sources: [
        { name: "Next.js Documentation — Official", url: "https://nextjs.org/docs" },
        { name: "Next.js Learn Course", url: "https://nextjs.org/learn" },
        { name: "Vercel Documentation", url: "https://vercel.com/docs" },
      ],
      modules: [
        { title: "Bazele Next.js", lessons: ["Ce este Next.js si de ce", "Instalare si structura proiectului", "App Router vs Pages Router", "Pagini si layout-uri", "Navigare cu Link si useRouter"] },
        { title: "Rendering", lessons: ["Server Components vs Client Components", "SSR, SSG si ISR", "Loading si Error boundaries", "Streaming si Suspense", "Metadata si SEO"] },
        { title: "Date si API", lessons: ["Server Actions", "Route Handlers (API routes)", "Fetch si caching", "Database cu Prisma", "Autentificare cu NextAuth"] },
        { title: "Deploy si Productie", lessons: ["Optimizarea imaginilor", "Middleware", "Environment variables", "Deploy pe Vercel", "Monitoring si analytics"] },
      ],
    },
    {
      slug: "docker-si-containere",
      title: "Docker si Containere",
      description: "Containerizare de la zero — Dockerfile, images, volumes, docker-compose si deployment cu containere.",
      category: "IT_PROGRAMMING",
      subcategory: "DevOps",
      difficulty: "INTERMEDIATE",
      estimatedHours: 10,
      language: "ro",
      sources: [
        { name: "Docker Documentation — Official", url: "https://docs.docker.com/" },
        { name: "Docker Get Started Guide", url: "https://docs.docker.com/get-started/" },
        { name: "Docker Hub", url: "https://hub.docker.com/" },
      ],
      modules: [
        { title: "Bazele Docker", lessons: ["Ce sunt containerele", "Instalare Docker Desktop", "Primul container (docker run)", "Images vs Containers", "Docker Hub si pull"] },
        { title: "Dockerfile si Build", lessons: ["Scrierea unui Dockerfile", "Layers si caching", "Multi-stage builds", "Best practices", ".dockerignore"] },
        { title: "Docker Compose", lessons: ["Ce este docker-compose", "Servicii multiple", "Volumes si persistenta", "Networking intre containere", "Deploy cu compose"] },
      ],
    },
    {
      slug: "linux-linia-de-comanda",
      title: "Linux si Linia de Comanda",
      description: "Terminal, bash, navigare fisiere, permisiuni, procese, scripting si administrare de baza a serverelor Linux.",
      category: "IT_PROGRAMMING",
      subcategory: "Administrare Sisteme",
      difficulty: "BEGINNER",
      estimatedHours: 10,
      language: "ro",
      sources: [
        { name: "Linux man pages", url: "https://man7.org/linux/man-pages/" },
        { name: "GNU Bash Manual", url: "https://www.gnu.org/software/bash/manual/" },
        { name: "Linux Journey", url: "https://linuxjourney.com/" },
        { name: "The Linux Command Line (book)", url: "https://linuxcommand.org/tlcl.php" },
      ],
      modules: [
        { title: "Terminal si Navigare", lessons: ["Ce este terminalul", "pwd, ls, cd", "mkdir, rm, cp, mv", "cat, less, head, tail", "Wildcards si globbing"] },
        { title: "Fisiere si Permisiuni", lessons: ["Structura directoarelor Linux", "chmod si chown", "Useri si grupuri", "Linkuri simbolice", "Cautare cu find si grep"] },
        { title: "Procese si Retea", lessons: ["ps, top, htop", "kill si managementul proceselor", "SSH si conectarea la servere", "curl si wget", "Monitorizarea cu netstat/ss"] },
        { title: "Bash Scripting", lessons: ["Primul script bash", "Variabile si argumente", "Conditionale si bucle", "Functii", "Cron jobs si automatizare"] },
      ],
    },
    {
      slug: "python-data-science",
      title: "Python pentru Data Science",
      description: "NumPy, Pandas, Matplotlib si Scikit-learn — analiza datelor, vizualizare si primii pasi in machine learning.",
      category: "IT_PROGRAMMING",
      subcategory: "Data Science",
      difficulty: "INTERMEDIATE",
      estimatedHours: 18,
      language: "ro",
      sources: [
        { name: "NumPy Documentation", url: "https://numpy.org/doc/stable/" },
        { name: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" },
        { name: "Scikit-learn Documentation", url: "https://scikit-learn.org/stable/user_guide.html" },
        { name: "Matplotlib Tutorials", url: "https://matplotlib.org/stable/tutorials/index.html" },
      ],
      modules: [
        { title: "NumPy", lessons: ["Ce este NumPy", "Arrays si operatii", "Indexing si slicing", "Broadcasting", "Functii matematice"] },
        { title: "Pandas", lessons: ["Series si DataFrame", "Citirea datelor (CSV, Excel)", "Filtrare si selectie", "GroupBy si agregari", "Merge si join"] },
        { title: "Vizualizare", lessons: ["Matplotlib — grafice de baza", "Seaborn — grafice statistice", "Plotly — grafice interactive", "Best practices in vizualizare"] },
        { title: "Machine Learning Intro", lessons: ["Ce este ML?", "Scikit-learn — primul model", "Clasificare vs regresie", "Train/test split si evaluare", "Proiect: predictor de preturi"] },
      ],
    },
    {
      slug: "cybersecurity-baze",
      title: "Introducere in Cybersecurity",
      description: "Fundamente de securitate informatica — amenintari, criptografie, retele, OWASP Top 10 si securitate practica.",
      category: "IT_PROGRAMMING",
      subcategory: "Securitate",
      difficulty: "BEGINNER",
      estimatedHours: 12,
      language: "ro",
      sources: [
        { name: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
        { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
        { name: "CERT-RO — Centrul National de Raspuns", url: "https://www.cert.ro/" },
        { name: "Cybrary — Free Training", url: "https://www.cybrary.it/" },
      ],
      modules: [
        { title: "Fundamente", lessons: ["Ce este cybersecurity", "Amenintari comune (malware, phishing)", "CIA Triad (Confidentiality, Integrity, Availability)", "Autentificare si autorizare", "Criptografie de baza"] },
        { title: "Securitate Web", lessons: ["OWASP Top 10 explicat", "SQL Injection", "Cross-Site Scripting (XSS)", "CSRF si clickjacking", "Security headers"] },
        { title: "Retele si Infrastructura", lessons: ["TCP/IP si protocoale", "Firewalls si VPN", "TLS/SSL si HTTPS", "Scanarea porturilor (nmap)", "Hardening de baza"] },
      ],
    },
    // ────── MARKETING ──────
    {
      slug: "seo-practic",
      title: "SEO Practic — De la Zero la Pagina 1",
      description: "Optimizare pentru motoare de cautare pas cu pas — keyword research, on-page SEO, link building si audit tehnic.",
      category: "MARKETING",
      subcategory: "SEO",
      difficulty: "BEGINNER",
      estimatedHours: 10,
      language: "ro",
      sources: [
        { name: "Google Search Central", url: "https://developers.google.com/search/docs" },
        { name: "Google SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
        { name: "Moz — Beginner's Guide to SEO", url: "https://moz.com/beginners-guide-to-seo" },
      ],
      modules: [
        { title: "Fundamente SEO", lessons: ["Cum functioneaza Google", "Keyword research", "Search intent", "Competitie si dificultate"] },
        { title: "SEO On-Page", lessons: ["Title si meta description", "Structura heading-urilor", "Optimizarea imaginilor", "Internal linking"] },
        { title: "SEO Tehnic si Off-Page", lessons: ["Site speed si Core Web Vitals", "Sitemap si robots.txt", "Link building etic", "Analiza cu Google Search Console"] },
      ],
    },
    {
      slug: "social-media-marketing",
      title: "Social Media Marketing Complet",
      description: "Strategii pentru Instagram, TikTok, LinkedIn si Facebook — creare continut, algoritmi, ads si metrici.",
      category: "MARKETING",
      subcategory: "Social Media",
      difficulty: "BEGINNER",
      estimatedHours: 8,
      language: "ro",
      sources: [
        { name: "Meta Blueprint", url: "https://www.facebookblueprint.com/" },
        { name: "Google Skillshop — Ads", url: "https://skillshop.withgoogle.com/" },
        { name: "HubSpot — Social Media Certification", url: "https://academy.hubspot.com/courses/social-media" },
      ],
      modules: [
        { title: "Strategie Social Media", lessons: ["Alegerea platformelor", "Definirea audientei", "Calendar editorial", "Tipuri de continut"] },
        { title: "Creare de Continut", lessons: ["Copywriting pentru social media", "Design cu Canva", "Video scurt (Reels/TikTok)", "Storytelling"] },
        { title: "Ads si Analytics", lessons: ["Meta Ads basics", "Targetare si retargeting", "Metrici esentiale", "Optimizarea campaniilor"] },
      ],
    },
    // ────── LANGUAGES ──────
    {
      slug: "germana-pentru-incepatori",
      title: "Germana pentru Incepatori — A1",
      description: "Primii pasi in limba germana — saluturi, numere, prezentare personala, fraze utile si gramatica de baza.",
      category: "LANGUAGES",
      subcategory: "Germana",
      difficulty: "BEGINNER",
      estimatedHours: 16,
      language: "ro",
      sources: [
        { name: "Goethe-Institut — A1 Curriculum", url: "https://www.goethe.de/en/spr/kup/prf/sd1.html" },
        { name: "CEFR A1 Descriptors", url: "https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions" },
        { name: "Deutsche Welle — Learn German", url: "https://learngerman.dw.com/en/beginners/c-36519789" },
      ],
      modules: [
        { title: "Primele Cuvinte", lessons: ["Alfabetul german", "Saluturi si prezentare", "Numerele 1-100", "Zilele si lunile"] },
        { title: "Gramatica de Baza", lessons: ["Articolul hotarat si nehotarat", "Verbe regulate la prezent", "Sein si haben", "Negarea cu nicht si kein"] },
        { title: "Conversatie A1", lessons: ["La magazin", "La restaurant", "Intreband de directii", "La doctor"] },
        { title: "Cultura si Practica", lessons: ["Diferente culturale", "Falsi prieteni DE-RO", "Exercitii de pronuntie", "Recapitulare si quiz"] },
      ],
    },
    {
      slug: "franceza-conversatie-a2",
      title: "Franceza Conversatie — A2",
      description: "Consolideaza-ti franceza de baza cu dialoguri reale, verbe la trecut si vocabular pentru calatorii.",
      category: "LANGUAGES",
      subcategory: "Franceza",
      difficulty: "BEGINNER",
      estimatedHours: 14,
      language: "ro",
      sources: [
        { name: "TV5Monde — Apprendre le Francais", url: "https://apprendre.tv5monde.com/fr" },
        { name: "DELF A2 — France Education", url: "https://www.france-education-international.fr/diplome/delf-tout-public/delf-a2" },
        { name: "Francais Facile", url: "https://www.francaisfacile.com/" },
      ],
      modules: [
        { title: "Conversatii Zilnice", lessons: ["Ma prezint", "Familia mea", "Hobby-urile mele", "Rutina zilnica"] },
        { title: "Gramatica A2", lessons: ["Passe compose", "Imparfait vs passe compose", "Pronumele COD si COI", "Adjectivele — acordul"] },
        { title: "Calatorii in Franta", lessons: ["La aeroport", "Rezervarea cazarii", "Vizitand un oras", "Urgente si ajutor"] },
      ],
    },
    // ────── EXAM PREP ──────
    {
      slug: "bac-matematica-m1",
      title: "BAC Matematica M1 — Pregatire Completa",
      description: "Pregatire sistematica pentru Bacalaureat Matematica M1 — algebra, analiza, geometrie si probleme tip.",
      category: "EXAM_PREP",
      subcategory: "Bacalaureat",
      difficulty: "INTERMEDIATE",
      estimatedHours: 30,
      language: "ro",
      sources: [
        { name: "Programa BAC Matematica M1 — MENCS", url: "https://www.edu.ro/bacalaureat" },
        { name: "Subiecte BAC anterioare", url: "https://www.edu.ro/subiecte-bac" },
      ],
      modules: [
        { title: "Algebra", lessons: ["Multimi de numere", "Ecuatii si inecuatii", "Sisteme de ecuatii", "Progresii aritmetice si geometrice"] },
        { title: "Analiza Matematica", lessons: ["Limite de functii", "Derivate", "Studiul functiilor", "Integrale"] },
        { title: "Geometrie", lessons: ["Vectori in plan", "Ecuatia dreptei", "Geometrie in spatiu", "Probleme de concurs"] },
        { title: "Simulari BAC", lessons: ["Simulare subiectul I", "Simulare subiectul II", "Simulare subiectul III", "Strategii de examen"] },
      ],
    },
    {
      slug: "bac-romana-essay",
      title: "BAC Romana — Eseu si Comentariu",
      description: "Tehnici de scriere a eseurilor pentru BAC Romana — structura, argumentare, opere din programa si greselile frecvente.",
      category: "EXAM_PREP",
      subcategory: "Bacalaureat",
      difficulty: "INTERMEDIATE",
      estimatedHours: 20,
      language: "ro",
      sources: [
        { name: "Programa BAC Limba Romana — MENCS", url: "https://www.edu.ro/bacalaureat" },
        { name: "Subiecte BAC anterioare", url: "https://www.edu.ro/subiecte-bac" },
      ],
      modules: [
        { title: "Tehnici de Scriere", lessons: ["Structura eseului", "Teza si argumentele", "Conectori logici", "Incheierea eficienta"] },
        { title: "Opere Epice", lessons: ["Ion de Liviu Rebreanu", "Ultima noapte de dragoste", "Morometii", "Moara cu noroc"] },
        { title: "Opere Lirice si Dramatice", lessons: ["Luceafarul de Eminescu", "Testament de Arghezi", "O scrisoare pierduta", "Iona de Marin Sorescu"] },
      ],
    },
    // ────── SCIENCES ──────
    {
      slug: "introducere-in-psihologie",
      title: "Introducere in Psihologie",
      description: "Descopera mintea umana — perceptie, memorie, motivatie, emotii, personalitate si tulburari psihice fundamentale.",
      category: "SCIENCES",
      subcategory: "Psihologie",
      difficulty: "BEGINNER",
      estimatedHours: 12,
      language: "ro",
      sources: [
        { name: "APA — American Psychological Association", url: "https://www.apa.org/topics" },
        { name: "OpenStax — Psychology 2e", url: "https://openstax.org/details/books/psychology-2e" },
        { name: "Simply Psychology", url: "https://www.simplypsychology.org/" },
      ],
      modules: [
        { title: "Ce Este Psihologia?", lessons: ["Istorie si scoli de gandire", "Metode de cercetare", "Etica in psihologie", "Neurofiziologie de baza"] },
        { title: "Procese Cognitive", lessons: ["Perceptia", "Atentia si concentrarea", "Memoria", "Gandirea si rezolvarea de probleme"] },
        { title: "Personalitate si Emotii", lessons: ["Teorii ale personalitatii", "Inteligenta emotionala", "Motivatie si nevoile lui Maslow", "Stresul si coping-ul"] },
      ],
    },
    {
      slug: "fizica-mecanica-liceu",
      title: "Fizica — Mecanica pentru Liceu",
      description: "Mecanica newtoniana explicata clar — cinematica, dinamica, lucru mecanic, energie si gravitatie.",
      category: "SCIENCES",
      subcategory: "Fizica",
      difficulty: "INTERMEDIATE",
      estimatedHours: 14,
      language: "ro",
      sources: [
        { name: "Programa Fizica Liceu — MENCS", url: "https://www.edu.ro/programe-scolare" },
        { name: "Khan Academy — Physics", url: "https://www.khanacademy.org/science/physics" },
        { name: "HyperPhysics", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/hframe.html" },
      ],
      modules: [
        { title: "Cinematica", lessons: ["Miscarea rectilinie uniforma", "Miscarea uniform variata", "Caderea libera", "Miscarea pe plan inclinat"] },
        { title: "Dinamica", lessons: ["Legile lui Newton", "Forta de frecare", "Forta elastica", "Probleme de dinamica"] },
        { title: "Energie si Gravitatie", lessons: ["Lucrul mecanic", "Energia cinetica si potentiala", "Conservarea energiei", "Gravitatia universala"] },
      ],
    },
    // ────── DESIGN & CREATIVITY ──────
    {
      slug: "design-grafic-cu-canva",
      title: "Design Grafic cu Canva",
      description: "Invata design grafic fara experienta — principii vizuale, branding, social media assets si prezentari profesionale.",
      category: "DESIGN_CREATIVITY",
      subcategory: "Design Grafic",
      difficulty: "BEGINNER",
      estimatedHours: 8,
      language: "ro",
      sources: [
        { name: "Canva Design School", url: "https://www.canva.com/designschool/" },
        { name: "Google Material Design", url: "https://m3.material.io/" },
      ],
      modules: [
        { title: "Principii de Design", lessons: ["Culoare si contrast", "Tipografie de baza", "Compositie si spatiu alb", "Ierarhie vizuala"] },
        { title: "Canva Practic", lessons: ["Interfata Canva", "Template-uri si personalizare", "Brand Kit", "Exportul fisierelor"] },
        { title: "Proiecte Reale", lessons: ["Postari social media", "Stories si Reels", "Prezentari profesionale", "Materiale de print"] },
      ],
    },
    {
      slug: "fotografie-digitala-baze",
      title: "Bazele Fotografiei Digitale",
      description: "Compozitie, lumina, expunere si editare — de la modul automat la modul manual al camerei.",
      category: "DESIGN_CREATIVITY",
      subcategory: "Fotografie",
      difficulty: "BEGINNER",
      estimatedHours: 10,
      language: "ro",
      sources: [
        { name: "Cambridge in Colour — Photography Tutorials", url: "https://www.cambridgeincolour.com/tutorials.htm" },
        { name: "Adobe Lightroom Tutorials", url: "https://helpx.adobe.com/lightroom-cc/tutorials.html" },
      ],
      modules: [
        { title: "Fundamente Tehnice", lessons: ["Triunghiul expunerii", "ISO, diafragma, viteza", "Balansul de alb", "Formate: RAW vs JPEG"] },
        { title: "Compozitie", lessons: ["Regula treimilor", "Linii directoare", "Cadraj si perspectiva", "Portret vs peisaj"] },
        { title: "Editare de Baza", lessons: ["Lightroom — intro", "Ajustari globale", "Cropping si straightening", "Export pentru web si print"] },
      ],
    },
    // ────── FINANCE & ACCOUNTING ──────
    {
      slug: "finante-personale",
      title: "Finante Personale — Ghid Complet",
      description: "Bugetare, economii, investitii, datorii si planificare financiara pe termen lung — fara jargon.",
      category: "FINANCE_ACCOUNTING",
      subcategory: "Finante Personale",
      difficulty: "BEGINNER",
      estimatedHours: 8,
      language: "ro",
      sources: [
        { name: "Investopedia — Personal Finance", url: "https://www.investopedia.com/personal-finance-4427760" },
        { name: "BNR — Educatie Financiara", url: "https://www.bnr.ro/Educatie-financiara-702.aspx" },
        { name: "ASF — Ghiduri pentru Consumatori", url: "https://asfromania.ro/edu/" },
      ],
      modules: [
        { title: "Bugetare", lessons: ["Venituri si cheltuieli", "Metoda 50/30/20", "Fondul de urgenta", "Eliminarea cheltuielilor inutile"] },
        { title: "Economii si Investitii", lessons: ["Conturi de economii", "Dobanda compusa", "ETF-uri si fonduri mutuale", "Diversificarea portofoliului"] },
        { title: "Datorii si Planificare", lessons: ["Tipuri de credite", "Strategii de rambursare", "Scorul de credit", "Planificarea pensiei"] },
      ],
    },
    // ────── LAW & LEGISLATION ──────
    {
      slug: "dreptul-muncii-romania",
      title: "Dreptul Muncii in Romania",
      description: "Contracte de munca, drepturi si obligatii, concedii, demisie, desfacere — ce trebuie sa stii ca angajat.",
      category: "LAW_LEGISLATION",
      subcategory: "Dreptul Muncii",
      difficulty: "BEGINNER",
      estimatedHours: 6,
      language: "ro",
      sources: [
        { name: "Codul Muncii — Legea 53/2003", url: "https://legislatie.just.ro/Public/DetaliiDocument/41625" },
        { name: "Inspectia Muncii", url: "https://www.inspectiamuncii.ro/" },
      ],
      modules: [
        { title: "Contractul de Munca", lessons: ["Tipuri de contracte", "Clauze obligatorii", "Perioada de proba", "Modificarea contractului"] },
        { title: "Drepturi si Obligatii", lessons: ["Timpul de lucru", "Concediul de odihna", "Concediul medical", "Salariul minim si ore suplimentare"] },
        { title: "Incetarea Raportului de Munca", lessons: ["Demisia", "Concedierea disciplinara", "Concedierea economica", "Litigii de munca"] },
      ],
    },
    // ────── HEALTH & MEDICINE ──────
    {
      slug: "prim-ajutor-esential",
      title: "Prim Ajutor Esential",
      description: "Actiuni vitale in situatii de urgenta — RCP, oprit sangerarea, pozitia laterala de siguranta si apelul la 112.",
      category: "HEALTH_MEDICINE",
      subcategory: "Prim Ajutor",
      difficulty: "BEGINNER",
      estimatedHours: 5,
      language: "ro",
      sources: [
        { name: "Crucea Rosie Romana — Prim Ajutor", url: "https://crucearosie.ro/ce-facem/sanatate/prim-ajutor/" },
        { name: "ERC — European Resuscitation Council Guidelines", url: "https://www.erc.edu/guidelines" },
        { name: "WHO — First Aid", url: "https://www.who.int/news-room/fact-sheets/detail/first-aid" },
      ],
      modules: [
        { title: "Bazele Primului Ajutor", lessons: ["Evaluarea situatiei", "Apelul la 112", "Pozitia laterala de siguranta", "ABC-ul resuscitarii"] },
        { title: "Urgente Frecvente", lessons: ["Oprirea hemoragiei", "Arsuri si opariri", "Fracturi si entorse", "Lesinul si socul"] },
        { title: "Situatii Speciale", lessons: ["RCP la adulti si copii", "Defibrilatorul extern (DAE)", "Inecul", "Alergii severe si anafilaxia"] },
      ],
    },
    // ────── SOFT SKILLS ──────
    {
      slug: "comunicare-eficienta",
      title: "Comunicare Eficienta la Locul de Munca",
      description: "Vorbeste clar, asculta activ, gestioneaza conflicte si prezinta cu impact — in orice mediu profesional.",
      category: "SOFT_SKILLS",
      subcategory: "Comunicare",
      difficulty: "BEGINNER",
      estimatedHours: 7,
      language: "ro",
      sources: [
        { name: "Harvard Business Review — Communication", url: "https://hbr.org/topic/communication" },
        { name: "MindTools — Communication Skills", url: "https://www.mindtools.com/commsskll/communication-skills.htm" },
      ],
      modules: [
        { title: "Comunicarea de Baza", lessons: ["Ascultarea activa", "Feedback constructiv", "Comunicarea non-verbala", "Scrisul clar si concis"] },
        { title: "Prezentari", lessons: ["Structura unei prezentari", "Slide-uri eficiente", "Vorbitul in public", "Gestionarea intrebarilor"] },
        { title: "Conflicte si Negociere", lessons: ["Tipuri de conflicte", "Tehnici de dezamorsare", "Negocierea win-win", "Asertivitatea"] },
      ],
    },
    {
      slug: "productivitate-si-time-management",
      title: "Productivitate si Time Management",
      description: "Tehnici dovedite de gestionare a timpului — Pomodoro, Getting Things Done, batching si deep work.",
      category: "SOFT_SKILLS",
      subcategory: "Productivitate",
      difficulty: "BEGINNER",
      estimatedHours: 5,
      language: "ro",
      sources: [
        { name: "Cal Newport — Deep Work", url: "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/" },
        { name: "David Allen — GTD", url: "https://gettingthingsdone.com/what-is-gtd/" },
        { name: "Todoist — Productivity Methods", url: "https://todoist.com/productivity-methods" },
      ],
      modules: [
        { title: "Fundamente", lessons: ["Matricea Eisenhower", "Legea lui Parkinson", "Regula celor 2 minute", "Batching si time blocking"] },
        { title: "Metode Populare", lessons: ["Tehnica Pomodoro", "Getting Things Done (GTD)", "Deep Work de Cal Newport", "Bullet journaling"] },
        { title: "Implementare", lessons: ["Rutina de dimineata", "Revizuirea saptamanala", "Eliminarea distragerilor", "Energie vs timp"] },
      ],
    },
  ] as const;

  for (const c of courses) {
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
        sources: ("sources" in c ? c.sources : []) as any,
        modules: {
          create: c.modules.map((m, mi) => ({
            title: m.title,
            order: mi + 1,
            lessons: {
              create: m.lessons.map((title, li) => ({
                title,
                order: li + 1,
                type: "TEXT",
                estimatedMinutes: 10,
                content: [
                  { type: "heading", content: title, level: 1 },
                  { type: "text", content: `Aceasta lectie face parte din cursul "${c.title}". Continutul va fi generat de AI din documentatia oficiala la prima vizita.` },
                ],
              })),
            },
          })),
        },
      },
    });
    console.log(`  ✓ ${c.slug}`);
  }
  console.log(`✓ ${courses.length} cursuri adaugate`);
}

async function main() {
  console.log("🌱 Se populeaza baza de date...\n");
  await seedAchievements();
  await seedCourses();
  console.log("\n✅ Seed complet");
}

main()
  .catch(e => {
    console.error("❌ Seed esuat:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
