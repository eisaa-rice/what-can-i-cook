export type IngredientAmount = {
  quantity: number;
  unit?: string;
};

export type Ingredient = {
  name: string;
  amount?: IngredientAmount;
};

export type GenerateRecipeRequest = {
  utensils: string[];
  appliances: string[];
  ingredients: Ingredient[];
};
