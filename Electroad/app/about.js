import { Text, View } from "react-native";
import { Link } from "expo-router";
import AppBar from "../Components/AppBar";

export default function AboutPage() {
  return (
    <>
      <AppBar />
      <View>
        <Text>About page</Text>
        <Link href="/"> Home </Link>
      </View>
    </>
  );
}
