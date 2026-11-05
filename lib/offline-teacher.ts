/**
 * Offline AI Teacher (Moualim / معلم)
 * Provides intelligent pedagogical responses tailored to the Moroccan educational curriculum
 * (Collège & Lycée: 1AC, 2AC, 3AC, Tronc Commun, 1BAC, 2BAC)
 * when the phone is offline or no backend server is reachable.
 */

export type TeacherMessage = {
  role: "teacher" | "student";
  text: string;
};

interface KnowledgeItem {
  keywords: string[];
  reply: string;
}

const MOROCCAN_KNOWLEDGE_BASE: KnowledgeItem[] = [
  // Greetings & Darija interactions
  {
    keywords: ["salam", "سلام", "marhaba", "مرحبا", "bonjour", "salut", "labas", "لباس"],
    reply:
      "وعليكم السلام ورحمة الله وبركاته! مرحباً بك في مدرستي AI 🇲🇦\n" +
      "أنا أستاذك الافتراضي (معلم)، هنا لمساعدتك في فهم دروسك، حل تمارينك والاستعداد للامتحانات.\n" +
      "Je suis là pour t'expliquer tes cours de maths, physique, français, arabe et SVT selon le programme marocain. De quoi as-tu besoin aujourd'hui ?",
  },
  {
    keywords: ["darija", "دارجة", "parlons en darija", "hdar darija", "هضر بالدارجة"],
    reply:
      "مرحبا بك! هانية، نقدر نشرح ليك بالدارجة المبسطة باش تفهم مزيان. الدارجة وسيلة واعرة باش نبسطو المفاهيم العلمية والأدبية.\n" +
      "قول ليا: شنو هو الدرس ولا التمرين اللي بغيتي نخدمو عليه مجموعين؟ (مثلا: المتطابقات الهامة، Les temps du récit، ولا الإعراب؟)",
  },

  // Math: Identités remarquables
  {
    keywords: ["identite", "identités", "remarquable", "متطابقات", "متطابقة", "هام"],
    reply:
      "📐 **المتطابقات الهامة (Les 3 identités remarquables) :**\n\n" +
      "1️⃣ **المتطابقة الأولى :**\n(a + b)² = a² + 2ab + b²\n*مثال :* (x + 3)² = x² + 2(x)(3) + 3² = x² + 6x + 9\n\n" +
      "2️⃣ **المتطابقة الثانية :**\n(a − b)² = a² − 2ab + b²\n*مثال :* (x − 4)² = x² − 8x + 16\n\n" +
      "3️⃣ **المتطابقة الثالثة :**\n(a − b)(a + b) = a² − b²\n*مثال :* (2x − 5)(2x + 5) = 4x² − 25\n\n" +
      "💡 *نصيحة معلم :* المتطابقات كتستعمل فالنشر (Développement) من اليسار لليمين، وفالتعميل (Factorisation) من اليمين لليسار!",
  },

  // Math: Thalès
  {
    keywords: ["thales", "thalès", "طاليس"],
    reply:
      "📐 **مبرهنة طاليس (Théorème de Thalès) :**\n\n" +
      "🔹 **المباشرة (Directe) :** كنستعملوها لحساب الأطوال (Calculer des longueurs).\n" +
      "إذا كان المستقيم (BC) يوازي المستقيم (MN) في المثلث ABC، فإن:\n" +
      "AM / AB = AN / AC = MN / BC\n\n" +
      "🔹 **العكسية (Réciproque) :** كنستعملوها للبرهان على التوازي (Démontrer le parallélisme).\n" +
      "إذا كانت النقط في نفس الترتيب وكان AM/AB = AN/AC، إذن (MN) يوازي (BC).\n\n" +
      "💡 *قاعدة ذهبية :* تأكد دائماً من كتابة التناسب بشكل صحيح انطلاقاً من الرأس المشترك للمثلثين!",
  },

  // Math: Pythagore
  {
    keywords: ["pythagore", "فيثاغورس", "triangle rectangle", "مثلث قائم"],
    reply:
      "📐 **مبرهنة فيثاغورس (Théorème de Pythagore) :**\n\n" +
      "شرط التطبيق: المثلث خاصو يكون قائم الزاوية (Triangle rectangle)!\n\n" +
      "🔹 **المبرهنة المباشرة :**\n" +
      "مربع طول الوتر (Hypoténuse) كيساوي مجموع مربعي طولي الضلعين المحاذيين للزاوية القائمة:\n" +
      "BC² = AB² + AC²  (إذا كان المثلث قائم الزاوية في A)\n" +
      "*مثال :* إذا كان AB = 3 و AC = 4، فإن BC² = 9 + 16 = 25 إذن BC = √25 = 5.\n\n" +
      "🔹 **المبرهنة العكسية :**\n" +
      "كنستعملوها باش نبينو أن المثلث قائم الزاوية.",
  },

  // Math: Fractions
  {
    keywords: ["fraction", "fractions", "كسور", "كسر", "نصف", "décimaux"],
    reply:
      "🔢 **الكسور والعمليات عليها (Les fractions) :**\n\n" +
      "1️⃣ **الجمع والطرح (Addition & Soustraction) :**\n" +
      "ضروري من توحيد المقامات (Même dénominateur)!\n" +
      "a/c + b/c = (a + b)/c\n" +
      "*مثال :* 1/2 + 1/3 = 3/6 + 2/6 = 5/6\n\n" +
      "2️⃣ **الضرب (Multiplication) :**\n" +
      "البسط في البسط والمقام في المقام (ساهلة بلا توحيد المقامات):\n" +
      "(a/b) × (c/d) = (a × c) / (b × d)\n\n" +
      "3️⃣ **القسمة (Division) :**\n" +
      "الكسر الأول مضروب في مقلوب الكسر الثاني:\n" +
      "(a/b) ÷ (c/d) = (a/b) × (d/c)",
  },

  // Math: Racines carrées
  {
    keywords: ["racine", "racines", "جذور", "جذر مربع"],
    reply:
      "🌿 **الجذور المربعة (Les racines carrées) :**\n\n" +
      "جذر عدد موجب a هو العدد الموجب الذي مربعه يساوي a (√a)² = a.\n\n" +
      "🔹 **قواعد الحساب :**\n" +
      "• √(a × b) = √a × √b (مثال: √12 = √(4×3) = 2√3)\n" +
      "• √(a / b) = √a / √b\n" +
      "⚠️ **انتباه شديد :** √(a + b) ≠ √a + √b ! (مثال: √(9+16) = √25 = 5، بينما √9 + √16 = 3 + 4 = 7).\n\n" +
      "🔹 **إزالة الجذر من المقام :**\n" +
      "نضرب البسط والمقام في المرافق (Le conjugué) : (a - √b)(a + √b) = a² - b.",
  },

  // Math: Équations
  {
    keywords: ["equation", "équations", "معادلات", "معادلة", "inconnue"],
    reply:
      "⚖️ **حل المعادلات من الدرجة الأولى (Équations du 1er degré) :**\n\n" +
      "الهدف هو عزل المجهول x في طرف والمعاليم في طرف آخر:\n" +
      "1. انقل الحدود التي تحتوي على x إلى طرف اليسار، والأعداد المعلومة إلى اليمين.\n" +
      "2. قاعدة الإشارة: أي حد كيبدل الطرف كيغير الإشارة ديالو (+ كتولي - والعكس)!\n" +
      "3. بسط الطرفين، ثم اقسم على معامل x.\n\n" +
      "*مثال تطبيقي :*\n" +
      "3x - 5 = 10\n" +
      "3x = 10 + 5 = 15\n" +
      "x = 15 / 3 = 5\n" +
      "إذن حل المعادلة هو: S = {5}.",
  },

  // Français: Les temps du récit
  {
    keywords: ["recit", "récit", "temps du récit", "imparfait", "passé simple", "temps verbal"],
    reply:
      "📖 **Les temps du récit (L'imparfait et le passé simple) :**\n\n" +
      "Dans un récit au passé, ces deux temps fonctionnent en tandem :\n\n" +
      "🔹 **L'imparfait (Le temps du décor) :**\n" +
      "• Description (paysage, météo, personnages) : *Le vent soufflait fort.*\n" +
      "• Action longue / continue non délimitée : *Il marchait dans la forêt.*\n" +
      "• Habitude ou répétition : *Tous les matins, il prenait le bus.*\n\n" +
      "🔹 **Le passé simple (Le temps de l'action) :**\n" +
      "• Action ponctuelle et brève : *Soudain, la porte claqua.*\n" +
      "• Action soudaine qui coupe l'imparfait : *Il dormait quand le téléphone sonna.*\n" +
      "• Actions successives rapides : *Il entra, alluma la lampe et s'assit.*",
  },

  // Français: 1BAC Romans
  {
    keywords: ["boite a merveilles", "boîte à merveilles", "sefrioui", "sidi mohammed", "antigone", "condamné", "dernier jour"],
    reply:
      "📚 **Romans au programme du Régional 1BAC :**\n\n" +
      "1️⃣ **La Boîte à Merveilles (Ahmed Sefrioui) :**\n" +
      "• Genre : Roman autobiographique marocain (Dar Chouafa, Fès).\n" +
      "• Narrateur : Sidi Mohammed (6 ans) / narrateur adulte.\n" +
      "• Thèmes : Solitude, la boîte et ses objets magiques, le quotidien traditionnel.\n\n" +
      "2️⃣ **Antigone (Jean Anouilh) :**\n" +
      "• Genre : Tragédie moderne (Thèbes).\n" +
      "• Conflit : La révolte d'Antigone (devoir fraternel envers Polynice) contre la loi d'État de Créon.\n\n" +
      "3️⃣ **Le Dernier Jour d'un Condamné (Victor Hugo) :**\n" +
      "• Genre : Roman à thèse (Bicêtre, Conciergerie, Grève).\n" +
      "• Thèse : Abolition de la peine de mort par la mise en lumière de la souffrance morale et physique.",
  },

  // Français: Figures de style
  {
    keywords: ["figure", "figures de style", "metaphore", "métaphore", "comparaison", "hyperbole"],
    reply:
      "🎭 **Les figures de style indispensables :**\n\n" +
      "• **La comparaison :** Rapproche deux éléments avec un outil de comparaison (*comme, tel que, pareil à*).\n*Ex :* Il est rusé comme un renard.\n\n" +
      "• **La métaphore :** Comparaison directe SANS outil de comparaison.\n*Ex :* Cette terre est un trésor.\n\n" +
      "• **L'hyperbole :** Exagération pour marquer les esprits.\n*Ex :* Je meurs de faim ! / Un océan de larmes.\n\n" +
      "• **L'antithèse :** Deux mots ou idées opposés dans la même phrase.\n*Ex :* Le jour succède à la nuit.\n\n" +
      "• **L'anaphore :** Répétition d'un même mot en début de phrases successives.",
  },

  // Arabic: الإعراب والتراكيب
  {
    keywords: ["إعراب", "اعراب", "فاعل", "مفعول", "نواسخ", "مبتدأ", "تراكيب"],
    reply:
      "🖋️ **قواعد الإعراب الأساسية في اللغة العربية :**\n\n" +
      "🔹 **أركان الجملة الفعلية :**\n" +
      "• **الفعل :** ما دل على حدث مقترن بزمن (ماض، مضارع، أمر).\n" +
      "• **الفاعل :** اسم مرفوع يدل على من قام بالفعل (يُسأل عنه بـ: مَن؟) -> *كَتَبَ التِّلْمِيذُ* (فاعل مرفوع بالضمة).\n" +
      "• **المفعول به :** اسم منصوب يقع عليه فعل الفاعل (يُسأل عنه بـ: ماذا؟) -> *قَرَأَ قِصَّةً* (مفعول به منصوب).\n\n" +
      "🔹 **النواسخ :**\n" +
      "• **النواسخ الفعلية (كان وأخواتها) :** ترفع المبتدأ ويسمى اسمها، وتنصب الخبر ويسمى خبرها.\n" +
      "• **النواسخ الحرفية (إنّ وأخواتها) :** تنصب المبتدأ ويسمى اسمها، وترفع الخبر ويسمى خبرها.",
  },

  // Physique: Mouvement & Énergie
  {
    keywords: ["mouvement", "vitesse", "energie", "énergie", "حركة", "سرعة", "طاقة", "فيزياء"],
    reply:
      "⚡ **الفيزياء: الحركة والسرعة والطاقة (Physique 3AC / Lycée) :**\n\n" +
      "🔹 **السرعة المتوسطة (Vitesse moyenne) :**\n" +
      "v = d / t  (حيث d المسافة بالمتر m أو km، و t المدة الزمنية بـ s أو h).\n" +
      "للتحويل من m/s إلى km/h : نضرب في 3.6.\n\n" +
      "🔹 **طبيعة الحركة (Nature du mouvement) :**\n" +
      "• حركة منتظمة (Uniforme) : السرعة ثابتة.\n" +
      "• حركة متسارعة (Accélérée) : السرعة تتزايد.\n" +
      "• حركة متباطئة (Ralentie) : السرعة تتناقص.\n\n" +
      "🔹 **مسافة التوقف (Distance d'arrêt) :**\n" +
      "Da = Dr + Df  (مسافة رد الفعل + مسافة الكبح).",
  },

  // Physique: Électricité
  {
    keywords: ["electricite", "électricité", "ohm", "tension", "intensite", "كهرباء", "أوم"],
    reply:
      "🔌 **قوانين الكهرباء الأساسية (Électricité) :**\n\n" +
      "1️⃣ **قانون أوم (Loi d'Ohm) :**\n" +
      "U = R × I\n" +
      "• U : التوتر بالفولط (V)\n" +
      "• R : المقاومة بالأوم (Ω)\n" +
      "• I : شدة التيار بالأمبير (A)\n\n" +
      "2️⃣ **القدرة الكهربائية (Puissance électrique) :**\n" +
      "P = U × I (بالواط Watt)\n\n" +
      "3️⃣ **الطاقة الكهربائية (Énergie électrique) :**\n" +
      "E = P × t (بالجول Joule إذا كانت t بالثواني، أو بـ Wh إذا كانت بالساعات).",
  },

  // SVT: Immunologie & Digestion
  {
    keywords: ["svt", "علوم الحياة", "مناعة", "respiration", "digestion", "immunologie"],
    reply:
      "🧬 **علوم الحياة والأرض (SVT) - أهم المفاهيم :**\n\n" +
      "🔹 **الجهاز المناعي (Le système immunitaire) :**\n" +
      "• **المناعة الطبيعية (غير النوعية) :** الحواجز الطبيعية (الجلد، المخاط)، والاستجابة الالتهابية بواسطة البلعمة (Phagocytose).\n" +
      "• **المناعة النوعية (Spécifique) :**\n" +
      "  - ذات مسلك خلطي (Voie humorale) : تتدخل فيها اللمفاويات B التي تفرز مضادات الأجسام (Anticorps).\n" +
      "  - ذات مسلك خلوي (Voie cellulaire) : تتدخل فيها اللمفاويات T القاتلة (T cytotoxiques) لتدمير الخلايا المعفنة.\n\n" +
      "🔹 **الهضم (La digestion) :**\n" +
      "تحويل الأغذية إلى مواد القيت (Nutriments) بفضل الإنزيمات النوعية، ثم امتصاصها على مستوى الخملات المعوية.",
  },

  // Exams: 3AC Regional Exam
  {
    keywords: ["3ac", "brevet", "regional", "régional 3ac", "موحد", "امتحان جهوي ثالثة"],
    reply:
      "🎯 **نصائح للنجاح في الامتحان الموحد الجهوي (3AC) :**\n\n" +
      "1. **المواد الأساسية :** الرياضيات، الفرنسية، اللغة العربية، الفيزياء، والتربية الإسلامية.\n" +
      "2. **الرياضيات :** ركز على المتطابقات، الجذور، مبرهنتي فيثاغورس وطاليس، والمعادلات.\n" +
      "3. **الفرنسية :** تدرب على نصوص الفهم والإنشاء (Production écrite) مع مراجعة Les temps du récit.\n" +
      "4. **العربية :** اضبط درس الإعراب والممنوع من الصرف والأساليب.\n" +
      "5. **سر التفوق :** حل امتحانات جهوية للسنوات السابقة (2021 إلى 2025) لكل جهة من جهات المملكة!",
  },

  // Exams: 2BAC National Exam
  {
    keywords: ["bac", "2bac", "national", "باك", "بكالوريا", "امتحان وطني"],
    reply:
      "🎓 **نصائح استراتيجية للامتحان الوطني للبكالوريا (2BAC) :**\n\n" +
      "1. **تنظيم الوقت :** خصص 50 دقيقة لكل حصة مراجعة متبوعة بـ 10 دقائق استراحة (تقنية بومودورو).\n" +
      "2. **الرياضيات :** الدوال والنهايات والاشتقاق كيشكلو نصف النقطة! ضبط دراسة الدوال والتكامل والمتتاليات.\n" +
      "3. **الفيزياء :** الموجات، التحولات النووية، والكهرباء (RC/RL/RLC) هي النقط المضمونة.\n" +
      "4. **الفلسفة :** ضبط المفاهيم، الإشكال، وأطروحات الفلاسفة مع إتقان منهجية القولة، النص والسؤال.\n" +
      "5. **الثقة والنوم الكافي :** التركيز فالامتحان كيبدا من راحة الدماغ ليلة الامتحان!",
  },
];

/**
 * Returns an educational response tailored to the student's question and grade level.
 */
export function getOfflineTeacherReply(
  message: string,
  _history?: TeacherMessage[],
  gradeLabel?: string,
): string {
  const normalized = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

  // Match against knowledge base
  for (const item of MOROCCAN_KNOWLEDGE_BASE) {
    const isMatch = item.keywords.some((kw) => {
      const normalizedKw = kw
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");
      return normalized.includes(normalizedKw);
    });

    if (isMatch) {
      return item.reply;
    }
  }

  // Fallback intelligent pedagogical response
  const gradeContext = gradeLabel ? `pour le niveau ${gradeLabel}` : "selon le programme marocain";
  return (
    `مرحباً بك! قرأت سؤالك باهتمام (${gradeContext}).\n\n` +
    `💡 **منهجية معلم لحل هذا السؤال :**\n` +
    `1️⃣ **فهم المعطيات (Données) :** حدد الكلمات المفاتيح والمعطيات العددية أو المفاهيمية في سؤالك.\n` +
    `2️⃣ **اختيار القاعدة المناسبة (Formule / Règle) :** ما هي الخاصية أو المفهوم المدروس في الفصل الذي ينطبق هنا ؟\n` +
    `3️⃣ **التطبيق المنظم (Application) :** اكتب الخطوات بتسلسل منطقي لتفادي الأخطاء الحسابية أو اللغوية.\n\n` +
    `يمكنك أن تسألني عن أي درس محدد (مثل: *المتطابقات الهامة*، *مبرهنة طاليس*، *Les temps du récit*، *إعراب الفاعل*، أو *نصائح الامتحان الجهوي/الوطني*) وسأشرحه لك خطوة بخطوة!`
  );
}
