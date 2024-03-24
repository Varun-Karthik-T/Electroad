import {
  Dialog,
  Portal,
  Text,
  useTheme,
  Button,
  Chip,
  TextInput,
  Menu,
  ActivityIndicator,
} from "react-native-paper";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { issueList } from "@/constants/index.js";
import axios from "axios";

const styles = StyleSheet.create({
  menuStyle: {
    marginTop: 20,
  },
});

export default function IssueButton({ station_id, port_id, portType }) {
  const theme = useTheme();
  const apiURL = "https://sdg-2024.onrender.com/";

  const [visible, setVisible] = useState(false);
  const [Brief, setBrief] = useState("");
  const [issueType, setIssueType] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    try {
      setLoading(true);
      console.log(apiURL + "add_issue")
      const response = await axios.post(apiURL + "add_issue", {
        station_id: station_id,
        port_id: port_id,
        issue_type: issueType,
        email: "salailovespaneer@gmail.com",
      });
      setVisible(false);
      setLoading(false);
      console.log(response.data);
    } catch (err) {
      setLoading(false);
      console.log("Review submission la prachana: " + err);
    }
  }

  return (
    <>
      <Portal>
        <Dialog
          dismissable={!loading}
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          <Dialog.Title>Raise an issue</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Chip> {station_id}</Chip>
                <Chip> {port_id}</Chip>
                <Chip> {portType}</Chip>
              </View>
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
            <ActivityIndicator
              animating={loading}
              color={theme.colors.primary}
            />
            <Button onPress={submitReview}>Submit</Button>
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
