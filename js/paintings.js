/*
  PAINTINGS.JS
  ------------
  This is the only file you need to edit to add, remove, or update artwork.

  To add a painting:
    1. Drop the image file into the /images folder.
    2. Copy one of the objects below, give it a new unique "id".
    3. Fill in the fields. "status" must be one of: "available", "sold", "inquire".
    4. Save. Refresh the page — no build step needed.

  Fields:
    id          - unique short string, e.g. "005"
    title       - painting title
    year        - year completed (number or string, e.g. "2024")
    medium      - e.g. "Oil on canvas"
    dimensions  - e.g. '24 × 36 in (61 × 91 cm)'
    status      - "available" | "sold" | "inquire"
    price       - optional, shown only if status is "available". Leave "" to hide.
    description - a short paragraph about the piece
    image       - path to the image file in /images
*/

const PAINTINGS = [
  {
    id: "001",
    title: "Light",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "100 x 120 cm",
    status: "available",
    price: "$1,200",
    description: "A study in warm and cool contrast, built from layered glazes over a dark ground. Painted over three sessions during a stretch of late autumn light.",
    image: "images/Painting1.jpeg"
  },
  {
    id: "002",
    title: "Quiet Ascent",
    year: "2024",
    medium: "Acrylic on panel",
    dimensions: "20 x 40.3 cm",
    status: "sold",
    price: "",
    description: "Two triangular fields of color meet at an unresolved seam, with a single pale form suspended above the horizon line.",
    image: "images/Painting2.jpeg"
  },
  {
    id: "003",
    title: "Three Fields",
    year: "2023",
    medium: "Oil on linen",
    dimensions: "100 x 50 cm",
    status: "inquire",
    price: "",
    description: "A horizontal composition divided into three color bands, exploring how a single dark line can hold an entire painting together.",
    image: "images/Painting3.jpeg"
  },
];
