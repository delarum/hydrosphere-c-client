const waterBodies = [
  {
    id: 1,
    title: "Lake Victoria Basin",
    location: "Kenya, Uganda, Tanzania",
    category: "lake",
    status: "critical",
    image: "src/assets/LakeVictoria.webp",
    badge: "🌍 58.4% Polluted",
    description:
      "Africa's largest freshwater lake now faces severe eutrophication, agricultural runoff and urban waste. Our AI-powered monitoring tracks algae blooms and illegal waste.",
    stats: [
      { label: "Nutrient Levels", value: "68" },
      { label: "Pollution Reports", value: "42" },
      { label: "Communities", value: "3" },
    ],
  },
  {
    id: 2,
    title: "Nairobi River Basin",
    location: "Nairobi, Kenya",
    category: "river-basin",
    status: "urgent",
    image: "src/assets/NairobiRiver.jpg",
    badge: "⚠️ 82% Need Action",
    description:
      "Once the green veins of the Nairobi River and its tributaries, this basin now suffers from urban discharge and plastic waste accumulation across key tributaries.",
    stats: [
      { label: "Illegal Dumpsites", value: "24" },
      { label: "Pollution Index", value: "12" },
      { label: "AI Scans", value: "85" },
    ],
  },
  {
    id: 3,
    title: "Congo River System",
    location: "Democratic Republic of Congo",
    category: "river-basin",
    status: "watch",
    image: "src/assets/CongoRiver.jpg",
    badge: "🛰️ 4.7M AI Scans",
    description:
      "The mighty Congo River remains one of Africa's ecological lifelines. Illegal dumping and runoff threaten both fisheries and surrounding communities.",
    stats: [
      { label: "Water Health Alerts", value: "15" },
      { label: "Area Covered", value: "4,700" },
      { label: "Regions", value: "8" },
    ],
  },
  {
    id: 4,
    title: "Lake Chad Basin",
    location: "Chad, Nigeria, Niger, Cameroon",
    category: "lake",
    status: "climate",
    image: "src/assets/LakeChad.jpg",
    badge: "🌊 Climate Critical",
    description:
      "Once one of Africa's largest lakes, Lake Chad is shrinking under climate stress, water extraction and drought, creating severe pressure for local systems.",
    stats: [
      { label: "Nations", value: "4" },
      { label: "Threat Zones", value: "90" },
      { label: "People Impacted", value: "35M" },
    ],
  },
  {
    id: 5,
    title: "Niger River Delta",
    location: "Nigeria, West Africa",
    category: "river-basin",
    status: "industrial",
    image: "src/assets/NigerRiver.webp",
    badge: "🛢️ Oil Risk Elevated",
    description:
      "Oil contamination, industrial discharge and wetland degradation continue to threaten biodiversity and public health throughout the delta.",
    stats: [
      { label: "KM Affected", value: "20,000" },
      { label: "Risk Sites", value: "12" },
      { label: "Lives Exposed", value: "4,500" },
    ],
  },
  {
    id: 6,
    title: "Lake Tanganyika",
    location: "Burundi, Tanzania, DRC, Zambia",
    category: "lake",
    status: "biodiversity",
    image: "src/assets/LakeTanganyika.webp",
    badge: "🐟 Biodiversity Focus",
    description:
      "One of the world's deepest lakes now faces shoreline pollution, fishing pressure and ecosystem imbalance across surrounding communities.",
    stats: [
      { label: "Species Protected", value: "2,000+" },
      { label: "Monitoring Nodes", value: "673" },
      { label: "Conservation Towns", value: "28" },
    ],
  },
  {
    id: 7,
    title: "Zambezi River Basin",
    location: "Zambia, Zimbabwe, Mozambique",
    category: "river-basin",
    status: "monitoring",
    image: "src/assets/ZambeziRiver.png",
    badge: "📡 Heavy AI Monitoring",
    description:
      "Hydropower stress, waste inflows and industrial runoff have created pressure on the basin's health and long-term resilience.",
    stats: [
      { label: "AI Monitoring Sites", value: "2,574" },
      { label: "Warning Zones", value: "32" },
      { label: "Protected Regions", value: "11" },
    ],
  },
];

export default waterBodies;