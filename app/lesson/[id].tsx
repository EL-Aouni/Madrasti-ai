import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function LessonScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isFractions = id === "fractions";
  return <ScreenContainer className="px-5" safeAreaClassName="bg-background"><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><MaterialIcons name="arrow-back" size={21} color={colors.foreground} /><Text style={[styles.backText, { color: colors.foreground }]}>Retour</Text></Pressable><View style={[styles.illustration, { backgroundColor: isFractions ? "#E3F3EE" : "#FFF0E5" }]}><MaterialIcons name={isFractions ? "calculate" : "auto-stories"} size={62} color={isFractions ? colors.primary : "#C15B2A"} /></View><Text style={[styles.kicker, { color: colors.primary }]}>{isFractions ? "MATHÉMATIQUES · COLLÈGE" : "FRANÇAIS · COLLÈGE"}</Text><Text style={[styles.title, { color: colors.foreground }]}>{isFractions ? "Fractions et nombres décimaux" : "Les temps du récit"}</Text><Text style={[styles.intro, { color: colors.muted }]}>Une explication courte, un exemple guidé, puis une question pour vérifier ce que tu as compris.</Text><View style={styles.metaRow}><View style={[styles.meta, { backgroundColor: colors.surface, borderColor: colors.border }]}><MaterialIcons name="schedule" size={17} color={colors.primary} /><Text style={[styles.metaText, { color: colors.muted }]}>15 min</Text></View><View style={[styles.meta, { backgroundColor: colors.surface, borderColor: colors.border }]}><MaterialIcons name="signal-cellular-alt" size={17} color={colors.primary} /><Text style={[styles.metaText, { color: colors.muted }]}>Facile</Text></View></View><View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.cardKicker, { color: colors.primary }]}>L’IDÉE CLÉ</Text><Text style={[styles.cardTitle, { color: colors.foreground }]}>{isFractions ? "Une fraction, c’est une partie d’un tout." : "Le temps du récit situe les actions dans le temps."}</Text><Text style={[styles.cardBody, { color: colors.muted }]}>{isFractions ? "Dans 3/4, le 3 est le numérateur : il indique les parts choisies. Le 4 est le dénominateur : il indique le nombre total de parts égales." : "L’imparfait décrit le décor ou une habitude. Le passé simple raconte une action qui fait avancer l’histoire."}</Text></View><View style={[styles.example, { backgroundColor: "#17322B" }]}><Text style={styles.exampleLabel}>EXEMPLE GUIDÉ</Text><Text style={styles.exampleText}>{isFractions ? "1/2 = 2/4 = 3/6" : "Il marchait (imparfait) puis il entra (passé simple)."}</Text><Text style={styles.exampleHint}>Observe ce qui change et ce qui reste pareil.</Text></View><Pressable onPress={() => router.push("/(tabs)/practice")} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryText}>Faire un exercice</Text><MaterialIcons name="arrow-forward" size={19} color="#FFFFFF" /></Pressable><Pressable onPress={() => router.push("/teacher")} style={({ pressed }) => [styles.teacherLink, pressed && styles.pressed]}><MaterialIcons name="auto-awesome" size={18} color="#D86B49" /><Text style={styles.teacherText}>Demander une explication à Moualim</Text></Pressable></ScrollView></ScreenContainer>;
}

const styles = StyleSheet.create({
  content: { paddingTop: 15, paddingBottom: 30, gap: 15 },
  back: { flexDirection: "row", alignItems: "center", gap: 7, alignSelf: "flex-start", paddingVertical: 5 },
  backText: { fontSize: 13, fontWeight: "700" },
  illustration: { height: 145, borderRadius: 25, alignItems: "center", justifyContent: "center", marginTop: 3 },
  kicker: { fontSize: 10, fontWeight: "800", letterSpacing: 1.3, marginTop: 3 },
  title: { fontSize: 28, lineHeight: 32, fontWeight: "800", letterSpacing: -0.7 },
  intro: { fontSize: 13, lineHeight: 19, marginTop: -6 },
  metaRow: { flexDirection: "row", gap: 8 },
  meta: { borderWidth: 1, borderRadius: 11, paddingHorizontal: 10, paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 11, fontWeight: "700" },
  card: { borderWidth: 1, borderRadius: 19, padding: 16, gap: 8 },
  cardKicker: { fontSize: 10, fontWeight: "800", letterSpacing: 1.3 },
  cardTitle: { fontSize: 17, lineHeight: 22, fontWeight: "800" },
  cardBody: { fontSize: 13, lineHeight: 20 },
  example: { borderRadius: 19, padding: 17, gap: 8 },
  exampleLabel: { color: "#9FE7D1", fontSize: 10, fontWeight: "800", letterSpacing: 1.3 },
  exampleText: { color: "#FFFFFF", fontSize: 19, fontWeight: "800", lineHeight: 25 },
  exampleHint: { color: "#B8DCD1", fontSize: 11 },
  primaryButton: { height: 51, borderRadius: 14, backgroundColor: "#0C6E59", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  primaryText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  teacherLink: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, padding: 8 },
  teacherText: { color: "#C15B2A", fontSize: 12, fontWeight: "800" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
