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
  // 3AC Curriculum
  { lessonId: "remarkable-identities", concept: "Développer avec une identité remarquable", explanation: "Les 3 identités remarquables permettent de développer et factoriser rapidement :\n1) (a + b)² = a² + 2ab + b²\n2) (a − b)² = a² − 2ab + b²\n3) (a − b)(a + b) = a² − b².", example: "(2x + 3)² = (2x)² + 2(2x)(3) + 3² = 4x² + 12x + 9", exercise: "Développe et réduis l'expression suivante : A = (3x − 4)² + (x + 2)(x − 2).", answer: "A = (9x² − 24x + 16) + (x² − 4) = 10x² − 24x + 12.", hint: "Applique la 2ème identité au premier terme, et la 3ème au second terme." },
  { lessonId: "powers", concept: "Les règles des puissances", explanation: "Pour tout nombre non nul a et entiers m et n :\n• aᵐ × aⁿ = aᵐ⁺ⁿ\n• (aᵐ)ⁿ = aᵐˣⁿ\n• aᵐ / aⁿ = aᵐ⁻ⁿ\n• (a × b)ⁿ = aⁿ × bⁿ\n• a⁻ⁿ = 1 / aⁿ.", example: "2³ × 2⁴ = 2⁷ = 128 ; (3²)³ = 3⁶ = 729", exercise: "Écris sous la forme aⁿ : B = (10³ × 10⁻⁵) / 10⁻⁴.", answer: "Numérateur : 10³⁺⁽⁻⁵⁾ = 10⁻². Puis 10⁻² / 10⁻⁴ = 10⁻²⁻⁽⁻⁴⁾ = 10² = 100.", hint: "Additionne les exposants du haut, puis soustrais l'exposant du bas." },
  { lessonId: "square-roots", concept: "Comprendre et simplifier une racine carrée", explanation: "Pour a ≥ 0, √a est le nombre positif dont le carré est a : (√a)² = a.\nPropriétés : √(a × b) = √a × √b et √(a / b) = √a / √b (b > 0).\nAttention : √(a + b) ≠ √a + √b.", example: "√75 = √(25 × 3) = √25 × √3 = 5√3", exercise: "Simplifie au maximum l'expression : C = 3√20 − 2√45 + √80.", answer: "√20 = 2√5, √45 = 3√5, √80 = 4√5. Donc C = 3(2√5) − 2(3√5) + 4√5 = 6√5 − 6√5 + 4√5 = 4√5.", hint: "Décompose chaque nombre sous le radical en un produit contenant un carré parfait (4, 9, 16...)." },
  { lessonId: "first-degree-equations", concept: "Résoudre une équation du 1er degré", explanation: "Pour résoudre ax + b = cx + d, on regroupe les termes en x d'un côté et les nombres constants de l'autre en conservant l'égalité.", example: "3x + 4 = 19 → 3x = 19 − 4 → 3x = 15 → x = 5.", exercise: "Résous l'équation suivante : 5(x − 2) = 2x + 8.", answer: "5x − 10 = 2x + 8 → 5x − 2x = 8 + 10 → 3x = 18 → x = 6. La solution est S = {6}.", hint: "Commence par développer le membre de gauche avant de regrouper les x." },
  { lessonId: "thales", concept: "Théorème de Thalès direct et réciproque", explanation: "Dans un triangle ABC où M ∈ [AB], N ∈ [AC] et (MN) // (BC) :\nAM/AB = AN/AC = MN/BC.\nLa réciproque sert à prouver que deux droites sont parallèles.", example: "Si AM = 3, AB = 9 et BC = 12 avec (MN)//(BC), alors MN = 12 × (3/9) = 4.", exercise: "Soit un triangle ABC. M ∈ [AB] avec AM = 4, AB = 10. N ∈ [AC] avec AN = 6, AC = 15. Les droites (MN) et (BC) sont-elles parallèles ?", answer: "AM/AB = 4/10 = 0,4. AN/AC = 6/15 = 0,4. Comme AM/AB = AN/AC et les points sont alignés dans le même ordre, d'après la réciproque de Thalès, (MN) // (BC).", hint: "Calcule séparément les deux rapports et compare leurs valeurs simplifiées." },
  { lessonId: "pythagoras", concept: "Théorème de Pythagore", explanation: "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés : BC² = AB² + AC².\nLa réciproque prouve qu'un triangle est rectangle.", example: "Si AB = 6 et AC = 8, alors BC² = 36 + 64 = 100 → BC = √100 = 10.", exercise: "Un triangle EFG a pour côtés EF = 5 cm, FG = 12 cm et EG = 13 cm. Ce triangle est-il rectangle ?", answer: "Le plus long côté est EG : EG² = 13² = 169. D'autre part : EF² + FG² = 5² + 12² = 25 + 144 = 169. Comme EG² = EF² + FG², d'après la réciproque de Pythagore, EFG est rectangle en F.", hint: "Compare le carré du plus grand côté à la somme des carrés des deux autres côtés." },
  { lessonId: "statistics-probability", concept: "Moyenne, médiane et probabilité simple", explanation: "La moyenne m = (∑ nᵢ × xᵢ) / N. La médiane sépare la série ordonnée en deux groupes d'effectifs égaux. La probabilité d'un événement = (cas favorables) / (cas possibles).", example: "Lancer d'un dé équilibré : P(obtenir un nombre pair) = 3/6 = 1/2.", exercise: "Dans une classe, les notes d'un contrôle sont : 8, 10, 11, 13, 14, 16. Calcule la moyenne et la note médiane.", answer: "Moyenne = (8 + 10 + 11 + 13 + 14 + 16) / 6 = 72 / 6 = 12. La série a 6 valeurs (pair), la médiane est entre la 3e et 4e valeur : (11 + 13)/2 = 12.", hint: "Vérifie que les notes sont déjà rangées par ordre croissant avant de chercher le milieu." },
  { lessonId: "affine-functions", concept: "Fonctions affines et linéaires", explanation: "Une fonction affine s'écrit f(x) = ax + b (droite d'ordonnée à l'origine b et coefficient a = (f(x₂) − f(x₁))/(x₂ − x₁)). Si b = 0, f est une fonction linéaire f(x) = ax.", example: "Pour f(x) = 2x + 1, f(3) = 2(3) + 1 = 7.", exercise: "Détermine la fonction affine f sachant que f(1) = 5 et f(3) = 11.", answer: "Coefficient a = (11 − 5)/(3 − 1) = 6/2 = 3. On a f(x) = 3x + b. Or f(1) = 3(1) + b = 5 → b = 2. Donc f(x) = 3x + 2.", hint: "Calcule d'abord le coefficient directeur a avec la formule du taux d'accroissement." },
  { lessonId: "narrative-times", concept: "Les temps du récit : Imparfait et Passé Simple", explanation: "L'imparfait s'utilise pour la description, le décor, les actions durables ou répétées (habitudes). Le passé simple s'utilise pour les actions ponctuelles, soudaines et successives qui font progresser l'histoire.", example: "Le vent soufflait fort (imparfait, décor) lorsqu'un coup de tonnerre retentit (passé simple, action soudaine).", exercise: "Conjugue au temps qui convient : « Les élèves (écouter) attentivement quand le professeur (fermer) la porte. »", answer: "« Les élèves écoutaient (imparfait) attentivement quand le professeur ferma (passé simple) la porte. »", hint: "L'action en arrière-plan est longue (imparfait), l'événement qui surgit est bref (passé simple)." },
  { lessonId: "reading-comprehension", concept: "Comprendre un texte et repérer les indices", explanation: "Lire un texte requiert de distinguer l'information explicite (directement écrite) de l'information implicite (sous-entendue). Justifier avec une citation courte entre guillemets.", example: "Le narrateur est triste : « des larmes silencieuses coulaient sur mes joues ».", exercise: "Quelle est la différence entre le narrateur et l'auteur d'un texte ?", answer: "L'auteur est la personne réelle qui a écrit le livre (ex: Ahmed Sefrioui). Le narrateur est la voix fictive qui raconte l'histoire à l'intérieur du récit (ex: Sidi Mohammed).", hint: "Pense à qui tient le stylo dans la réalité et qui parle dans le livre." },
  { lessonId: "arabic-reading", concept: "قراءة النصوص وتحليل الأفكار الأساسية", explanation: "تعتمد القراءة المنهجية على ثلاث مراحل : الملاحظة (تحديد العنوان والمؤشرات الخارجية)، الفهم (الفكرة العامة والأفكار الأساسية)، والتحليل (الحقول الدلالية وأساليب النص).", example: "الفكرة العامة لنص بيئي : دعوة الكاتب إلى حماية الموارد الطبيعية وترشيد استهلاك الماء.", exercise: "حدد الفكرة العامة لنص يتحدث عن فضل العلم في تقدم الأمم ومحاربة الجهل.", answer: "الفكرة العامة : إبراز الكاتب دور العلم الحاسم في رقي المجتمعات وتطورها، والدعوة إلى نشره للقضاء على الجهل والفقر.", hint: "اجمع بين موضوع النص والهدف الذي يسعى الكاتب إلى إيصاله في جملة اسمية مركزة." },
  { lessonId: "arabic-grammar", concept: "التراكيب والإعراب في اللغة العربية", explanation: "الإعراب يحدد موقع الكلمة ووظيفتها في الجملة :\n• الفاعل : اسم مرفوع يدل على من قام بالفعل (نجحَ التلميذُ).\n• المفعول به : اسم منصوب وقع عليه فعل الفاعل (كتبَ الدرسَ).\n• النواسخ الفعلية (كان وأخواتها) ترفع المبتدأ وتنصب الخبر.\n• النواسخ الحرفية (إن وأخواتها) تنصب المبتدأ وترفع الخبر.", example: "كانَ الجوُّ ماطراً : كان فعل ماض ناقص، الجو اسمها مرفوع، ماطراً خبرها منصوب.", exercise: "أعرب الجملة التالية إعراباً تاماً : « إنَّ العلمَ نورٌ ».", answer: "إنَّ : حرف توكيد ونصب (ناسخ حرفي).\nالعلمَ : اسم إنَّ منصوب وعلامة نصبه الفتحة الظاهرة على آخره.\nنورٌ : خبر إنَّ مرفوع وعلامة رفعه الضمة الظاهرة على آخره.", hint: "تذكر أن إن وأخواتها تدخل على المبتدأ والخبر فتنصب الأول وترفع الثاني." },
  { lessonId: "matter", concept: "La matière et les atomes (Physique-Chimie)", explanation: "Tout corps est constitué de molécules, elles-mêmes formées d'atomes. Un atome est composé d'un noyau positif entouré d'électrons négatifs. Les molécules s'écrivent avec des formules chimiques : H₂O (eau), CO₂ (dioxyde de carbone), O₂ (dioxygène).", example: "La molécule de méthane CH₄ est composée d'un atome de carbone et de 4 atomes d'hydrogène.", exercise: "Écris et équilibre la réaction de combustion complète du carbone dans le dioxygène.", answer: "C + O₂ → CO₂. Un atome de carbone réagit avec une molécule de dioxygène pour donner une molécule de dioxyde de carbone. L'équation est déjà équilibrée.", hint: "Le nombre d'atomes de chaque élément doit être identique à gauche et à droite de la flèche." },
  { lessonId: "movement-energy", concept: "Mouvement, vitesse et énergie cinétique", explanation: "Le mouvement d'un objet est toujours relatif à un référentiel. La vitesse moyenne v = d / t (avec d en mètres, t en secondes, v en m/s ; multiplier par 3,6 pour obtenir des km/h). L'énergie cinétique est Ec = 1/2 m v².", example: "Un véhicule parcourt 90 km en 1h30 (1,5h) : sa vitesse moyenne est v = 90 / 1,5 = 60 km/h.", exercise: "Un scooter roule à 72 km/h. Calcule sa vitesse en mètres par seconde (m/s).", answer: "Pour convertir des km/h en m/s, on divise par 3,6 : 72 / 3,6 = 20 m/s.", hint: "1 km = 1000 m et 1 h = 3600 s, d'où le facteur 3,6." },
  { lessonId: "human-body", concept: "Système nerveux et immunité (SVT)", explanation: "Le système nerveux coordonne les mouvements volontaires (cerveau) et involontaires (moelle épinière, réflexes). Le système immunitaire défend le corps contre les microbes grâce aux globules blancs (phagocytose, lymphocytes B et T).", example: "Retirer sa main instantanément d'une casserole brûlante est un réflexe médullaire involontaire.", exercise: "Quelles sont les 4 étapes de la phagocytose assurée par les polynucléaires ?", answer: "Les 4 étapes de la phagocytose sont : 1) L'adhésion, 2) L'ingestion, 3) La digestion (par les enzymes), 4) Le rejet des débris.", hint: "Imagine la cellule immunitaire qui s'accroche au microbe, l'avale, le détruit puis rejette les restes." },

  // 1AC Curriculum
  { lessonId: "1ac-math-numbers", concept: "Opérations sur les nombres décimaux et priorités", explanation: "Dans une suite d'opérations sans parenthèses, la multiplication et la division sont prioritaires sur l'addition et la soustraction. En présence de parenthèses, on effectue d'abord les calculs à l'intérieur des parenthèses les plus internes.", example: "7 + 3 × 4 = 7 + 12 = 19 (et non 40 !)", exercise: "Calcule l'expression suivante en détaillant les étapes : A = 25 − 3 × (6 − 2) + 8 / 2.", answer: "Parenthèses : (6 − 2) = 4. Donc A = 25 − 3 × 4 + 8 / 2. Multiplications et divisions : 3 × 4 = 12 et 8 / 2 = 4. Enfin : A = 25 − 12 + 4 = 13 + 4 = 17.", hint: "Calcule d'abord dans la parenthèse, puis fais les multiplications et divisions de gauche à droite." },
  { lessonId: "1ac-math-geometry", concept: "Droites, segments et médiatrice", explanation: "La médiatrice d'un segment est la droite perpendiculaire à ce segment en son milieu. Tout point situé sur la médiatrice d'un segment est équidistant des deux extrémités de ce segment : si M appartient à la médiatrice de [AB], alors MA = MB.", example: "Si la droite (d) est la médiatrice de [AB] et M ∈ (d) avec MA = 5 cm, alors MB = 5 cm.", exercise: "Soit un segment [EF] de longueur 8 cm et (Δ) sa médiatrice coupant [EF] en I. Quelle est la longueur de [EI] et quelle est la nature de l'angle formé en I ?", answer: "Comme I est le milieu de [EF], EI = EF / 2 = 8 / 2 = 4 cm. Comme (Δ) est perpendiculaire à [EF], l'angle en I est un angle droit (90°).", hint: "Rappelle-toi les deux propriétés fondamentales : milieu et angle droit." },
  { lessonId: "1ac-french-reading", concept: "Le schéma narratif du conte", explanation: "Le récit s'organise en 5 étapes clés :\n1) Situation initiale (calme, présentation du héros)\n2) Élément perturbateur (événement qui déclenche l'action)\n3) Péripéties (aventures et épreuves)\n4) Élément de résolution (dénouement de la crise)\n5) Situation finale (retour au calme, souvent heureux).", example: "« Il était une fois un pauvre bûcheron... (SI). Un jour, une terrible famine frappa le royaume... (EP) ».", exercise: "Dans un conte, quelle étape fait basculer le récit de l'état de calme vers l'action ?", answer: "C'est l'élément perturbateur (ou élément modificateur). Il introduit un problème, une quête ou un danger qui pousse le personnage principal à agir.", hint: "Cherche l'événement déclencheur qui rompt le calme du début." },
  { lessonId: "1ac-arabic-reading", concept: "فهم النص القرائي واستخراج المعاني", explanation: "يتكون النص من فقرات مترابطة تعالج موضوعاً موحداً. لفهم النص جيداً، نقرأ قراءة متأنية، نشرح المفردات الصعبة في سياقها، ونميز بين ما هو حقيقة وما هو رأي.", example: "الماء شريان الحياة (تعبير مجازي يدل على أن لا حياة بدون ماء).", exercise: "اقرأ الجملة : « يغرس الفلاح الشتائل بأمل يملأ قلبه ». استخرج الحقل المعنوي الذي تدل عليه كلمة « الشتائل ».", answer: "تدل كلمة « الشتائل » على حقل الفلاحة والزراعة والطبيعة.", hint: "فكر في المجال المرتبط بالزرع والأرض والفلاح." },
  { lessonId: "1ac-science-life", concept: "الوسط الطبيعي والكائنات الحية (SVT 1AC)", explanation: "الوسط الطبيعي (غابة، واد، بحر...) يحتوي على مكونات أحيائية (نباتات، حيوانات، كائنات دقيقة) ومكونات لاأحيائية (ماء، هواء، تربة، صخور، ضوء). تتنفس الكائنات الحية عبر أعضاء مختلفة : الرئتان (ثدييات)، الغلاصم (أسماك)، الرغامى (حشرات).", example: "السمكة تأخذ الأكسجين المذاب في الماء بواسطة الغلاصم (Téguments branchiaux).", exercise: "كيف تتنفس الحشرات (مثل الجراد) إذا كانت لا تملك رئتين ولا غلاصم ؟", answer: "تتنفس الحشرات بواسطة قصبات هوائية تسمى « الرغامى » (Trachées) تنفتح على جانبي البطن عبر فتحات تنفسية وتوصل الأكسجين مباشرة إلى الخلايا.", hint: "تذكر الأنابيب الدقيقة التي تمر عبر جسم الحشرة." },

  // 2AC Curriculum
  { lessonId: "2ac-math-relative", concept: "Calcul et opérations sur les nombres relatifs", explanation: "Addition : deux nombres de même signe s'additionnent en gardant le signe commun ; deux nombres de signes opposés se soustraient en gardant le signe du plus grand en valeur absolue.\nMultiplication : (+) × (+) = (+) ; (−) × (−) = (+) ; (+) × (−) = (−).", example: "(−4) + (+9) = +5 ; (−3) × (−7) = +21 ; (−24) / (+6) = −4.", exercise: "Calcule l'expression : D = (−5) × (+4) − (−18) / (−3) + (−7).", answer: "(−5) × (+4) = −20. (−18) / (−3) = +6. Donc D = −20 − (+6) + (−7) = −20 − 6 − 7 = −33.", hint: "Effectue d'abord les multiplications et divisions en appliquant soigneusement la règle des signes." },
  { lessonId: "2ac-math-proportionality", concept: "Proportionnalité, pourcentages et échelles", explanation: "Deux suites de nombres sont proportionnelles lorsqu'on passe de l'une à l'autre en multipliant par un même nombre non nul appelé coefficient de proportionnalité.\nPourcentage : p% d'une quantité = Quantité × (p / 100).\nÉchelle : Échelle = Distance sur le plan / Distance réelle.", example: "Une remise de 20% sur un article à 250 DH : Réduction = 250 × 0,20 = 50 DH. Nouveau prix = 200 DH.", exercise: "Sur une carte à l'échelle 1 / 50 000, deux villes sont distantes de 6 cm. Quelle est la distance réelle en kilomètres entre ces deux villes ?", answer: "Distance réelle = 6 cm × 50 000 = 300 000 cm = 3 000 m = 3 km.", hint: "Multiplie la distance mesurée par le dénominateur de l'échelle, puis convertis les cm en km." },
  { lessonId: "2ac-french-grammar", concept: "Les propositions et la phrase complexe", explanation: "Une phrase complexe contient plusieurs verbes conjugués. Elle peut être formée de propositions coordonnées (reliées par mais, ou, et, donc, or, ni, car), juxtaposées (reliées par une virgule ou point-virgule), ou subordonnées (introduites par que, qui, quand, parce que...).", example: "« Le soleil brille, les oiseaux chantent » (juxtaposition) ; « Il prend son manteau car il fait froid » (coordination).", exercise: "Identifie la nature des deux propositions dans : « Les élèves étudient parce qu'ils veulent réussir leur année. »", answer: "« Les élèves étudient » est la proposition principale. « parce qu'ils veulent réussir leur année » est une proposition subordonnée conjonctive de cause.", hint: "Regarde le mot de liaison « parce que » qui indique la cause." },
  { lessonId: "2ac-arabic-expression", concept: "مهارة التعبير والإنشاء : كتابة سيرة ذاتية أو غيرية", explanation: "السيرة الذاتية يروي فيها الكاتب أحداثاً واقعية من حياته بضمير المتكلم (أنا). أما السيرة الغيرية فيتحدث فيها الكاتب عن شخصية أخرى بضمير الغائب (هو / هي) متتبعاً مراحل حياتها وإنجازاتها.", example: "« ولدتُ في حي شعبي بالدار البيضاء، وقضيت طفولتي أركض بين أزقته... » (سيرة ذاتية).", exercise: "ما هي الضمائر المعتمدة في كل من السيرة الذاتية والسيرة الغيرية ؟", answer: "تعتمد السيرة الذاتية على ضمير المتكلم (أنا، نحن) لأن السارد هو نفسه صاحب الأحداث. وتعتمد السيرة الغيرية على ضمير الغائب (هو، هي، هم) لأن الكاتب ينقل حياة شخص آخر.", hint: "تذكر العلاقة بين الكاتب والشخصية التي يتحدث عنها النص." },
  { lessonId: "2ac-science-matter", concept: "الذرات والجزيئات والتفاعلات الكيميائية (Physique 2AC)", explanation: "خلال التفاعل الكيميائي، تختفي المتفاعلات وتظهر أجسام جديدة تسمى النواتج. تنحفظ الكتلة وينحفظ نوع وعدد الذرات : كتلة المتفاعلات = كتلة النواتج (قانون لافوازييه).\nالرمز الكيميائي للذرة يبدأ بحرف كبير (C, H, O, N).", example: "احتراق الميثان في الأكسجين : CH₄ + 2O₂ → CO₂ + 2H₂O.", exercise: "في تفاعل كيميائي، تفاعل 12 غرام من الكربون مع كمية من الأكسجين فأعطى 44 غرام من غاز ثنائي أكسيد الكربون. ما هي كتلة الأكسجين المستهلكة ؟", answer: "حسب قانون انحفاظ الكتلة : كتلة الكربون + كتلة الأكسجين = كتلة ثنائي أكسيد الكربون.\n12 g + m(O₂) = 44 g → m(O₂) = 44 − 12 = 32 g من الأكسجين.", hint: "طبق قانون انحفاظ الكتلة : مجموع كتل المتفاعلات يساوي مجموع كتل النواتج." },

  // Tronc Commun (TC) Curriculum
  { lessonId: "tc-math-sets", concept: "Arithmétique dans ℕ et ensembles de nombres", explanation: "On distingue les ensembles : ℕ ⊂ ℤ ⊂ ⅅ ⊂ ℚ ⊂ ℝ.\nUn nombre pair s'écrit 2k, un nombre impair 2k+1 (k ∈ ℕ). Un nombre premier n'admet que deux diviseurs : 1 et lui-même. Les intervalles de ℝ permettent de noter les ensembles de solutions d'inéquations.", example: "L'intervalle [2 ; 5[ correspond à l'ensemble des réels x vérifiant 2 ≤ x < 5.", exercise: "Démontre que la somme de deux nombres impairs est toujours un nombre pair.", answer: "Soient deux nombres impairs a = 2p + 1 et b = 2q + 1 (avec p, q ∈ ℕ). Alors a + b = (2p + 1) + (2q + 1) = 2p + 2q + 2 = 2(p + q + 1). En posant k = p + q + 1 ∈ ℕ, on a a + b = 2k, ce qui prouve que leur somme est paire.", hint: "Écris chaque nombre impair sous la forme 2k+1 puis factorise la somme par 2." },
  { lessonId: "tc-math-vectors", concept: "Le calcul vectoriel et la relation de Chasles", explanation: "Pour tous points A, B, C du plan, la relation de Chasles s'écrit : vecteur(AB) + vecteur(BC) = vecteur(AC).\nDeux vecteurs u et v sont colinéaires s'il existe un réel k tel que v = k × u. La colinéarité prouve l'alignement de 3 points ou le parallélisme de 2 droites.", example: "Si vecteur(MN) = 3 × vecteur(PQ), alors les droites (MN) et (PQ) sont parallèles.", exercise: "Simplifie l'expression vectorielle suivante : V = vecteur(AB) − vecteur(CB) + vecteur(CA).", answer: "vecteur(AB) − vecteur(CB) = vecteur(AB) + vecteur(BC) = vecteur(AC) (Chasles). Donc V = vecteur(AC) + vecteur(CA) = vecteur(AA) = vecteur nul (0).", hint: "Rappelle-toi que soustraire un vecteur équivaut à ajouter son opposé : −vecteur(CB) = +vecteur(BC)." },
  { lessonId: "tc-french-text-types", concept: "Typologie textuelle : Narratif, Descriptif et Argumentatif", explanation: "• Le texte narratif raconte des événements (verbes d'action, repères temporels).\n• Le texte descriptif présente un lieu, un objet ou un personnage (adjectifs, repères spatiaux, verbes de perception).\n• Le texte argumentatif vise à convaincre ou persuader le lecteur (thèse, arguments, exemples, connecteurs logiques).", example: "« D'abord, la lecture enrichit le vocabulaire. Ensuite, elle stimule l'imagination... » (Texte argumentatif).", exercise: "Quels sont les connecteurs logiques utilisés pour introduire une concession puis une réfutation ?", answer: "Pour introduire une concession, on emploie : « Certes », « Bien que », « Même si », « Il est vrai que ». Pour réfuter ensuite, on utilise : « Mais », « Cependant », « Néanmoins », « Toutefois ».", hint: "Pense au schéma : admettre un point de l'adversaire (concession) pour mieux le contredire (réfutation)." },
  { lessonId: "tc-arabic-grammar", concept: "الجملة الفعلية والجملة الاسمية والأساليب", explanation: "الجملة الاسمية تبدأ باسم وتتكون من مبتدأ وخبر (العلمُ نورٌ). الجملة الفعلية تبدأ بفعل وتتكون من فعل وفاعل ومفعول به. تشمل أساليب اللغة : أسلوب الشرط، أسلوب الاستفهام، أسلوب التعجب، وأسلوب التوكيد.", example: "« ما أجملَ الطبيعةَ ! » (أسلوب تعجب قياسي على وزن ما أفعلَ).", exercise: "حدد نوع الأسلوب في الجملة التالية وعناصره : « مَن يجتهدْ ينجحْ ».", answer: "الأسلوب هو أسلوب شرط جازم. عناصره :\n• « مَن » : اسم شرط جازم يجزم فعلين مضارعين.\n• « يجتهدْ » : فعل الشرط مجزوم بالسكون.\n• « ينجحْ » : جواب الشرط مجزوم بالسكون.", hint: "ابحث عن أداة الشرط وما يتطلبه من فعل وجواب." },
  { lessonId: "tc-science-cell", concept: "الخلية : وحدة بناء الكائنات الحية (SVT TC)", explanation: "الخلية هي الوحدة التركيبية والوظيفية لجميع الكائنات الحية. تتكون الخلية الحية عموماً من غشاء سيتوبلازمي، سيتوبلازم، ونواة تحتوي على المادة الوراثية (ADN). تختلف الخلية النباتية عن الحيوانية بوجود جدار هيكلي (سليلوزي) وصانعات خضراء (Chloroplastes) وفجوة عصارية نامية.", example: "الخلايا حقيقية النواة (Eucaryotes) تحيط مادتها الوراثية بغلاف نووي، عكس بدائيات النواة مثل البكتيريا.", exercise: "اذكر عنصرين مميزين توجدان في الخلية النباتية ولا توجدان في الخلية الحيوانية.", answer: "العنصران هما : 1) الجدار الهيكلي (Paroi pectocellulosique) الذي يمنح الخلية شكلها الهندسي، 2) الصانعات الخضراء (Chloroplastes) المسؤولة عن التركيب الضوئي.", hint: "فكر في المسؤول عن الشكل الصلب للخلية النباتية ولونها الأخضر." },

  // 1BAC Curriculum
  { lessonId: "1bac-math-functions", concept: "Généralités sur les fonctions et domaine de définition", explanation: "Le domaine Df est l'ensemble des réels x pour lesquels f(x) existe :\n• Si f(x) = P(x)/Q(x), alors Q(x) ≠ 0\n• Si f(x) = √P(x), alors P(x) ≥ 0.\nUne fonction est paire si pour tout x ∈ Df, −x ∈ Df et f(−x) = f(x) (symétrie par rapport à l'axe des ordonnées). Elle est impaire si f(−x) = −f(x) (symétrie par rapport à l'origine).", example: "f(x) = x² + 1 est paire car f(−x) = (−x)² + 1 = x² + 1 = f(x).", exercise: "Détermine le domaine de définition de la fonction f(x) = √(2x − 6) / (x − 5).", answer: "Pour que f(x) existe, il faut que 2x − 6 ≥ 0 (sous la racine) ET x − 5 ≠ 0 (dénominateur). 2x ≥ 6 → x ≥ 3. De plus x ≠ 5. Le domaine de définition est donc Df = [3 ; 5[ ∪ ]5 ; +∞[.", hint: "Prends en compte la condition du radical positif ET celle du dénominateur non nul." },
  { lessonId: "1bac-math-derivatives", concept: "Dérivation et tableau de variations", explanation: "Le nombre dérivé de f en a est f'(a) = lim [f(x) − f(a)] / (x − a) quand x → a. L'équation de la tangente en a est y = f'(a)(x − a) + f(a).\nSi f'(x) > 0 sur un intervalle, f est strictement croissante. Si f'(x) < 0, f est strictement décroissante.", example: "Pour f(x) = x³ − 3x, f'(x) = 3x² − 3 = 3(x − 1)(x + 1). f s'annule en −1 et 1.", exercise: "Soit f(x) = 2x² − 4x + 1. Calcule f'(x) et donne l'équation de la tangente à la courbe au point d'abscisse a = 2.", answer: "f'(x) = 4x − 4. En a = 2 : f(2) = 2(4) − 4(2) + 1 = 1, et f'(2) = 4(2) − 4 = 4. L'équation de la tangente est y = f'(2)(x − 2) + f(2) = 4(x − 2) + 1 = 4x − 8 + 1 = 4x − 7.", hint: "Calcule d'abord la dérivée f'(x), puis évalue f(2) et f'(2) avant d'appliquer la formule de la tangente." },
  { lessonId: "1bac-french-argumentation", concept: "Les œuvres au programme du Régional 1BAC", explanation: "Trois œuvres majeures au programme de 1ère Année Baccalauréat au Maroc :\n1) « La Boîte à Merveilles » d'Ahmed Sefrioui (roman autobiographique, Sidi Mohammed, tradition et solitude)\n2) « Antigone » de Jean Anouilh (tragédie moderne, révolte contre Créon, devoir moral)\n3) « Le Dernier Jour d'un Condamné » de Victor Hugo (roman à thèse, plaidoyer humaniste contre la peine de mort).", example: "Dans Antigone, le face-à-face entre Antigone (idéalisme) et Créon (réalisme politique) constitue le nœud tragique.", exercise: "Dans « Le Dernier Jour d'un Condamné », pourquoi Victor Hugo a-t-il choisi de ne donner ni le nom du condamné ni le crime commis ?", answer: "Victor Hugo rend le personnage universel et anonyme afin que le lecteur s'identifie à lui et condamne le principe même de la peine de mort, quel que soit le crime commis, plutôt que de juger un individu particulier.", hint: "Pense à la portée universelle d'un plaidoyer qui dépasse le cas d'une personne précise." },
  { lessonId: "1bac-arabic-essay", concept: "مكون التعبير والإنشاء : مهارة تحليل صورة أو نص حجاجي", explanation: "في الامتحان الجهوي للأولى باك، يطلب تحليل نص حجاجي أو صورة إشهارية. في تحليل الصورة نحدد المستويات : المستوى التقريري (المكونات الأيقونية واللغوية)، المستوى الإيحائي (الرسائل الدلالية والتأثيرية). وفي النص الحجاجي نحدد الأطروحة، سيرورة الحجاج، والنتيجة.", example: "تحليل إشهار تحسيسي حول السلامة الطرقية : الصورة تبرز خطورة استعمال الهاتف أثناء السياقة لحماية الأرواح.", exercise: "ما هي المراحل المنهجية الثلاث المتبعة في إنشاء موضوع حجاجي باللغة العربية ؟", answer: "المراحل هي : 1) المقدمة (تأطير الموضوع وطرح الإشكالية والتساؤلات)، 2) العرض (عرض الأطروحة ودعمها بالحجج الواقعية والمنطقية ومناقشة الرأي المعارض)، 3) الخاتمة (خلاصة تركيبية وإبداء الرأي الشخصي).", hint: "تذكر الهيكل الثلاثي الكلاسيكي لأي إنشاء مدرسي : مقدمة، عرض، خاتمة." },
  { lessonId: "1bac-physics-motion", concept: "Travail d'une force et énergie cinétique (1BAC)", explanation: "Le travail d'une force constante F sur un déplacement AB est W(F) = F · AB = F × AB × cos(α). Si W > 0, le travail est moteur ; si W < 0, il est résistant.\nThéorème de l'énergie cinétique : Dans un référentiel galiléen, ΔEc = Ec(B) − Ec(A) = ∑ W(F).", example: "Le travail du poids lors d'une chute d'une hauteur h est W(P) = m × g × h (moteur car cos(0) = 1).", exercise: "Un solide de masse m = 2 kg glisse sans frottement d'un point A (vitesse nulle) à un point B situé 5 m plus bas (g = 10 N/kg). Calcule sa vitesse en B.", answer: "D'après le T.E.C : Ec(B) − Ec(A) = W(P) + W(R). Comme les frottements sont nuls, W(R) = 0. Ec(A) = 0 (départ arrêté). Donc 1/2 m v² = m g h → v² = 2 g h = 2 × 10 × 5 = 100 → v = √100 = 10 m/s.", hint: "Applique le théorème de l'énergie cinétique en simplifiant par la masse m." },

  // 2BAC Curriculum
  { lessonId: "2bac-math-probability", concept: "Dénombrement, probabilités et loi binomiale", explanation: "• Arrangements Aₙᵖ = n! / (n−p)! (ordre important sans remise)\n• Combinaisons Cₙᵖ = n! / (p!(n−p)!) (ordre non important sans remise)\n• Formule des probabilités totales : P(B) = ∑ P(Aᵢ) × P(B | Aᵢ)\n• Loi binomiale B(n, p) : P(X = k) = Cₙᵏ pᵏ (1−p)ⁿ⁻ᵏ.", example: "On tire 3 cartes simultanément d'un jeu de 32 cartes : le nombre de tirages possibles est C₃₂³ = 4960.", exercise: "Une urne contient 4 boules blanches et 6 boules noires. On tire simultanément 2 boules au hasard. Quelle est la probabilité de tirer exactement 2 boules blanches ?", answer: "Nombre total de tirages possibles : C₁₀² = (10 × 9) / 2 = 45. Nombre de cas favorables (2 blanches parmi 4) : C₄² = (4 × 3) / 2 = 6. Probabilité = 6 / 45 = 2 / 15 ≈ 0,133.", hint: "Le tirage étant simultané, utilise les combinaisons Cₙᵖ pour dénombrer les cas." },
  { lessonId: "2bac-math-integrals", concept: "Primitives, calcul d'intégrales et intégration par parties", explanation: "Si F est une primitive de f sur [a ; b], alors ∫ₐᵇ f(x) dx = [F(x)]ₐᵇ = F(b) − F(a).\nFormule d'intégration par parties (IPP) : ∫ₐᵇ u(x) v'(x) dx = [u(x) v(x)]ₐᵇ − ∫ₐᵇ u'(x) v(x) dx. On choisit u selon la règle ALPES (Arctan, Logarithme, Polynôme, Exponentielle, Sinus/Cosinus).", example: "∫₁ᵉ (1/x) dx = [ln(x)]₁ᵉ = ln(e) − ln(1) = 1 − 0 = 1.", exercise: "Calcule à l'aide d'une intégration par parties l'intégrale I = ∫₀¹ x eˣ dx.", answer: "On pose u(x) = x → u'(x) = 1, et v'(x) = eˣ → v(x) = eˣ. Par IPP : I = [x eˣ]₀¹ − ∫₀¹ 1 × eˣ dx = (1 × e¹ − 0) − [eˣ]₀¹ = e − (e¹ − e⁰) = e − e + 1 = 1.", hint: "Choisis u(x) = x pour que sa dérivée soit 1 et simplifie la deuxième intégrale." },
  { lessonId: "2bac-french-novel", concept: "L'analyse littéraire au Baccalauréat", explanation: "Analyser un texte littéraire exige de croiser le fond (idées, thèmes, message) et la forme (figures de style, syntaxe, lexique, focalisation, tonalités : lyrique, tragique, ironique, polémique).", example: "Une accumulation de termes péjoratifs renforce le ton satirique et la critique sociale de l'auteur.", exercise: "Quelle figure de style consiste à exprimer le moins pour faire entendre le plus (ex: « Va, je ne te hais point » dans Le Cid) ?", answer: "Il s'agit de la litote. Elle atténue l'expression pour donner en réalité une force accrue au sentiment exprimé.", hint: "Pense au procédé qui atténue la forme pour intensifier le sens caché." },
  { lessonId: "2bac-arabic-literature", concept: "تحليل النص الشعري الحديث والنثري (2BAC)", explanation: "في الامتحان الوطني للثانية باك آداب وعلوم، يدرس التلميذ مسار الشعر العربي الحديث : إحياء النموذج (البعث والإحياء)، سؤال الذات (الرومانسية)، تكسير البنية وتجديد الرؤيا (شعر التفعيلة)، إضافة إلى الأشكال النثرية الحديثة (القصة القصيرة، المسرحية، والمناهج النقدية).", example: "قصائد إحياء النموذج تحافظ على وحدة الوزن والقافية والروي والمعجم التراثي القديم.", exercise: "ما هي الخاصية الوزنية الأساسية التي ميزت حركة « تكسير البنية » عن الشعر التقليدي العمودي ؟", answer: "الخاصية هي استبدال نظام الشطرين المتناظرين والقافية الموحدة باعتماد « السطر الشعري » وتكرار التفعيلة بعدد متغير حسب الدفقة الشعورية، مع تنويع القوافي والأرواء.", hint: "تذكر الانتقال من البيت ذي الشطرين إلى السطر الشعري القائم على التفعيلة." },
  { lessonId: "2bac-physics-electricity", concept: "Dipôle RC, constante de temps et équation différentielle", explanation: "La loi d'additivité des tensions dans un circuit série RC en charge : uᵣ + u_c = E. Or uᵣ = R × i = R × C × (du_c / dt). L'équation différentielle s'écrit : u_c + R C (du_c / dt) = E.\nLa constante de temps est τ = R × C. À t = τ, u_c(τ) ≈ 0,63 E (63% de charge).", example: "Pour R = 10 kΩ (10⁴ Ω) et C = 100 μF (10⁻⁴ F), τ = 10⁴ × 10⁻⁴ = 1 seconde.", exercise: "Un circuit RC série est alimenté par un générateur de tension continue E = 12 V. On mesure R = 2 kΩ et C = 500 μF. Calcule la constante de temps τ et la tension aux bornes du condensateur à t = τ.", answer: "R = 2000 Ω, C = 500 × 10⁻⁶ F = 5 × 10⁻⁴ F. τ = R × C = 2000 × (5 × 10⁻⁴) = 1 s. À t = τ, u_c = 0,632 × E = 0,632 × 12 V ≈ 7,58 V.", hint: "Convertis d'abord la résistance en ohms et la capacité en farads avant de multiplier." },
  { lessonId: "2bac-math-bac-review", concept: "Étude complète de fonction : Limites, Asymptotes et Continuité", explanation: "Méthode systématique pour l'épreuve nationale de Mathématiques au Bac :\n1) Ensemble de définition Df\n2) Limites aux bornes et branches infinies (asymptotes horizontales, verticales, obliques, branches paraboliques)\n3) Dérivée f'(x) et tableau de variations complet\n4) Points d'inflexion (f''(x) = 0) et concavité\n5) Tracé soigné de la courbe (Cf) avec les tangentes remarquables.", example: "Si lim f(x)/x = +∞ quand x → +∞, la courbe admet une branche parabolique de direction l'axe des ordonnées.", exercise: "Soit f(x) = (x − 2) eˣ. Calcule la limite de f(x) en −∞ et interprète géométriquement le résultat.", answer: "f(x) = x eˣ − 2 eˣ. En −∞, d'après les limites usuelles de croissances comparées, lim x eˣ = 0 et lim eˣ = 0. Donc lim f(x) = 0. Géométriquement, la droite d'équation y = 0 (l'axe des abscisses) est une asymptote horizontale à la courbe (Cf) au voisinage de −∞.", hint: "Développe l'expression pour faire apparaître la limite de référence x eˣ en −∞." },
  { lessonId: "2bac-french-bac-review", concept: "Production écrite pour l'examen national et régional", explanation: "Pour réussir la rédaction au Baccalauréat :\n• Comprendre la consigne (thème, question, type de plan demandé)\n• Plan dialectique : Thèse (arguments pour), Antithèse (arguments contre), Synthèse personnelle\n• Plan analytique : Constat du problème, Causes, Conséquences, Solutions envisagées\n• Soigner les transitions et la correction de la langue (accords, ponctuation, variété lexicale).", example: "« Bien que la technologie offre un accès sans précédent au savoir, elle peut aussi favoriser l'isolement social... »", exercise: "Cite trois connecteurs logiques marquant respectivement l'illustration, l'opposition et la conséquence.", answer: "• Illustration : « par exemple », « ainsi », « c'est le cas de ».\n• Opposition : « en revanche », « néanmoins », « cependant ».\n• Conséquence : « par conséquent », « d'où », « il en résulte que ».", hint: "Pense aux mots charnières indispensables pour articuler tes paragraphes." },
  { lessonId: "2bac-arabic-bac-review", concept: "منهجية تحليل النص الفلسفي أو الأدبي في الامتحان الوطني", explanation: "في الامتحان الوطني، تتطلب الكتابة الإنشائية احترام الخطوات المنهجية المعتمدة رسمياً :\n• الفهم : تحديد الموضوع وصياغة الإشكال والمفارقة والتساؤلات الموجهة.\n• التحليل : تحديد الأطروحة، شرح المفاهيم الفلسفية أو اللغوية، وعرض الحجاج المعتمد.\n• المناقشة : إبراز قيمة الأطروحة وحدودها واستحضار مواقف فلاسفة أو نقاد آخرين.\n• التركيب : خلاصة تركيبية تجمع بين الأطروحات مع إبداء رأي مدعم بالحجة.", example: "في مجزوءة الوضع البشري (مفهوم الشخص) : المناقشة بين كانط (الشخص غاية في ذاته وله قيمة أخلاقية) ولاشوليي (الشخص هوية تتأسس على الذاكرة ووحدة الطبع).", exercise: "ما هي المراحل الأربع لسلم التنقيط المعتمد في تصحيح مادة الفلسفة بالامتحان الوطني ؟", answer: "المراحل الأربع هي : 1) الفهم (4 نقط)، 2) التحليل (5 نقط)، 3) المناقشة (5 نقط)، 4) التركيب (3 نقط)، إضافة إلى الجوانب الشكلية وتماسك العرض وسلامة اللغة (3 نقط)، المجموع = 20 نقطة.", hint: "تذكر التوزيع الرسمي للنقاط في الإطار المرجعي للامتحان الوطني." },
  { lessonId: "2bac-physics-bac-review", concept: "Ondes mécaniques progressives et décroissance radioactive", explanation: "Ondes : Célérité v = d / Δt = λ / T = λ × N. Deux points M et N séparés de d vibrent en phase si d = k × λ, et en opposition de phase si d = (2k + 1) × λ / 2.\nRadioactivité : Loi de décroissance N(t) = N₀ e^(−λt). La demi-vie t₁/₂ = ln(2) / λ. L'activité A(t) = λ × N(t) s'exprime en Becquerels (Bq).", example: "Si t₁/₂ = 5 ans, au bout de 10 ans (deux demi-vies), il reste N₀ / 4 du nombre initial de noyaux radioactifs.", exercise: "Le césium 137 a une demi-vie de t₁/₂ = 30 ans. Quelle fraction de noyaux radioactifs reste-t-il après 90 ans ?", answer: "90 ans correspond à 3 demi-vies (90 = 3 × 30). Après 1 demi-vie il reste 1/2 ; après 2 demi-vies il reste 1/4 ; après 3 demi-vies il reste (1/2)³ = 1/8 (soit 12,5%) des noyaux initiaux.", hint: "Calcule le nombre de demi-vies écoulées en divisant la durée totale par t₁/₂." },
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
  // 1AC Questions
  { id: "1ac-q1", gradeId: "1ac", subjectId: "math", type: "single", prompt: "Quel est le résultat du calcul : 15 − 3 × 4 ?", options: ["48", "3", "12", "0"], correctAnswer: "3", explanation: "La multiplication est prioritaire sur la soustraction : 3 × 4 = 12, puis 15 − 12 = 3.", points: 1 },
  { id: "1ac-q2", gradeId: "1ac", subjectId: "science", type: "true-false", prompt: "Les poissons respirent dans l'eau grâce à des branchies.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "Les branchies absorbent l'oxygène dissous dans l'eau et rejettent le dioxyde de carbone.", points: 1 },
  { id: "1ac-q3", gradeId: "1ac", subjectId: "french", type: "short", prompt: "Écris le pluriel de « un livre ».", correctAnswer: "des livres", explanation: "Le déterminant « un » devient « des » et le nom prend un « s » au pluriel.", points: 1 },
  { id: "1ac-q4", gradeId: "1ac", subjectId: "math", type: "single", prompt: "Quelle fraction est équivalente à 3/4 ?", options: ["6/8", "5/8", "4/3", "9/16"], correctAnswer: "6/8", explanation: "En multipliant le numérateur et le dénominateur par 2 : (3 × 2) / (4 × 2) = 6/8.", points: 1 },
  { id: "1ac-q5", gradeId: "1ac", subjectId: "arabic", type: "short", prompt: "ما جمع كلمة « قلم » ؟", correctAnswer: "أقلام", explanation: "جمع تكسير لكلمة قلم هو أقلام.", points: 1 },
  { id: "1ac-q6", gradeId: "1ac", subjectId: "science", type: "true-false", prompt: "L'eau pure bout à 100°C sous la pression atmosphérique normale.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "La température d'ébullition de l'eau pure au niveau de la mer est de 100°C.", points: 1 },
  { id: "1ac-q7", gradeId: "1ac", subjectId: "french", type: "single", prompt: "Dans la phrase « Le vent souffle fort », quel est l'adverbe ?", options: ["Le", "vent", "souffle", "fort"], correctAnswer: "fort", explanation: "« fort » modifie le verbe souffler en indiquant la manière, c'est un adverbe.", points: 1 },

  // 2AC Questions
  { id: "2ac-q1", gradeId: "2ac", subjectId: "math", type: "single", prompt: "Quel est le résultat du produit : (−4) × (−6) ?", options: ["−24", "24", "−10", "10"], correctAnswer: "24", explanation: "Le produit de deux nombres de même signe est toujours positif : (−) × (−) = (+), donc (−4) × (−6) = 24.", points: 1 },
  { id: "2ac-q2", gradeId: "2ac", subjectId: "math", type: "true-false", prompt: "Une situation de proportionnalité est représentée graphiquement par une droite passant par l'origine.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "L'alignement avec l'origine (0, 0) est la caractéristique graphique de la proportionnalité.", points: 1 },
  { id: "2ac-q3", gradeId: "2ac", subjectId: "arabic", type: "short", prompt: "اكتب ضد كلمة « كبير ».", correctAnswer: "صغير", explanation: "ضد كلمة كبير هو صغير.", points: 1 },
  { id: "2ac-q4", gradeId: "2ac", subjectId: "science", type: "single", prompt: "Quel est le symbole chimique de l'atome de carbone ?", options: ["Ca", "C", "Co", "Cl"], correctAnswer: "C", explanation: "Le symbole du carbone est C. Ca est le calcium, Co le cobalt et Cl le chlore.", points: 1 },
  { id: "2ac-q5", gradeId: "2ac", subjectId: "french", type: "single", prompt: "Dans « Il mange une pomme », quelle est la fonction de « une pomme » ?", options: ["Sujet", "COD", "COI", "Complément de lieu"], correctAnswer: "COD", explanation: "Il mange quoi ? Une pomme. C'est un complément d'objet direct relié directement au verbe.", points: 1 },
  { id: "2ac-q6", gradeId: "2ac", subjectId: "math", type: "short", prompt: "Résous l'équation : 2x + 5 = 15. Quelle est la valeur de x ?", correctAnswer: "5", explanation: "2x = 15 − 5 = 10 → x = 10 / 2 = 5.", points: 1 },
  { id: "2ac-q7", gradeId: "2ac", subjectId: "science", type: "true-false", prompt: "La masse totale se conserve au cours d'une réaction chimique.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "D'après la loi de Lavoisier : rien ne se perd, rien ne se crée, tout se transforme.", points: 1 },

  // 3AC Questions (Examen Régional)
  { id: "3ac-q1", gradeId: "3ac", subjectId: "math", type: "single", prompt: "Quelle est la forme développée de (2x − 3)² ?", options: ["4x² − 9", "4x² − 6x + 9", "4x² − 12x + 9", "2x² − 12x + 9"], correctAnswer: "4x² − 12x + 9", explanation: "(a − b)² = a² − 2ab + b² = (2x)² − 2(2x)(3) + 3² = 4x² − 12x + 9.", points: 1 },
  { id: "3ac-q2", gradeId: "3ac", subjectId: "math", type: "true-false", prompt: "Dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "C’est le côté le plus long du triangle rectangle et il fait face à l'angle droit.", points: 1 },
  { id: "3ac-q3", gradeId: "3ac", subjectId: "science", type: "short", prompt: "Quelle est l'unité internationale de la puissance électrique ?", correctAnswer: "watt", explanation: "L'unité internationale de la puissance électrique est le Watt (symbole W).", points: 1 },
  { id: "3ac-q4", gradeId: "3ac", subjectId: "math", type: "single", prompt: "Quelle est la valeur simplifiée de √50 ?", options: ["2√5", "5√2", "10√5", "25"], correctAnswer: "5√2", explanation: "√50 = √(25 × 2) = √25 × √2 = 5√2.", points: 1 },
  { id: "3ac-q5", gradeId: "3ac", subjectId: "french", type: "single", prompt: "Dans « La Boîte à Merveilles » d'Ahmed Sefrioui, quel âge a le narrateur Sidi Mohammed ?", options: ["6 ans", "10 ans", "14 ans", "18 ans"], correctAnswer: "6 ans", explanation: "Le roman s'ouvre sur le narrateur adulte se souvenant de sa solitude à l'âge de 6 ans.", points: 1 },
  { id: "3ac-q6", gradeId: "3ac", subjectId: "arabic", type: "short", prompt: "ما نوع المشتق في كلمة « مَكْتُوب » ؟", correctAnswer: "اسم مفعول", explanation: "مكتوب اسم مفعول صيغ من الفعل الثلاثي كَتَبَ على وزن مَفْعُول.", points: 1 },
  { id: "3ac-q7", gradeId: "3ac", subjectId: "science", type: "true-false", prompt: "La vitesse moyenne se calcule par la formule v = d / t.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "La vitesse moyenne est le quotient de la distance parcourue par le temps écoulé.", points: 1 },

  // TC Questions (Tronc Commun)
  { id: "tc-q1", gradeId: "tc", subjectId: "math", type: "single", prompt: "Quel est l’ensemble solution dans ℝ de l’équation x² = 9 ?", options: ["{3}", "{-3}", "{-3, 3}", "∅"], correctAnswer: "{-3, 3}", explanation: "x² = 9 admet deux solutions réelles distinctes : x = 3 ou x = −3.", points: 1 },
  { id: "tc-q2", gradeId: "tc", subjectId: "science", type: "true-false", prompt: "Toutes les cellules végétales possèdent une paroi cellulosique rigide.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "La paroi pectocellulosique est une caractéristique constante des cellules végétales.", points: 1 },
  { id: "tc-q3", gradeId: "tc", subjectId: "french", type: "short", prompt: "Comment appelle-t-on un texte qui défend une thèse avec des arguments ?", correctAnswer: "un texte argumentatif", explanation: "Le texte argumentatif vise à convaincre ou persuader le destinataire.", points: 1 },
  { id: "tc-q4", gradeId: "tc", subjectId: "math", type: "single", prompt: "Quelle relation vectorielle traduit : vecteur(AB) + vecteur(BC) = vecteur(AC) ?", options: ["Relation de Chasles", "Théorème de Thalès", "Théorème de Pythagore", "Loi des cosinus"], correctAnswer: "Relation de Chasles", explanation: "C'est la relation fondamentale de Chasles sur les vecteurs.", points: 1 },
  { id: "tc-q5", gradeId: "tc", subjectId: "arabic", type: "short", prompt: "ما إعراب كلمة « التلميذُ » في جملة : « كانَ التلميذُ مجتهداً » ؟", correctAnswer: "اسم كان", explanation: "اسم كان مرفوع وعلامة رفعه الضمة الظاهرة على آخره.", points: 1 },
  { id: "tc-q6", gradeId: "tc", subjectId: "science", type: "single", prompt: "Quelle est la valeur de l'intensité de la pesanteur moyenne sur Terre ?", options: ["1 N/kg", "9,8 N/kg", "100 N/kg", "0 N/kg"], correctAnswer: "9,8 N/kg", explanation: "L'intensité de la pesanteur au niveau du sol terrestre est g ≈ 9,8 N/kg (souvent arrondie à 10 N/kg).", points: 1 },
  { id: "tc-q7", gradeId: "tc", subjectId: "math", type: "true-false", prompt: "Le nombre 17 est un nombre premier.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "17 n'est divisible que par 1 et par lui-même, c'est donc un nombre premier.", points: 1 },

  // 1BAC Questions (Examen Régional)
  { id: "1bac-q1", gradeId: "1bac", subjectId: "math", type: "single", prompt: "Pour la fonction f(x) = 3x² − 2x + 1, quelle est sa dérivée f'(x) ?", options: ["3x − 2", "6x − 2", "6x", "3x²"], correctAnswer: "6x − 2", explanation: "La dérivée de 3x² est 6x, celle de −2x est −2 et la constante s'annule : f'(x) = 6x − 2.", points: 1 },
  { id: "1bac-q2", gradeId: "1bac", subjectId: "science", type: "true-false", prompt: "Le travail d'une force perpendiculaire au déplacement est nul.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "W(F) = F × AB × cos(90°) = 0 car cos(90°) = 0.", points: 1 },
  { id: "1bac-q3", gradeId: "1bac", subjectId: "french", type: "short", prompt: "Qui est l'auteur de la pièce de théâtre « Antigone » au programme de 1BAC ?", correctAnswer: "Jean Anouilh", explanation: "Jean Anouilh a écrit Antigone en 1942, représentée pour la première fois en 1944.", points: 1 },
  { id: "1bac-q4", gradeId: "1bac", subjectId: "math", type: "single", prompt: "Quelle est la dérivée de la fonction f(x) = 1/x pour tout x non nul ?", options: ["1/x²", "−1/x²", "ln(x)", "−1/x"], correctAnswer: "−1/x²", explanation: "La formule usuelle de dérivation donne : (1/x)' = −1/x².", points: 1 },
  { id: "1bac-q5", gradeId: "1bac", subjectId: "french", type: "single", prompt: "Dans « Le Dernier Jour d'un Condamné » de Victor Hugo, quelle est la cause défendue ?", options: ["L'abolition de la peine de mort", "La liberté du commerce", "L'égalité des classes", "La colonisation"], correctAnswer: "L'abolition de la peine de mort", explanation: "C'est un roman à thèse humaniste militant explicitement contre la peine de mort.", points: 1 },
  { id: "1bac-q6", gradeId: "1bac", subjectId: "arabic", type: "short", prompt: "ما اسم الفكرة الأساسية التي يدافع عنها الكاتب في النص الحجاجي ؟", correctAnswer: "الأطروحة", explanation: "الأطروحة (La thèse) هي الرأي أو الموقف المركزي الذي يتبناه الكاتب ويسعى لإثباته.", points: 1 },
  { id: "1bac-q7", gradeId: "1bac", subjectId: "science", type: "true-false", prompt: "L'énergie mécanique d'un système sans frottement se conserve au cours du mouvement.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "En l'absence de forces non conservatives (frottements), Em = Ec + Ep = constante.", points: 1 },

  // 2BAC Questions (Examen National)
  { id: "2bac-q1", gradeId: "2bac", subjectId: "math", type: "single", prompt: "Quelle est la dérivée de la fonction f(x) = ln(x) sur ]0 ; +∞[ ?", options: ["eˣ", "1/x", "x", "1/x²"], correctAnswer: "1/x", explanation: "La fonction logarithme népérien a pour dérivée la fonction inverse : (ln x)' = 1/x.", points: 1 },
  { id: "2bac-q2", gradeId: "2bac", subjectId: "science", type: "true-false", prompt: "Dans un circuit RC en charge, la tension atteint 63% de sa valeur finale à t = τ = RC.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "u_c(τ) = E(1 − e⁻¹) ≈ 0,632 E, soit environ 63% de la tension maximale.", points: 1 },
  { id: "2bac-q3", gradeId: "2bac", subjectId: "arabic", type: "short", prompt: "ما اسم أول مجزوءة في مقرر الفلسفة لجميع مسالك البكالوريا المغربية ؟", correctAnswer: "الوضع البشري", explanation: "المجزوءة الأولى في برنامج الفلسفة للثانية باك هي مجزوءة الوضع البشري.", points: 1 },
  { id: "2bac-q4", gradeId: "2bac", subjectId: "math", type: "single", prompt: "Quelle est la limite de (ln(x) / x) quand x tend vers +∞ ?", options: ["+∞", "1", "0", "−∞"], correctAnswer: "0", explanation: "D'après les limites usuelles de croissances comparées au Bac : lim (ln x / x) = 0 quand x → +∞.", points: 1 },
  { id: "2bac-q5", gradeId: "2bac", subjectId: "science", type: "single", prompt: "Quelle est la relation reliant la demi-vie t₁/₂ et la constante radioactive λ ?", options: ["t₁/₂ = λ / ln(2)", "t₁/₂ = ln(2) / λ", "t₁/₂ = λ × ln(2)", "t₁/₂ = 1 / λ"], correctAnswer: "t₁/₂ = ln(2) / λ", explanation: "N(t₁/₂) = N₀ / 2 = N₀ e^(−λ t₁/₂) → ln(1/2) = −λ t₁/₂ → t₁/₂ = ln(2) / λ.", points: 1 },
  { id: "2bac-q6", gradeId: "2bac", subjectId: "math", type: "short", prompt: "Combien vaut le module du nombre complexe z = 3 + 4i ?", correctAnswer: "5", explanation: "|z| = √(3² + 4²) = √(9 + 16) = √25 = 5.", points: 1 },
  { id: "2bac-q7", gradeId: "2bac", subjectId: "french", type: "true-false", prompt: "Dans un plan dialectique, la synthèse doit dépasser l'opposition entre thèse et antithèse.", options: ["Vrai", "Faux"], correctAnswer: "Vrai", explanation: "La synthèse n'est pas un simple compromis, elle propose un point de vue supérieur ou nouveau.", points: 1 },
];

export function examForGrade(gradeId: Grade["id"]): ExamQuestion[] {
  return examQuestions.filter((question) => question.gradeId === gradeId);
}
