# 🇲🇦 Madrasti AI (مدرستي للذكاء الاصطناعي)

<p align="center">
  <img src="assets/images/icon.png" width="110" height="110" alt="Madrasti AI Logo" style="border-radius: 24px;" />
</p>

<p align="center">
  <b>تطبيق تعليمي مغربي مجاني 100% يعمل بدون إنترنت مع أستاذ ذكي (معلم) لجميع المستويات من الأولى إعدادي إلى الثانية بكالوريا</b><br>
  <i>Plateforme éducative marocaine 100% gratuite et autonome avec tuteur IA (« Moualim ») du Collège au Baccalauréat.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Android%20APK-brightgreen.svg" alt="Android APK" />
  <img src="https://img.shields.io/badge/Price-100%25%20Free%20%7C%20مجاني-blue.svg" alt="Free" />
  <img src="https://img.shields.io/badge/Offline-100%25%20Supported-success.svg" alt="Offline" />
  <img src="https://img.shields.io/badge/Curriculum-Maroc%20🇲🇦-red.svg" alt="Morocco" />
  <img src="https://img.shields.io/badge/Expo-SDK%2054-black.svg" alt="Expo" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" />
</p>

---

## 📱 تحميل التطبيق للهاتف (Télécharger l'APK sur Android)

يمكن لأي تلميذ أو أستاذ في المغرب تحميل وتثبيت تطبيق **Madrasti AI** مباشرة على هاتفه الأندرويد مجاناً وبكل سهولة:

1. توجه إلى صفحة **[Releases / الإصدارات](https://github.com/EL-Aouni/Madrasti-ai/releases)**.
2. حمّل ملف **`madrasti-ai.apk`**.
3. افتح الملف على هاتفك واضغط على **تثبيت (Installer)**.
   *(إذا ظهر لك تنبيه أمان، اسمح بالتثبيت من هذا المصدر - Autoriser depuis cette source).*
4. افتح التطبيق واختر **"متابعة كزائر في الوضع المستقل (بدون إنترنت)"** وابدأ المراجعة فوراً!

---

## ✨ المميزات الرئيسية (Fonctionnalités Clés)

### 1. 📴 يعمل بدون إنترنت 100% (Mode Hors-Ligne Total)
- لا يتطلب وجود إنترنت أو خادم سحابي للبدء.
- وصول فوري لجميع الدروس، الملخصات، التمارين، والكتب المدرسية.
- حفظ التقدم الدراسي والنقاط محلياً على هاتفك.

### 2. 🤖 الأستاذ الذكي « معلم » (Tuteur IA Moualim)
- يجيب بالدارجة المغربية المبسطة، العربية الفصحى، والفرنسية.
- يشرح القواعد، المتطابقات الهامة، مبرهنات الهندسة، والإعراب خطوة بخطوة.
- يعمل **أونلاين** باستعمال الذكاء الاصطناعي (Groq / OpenAI)، ويعمل **أوفلاين** بفضل قاعدة معارف بيداغوجية مغربية مدمجة في التطبيق.

### 3. 📚 تغطية شاملة للمقرر المغربي (Collège & Lycée)
- **السلك الإعدادي :**
  - **1AC :** الأولى إعدادي (Nombres, géométrie, compréhension...)
  - **2AC :** الثانية إعدادي (Nombres relatifs, proportionnalité...)
  - **3AC :** الثالثة إعدادي (تحضير شامل للامتحان الجهوي الموحد: Thalès, Pythagore, Identités, Les temps du récit, الإعراب...)
- **السلك الثانوي التأهيلي :**
  - **Tronc Commun :** الجذع المشترك العلمي والأدبي.
  - **1BAC :** الأولى بكالوريا (تحضير الامتحان الجهوي، دراسة مؤلفات: *La Boîte à Merveilles*, *Antigone*, *Le Dernier Jour d'un Condamné*).
  - **2BAC :** الثانية بكالوريا (تحضير الامتحان الوطني الموحد في الرياضيات، الفيزياء، علوم الحياة والأرض، والفلسفة).

### 4. 🗣️ مختبر النطق والتحدث (Speaking Lab)
- تدريب صوتي تفاعلي للغات: الفرنسية، الإنجليزية، والإسبانية.
- الاستماع لنطق نموذجي صحيح.
- تقييم فوري لدقة النطق (Score de prononciation) يعمل حتى بدون اتصال بالإنترنت.

### 5. 📝 امتحانات تفاعلية واختبارات مع التصحيح (Quiz & Examens)
- أسئلة متعددة الخيارات (QCM)، صح أو خطأ، وأسئلة ذات إجابات قصيرة.
- تصحيح فوري مع تعليل وشرح مفصل لكل جواب.

### 6. 🏫 فضاء الأستاذ والقسم (Classroom & Espace Professeur)
- إمكانية إنشاء أقسام افتراضية ومشاركة كود الانضمام مع التلاميذ.
- نشر الفروض والتمارين وتصحيحها ومتابعة تقدم التلاميذ عند ربط التطبيق بخادم سحابي.

---

## 🛠️ تشغيل المشروع وتطويره (Guide Développeur)

### المتطلبات (Prérequis)
- **Node.js** v20 أو أحدث
- **pnpm** (`npm install -g pnpm`)
- اختياري للخادم: قاعدة بيانات MySQL / MariaDB (مثل Aiven المجانية أو Railway)

### خطوات التثبيت والتشغيل المحلي
```bash
# 1. استنساخ المشروع
git clone https://github.com/EL-Aouni/madrasti-ai.git
cd madrasti-ai

# 2. تثبيت الحزم
pnpm install

# 3. فحص الأكواد والاختبارات
pnpm check
pnpm test

# 4. تشغيل تطبيق الهاتف (Expo)
npx expo start
```

### بناء ملف APK محلياً (Créer le fichier APK)
```bash
# بناء APK تجريبي عبر EAS
pnpm build:apk

# أو التوليد المباشر عبر Gradle
npx expo prebuild --platform android --clean
cd android && ./gradlew assembleDebug
```

---

## 🚀 البناء التلقائي عبر GitHub Actions

يحتوي هذا المستودع على إعداد جاهز لـ **GitHub Actions** (`.github/workflows/build-apk.yml`) يقوم بـ:
1. فحص الكود واختباراته تلقائياً.
2. بناء ملف `madrasti-ai.apk` بالكامل في السحابة مجاناً عند أي تحديث أو إصدار جديد (Release).
3. إرفاق ملف الـ APK المحمّل مباشرة في صفحة الإصدارات.

---

## 📜 الترخيص والمساهمة (Licence & Contribution)

هذا المشروع مفتوح المصدر ومجاني لجميع أبناء وبنات المغرب تحت رخصة **MIT**. نرحب بجميع المساهمات والمقترحات لتطوير التعليم ومساعدة التلاميذ المغاربة في جميع ربوع المملكة.

❤️ **صُنع بكل فخر لأجل التلميذ المغربي**
