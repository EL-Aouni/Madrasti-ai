import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";
import * as Auth from "@/lib/_core/auth";

export default function LoginScreen() {
  const colors = useColors();
  const { t } = useTranslation();
  const { loginAsGuest } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isNetworkError, setIsNetworkError] = useState(false);

  const finish = async (result: { sessionToken: string; user: any }) => {
    await Auth.setSessionToken(result.sessionToken);
    await Auth.setUserInfo({ ...result.user, lastSignedIn: new Date(result.user.lastSignedIn) });
    router.replace("/(tabs)");
  };

  const handleError = (err: { message: string }) => {
    setError(err.message);
    const msg = (err.message || "").toLowerCase();
    if (
      msg.includes("fetch") ||
      msg.includes("network") ||
      msg.includes("failed") ||
      msg.includes("connect")
    ) {
      setIsNetworkError(true);
    }
  };

  const login = trpc.auth.login.useMutation({
    onSuccess: finish,
    onError: handleError,
  });

  const register = trpc.auth.register.useMutation({
    onSuccess: finish,
    onError: handleError,
  });

  const submit = () => {
    setError("");
    setIsNetworkError(false);
    if (mode === "register") {
      register.mutate({ name, email, password });
    } else {
      login.mutate({ email, password });
    }
  };

  const enterGuestMode = async () => {
    const studentName = name.trim() || "Élève";
    await loginAsGuest(studentName);
    router.replace("/(tabs)");
  };

  const busy = login.isPending || register.isPending;

  return (
    <ScreenContainer className="px-5" safeAreaClassName="bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.brand}>
          <View style={[styles.brandMark, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="school" size={24} color="#FFF" />
          </View>
          <Text style={[styles.brandText, { color: colors.primary }]}>MADRSTI AI</Text>
        </View>

        <Text style={[styles.kicker, { color: colors.primary }]}>
          {mode === "login" ? t("login.kickerLogin") : t("login.kickerRegister")}
        </Text>
        <Text style={[styles.title, { color: colors.foreground }]}>
          {mode === "login" ? t("login.titleLogin") : t("login.titleRegister")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          {t("login.subtitle")}
        </Text>

        {/* 100% Free Offline Mode Card */}
        <Pressable
          onPress={enterGuestMode}
          style={({ pressed }) => [
            styles.guestCard,
            { backgroundColor: colors.surface, borderColor: colors.primary },
            pressed && styles.pressed,
          ]}
        >
          <View style={[styles.guestIcon, { backgroundColor: "#E3F3EE" }]}>
            <MaterialIcons name="offline-bolt" size={24} color={colors.primary} />
          </View>
          <View style={styles.guestCopy}>
            <Text style={[styles.guestTitle, { color: colors.primary }]}>
              {t("login.guestButton")}
            </Text>
            <Text style={[styles.guestSubtitle, { color: colors.muted }]}>
              {t("login.guestSubtitle")}
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={colors.primary} />
        </Pressable>

        <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
          <Text style={[styles.or, { color: colors.muted }]}>OU AVEC COMPTE</Text>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
        </View>

        {mode === "register" && (
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t("login.name")}
            placeholderTextColor={colors.muted}
            style={[
              styles.input,
              { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.surface },
            ]}
          />
        )}

        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder={t("login.email")}
          placeholderTextColor={colors.muted}
          style={[
            styles.input,
            { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.surface },
          ]}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder={t("login.password")}
          placeholderTextColor={colors.muted}
          style={[
            styles.input,
            { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.surface },
          ]}
        />

        <Pressable
          disabled={busy}
          onPress={submit}
          style={({ pressed }) => [
            styles.primary,
            busy && styles.disabled,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.primaryText}>
            {busy
              ? t("login.busy")
              : mode === "login"
                ? t("login.submitLogin")
                : t("login.submitRegister")}
          </Text>
          <MaterialIcons name="arrow-forward" size={19} color="#FFF" />
        </Pressable>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{error}</Text>
            {isNetworkError && (
              <Pressable
                onPress={enterGuestMode}
                style={({ pressed }) => [styles.networkFallbackButton, pressed && styles.pressed]}
              >
                <MaterialIcons name="offline-pin" size={18} color="#0C6E59" />
                <Text style={styles.networkFallbackText}>
                  {t("login.serverUnavailable")}
                </Text>
              </Pressable>
            )}
          </View>
        ) : null}

        <Pressable
          onPress={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
            setIsNetworkError(false);
          }}
        >
          <Text style={[styles.switch, { color: colors.primary }]}>
            {mode === "login" ? t("login.switchToRegister") : t("login.switchToLogin")}
          </Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 24,
    justifyContent: "center",
    gap: 13,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 8,
  },
  brandMark: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  kicker: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  title: {
    fontSize: 27,
    lineHeight: 33,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 4,
  },
  guestCard: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  guestIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  guestCopy: {
    flex: 1,
  },
  guestTitle: {
    fontSize: 13,
    fontWeight: "800",
  },
  guestSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 4,
  },
  line: {
    flex: 1,
    height: 1,
  },
  or: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  input: {
    height: 51,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 13,
    fontSize: 13,
  },
  primary: {
    height: 51,
    borderRadius: 14,
    backgroundColor: "#0C6E59",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "800",
  },
  switch: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "800",
    paddingVertical: 6,
  },
  errorContainer: {
    gap: 8,
    alignItems: "center",
  },
  error: {
    color: "#C15B2A",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  networkFallbackButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E3F3EE",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
  },
  networkFallbackText: {
    color: "#0C6E59",
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },
});
