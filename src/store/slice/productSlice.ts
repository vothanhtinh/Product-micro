import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../configStore";

const selectSlice = (state: RootState) => state.product;

export const selectContainers = createSelector(
  [selectSlice],
  (state) => state.products
);
