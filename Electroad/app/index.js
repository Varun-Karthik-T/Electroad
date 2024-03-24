import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { AppRegistry } from "react-native";
import { name as appName } from "../app.json";
import HomePage from "../Components/HomePage";
import AppBar from "../Components/AppBar";
import BottomBar from "../Components/BottomBar";

const theme =   {
  ...DefaultTheme,
  "colors": {
    "primary": "rgb(0, 110, 11)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(138, 252, 122)",
    "onPrimaryContainer": "rgb(0, 34, 1)",
    "secondary": "rgb(38, 108, 43)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(170, 245, 164)",
    "onSecondaryContainer": "rgb(0, 34, 4)",
    "tertiary": "rgb(4, 110, 22)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(154, 249, 143)",
    "onTertiaryContainer": "rgb(0, 34, 2)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(252, 253, 246)",
    "onBackground": "rgb(26, 28, 25)",
    "surface": "rgb(252, 253, 246)",
    "onSurface": "rgb(26, 28, 25)",
    "surfaceVariant": "rgb(223, 228, 216)",
    "onSurfaceVariant": "rgb(66, 73, 63)",
    "outline": "rgb(115, 121, 110)",
    "outlineVariant": "rgb(194, 200, 188)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 49, 45)",
    "inverseOnSurface": "rgb(241, 241, 235)",
    "inversePrimary": "rgb(110, 222, 97)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(239, 246, 234)",
      "level2": "rgb(232, 242, 227)",
      "level3": "rgb(224, 237, 220)",
      "level4": "rgb(222, 236, 218)",
      "level5": "rgb(217, 233, 213)"
    },
    "surfaceDisabled": "rgba(26, 28, 25, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 25, 0.38)",
    "backdrop": "rgba(44, 50, 42, 0.4)"
  }
}

export default function IndexPage() {
  return (
    <PaperProvider theme={theme}>
      <AppBar />
      <BottomBar />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => IndexPage);
