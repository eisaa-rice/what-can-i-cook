import type { Appliance, Cookware, Utensil } from "./request";

export type RecipeStep = {
  number: number;
  details: string;
};

export type Recipe = {
  name: string;
  description: string;
  appliances: Appliance[];
  cookware: Cookware[];
  utensils: Utensil[];
  ingredients: string[];
  steps: RecipeStep[];
};

export type Response = {
  recipes: Recipe[];
};
