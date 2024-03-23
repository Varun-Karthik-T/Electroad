const issueList = [
  {
    label: "Charger connection issues",
    value: "not connecting",
  },
  {
    label: "Port/Station is damaged",
    value: "port damaged",
  },
  {
    label: "Charging is slower than rated",
    value: "slow charging",
  },
  {
    label: "Connected but not charging",
    value: "connected but not charging",
  },
  {
    label: "Other issues (Mention it in brief)",
    value: "others",
  },
];

const reviews = [
  "The station is good",
  "The station is bad",
  "The station is average",
  "The station is worst",
  "The station is best",
  "quite good",
];

let mapData = {
  ev: [
    { id: 100, latitude: 11.1271, longitude: 78.6569, title: "Trichy" },
    {
      id: 200,
      latitude: 11.0168,
      longitude: 76.9558,
      title: "Coimbatore",
    },
    {
      id: 300,
      latitude: 13.0827,
      longitude: 80.2707,
      title: "Chennai",
    },
  ],

  leisure: [
    {
      id: 100,
      leisure_id: 101,
      name: "Jeyabal Juice",
      category: "Food",
      latitude: 11.1271,
      longitude: 78.6522,
    },
    {
      id: 100,
      leisure_id: 105,
      name: "Trichy Gym",
      category: "Gym",
      latitude: 11.1211,
      longitude: 78.6569,
    },
    {
      id: 100,
      leisure_id: 106,
      name: "Trichy Movie Theater",
      category: "Movie Theater",
      latitude: 11.1271,
      longitude: 78.6599,
    },
    {
      id: 200,
      leisure_id: 203,
      name: "Coimbatore Shopping Mall",
      category: "Shopping Mall",
      latitude: 11.0118,
      longitude: 76.9528,
    },
    {
      id: 200,
      leisure_id: 204,
      name: "Coimbatore Gym",
      category: "Gym",
      latitude: 11.0128,
      longitude: 76.9598,
    },
    {
      id: 200,
      leisure_id: 205,
      name: "Coimbatore Movie Theater",
      category: "Movie Theater",
      latitude: 11.0188,
      longitude: 76.9548,
    },
    {
      id: 300,
      leisure_id: 303,
      name: "Chennai Shopping Mall",
      category: "Shopping Mall",
      latitude: 13.0822,
      longitude: 80.2703,
    },
    {
      id: 300,
      leisure_id: 304,
      name: "Chennai Gym",
      category: "Gym",
      latitude: 13.0821,
      longitude: 80.273,
    },
    {
      id: 300,
      leisure_id: 305,
      name: "Chennai Movie Theater",
      category: "Movie Theater",
      latitude: 13.0842,
      longitude: 80.2721,
    },
  ],
};

const apiURL = process.env.EXPO_PUBLIC_API_URL;

export { issueList, reviews, apiURL, mapData };
