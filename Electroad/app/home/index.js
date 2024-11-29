import AppBar from "@/Components/AppBar";
import BottomBar from "@/Components/BottomBar";
import { PaperProvider } from "react-native-paper";
  
  
  export default function IndexPage() {
    return (
      <PaperProvider theme={theme}>
        <AppBar />
        <BottomBar />
      </PaperProvider>
    );
  }

  const theme = {
    colors: {
      primary: "rgb(0, 110, 11)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(138, 252, 122)",
      onPrimaryContainer: "rgb(0, 34, 1)",
      secondary: "rgb(38, 108, 43)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(170, 245, 164)",
      onSecondaryContainer: "rgb(0, 34, 4)",
      tertiary: "rgb(4, 110, 22)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(47, 49, 45)",
      inverseOnSurface: "rgb(241, 241, 235)",
      inversePrimary: "rgb(110, 222, 97)",
      elevation: {
        level0: "transparent",
        level1: "rgb(239, 246, 234)",
        level2: "rgb(232, 242, 227)",
        level3: "rgb(224, 237, 220)",
        level4: "rgb(222, 236, 218)",
        level5: "rgb(217, 233, 213)",
      },
      surfaceDisabled: "rgba(26, 28, 25, 0.12)",
      onSurfaceDisabled: "rgba(26, 28, 25, 0.38)",
      backdrop: "rgba(44, 50, 42, 0.4)",
    },
  };