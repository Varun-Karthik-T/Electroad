import { View } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { Text } from 'react-native-paper';
import IssueButton from "../IssueButton";

export default function BookingPage() {
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
      <Text style={styles.text}>ajajjy</Text>
      <IssueButton stationName={"Thiruvanmiyur"} portId={11} portType={"CCS"}/>
    </View>
  );
}
