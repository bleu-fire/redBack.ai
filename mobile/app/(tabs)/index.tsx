import { router } from "expo-router";
import { Bell, Camera, ChevronRight } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Palette } from "@/constants/theme";


export default function HomeScreen() {
  return (

     <View>
      
     </View>
  
  );
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  kicker: {
    color: Palette.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  greeting: {
    color: Palette.ink,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 5,
  },
  hero: {
    backgroundColor: Palette.moss,
    borderRadius: 28,
    minHeight: 205,
    overflow: "hidden",
    padding: 22,
    marginBottom: 14,
  },
  heroCopy: { width: "68%", zIndex: 2 },
  heroTitle: {
    color: Palette.paper,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -1,
    marginTop: 13,
  },
  heroBody: { color: "#D9E4DB", fontSize: 13, lineHeight: 19, marginTop: 10 },
  heroSpider: {
    position: "absolute",
    width: 190,
    height: 190,
    right: -28,
    bottom: -17,
    opacity: 0.9,
  },
  scanCard: {
    backgroundColor: Palette.coral,
    minHeight: 82,
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 30,
  },
  scanIcon: {
    backgroundColor: "#C83D32",
    borderRadius: 15,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  scanTitle: { color: Palette.paper, fontWeight: "800", fontSize: 16 },
  scanSub: { color: "#FFE3DF", fontSize: 12, marginTop: 4 },
  stats: {
    backgroundColor: Palette.paper,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  statNumber: { fontSize: 24, color: Palette.ink, fontWeight: "900" },
  statLabel: { color: Palette.muted, fontSize: 10, marginTop: 3 },
  statDivider: { width: 1, height: 35, backgroundColor: Palette.line },
  discovery: {
    backgroundColor: Palette.paper,
    borderRadius: 24,
    overflow: "hidden",
    flexDirection: "row",
    minHeight: 182,
  },
  discoveryArt: {
    width: "42%",
    backgroundColor: Palette.coralSoft,
    padding: 14,
    overflow: "hidden",
  },
  artLabel: {
    color: Palette.coral,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
    lineHeight: 14,
  },
  discoverySpider: {
    position: "absolute",
    width: 130,
    height: 140,
    left: 3,
    bottom: -4,
  },
  discoveryCopy: { flex: 1, padding: 16 },
  discoveryTitle: {
    color: Palette.ink,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 21,
    marginTop: 13,
  },
  discoveryText: {
    color: Palette.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 6,
  },
  learnLink: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginTop: 13,
  },
  learnLinkText: { color: Palette.coral, fontSize: 12, fontWeight: "800" },
});
