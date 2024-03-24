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
      name: "Aerohub Mall",
      category: "Food",
      latitude: 11.1271,
      longitude: 78.6522,
      url:"https://lh3.googleusercontent.com/p/AF1QipMGkFUI1EeBD6dFVNnd-tFAjr47WGNYerBQ5kOZ=s680-w680-h510"
    },
    {
      id: 100,
      leisure_id: 105,
      name: "PVR Grand Galada Chennai",
      category: "Movie Theater",
      latitude: 11.1211,
      longitude: 78.6569,
      url:"https://lh3.googleusercontent.com/p/AF1QipNpexRE_U0_ftrmV_kENjAHrpl5rPuWn7vnqMrJ=s680-w680-h510"
    },
    {
      id: 100,
      leisure_id: 106,
      name: "Children's Park",
      category: "park",
      latitude: 11.1271,
      longitude: 78.6599,
      url: "https://lh3.googleusercontent.com/p/AF1QipNOPLIKHg58BROPzZg1A1og5bAijLqlaZfxtG14=s680-w680-h510"
    },
    {
      id: 200,
      leisure_id: 203,
      name: "lake view park",
      category: "sight",
      latitude: 11.0118,
      longitude: 76.9528,
      url: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fohiolakelife.lakefrontliving.com%2Fwp-content%2Fuploads%2F2018%2F03%2Flakeview_escape_10.jpg&tbnid=WAn0rvD0ZcY4lM&vet=12ahUKEwjQwu_EsIuFAxWc-jgGHTppAuwQMygXegUIARCpAQ..i&imgrefurl=http%3A%2F%2Fohiolakelife.lakefrontliving.com%2Flake-view-ohio-lake-house%2F&docid=sGYjkj7_EQG9CM&w=1000&h=667&q=lake%20view&ved=2ahUKEwjQwu_EsIuFAxWc-jgGHTppAuwQMygXegUIARCpAQ",
      
    },
    {
      id: 200,
      leisure_id: 204,
      name: "Fitness Freak",
      category: "Gym",
      latitude: 11.0128,
      longitude: 76.9598,
      url: "https://www.primalstrength.com/cdn/shop/files/gym_design_Headers.jpg?v=1680779429&width=2000",
    },
    {
      id: 200,
      leisure_id: 205,
      name: "Jazz cinemas",
      category: "Movie Theater",
      latitude: 11.0188,
      longitude: 76.9548,
      url: "https://lh3.googleusercontent.com/p/AF1QipPlP4t0ZR8ToQnszeBHtqCpoByLIGOL07UOD-IT=s680-w680-h510",
    },
    {
      id: 300,
      leisure_id: 303,
      name: "Phoenix Mall",
      category: "Shopping Mall",
      latitude: 13.0822,
      longitude: 80.2703,
      url:"https://lh5.googleusercontent.com/p/AF1QipOpIZEzas2HQVCpVRwKDxoznIxwuS13czYs3L2w=w114-h114-n-k-no"
    },
    {
      id: 300,
      leisure_id: 304,
      name: "Food For Life",
      category: "Food",
      latitude: 13.0821,
      longitude: 80.273,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjTzgulKCb1KaajT7X9fQ_D4UIWnXAaQP7FEfYpEq7_8RyT5DyKf_4cQSnps87S9LsE8&usqp=CAU",
    },
    {
      id: 300,
      leisure_id: 305,
      
      name: "Kora Food Street",
      category: "Food",
      latitude: 13.0842,
      longitude: 80.2721,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyU-6pMYfhZpJHSol2w8bP_7Tdeyo92DJk9hXXhEuE2BoP290Rg3LC7GlbQw&s",
    },
  ],
};

const apiURL = process.env.EXPO_PUBLIC_API_URL;

export { issueList, reviews, apiURL, mapData };
