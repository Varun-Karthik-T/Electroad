import {
  Card,
  Text,
  Button,
  useTheme,
  Provider,
  ProgressBar,
  IconButton,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";
import IssueButton from "@/Components/IssueButton";
import AppBar from "@/Components/AppBar";
import { mapData } from "@/constants";
import { useEffect, useState } from "react";
import axios from "axios";

function filterLeisure(id, data) {
  return data.leisure
    .filter((item) => item.id === id)
    .map(({ leisure_id, name, category, url }) => ({
      leisure_id,
      name,
      category,
      url,
    }));
}

export default function StationPage() {
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
  const station = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [ports, setPorts] = useState("");
  const [ratingNo, setRatingNo] = useState("");
  const [rating, setRating] = useState("");

  let result = filterLeisure(Number(station.id), mapData);
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
      marginHorizontal: 20,
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

  useEffect(() => {
    async function fetchData() {
      const response = await axios.post(
        "https://sdg-2024.onrender.com/get_station_details",
        {
          station_id: Number(station.id),
        }
      );
      setTitle(response.data[0].station_name);
      setLocation(response.data[0].location);
      setPorts(response.data[0].no_of_ports);
      setRating(response.data[0].overall_ratings);
      setRatingNo(response.data[0].no_of_ratings);
    }
    fetchData();
  }, []);
  return (
    <>
      <Provider>
        <PaperProvider theme={theme}>
          <AppBar />
          <View style={stationStyles.container}>
            <Card style={stationStyles.card}>
              <Card.Title title={title} subtitle={location} />
              <Card.Content>
                <Text style={{ paddingVertical: 10 }}>
                  {" "}
                  No. of Charging ports: {ports}
                </Text>
              </Card.Content>
              <Card.Cover
                style={{ marginHorizontal: 20 }}
                source={{
                  uri: "https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2023/06/Untitled-design-2023-06-21T142313.086.jpg",
                }}
              />
              <Card.Actions>
                <Button
                  style={{ width: "80%" }}
                  onPress={() => {
                    router.navigate(`/booking/${station.id}`);
                  }}
                >
                  Book a slot
                </Button>
                <IconButton
                  icon="directions"
                  onPress={() => {
                    router.navigate(`route/${station.id}`);
                  }}
                />
              </Card.Actions>
            </Card>
            <ScrollView
              style={{ width: "100%", paddingHorizontal: 30 }}
            >
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
                  <Text variant="titleLarge">
                    {" "}
                    {rating} ({ratingNo}){" "}
                  </Text>
                  <ProgressBar
                    style={stationStyles.progress}
                    animatedValue={rating / 5}
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
                    station_id={Number(station.id)}
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
                  Places nearby to spend time while you wait
                </Text>
                <ScrollView horizontal={true} style={{ marginVertical: 10 }}>
                  {result.map((item, index) => (
                    <Card
                      key={item.leisure_id}
                      style={{
                        marginHorizontal: 4,
                        width: "40%",
                        backgroundColor: theme.colors.secondaryContainer,
                        marginRight: index === result.length - 1 ? 20 : 4,
                      }}
                    >
                      <Card.Title title={item.name} />
                      <Card.Cover
                        style={{ marginHorizontal: 8 }}
                        source={{ uri: item.url }}
                      />
                      <Card.Content>
                        <Text>{item.category}</Text>
                      </Card.Content>
                    </Card>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </PaperProvider>
      </Provider>
    </>
  );
}
