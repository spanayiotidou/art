/*
  PAINTINGS.JS
  ------------
  This is the only file you need to edit to add, remove, or update artwork.

  To add a painting:
    1. Drop the image file into the /paintings folder.
    2. Copy one of the objects below, give it a new unique "id".
    3. Fill in the fields. "status" must be one of: "available", "sold", "inquire".
    4. Save. Refresh the page — no build step needed.

  Fields:
    id          - unique short string, e.g. "17"
    title       - painting title
    year        - year completed (number or string, e.g. "2024")
    medium      - e.g. "Acrylic on canvas"
    dimensions  - e.g. '100 x 70 cm'
    status      - "available" | "sold" | "inquire"
    price       - optional, shown only if status is "available". Leave "" to hide.
    size        - "large" or "normal" (or just leave it out — same as "normal").
                  "large" renders as a double-width tile in the gallery grid.
                  You control this directly now — pick large for the pieces
                  you want to stand out, roughly a third of the collection
                  tends to look best, but it's entirely up to you.
    description - a short paragraph about the piece (optional — shown in the
                  lightbox detail view if present)
    image       - path to the image file in /paintings
*/

const PAINTINGS = [
  {
    id: "01",
    title: "\"Light\"",
    year: "2019",
    medium: "Acrylic on canvas",
    dimensions: "100 x 120 cm",
    status: "sold",
    price: "€700",
    size: "large",
    image: "paintings/01-Light.png"
  },

  // {
  //   id: "01",
  //   title: "\"Light\"",
  //   year: "2019",
  //   medium: "Acrylic on canvas",
  //   dimensions: "100 x 120 cm",
  //   status: "available",
  //   price: "€700",
  //   size: "large",
  //   image: "paintings/Light.JPG"
  // },
  {
    id: "02",
    title: "\"Vicky\"",
    year: "2025",
    medium: "Acrylic on canvas",
    dimensions: "90 x 65.3 cm",
    status: "available",
    price: "€500",
    size: "large",
    image: "paintings/Vicky.JPG"
  },
  {
    id: "03",
    title: "\"Cinnamon\"",
    year: "2021",
    medium: "Acrylic on canvas",
    dimensions: "100 x 100.5 cm",
    status: "available",
    price: "€420",
    size: "large",
    image: "paintings/Cinnamon.JPG"
  },
  {
    id: "04",
    title: "\"Change\"",
    year: "2020",
    medium: "Acrylic on canvas",
    dimensions: "100 x 70 cm",
    status: "sold",
    price: "€400",
    size: "large",
    image: "paintings/Change.JPG"
  },
  {
    id: "05",
    title: "\"Humbled\"",
    year: "2023",
    medium: "Acrylic on canvas",
    dimensions: "50 x 40.2 cm",
    status: "available",
    price: "€180",
    size: "large",
    image: "paintings/Humbled.JPG"
  },
  {
    id: "06",
    title: "\"Crude\"",
    year: "2021",
    medium: "Acrylic on canvas",
    dimensions: "122 x  91.5 cm",
    status: "available",
    price: "€450",
    size: "large",
    image: "paintings/Crude.JPG"
  },
  {
    id: "07",
    title: "\"Dry Lavender\"",
    year: "2021",
    medium: "Acrylic on canvas",
    dimensions: "100 x 50 cm",
    status: "available",
    price: "€250",
    size: "large",
    image: "paintings/Dry_Lavender.JPG"
  },
  {
    id: "08",
    title: "\"In My Feelings\"",
    year: "2022",
    medium: "Acrylic on canvas",
    dimensions: "60 x 50 cm",
    status: "available",
    price: "€140",
    size: "large",
    image: "paintings/In_My_Feelings.JPG"
  },
  {
    id: "09",
    title: "\"Golden\"",
    year: "2022",
    medium: "Acrylic on canvas",
    dimensions: "30 x 24 cm",
    status: "available",
    price: "€110",
    size: "large",
    image: "paintings/Golden.JPG"
  },
  {
    id: "10",
    title: "\"Matilda\"",
    year: "2022",
    medium: "Acrylic on canvas",
    dimensions: "30 x 24 cm",
    status: "sold",
    price: "€120",
    size: "large",
    image: "paintings/Matilda.JPG"
  },
  {
    id: "11",
    title: "\"Rose\"",
    year: "2022",
    medium: "Acrylic on canvas",
    dimensions: "30 x 24 cm",
    status: "available",
    price: "€100",
    size: "large",
    image: "paintings/Rose.JPG"
  },
  {
    id: "12",
    title: "\"Cherry\"",
    year: "2023",
    medium: "Acrylic on canvas",
    dimensions: "100 x 73 cm",
    status: "sold",
    price: "€600",
    size: "large",
    image: "paintings/Cherry.JPG"
  },
  {
    id: "13",
    title: "\"Sweet Maple\"",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "29.8 x 30.2 cm",
    status: "available",
    price: "€100",
    size: "large",
    image: "paintings/Sweet_Maple.JPG"
  },
  {
    id: "14",
    title: "\"Vetiver\"",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "20 x 40.3 cm",
    status: "available",
    price: "€100",
    size: "large",
    image: "paintings/Vetiver.JPG"
  },
  {
    id: "15",
    title: "\"Daisy\"",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "40 x 50.5 cm",
    status: "available",
    price: "€120",
    size: "large",
    image: "paintings/Daisy.JPG"
  },
  {
    id: "16",
    title: "\"Caramel\"",
    year: "2025",
    medium: "Acrylic on canvas",
    dimensions: "22 x 33 cm",
    status: "sold",
    price: "€100",
    size: "large",
    image: "paintings/Caramel.JPG"
  },
  {
    id: "17",
    title: "\"Big Caramel\"",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "60 x 81.5 cm",
    status: "available",
    price: "€310",
    size: "large",
    image: "paintings/Big_Caramel.JPG"
  },
  {
    id: "18",
    title: "\"Rosemary\"",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "70 x 50 cm",
    status: "available",
    price: "€340",
    size: "large",
    image: "paintings/Rosemary.JPG"
  },
  {
    id: "19",
    title: "\"Sun Exclusive\"",
    year: "2026",
    medium: "Mixed-media on canvas",
    dimensions: "40 x 30 cm",
    status: "available",
    price: "€120",
    size: "large",
    image: "paintings/Sun_Exclusive.JPG"
  },
  {
    id: "20",
    title: "\"Sandalwood\"",
    year: "2022",
    medium: "Acrylic on canvas",
    dimensions: "50 x 35 cm",
    status: "sold",
    price: "€120",
    size: "large",
    image: "paintings/Sandalwood.JPG"
  },
  {
    id: "21",
    title: "\"Charcoal\"",
    year: "2023",
    medium: "Charcoal on canvas",
    dimensions: "30 x 20 cm",
    status: "available",
    price: "€70",
    size: "large",
    image: "paintings/Charcoal.JPG"
  },
];