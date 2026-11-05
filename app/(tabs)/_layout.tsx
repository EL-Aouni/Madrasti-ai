import { Tabs, router } from "expo-router";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useTranslation } from "react-i18next";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/hooks/use-auth";

export default function TabLayout() {
  const colors = useColors();
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const insets = useSafeAreaInsets();
  useEffect(() => { if (!loading && !user) router.replace("/login"); }, [loading, user]);
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  return <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.muted, headerShown: false, tabBarButton: HapticTab, tabBarStyle: { paddingTop: 8, paddingBottom: bottomPadding, height: tabBarHeight, backgroundColor: colors.background, borderTopColor: colors.border, borderTopWidth: 0.5 } }}><Tabs.Screen name="index" options={{ title: t("tabs.home"), tabBarIcon: ({ color }) => <IconSymbol size={23} name="house.fill" color={color} /> }} /><Tabs.Screen name="courses" options={{ title: t("tabs.courses"), tabBarIcon: ({ color }) => <IconSymbol size={23} name="book.fill" color={color} /> }} /><Tabs.Screen name="practice" options={{ title: t("tabs.practice"), tabBarIcon: ({ color }) => <IconSymbol size={23} name="checkmark.circle.fill" color={color} /> }} /><Tabs.Screen name="profile" options={{ title: t("tabs.profile"), tabBarIcon: ({ color }) => <IconSymbol size={23} name="person.fill" color={color} /> }} /></Tabs>;
}
