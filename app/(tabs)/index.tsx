import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useTranslation } from "react-i18next";

import { ScreenContainer } from "@/components/screen-container";
import { grades, recommendedLessons, subjects, type Grade } from "@/lib/learning-data";
import { getGrade, saveGrade } from "@/lib/workspace-data";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/hooks/use-auth";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

export default function HomeScreen() {
  const colors = useColors();
  const { t } = useTranslation();
  const { user } = useAuth();
  const firstName = (user?.name ?? "").trim().split(/\s+/)[0];
  const [selectedGrade, setSelectedGrade] = useState<Grade["id"]>("3ac");
  useEffect(() => {
    getGrade().then((stored) => { if (stored) setSelectedGrade(stored); });
  }, []);
  const chooseGrade = (gradeId: Grade["id"]) => { setSelectedGrade(gradeId); saveGrade(gradeId); };
  const currentGrade = useMemo(() => grades.find((grade) => grade.id === selectedGrade)?.label, [selectedGrade]);

  return (
    <ScreenContainer className="px-5" safeAreaClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.eyebrow, { color: colors.primary }]}>{t("home.eyebrow")}</Text>
            <Text style={[styles.greeting, { color: colors.foreground }]}>{t("home.greeting", { name: firstName ? `, ${firstName}` : "" })}</Text>
            <Text style={[styles.subGreeting, { color: colors.muted }]}>{t("home.subGreeting")}</Text>
          </View>
          <Pressable
            accessibilityLabel="Notifications"
            onPress={() => router.push("/notifications")}
            style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}
          >
            <MaterialIcons name="notifications-none" size={24} color={colors.foreground} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroKicker}>TON OBJECTIF DU JOUR</Text>
            <Text style={styles.heroTitle}>15 minutes pour avancer.</Text>
            <Text style={styles.heroBody}>Continue ta série et révise une notion importante.</Text>
            <Pressable
              onPress={() => router.push("/lesson/fractions")}
              style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}
            >
              <Text style={styles.heroButtonText}>Reprendre la leçon</Text>
              <MaterialIcons name="arrow-forward" size={17} color={colors.primary} />
            </Pressable>
          </View>
          <View style={styles.heroSun}><MaterialIcons name="wb-sunny" size={82} color="#F4C76C" /></View>
          <View style={styles.heroSparkOne} />
          <View style={styles.heroSparkTwo} />
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Ton parcours</Text>
            <Text style={[styles.sectionCaption, { color: colors.muted }]}>{currentGrade} · cette semaine</Text>
          </View>
          <Pressable onPress={() => router.push("/progress")} style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}>
            <Text style={[styles.linkText, { color: colors.primary }]}>Voir tout</Text>
            <MaterialIcons name="chevron-right" size={18} color={colors.primary} />
          </Pressable>
        </View>
        <View style={[styles.progressCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.progressRing}><Text style={[styles.progressValue, { color: colors.primary }]}>68%</Text><Text style={[styles.progressLabel, { color: colors.muted }]}>complété</Text></View>
          <View style={styles.progressDetails}>
            <Text style={[styles.progressTitle, { color: colors.foreground }]}>Tu es sur la bonne voie</Text>
            <Text style={[styles.progressBody, { color: colors.muted }]}>Encore 2 sessions pour atteindre ton objectif hebdomadaire.</Text>
            <View style={[styles.progressTrack, { backgroundColor: "#E4EEE9" }]}><View style={[styles.progressFill, { backgroundColor: colors.primary, width: "68%" as any }]} /></View>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Mes matières</Text><Text style={[styles.sectionCaption, { color: colors.muted }]}>Choisis ton niveau scolaire</Text></View>
        </View>
        <FlatList
          data={grades}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.gradeList}
          renderItem={({ item }) => {
            const active = selectedGrade === item.id;
            return <Pressable onPress={() => chooseGrade(item.id)} style={({ pressed }) => [styles.gradeChip, { backgroundColor: active ? colors.primary : colors.surface, borderColor: active ? colors.primary : colors.border }, pressed && styles.pressed]}><Text style={[styles.gradeText, { color: active ? "#FFFFFF" : colors.muted }]}>{item.label}</Text></Pressable>;
          }}
        />
        <View style={styles.subjectGrid}>
          {subjects.map((subject) => <Pressable key={subject.id} onPress={() => router.push({ pathname: "/subject/[id]", params: { id: subject.id, gradeId: selectedGrade } })} style={({ pressed }) => [styles.subjectCard, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
            <View style={[styles.subjectIcon, { backgroundColor: subject.tint }]}><MaterialIcons name={subject.icon as IconName} size={24} color={subject.iconColor} /></View>
            <Text style={[styles.subjectTitle, { color: colors.foreground }]}>{subject.title}</Text>
            <Text style={[styles.subjectArabic, { color: colors.muted }]}>{subject.arabic}</Text>
            <View style={styles.subjectFooter}><Text style={[styles.subjectLessons, { color: colors.muted }]}>{subject.lessons}</Text><Text style={[styles.subjectProgress, { color: subject.iconColor }]}>{subject.progress}</Text></View>
          </Pressable>)}
        </View>

        <View style={styles.sectionHeading}><View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>À continuer</Text><Text style={[styles.sectionCaption, { color: colors.muted }]}>Des leçons choisies pour toi</Text></View><Pressable onPress={() => router.push("/courses")} style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}><Text style={[styles.linkText, { color: colors.primary }]}>Explorer</Text><MaterialIcons name="chevron-right" size={18} color={colors.primary} /></Pressable></View>
        <View style={styles.lessonList}>{recommendedLessons.map((lesson) => <Pressable key={lesson.id} onPress={() => router.push(`/lesson/${lesson.id}`)} style={({ pressed }) => [styles.lessonRow, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={[styles.lessonIcon, { backgroundColor: `${lesson.color}16` }]}><MaterialIcons name={lesson.icon as IconName} size={22} color={lesson.color} /></View><View style={styles.lessonCopy}><Text style={[styles.lessonSubject, { color: lesson.color }]}>{lesson.subject}</Text><Text style={[styles.lessonTitle, { color: colors.foreground }]} numberOfLines={1}>{lesson.title}</Text><View style={styles.lessonMeta}><MaterialIcons name="schedule" size={14} color={colors.muted} /><Text style={[styles.lessonDuration, { color: colors.muted }]}>{lesson.duration}</Text><View style={[styles.miniTrack, { backgroundColor: "#E4EEE9" }]}><View style={[styles.miniFill, { backgroundColor: lesson.color, width: lesson.progress as any }]} /></View></View></View><MaterialIcons name="chevron-right" size={21} color={colors.muted} /></Pressable>)}</View>

        <Pressable onPress={() => router.push("/teacher")} style={({ pressed }) => [styles.teacherBanner, pressed && styles.pressed]}><View style={styles.teacherAvatar}><MaterialIcons name="auto-awesome" size={25} color="#FFFFFF" /></View><View style={styles.teacherCopy}><Text style={styles.teacherKicker}>TON PROFESSEUR IA</Text><Text style={styles.teacherTitle}>Bloqué sur un exercice ?</Text><Text style={styles.teacherBody}>Demande une explication, en français ou en Darija.</Text></View><MaterialIcons name="arrow-forward" size={22} color="#FFFFFF" /></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 18, paddingBottom: 30, gap: 20 },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 1.8, marginBottom: 6 },
  greeting: { fontSize: 27, lineHeight: 32, fontWeight: "800", letterSpacing: -0.5 },
  subGreeting: { fontSize: 13, lineHeight: 19, marginTop: 5, maxWidth: 270 },
  iconButton: { height: 44, width: 44, borderRadius: 15, borderWidth: 1, alignItems: "center", justifyContent: "center", position: "relative" },
  notificationDot: { position: "absolute", top: 10, right: 10, height: 7, width: 7, borderRadius: 4, backgroundColor: "#D86B49", borderWidth: 1, borderColor: "#FFFFFF" },
  hero: { minHeight: 188, borderRadius: 26, padding: 22, overflow: "hidden", position: "relative" },
  heroCopy: { maxWidth: "72%", zIndex: 2 },
  heroKicker: { color: "#C5F3E4", fontSize: 10, fontWeight: "800", letterSpacing: 1.4, marginBottom: 9 },
  heroTitle: { color: "#FFFFFF", fontSize: 26, lineHeight: 30, fontWeight: "800", letterSpacing: -0.5 },
  heroBody: { color: "#D6F3EB", fontSize: 13, lineHeight: 18, marginTop: 8 },
  heroButton: { backgroundColor: "#F7C96B", alignSelf: "flex-start", borderRadius: 11, paddingHorizontal: 13, paddingVertical: 10, marginTop: 18, flexDirection: "row", alignItems: "center", gap: 6 },
  heroButtonText: { color: "#17322B", fontWeight: "800", fontSize: 12 },
  heroSun: { position: "absolute", right: 17, top: 26, opacity: 0.9 },
  heroSparkOne: { position: "absolute", height: 80, width: 80, borderRadius: 40, right: -33, bottom: -35, backgroundColor: "#1B836A", opacity: 0.7 },
  heroSparkTwo: { position: "absolute", height: 13, width: 13, borderRadius: 7, right: 88, bottom: 27, backgroundColor: "#A2E4D0" },
  sectionHeading: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: 2 },
  sectionTitle: { fontSize: 19, fontWeight: "800", letterSpacing: -0.25 },
  sectionCaption: { fontSize: 12, marginTop: 3 },
  linkButton: { flexDirection: "row", alignItems: "center", gap: 1, paddingVertical: 4, paddingLeft: 8 },
  linkText: { fontSize: 12, fontWeight: "800" },
  progressCard: { borderRadius: 20, borderWidth: 1, padding: 16, flexDirection: "row", alignItems: "center", gap: 16 },
  progressRing: { width: 76, height: 76, borderRadius: 38, borderWidth: 7, borderColor: "#BFEBDD", alignItems: "center", justifyContent: "center" },
  progressValue: { fontSize: 18, fontWeight: "800" },
  progressLabel: { fontSize: 9, marginTop: -1 },
  progressDetails: { flex: 1 },
  progressTitle: { fontSize: 14, fontWeight: "800" },
  progressBody: { fontSize: 11, lineHeight: 16, marginTop: 4 },
  progressTrack: { height: 6, borderRadius: 4, marginTop: 10, overflow: "hidden" },
  progressFill: { height: 6, borderRadius: 4 },
  gradeList: { gap: 8, paddingTop: 1 },
  gradeChip: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  gradeText: { fontSize: 12, fontWeight: "700" },
  subjectGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  subjectCard: { width: "48.4%", borderRadius: 18, borderWidth: 1, padding: 13, minHeight: 136 },
  subjectIcon: { width: 43, height: 43, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 11 },
  subjectTitle: { fontSize: 14, fontWeight: "800" },
  subjectArabic: { fontSize: 11, marginTop: 3 },
  subjectFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
  subjectLessons: { fontSize: 10 },
  subjectProgress: { fontSize: 11, fontWeight: "800" },
  lessonList: { gap: 9 },
  lessonRow: { borderRadius: 17, borderWidth: 1, padding: 12, flexDirection: "row", alignItems: "center", gap: 11 },
  lessonIcon: { width: 42, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  lessonCopy: { flex: 1, minWidth: 0 },
  lessonSubject: { fontSize: 10, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.5 },
  lessonTitle: { fontSize: 13, fontWeight: "800", marginTop: 3 },
  lessonMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 },
  lessonDuration: { fontSize: 10 },
  miniTrack: { height: 4, borderRadius: 3, flex: 1, maxWidth: 70, marginLeft: 5, overflow: "hidden" },
  miniFill: { height: 4, borderRadius: 3 },
  teacherBanner: { borderRadius: 19, padding: 15, backgroundColor: "#D86B49", flexDirection: "row", alignItems: "center", gap: 12 },
  teacherAvatar: { height: 44, width: 44, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#B95437" },
  teacherCopy: { flex: 1 },
  teacherKicker: { color: "#FFE8DD", fontSize: 9, fontWeight: "800", letterSpacing: 1.2 },
  teacherTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", marginTop: 3 },
  teacherBody: { color: "#FFE8DD", fontSize: 11, lineHeight: 15, marginTop: 2 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
