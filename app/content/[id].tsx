import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { completeLessonModules, curriculum3ac, gradeCurriculum, studyModules } from "@/lib/learning-data";
import { useColors } from "@/hooks/use-colors";

export default function ContentScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showSolution, setShowSolution] = useState(false);

  const lesson = curriculum3ac.find((item) => item.id === id) ?? Object.values(gradeCurriculum).flat().find((item) => item.id === id);
  const specificModule = studyModules.find((item) => item.lessonId === id);
  const completeModule = completeLessonModules.find((item) => item.lessonId === id);

  const lessonModule = specificModule ?? {
    lessonId: id ?? "",
    concept: lesson?.title ?? "Leçon de ton programme",
    explanation: completeModule?.introduction ?? lesson?.summary ?? "Découvre cette notion avec une explication progressive.",
    example: completeModule?.guidedPractice ?? "Commence par lire la définition, puis observe un exemple guidé.",
    exercise: "Explique la notion avec tes propres mots et propose une application.",
    answer: "Compare ta réponse avec la méthode présentée par ton enseignant.",
    hint: completeModule?.checkpoint ?? lesson?.objective ?? "Relis l’objectif de la leçon.",
  };

  return (
    <ScreenContainer className="px-5" safeAreaClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
          <MaterialIcons name="arrow-back" size={21} color={colors.foreground} />
          <Text style={[styles.backText, { color: colors.foreground }]}>Retour au sommaire</Text>
        </Pressable>

        <Text style={[styles.kicker, { color: colors.primary }]}>{lesson?.sourceLabel ?? "MADRASTI AI · MAROC"}</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>{lesson?.title ?? lessonModule.concept}</Text>
        <Text style={[styles.arabicTitle, { color: colors.muted }]}>{lesson?.arabicTitle}</Text>

        <View style={[styles.goal, { backgroundColor: "#E3F3EE" }]}>
          <MaterialIcons name="flag" size={20} color="#0C6E59" />
          <View style={styles.goalCopy}>
            <Text style={styles.goalLabel}>OBJECTIF PÉDAGOGIQUE</Text>
            <Text style={styles.goalText}>{lesson?.objective ?? "Maîtriser les notions clés et les exercices types."}</Text>
          </View>
        </View>

        {/* Le Cours */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="menu-book" size={19} color={colors.primary} />
            <Text style={[styles.cardKicker, { color: colors.primary }]}>LE COURS · À RETENIR</Text>
          </View>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>{lessonModule.concept}</Text>
          <Text style={[styles.body, { color: colors.foreground }]}>{lessonModule.explanation}</Text>
        </View>

        {/* Exemple Résolu */}
        <View style={[styles.example, { backgroundColor: "#17322B" }]}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="lightbulb" size={18} color="#9FE7D1" />
            <Text style={styles.exampleKicker}>EXEMPLE GUIDÉ ET RÉSOLU</Text>
          </View>
          <Text style={styles.exampleText}>{lessonModule.example}</Text>
        </View>

        {/* TD & Exercice d'application */}
        <View style={[styles.exercise, { backgroundColor: "#FFF0E5" }]}>
          <View style={styles.exerciseHeader}>
            <MaterialIcons name="edit-note" size={23} color="#C15B2A" />
            <Text style={styles.exerciseKicker}>TD · EXERCICE D'APPLICATION</Text>
          </View>
          <Text style={styles.exerciseText}>{lessonModule.exercise}</Text>

          <View style={styles.hintBox}>
            <Text style={styles.answerLabel}>💡 INDICE MÉTHODOLOGIQUE</Text>
            <Text style={styles.answerText}>{lessonModule.hint}</Text>
          </View>

          {/* Toggle Solution */}
          <Pressable
            onPress={() => setShowSolution((v) => !v)}
            style={({ pressed }) => [styles.solutionToggle, pressed && styles.pressed]}
          >
            <MaterialIcons name={showSolution ? "visibility-off" : "visibility"} size={17} color="#C15B2A" />
            <Text style={styles.solutionToggleText}>
              {showSolution ? "Masquer la correction" : "Afficher la correction détaillée (TD)"}
            </Text>
          </Pressable>

          {showSolution && (
            <View style={styles.solutionBox}>
              <Text style={styles.solutionHeader}>CORRECTION COMPLÈTE :</Text>
              <Text style={styles.solutionBody}>{lessonModule.answer}</Text>
            </View>
          )}
        </View>

        {/* AI Tutor Button */}
        <Pressable onPress={() => router.push("/teacher")} style={({ pressed }) => [styles.teacherButton, pressed && styles.pressed]}>
          <MaterialIcons name="auto-awesome" size={19} color="#FFFFFF" />
          <Text style={styles.teacherText}>Demander une explication personnalisée à Moualim</Text>
        </Pressable>

        {/* Practice Exams Button */}
        <Pressable onPress={() => router.push("/(tabs)/practice")} style={({ pressed }) => [styles.practiceButton, pressed && styles.pressed]}>
          <Text style={[styles.practiceText, { color: colors.primary }]}>Tester mes connaissances sur l’examen interactif</Text>
          <MaterialIcons name="arrow-forward" size={18} color={colors.primary} />
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 15, paddingBottom: 35, gap: 14 },
  back: { flexDirection: "row", alignItems: "center", gap: 7, paddingVertical: 5, alignSelf: "flex-start" },
  backText: { fontSize: 13, fontWeight: "700" },
  kicker: { fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginTop: 5 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: "800", letterSpacing: -0.7 },
  arabicTitle: { fontSize: 15, marginTop: -7, fontWeight: "700" },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  goal: { borderRadius: 17, padding: 13, flexDirection: "row", gap: 9, alignItems: "center" },
  goalCopy: { flex: 1 },
  goalLabel: { color: "#0C6E59", fontSize: 9, fontWeight: "800", letterSpacing: 1.3 },
  goalText: { color: "#32695A", fontSize: 12, lineHeight: 17, marginTop: 2 },
  card: { borderRadius: 19, borderWidth: 1, padding: 16, gap: 8 },
  cardKicker: { fontSize: 10, fontWeight: "800", letterSpacing: 1.3 },
  cardTitle: { fontSize: 18, lineHeight: 23, fontWeight: "800" },
  body: { fontSize: 13, lineHeight: 21 },
  example: { borderRadius: 19, padding: 17, gap: 8 },
  exampleKicker: { color: "#9FE7D1", fontSize: 10, fontWeight: "800", letterSpacing: 1.3 },
  exampleText: { color: "#FFFFFF", fontSize: 16, lineHeight: 24, fontWeight: "700" },
  exercise: { borderRadius: 19, padding: 16, gap: 10 },
  exerciseHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  exerciseKicker: { color: "#C15B2A", fontSize: 10, fontWeight: "800", letterSpacing: 1.3 },
  exerciseText: { color: "#4A2B1D", fontSize: 15, lineHeight: 22, fontWeight: "700" },
  hintBox: { borderTopColor: "#E7C3B2", borderTopWidth: 1, paddingTop: 9, marginTop: 3 },
  answerLabel: { color: "#A76A51", fontSize: 10, fontWeight: "800", letterSpacing: 1.1 },
  answerText: { color: "#6A4535", fontSize: 12, lineHeight: 18, marginTop: 3 },
  solutionToggle: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "#FFE0CE", borderRadius: 12, paddingVertical: 10, marginTop: 5 },
  solutionToggleText: { color: "#C15B2A", fontSize: 12, fontWeight: "800" },
  solutionBox: { backgroundColor: "#FFF8F4", borderColor: "#E7A684", borderWidth: 1, borderRadius: 14, padding: 12, gap: 5, marginTop: 4 },
  solutionHeader: { color: "#C15B2A", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  solutionBody: { color: "#2E1C13", fontSize: 13, lineHeight: 20, fontWeight: "600" },
  teacherButton: { height: 50, borderRadius: 14, backgroundColor: "#D86B49", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  teacherText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  practiceButton: { height: 48, borderRadius: 14, borderWidth: 1, borderColor: "#B7DCCE", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  practiceText: { fontSize: 12, fontWeight: "800" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
