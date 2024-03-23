import {
  Card,
  Text,
  Button,
  useTheme,
  Provider,
  ProgressBar,
} from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";
import IssueButton from "@/Components/IssueButton";
import AppBar from "@/Components/AppBar";
import { mapData } from "@/constants";

function filterLeisure(id, data) {
  return data.leisure
    .filter(item => item.id === id)
    .map(({ leisure_id, name, category }) => ({ leisure_id, name, category }));
}

export default function StationPage() {
  const theme = useTheme();
  const station_id = useLocalSearchParams();
  console.log("Station: ", station_id.id)

  let result = filterLeisure(station_id.id,mapData);
  console.log(result);

  const stationStyles = {
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      gap: 20,
    },
    card: {
      width: "80%",
      margin: 20,
      alignItems: "center",
    },
    progress: {
      width: 200,
      height: 5,
    },
    review: {
      borderColor: theme.colors.primary,
      borderStyle: "solid",
      borderWidth: 2,
      borderRadius: 10,
      paddingVertical: 5,
      gap: 10,
      paddingHorizontal: 10,
    },
  };
  return (
    <>
      <Provider>
        <AppBar />
        <View style={stationStyles.container}>
          <Card style={stationStyles.card}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
            <Card.Content></Card.Content>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Actions>
              <Button
                style={{ width: "80%" }}
                onPress={() => {
                  router.navigate(`/booking/${station_id}`);
                }}
              >
                Book a slot
              </Button>
            </Card.Actions>
          </Card>
          <ScrollView style={{ width: "100%", paddingHorizontal: 30, gap: 10 }}>
            <Text variant="headlineSmall">Reviews:</Text>
            <View style={stationStyles.review}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
              >
                <Text variant="titleLarge"> 3.6 </Text>
                <ProgressBar
                  style={stationStyles.progress}
                  animatedValue={3.6 / 5}
                  color={"yellow"}
                  theme={theme.colors.primary}
                />
              </View>
              <Button
                onPress={() => {}}
                mode="contained-tonal"
                style={{ margin: 10 }}
              >
                Leave a review
              </Button>
              <View style={{ marginHorizontal: 10 }}>
                <IssueButton
                  station_id={"220"}
                  port_id={289}
                  portType={"CCS"}
                />
              </View>
              <Button onPress={() => {}} style={{ marginHorizontal: 10 }}>
                Show reviews
              </Button>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text variant="titleSmall">
                Places nearby to spend time while your wait
              </Text>
              <ScrollView horizontal={true} style={{ marginVertical: 10 }}>
                <Card style={{ marginHorizontal: 4 }}>
                  <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                  <Card.Content>
                    <Text>Card content</Text>
                  </Card.Content>
                </Card>
                <Card style={{ marginHorizontal: 4 }}>
                  <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                  <Card.Content>
                    <Text>Card content</Text>
                  </Card.Content>
                </Card>
                <Card style={{ marginHorizontal: 4 }}>
                  <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                  <Card.Content>
                    <Text>Card content</Text>
                  </Card.Content>
                </Card>
                <Card style={{ marginHorizontal: 4 }}>
                  <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                  <Card.Content>
                    <Text>Card content</Text>
                  </Card.Content>
                </Card>
                <Card style={{ marginHorizontal: 4 }}>
                  <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                  <Card.Content>
                    <Text>Card content</Text>
                  </Card.Content>
                </Card>
                <Card style={{ marginHorizontal: 4 }}>
                  <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                  <Card.Content>
                    <Text>Card content</Text>
                  </Card.Content>
                </Card>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </Provider>
    </>
  );
}
