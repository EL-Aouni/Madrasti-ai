import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Grade } from "./learning-data";

export type AppRole = "student" | "professor";
export type ClassRoom = { id: string; name: string; subject: string; grade: string; code: string; students: number; completion: number };
export type Assignment = { id: string; classId: string; title: string; kind: "exam" | "exercise" | "course"; due: string; submissions: number; total: number };

export const demoClasses: ClassRoom[] = [
  { id: "math-3ac", name: "3AC Mathématiques · Groupe A", subject: "Mathématiques", grade: "3AC", code: "MADR-3A7K", students: 28, completion: 74 },
  { id: "french-1bac", name: "1BAC Français · Préparation", subject: "Français", grade: "1BAC", code: "MADR-1F2Q", students: 19, completion: 61 },
];

export const demoAssignments: Assignment[] = [
  { id: "exam-thales", classId: "math-3ac", title: "Contrôle · Théorème de Thalès", kind: "exam", due: "Demain", submissions: 21, total: 28 },
  { id: "fractions-course", classId: "math-3ac", title: "Cours guidé · Fractions", kind: "course", due: "Cette semaine", submissions: 26, total: 28 },
  { id: "argumentation", classId: "french-1bac", title: "Exercices · Argumentation", kind: "exercise", due: "Vendredi", submissions: 11, total: 19 },
];

export const languagePrograms = [
  { id: "fr", name: "Français", flag: "🇫🇷", level: "A2 → B1", goal: "Converser au quotidien", modules: ["Se présenter", "Au lycée", "Donner son opinion", "Réussir un oral"] },
  { id: "en", name: "English", flag: "🇬🇧", level: "A1 → A2", goal: "Comprendre et parler", modules: ["Introducing yourself", "Daily routines", "School conversations", "Expressing opinions"] },
  { id: "es", name: "Español", flag: "🇪🇸", level: "Débutant", goal: "Construire les bases", modules: ["Saludos", "La familia", "En la ciudad", "Mi rutina"] },
  { id: "ar", name: "العربية الفصحى", flag: "🇲🇦", level: "متوسط → متقدم", goal: "الكتابة والتعبير", modules: ["التواصل", "الوصف", "الحجاج", "التعبير الكتابي"] },
];

export async function saveRole(role: AppRole) { await AsyncStorage.setItem("madrasti.role", role); }
export async function getRole(): Promise<AppRole | null> { return (await AsyncStorage.getItem("madrasti.role")) as AppRole | null; }
export async function saveJoinedClass(code: string) { await AsyncStorage.setItem("madrasti.joinedClass", code.trim().toUpperCase()); }
export async function saveGrade(gradeId: Grade["id"]) { await AsyncStorage.setItem("madrasti.grade", gradeId); }
export async function getGrade(): Promise<Grade["id"] | null> { return (await AsyncStorage.getItem("madrasti.grade")) as Grade["id"] | null; }
