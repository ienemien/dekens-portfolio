import { CategoryType } from "@/model/CategoryType";
import { defineStore } from "pinia";

export const useCategory = defineStore({
  id: "category",
  state: () => ({
    categoryId: undefined as unknown as number,
  }),
  getters: {
    currentCategoryName(state): string | undefined {
      if (state.categoryId) {
        switch (state.categoryId) {
          case CategoryType.EDUCATIE_HEDEN:
          case CategoryType.EDUCATIE_VERLEDEN:
            return "Educatie";
          case CategoryType.WERK_HEDEN:
          case CategoryType.WERK_VERLEDEN:
            return "Werk";
          case CategoryType.WINKEL:
            return "Winkel";
        }
      }
      return "";
    },
  },
  actions: {
    setCategoryId(categoryId: number | undefined): void {
      if (categoryId) {
        this.categoryId = categoryId;
      }
    },
  },
});
