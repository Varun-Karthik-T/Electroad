import { Text, View } from "react-native";
import { Link } from "expo-router";
import { useTheme, Button } from "react-native-paper";

export default function HomePage() {
  const theme = useTheme();
  const styles = {
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
      gap: 20,
    },
    text: {
      color: theme.colors.text,
      fontSize: 20,
      fontFamily: "monospace",
    },
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home page</Text>
      <Link href="/about">
        <Button mode="elevated">About</Button>
      </Link>
      <Button mode="contained">Summa</Button>
    </View>
  );
}
