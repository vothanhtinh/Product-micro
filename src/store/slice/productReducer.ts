// containerSlice.js
import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  image: string;
}

const containerSlice = createSlice({
  name: "product",
  initialState: {
    products: [
      {
        id: 8,
        title: "Tractor Porsche-Diesel Master 419",
        image:
          "https://micro-frontends.org/0-model-store/images/tractor-red.jpg",
      },
      {
        id: 9,
        title: "Tractor Porsche-Diesel Master 420",
        image:
          "https://micro-frontends.org/0-model-store/images/tractor-green.jpg",
      },
      {
        id: 10,
        title: "Tractor Porsche-Diesel Master 421",
        image:
          "https://micro-frontends.org/0-model-store/images/tractor-blue.jpg",
      },
    ],
  },
  reducers: {},
});

export const {} = containerSlice.actions;
export default containerSlice.reducer;
