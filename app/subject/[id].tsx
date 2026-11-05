import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { curriculumForGrade, subjects, type Grade } from "@/lib/learning-data";
import { getGrade } from "@/lib/workspace-data";
import { useColors } from "@/hooks/use-colors";
import { useEffect, useState } from "react";

export default function SubjectScreen() {
  const colors = useColors();
  const { id, gradeId: gradeIdParam } = useLocalSearchParams<{ id: string; gradeId?: Grade["id"] }>();
  const [storedGrade, setStoredGrade] = useState<Grade["id"] | null>(null);
  useEffect(() => {
    if (!gradeIdParam) getGrade().then(setStoredGrade);
  }, [gradeIdParam]);
  const gradeId: Grade["id"] = gradeIdParam ?? storedGrade ?? "3ac";
  const subject = subjects.find((item) => item.id === id) ?? subjects[0];
  const curriculum = curriculumForGrade(gradeId);
  const lessons = curriculum.filter((lesson) => lesson.subjectId === subject.id);
  return <ScreenContainer className="px-5" safeAreaClassName="bg-background"><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><MaterialIcons name="arrow-back" size={21} color={colors.foreground} /><Text style={[styles.backText, { color: colors.foreground }]}>Toutes les matières</Text></Pressable><View style={[styles.hero, { backgroundColor: subject.tint }]}><View style={[styles.heroIcon, { backgroundColor: `${subject.iconColor}18` }]}><MaterialIcons name={subject.icon as any} size={37} color={subject.iconColor} /></View><Text style={[styles.heroTitle, { color: colors.foreground }]}>{subject.title}</Text><Text style={[styles.heroSubtitle, { color: colors.muted }]}>{subject.arabic} · {gradeId.toUpperCase()}</Text><View style={styles.heroFooter}><Text style={[styles.heroProgress, { color: subject.iconColor }]}>{subject.progress} terminé</Text><View style={styles.heroTrack}><View style={[styles.heroFill, { width: subject.progress as any, backgroundColor: subject.iconColor }]} /></View></View></View><View style={styles.sectionHead}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Le parcours</Text><Text style={[styles.sectionCount, { color: colors.muted }]}>{lessons.length} leçons</Text></View>{lessons.map((lesson, index) => { const complete = index === 0; const active = index === 1; return <Pressable key={lesson.id} onPress={() => router.push({ pathname: "/content/[id]", params: { id: lesson.id } })} style={({ pressed }) => [styles.lesson, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={[styles.number, { backgroundColor: complete ? subject.iconColor : active ? `${subject.iconColor}22` : colors.background, borderColor: active ? subject.iconColor : "transparent" }]}>{complete ? <MaterialIcons name="check" size={17} color="#FFFFFF" /> : <Text style={[styles.numberText, { color: active ? subject.iconColor : colors.muted }]}>{index + 1}</Text>}</View><View style={styles.lessonCopy}><Text style={[styles.lessonTitle, { color: colors.foreground }]}>{lesson.title}</Text><Text style={[styles.lessonMeta, { color: colors.muted }]}>{complete ? "Terminé · 12 min" : active ? "En cours · 15 min" : "À découvrir"}</Text></View><MaterialIcons name={complete ? "replay" : "chevron-right"} size={20} color={colors.muted} /></Pressable>; })}<Pressable onPress={() => router.push("/teacher")} style={({ pressed }) => [styles.teacherCard, pressed && styles.pressed]}><MaterialIcons name="auto-awesome" size={22} color="#FFFFFF" /><View style={styles.teacherCopy}><Text style={styles.teacherTitle}>Tu veux apprendre autrement ?</Text><Text style={styles.teacherBody}>Moualim peut t’expliquer cette matière à l’oral.</Text></View><MaterialIcons name="chevron-right" size={21} color="#FFFFFF" /></Pressable></ScrollView></ScreenContainer>;
}

const styles = StyleSheet.create({
  content: { paddingTop: 15, paddingBottom: 30, gap: 14 },
  back: { flexDirection: "row", alignItems: "center", gap: 7, paddingVertical: 5, alignSelf: "flex-start" },
  backText: { fontSize: 13, fontWeight: "700" },
  hero: { borderRadius: 24, padding: 18, minHeight: 170 },
  heroIcon: { width: 55, height: 55, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  heroTitle: { fontSize: 23, fontWeight: "800", marginTop: 12 },
  heroSubtitle: { fontSize: 12, marginTop: 3 },
  heroFooter: { marginTop: 18, flexDirection: "row", alignItems: "center", gap: 9 },
  heroProgress: { fontSize: 11, fontWeight: "800" },
  heroTrack: { height: 6, borderRadius: 4, backgroundColor: "#FFFFFF88", flex: 1, overflow: "hidden" },
  heroFill: { height: 6, borderRadius: 4 },
  sectionHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 },
  sectionTitle: { fontSize: 18, fontWeight: "800" },
  sectionCount: { fontSize: 11 },
  lesson: { borderRadius: 17, borderWidth: 1, minHeight: 68, padding: 12, flexDirection: "row", alignItems: "center", gap: 11 },
  number: { width: 35, height: 35, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  numberText: { fontSize: 12, fontWeight: "800" },
  lessonCopy: { flex: 1 },
  lessonTitle: { fontSize: 13, fontWeight: "800" },
  lessonMeta: { fontSize: 11, marginTop: 4 },
  teacherCard: { borderRadius: 18, backgroundColor: "#D86B49", padding: 14, flexDirection: "row", alignItems: "center", gap: 10, marginTop: 3 },
  teacherCopy: { flex: 1 },
  teacherTitle: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  teacherBody: { color: "#FFE8DD", fontSize: 11, marginTop: 3 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
