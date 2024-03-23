import {
  Dialog,
  Portal,
  Text,
  useTheme,
  Button,
  Chip,
  TextInput,
  Menu,
} from "react-native-paper";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { issueList } from "@/constants/index.js";

const styles = StyleSheet.create({
  menuStyle: {
    marginTop: 20,
  },
});

export default function IssueButton({ stationName, portType, portId }) {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const [Brief, setBrief] = useState("");
  const [issueType, setIssueType] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Raise an issue</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Chip> {stationName}</Chip>
                <Chip> {portId}</Chip>
                <Chip> {portType}</Chip>
              </View>
              <Text>This is simple diaddlog</Text>
              <Menu
                visible={showDropDown}
                style={styles.menuStyle}
                onDismiss={() => setShowDropDown(false)}
                anchor={
                  <Button mode="outlined" onPress={() => setShowDropDown(true)}>
                    {issueType ? issueType : "Select issue type"}
                  </Button>
                }
              >
                {issueList.map((issue) => (
                  <Menu.Item
                    key={issue.value}
                    onPress={() => {
                      setIssueType(issue.label);
                      setShowDropDown(false);
                    }}
                    title={issue.label}
                  />
                ))}
              </Menu>
              <View style={styles.spacerStyle} />
              <TextInput
                label={"Brief about the issue (optional) "}
                value={Brief}
                onChange={(Brief) => setBrief(Brief)}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Submit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button
        mode="outlined"
        textColor="red"
        icon={"alert"}
        onPress={() => setVisible(true)}
      >
        Raise issue
      </Button>
    </>
  );
}
