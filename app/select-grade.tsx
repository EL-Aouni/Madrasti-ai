import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

import { ScreenContainer } from "@/components/screen-container";
import { grades, type Grade } from "@/lib/learning-data";
import { saveGrade } from "@/lib/workspace-data";
import { useColors } from "@/hooks/use-colors";

export default function SelectGradeScreen() {
  const colors = useColors();
  const { t } = useTranslation();
  const { from } = useLocalSearchParams<{ from?: string }>();
  const isEditingExisting = from === "profile";

  const choose = async (gradeId: Grade["id"]) => {
    await saveGrade(gradeId);
    if (isEditingExisting) router.back();
    else router.replace("/join-class");
  };

  return (
    <ScreenContainer className="px-5" safeAreaClassName="bg-background">
      <View style={styles.content}>
        <Text style={[styles.kicker, { color: colors.primary }]}>{isEditingExisting ? t("selectGrade.kickerEditing") : t("selectGrade.kickerOnboarding")}</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>{t("selectGrade.title")}</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          {t("selectGrade.subtitle")}
        </Text>
        <View style={styles.grid}>
          {grades.map((grade) => (
            <Pressable
              key={grade.id}
              onPress={() => choose(grade.id)}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.border },
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.icon, { backgroundColor: grade.track === "college" ? "#E3F3EE" : "#F0ECFF" }]}>
                <MaterialIcons
                  name={grade.track === "college" ? "menu-book" : "school"}
                  size={24}
                  color={grade.track === "college" ? "#0C6E59" : "#6B4FBB"}
                />
              </View>
              <View style={styles.copy}>
                <Text style={[styles.cardTitle, { color: colors.foreground }]}>{grade.label}</Text>
                <Text style={[styles.cardArabic, { color: colors.muted }]}>{grade.arabic}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={colors.muted} />
            </Pressable>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: "center", gap: 14 },
  kicker: { fontSize: 11, fontWeight: "800", letterSpacing: 1.4 },
  title: { fontSize: 27, lineHeight: 33, fontWeight: "800", marginTop: 4 },
  subtitle: { fontSize: 14, lineHeight: 20, marginBottom: 6 },
  grid: { gap: 10 },
  card: { borderRadius: 17, borderWidth: 1, padding: 13, flexDirection: "row", alignItems: "center", gap: 12 },
  icon: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  copy: { flex: 1, gap: 2 },
  cardTitle: { fontSize: 14, fontWeight: "800" },
  cardArabic: { fontSize: 12 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
