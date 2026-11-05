export type Subject = {
  id: string;
  title: string;
  arabic: string;
  icon: string;
  tint: string;
  iconColor: string;
  lessons: string;
  progress: string;
};

export type Question = {
  id: string;
  subject: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Grade = {
  id: "1ac" | "2ac" | "3ac" | "tc" | "1bac" | "2bac";
  label: string;
  arabic: string;
  track: "college" | "lycee";
};

export const grades: Grade[] = [
  { id: "1ac", label: "1ère année collège", arabic: "الأولى إعدادي", track: "college" },
  { id: "2ac", label: "2ème année collège", arabic: "الثانية إعدادي", track: "college" },
  { id: "3ac", label: "3ème année collège", arabic: "الثالثة إعدادي", track: "college" },
  { id: "tc", label: "Tronc commun", arabic: "الجذع المشترك", track: "lycee" },
  { id: "1bac", label: "1ère année bac", arabic: "الأولى بكالوريا", track: "lycee" },
  { id: "2bac", label: "2ème année bac", arabic: "الثانية بكالوريا", track: "lycee" },
];

export const subjects: Subject[] = [
  {
    id: "math",
    title: "Mathématiques",
    arabic: "الرياضيات",
    icon: "calculate",
    tint: "#E3F3EE",
    iconColor: "#0C6E59",
    lessons: "12 leçons",
    progress: "68%",
  },
  {
    id: "french",
    title: "Français",
    arabic: "الفرنسية",
    icon: "translate",
    tint: "#FFF0E5",
    iconColor: "#C15B2A",
    lessons: "9 leçons",
    progress: "42%",
  },
  {
    id: "arabic",
    title: "العربية",
    arabic: "اللغة العربية",
    icon: "menu-book",
    tint: "#F0ECFF",
    iconColor: "#6A54C7",
    lessons: "11 leçons",
    progress: "76%",
  },
  {
    id: "science",
    title: "Sciences",
    arabic: "النشاط العلمي",
    icon: "science",
    tint: "#E8F2FF",
    iconColor: "#3778C2",
    lessons: "8 leçons",
    progress: "30%",
  },
];

export const recommendedLessons = [
  {
    id: "fractions",
    subject: "Mathématiques",
    title: "Fractions et nombres décimaux",
    duration: "15 min",
    progress: "68%",
    icon: "calculate",
    color: "#0C6E59",
  },
  {
    id: "recit",
    subject: "Français",
    title: "Les temps du récit",
    duration: "10 min",
    progress: "42%",
    icon: "auto-stories",
    color: "#C15B2A",
  },
  {
    id: "energy",
    subject: "Sciences",
    title: "Mouvement et énergie",
    duration: "18 min",
    progress: "30%",
    icon: "bolt",
    color: "#3778C2",
  },
];

export const questions: Question[] = [
  {
    id: "q1",
    subject: "Mathématiques · Fractions",
    prompt: "Quelle fraction est équivalente à 1/2 ?",
    options: ["2/3", "3/6", "4/5", "5/8"],
    correctIndex: 1,
    explanation: "On multiplie le numérateur et le dénominateur par 3 : 1 × 3 / 2 × 3 = 3/6.",
  },
  {
    id: "q2",
    subject: "Français · Grammaire",
    prompt: "Dans « Les élèves révisent », quel est le sujet ?",
    options: ["révisent", "Les élèves", "élèves révisent", "Les"],
    correctIndex: 1,
    explanation: "Le sujet est le groupe qui fait l'action : « Les élèves » révisent.",
  },
  {
    id: "q3",
    subject: "Sciences · Énergie",
    prompt: "Quelle forme d'énergie utilise principalement une lampe allumée ?",
    options: ["Énergie électrique", "Énergie sonore", "Énergie musculaire", "Énergie nucléaire"],
    correctIndex: 0,
    explanation: "La lampe reçoit de l'énergie électrique et la transforme en lumière et en chaleur.",
  },
];

export const languageTracks = [
  { id: "fr", name: "Français", level: "Débutant", progress: "38%", icon: "translate", color: "#C15B2A" },
  { id: "en", name: "English", level: "A1 · Starter", progress: "24%", icon: "record-voice-over", color: "#3778C2" },
  { id: "es", name: "Español", level: "Nouveau", progress: "0%", icon: "language", color: "#B35A2C" },
];


export type CurriculumLesson = {
  id: string;
  subjectId: string;
  gradeId?: Grade["id"];
  title: string;
  arabicTitle: string;
  summary: string;
  objective: string;
  sourceLabel: string;
};

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  language: string;
  level: string;
  pages: number;
  size: string;
  coverColor: string;
  icon: string;
  access: "offline" | "official-link";
  sourceUrl?: string;
  sourceLabel: string;
};

export const curriculum3ac: CurriculumLesson[] = [
  { id: "remarkable-identities", subjectId: "math", title: "Identités remarquables", arabicTitle: "المتطابقات الهامة", summary: "Développer et factoriser avec les trois identités remarquables.", objective: "Reconnaître une identité et l’utiliser pour simplifier un calcul.", sourceLabel: "Programme 3AC · Mathématiques" },
  { id: "powers", subjectId: "math", title: "Puissances", arabicTitle: "القوى", summary: "Comprendre les règles de calcul avec les puissances entières.", objective: "Appliquer les propriétés des puissances dans un calcul numérique.", sourceLabel: "Programme 3AC · Mathématiques" },
  { id: "square-roots", subjectId: "math", title: "Racines carrées", arabicTitle: "الجذور المربعة", summary: "Découvrir les racines carrées et les opérations associées.", objective: "Simplifier et comparer des expressions contenant des racines carrées.", sourceLabel: "Programme 3AC · Mathématiques" },
  { id: "first-degree-equations", subjectId: "math", title: "Équations du premier degré", arabicTitle: "معادلات الدرجة الأولى", summary: "Résoudre une équation et vérifier la solution trouvée.", objective: "Isoler l’inconnue en respectant les transformations d’égalité.", sourceLabel: "Programme 3AC · Mathématiques" },
  { id: "thales", subjectId: "math", title: "Théorème de Thalès", arabicTitle: "مبرهنة طاليس", summary: "Utiliser la proportionnalité dans des triangles et des droites parallèles.", objective: "Calculer une longueur manquante avec le théorème de Thalès.", sourceLabel: "Programme 3AC · Mathématiques" },
  { id: "pythagoras", subjectId: "math", title: "Théorème de Pythagore", arabicTitle: "مبرهنة فيتاغورس", summary: "Relier les longueurs des côtés d’un triangle rectangle.", objective: "Calculer une longueur et reconnaître un triangle rectangle.", sourceLabel: "Programme 3AC · Mathématiques" },
  { id: "statistics-probability", subjectId: "math", title: "Statistiques et probabilités", arabicTitle: "الإحصاء والاحتمالات", summary: "Lire une série statistique et estimer une probabilité simple.", objective: "Calculer une moyenne et interpréter un tableau de données.", sourceLabel: "Programme 3AC · Mathématiques" },
  { id: "affine-functions", subjectId: "math", title: "Fonctions affines", arabicTitle: "الدوال التآلفية", summary: "Représenter une fonction affine et lire ses variations.", objective: "Déterminer une image et reconnaître une représentation graphique.", sourceLabel: "Programme 3AC · Mathématiques" },
  { id: "narrative-times", subjectId: "french", title: "Les temps du récit", arabicTitle: "أزمنة السرد", summary: "Distinguer l’imparfait et le passé simple dans un récit.", objective: "Choisir le temps verbal adapté à la description ou à l’action.", sourceLabel: "Programme 3AC · Français" },
  { id: "reading-comprehension", subjectId: "french", title: "Comprendre un texte", arabicTitle: "فهم المقروء", summary: "Repérer les informations essentielles et les intentions de l’auteur.", objective: "Justifier une réponse en citant un indice du texte.", sourceLabel: "Programme 3AC · Français" },
  { id: "arabic-reading", subjectId: "arabic", title: "النصوص القرائية", arabicTitle: "النصوص القرائية", summary: "قراءة نصوص متنوعة وفهم أفكارها الأساسية والضمنية.", objective: "استخراج الفكرة العامة وتنظيم الأفكار الأساسية.", sourceLabel: "Programme 3AC · العربية" },
  { id: "arabic-grammar", subjectId: "arabic", title: "التراكيب", arabicTitle: "التراكيب", summary: "مراجعة القواعد والتراكيب داخل جمل مفيدة.", objective: "تمييز الوظائف الإعرابية واستعمالها بشكل سليم.", sourceLabel: "Programme 3AC · العربية" },
  { id: "matter", subjectId: "science", title: "La matière", arabicTitle: "المادة", summary: "Décrire les états de la matière et leurs transformations.", objective: "Identifier une transformation physique à partir d’une expérience.", sourceLabel: "Programme 3AC · Sciences" },
  { id: "movement-energy", subjectId: "science", title: "Mouvement et énergie", arabicTitle: "الحركة والطاقة", summary: "Relier un mouvement à une forme d’énergie et à ses transferts.", objective: "Décrire une chaîne énergétique avec un vocabulaire précis.", sourceLabel: "Programme 3AC · Sciences" },
  { id: "human-body", subjectId: "science", title: "Le corps humain", arabicTitle: "جسم الإنسان", summary: "Comprendre les grandes fonctions et les besoins de l’organisme.", objective: "Relier un organe à sa fonction dans un schéma simple.", sourceLabel: "Programme 3AC · Sciences" },
];

export const books: Book[] = [
  { id: "madrasti-math-3ac", title: "Cahier de révision · Maths 3AC", subtitle: "Cours résumés, exemples et exercices guidés", language: "Français · العربية", level: "3ème année collège", pages: 42, size: "2.4 MB", coverColor: "#E3F3EE", icon: "calculate", access: "offline", sourceLabel: "Contenu original Madrasti AI" },
  { id: "madrasti-french-3ac", title: "Cahier de révision · Français 3AC", subtitle: "Lecture, grammaire et expression", language: "Français", level: "3ème année collège", pages: 36, size: "1.9 MB", coverColor: "#FFF0E5", icon: "auto-stories", access: "offline", sourceLabel: "Contenu original Madrasti AI" },
  { id: "telmidtice-library", title: "Bibliothèque officielle TelmidTICE", subtitle: "Cours et ressources du ministère", language: "العربية · Français", level: "Tous niveaux", pages: 0, size: "En ligne", coverColor: "#E8F2FF", icon: "account-balance", access: "official-link", sourceUrl: "https://telmidtice.men.gov.ma/", sourceLabel: "Source officielle · Ministère" },
];


export type StudyModule = {
  lessonId: string;
  concept: string;
  explanation: string;
  example: string;
  exercise: string;
  answer: string;
  hint: string;
};

export const studyModules: StudyModule[] = [
  { lessonId: "remarkable-identities", concept: "Développer avec une identité remarquable", explanation: "Les identités remarquables permettent de développer rapidement une expression sans multiplier chaque terme séparément.", example: "(x + 3)² = x² + 6x + 9", exercise: "Développe (a − 5)².", answer: "a² − 10a + 25", hint: "Utilise (u − v)² = u² − 2uv + v²." },
  { lessonId: "powers", concept: "Les règles des puissances", explanation: "Pour une même base, multiplier des puissances revient à additionner les exposants : aᵐ × aⁿ = aᵐ⁺ⁿ.", example: "2³ × 2⁴ = 2⁷ = 128", exercise: "Écris 5³ × 5² sous la forme d’une seule puissance.", answer: "5⁵", hint: "Les bases sont identiques, additionne les exposants." },
  { lessonId: "square-roots", concept: "Comprendre une racine carrée", explanation: "La racine carrée de a est le nombre positif dont le carré vaut a. Ainsi √49 = 7 car 7² = 49.", example: "√(36 × 4) = √36 × √4 = 6 × 2 = 12", exercise: "Entre quels entiers consécutifs se trouve √20 ?", answer: "Entre 4 et 5", hint: "Compare 20 avec 4² et 5²." },
  { lessonId: "first-degree-equations", concept: "Résoudre une équation", explanation: "On conserve l’égalité en faisant la même opération aux deux membres, jusqu’à isoler l’inconnue.", example: "3x + 4 = 19 → 3x = 15 → x = 5", exercise: "Résous 4x − 7 = 21.", answer: "x = 7", hint: "Commence par ajouter 7 aux deux membres." },
  { lessonId: "thales", concept: "Appliquer Thalès", explanation: "Lorsque deux droites sont parallèles dans une configuration de triangles, les longueurs correspondantes sont proportionnelles.", example: "AM/AB = AN/AC lorsque (MN) est parallèle à (BC).", exercise: "AM = 3, AB = 5, AC = 10. Calcule AN.", answer: "AN = 6", hint: "Écris 3/5 = AN/10." },
  { lessonId: "pythagoras", concept: "Le triangle rectangle", explanation: "Dans un triangle rectangle, le carré de l’hypoténuse est égal à la somme des carrés des deux autres côtés.", example: "Si les côtés mesurent 3 et 4, l’hypoténuse vaut √(9 + 16) = 5.", exercise: "Les côtés de l’angle droit mesurent 6 cm et 8 cm. Trouve l’hypoténuse.", answer: "10 cm", hint: "Calcule √(6² + 8²)." },
  { lessonId: "statistics-probability", concept: "Lire une moyenne", explanation: "La moyenne d’une série est la somme des valeurs divisée par le nombre de valeurs.", example: "Moyenne de 8, 10 et 12 = 30/3 = 10.", exercise: "Calcule la moyenne de 12, 14, 9 et 5.", answer: "10", hint: "Additionne les quatre valeurs puis divise par 4." },
  { lessonId: "affine-functions", concept: "Une fonction affine", explanation: "Une fonction affine s’écrit f(x) = ax + b. Le nombre a indique le coefficient directeur et b l’ordonnée à l’origine.", example: "Pour f(x) = 2x + 1, f(3) = 7.", exercise: "Calcule g(4) si g(x) = −x + 6.", answer: "g(4) = 2", hint: "Remplace x par 4 dans la formule." },
  { lessonId: "narrative-times", concept: "Imparfait et passé simple", explanation: "L’imparfait installe le décor ou une habitude. Le passé simple raconte une action ponctuelle qui fait avancer le récit.", example: "La pluie tombait quand le train entra en gare.", exercise: "Choisis le temps : « Il ___ (marcher) quand il ___ (apercevoir) son ami. »", answer: "marchait / aperçut", hint: "Décor long à l’imparfait, action soudaine au passé simple." },
  { lessonId: "reading-comprehension", concept: "Justifier une réponse", explanation: "Une réponse de compréhension doit s’appuyer sur un indice précis du texte, reformulé avec tes propres mots.", example: "Je sais que le personnage a peur car il tremble et cherche une sortie.", exercise: "Dans un texte, repère un mot qui montre une émotion puis explique son effet.", answer: "Réponse personnelle justifiée par une citation courte.", hint: "Cherche un verbe, un adjectif ou une image expressive." },
  { lessonId: "arabic-reading", concept: "الفكرة العامة", explanation: "الفكرة العامة هي المعنى الأساسي الذي يجمع بين أفكار النص وفقراته.", example: "إذا تحدث النص عن الماء وطرق الحفاظ عليه، ففكرته العامة هي أهمية ترشيد استعمال الماء.", exercise: "اقرأ فقرة قصيرة واكتب فكرتها العامة في جملة واحدة.", answer: "جملة موجزة تشمل موضوع الفقرة ورسالتها.", hint: "اسأل نفسك: عن ماذا يتحدث النص أساسا؟" },
  { lessonId: "matter", concept: "Les états de la matière", explanation: "La matière existe principalement à l’état solide, liquide ou gazeux. Un changement d’état ne crée pas une nouvelle substance.", example: "La glace fond : elle passe de solide à liquide, mais reste de l’eau.", exercise: "Nomme le changement d’état lorsque la vapeur devient liquide.", answer: "La liquéfaction (ou condensation).", hint: "La vapeur est un gaz et les gouttes sont un liquide." },
  { lessonId: "movement-energy", concept: "Une chaîne énergétique", explanation: "Une chaîne énergétique décrit la source, le convertisseur et la forme d’énergie utile.", example: "Batterie → moteur → énergie mécanique pour un petit véhicule.", exercise: "Décris la chaîne d’une lampe alimentée par une pile.", answer: "Pile (énergie chimique) → lampe → énergie lumineuse et thermique.", hint: "Commence par la source d’énergie." },
  { lessonId: "arabic-grammar", concept: "التراكيب والإعراب", explanation: "تساعدنا التراكيب على فهم وظيفة كل كلمة داخل الجملة واستعمال القاعدة في سياق صحيح.", example: "قرأَ التلميذُ الكتابَ: التلميذُ فاعل والكتابَ مفعول به.", exercise: "حدد الفاعل في الجملة: «نجحَ المجتهدُ في الامتحان». ", answer: "المجتهدُ هو الفاعل.", hint: "اسأل: من قام بالفعل؟" },
  { lessonId: "human-body", concept: "Les fonctions du corps humain", explanation: "Les organes travaillent ensemble pour assurer la respiration, la digestion, la circulation et le mouvement.", example: "Les poumons permettent les échanges de gaz entre l’air et le sang.", exercise: "Associe chaque organe à sa fonction : poumons, cœur, estomac.", answer: "Poumons : respiration · cœur : circulation · estomac : digestion.", hint: "Pense au trajet de l’air, du sang et des aliments." },
];


export const gradeCurriculum: Record<Grade["id"], CurriculumLesson[]> = {
  "1ac": [
    { id: "1ac-math-numbers", subjectId: "math", gradeId: "1ac", title: "Nombres et calcul", arabicTitle: "الأعداد والحساب", summary: "Maîtriser les nombres entiers, décimaux et les opérations.", objective: "Calculer avec des nombres positifs et résoudre un problème simple.", sourceLabel: "Programme 1AC · Mathématiques" },
    { id: "1ac-math-geometry", subjectId: "math", gradeId: "1ac", title: "Droites et angles", arabicTitle: "المستقيمات والزوايا", summary: "Reconnaître les droites, segments et angles usuels.", objective: "Construire et mesurer une figure géométrique.", sourceLabel: "Programme 1AC · Mathématiques" },
    { id: "1ac-french-reading", subjectId: "french", gradeId: "1ac", title: "Lire et raconter", arabicTitle: "القراءة والسرد", summary: "Comprendre un récit court et organiser ses idées.", objective: "Identifier les personnages, le lieu et les étapes du récit.", sourceLabel: "Programme 1AC · Français" },
    { id: "1ac-arabic-reading", subjectId: "arabic", gradeId: "1ac", title: "فهم النصوص", arabicTitle: "فهم النصوص", summary: "قراءة نصوص بسيطة واستخراج أفكارها الأساسية.", objective: "تحديد الفكرة العامة وبعض المعلومات المهمة.", sourceLabel: "Programme 1AC · العربية" },
    { id: "1ac-science-life", subjectId: "science", gradeId: "1ac", title: "Le vivant et son milieu", arabicTitle: "الكائنات الحية ووسطها", summary: "Observer les êtres vivants et leur environnement.", objective: "Classer des êtres vivants selon des critères observables.", sourceLabel: "Programme 1AC · Sciences" },
  ],
  "2ac": [
    { id: "2ac-math-relative", subjectId: "math", gradeId: "2ac", title: "Nombres relatifs", arabicTitle: "الأعداد الصحيحة النسبية", summary: "Comparer et calculer avec les nombres relatifs.", objective: "Effectuer une somme et un produit de nombres relatifs.", sourceLabel: "Programme 2AC · Mathématiques" },
    { id: "2ac-math-proportionality", subjectId: "math", gradeId: "2ac", title: "Proportionnalité", arabicTitle: "التناسبية", summary: "Utiliser tableaux, pourcentages et échelles.", objective: "Reconnaître une situation de proportionnalité.", sourceLabel: "Programme 2AC · Mathématiques" },
    { id: "2ac-french-grammar", subjectId: "french", gradeId: "2ac", title: "Grammaire de la phrase", arabicTitle: "قواعد الجملة", summary: "Identifier les fonctions et enrichir une phrase.", objective: "Analyser le sujet, le verbe et les compléments.", sourceLabel: "Programme 2AC · Français" },
    { id: "2ac-arabic-expression", subjectId: "arabic", gradeId: "2ac", title: "التعبير والإنشاء", arabicTitle: "التعبير والإنشاء", summary: "تنظيم الأفكار وكتابة فقرة مترابطة.", objective: "كتابة موضوع قصير بمقدمة وعرض وخاتمة.", sourceLabel: "Programme 2AC · العربية" },
    { id: "2ac-science-matter", subjectId: "science", gradeId: "2ac", title: "La matière et ses transformations", arabicTitle: "المادة وتحولاتها", summary: "Étudier les mélanges et les transformations physiques.", objective: "Différencier mélange homogène et hétérogène.", sourceLabel: "Programme 2AC · Sciences" },
  ],
  "3ac": curriculum3ac.map((lesson) => ({ ...lesson, gradeId: "3ac" })),
  "1bac": [
    { id: "1bac-math-functions", subjectId: "math", gradeId: "1bac", title: "Fonctions et variations", arabicTitle: "الدوال والتغيرات", summary: "Étudier une fonction et sa représentation graphique.", objective: "Calculer une image, un antécédent et lire un tableau de variations.", sourceLabel: "Programme 1BAC · Mathématiques" },
    { id: "1bac-math-derivatives", subjectId: "math", gradeId: "1bac", title: "Dérivation", arabicTitle: "الاشتقاق", summary: "Introduire le nombre dérivé et ses applications.", objective: "Déterminer le sens de variation grâce à la dérivée.", sourceLabel: "Programme 1BAC · Mathématiques" },
    { id: "1bac-french-argumentation", subjectId: "french", gradeId: "1bac", title: "Argumenter", arabicTitle: "الحجاج", summary: "Construire une opinion avec des arguments et exemples.", objective: "Rédiger un paragraphe argumenté et cohérent.", sourceLabel: "Programme 1BAC · Français" },
    { id: "1bac-arabic-essay", subjectId: "arabic", gradeId: "1bac", title: "الخطاب الحجاجي", arabicTitle: "الخطاب الحجاجي", summary: "تحليل الحجاج وبناء موقف مدعم بالحجج.", objective: "تمييز الأطروحة والحجج والنتائج.", sourceLabel: "Programme 1BAC · العربية" },
    { id: "1bac-physics-motion", subjectId: "science", gradeId: "1bac", title: "Mouvement et forces", arabicTitle: "الحركة والقوى", summary: "Décrire un mouvement et les actions mécaniques.", objective: "Représenter une force et interpréter un mouvement.", sourceLabel: "Programme 1BAC · Physique" },
  ],
  "2bac": [
    { id: "2bac-math-probability", subjectId: "math", gradeId: "2bac", title: "Probabilités", arabicTitle: "الاحتمالات", summary: "Modéliser une expérience aléatoire et calculer une probabilité.", objective: "Utiliser un arbre ou une loi pour résoudre un problème.", sourceLabel: "Programme 2BAC · Mathématiques" },
    { id: "2bac-math-integrals", subjectId: "math", gradeId: "2bac", title: "Intégration", arabicTitle: "التكامل", summary: "Relier primitives, intégrales et aires.", objective: "Calculer une intégrale simple et interpréter une aire.", sourceLabel: "Programme 2BAC · Mathématiques" },
    { id: "2bac-french-novel", subjectId: "french", gradeId: "2bac", title: "Le roman et ses personnages", arabicTitle: "الرواية وشخصياتها", summary: "Analyser un extrait et le point de vue du narrateur.", objective: "Justifier une interprétation avec des procédés du texte.", sourceLabel: "Programme 2BAC · Français" },
    { id: "2bac-arabic-literature", subjectId: "arabic", gradeId: "2bac", title: "تحليل النص الأدبي", arabicTitle: "تحليل النص الأدبي", summary: "قراءة النص الأدبي وتحليل مكوناته الفنية.", objective: "استخراج الصور والأساليب وربطها بالمعنى.", sourceLabel: "Programme 2BAC · العربية" },
    { id: "2bac-physics-electricity", subjectId: "science", gradeId: "2bac", title: "Électricité et circuits", arabicTitle: "الكهرباء والدوائر", summary: "Modéliser les circuits et les grandeurs électriques.", objective: "Appliquer les lois de tension et d’intensité.", sourceLabel: "Programme 2BAC · Physique" },
    { id: "2bac-math-bac-review", subjectId: "math", gradeId: "2bac", title: "Révision nationale · Maths", arabicTitle: "مراجعة الرياضيات للبكالوريا", summary: "Réviser les notions clés et les méthodes des examens nationaux.", objective: "Construire une stratégie de résolution pour un sujet de bac.", sourceLabel: "Révision 2BAC · Examen national" },
    { id: "2bac-french-bac-review", subjectId: "french", gradeId: "2bac", title: "Révision nationale · Français", arabicTitle: "مراجعة الفرنسية للبكالوريا", summary: "Synthèse, compréhension et production écrite.", objective: "Répondre avec précision à une question d’analyse.", sourceLabel: "Révision 2BAC · Examen national" },
    { id: "2bac-arabic-bac-review", subjectId: "arabic", gradeId: "2bac", title: "مراجعة شاملة في العربية", arabicTitle: "مراجعة شاملة في العربية", summary: "مراجعة النصوص واللغة والتعبير استعدادا للامتحان.", objective: "تنظيم جواب شامل ومدعم بالشواهد.", sourceLabel: "Révision 2BAC · Examen national" },
    { id: "2bac-physics-bac-review", subjectId: "science", gradeId: "2bac", title: "Révision nationale · Physique", arabicTitle: "مراجعة الفيزياء للبكالوريا", summary: "Exercices de synthèse et méthodes expérimentales.", objective: "Exploiter les données d’un problème scientifique.", sourceLabel: "Révision 2BAC · Examen national" },
  ],
  "tc": [
    { id: "tc-math-sets", subjectId: "math", gradeId: "tc", title: "Ensembles de nombres et calcul", arabicTitle: "مجموعات الأعداد والحساب", summary: "Consolider les nombres réels, l’ordre et les intervalles avant les fonctions.", objective: "Manipuler les intervalles et résoudre une inéquation simple.", sourceLabel: "Programme Tronc commun · Mathématiques" },
    { id: "tc-math-vectors", subjectId: "math", gradeId: "tc", title: "Vecteurs et translations", arabicTitle: "المتجهات والانسحاب", summary: "Découvrir les vecteurs et leur usage en géométrie.", objective: "Additionner deux vecteurs et lire une translation.", sourceLabel: "Programme Tronc commun · Mathématiques" },
    { id: "tc-french-text-types", subjectId: "french", gradeId: "tc", title: "Types et formes de textes", arabicTitle: "أنماط النصوص", summary: "Distinguer texte narratif, descriptif et explicatif.", objective: "Identifier le type d’un texte à partir de ses indices.", sourceLabel: "Programme Tronc commun · Français" },
    { id: "tc-arabic-grammar", subjectId: "arabic", gradeId: "tc", title: "الجملة الفعلية والاسمية", arabicTitle: "الجملة الفعلية والاسمية", summary: "التمييز بين أنواع الجمل واستعمالها بشكل سليم.", objective: "تحويل جملة اسمية إلى فعلية والعكس.", sourceLabel: "Programme Tronc commun · العربية" },
    { id: "tc-science-cell", subjectId: "science", gradeId: "tc", title: "La cellule, unité du vivant", arabicTitle: "الخلية وحدة بناء الأحياء", summary: "Découvrir l’organisation cellulaire des êtres vivants.", objective: "Légender un schéma simple de cellule.", sourceLabel: "Programme Tronc commun · Sciences" },
  ],
};

export function curriculumForGrade(gradeId: Grade["id"]): CurriculumLesson[] {
  return gradeCurriculum[gradeId] ?? gradeCurriculum["3ac"];
}

export const allBooks: Book[] = books.concat(
  grades.map((grade) => ({ id: `madrasti-${grade.id}-revision`, title: `Cahier de révision · ${grade.label}`, subtitle: "Cours, méthodes et exercices guidés", language: "Français · العربية", level: grade.label, pages: 40, size: "2.2 MB", coverColor: grade.track === "college" ? "#E3F3EE" : "#F0ECFF", icon: grade.track === "college" ? "menu-book" : "school", access: "offline" as const, sourceLabel: "Contenu original Madrasti AI" })),
  grades.map((grade) => ({ id: `authorized-${grade.id}-textbooks`, title: `Livres autorisés · ${grade.label}`, subtitle: "Emplacement pour les fichiers dont tu as les droits", language: "Selon le fichier", level: grade.label, pages: 0, size: "À importer", coverColor: "#E8F2FF", icon: "verified-user", access: "official-link" as const, sourceLabel: "Autorisation requise · import administrateur" })),
);


export type CompleteLessonModule = {
  lessonId: string;
  gradeId: Grade["id"];
  title: string;
  introduction: string;
  keyPoints: string[];
  guidedPractice: string;
  checkpoint: string;
};

export type ExamQuestion = {
  id: string;
  gradeId: Grade["id"];
  subjectId: string;
  type: "single" | "true-false" | "short";
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
};

export const completeLessonModules: CompleteLessonModule[] = Object.values(gradeCurriculum).flat().map((lesson) => ({
  lessonId: lesson.id,
  gradeId: lesson.gradeId ?? "3ac",
  title: lesson.title,
  introduction: `${lesson.summary} Cette séquence te guide de la notion vers une application autonome.`,
  keyPoints: [lesson.objective, "Observe la méthode dans l’exemple guidé.", "Vérifie ton raisonnement avant de regarder la correction."],
  guidedPractice: `Explique avec tes propres mots ce que signifie « ${lesson.title} », puis applique la méthode à un exemple simple.`,
  checkpoint: `Je peux expliquer ${lesson.title.toLowerCase()} et résoudre un exercice de niveau ${lesson.gradeId?.toUpperCase() ?? "3AC"}.`,
}));

export const examQuestions: ExamQuestion[] = [
  { id: "1ac-q1", gradeId: "1ac", subjectId: "math", type: "single", prompt: "Quel est le résultat de 7 + 5 ?", options: ["10", "12", "13", "14"], correctAnswer: "12", explanation: "7 + 5 = 12.", points: 1 },
  { id: "1ac-q2", gradeId: "1ac", subjectId: "science", type: "true-false", prompt: "Un triangle possède toujours trois côtés.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Le triangle est un polygone à trois côtés.", points: 1 },
  { id: "1ac-q3", gradeId: "1ac", subjectId: "french", type: "short", prompt: "Écris le pluriel de « un livre ».", correctAnswer: "des livres", explanation: "Le déterminant et le nom prennent la marque du pluriel : des livres.", points: 1 },
  { id: "2ac-q1", gradeId: "2ac", subjectId: "math", type: "single", prompt: "Quel est le résultat de −3 + 8 ?", options: ["−11", "−5", "5", "11"], correctAnswer: "5", explanation: "Avancer de 8 depuis −3 donne 5.", points: 1 },
  { id: "2ac-q2", gradeId: "2ac", subjectId: "math", type: "true-false", prompt: "Dans une situation de proportionnalité, le quotient entre les grandeurs correspondantes est constant.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "C’est précisément le coefficient de proportionnalité.", points: 1 },
  { id: "2ac-q3", gradeId: "2ac", subjectId: "arabic", type: "short", prompt: "اكتب ضد كلمة « كبير ».", correctAnswer: "صغير", explanation: "ضد كلمة كبير هو صغير.", points: 1 },
  { id: "3ac-q1", gradeId: "3ac", subjectId: "math", type: "single", prompt: "Si 3/5 = x/10, combien vaut x ?", options: ["3", "5", "6", "8"], correctAnswer: "6", explanation: "x = 10 × 3/5 = 6.", points: 1 },
  { id: "3ac-q2", gradeId: "3ac", subjectId: "math", type: "true-false", prompt: "Dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "C’est le côté le plus long du triangle rectangle.", points: 1 },
  { id: "3ac-q3", gradeId: "3ac", subjectId: "science", type: "short", prompt: "Comment appelle-t-on le passage de l’état liquide à l’état gazeux ?", correctAnswer: "vaporisation", explanation: "L’évaporation et l’ébullition sont deux formes de vaporisation.", points: 1 },
  { id: "1bac-q1", gradeId: "1bac", subjectId: "math", type: "single", prompt: "Pour f(x)=2x+1, quelle est l’image de 3 ?", options: ["5", "6", "7", "8"], correctAnswer: "7", explanation: "f(3)=2×3+1=7.", points: 1 },
  { id: "1bac-q2", gradeId: "1bac", subjectId: "science", type: "true-false", prompt: "Une force peut modifier le mouvement d’un objet.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Une force peut accélérer, ralentir ou dévier un objet.", points: 1 },
  { id: "1bac-q3", gradeId: "1bac", subjectId: "french", type: "short", prompt: "Dans un texte argumentatif, comment appelle-t-on une idée qui soutient la thèse ?", correctAnswer: "un argument", explanation: "Un argument soutient une thèse, souvent avec un exemple.", points: 1 },
  { id: "2bac-q1", gradeId: "2bac", subjectId: "math", type: "single", prompt: "Quelle est la dérivée de x² ?", options: ["x", "2x", "x²", "2"], correctAnswer: "2x", explanation: "La dérivée de x² est 2x.", points: 1 },
  { id: "2bac-q2", gradeId: "2bac", subjectId: "science", type: "true-false", prompt: "Dans un circuit en série, l’intensité est la même en tout point.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Le courant est unique dans une branche en série.", points: 1 },
  { id: "2bac-q3", gradeId: "2bac", subjectId: "arabic", type: "short", prompt: "ما اسم الفكرة التي يدافع عنها الكاتب؟", correctAnswer: "الأطروحة", explanation: "الأطروحة هي الموقف أو الفكرة التي يدافع عنها الكاتب.", points: 1 },
  { id: "tc-q1", gradeId: "tc", subjectId: "math", type: "single", prompt: "Quel est l’ensemble solution de x² = 9 ?", options: ["{3}", "{-3}", "{-3, 3}", "∅"], correctAnswer: "{-3, 3}", explanation: "x² = 9 donne x = 3 ou x = −3.", points: 1 },
  { id: "tc-q2", gradeId: "tc", subjectId: "science", type: "true-false", prompt: "Toutes les cellules vivantes contiennent un noyau visible au microscope optique.", options: ["Vrai", "Faux"], correctAnswer: "Faux", explanation: "Les cellules procaryotes (comme les bactéries) n’ont pas de noyau.", points: 1 },
  { id: "tc-q3", gradeId: "tc", subjectId: "french", type: "short", prompt: "Comment appelle-t-on un texte qui décrit un lieu ou un objet ?", correctAnswer: "un texte descriptif", explanation: "Le texte descriptif donne à voir un lieu, une personne ou un objet.", points: 1 },
];

export function examForGrade(gradeId: Grade["id"]): ExamQuestion[] {
  return examQuestions.filter((question) => question.gradeId === gradeId);
}
