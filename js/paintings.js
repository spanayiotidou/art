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
    status: "available",
    price: "",
    size: "large",
    image: "paintings/01-Light.png"
  },
  {
    id: "02",
    title: "\"Vicky\"",
    year: "2025",
    medium: "Acrylic on canvas",
    dimensions: "90 x 65.3 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/02-Vicky.png"
  },
  {
    id: "03",
    title: "\"Cinnamon\"",
    year: "2021",
    medium: "Acrylic on canvas",
    dimensions: "100 x 100.5 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/03-Cinnamon.png"
  },
  {
    id: "04",
    title: "\"Change\"",
    year: "2020",
    medium: "Acrylic on canvas",
    dimensions: "100 x 70 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/04-Change.png"
  },
  {
    id: "05",
    title: "\"Humbled\"",
    year: "2023",
    medium: "Acrylic on canvas",
    dimensions: "50 x 40.2 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/05-Humbled.png"
  },
  {
    id: "06",
    title: "\"Crude\"",
    year: "2021",
    medium: "Acrylic on canvas",
    dimensions: "122 x  91.5 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/06-Crude.png"
  },
  {
    id: "07",
    title: "\"Dry Lavender\"",
    year: "2021",
    medium: "Acrylic on canvas",
    dimensions: "100 x 50 cm",
    status: "available",
    price: "",
    size: "normal",
    image: "paintings/07-Dry_Lavender.png"
  },
  {
    id: "08",
    title: "\"In My Feelings\"",
    year: "2022",
    medium: "Acrylic on canvas",
    dimensions: "60 x 50 cm",
    status: "available",
    price: "",
    size: "normal",
    image: "paintings/08-In_My_Feelings.png"
  },
  {
    id: "09",
    title: "\"Golden\"",
    year: "2022",
    medium: "Acrylic on canvas",
    dimensions: "30 x 24 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/09-Golden.png"
  },
  {
    id: "10",
    title: "\"Rose\"",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "30 x 24 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/10-Rose.jpeg"
  },
  {
    id: "11",
    title: "\"Cherry\"",
    year: "2023",
    medium: "Acrylic on canvas",
    dimensions: "100 x 73 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/11-Cherry.png"
  },
  {
    id: "12",
    title: "\"Sweet Maple\"",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "29.8 x 30.2 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/12-Sweet_Maple.png"
  },
  {
    id: "13",
    title: "\"Vetiver\"",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "20 x 40.3 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/13-Vetiver.jpeg"
  },
  // {
  //   id: "14",
  //   title: "\"Rosemary\"",
  //   year: "2026",
  //   medium: "Acrylic on canvas",
  //   dimensions: "20 x 40.3 cm",
  //   status: "available",
  //   price: "",
  //   size: "normal",
  //   image: "paintings/13-Rosemary.png"
  // },
  {
    id: "15",
    title: "\"Daisy\"",
    year: "2025",
    medium: "Acrylic on canvas",
    dimensions: "40 x 50.5 cm",
    status: "available",
    price: "",
    size: "normal",
    image: "paintings/15-Daisy.png"
  },
  {
    id: "16",
    title: "\"Caramel\"",
    year: "2025",
    medium: "Acrylic on canvas",
    dimensions: "22 x 33 cm",
    status: "available",
    price: "",
    size: "large",
    image: "paintings/16-Caramel.png"
  },
];