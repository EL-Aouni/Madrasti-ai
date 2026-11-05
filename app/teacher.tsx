import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";
import { getOfflineTeacherReply } from "@/lib/offline-teacher";

type Message = { id: string; role: "teacher" | "student"; text: string; failed?: boolean };

const starters = ["Explique-moi les fractions", "Aide-moi avec cet exercice", "Parlons en Darija"];

export default function TeacherScreen() {
  const colors = useColors();
  const { user } = useAuth();
  const firstName = (user?.name ?? "").trim().split(/\s+/)[0];
  const greeting = firstName
    ? `Salam ${firstName} ! Je suis ton professeur IA. On travaille ensemble ? Tu peux m’envoyer une question, un exercice ou une photo de ton cours.`
    : "Salam ! Je suis ton professeur IA. On travaille ensemble ? Tu peux m’envoyer une question, un exercice ou une photo de ton cours.";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: "welcome", role: "teacher", text: greeting }]);
  const chat = trpc.teacher.chat.useMutation();

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed || chat.isPending) return;

    const history = messages
      .filter((m) => m.id !== "welcome" && !m.failed)
      .map((m) => ({ role: m.role === "student" ? ("student" as const) : ("teacher" as const), text: m.text }));

    const studentMessage: Message = { id: `${Date.now()}`, role: "student", text: trimmed };
    setMessages((current) => [...current, studentMessage]);
    setInput("");

    const isGuest = user?.loginMethod === "guest";

    if (isGuest) {
      // Immediate intelligent offline response for guest/offline students
      setTimeout(() => {
        const reply = getOfflineTeacherReply(trimmed, history);
        setMessages((current) => [...current, { id: `${Date.now()}-reply`, role: "teacher", text: reply }]);
      }, 400);
      return;
    }

    chat.mutate(
      { message: trimmed, history },
      {
        onSuccess: (data) => {
          setMessages((current) => [...current, { id: `${Date.now()}-reply`, role: "teacher", text: data.reply }]);
        },
        onError: (error) => {
          if (error.data?.code === "TOO_MANY_REQUESTS") {
            setMessages((current) => [
              ...current,
              { id: `${Date.now()}-error`, role: "teacher", failed: true, text: error.message },
            ]);
            return;
          }
          // Seamless Moroccan pedagogical fallback if server is unreachable or unauthorized
          const reply = getOfflineTeacherReply(trimmed, history);
          setMessages((current) => [
            ...current,
            { id: `${Date.now()}-reply`, role: "teacher", text: reply },
          ]);
        },
      },
    );
  };

  return (
    <ScreenContainer edges={["top", "left", "right"]} containerClassName="bg-background">
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
            <MaterialIcons name="arrow-back" size={21} color={colors.foreground} />
          </Pressable>
          <View style={styles.headerCopy}>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={[styles.onlineText, { color: colors.primary }]}>PROFESSEUR IA · EN LIGNE</Text>
            </View>
            <Text style={[styles.headerTitle, { color: colors.foreground }]}>Moualim</Text>
          </View>
          <Pressable onPress={() => setMessages([{ id: "welcome", role: "teacher", text: greeting }])} style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}>
            <MaterialIcons name="more-horiz" size={24} color={colors.muted} />
          </Pressable>
        </View>
        <View style={[styles.contextBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <MaterialIcons name="verified" size={17} color={colors.primary} />
          <Text style={[styles.contextText, { color: colors.muted }]}>Je m’appuie sur le programme marocain pour t’expliquer.</Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => (
            <View style={[styles.messageRow, item.role === "student" && styles.studentRow]}>
              <View style={[styles.avatar, { backgroundColor: item.role === "student" ? "#D86B49" : colors.primary }]}>
                <MaterialIcons name={item.role === "student" ? "person" : "auto-awesome"} size={17} color="#FFFFFF" />
              </View>
              <View style={[styles.bubble, { backgroundColor: item.role === "student" ? "#D86B49" : colors.surface, borderColor: item.failed ? "#D86B49" : colors.border }]}>
                <Text style={[styles.messageText, { color: item.role === "student" ? "#FFFFFF" : colors.foreground }]}>{item.text}</Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            chat.isPending ? (
              <View style={styles.messageRow}>
                <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                  <MaterialIcons name="auto-awesome" size={17} color="#FFFFFF" />
                </View>
                <View style={[styles.bubble, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={[styles.messageText, { color: colors.muted }]}>Moualim écrit...</Text>
                </View>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <MaterialIcons name="auto-awesome" size={28} color={colors.primary} />
              <Text style={[styles.emptyText, { color: colors.muted }]}>La conversation est prête. Pose ta première question.</Text>
            </View>
          }
        />
        <View style={styles.starters}>
          {starters.map((starter) => (
            <Pressable key={starter} onPress={() => setInput(starter)} style={({ pressed }) => [styles.starter, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
              <Text style={[styles.starterText, { color: colors.primary }]}>{starter}</Text>
            </Pressable>
          ))}
        </View>
        <View style={[styles.composer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TextInput value={input} onChangeText={setInput} placeholder="Écris ta question..." placeholderTextColor={colors.muted} multiline style={[styles.input, { color: colors.foreground }]} />
          <Pressable onPress={send} disabled={chat.isPending} accessibilityLabel="Envoyer" style={({ pressed }) => [styles.sendButton, chat.isPending && styles.disabled, pressed && styles.pressed]}>
            <MaterialIcons name="arrow-upward" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  keyboard: { flex: 1 },
  header: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 12, flexDirection: "row", alignItems: "center", gap: 12 },
  backButton: { width: 40, height: 40, borderRadius: 13, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerCopy: { flex: 1 },
  onlineRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  onlineDot: { height: 6, width: 6, borderRadius: 4, backgroundColor: "#2FAD7B" },
  onlineText: { fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  headerTitle: { fontSize: 20, fontWeight: "800", marginTop: 2 },
  clearButton: { padding: 8 },
  contextBar: { marginHorizontal: 18, borderWidth: 1, borderRadius: 13, padding: 10, flexDirection: "row", alignItems: "center", gap: 8 },
  contextText: { flex: 1, fontSize: 11, lineHeight: 15 },
  messageList: { padding: 18, gap: 15, flexGrow: 1 },
  messageRow: { flexDirection: "row", alignItems: "flex-end", gap: 8, maxWidth: "92%" },
  studentRow: { alignSelf: "flex-end", flexDirection: "row-reverse" },
  avatar: { height: 28, width: 28, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  bubble: { maxWidth: "85%", paddingHorizontal: 13, paddingVertical: 11, borderRadius: 17, borderWidth: 1 },
  messageText: { fontSize: 13, lineHeight: 19 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30, gap: 8 },
  emptyText: { textAlign: "center", fontSize: 13, lineHeight: 19 },
  starters: { flexDirection: "row", gap: 7, paddingHorizontal: 18, paddingBottom: 10 },
  starter: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 9, paddingVertical: 7, flex: 1 },
  starterText: { fontSize: 10, lineHeight: 14, textAlign: "center", fontWeight: "700" },
  composer: { marginHorizontal: 18, marginBottom: 10, minHeight: 52, borderWidth: 1, borderRadius: 17, paddingLeft: 14, paddingVertical: 7, paddingRight: 7, flexDirection: "row", alignItems: "flex-end", gap: 8 },
  input: { flex: 1, fontSize: 13, maxHeight: 80, paddingTop: 7, paddingBottom: 6 },
  sendButton: { height: 37, width: 37, borderRadius: 13, backgroundColor: "#0C6E59", alignItems: "center", justifyContent: "center" },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
