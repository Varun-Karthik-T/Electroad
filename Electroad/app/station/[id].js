import {
  Card,
  Text,
  Button,
  useTheme,
  Provider,
  ProgressBar,
  IconButton,
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
    .map(({ leisure_id, name, category, url }) => ({ leisure_id, name, category, url }));
}

export default function StationPage() {
  const theme = useTheme();
  const station = useLocalSearchParams();

  const [title,setTitle] = useState('');
  const [location,setLocation] = useState('');
  const [ports,setPorts] = useState('');
  const [ratingNo,setRatingNo] = useState('')
  const [rating,setRating] = useState('')

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

  useEffect(() => {
    async function fetchData() {
      const response = await axios.post(
        "https://sdg-2024.onrender.com/get_station_details",
        {
          station_id: Number(station.id),
        }
      );
      setTitle(response.data[0].station_name)
      setLocation(response.data[0].location)
      setPorts(response.data[0].no_of_ports)
      setRating(response.data[0].overall_ratings)
      setRatingNo(response.data[0].no_of_ratings)
    }
    fetchData();
  }, []);
  return (
    <>
      <Provider>
        <AppBar />
        <View style={stationStyles.container}>
          <Card style={stationStyles.card}>
            <Card.Title title={title} subtitle={location} />
            <Card.Content>
              <Text> No. of Charging ports: {ports}</Text>
            </Card.Content>
            <Card.Cover
              style={{ marginHorizontal: 20 }}
              source={{ uri: "https://picsum.photos/700" }}
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
                <Text variant="titleLarge"> {rating} ({ratingNo}) </Text>
                <ProgressBar
                  style={stationStyles.progress}
                  animatedValue={rating/5}
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
      </Provider>
    </>
  );
}
