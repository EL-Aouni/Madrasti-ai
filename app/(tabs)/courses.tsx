import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { curriculumForGrade, grades, subjects, type Grade } from "@/lib/learning-data";
import { getGrade, saveGrade } from "@/lib/workspace-data";
import { useColors } from "@/hooks/use-colors";

export default function CoursesScreen() {
  const colors = useColors();
  const [selectedGrade, setSelectedGrade] = useState<Grade["id"]>("3ac");
  useEffect(() => {
    getGrade().then((stored) => { if (stored) setSelectedGrade(stored); });
  }, []);
  const chooseGrade = (gradeId: Grade["id"]) => { setSelectedGrade(gradeId); saveGrade(gradeId); };
  const lessonCount = curriculumForGrade(selectedGrade).length;
  return (
    <ScreenContainer className="px-5" safeAreaClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.kicker, { color: colors.primary }]}>BIBLIOTHÈQUE</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Apprendre à ton rythme.</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>Retrouve tous les cours du programme marocain, expliqués simplement.</Text>
        <View style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.border }]}><MaterialIcons name="search" size={21} color={colors.muted} /><Text style={[styles.searchText, { color: colors.muted }]}>Chercher une leçon...</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gradeRow}>{grades.map((grade) => { const active = selectedGrade === grade.id; return <Pressable key={grade.id} onPress={() => chooseGrade(grade.id)} style={({ pressed }) => [styles.gradeChip, { backgroundColor: active ? colors.primary : colors.surface, borderColor: active ? colors.primary : colors.border }, pressed && styles.pressed]}><Text style={[styles.gradeText, { color: active ? "#FFFFFF" : colors.muted }]}>{grade.label}</Text></Pressable>; })}</ScrollView>
        <View style={styles.filterRow}><Text style={[styles.filterLabel, { color: colors.foreground }]}>Mes matières</Text><Text style={[styles.count, { color: colors.muted }]}>{lessonCount} leçons · {subjects.length} matières</Text></View>
        {subjects.map((subject) => <Pressable key={subject.id} onPress={() => router.push({ pathname: "/subject/[id]", params: { id: subject.id, gradeId: selectedGrade } })} style={({ pressed }) => [styles.subjectCard, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={[styles.subjectIcon, { backgroundColor: subject.tint }]}><MaterialIcons name={subject.icon as any} size={25} color={subject.iconColor} /></View><View style={styles.copy}><Text style={[styles.subjectTitle, { color: colors.foreground }]}>{subject.title}</Text><Text style={[styles.subjectArabic, { color: colors.muted }]}>{subject.arabic} · {subject.lessons}</Text><View style={[styles.track, { backgroundColor: "#E4EEE9" }]}><View style={[styles.fill, { backgroundColor: subject.iconColor, width: `${subject.progress}` as any }]} /></View></View><View style={styles.right}><Text style={[styles.progress, { color: subject.iconColor }]}>{subject.progress}</Text><MaterialIcons name="chevron-right" size={22} color={colors.muted} /></View></Pressable>)}
        <Pressable onPress={() => router.push("/books")} style={({ pressed }) => [styles.downloadCard, { backgroundColor: "#E3F3EE" }, pressed && styles.pressed]}><MaterialIcons name="download-for-offline" size={24} color="#0C6E59" /><View style={styles.downloadCopy}><Text style={styles.downloadTitle}>Réviser sans internet</Text><Text style={styles.downloadText}>Télécharge tes leçons favorites avant de sortir.</Text></View><MaterialIcons name="chevron-right" size={21} color="#0C6E59" /></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 20, paddingBottom: 30, gap: 15 },
  kicker: { fontSize: 11, fontWeight: "800", letterSpacing: 1.7 },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -0.7, lineHeight: 33, marginTop: -3 },
  subtitle: { fontSize: 13, lineHeight: 19, marginTop: -7, maxWidth: 340 },
  search: { height: 48, borderRadius: 14, borderWidth: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, gap: 9, marginTop: 2 },
  searchText: { fontSize: 13 },
  filterRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 7 },
  filterLabel: { fontSize: 17, fontWeight: "800" },
  count: { fontSize: 11 },
  gradeRow: { gap: 8, paddingVertical: 2 },
  gradeChip: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  gradeText: { fontSize: 11, fontWeight: "700" },
  subjectCard: { borderRadius: 18, borderWidth: 1, padding: 14, flexDirection: "row", alignItems: "center", gap: 12 },
  subjectIcon: { width: 47, height: 47, borderRadius: 15, justifyContent: "center", alignItems: "center" },
  copy: { flex: 1 },
  subjectTitle: { fontSize: 14, fontWeight: "800" },
  subjectArabic: { fontSize: 11, marginTop: 3 },
  track: { height: 5, borderRadius: 3, marginTop: 10, overflow: "hidden" },
  fill: { height: 5, borderRadius: 3 },
  right: { alignItems: "flex-end", gap: 8 },
  progress: { fontSize: 12, fontWeight: "800" },
  downloadCard: { borderRadius: 18, padding: 15, flexDirection: "row", alignItems: "center", gap: 11, marginTop: 4 },
  downloadCopy: { flex: 1 },
  downloadTitle: { color: "#0C6E59", fontSize: 13, fontWeight: "800" },
  downloadText: { color: "#4D7E70", fontSize: 11, lineHeight: 15, marginTop: 2 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
