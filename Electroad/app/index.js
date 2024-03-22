import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { AppRegistry } from "react-native";
import { name as appName } from "../app.json";
import HomePage from "../Components/HomePage";
import AppBar from "../Components/AppBar";

export default function IndexPage() {
  return (
    <PaperProvider>
      <AppBar />
      <HomePage />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => IndexPage);
